import {mkdir,rm,cp,writeFile} from 'node:fs/promises';
import {check} from './check.mjs';
await check();
const dist=new URL('../dist/',import.meta.url);
await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true});
for(const p of ['index.html','unit-4','missions','teacher','assets','content'])await cp(new URL('../'+p,import.meta.url),new URL(p,dist),{recursive:true});
await writeFile(new URL('.nojekyll',dist),'');
console.log('Built static preview in dist/ (no deployment).');
