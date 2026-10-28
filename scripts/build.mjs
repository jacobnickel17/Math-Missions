import {mkdir,rm,cp,writeFile,readFile,unlink} from 'node:fs/promises';
import {check} from './check.mjs';
await check();
const production=process.argv.includes('--production');
const dist=new URL('../dist/',import.meta.url);
await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true});
for(const p of ['index.html','unit-4','units-3-4','missions','teacher','assets','content'])await cp(new URL('../'+p,import.meta.url),new URL(p,dist),{recursive:true});
// Add shared writing support to the built legacy pages while preserving the
// original Vault source and its protected mathematical baseline byte-for-byte.
for(const path of ['unit-4/equation-vault/index.html','units-3-4/lost-blueprint/index.html']){
 const target=new URL(path,dist);let html=await readFile(target,'utf8');
 html=html.replace('</head>','<link rel="stylesheet" href="../../assets/response-support.css"></head>');
 html=html.replace('</body>','<script type="module" src="../../assets/legacy-response-support.js"></script></body>');
 await writeFile(target,html);
}
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

