import {validateCatalog, publishedMissions, missionUrl} from './model.js';
const add = (parent, tag, text, cls) => { const el = document.createElement(tag); el.textContent = text; if(cls) el.className = cls; parent.append(el); return el; };
try {
  const r = await fetch('../content/catalog.json'); if(!r.ok) throw Error('Catalog unavailable');
  const c = await r.json(); const errors = validateCatalog(c); if(errors.length) throw Error(errors.join('; '));
  const byId = new Map(c.missions.map(m => [m.id,m]));
  const chosen = new URLSearchParams(location.search).get('assignment');
  const assignments = chosen ? c.assignments.filter(a => a.id === chosen) : c.assignments;
  document.querySelector('#status').textContent = chosen && !assignments.length ? 'Assignment not found. Ask your teacher for the correct link, or choose from the library.' : '';
  for(const a of assignments) {
    const card = add(document.querySelector('#assignments'),'article','','card'); card.id = a.id;
    add(card,'h2',a.title); add(card,'p',a.instructions);
    for(const id of a.missionIds) { const m = byId.get(id); const link = add(card,'a','Start: '+m.title,'button'); link.href=missionUrl(m); }
    add(card,'p','Next: '+a.nextStep);
    const share=add(card,'a','Link to this assignment'); share.href='?assignment='+encodeURIComponent(a.id);
  }
  for(const m of publishedMissions(c)) {
    const card=add(document.querySelector('#missions'),'article','','card');
    add(card,'p',m.unit+' · '+m.minutes+' min','tag'); add(card,'h3',m.title); add(card,'p',m.summary);
    add(card,'p',m.skills.join(' · '),'muted'); const link=add(card,'a','Open mission','button'); link.href=missionUrl(m);
  }
} catch(e) { document.querySelector('#status').textContent='Assignments could not load. Please refresh or ask your teacher. Equation Vault is still available from Home.'; }
