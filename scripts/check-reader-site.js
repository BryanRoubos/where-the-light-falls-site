'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root='_site',assets=JSON.parse(fs.readFileSync('data/approved-images.json')).assets;
const approved=new Map(assets.map(a=>[a.path,a]));
const files=fs.readdirSync(root,{recursive:true}).filter(f=>f.endsWith('.html')&&!f.startsWith('google'));
for(const file of files){
 const html=fs.readFileSync(path.join(root,file),'utf8');
 assert.equal((html.match(/<h1\b/g)||[]).length,1,file+': one main title');
 assert.equal((html.match(/<header\b/g)||[]).length,1,file+': one shared header');
 assert.ok(html.includes('class="mobile-nav"')&&html.includes('mailto:roubos@proton.me'),file+': navigation/contact');
 assert.ok(html.includes('novel-social.webp'),file+': social preview');
 for(const img of html.matchAll(/<img\b[^>]*>/g)){
  const tag=img[0],src=tag.match(/src="([^"]+)"/)[1];
  assert.ok(approved.has(src),file+': approved image '+src);
  assert.ok(/width="\d+"/.test(tag)&&/height="\d+"/.test(tag),file+': image dimensions');
  for(const item of (tag.match(/srcset="([^"]+)"/)?.[1]||'').split(',').filter(Boolean))assert.ok(approved.has(item.trim().split(' ')[0]),file+': approved responsive image');
 }
}
const chapter=fs.readFileSync(root+'/chapter-one.html','utf8');
const feedback=fs.readFileSync(root+'/feedback.html','utf8');
assert.ok(feedback.includes('<details open><summary>Chapter One discussion prompts'));
assert.ok(feedback.includes('id="feedback-provider"'));
assert.ok(feedback.includes('https://mail.google.com/mail/'));
assert.ok(feedback.includes('https://outlook.live.com/mail/0/deeplink/compose'));
assert.ok(feedback.includes('id="feedback-copy"'));
assert.ok(chapter.includes('href="world.html" class="btn"'));
assert.ok(chapter.includes('href="lore/mira.html"'));
// Every approved manuscript paragraph remains in order, excluding chapter headings.
const manuscript=fs.readFileSync('chapters/chapter-one.md','utf8');
const paragraphs=manuscript.split(/\r?\n\s*\r?\n/).filter(p=>p.trim()&&!p.startsWith('#')&&!/^\s*\*\s*\*\s*\*/.test(p));
const plain=chapter.match(/<article class="reader-prose"[\s\S]*?<\/article>/)[0].replace(/<figure[\s\S]*?<\/figure>/g,'').replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'");
let offset=0;for(const p of paragraphs){const text=p.trim().replace(/\*([^*]+)\*/g,'$1');const found=plain.indexOf(text,offset);assert.ok(found>=0,'Manuscript paragraph missing: '+text.slice(0,65));offset=found+text.length;}
console.log('Reader site audit passed: '+files.length+' pages, approved responsive images, shared navigation, contact, social previews and manuscript paragraphs.');
