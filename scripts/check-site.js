'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve('_site');
const htmlFiles = [];
function walk(dir) {
 for (const ent of fs.readdirSync(dir,{withFileTypes:true})) {
  const p=path.join(dir,ent.name);
  if(ent.isDirectory()) walk(p);
  else if(p.endsWith('.html') && !path.basename(p).startsWith('google')) htmlFiles.push(p);
 }
}
walk(root);
const errors=[];
const localBase='https://bryanroubos.github.io/where-the-light-falls-site/';
for(const f of htmlFiles){
 const raw=fs.readFileSync(f,'utf8');
 const rel=path.relative(root,f).replaceAll(path.sep,'/');
 if(!/<title>[^<]+<\/title>/.test(raw)) errors.push(rel+': missing title');
 if(!/rel="canonical"/.test(raw)) errors.push(rel+': missing canonical link');
 const base=raw.match(/<base href="([^"]+)"/)?.[1] || '';
 const pageUrl=new URL(rel,localBase);
 const resolutionBase=new URL(base,pageUrl);
 const re=/(?:src|href)="([^"]+)"/g;
 let m;
 while((m=re.exec(raw))){
  const v=m[1];
  if(!v||v.startsWith('#')||/^(?:mailto:|tel:|data:|javascript:)/i.test(v))continue;
  let resolved;
  try{resolved=new URL(v,resolutionBase);}catch{errors.push(rel+': invalid URL '+v);continue;}
  if(!resolved.href.startsWith(localBase)) continue;
  const target=decodeURIComponent(resolved.pathname.slice(new URL(localBase).pathname.length));
  const check=path.resolve(root,target);
  if(!check.startsWith(root+path.sep)&&check!==root){errors.push(rel+': outside site '+v);continue;}
  if(!fs.existsSync(check)) errors.push(rel+': missing '+v+' -> '+target);
 }
}
for(const p of ['index.html','world.html','characters.html','lore.html','lore/unnamed-figure.html','lore/elias.html','about.html','chapter-one.html','sitemap.xml','robots.txt']){
 if(!fs.existsSync(path.join(root,p)))errors.push('missing output '+p);
}
const map=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
for(const f of htmlFiles){const rel=path.relative(root,f).replaceAll(path.sep,'/');const uri=localBase+(rel==='index.html'?'':rel);if(!map.includes('<loc>'+uri+'</loc>'))errors.push('sitemap missing '+rel);}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log('Site audit passed: '+htmlFiles.length+' HTML pages, internal links, images, canonicals and sitemap.');
