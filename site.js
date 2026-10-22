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
 const provider=document.getElementById('feedback-provider'),status=document.getElementById('draft-status');
 const proceed=document.getElementById('feedback-continue');
 provider.addEventListener('change',()=>{
  proceed.textContent=({gmail:'Continue to Gmail ↗',outlook:'Continue to Outlook ↗',copy:'Copy message',app:'Open email app →'})[provider.value];
  document.getElementById('feedback-copy').hidden=provider.value==='copy';
  status.textContent='';
 });
 function messageBody(){
  const message=document.getElementById('reader-message').value.trim();
  if(!message){status.textContent='Please add a few words first.';return null;}
  const name=document.getElementById('reader-name').value.trim();
  return message+(name?'\n\n— '+name:'');
 }
 async function copyMessage(body){
  try{await navigator.clipboard.writeText(body);status.textContent='Message copied. Paste it into your webmail and send it to roubos@proton.me.';}
  catch(error){const field=document.getElementById('reader-message');field.focus();field.select();status.textContent='Select and copy your words, then paste them into your webmail and send to roubos@proton.me.';}
 }
 document.getElementById('feedback-copy').addEventListener('click',()=>{const body=messageBody();if(body)copyMessage(body);});
 draft.addEventListener('submit',event=>{
  event.preventDefault();if(!draft.reportValidity())return;
  const body=messageBody();if(!body)return;
  if(provider.value==='copy'){copyMessage(body);return;}
  const subject='Where the Light Falls — reader feedback',to='roubos@proton.me';
  if(provider.value==='app'){
   location.href='mailto:'+to+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
   status.textContent='Your email app was requested. If nothing opens, choose Gmail or Outlook above, or copy your message.';
   return;
  }
  const url=new URL(provider.value==='outlook'?'https://outlook.live.com/mail/0/deeplink/compose':'https://mail.google.com/mail/');
  const fields=provider.value==='outlook'?{to,subject,body}:{view:'cm',fs:'1',to,su:subject,body};
  for(const [key,value] of Object.entries(fields))url.searchParams.set(key,value);
  window.open(url.href,'_blank','noopener,noreferrer');
  status.textContent='Continue in the new browser tab to review and send. If it did not open, allow the new tab or use Copy message.';
 });
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
   status.textContent='We could not confirm that your feedback was sent. Your words are still here. Try again, or use the email options below.';
   document.getElementById('reader-message').value=message.value;
   document.getElementById('reader-name').value=feedbackForm.elements.name.value;
   const fallback=document.getElementById('feedback-email-options');if(fallback)fallback.open=true;
  }finally{
   clearTimeout(timeout);sending=false;submit.disabled=false;submit.textContent='Send feedback →';feedbackForm.removeAttribute('aria-busy');
  }
 });
}
