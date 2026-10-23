import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {validateCatalog,validateLesson,publishedMissions,localPath,missionUrl} from '../assets/model.js';import {check} from '../scripts/check.mjs';
const c=JSON.parse(await readFile(new URL('../content/catalog.json',import.meta.url)));const l=JSON.parse(await readFile(new URL('../content/lessons/signal-checkpoint.json',import.meta.url)));
test('repository content and protected Vault baseline',()=>check());
test('drafts hidden; legacy links stable when titles change',()=>{assert.equal(publishedMissions(c).length,3);const m={...c.missions[0],title:'New title'};assert.equal(missionUrl(m),'../unit-4/equation-vault/');});
test('assignments reject missing or draft lessons',()=>{for(const id of ['missing','signal-checkpoint']){const v=structuredClone(c);v.assignments[0].missionIds=[id];assert.ok(validateCatalog(v).length);}});
test('unsafe paths, duplicate IDs, unknown arcs, invalid minutes rejected',()=>{for(const patch of [{path:'https://bad.test/'},{path:'../secrets'},{arcId:'missing'},{minutes:0},{status:'ready'},{id:c.missions[1].id}]){const v=structuredClone(c);Object.assign(v.missions[0],patch);assert.ok(validateCatalog(v).length);}});
test('URLs are restricted to safe local content',()=>{for(const p of ['../x','javascript:alert(1)','//example.org','%2e%2e/x','a\\b'])assert.equal(localPath(p),false);});
test('answer checks reject incorrect, degenerate, nonfinite and empty content',()=>{for(const patch of [{answer:8},{a:1,c:1},{answer:Infinity},{hint:''}]){const v=structuredClone(l);Object.assign(v.problems[0],patch);assert.ok(validateLesson(v).length);}assert.deepEqual(validateLesson(l),[]);});
test('catalog IDs and required collections reject malformed input',()=>{assert.ok(validateCatalog({}).length);const v=structuredClone(c);v.missions[0].id='Bad ID';assert.ok(validateCatalog(v).length);});
test('Lost Blueprint question prompts use clear familiar math directions',async()=>{
 const html=await readFile(new URL('../units-3-4/lost-blueprint/index.html',import.meta.url),'utf8');
 const rooms=['The Cipher Room','The Blueprint Workshop','The Power Core','The Control Center','The Final Decision'];
 for(const room of rooms) assert.ok(html.includes("title:'"+room+"'"),room+' missing');
 for(const phrase of ['Simplify the following expression.','What is the simplified form of the following expression?','Solve for x.','How many solutions does the following equation have?','Which equation represents this situation?'])assert.ok(html.includes(phrase),phrase+' missing');
 for(const phrase of ['Simplify the combined signal.','Find the corrected simplification.','Solve for the voltage x.','How many solutions does this anomalous equation have?'])assert.ok(!html.includes(phrase),'Old wording remains: '+phrase);
 assert.ok(html.includes("esc(q[6]||'Enter your answer')"));
});
