// Browser/content integration test for the template site; dependencies are build-time only.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
const {chromium} = require('playwright-core');
const MarkdownIt = require('markdown-it');
const normalize = text => text.replace(/\s+/g,' ').trim();
(async () => {
  const site = path.resolve(process.argv[2] || path.join(__dirname,'../assets/site'));
  const source = process.argv[3] && path.resolve(process.argv[3]);
  const manifest = JSON.parse(fs.readFileSync(path.join(site,'manifest.json'),'utf8'));
  const artifacts = fs.mkdtempSync(path.join(os.tmpdir(),'requirements-site-test-'));
  assert.equal(manifest.documents.length,34);
  assert.equal(new Set(manifest.documents.map(d=>d.path)).size,34);
  const browser = await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH} : {}),args:['--no-sandbox']});
  const failures = [], network = [];
  try {
    const context = await browser.newContext({viewport:{width:1280,height:900}});
    const page = await context.newPage();
    page.on('pageerror',e=>failures.push(e.message));
    page.on('requestfailed',r=>failures.push(r.url()+': '+r.failure().errorText));
    page.on('request',r=>{if (/^https?:/.test(r.url())) network.push(r.url());});
    const url = name => pathToFileURL(path.join(site,name)).href;
    const md = new MarkdownIt({html:true});
    for (const doc of [{path:'index.html'},...manifest.documents]) {
      await page.goto(url(doc.path));
      assert.equal(await page.locator('h1').count(),1,doc.path);
      assert.equal(await page.locator('[data-nav-item]').count(),34);
      assert.equal(await page.locator('.sidebar [aria-current="page"]').count(),1);
      const images = await page.locator('img').evaluateAll(nodes=>nodes.every(n=>n.complete&&n.naturalWidth>0));
      assert(images,`broken diagram: ${doc.path}`);
      for (const width of [390,1280]) {
        await page.setViewportSize({width,height:900});
        assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`page overflow: ${doc.path} at ${width}`);
      }
      if (source && doc.source) {
        const raw = fs.readFileSync(path.join(source,doc.source),'utf8');
        assert.equal(crypto.createHash('sha256').update(raw).digest('hex'),doc.sourceSha256);
        const parts = raw.replace(/^---\n[\s\S]*?\n---\n/,'').split(/<!-- BEGIN REFERENCE EXAMPLE[^>]*-->/);
        for (const [i,part] of parts.entries()) {
          const tokens = md.parse(part.replace(/<!-- END REFERENCE EXAMPLE -->/,''),{});
          const section = page.locator(i ? '[data-reference-example]' : '[data-template-content]');
          assert.equal(await section.locator('h1,h2,h3,h4,h5,h6').count(),tokens.filter(t=>t.type==='heading_open').length,`heading coverage: ${doc.path}`);
          assert.equal(await section.locator('table').count(),tokens.filter(t=>t.type==='table_open').length,`table coverage: ${doc.path}`);
          assert.equal(await section.locator('tr').count(),tokens.filter(t=>t.type==='tr_open').length,`row coverage: ${doc.path}`);
          const text = normalize(await section.textContent());
          for (const token of tokens) {
            if (token.type === 'inline') {
              const expected = normalize((token.children||[]).filter(t=>['text','code_inline','softbreak','hardbreak'].includes(t.type)).map(t=>t.type.endsWith('break')?' ':t.content).join(''));
              assert(text.includes(expected),`Missing text in ${doc.path}: ${expected.slice(0,90)}`);
            } else if (token.type === 'fence') assert(text.includes(normalize(token.content)),`Missing code/diagram source: ${doc.path}`);
          }
        }
      }
    }
    // Traverse the actual next-page links, including deep paths, then browser history.
    await page.goto(url(manifest.documents[0].path));
    for (let i=1;i<manifest.documents.length;i++) {
      await page.locator('.pager [rel=next]').click();
      assert.equal(page.url(),url(manifest.documents[i].path));
    }
    await page.goBack();
    assert.equal(page.url(),url(manifest.documents.at(-2).path));
    await page.goForward();
    assert.equal(page.url(),url(manifest.documents.at(-1).path));
    await page.locator('.site-header a').click();
    assert.equal(page.url(),url('index.html'));
    await page.locator('#nav-query').fill('API');
    assert.equal(await page.locator('[data-nav-item]:visible').count(),1);
    await page.locator('#nav-query').fill('不存在 <script>');
    assert.equal(await page.locator('[data-nav-item]:visible').count(),0);
    await page.locator('#nav-reset').click();
    assert.equal(await page.locator('[data-nav-item]:visible').count(),34);
    await page.locator('.sidebar a').filter({hasText:'API設計'}).click();
    assert(page.url().endsWith('/design/basic/09-api-design.html'));
    await page.goto(url('requirements/appendices/competitive-analysis.html'));
    await page.locator('[data-reference-example] a').filter({hasText:/^FR-002$/}).first().click();
    assert(page.url().endsWith('/requirements/07-functional-requirements.html#example-FR-002'));
    assert(await page.locator('#example-FR-002').isVisible());
    await page.goto(url('index.html'));
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(()=>document.activeElement.className),'skip');
    await page.keyboard.press('Enter');
    assert.equal(new URL(page.url()).hash,'#main');
    await page.screenshot({path:path.join(artifacts,'desktop.png')});
    await page.setViewportSize({width:390,height:900});
    await page.locator('.sidebar > details > summary').click();
    await page.screenshot({path:path.join(artifacts,'mobile.png')});
    await page.goto(url('requirements/05-business-process-before-and-after.html'));
    await page.locator('.diagram').first().scrollIntoViewIfNeeded();
    await page.screenshot({path:path.join(artifacts,'diagram-mobile.png')});
    await page.emulateMedia({media:'print'});
    assert.equal(await page.locator('.sidebar:visible').count(),0);
    await page.pdf({path:path.join(artifacts,'workflow.pdf'),format:'A4',printBackground:true});
    const nojs = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});
    const staticPage = await nojs.newPage();
    await staticPage.goto(url('requirements/03-stakeholders.html'));
    assert(await staticPage.locator('img').first().evaluate(n=>n.complete&&n.naturalWidth>0));
    await staticPage.locator('.pager [rel=next]').click();
    assert(staticPage.url().endsWith('04-scope.html'));
    await nojs.close();
    assert.deepEqual(failures,[]);
    assert.deepEqual(network,[]);
    console.log(`PASS: 35 pages, 34 source-document coverage checks${source ? '' : ' (source checks skipped)'}, 390/1280px, diagrams, navigation/history, search, traceability, keyboard, no-JS, print/PDF. Chromium ${browser.version()}.`);
    console.log(`Artifacts: ${artifacts}`);
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
