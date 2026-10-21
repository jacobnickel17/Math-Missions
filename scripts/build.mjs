import {mkdir,rm,cp,writeFile,readFile,unlink} from 'node:fs/promises';
import {check} from './check.mjs';
await check();
const production=process.argv.includes('--production');
const dist=new URL('../dist/',import.meta.url);
await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true});
for(const p of ['index.html','unit-4','missions','teacher','assets','content'])await cp(new URL('../'+p,import.meta.url),new URL(p,dist),{recursive:true});
const catalog=JSON.parse(await readFile(new URL('../content/catalog.json',import.meta.url),'utf8'));
// Preserve the complete source metadata for teacher proposals while student routes
// see only released content. Draft lesson source stays in GitHub, not the live build.
await writeFile(new URL('content/teacher-catalog.json',dist),JSON.stringify(catalog,null,2)+'\n');
if(production){
 const live={...catalog,missions:catalog.missions.filter(m=>m.status==='published')};
 const ids=new Set(live.missions.map(m=>m.id));
 live.assignments=catalog.assignments.filter(a=>a.missionIds.every(id=>ids.has(id)));
 await writeFile(new URL('content/catalog.json',dist),JSON.stringify(live,null,2)+'\n');
 for(const m of catalog.missions.filter(m=>m.status!=='published'&&m.lesson))await unlink(new URL(m.lesson,dist));
}
await writeFile(new URL('.nojekyll',dist),'');
console.log(production?'Built production files in dist/ (not deployed).':'Built static preview in dist/ (no deployment).');
