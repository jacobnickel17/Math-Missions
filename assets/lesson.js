import {validateCatalog,validateLesson,equation} from './model.js';
const add=(p,t,s)=>{const e=document.createElement(t);e.textContent=s;p.append(e);return e;};
try {
 const r=await fetch('../content/catalog.json');if(!r.ok)throw Error();const c=await r.json();if(validateCatalog(c).length)throw Error();
 const m=c.missions.find(m=>m.id===new URLSearchParams(location.search).get('id') && m.type==='practice' && m.status!=='archived');if(!m)throw Error();
 const res=await fetch('../'+m.lesson);if(!res.ok)throw Error();const l=await res.json();if(validateLesson(l).length || l.id!==m.id)throw Error();
 document.title=m.title+' · Math Missions'; document.querySelector('#status').textContent=m.status==='draft'?'Teacher preview · This lesson is a draft and is not assigned.':'';
 const root=document.querySelector('#lesson');add(root,'h1',m.title);add(root,'p',c.arcs.find(a=>a.id===m.arcId).briefing);add(root,'h2','Your goal');add(root,'p',l.objective);add(root,'p',l.instructions);
 for(const p of l.problems){
  const card=add(root,'article','');card.className='card';add(card,'h2',p.prompt);add(card,'p',equation(p)).className='equation';
  const label=add(card,'label','x =');const input=add(card,'input','');input.id=p.id;input.type='text';input.inputMode='decimal';label.htmlFor=p.id;
  const feedback=add(card,'p','');feedback.setAttribute('role','status');
  const check=add(card,'button','Check answer');check.onclick=()=>{const n=Number(input.value);feedback.textContent=input.value.trim() && Number.isFinite(n) && Math.abs(n-p.answer)<1e-8 ? 'Correct. '+p.explanation : 'Try again. Use the hint if you need support.';};
  const details=add(card,'details','');add(details,'summary','Show hint');add(details,'p',p.hint);
 }
} catch(e) {document.querySelector('#status').textContent='Lesson unavailable. Return to assignments or ask your teacher.';}
