import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {graphResponse,graphScale,position,boundaryAt,numberLineGeometry,graphDescription,renderNumberLine} from '../assets/number-line.js';
import {freshStory} from '../assets/story-model.js';

// A small DOM fixture exercises event bindings and SVG attributes without a browser.
class Element {
  constructor(tag,doc){this.tagName=tag;this.ownerDocument=doc;this.children=[];this.attributes={};this.className='';this.value='';this._text='';this.classList={add:c=>{this.className+=' '+c;}};}
  set textContent(s){this._text=String(s);this.children=[];}
  get textContent(){return this._text+this.children.map(e=>e.textContent).join(' ');}
  append(...nodes){for(const n of nodes){n.parent=this;this.children.push(n);}}
  add(node){this.append(node);}
  insertBefore(node,reference){this.children=this.children.filter(e=>e!==node);node.parent=this;this.children.splice(this.children.indexOf(reference),0,node);}
  replaceChildren(...nodes){this._text='';this.children=[];this.append(...nodes);}
  setAttribute(k,v){this.attributes[k]=String(v);if(k==='id')this.id=String(v);}
  getAttribute(k){return this.attributes[k];}
  remove(){this.parent.children=this.parent.children.filter(e=>e!==this);}
  focus(){}
  getBoundingClientRect(){return {left:0,width:720};}
  querySelector(selector){return this.find(e=>selector.startsWith('.')?e.className.split(' ').includes(selector.slice(1)):e.tagName===selector);}
  find(match){for(const e of this.children){if(match(e))return e;const result=e.find(match);if(result)return result;}return null;}
  all(match){return this.children.flatMap(e=>[...(match(e)?[e]:[]),...e.all(match)]);}
}
class Document {
  constructor(){this.body=new Element('body',this);}
  createElement(tag){return new Element(tag,this);}
  createElementNS(ns,tag){return new Element(tag,this);}
  getElementById(id){return this.body.find(e=>e.id===id);}
}
const doc=()=>new Document();
test('uniform tick coordinates place boundaries at their actual numeric values',()=>{
 const scale=graphScale();const a=numberLineGeometry({boundary:'12',direction:'left',closed:true},scale),b=numberLineGeometry({boundary:'5',direction:'right',closed:false},scale);
 assert.equal(a.endpoint.x,position(12,scale));assert.notEqual(a.endpoint.x,b.endpoint.x);
 for(let i=1;i<a.ticks.length;i++)assert.ok(Math.abs(a.ticks[i].x-a.ticks[i-1].x-30.8)<1e-8);
 assert.equal(a.ray.direction,'left');assert.ok(a.ray.to<a.ray.from);assert.ok(b.ray.to>b.ray.from);
});
test('scaled clicking maps to the same tick at full and responsive widths and clamps edges',()=>{
 const scale=graphScale();
 for(const width of [720,640,360]){const clientX=20+position(12,scale)/720*width;assert.equal(boundaryAt(clientX,{left:20,width},scale),12);}
 assert.equal(boundaryAt(-500,{left:0,width:720},scale),-5);assert.equal(boundaryAt(9999,{left:0,width:720},scale),15);
 const fractional=graphScale({graphScale:{min:-2,max:3,step:0.5}});assert.equal(boundaryAt(position(1.5,fractional),{left:0,width:720},fractional),1.5);
 assert.throws(()=>graphScale({graphScale:{min:3,max:1,step:1}}));
});
test('all four relations create the correct endpoint and direction',()=>{
 for(const [operator,closed,direction]of [['<',false,'left'],['<=',true,'left'],['>',false,'right'],['>=',true,'right']]){
  const response=graphResponse({type:'inequality'},{operator,boundary:'9'});assert.equal(response.closed,closed);assert.equal(response.direction,direction);assert.equal(response.boundary,'9');
  assert.match(graphDescription(response),new RegExp(closed?'Filled circle':'Open circle'));
 }
 assert.equal(numberLineGeometry({boundary:'',direction:'left',closed:false},graphScale()).endpoint,null);
 assert.equal(numberLineGeometry({boundary:'Infinity',direction:'left',closed:false},graphScale()).endpoint,null);
});
test('rendered SVG has labeled ticks, positioned circles, proper fill and accessible descriptions',()=>{
 for(const closed of [false,true]){
  const document=doc(),container=document.createElement('div');
  renderNumberLine(container,{boundary:'9',direction:'left',closed},{variable:'t',title:'Correct solution graph'});
  const circle=container.querySelector('circle'),svg=container.querySelector('svg');
  assert.equal(Number(circle.attributes.cx),position(9,graphScale()));
  assert.equal(circle.attributes.fill,closed?'#64eeb4':'#07191f');
  assert.match(svg.attributes['aria-label'],/t [<≤] 9/);
  assert.equal(container.all(e=>e.tagName==='text').length,22);
  assert.match(container.textContent,/Equal tick spacing = 1 unit/);
 }
});
const load=async path=>JSON.parse(await readFile(new URL('../'+path,import.meta.url),'utf8'));
const lesson=await load('content/lessons/signal-window.json'),catalog=await load('content/catalog.json');
async function app(saved,variant){
 const document=doc();
 for(const id of ['title','storage','draft','download','stages','game']){const el=document.createElement('div');el.id=id;document.body.append(el);}
 const storage=new Map([['math-missions:story:signal-window',JSON.stringify(saved)]]);
 globalThis.document=document;globalThis.location={search:'?id=signal-window'};
 globalThis.localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)};
 globalThis.Option=class extends Element{constructor(text,value){super('option',document);this.textContent=text;this.value=value;}};
 globalThis.fetch=async path=>({ok:true,json:async()=>structuredClone(path.includes('catalog')?catalog:lesson)});
 await import('../assets/story.js?graph-test='+variant);
 document.getElementById('game').find(e=>e.tagName==='button').onclick();
 return document;
}
test('graph builder click, slider, endpoint buttons and verified-answer lifecycle work together',async()=>{
 const saved=freshStory(lesson);saved.stage=1;saved.unlocked=1;
 const document=await app(saved,'formative'),question=document.body.find(e=>e.className==='question');
 const byText=text=>question.find(e=>e.tagName==='button'&&e.textContent===text);
 const input=document.getElementById('window-graph-cap'),verified=question.querySelector('.verified-graph');
 assert.match(question.querySelector('.solution-meaning').textContent,/Which real numbers are solutions/);
 assert.equal(verified.children.length,0);
 const svg=question.querySelector('svg');svg.onclick({clientX:position(12,graphScale())});
 assert.equal(input.value,'12');
 assert.match(question.querySelector('svg').attributes['aria-label'],/Circle position: 12/);
 const meaning=document.getElementById('window-graph-cap-Meaning');meaning.value='<=';meaning.onchange();
 byText('← Shade left').onclick();byText('● Filled circle').onclick();
 assert.equal(document.getElementById('window-graph-cap-Direction').value,'left');
 byText('Check answer').onclick();assert.match(verified.textContent,/Correct solution graph/);assert.equal(verified.querySelector('circle').attributes.fill,'#64eeb4');
 meaning.value='>';meaning.onchange();byText('Check answer').onclick();assert.equal(verified.children.length,0);
 meaning.value='<=';meaning.onchange();byText('Check answer').onclick();assert.ok(verified.querySelector('svg'));
 const slider=document.getElementById('window-graph-cap-position');slider.value='11';slider.oninput();
 assert.equal(input.value,'11');assert.equal(verified.children.length,0);
 byText('Check answer').onclick();assert.equal(verified.children.length,0);
 input.value='12';input.oninput();byText('Check answer').onclick();assert.ok(verified.querySelector('svg'));
 byText('○ Open circle').onclick();assert.equal(verified.children.length,0);
 byText('Check answer').onclick();assert.equal(verified.children.length,0);
});
test('mastery solution graphs stay hidden until the full mastery form is submitted',async()=>{
 const saved=freshStory(lesson);saved.stage=4;saved.unlocked=4;
 for(const q of lesson.mastery.forms[0])saved.responses[q.id]=q.type==='number'?String(q.answer):q.type==='choice'?q.answer:{...q.answer,boundary:String(q.answer.boundary)};
 const document=await app(saved,'mastery'),root=document.getElementById('game');
 assert.doesNotMatch(root.textContent,/Correct solution graph/);
 root.find(e=>e.tagName==='button'&&e.textContent==='Submit mastery check').onclick();
 assert.match(root.textContent,/Score: 5\/5/);
 assert.equal(root.all(e=>e.className==='verified-graph'&&e.children.length>0).length,3);
});
