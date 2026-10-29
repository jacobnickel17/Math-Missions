import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {storyGuidance,vaultNotes,vaultGates,architectGuidance,vaultDebrief,masteryWriting,blueprintGuidance,renderWritingSupport} from '../assets/response-guidance.js';
import {guidanceForField,enhanceWrittenResponses} from '../assets/legacy-response-support.js';

test('every story reflection and final response has a specific checklist, frame and model',async()=>{
 for(const id of ['signal-window','blackout-ledger']){
  const lesson=JSON.parse(await readFile(new URL('../content/lessons/'+id+'.json',import.meta.url)));
  for(const key of [...lesson.stages.map(s=>s.id),'final']){
   const g=storyGuidance[id][key];assert.ok(g,id+': '+key);
   assert.ok(g.steps.length>=3);assert.ok(g.steps.every(s=>s.length>10));assert.ok(g.prompt.length>10);assert.match(g.starter,/___/);assert.ok(g.sample.length>60);
  }
 }
 assert.match(storyGuidance['signal-window'].combine.sample,/\$54/);
 assert.match(storyGuidance['blackout-ledger'].whole.sample,/\$54.50/);
});

test('legacy routing covers every written field without showing a mastery solution',()=>{
 const vault='/Math-Missions/unit-4/equation-vault/';
 for(const [i,name] of ['Balance Sensor','Phantom Circuits','Power Plans','Corrupted Log'].entries()){
  assert.equal(guidanceForField(vault,name,'fieldNotes'),vaultNotes[i]);
  assert.equal(guidanceForField(vault,name,'gateReason'),vaultGates[i]);
 }
 for(let i=0;i<3;i++)assert.equal(guidanceForField(vault,'Build the Next Vault','boss'+i),architectGuidance[i]);
 assert.equal(guidanceForField(vault,'','debrief'),vaultDebrief);
 assert.equal(guidanceForField(vault,'','masteryExplanation'),masteryWriting);assert.equal(masteryWriting.sample,null);
 for(const [i,name] of ['The Cipher Room','The Blueprint Workshop','The Power Core','The Control Center','The Final Decision'].entries())assert.equal(guidanceForField('/units-3-4/lost-blueprint/',name,'reason'),blueprintGuidance[i]);
 assert.equal(guidanceForField(vault,'','unknown'),undefined);
});

class Element{
 constructor(tag,doc){this.tagName=tag.toUpperCase();this.ownerDocument=doc;this.children=[];this.dataset={};this.attributes={};this._text='';this.value='';}
 set textContent(text){this._text=text;this.children=[];}get textContent(){return this._text+this.children.map(c=>c.textContent).join(' ');}
 append(e){e.parentElement=this;this.children.push(e);}
 before(e){const p=this.parentElement;p.children=p.children.filter(c=>c!==e);p.children.splice(p.children.indexOf(this),0,e);e.parentElement=p;}
 get previousElementSibling(){return this.parentElement.children[this.parentElement.children.indexOf(this)-1];}
 setAttribute(k,v){this.attributes[k]=v;}getAttribute(k){return this.attributes[k];}
 querySelectorAll(tag){return this.children.flatMap(c=>[...(c.tagName===tag.toUpperCase()?[c]:[]),...c.querySelectorAll(tag)]);}
}
const document={createElement(tag){return new Element(tag,this);}};
test('writing support is accessible and leaves the student response alone when the sample opens',()=>{
 const root=document.createElement('main');root.textContent='The Final Decision';
 const p=document.createElement('p');p.textContent='Old difficult prompt';root.append(p);
 const field=document.createElement('textarea');field.id='reason';field.value='Our original reasoning';root.append(field);
 enhanceWrittenResponses(root,'/units-3-4/lost-blueprint/');
 assert.equal(field.value,'Our original reasoning');assert.equal(field.getAttribute('aria-describedby'),'reason-support');
 assert.equal(p.textContent,blueprintGuidance[4].prompt);assert.equal(root.querySelectorAll('section').length,1);
 const details=root.querySelectorAll('details')[0];details.open=true;details.ontoggle();
 assert.equal(field.value,'Our original reasoning');assert.match(details.textContent,/Answers may vary/);
 enhanceWrittenResponses(root,'/units-3-4/lost-blueprint/');assert.equal(root.querySelectorAll('section').length,1);
});
test('sample views can be recorded and mastery writing has no sample disclosure',()=>{
 const root=document.createElement('main');let opened=0;
 const box=renderWritingSupport(root,vaultNotes[0],'notes-support',{onSample:()=>opened++});
 const details=box.querySelectorAll('details')[0];details.open=true;details.ontoggle();assert.equal(opened,1);
 const independent=renderWritingSupport(root,masteryWriting,'mastery-support');assert.equal(independent.querySelectorAll('details').length,0);
});

test('Game Day uses short teaching and one coherent money/time context',async()=>{
 const l=JSON.parse(await readFile(new URL('../content/lessons/signal-window.json',import.meta.url)));
 assert.match(l.stages[0].story,/Snacks cost \$18/);assert.match(l.stages[0].story,/prize.*\$6/i);
 assert.match(l.stages[2].story,/50 minutes/);assert.match(l.stages[2].story,/14 minutes.*cleanup/);
 const studentText=JSON.stringify(l,(k,v)=>['id','math','answer','calculation'].includes(k)?undefined:v);
 assert.doesNotMatch(studentText,/demo session|simulator|energy reserve|over the real numbers|real-number solution|state the domain/i);
 for(const s of l.stages){assert.ok(s.teach.join(' ').split(/\s+/).length<=105,s.id+' teaching should stay brief');assert.ok(s.teach.every(p=>p.length<=200),s.id+' paragraph too long');}
 assert.match(storyGuidance['signal-window'].translate.sample,/Ten rounds cost/);
 assert.match(storyGuidance['signal-window'].final.sample,/14 minutes/);
 assert.equal(18+6*6,54);assert.equal(50-4*6,26);assert.equal(18+6*9,72);assert.equal(50-4*9,14);
});
