'use strict';
// Keep older shared hash URLs useful while serving real, crawlable pages.
function legacyRoute(){
 const route=location.hash.slice(1).replace(/\/$/,'');
 if(/^\/(world|characters|lore|discover|chronology)$/.test(route))location.replace(new URL(route.slice(1)+'.html',document.baseURI));
 else if(/^\/lore\/[a-z0-9-]+$/.test(route))location.replace(new URL(route.slice(1)+'.html',document.baseURI));
}
legacyRoute();
window.addEventListener('hashchange',legacyRoute);
const search=document.querySelector('.archive-search');
if(search){
 search.hidden=false;
 const input=document.getElementById('archive-query'),status=document.getElementById('archive-status');
 const sections=[...document.querySelectorAll('.lore-category')];
 const cards=sections.flatMap(section=>[...section.querySelectorAll('.tile')]);
 function filter(){
  const query=input.value.toLocaleLowerCase().trim();let count=0;
  for(const card of cards){card.hidden=!card.textContent.toLocaleLowerCase().includes(query);if(!card.hidden)count++;}
  for(const section of sections)section.hidden=![...section.querySelectorAll('.tile')].some(card=>!card.hidden);
  status.textContent=count?(query?count+' matching entries.':count+' public entries.'):'No matching entries. Try a different name or topic.';
 }
 input.addEventListener('input',filter);filter();
}
const draft=document.getElementById('feedback-draft');
if(draft){
 draft.hidden=false;
 draft.addEventListener('submit',event=>{
  event.preventDefault();if(!draft.reportValidity())return;
  const message=document.getElementById('reader-message').value.trim();
  if(!message){document.getElementById('draft-status').textContent='Please add a few words before opening your draft.';return;}
  const name=document.getElementById('reader-name').value.trim();
  const body=message+(name?'\n\n— '+name:'');
  location.href='mailto:roubos@proton.me?subject='+encodeURIComponent('Where the Light Falls — reader feedback')+'&body='+encodeURIComponent(body);
  document.getElementById('draft-status').textContent='Your email app was requested. If no draft opens, email roubos@proton.me directly; your words remain here to copy.';
 });
}
