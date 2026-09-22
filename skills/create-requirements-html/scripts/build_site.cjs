/* Maintenance-only snapshot builder. Browsing/copying the resulting site needs no packages. */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const MarkdownIt = require('markdown-it');
const {chromium} = require('playwright-core');
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const posix = value => value.split(path.sep).join('/');
const walk = dir => fs.readdirSync(dir,{withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)]);
const relative = (from,to) => posix(path.relative(path.dirname(from),to)) || path.basename(to);
const groups = ['要件定義','付録・競合調査','設計の入口','基本設計','詳細設計','設計判断（ADR）','開発計画'];
const groupFor = name => name.startsWith('requirements/appendices/') ? groups[1] : name.startsWith('requirements/') ? groups[0] : name === 'design/index.html' ? groups[2] : name.startsWith('design/basic/') ? groups[3] : name.startsWith('design/detailed/') ? groups[4] : name.startsWith('design/decisions/') ? groups[5] : groups[6];

async function main() {
  const [sourceArg, outputArg, ...flags] = process.argv.slice(2);
  if (!sourceArg || !outputArg) throw Error('Usage: node build_site.cjs <Markdown assets> <NEW output dir> [--replace-generated]');
  const source = path.resolve(sourceArg), output = path.resolve(outputArg);
  if (source === output || output.startsWith(source+path.sep) || source.startsWith(output+path.sep)) throw Error('Source and output must not overlap');
  if (fs.existsSync(output) && (!flags.includes('--replace-generated') || !fs.existsSync(path.join(output,'manifest.json')))) throw Error('Output exists. Only a generated site can be explicitly replaced.');
  const files = walk(source).filter(f => f.endsWith('.md')).sort();
  const docs = files.map(file => {
    const raw = fs.readFileSync(file,'utf8');
    const metadata = raw.match(/^---\n([\s\S]*?)\n---\n/);
    const name = posix(path.relative(source,file)).replace(/^(requirements|design|planning)-template\//,'$1/').replace(/README\.md$/,'index.html').replace(/\.md$/,'.html');
    const title = metadata?.[1].match(/^title: (.+)$/m)?.[1] || raw.match(/^# (.+)$/m)?.[1];
    if (!title) throw Error(`Missing title: ${file}`);
    const parts = raw.replace(/^---\n[\s\S]*?\n---\n/,'').split(/<!-- BEGIN REFERENCE EXAMPLE[^>]*-->/);
    if (parts.length !== 2) throw Error(`Expected integrated reference example: ${file}`);
    return {file,name,title,group:groupFor(name),raw,metadata:metadata?.[1]||'',parts:[parts[0],parts[1].replace(/<!-- END REFERENCE EXAMPLE -->/,'')],headings:[],diagrams:[],hash:crypto.createHash('sha256').update(raw).digest('hex')};
  }).sort((a,b) => groups.indexOf(a.group)-groups.indexOf(b.group) || (a.name.endsWith('/index.html') ? -1 : b.name.endsWith('/index.html') ? 1 : a.name.localeCompare(b.name)));
  const sourceMap = new Map(docs.map(d => [d.file,d]));
  const md = new MarkdownIt({html:true,linkify:false});
  const diagrams = [];
  md.renderer.rules.html_block = (tokens,i) => {
    const text = tokens[i].content.trim();
    if (/^(?:<details(?: open)?>\s*)?<summary>[^<]*<\/summary>$|^<\/?details(?: open)?>$/.test(text)) return text+'\n';
    if (text.startsWith('<!--') && text.endsWith('-->')) return `<p class="guide">${esc(text.slice(4,-3).trim())}</p>\n`;
    return `<pre>${esc(text)}</pre>`;
  };
  // Only known template block markup is allowed; inline raw HTML stays text.
  md.renderer.rules.html_inline = (tokens,i) => esc(tokens[i].content);
  md.renderer.rules.table_open = () => '<div class="table-wrap"><table>\n';
  md.renderer.rules.table_close = () => '</table></div>\n';
  md.renderer.rules.th_open = () => '<th scope="col">';
  md.renderer.rules.fence = (tokens,i,options,env) => {
    const token = tokens[i];
    if (token.info.trim() !== 'mermaid') return `<pre><code>${esc(token.content)}</code></pre>\n`;
    const name = `shared/diagrams/${crypto.createHash('sha256').update(token.content).digest('hex').slice(0,16)}.svg`;
    if (!diagrams.some(d => d.name === name)) diagrams.push({name,code:token.content});
    env.doc.diagrams.push(name);
    return `<figure class="diagram"><img src="${relative(env.doc.name,name)}" alt="${esc(env.doc.title)}の関係図・業務フロー"><figcaption>Mermaidから生成した図。関係・条件は前後の本文と表を参照。</figcaption></figure><details><summary>Mermaidソース</summary><pre><code>${esc(token.content)}</code></pre></details>\n`;
  };
  const defaultLink = md.renderer.rules.link_open || ((tokens,i,options,env,self) => self.renderToken(tokens,i,options));
  md.renderer.rules.link_open = (tokens,i,options,env,self) => {
    env.inLink = true;
    const token = tokens[i], href = token.attrGet('href');
    if (href && !/^[a-z]+:|^\/\//i.test(href) && href.split('#')[0].endsWith('.md')) {
      const [name,fragment] = href.split('#');
      const target = sourceMap.get(path.resolve(path.dirname(env.doc.file),name));
      if (!target) throw Error(`Unresolved source link ${env.doc.file}: ${href}`);
      token.attrSet('href',relative(env.doc.name,target.name)+(fragment ? '#'+fragment : ''));
    }
    return defaultLink(tokens,i,options,env,self);
  };
  md.renderer.rules.link_close = () => '</a>';
  for (const doc of docs) {
    doc.parsed = doc.parts.map((part,partIndex) => {
      const env = {doc,example:!!partIndex}, tokens = md.parse(part,env), counts = new Map();
      for (let i=0;i<tokens.length;i++) {
        const token = tokens[i];
        if (token.type !== 'heading_open') continue;
        const label = tokens[i+1].content;
        const requirement = label.match(/^(?:BO|PER|BP|BR|CAND|FR|DR|IF|NFR|AC|ASM|CON|DEC|ISSUE|ADR|API|MOD|DATA)-\d+\b/)?.[0];
        const base = (partIndex ? 'example-' : '')+(requirement || label.toLowerCase().replace(/[^\p{L}\p{N}_-]+/gu,'-').replace(/^-|-$/g,''));
        const n = counts.get(base)||0; counts.set(base,n+1);
        const id = base+(n ? '-'+n : '');
        token.attrSet('id',id);
        if (token.tag === 'h1') {token.tag = partIndex ? 'h3' : 'h2'; tokens[i+2].tag = token.tag;}
        doc.headings.push({label,id,example:!!partIndex,level:token.tag});
      }
      return {tokens,env};
    });
  }
  // Resolve requirement references only to existing headings in their canonical document.
  const owner = {BO:'01-business-overview',PER:'02-targets-and-personas',BP:'05-business-process',BR:'05-business-process',FR:'07-functional',CAND:'competitive-analysis',DR:'08-data',IF:'06-related',NFR:'09-non',AC:'10-acceptance',ASM:'assumptions-and',CON:'assumptions-and',DEC:'decisions',ISSUE:'open-issues'};
  const ids = new Map();
  for (const doc of docs) {
    const owns = id => owner[id.split('-')[0]] && path.basename(doc.name).startsWith(owner[id.split('-')[0]]);
    for (const heading of doc.headings) {
      const id = heading.id.replace(/^example-/,'');
      if (owns(id)) ids.set(heading.id,{doc,id:heading.id});
    }
    for (const {tokens,env} of doc.parsed) {
      for (let i=0;i<tokens.length;i++) {
        if (tokens[i].type !== 'tr_open' || tokens[i+1]?.type !== 'td_open') continue;
        const id = tokens[i+2]?.content;
        if (!/^[A-Z]+-\d+$/.test(id||'') || !owns(id)) continue;
        const key = (env.example ? 'example-' : '')+id;
        if (!ids.has(key)) {tokens[i].attrSet('id',key);ids.set(key,{doc,id:key});}
      }
    }
  }
  md.renderer.rules.link_close = (tokens,i,options,env) => {env.inLink = false; return '</a>';};
  md.renderer.rules.text = (tokens,i,options,env) => {
    if (env.inLink) return esc(tokens[i].content);
    return esc(tokens[i].content).replace(/\b(?:BO|PER|BP|BR|CAND|FR|DR|IF|NFR|AC|ASM|CON|DEC|ISSUE)-\d+\b/g,id => {
      const target = ids.get((env.example ? 'example-' : '')+id);
      if (!target) return id;
      return `<a href="${relative(env.doc.name,target.doc.name)}#${target.id}">${id}</a>`;
    });
  };
  for (const doc of docs) doc.rendered = doc.parsed.map(({tokens,env}) => md.renderer.render(tokens,md.options,env));
  function nav(current) {
    return groups.map(group => `<div data-nav-group><h2 class="nav-group">${group}</h2><ul>${docs.filter(d => d.group === group).map(d => `<li data-nav-item><a href="${relative(current,d.name)}"${current === d.name ? ' aria-current="page"' : ''}>${esc(d.title)}</a></li>`).join('')}</ul></div>`).join('');
  }
  function shell(name,title,group,body,pager='') {
    const home = relative(name,'index.html');
    return `<!doctype html>\n<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)} | 要件定義・設計ライブラリ</title><link rel="stylesheet" href="${relative(name,'shared/site.css')}"><script defer src="${relative(name,'shared/site.js')}"></script></head><body><a class="skip" href="#main">本文へ移動</a><header class="site-header"><a href="${home}">要件定義・設計ライブラリ</a><small>34文書・テンプレートと記入例</small></header><div class="layout"><aside class="sidebar"><details open><summary>サイトメニュー</summary><label for="nav-query">文書名で探す</label><input id="nav-query" type="search" placeholder="例：API、競合、機能"><button id="nav-reset" type="button">検索を解除</button><p id="nav-result" role="status" aria-live="polite"></p><nav aria-label="サイト全体"><a href="${home}"${name === 'index.html' ? ' aria-current="page"' : ''}>トップページ</a>${nav(name)}</nav></details></aside><main id="main"><nav class="breadcrumbs" aria-label="パンくず"><a href="${home}">トップ</a> / ${esc(group)} / ${esc(title)}</nav>${body}${pager}</main></div><footer class="site-footer">テンプレート閲覧用サイト。記入例の内容・採否・承認状態は架空であり、実案件の事実ではありません。</footer></body></html>\n`;
  }
  fs.mkdirSync(path.join(output,'shared/diagrams'),{recursive:true});
  for (const file of ['site.css','site.js']) fs.copyFileSync(path.join(__dirname,'../assets/site-ui',file),path.join(output,'shared',file));
  const browser = await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH} : {}),args:['--no-sandbox']});
  try {
    const page = await browser.newPage();
    await page.route(/^https?:/, route => route.abort());
    await page.setContent('<!doctype html><html lang="ja"><head><meta charset="utf-8"></head><body></body></html>');
    const mermaidRoot = path.dirname(require.resolve('mermaid/package.json'));
    await page.addScriptTag({path:path.join(mermaidRoot,'dist/mermaid.min.js')});
    await page.evaluate(() => mermaid.initialize({startOnLoad:false,securityLevel:'strict',theme:'neutral',fontFamily:'sans-serif',flowchart:{htmlLabels:false}}));
    for (let i=0;i<diagrams.length;i++) {
      const diagram = diagrams[i];
      const svg = await page.evaluate(async ({code,id}) => (await mermaid.render(id,code)).svg,{code:diagram.code,id:`diagram${i}`});
      if (/<script\b|\son\w+=|(?:href|src)="(?:https?:|javascript:)/i.test(svg)) throw Error('Unsafe rendered SVG');
      fs.writeFileSync(path.join(output,diagram.name),svg);
    }
  } finally {await browser.close();}
  for (const [i,doc] of docs.entries()) {
    const toc = doc.headings.filter(h => !h.example && h.level === 'h2').map(h => `<li><a href="#${h.id}">${esc(h.label)}</a></li>`).join('');
    const pager = `<nav class="pager" aria-label="前後のページ">${i ? `<a rel="prev" href="${relative(doc.name,docs[i-1].name)}">← 前：${esc(docs[i-1].title)}</a>` : '<span></span>'}${i<docs.length-1 ? `<a rel="next" href="${relative(doc.name,docs[i+1].name)}">次：${esc(docs[i+1].title)} →</a>` : `<a href="${relative(doc.name,'index.html')}">トップへ戻る</a>`}</nav>`;
    const body = `<header><p class="eyebrow">${doc.group} · ${i+1} / ${docs.length}</p><h1>${esc(doc.title)}</h1><p class="notice">テンプレートと参考例の閲覧ページです。実案件への適用時は案内・空欄を埋め、参考例を除去してください。Markdown版の項目・記入例を省略せず収録しています。</p></header><details class="metadata"><summary>テンプレートの文書メタデータ</summary><pre>${esc(doc.metadata)}</pre></details><nav class="page-toc" aria-label="このページの目次"><strong>このページの目次</strong><ul>${toc}<li><a href="#reference-example">記入例</a></li></ul></nav><div class="doc-content"><section data-template-content>${doc.rendered[0]}</section><section class="reference-example" id="reference-example" data-reference-example>${doc.rendered[1]}</section></div>`;
    const target = path.join(output,doc.name); fs.mkdirSync(path.dirname(target),{recursive:true}); fs.writeFileSync(target,shell(doc.name,doc.title,doc.group,body,pager));
  }
  const cards = groups.map(g => `<section class="card"><h2>${g}</h2><p>${docs.filter(d => d.group===g).length} 文書</p><ul>${docs.filter(d => d.group===g).map(d => `<li><a href="${d.name}">${esc(d.title)}</a></li>`).join('')}</ul></section>`).join('');
  fs.writeFileSync(path.join(output,'index.html'),shell('index.html','文書一覧','ホーム',`<p class="eyebrow">REQUIREMENTS / DESIGN / PLANNING</p><h1>要件から設計まで、<br>一つのサイトで。</h1><p>要件定義16文書、技術設計17文書、開発計画1文書。各ページにテンプレートと記入例を一体で収録しています。</p><p class="notice">これはテンプレート閲覧用のHTML正本です。実案件の完成資料ではありません。Markdown版からの初期移植後は自動同期しません。条件付き・任意の文書は各入口ページの作成条件に従って選択してください。</p><p>サイトメニュー、ページ内目次、前後のページ、パンくずから移動できます。サーバー不要・オフラインで閲覧可能です。文書検索は文書名を対象とします。</p><div class="cards">${cards}</div>`));
  fs.writeFileSync(path.join(output,'manifest.json'),JSON.stringify({kind:'requirements-html-template-site',documents:docs.map(d=>({source:posix(path.relative(source,d.file)),path:d.name,title:d.title,group:d.group,sourceSha256:d.hash,headings:d.headings,diagrams:d.diagrams})),diagramCount:diagrams.length},null,2)+'\n');
  console.log(`Built ${docs.length} documents + home; ${diagrams.length} Mermaid SVGs: ${output}`);
}
main().catch(error => {console.error(error);process.exitCode=1;});
