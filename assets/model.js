export const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export function localPath(s) {
  return typeof s === 'string' && s.length > 0 && /^(?:[a-z0-9-]+\/)*[a-z0-9.-]*\/?$/.test(s) && !s.includes('..') && !s.startsWith('/');
}
export function validateCatalog(c) {
  const errors = [];
  const check = (ok, msg) => { if (!ok) errors.push(msg); };
  const text = (v) => typeof v === 'string' && v.trim().length > 0 && v.length <= 2000;
  check(c?.version === 1, 'Catalog version must be 1');
  for (const key of ['missions','arcs','assignments']) {
    check(Array.isArray(c?.[key]), key + ' must be an array');
    if (!Array.isArray(c?.[key])) continue;
    const seen = new Set();
    for (const v of c[key]) {
      check(v && idPattern.test(v.id) && !seen.has(v.id), key + ': IDs must be stable and unique');
      seen.add(v?.id);
      check(text(v?.title), key + ': title required');
    }
  }
  if (errors.length) return errors;
  const arcs = new Set(c.arcs.map(x => x.id));
  const missions = new Map(c.missions.map(x => [x.id, x]));
  for (const a of c.arcs) check(text(a.briefing), a.id + ': briefing required');
  for (const m of c.missions) {
    check(text(m.unit) && text(m.summary), m.id + ': unit and summary required');
    check(Array.isArray(m.skills) && m.skills.length > 0 && m.skills.every(text), m.id + ': skills required');
    check(Number.isInteger(m.minutes) && m.minutes > 0 && m.minutes <= 300, m.id + ': minutes must be 1–300');
    check(['draft','published','archived'].includes(m.status), m.id + ': invalid status');
    check(arcs.has(m.arcId), m.id + ': unknown story arc');
    check(['legacy','practice'].includes(m.type), m.id + ': invalid mission type');
    check(localPath(m.type === 'legacy' ? m.path : m.lesson), m.id + ': unsafe content path');
    if (m.type === 'practice') check(m.lesson === 'content/lessons/' + m.id + '.json', m.id + ': lesson file must match ID');
  }
  for (const a of c.assignments) {
    check(text(a.instructions) && text(a.nextStep), a.id + ': directions and next step required');
    check(Array.isArray(a.missionIds) && a.missionIds.length > 0 && new Set(a.missionIds).size === a.missionIds.length, a.id + ': mission list required and unique');
    for (const id of a.missionIds || []) check(missions.get(id)?.status === 'published', a.id + ': assigned mission must be published: ' + id);
  }
  return errors;
}
export function validateLesson(l) {
  const e = [];
  if (!l || !idPattern.test(l.id) || typeof l.objective !== 'string' || !l.objective.trim() || typeof l.instructions !== 'string' || !l.instructions.trim()) e.push('Lesson ID, objective and instructions required');
  if (!Array.isArray(l?.problems) || l.problems.length < 1 || l.problems.length > 20) return [...e, 'Use 1–20 problems'];
  const ids = new Set();
  for (const p of l.problems) {
    if (!p || !idPattern.test(p.id) || ids.has(p.id)) e.push('Problem IDs must be unique');
    ids.add(p?.id);
    if (!['a','b','c','d','answer'].every(k => typeof p?.[k] === 'number' && Number.isFinite(p[k]) && Math.abs(p[k]) <= 1000000)) { e.push('Finite, bounded coefficients and answer required'); continue; }
    if (p.a === p.c || Math.abs((p.a-p.c)*p.answer - (p.d-p.b)) > 1e-8) e.push('Answer does not solve unique equation: ' + p.id);
    if (!['prompt','hint','explanation'].every(k => typeof p[k] === 'string' && p[k].trim())) e.push('Prompt, hint and explanation required: ' + p.id);
  }
  return e;
}
export function missionUrl(m, prefix = '../') { return m.type === 'legacy' ? prefix + m.path : 'lesson.html?id=' + encodeURIComponent(m.id); }
export function publishedMissions(c) { return c.missions.filter(m => m.status === 'published'); }
export function equation(p) { return p.a + 'x + (' + p.b + ') = ' + p.c + 'x + (' + p.d + ')'; }
