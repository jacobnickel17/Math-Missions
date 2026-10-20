import {readFile,access} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {validateCatalog,validateLesson} from '../assets/model.js';
export async function check(root=new URL('../',import.meta.url)) {
 const c=JSON.parse(await readFile(new URL('content/catalog.json',root),'utf8'));const errors=validateCatalog(c);
 if(errors.length)throw Error(errors.join('\n'));
 for(const m of c.missions){
  if(m.type==='legacy')await access(new URL(m.path+'index.html',root));
  else {const l=JSON.parse(await readFile(new URL(m.lesson,root),'utf8'));const e=validateLesson(l);if(l.id!==m.id)e.push('Lesson ID mismatch');if(e.length)throw Error(m.id+': '+e.join('; '));}
 }
 const vault=await readFile(new URL('unit-4/equation-vault/index.html',root));
 const baseline=JSON.parse(await readFile(new URL('tests/vault-baseline.json',root),'utf8'));
 if(createHash('sha256').update(vault).digest('hex')!==baseline.sha256)throw Error('Equation Vault differs from protected baseline. Review changes explicitly.');
 console.log('Catalog, lesson answers, content links, and Equation Vault baseline passed.');
}
if(process.argv[1]?.endsWith('check.mjs'))await check();
