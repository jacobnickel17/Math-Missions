import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFile,access} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
test('production releases Vault, Ledger, and Blueprint while excluding draft lesson files',async()=>{
 execFileSync(process.execPath,['scripts/build.mjs','--production'],{cwd:root});
 const live=JSON.parse(await readFile(new URL('dist/content/catalog.json',root),'utf8'));
 assert.deepEqual(live.missions.map(m=>m.id),['equation-vault','blackout-ledger','lost-blueprint']);
 assert.ok(live.assignments.some(a=>a.id==='blackout-ledger'));
 assert.ok(live.assignments.some(a=>a.id==='units-3-4-extension'));
 await access(new URL('dist/units-3-4/lost-blueprint/index.html',root));
 await access(new URL('dist/content/lessons/blackout-ledger.json',root));
 await assert.rejects(access(new URL('dist/content/lessons/signal-window.json',root)));
 await assert.rejects(access(new URL('dist/content/lessons/signal-checkpoint.json',root)));
 const teacher=JSON.parse(await readFile(new URL('dist/content/teacher-catalog.json',root),'utf8'));
 assert.equal(teacher.missions.find(m=>m.id==='signal-window').status,'draft');
});
