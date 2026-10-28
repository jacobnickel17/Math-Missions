import {validateCatalog,missionUrl} from './model.js';
import {validateStory,freshStory,correct,canAdvance,gradeMastery,report,solutionMeaning} from './story-model.js';
import {graphResponse,graphScale,graphVariable,renderNumberLine} from './number-line.js';

const $=id=>document.getElementById(id);
const add=(p,tag,text='',className='')=>{const el=document.createElement(tag);el.textContent=text;if(className)el.className=className;p.append(el);return el;};
const button=(p,text,action)=>{const el=add(p,'button',text);el.type='button';el.onclick=action;return el;};
let lesson,mission,catalog,state,key,storageOK=true;
function save(){
  try{localStorage.setItem(key,JSON.stringify(state));storageOK=true;}catch{storageOK=false;}
  $('storage').textContent=storageOK?'Progress saved on this browser and device.':'Storage unavailable. Download your report before leaving this page.';
}
function verifiedGraph(container,q) {
  if(!['graph','inequality'].includes(q.type))return;
  renderNumberLine(container,graphResponse(q,q.answer),{scale:graphScale(q),variable:graphVariable(q),title:'Correct solution graph'});
}
function controls(q,container,feedback,verified) {
  let response=state.responses[q.id];
  const changed=value=>{state.responses[q.id]=value;delete state.checks[q.id];feedback.textContent='';verified.replaceChildren();save();};
  if(q.type==='choice') {
    const group=add(container,'div','','choices');group.setAttribute('role','radiogroup');group.setAttribute('aria-label',q.prompt);
    for(const o of q.choices){const label=add(group,'label','','choice');const input=document.createElement('input');input.type='radio';input.name=q.id;input.value=o.id;input.checked=response===o.id;input.onchange=()=>changed(o.id);label.append(input);add(label,'span',o.text);}
    return;
  }
  const row=add(container,'div','','answer-row');
  const input=document.createElement('input');input.id=q.id;input.type='text';input.inputMode='decimal';
  input.placeholder='Number only, without units';
  const label=add(row,'label',q.type==='number'?(q.answerLabel||'Answer'):q.type==='graph'?'Number at the circle':'Number in the solution');label.htmlFor=q.id;
  input.value=q.type==='number'?(response??''):(response?.boundary??'');row.append(input);
  if(q.type==='number'){input.oninput=()=>changed(input.value);return;}
  response=response&&typeof response==='object'?{...response}:{boundary:'',operator:'',direction:'',closed:null};
  const select=(caption,values,current,change)=>{const id=q.id+'-'+caption.replaceAll(' ','-');const lab=add(row,'label',caption);lab.htmlFor=id;const el=add(row,'select');el.id=id;el.add(new Option('Choose…',''));for(const [value,text] of values)el.add(new Option(text,value));el.value=current??'';el.onchange=()=>change(el.value);return el;};
  const graph=add(container,'div','','graph-preview');
  const scale=graphScale(q);
  let slider,directionSelect,endpointSelect,meaningSelect;
  const refreshMeaning=()=>{if(meaningSelect){const value=input.value.trim()||'the number at the circle';for(const option of Array.from(meaningSelect.children))if(option.value)option.textContent=solutionMeaning(option.value,value);}};
  const paint=()=>renderNumberLine(graph,response,{scale,variable:graphVariable(q),onPlace:value=>{
    response.boundary=String(value);input.value=String(value);if(slider)slider.value=String(value);
    update();
  }});
  const update=()=>{refreshMeaning();changed({...response});if(q.type==='graph')paint();};
  input.oninput=()=>{response.boundary=input.value;if(slider&&input.value.trim()&&Number.isFinite(Number(input.value)))slider.value=input.value;update();};
  if(q.type==='inequality'){const variable=graphVariable(q);select('Solution statement',[['<',variable+' < the entered number'],['<=',variable+' ≤ the entered number'],['>',variable+' > the entered number'],['>=',variable+' ≥ the entered number']],response.operator,v=>{response.operator=v;update();});}
  else{
    if(q.requireMeaning){
      const meanings=add(container,'div','','solution-meaning');
      container.insertBefore(meanings,row);
      add(meanings,'p','First explain what the inequality represents. Then show those solutions on the number line.');
      const lab=add(meanings,'label','Which real numbers are solutions?');lab.htmlFor=q.id+'-Meaning';
      meaningSelect=add(meanings,'select');meaningSelect.id=q.id+'-Meaning';meaningSelect.add(new Option('Choose the solution set…',''));
      for(const op of ['<','<=','>','>='])meaningSelect.add(new Option(solutionMeaning(op,input.value.trim()||'the number at the circle'),op));
      meaningSelect.value=response.meaning||'';meaningSelect.onchange=()=>{response.meaning=meaningSelect.value;update();};
    }
    directionSelect=select('Direction',[['left','Shade left (smaller values)'],['right','Shade right (larger values)']],response.direction,v=>{response.direction=v;update();});
    endpointSelect=select('Circle type',[['open','Open circle — this number is NOT a solution'],['closed','Filled circle — this number IS a solution']],response.closed===true?'closed':response.closed===false?'open':'',v=>{response.closed=v==='closed'?true:v==='open'?false:null;update();});
    add(container,'p','Graph the solution set: place the circle at the comparison number, use an open circle if that number is excluded or a filled circle if it is included, and shade toward the other solutions. Click or tap, type the number, or use the slider. Your graph is not checked until you submit.','minor');
    const tools=add(container,'div','','graph-tools');
    const label=add(tools,'label','Move the circle — arrow keys move one tick');label.htmlFor=q.id+'-position';
    slider=add(tools,'input');slider.type='range';slider.id=q.id+'-position';slider.min=scale.min;slider.max=scale.max;slider.step=scale.step;
    slider.value=response.boundary!==''&&Number.isFinite(Number(response.boundary))?response.boundary:Math.max(scale.min,Math.min(scale.max,0));
    slider.setAttribute('aria-label','Number at the circle on the number line');
    slider.oninput=()=>{response.boundary=slider.value;input.value=slider.value;update();};
    const actions=add(tools,'div','','graph-actions');
    const action=(text,field,value,selectEl,selectValue)=>button(actions,text,()=>{response[field]=value;selectEl.value=selectValue;update();});
    action('← Shade left','direction','left',directionSelect,'left');
    action('Shade right →','direction','right',directionSelect,'right');
    action('○ Open circle','closed',false,endpointSelect,'open');
    action('● Filled circle','closed',true,endpointSelect,'closed');
    paint();
  }
}
function question(q,parent,mastery=false,onCorrect) {
  const card=add(parent,'section','','question');
  add(card,'p',mastery?'Independent mastery':q.phase==='unlock'?'Independent checkpoint':q.phase==='guided'?'Guided check':'Practice','phase');
  add(card,'h3',q.prompt);
  const controlBox=add(card,'div');
  const feedback=add(card,'p','','feedback');feedback.setAttribute('role','status');
  const verified=add(card,'div','','verified-graph');
  controls(q,controlBox,feedback,verified);
  if(!mastery) {
    button(card,'Check answer',()=>{
      const result=correct(q,state.responses[q.id]);state.attempts.push({id:q.id,correct:result,response:structuredClone(state.responses[q.id]??''),time:new Date().toISOString()});
      state.checks[q.id]=result;save();feedback.textContent=result?'Correct. '+q.explanation:'Not yet. Recheck this step and try again.';feedback.className='feedback'+(result?' good':'');
      verified.replaceChildren();if(result)verifiedGraph(verified,q);
      if(result&&onCorrect)onCorrect();
    });
    if(q.phase!=='unlock'){
      const hint=add(card,'details');add(hint,'summary','Show hint');add(hint,'p',q.hint);
      hint.ontoggle=()=>{if(hint.open&&!state.hints.includes(q.id)){state.hints.push(q.id);save();}};
    }
    if(state.checks[q.id]&&correct(q,state.responses[q.id])){feedback.textContent='Correct. '+q.explanation;verifiedGraph(verified,q);}
  }
}
function stageScreen(index) {
  const stage=lesson.stages[index],root=$('game');
  add(root,'p','Chapter '+(index+1)+' of '+lesson.stages.length,'tag');
  add(root,'h2',stage.title);add(root,'p',stage.story,'story-text');
  const teaching=add(root,'section','','card teaching');add(teaching,'h3','New move');
  for(const p of stage.teach)add(teaching,'p',p);
  if(stage.exampleSteps){
    add(teaching,'h3',index===0?'Build an example together':'Try an example with less support');add(teaching,'p',stage.exampleIntro);
    const progress=add(teaching,'p');progress.setAttribute('role','status');
    const steps=add(teaching,'div');
    const draw=()=>{
      steps.replaceChildren();
      const pending=stage.exampleSteps.findIndex(q=>!state.checks[q.id]||!correct(q,state.responses[q.id]));
      progress.textContent=pending<0?'Example complete. Now apply the ideas below.':'Step '+(pending+1)+' of '+stage.exampleSteps.length;
      stage.exampleSteps.forEach((q,i)=>{
        if(pending>=0&&i>pending)return;
        if(pending<0||i<pending){const done=add(steps,'section','','example-complete');add(done,'p','✓ '+q.prompt);add(done,'p',q.explanation);button(done,'Revisit this step',()=>{for(const later of stage.exampleSteps.slice(i))delete state.checks[later.id];save();draw();});}
        else question(q,steps,false,()=>{draw();const active=steps.querySelector('.question input,.question select');active?.focus();});
      });
      if(pending<0){const summary=add(steps,'details');add(summary,'summary','Review the full worked solution');const ol=add(summary,'ol','','worked');for(const s of stage.worked)add(ol,'li',s);}
    };draw();
  }else{add(teaching,'h3','Worked example');const ol=add(teaching,'ol','','worked');for(const s of stage.worked)add(ol,'li',s);}
  if(stage.table){const wrap=add(teaching,'div','','table-wrap');const table=add(wrap,'table');add(table,'caption',stage.table.caption);const tr=add(add(table,'thead'),'tr');for(const h of stage.table.headers)add(tr,'th',h).scope='col';const body=add(table,'tbody');for(const values of stage.table.rows){const row=add(body,'tr');for(const v of values)add(row,'td',String(v));}}
  for(const q of stage.questions)question(q,root);
  const label=add(root,'label',stage.reflection);label.htmlFor='reasoning';
  const notes=add(root,'textarea');notes.id='reasoning';notes.value=state.notes[stage.id]||'';notes.placeholder='Explain using quantities, units, and evidence. Your teacher reviews this reasoning.';notes.oninput=()=>{state.notes[stage.id]=notes.value;save();};
  add(root,'p','Write at least 30 characters. This checks that you recorded reasoning; it does not automatically grade the explanation.','minor');
  const status=add(root,'p','','feedback');status.setAttribute('role','status');
  button(root,'Unlock the next story clue',()=>{
    if(!canAdvance(stage,state)){status.textContent='Complete the interactive example, check each chapter answer correctly, and record your reasoning before unlocking the clue.';return;}
    state.unlocked=Math.max(state.unlocked,index+1);save();showReveal(root,stage,index);
  });
  if(state.unlocked>index)showReveal(root,stage,index);
}
function showReveal(root,stage,index) {
  root.querySelector('.reveal')?.remove();
  const box=add(root,'section','','reveal');add(box,'h3','Recovered broadcast fragment');add(box,'p',stage.reveal);
  button(box,index+1<lesson.stages.length?'Continue to next chapter':'Begin independent mastery',()=>{state.stage=index+1;save();render();});
}
function masteryScreen() {
  const root=$('game');add(root,'h2','Independent mastery');add(root,'p','Five new questions. No hints here. Answer all five before submitting. Aim for at least 4/5, then explain your final decision.');
  const current=state.masteryAttempts.at(-1);
  if(current&&current.form===state.form){
    add(root,'p','Score: '+current.score+'/'+current.total,'result');
    for(const result of current.results){const q=lesson.mastery.forms[current.form].find(q=>q.id===result.id);const box=add(root,'section','','card');add(box,'h3',q.prompt);add(box,'p',(result.correct?'Correct. ':'Review. ')+q.explanation);verifiedGraph(add(box,'div','','verified-graph'),q);}
    if(current.score>=lesson.mastery.pass){
      add(root,'p',lesson.ending,'story-text');
      const label=add(root,'label',lesson.reportPrompt);label.htmlFor='final-reflection';
      const reflection=add(root,'textarea');reflection.id='final-reflection';reflection.value=state.reflection;reflection.oninput=()=>{state.reflection=reflection.value;save();};
      add(root,'p','Your teacher reviews this reflection. Download your report and submit it in your class assignment.');
      button(root,'Download completed mission report',download);
      if(lesson.nextMission){const next=catalog.missions.find(m=>m.id===lesson.nextMission);if(next){const a=add(root,'a','Next: '+next.title,'button');a.href=missionUrl(next);}}
    }
    button(root,'Try the alternate mastery form',()=>{state.form=state.form===0?1:0;for(const q of lesson.mastery.forms[state.form])delete state.responses[q.id];save();render();});
    return;
  }
  for(const q of lesson.mastery.forms[state.form])question(q,root,true);
  const status=add(root,'p','','feedback');status.setAttribute('role','status');
  button(root,'Submit mastery check',()=>{try{state.masteryAttempts.push(gradeMastery(lesson,state));save();render();}catch(e){status.textContent=e.message;}});
}
function render(){
  $('stages').replaceChildren();
  lesson.stages.forEach((stage,i)=>{button($('stages'),(i+1)+'. '+stage.title,()=>{state.stage=i;save();render();}).disabled=i>state.unlocked;});
  button($('stages'),'Mastery',()=>{state.stage=lesson.stages.length;save();render();}).disabled=state.unlocked<lesson.stages.length;
  $('game').replaceChildren();if(state.stage<lesson.stages.length)stageScreen(state.stage);else masteryScreen();
  $('game').tabIndex=-1;$('game').focus({preventScroll:true});
}
function download(){
  const blob=new Blob([report(lesson,mission,state)],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=lesson.id+'-mission-report.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
}
try{
  const r=await fetch('../content/catalog.json');if(!r.ok)throw Error();catalog=await r.json();if(validateCatalog(catalog).length)throw Error();
  mission=catalog.missions.find(m=>m.id===new URLSearchParams(location.search).get('id')&&m.type==='story'&&m.status!=='archived');if(!mission)throw Error();
  const res=await fetch('../'+mission.lesson);if(!res.ok)throw Error();lesson=await res.json();if(validateStory(lesson).length||lesson.id!==mission.id)throw Error();
  key='math-missions:story:'+lesson.id;state=freshStory(lesson);
  try{const saved=JSON.parse(localStorage.getItem(key)||'null');if(saved?.revision===lesson.revision&&Number.isInteger(saved.stage)&&saved.stage>=0&&saved.stage<=lesson.stages.length&&Number.isInteger(saved.unlocked)&&saved.unlocked>=saved.stage&&saved.unlocked<=lesson.stages.length&&[0,1].includes(saved.form)&&saved.responses&&saved.checks&&saved.notes&&Array.isArray(saved.attempts)&&Array.isArray(saved.hints)&&Array.isArray(saved.masteryAttempts)&&typeof saved.reflection==='string')state=saved;}catch{storageOK=false;}
  document.title=mission.title+' · Math Missions';$('title').textContent=mission.title;$('draft').textContent=mission.status==='draft'?'Teacher preview · Draft mission · Not assigned':'';$('download').disabled=false;$('download').onclick=download;
  const root=$('game');add(root,'p',lesson.opening,'story-text');add(root,'h2','Your mission');add(root,'p',lesson.objective);add(root,'p',lesson.instructions);add(root,'p','Estimated time: '+mission.minutes+' minutes. Have scratch paper nearby. Progress is saved locally; download a report for your teacher.');button(root,state.attempts.length?'Continue mission':'Begin mission',render);save();
}catch(e){$('title').textContent='Mission unavailable';$('storage').textContent='Return to Assignments or ask your teacher for the correct preview link.';}

