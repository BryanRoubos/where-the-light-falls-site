'use strict';
const fs=require('node:fs'),path=require('node:path');
const manifest=JSON.parse(fs.readFileSync('data/approved-images.json','utf8'));
const approved=new Set(manifest.assets.map(a=>a.path));
if(approved.size!==manifest.assets.length)throw Error('Duplicate approved image');
for(const item of manifest.assets){
 if(!/^assets\/images\/[a-z0-9/_-]+\.(?:png|webp)$/.test(item.path))throw Error('Invalid approved image '+item.path);
 if(!fs.statSync(item.path).isFile())throw Error('Missing approved image '+item.path);
 const dest=path.join('_site',item.path);
 fs.mkdirSync(path.dirname(dest),{recursive:true});
 fs.copyFileSync(item.path,dest);
}
for(const item of manifest.assets){
 if(item.source && (!approved.has(item.source) || !item.source.endsWith('.png')))throw Error('Invalid derivative source '+item.path);
}
const pages=['app.js','chapter-one.html'];
for(const file of pages){
 const source=fs.readFileSync(file,'utf8');
 for(const match of source.matchAll(/assets\/images\/[a-z0-9/_-]+\.(?:png|webp)/g))
  if(!approved.has(match[0]))throw Error('Unapproved image in '+file+': '+match[0]);
}
console.log('Copied '+approved.size+' explicitly approved artwork files.');
