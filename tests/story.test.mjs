import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {validateStory,solveInequality,correct,answered,freshStory,canAdvance,gradeMastery,report,allQuestions,calculate} from '../assets/story-model.js';
import {validateCatalog,missionUrl,publishedMissions} from '../assets/model.js';
import {solutionMeaning} from '../assets/story-model.js';
const load=async id=>JSON.parse(await readFile(new URL('../content/lessons/'+id+'.json',import.meta.url),'utf8'));
const ledger=await load('blackout-ledger'), window=await load('signal-window');
const catalog=JSON.parse(await readFile(new URL('../content/catalog.json',import.meta.url),'utf8'));
const response=q=>q.type==='number'?String(q.answer):q.type==='choice'?q.answer:Object.fromEntries(Object.entries(q.answer).map(([k,v])=>[k,k==='boundary'?String(v):v]));

test('two full story lessons have independent checks, alternate forms, and correct numeric verification',()=>{
 for(const lesson of [ledger,window]){assert.deepEqual(validateStory(lesson),[]);assert.equal(lesson.stages.length,4);assert.equal(allQuestions(lesson).length,22);for(const q of allQuestions(lesson)){assert.equal(answered(q,response(q)),true,q.id);assert.equal(correct(q,response(q)),true,q.id);}}
});
test('release includes Ledger and Signal Window as distinct assignments',()=>{
 assert.deepEqual(validateCatalog(catalog),[]);
 for(const id of [ledger.id,window.id]){
  const m=catalog.missions.find(m=>m.id===id);
  assert.equal(m.status,'published');
  assert.equal(missionUrl(m),'story.html?id='+id);
  assert.equal(publishedMissions(catalog).some(x=>x.id===id),true);
  assert.equal(catalog.assignments.some(a=>a.missionIds.includes(id)),true);
 }
 assert.equal(catalog.assignments.find(a=>a.id==='signal-window').missionIds[0],window.id);
 assert.equal(ledger.nextMission,window.id);
});
test('linear inequalities reverse only for a negative coefficient and include fractional boundaries',()=>{
 assert.deepEqual(solveInequality({a:-4,b:50,c:0,d:14,op:'>='}),{operator:'<=',boundary:9});
 assert.deepEqual(solveInequality({a:-5,b:62,c:0,d:17,op:'>'}),{operator:'<',boundary:9});
 assert.deepEqual(solveInequality({a:2,b:1,c:0,d:8,op:'<='}),{operator:'<=',boundary:3.5});
 assert.throws(()=>solveInequality({a:1,b:0,c:1,d:2,op:'<'}));
});
test('boundary, relation, endpoint, shading and empty responses are checked independently',()=>{
 const iq=window.stages[2].questions[0],gq=window.stages[1].questions[2];
 assert.equal(correct(iq,{boundary:'9',operator:'>='}),false);
 assert.equal(correct(iq,{boundary:'8',operator:'<='}),false);
 assert.equal(correct(gq,{boundary:'9',direction:'left',closed:true}),false);
 assert.equal(correct(gq,{boundary:'9',direction:'right',closed:false}),false);
 for(const q of allQuestions(window))assert.equal(correct(q,''),false);
 assert.equal(correct(ledger.stages[0].questions[1],'Infinity'),false);
 assert.equal(correct(ledger.stages[0].questions[1],'66abc'),false);
});
test('story checkpoints need correct checked responses and reasoning; edited answers relock progression',()=>{
 const state=freshStory(ledger),stage=ledger.stages[0];
 assert.equal(canAdvance(stage,state),false);
 for(const q of stage.questions){state.responses[q.id]=response(q);state.checks[q.id]=true;}
 assert.equal(canAdvance(stage,state),false);
 state.notes[stage.id]='The fixed fee appears once; the badge rate is multiplied by the badge count.';
 assert.equal(canAdvance(stage,state),true);
 state.responses[stage.questions[0].id]='incorrect';
 assert.equal(canAdvance(stage,state),false);
});
test('a complete run survives JSON storage and generates evidence plus first attempts',()=>{
 for(const lesson of [ledger,window]){
  let state=freshStory(lesson);
  for(const [i,stage] of lesson.stages.entries()){
   state.stage=i;
   for(const q of stage.questions){state.responses[q.id]=response(q);state.checks[q.id]=true;state.attempts.push({id:q.id,response:response(q),correct:true});}
   state.notes[stage.id]='I checked the model, units, boundary, and the adjacent values before choosing.';
   assert.ok(canAdvance(stage,state));state.unlocked=i+1;state=JSON.parse(JSON.stringify(state));
  }
  assert.equal(state.unlocked,4);
  assert.throws(()=>gradeMastery(lesson,state),/every mastery/);
  for(const q of lesson.mastery.forms[0])state.responses[q.id]=response(q);
  const result=gradeMastery(lesson,state);assert.equal(result.score,5);state.masteryAttempts.push(result);
  state.reflection='My plan satisfies all stated conditions and I verified the calculations.';
  const output=report(lesson,{title:'Test mission'},state);
  assert.match(output,/first check correct: true/);assert.match(output,/5\/5/);assert.match(output,/Final reflection:/);
 }
});
test('all alternate mastery items accept their solutions and reject wrong values',()=>{
 for(const lesson of [ledger,window])for(const [form,questions] of lesson.mastery.forms.entries()){
  const state=freshStory(lesson);state.form=form;
  for(const q of questions)state.responses[q.id]=response(q);
  assert.equal(gradeMastery(lesson,state).score,5);
  state.responses[questions[0].id]=questions[0].type==='inequality'?{operator:'<',boundary:'999'}:'999';
  assert.equal(gradeMastery(lesson,state).score,4);
 }
});
test('content validator rejects damaged math, graph answers and missing teaching',()=>{
 const badNumber=structuredClone(ledger);badNumber.stages[0].questions[1].answer=999;assert.ok(validateStory(badNumber).some(e=>e.includes('calculation')));
 const badRelation=structuredClone(window);badRelation.stages[2].questions[0].answer.operator='>=';assert.ok(validateStory(badRelation).some(e=>e.includes('inequality')));
 const badGraph=structuredClone(window);badGraph.stages[1].questions[0].answer.closed=false;assert.ok(validateStory(badGraph).some(e=>e.includes('graph')));
 const missingTeach=structuredClone(ledger);missingTeach.stages[0].teach=[];assert.ok(validateStory(missingTeach).length);
 const missingBoundary=structuredClone(window);delete missingBoundary.stages[1].questions[0].answer.boundary;assert.ok(validateStory(missingBoundary).length);
 assert.throws(()=>calculate({op:'divide',args:[1,0]}));assert.throws(()=>calculate({op:'eval',args:[2,3]}));
});
test('real-world recommendation boundaries check neighboring whole counts and all limits',()=>{
 const profit=n=>3.5*n-36;assert.ok(profit(32)<77);assert.ok(profit(33)>=77);
 const feasible=Array.from({length:20},(_,x)=>x).filter(x=>x>=6&&18+6*x<=90&&50-4*x>=14);
 assert.deepEqual(feasible,[6,7,8,9]);assert.equal(18+6*6,54);assert.equal(50-4*6,26);
 assert.equal(5*28-(36+1.5*33),54.5);
});
test('graph answers require solution-set meaning as well as a correct drawing',()=>{
 const q=window.stages[1].questions[1],r=response(q);
 assert.equal(correct(q,r),true);
 assert.equal(correct(q,{...r,meaning:'>'}),false);
 const missing={...r};delete missing.meaning;assert.equal(answered(q,missing),false);assert.equal(correct(q,missing),false);
 assert.equal(solutionMeaning('>',5),'All real numbers greater than 5.');
 assert.equal(solutionMeaning('>=',5),'All real numbers greater than or equal to 5.');
 const bad=structuredClone(window);bad.stages[1].questions[1].answer.meaning='>';assert.ok(validateStory(bad).some(e=>e.includes('meaning')));
});
