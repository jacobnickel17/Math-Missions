import {readFile,writeFile,access} from 'node:fs/promises';import {resolve} from 'node:path';import {validateCatalog,validateLesson} from '../assets/model.js';
const filename=process.argv[2];if(!filename)throw Error('Usage: node scripts/import-draft.mjs proposal.json');
const proposal=JSON.parse(await readFile(resolve(filename),'utf8'));const {mission,lesson}=proposal;
if(mission?.status!=='draft'||mission?.type!=='practice'||mission?.id!==lesson?.id)throw Error('New AI content must be a matching practice lesson with draft status');
const catalogPath=new URL('../content/catalog.json',import.meta.url);const c=JSON.parse(await readFile(catalogPath,'utf8'));
if(c.missions.some(m=>m.id===mission.id))throw Error('Existing ID: revise the existing files on a review branch instead');
const e=[...validateCatalog({...c,missions:[...c.missions,mission]}),...validateLesson(lesson)];if(e.length)throw Error(e.join('\n'));
const target=new URL('../'+mission.lesson,import.meta.url);try{await access(target);throw Error('Lesson file already exists');}catch(e){if(e.code!=='ENOENT')throw e;}
await writeFile(target,JSON.stringify(lesson,null,2)+'\n');c.missions.push(mission);await writeFile(catalogPath,JSON.stringify(c,null,2)+'\n');console.log('Draft imported. Review the diff, run npm test and npm run build, then open a draft PR. Nothing published.');
