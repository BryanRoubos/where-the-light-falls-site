'use strict';
// Keep older shared hash URLs useful while serving real, crawlable pages.
function legacyRoute(){
 const route=location.hash.slice(1).replace(/\/$/,'');
 if(/^\/(world|characters|lore|discover|chronology)$/.test(route))location.replace(new URL(route.slice(1)+'.html',document.baseURI));
 else if(/^\/lore\/[a-z0-9-]+$/.test(route))location.replace(new URL(route.slice(1)+'.html',document.baseURI));
}
legacyRoute();
window.addEventListener('hashchange',legacyRoute);
const mobileMenu=document.querySelector('.mobile-nav');
if(mobileMenu){
 document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&mobileMenu.open){
   mobileMenu.open=false;
   mobileMenu.querySelector('summary').focus();
   event.preventDefault();
  }
 });
 document.addEventListener('click',event=>{
  if(mobileMenu.open&&!mobileMenu.contains(event.target))mobileMenu.open=false;
 });
}
const search=document.querySelector('.archive-search');
if(search){
 search.hidden=false;
 const input=document.getElementById('archive-query'),status=document.getElementById('archive-status');
 const sections=[...document.querySelectorAll('.lore-category')];
 const cards=sections.flatMap(section=>[...section.querySelectorAll('.tile')]);
 function filter(){
  const query=input.value.toLocaleLowerCase().trim(),terms=query.split(/\s+/).filter(Boolean);let count=0;
  for(const card of cards){card.hidden=!terms.every(term=>(card.dataset.search||card.textContent).toLocaleLowerCase().includes(term));if(!card.hidden)count++;}
  for(const section of sections)section.hidden=![...section.querySelectorAll('.tile')].some(card=>!card.hidden);
  document.getElementById('archive-clear').hidden=!query;
  status.textContent=count?(query?count+' matching entries.':count+' public entries.'):'No matching entries. Try a different name or topic.';
 }
 input.addEventListener('input',filter);
 document.getElementById('archive-clear').addEventListener('click',()=>{input.value='';filter();input.focus();});
 input.addEventListener('keydown',event=>{if(event.key==='Escape'){input.value='';filter();}});
 filter();
}
const feedbackForm=document.querySelector('[data-direct-feedback]');
if(feedbackForm){
 const submit=feedbackForm.querySelector('button[type="submit"]');
 const status=document.getElementById('feedback-send-status');
 let sending=false;
 feedbackForm.addEventListener('submit',async event=>{
  event.preventDefault();
  if(sending||!feedbackForm.reportValidity())return;
  const message=feedbackForm.elements.message;
  if(!message.value.trim()){status.textContent='Please add a few words before sending.';message.focus();return;}
  if(feedbackForm.elements._honey.value)return;
  sending=true;submit.disabled=true;submit.textContent='Sending…';feedbackForm.setAttribute('aria-busy','true');status.textContent='Sending your feedback…';
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),20000);
  try{
   const data=new FormData(feedbackForm);
   if(!String(data.get('email')||'').trim())data.delete('email');
   const response=await fetch(feedbackForm.dataset.ajaxEndpoint,{method:'POST',body:data,headers:{Accept:'application/json'},signal:controller.signal});
   const result=await response.json();
   if(!response.ok||!([true,'true'].includes(result.success))||/activat|confirm your email/i.test(String(result.message||'')))throw Error('Submission was not accepted');
   status.textContent='Thank you — your feedback has been submitted to Bryan.';
   feedbackForm.reset();
  }catch(error){
   status.textContent='We could not confirm that your feedback was sent. Your words are still here. Please try again in a moment.';
  }finally{
   clearTimeout(timeout);sending=false;submit.disabled=false;submit.textContent='Send feedback →';feedbackForm.removeAttribute('aria-busy');
  }
 });
}
