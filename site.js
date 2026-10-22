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
 const provider=document.getElementById('feedback-provider'),status=document.getElementById('draft-status');
 const proceed=document.getElementById('feedback-continue');
 provider.addEventListener('change',()=>{
  proceed.textContent=({gmail:'Continue to Gmail ↗',outlook:'Continue to Outlook ↗',copy:'Copy message',app:'Open email app →'})[provider.value];
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
