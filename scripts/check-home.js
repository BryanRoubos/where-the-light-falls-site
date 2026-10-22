'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
const home=fs.readFileSync('_site/index.html','utf8');
const manuscript=fs.readFileSync('chapters/chapter-one.md','utf8');
assert.equal((home.match(/<h1\b/g)||[]).length,1);
for(const p of [...home.matchAll(/<blockquote>([\s\S]*?)<\/blockquote>/g)][0][1].matchAll(/<p>(.*?)<\/p>/g))assert.ok(manuscript.includes(p[1]),'Excerpt differs from approved manuscript');
assert.ok(home.indexOf('class="opening shell"')<home.indexOf('class="city-reveal shell"'));
assert.ok(home.indexOf('class="city-reveal shell"')<home.indexOf('class="elias-introduction shell"'));
assert.ok(!home.includes('deepwater-working-waterfront'));
assert.ok(!/newsletter|subscribe|sign up/i.test(home));
assert.ok(home.includes('href="world.html"'));
for(const img of home.matchAll(/<img\b([^>]+)>/g)){
 assert.ok(/alt="[^"]+"/.test(img[1]));
 assert.ok(/width="\d+"/.test(img[1])&&/height="\d+"/.test(img[1]));
}
console.log('Homepage audit passed: authentic excerpt, section order, static links, artwork and image dimensions.');
