'use strict';
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const site = path.resolve('_site');
const original = fs.readFileSync('app.js','utf8');
const source = original.slice(0, original.indexOf("document.getElementById('menu').addEventListener"));
if (!source || source === original) throw Error('Cannot find end of original application; update static generator.');
const sandbox = {};
vm.runInNewContext(source + '\nglobalThis.exported = {entries,page,article,characterCard,card};', sandbox, {timeout:1000});
const {entries,page,article,characterCard,card} = sandbox.exported;
const base = 'https://bryanroubos.github.io/where-the-light-falls-site/';
const esc = s => String(s).replace(/[&<>"']/g, ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const url = p => base + (p === 'index.html' ? '' : p);
function links(html) {
  return html.replace(/#\/lore\/([a-z0-9-]+)/g, 'lore/$1.html')
    .replace(/#\/(discover|world|characters|lore|chronology)/g, '$1.html')
    .replace(/href="#\/"/g, 'href="index.html"')
    .replace(/href="\.\/#\/"/g, 'href="index.html"');
}
const nav = '<header class="header"><a class="brand" href="index.html">WHERE THE LIGHT FALLS</a><nav class="nav static-nav" aria-label="Main navigation"><a class="nav-feature" href="chapter-one.html">Read Chapter One</a><a href="discover.html">Start here</a><a href="world.html">World</a><a href="characters.html">Characters</a><a href="lore.html">Lore</a><a href="about.html">About</a><a href="feedback.html">Feedback</a></nav></header>';
const footer = '<footer class="footer"><span>© 2026 Bryan Roubos</span><span><a href="about.html">About the author</a> · <a href="chapter-one.html">Read Chapter One</a> · <a href="feedback.html">Reader feedback</a></span></footer>';
const person = {
 '@context':'https://schema.org','@type':'Person','@id':url('about.html')+'#bryan',
 name:'Bryan Roubos',url:url('about.html'),
 description:'Software engineering student at HU University of Applied Sciences Utrecht, working on backend development and AI infrastructure, and author of Where the Light Falls.',
 affiliation:{'@type':'CollegeOrUniversity',name:'HU University of Applied Sciences Utrecht'},
 sameAs:['https://github.com/BryanRoubos','https://www.linkedin.com/in/bryan-roubos/']
};
const book = {'@context':'https://schema.org','@type':'Book','@id':url('index.html')+'#book',name:'Where the Light Falls',url:url('index.html'),genre:['Dark fantasy','Mystery'],inLanguage:'en',author:{'@id':person['@id']},description:'An original dark fantasy mystery novel in progress, set in a city divided by light and shadow.'};
function write(name, title, description, body, extras={}) {
 const canonical=url(name);
 const jsonld=extras.schema?'<script type="application/ld+json">'+JSON.stringify({'@context':'https://schema.org','@graph':[person,book]})+'</script>':'';
 const verification=name==='index.html'?'<meta name="google-site-verification" content="">':'';
 const image=url('assets/images/deepwater-city-below.png');
 const html='<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">\n'+
 '<title>'+esc(title)+'</title>'+(name.startsWith('lore/')?'<base href="../">':'')+'<meta name="description" content="'+esc(description)+'"><meta name="theme-color" content="#111a1f">\n'+
 '<link rel="canonical" href="'+canonical+'">\n'+
 '<meta property="og:type" content="'+(extras.schema?'profile':'website')+'"><meta property="og:site_name" content="Where the Light Falls"><meta property="og:title" content="'+esc(title)+'"><meta property="og:description" content="'+esc(description)+'"><meta property="og:url" content="'+canonical+'"><meta property="og:image" content="'+image+'">\n'+
 '<meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="styles.css">'+verification+jsonld+'</head><body>\n'+
 '<a class="skip" href="'+(name.startsWith('lore/')?name+'#main':'#main')+'">Skip to main content</a>'+nav+'<main id="main">'+links(body)+'</main>'+footer+'</body></html>';
 fs.mkdirSync(path.dirname(path.join(site,name)),{recursive:true});
 fs.writeFileSync(path.join(site,name),html);
}
const home = page['/']().replace('<div id="home-character-gallery" class="character-gallery"></div>','<div id="home-character-gallery" class="character-gallery">'+entries.filter(e=>e.type==='Character').map(characterCard).join('')+'</div>').replace('<p class="hero-note">','<p class="hero-note">By <a href="about.html">Bryan Roubos</a> · ');
write('index.html','Where the Light Falls — Dark Fantasy Novel by Bryan Roubos','Where the Light Falls is an original dark fantasy mystery novel by Bryan Roubos. Meet Elias Varek, explore Deepwater and read Chapter One.',home);
const sections=[
 ['discover','Discover the World','An introduction to the canyon metropolis, its people, geography and history.'],
 ['world','The World','Explore the city, the Deepwater river and the divided districts of Where the Light Falls.'],
 ['characters','Characters','Meet Elias, Mira, Maren and Bram, characters in Bryan Roubos’s dark fantasy novel Where the Light Falls.'],
 ['chronology','Chronology','How the crossings, trade routes and city districts of Where the Light Falls developed.'],
 ['lore','Lore Archive','Explore the public lore archive for Where the Light Falls, including its people, history and geography.']
];
for(const [slug,title,description] of sections){
 let body=page['/'+slug]();
 if(slug==='lore') body=body.replace(/<label for="search">[\s\S]*?<\/div><div class="grid" id="results" aria-live="polite"><\/div>/,'<div class="grid">'+entries.map(e=>card(e)).join('')+'</div>');
 write(slug+'.html',title+' — Where the Light Falls',description,body);
}
for(const e of entries) write('lore/'+e.id+'.html',e.title+' — Where the Light Falls Lore',e.summary+' Explore the public lore of Where the Light Falls.',article(e));
const bio='<section class="shell section"><div class="kicker">ABOUT THE AUTHOR</div><h1 class="title">Bryan Roubos</h1><div class="paper"><h2>Software engineering student &amp; fantasy author</h2><p>I am a software engineering student at HU University of Applied Sciences Utrecht in the Netherlands. My interests include backend development, AI infrastructure and the engineering of systems used to run and serve AI models.</p><p>At Tandem-IT, I work with a team on an AI infrastructure cluster for HU Utrecht, contributing to Go backend development, service integration and infrastructure supporting GPU workloads.</p><p>I am also the author of <em>Where the Light Falls</em>, an original dark fantasy mystery novel in development. It follows Elias Varek as he searches for answers about his missing sister in a city built along a vast canyon.</p><p><a href="chapter-one.html">Read the first chapter</a> · <a href="https://github.com/BryanRoubos" rel="me">GitHub</a> · <a href="https://www.linkedin.com/in/bryan-roubos/" rel="me">LinkedIn</a></p></div></section>';
write('about.html','About Bryan Roubos — Software Engineering Student and Author','Meet Bryan Roubos, HU Utrecht software engineering student working on AI infrastructure and author of the dark fantasy novel Where the Light Falls.',bio,{schema:true});
const files=['index.html',...sections.map(s=>s[0]+'.html'),'about.html','chapter-one.html','feedback.html',...entries.map(e=>'lore/'+e.id+'.html')];
fs.writeFileSync(path.join(site,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+files.map(f=>'<url><loc>'+url(f)+'</loc></url>').join('\n')+'\n</urlset>\n');
fs.writeFileSync(path.join(site,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: '+url('sitemap.xml')+'\n');
function retrofit(filename,title,description) {
 let html=fs.readFileSync(path.join(site,filename),'utf8');
 const meta='<link rel="canonical" href="'+url(filename)+'"><meta property="og:url" content="'+url(filename)+'"><meta property="og:image" content="'+url('assets/images/deepwater-city-below.png')+'"><meta property="og:site_name" content="Where the Light Falls"><meta name="twitter:card" content="summary_large_image">';
 html=html.replace('</head>',meta+'</head>').replace(/(?:\.\/)?#\//g,'index.html').replace(/© 2026 (?:Where the Light Falls|WHERE THE LIGHT FALLS)[^<]*/g,'© 2026 Bryan Roubos · ').replace('</nav>','<a href="about.html">About</a></nav>');
 if(!html.includes('property="og:description"'))html=html.replace('</head>','<meta property="og:description" content="'+esc(description)+'"><meta property="og:title" content="'+esc(title)+'"><meta property="og:type" content="website"></head>');
 fs.writeFileSync(path.join(site,filename),html);
}
retrofit('chapter-one.html','Read Chapter One — Where the Light Falls','Read the first chapter of Bryan Roubos’s dark fantasy mystery novel.');
retrofit('feedback.html','Reader Feedback — Where the Light Falls','Share constructive reactions to Chapter One of Where the Light Falls.');
console.log('Generated '+files.length+' crawlable HTML pages and sitemap.');
