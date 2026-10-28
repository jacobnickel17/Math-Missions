import {vaultNotes,vaultGates,architectGuidance,vaultDebrief,masteryWriting,blueprintGuidance,renderWritingSupport} from './response-guidance.js';
const vaultNames=['Balance Sensor','Phantom Circuits','Power Plans','Corrupted Log'];
const roomNames=['The Cipher Room','The Blueprint Workshop','The Power Core','The Control Center','The Final Decision'];
export function guidanceForField(path,text,id){
 if(path.includes('/equation-vault/')){
  const i=vaultNames.findIndex(name=>text.includes(name));
  if(id==='fieldNotes')return vaultNotes[i];
  if(id==='gateReason')return vaultGates[i];
  if(id==='masteryExplanation')return masteryWriting;
  if(/^boss[0-2]$/.test(id))return architectGuidance[Number(id.slice(-1))];
  if(id==='debrief')return vaultDebrief;
 }
 if(path.includes('/lost-blueprint/')&&id==='reason')return blueprintGuidance[roomNames.findIndex(name=>text.includes(name))];
}
export function enhanceWrittenResponses(root,path){
 const text=root.textContent;
 for(const field of root.querySelectorAll('textarea')){
  if(field.dataset.writingSupported)continue;
  const g=guidanceForField(path,text,field.id);if(!g)continue;
  field.dataset.writingSupported='true';
  const preceding=field.previousElementSibling;
  if(preceding?.tagName==='P')preceding.textContent=g.prompt;
  const box=renderWritingSupport(field.parentElement,g,field.id+'-support');
  field.before(box);field.placeholder='Write your own response here. You can use the sentence starter above.';
  field.setAttribute('aria-describedby',[field.getAttribute('aria-describedby'),box.id].filter(Boolean).join(' '));
 }
}
if(typeof document!=='undefined'&&typeof MutationObserver!=='undefined'){
 const root=document.getElementById('game');
 if(root){const update=()=>enhanceWrittenResponses(root,location.pathname);update();new MutationObserver(update).observe(root,{childList:true,subtree:true});}
}
