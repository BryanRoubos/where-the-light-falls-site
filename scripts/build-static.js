'use strict';
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const site = path.resolve('_site');
const original = fs.readFileSync('app.js','utf8');
const source = original.slice(0, original.indexOf("document.getElementById('menu').addEventListener"));
if (!source || source === original) throw Error('Cannot find end of original application; update static generator.');
const sandbox = {document:{getElementById:()=>({})}};
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
const nav = "<header class=\"header\"><a class=\"brand\" href=\"index.html\">WHERE THE LIGHT FALLS</a><nav class=\"nav static-nav desktop-nav\" aria-label=\"Main navigation\"><a href=\"world.html\">World</a><a href=\"characters.html\">Characters</a><a href=\"lore.html\">Lore</a><a href=\"about.html\">About</a><a class=\"nav-feature\" href=\"chapter-one.html\">Read Chapter One</a></nav><details class=\"mobile-nav\"><summary>Menu</summary><nav aria-label=\"Mobile navigation\"><a href=\"world.html\">World</a><a href=\"characters.html\">Characters</a><a href=\"lore.html\">Lore</a><a href=\"about.html\">About</a><a href=\"chapter-one.html\">Read Chapter One</a></nav></details></header>";
const footer = '<footer class="footer"><span>© 2026 Bryan Roubos</span><span><a href="about.html">About the author</a> · <a href="chapter-one.html">Read Chapter One</a> · <a href="feedback.html">Reader feedback</a></span></footer>';
const person = {
 '@context':'https://schema.org','@type':'Person','@id':url('about.html')+'#bryan',
 name:'Bryan Roubos',url:url('about.html'),
 description:'Author and creator of the dark fantasy mystery Where the Light Falls.',
 sameAs:['https://github.com/BryanRoubos']
};
const book = {'@context':'https://schema.org','@type':'Book','@id':url('index.html')+'#book',name:'Where the Light Falls',url:url('index.html'),genre:['Dark fantasy','Mystery'],inLanguage:'en',author:{'@id':person['@id']},description:'An original dark fantasy mystery novel in progress, set in a city divided by light and shadow.'};
function write(name, title, description, body, extras={}) {
 const canonical=url(name);
 const jsonld=extras.schema?'<script type="application/ld+json">'+JSON.stringify({'@context':'https://schema.org','@graph':extras.schema==='book'?[book,person]:[person,book]})+'</script>':'';
 const verification="";
 const shareImages={'world.html':'assets/images/districts/upper-city-grand-reveal.png','lore/mira.html':'assets/images/characters/mira-varek.png','lore/maren.html':'assets/images/scenes/maren-inspects-cargo.png','lore/bram.html':'assets/images/characters/bram.png','lore/unnamed-figure.html':'assets/images/characters/unnamed-workshop-figure.png','lore/upper-city.html':'assets/images/scenes/upper-city-everyday-life.png'};
 const image=url(shareImages[name]||'assets/images/districts/deepwater-working-waterfront.png');
 const html='<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">\n'+
 '<title>'+esc(title)+'</title>'+(name.startsWith('lore/')?'<base href="../">':'')+'<meta name="description" content="'+esc(description)+'"><meta name="theme-color" content="#111a1f">\n'+
 '<link rel="canonical" href="'+canonical+'">\n'+
 '<meta property="og:type" content="'+(extras.schema?'profile':'website')+'"><meta property="og:site_name" content="Where the Light Falls"><meta property="og:title" content="'+esc(title)+'"><meta property="og:description" content="'+esc(description)+'"><meta property="og:url" content="'+canonical+'"><meta property="og:image" content="'+image+'">\n'+
 '<meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="styles.css">'+verification+jsonld+'</head><body>\n'+
 '<a class="skip" href="#main">Skip to main content</a>'+nav+'<main id="main">'+links(body)+'</main>'+footer+'</body></html>';
 fs.mkdirSync(path.dirname(path.join(site,name)),{recursive:true});
 fs.writeFileSync(path.join(site,name),html);
}
const home = page['/']().replace('<div id="home-character-gallery" class="character-gallery"></div>','<div id="home-character-gallery" class="character-gallery">'+entries.filter(e=>e.type==='Character').map(characterCard).join('')+'</div>');
write('index.html','Where the Light Falls — Dark Fantasy Novel by Bryan Roubos','Where the Light Falls is an original dark fantasy mystery novel by Bryan Roubos. Meet Elias Varek, explore Deepwater and read Chapter One.',home,{schema:'book'});
const sections=[
 ['discover','Discover the World','An introduction to the canyon metropolis, its people, geography and history.'],
 ['world','The World','Explore the city, the Deepwater river and the divided districts of Where the Light Falls.'],
 ['characters','Characters','Meet Elias Varek, Mira, Maren, Bram and an unnamed figure from the original dark fantasy novel Where the Light Falls.'],
 ['chronology','Chronology','How the crossings, trade routes and city districts of Where the Light Falls developed.'],
 ['lore','Lore Archive','Explore the public lore archive for Where the Light Falls, including its people, history and geography.']
];
for(const [slug,title,description] of sections){
 let body=page['/'+slug]();
 
 write(slug+'.html',title+' — Where the Light Falls',description,body);
}
for(const e of entries) write('lore/'+e.id+'.html',e.title+' — Where the Light Falls Lore',e.summary+' Explore the public lore of Where the Light Falls.',article(e));
const bio='<section class="shell section"><div class="kicker">ABOUT THE AUTHOR</div><h1 class="title">Bryan Roubos</h1><div class="paper"><h2>About the story</h2><p>I’m Bryan Roubos, creator of <em>Where the Light Falls</em>. I’m writing a dark fantasy mystery about loss, belonging and the lives people build within an enormous city divided by a canyon.</p><p>The novel follows Elias Varek, a Lower City worker who has spent two years searching for news of his younger sister. I’m sharing its opening chapter and a carefully curated glimpse of its world as the book develops. </p><p><a href="chapter-one.html">Read Chapter One</a> · <a href="https://github.com/BryanRoubos" rel="author">Bryan Roubos on GitHub</a></p></div></section>';
write('about.html','About Bryan Roubos — Author of Where the Light Falls','About Bryan Roubos, author and creator of the dark fantasy mystery novel Where the Light Falls.',bio,{schema:true});
const files=['index.html',...sections.map(s=>s[0]+'.html'),'about.html','chapter-one.html','feedback.html',...entries.map(e=>'lore/'+e.id+'.html')];
fs.writeFileSync(path.join(site,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+files.map(f=>'<url><loc>'+url(f)+'</loc></url>').join('\n')+'\n</urlset>\n');
fs.writeFileSync(path.join(site,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: '+url('sitemap.xml')+'\n');
function retrofit(filename,title,description) {
 let html=fs.readFileSync(path.join(site,filename),'utf8');
 const meta='<link rel="canonical" href="'+url(filename)+'"><meta property="og:url" content="'+url(filename)+'"><meta property="og:image" content="'+url('assets/images/districts/deepwater-working-waterfront.png')+'"><meta property="og:site_name" content="Where the Light Falls"><meta name="twitter:card" content="summary_large_image">';
 html=html.replace('</head>',meta+'</head>').replace(/(?:\.\/)?#\//g,'index.html').replace(/© 2026 (?:Where the Light Falls|WHERE THE LIGHT FALLS)[^<]*/g,'© 2026 Bryan Roubos · ').replace('</nav>','<a href="about.html">About</a></nav>');
 if(!html.includes('property="og:description"'))html=html.replace('</head>','<meta property="og:description" content="'+esc(description)+'"><meta property="og:title" content="'+esc(title)+'"><meta property="og:type" content="website"></head>');
 fs.writeFileSync(path.join(site,filename),html);
}
retrofit('chapter-one.html','Read Chapter One — Where the Light Falls','Read the first chapter of Bryan Roubos’s dark fantasy mystery novel.');
retrofit('feedback.html','Reader Feedback — Where the Light Falls','Share constructive reactions to Chapter One of Where the Light Falls.');
console.log('Generated '+files.length+' crawlable HTML pages and sitemap.');
