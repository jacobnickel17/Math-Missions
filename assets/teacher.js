import {validateCatalog,missionUrl} from './model.js';
const $=id=>document.getElementById(id);let catalog;
function parse(){const c=JSON.parse($('json').value);const e=validateCatalog(c);if(e.length)throw Error(e.join('\n'));return c;}
function sync(){ $('json').value=JSON.stringify(catalog,null,2)+'\n'; }
function load(){const m=catalog.missions.find(x=>x.id===$('mission').value);for(const k of ['title','unit','summary','minutes'])$(k).value=m[k];$('skills').value=m.skills.join(', ');$('arc').value=m.arcId;$('preview').href=m.type==='legacy'?'../'+m.path:'../missions/'+missionUrl(m);}
function options(){const selected=$('mission').value;$('mission').replaceChildren();$('arc').replaceChildren();for(const m of catalog.missions){const o=new Option(m.title,m.id);$('mission').add(o);}for(const a of catalog.arcs)$('arc').add(new Option(a.title,a.id));if(catalog.missions.some(x=>x.id===selected))$('mission').value=selected;load();}
const fail=e=>$('status').textContent=e.message;
try {const r=await fetch('../content/catalog.json');if(!r.ok)throw Error('Catalog unavailable');catalog=await r.json();if(validateCatalog(catalog).length)throw Error('Invalid catalog');sync();options();$('status').textContent='Ready. Changes here are proposals until reviewed and released.';}catch(e){fail(e);}
$('mission').onchange=load;
$('editor').onsubmit=e=>{e.preventDefault();try{catalog=parse();const m=catalog.missions.find(x=>x.id===$('mission').value);for(const k of ['title','unit','summary'])m[k]=$(k).value.trim();m.minutes=Number($('minutes').value);m.skills=$('skills').value.split(',').map(x=>x.trim()).filter(Boolean);m.arcId=$('arc').value;const errs=validateCatalog(catalog);if(errs.length)throw Error(errs.join('\n'));sync();options();$('status').textContent='Proposal updated. Copy it and create a review branch in GitHub.';}catch(e){fail(e);}};
$('validate').onclick=()=>{try{catalog=parse();options();$('status').textContent='Catalog valid. This does not approve lesson accuracy or publish anything.';}catch(e){fail(e);}};
$('copy').onclick=async()=>{try{parse();await navigator.clipboard.writeText($('json').value);$('status').textContent='Copied. Paste into GitHub, commit to a NEW branch, and open a pull request.';}catch(e){$('status').textContent='Validate the catalog, then select and copy the catalog text manually if clipboard access is unavailable. '+e.message;}};
