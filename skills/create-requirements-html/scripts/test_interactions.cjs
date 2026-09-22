// Test the embedded enhancement without requiring a browser or installing packages.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, '../assets/requirements.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const control = () => ({
  value: '', textContent: '', events: {},
  addEventListener(type, fn) { this.events[type] = fn; },
});
const controls = Object.fromEntries(['query', 'category', 'reset', 'search-result'].map(id => [id, control()]));
const card = (id, category, text) => ({
  id, dataset: {category}, textContent: text, hidden: false,
  closest() { return this; }, scrollIntoView() { this.scrolled = true; },
});
const cards = [card('FR-001', '申請', 'FR-001 申請状況の参照'), card('FR-002', '承認', 'FR-002 承認待ち一覧')];
const events = {};
const location = {hash: ''};
vm.runInNewContext(script, {
  document: {getElementById: id => controls[id] || cards.find(c => c.id === id), querySelectorAll: () => cards},
  window: {addEventListener: (name, fn) => { events[name] = fn; }}, location,
});
assert.equal(controls['search-result'].textContent, '2 / 2 件を表示');
controls.query.value = '状況'; controls.query.events.input();
assert.deepEqual(cards.map(c => c.hidden), [false, true]);
controls.query.value = '不存在'; controls.query.events.input();
assert(cards.every(c => c.hidden));
controls.reset.events.click(); assert(cards.every(c => !c.hidden));
controls.category.value = '承認'; controls.category.events.change();
assert.deepEqual(cards.map(c => c.hidden), [true, false]);
location.hash = '#FR-001'; events.hashchange();
assert(cards.every(c => !c.hidden)); assert(cards[0].scrolled);
location.hash = '#%ZZ'; events.hashchange();
console.log('PASS: search, no matches, reset, category, anchor reveal, malformed fragment');
