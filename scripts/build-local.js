'use strict';
const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
// Match the Pages allowlist. Never copy private trees or artwork archives.
fs.mkdirSync('_site/chapters',{recursive:true});
for(const file of ['index.html','chapter-one.html','feedback.html','styles.css','app.js','site.js','google6a72b1af88a0a393.html'])fs.copyFileSync(file,path.join('_site',file));
fs.copyFileSync('chapters/chapter-one.md','_site/chapters/chapter-one.md');
for(const script of ['copy-approved-images','build-static','check-site','check-home','check-reader-site'])execFileSync(process.execPath,['scripts/'+script+'.js'],{stdio:'inherit'});
fs.writeFileSync('_site/.nojekyll','');
