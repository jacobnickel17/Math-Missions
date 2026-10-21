import {validateCatalog,missionUrl} from './model.js';
const root=document.getElementById('sequence');
const add=(parent,tag,text)=>{const e=document.createElement(tag);e.textContent=text;parent.append(e);return e;};
try{
 const r=await fetch('../content/catalog.json');if(!r.ok)throw Error();const c=await r.json();if(validateCatalog(c).length)throw Error();
 for(const [i,id] of ['equation-vault','blackout-ledger','signal-window'].entries()){
  const m=c.missions.find(m=>m.id===id);if(!m)throw Error();
  const card=add(root,'article','');card.className='card';
  add(card,'p','Mission '+(i+1)+' · '+m.minutes+' min · '+m.status).className='tag';
  add(card,'h2',m.title);add(card,'p',m.summary);add(card,'p','Skills: '+m.skills.join(' · '));
  const a=add(card,'a',m.status==='draft'?'Preview draft mission':'Open Equation Vault');a.href=missionUrl(m);a.className='button';
 }
 document.getElementById('status').textContent='';
}catch{document.getElementById('status').textContent='Sequence unavailable. Open the teacher workspace to choose a mission.';}
