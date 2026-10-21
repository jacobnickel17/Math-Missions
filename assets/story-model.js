import {idPattern} from './model.js';

const operators = ['<', '<=', '>', '>='];
const flip = {'<':'>', '<=':'>=', '>':'<', '>=':'<='};
export function calculate(node) {
  if (typeof node === 'number' && Number.isFinite(node)) return node;
  if (!node || !Array.isArray(node.args)) throw Error('Invalid calculation');
  const a = node.args.map(calculate);
  if (node.op === 'ceil' && a.length === 1) return Math.ceil(a[0]);
  if (node.op === 'floor' && a.length === 1) return Math.floor(a[0]);
  if (a.length !== 2) throw Error('Calculation needs two inputs');
  const values = {add: a[0]+a[1], subtract:a[0]-a[1], multiply:a[0]*a[1], divide:a[0]/a[1]};
  if (!(node.op in values) || !Number.isFinite(values[node.op])) throw Error('Invalid operation');
  return values[node.op];
}
export function solveInequality(math) {
  if (!math || !['a','b','c','d'].every(k => Number.isFinite(math[k])) || !operators.includes(math.op)) throw Error('Invalid inequality');
  const coefficient = math.a - math.c;
  if (coefficient === 0) throw Error('A nonzero coefficient is required');
  return {operator: coefficient < 0 ? flip[math.op] : math.op, boundary:(math.d-math.b)/coefficient};
}
export function allQuestions(lesson) {
  return [...lesson.stages.flatMap(s => s.questions), ...lesson.mastery.forms.flat()];
}
export function validateStory(lesson) {
  const errors = [];
  const text = x => typeof x === 'string' && x.trim().length > 0;
  if (!lesson || lesson.format !== 'story-v1' || !idPattern.test(lesson.id) || !Number.isInteger(lesson.revision) || lesson.revision < 1) return ['Invalid story identity or format'];
  for (const k of ['objective','instructions','opening','ending','reportPrompt']) if (!text(lesson[k])) errors.push(k+' required');
  if (!Array.isArray(lesson.stages) || lesson.stages.length < 3) return [...errors,'At least three teaching stages required'];
  const ids = new Set();
  for (const stage of lesson.stages) {
    for (const k of ['id','title','story','reveal','reflection']) if (!text(stage[k])) errors.push('Stage '+k+' required');
    if (!Array.isArray(stage.teach) || !stage.teach.length || !stage.teach.every(text) || !Array.isArray(stage.worked) || !stage.worked.length || !stage.worked.every(text)) errors.push('Teaching and worked steps required');
    if (!Array.isArray(stage.questions) || !['guided','practice','unlock'].every(p => stage.questions.some(q => q.phase === p))) errors.push('Guided, practice and unlock questions required');
    if (!idPattern.test(stage.id) || ids.has(stage.id)) errors.push('Unique stage IDs required');
    ids.add(stage.id);
  }
  if (!Array.isArray(lesson.mastery?.forms) || lesson.mastery.forms.length !== 2 || lesson.mastery.forms.some(f => !Array.isArray(f) || f.length !== 5) || lesson.mastery.pass !== 4) return [...errors,'Two five-question mastery forms, pass score 4 required'];
  const qids = new Set();
  for (const q of allQuestions(lesson)) {
    if (!q || !idPattern.test(q.id) || qids.has(q.id)) errors.push('Unique question IDs required');
    qids.add(q?.id);
    if (!text(q?.prompt) || !text(q?.explanation) || !['number','choice','inequality','graph'].includes(q?.type) || !['guided','practice','unlock','mastery'].includes(q?.phase)) {errors.push('Question text/type/phase required');continue;}
    if (q.phase !== 'unlock' && q.phase !== 'mastery' && !text(q.hint)) errors.push('Supported practice needs a hint');
    try {
      if (q.type === 'number' && (!Number.isFinite(q.answer) || Math.abs(calculate(q.calculation)-q.answer)>1e-8)) errors.push(q.id+': calculation and answer differ');
      if (q.type === 'choice' && (!Array.isArray(q.choices) || q.choices.length<3 || new Set(q.choices.map(o=>o.id)).size!==q.choices.length || !q.choices.every(o=>idPattern.test(o.id)&&text(o.text)) || !q.choices.some(o=>o.id===q.answer))) errors.push(q.id+': invalid choices');
      if (q.type === 'inequality' || q.type === 'graph') {
        if (!Number.isFinite(q.answer?.boundary)) throw Error('A finite answer boundary is required');
        if (q.type === 'graph' && (!['left','right'].includes(q.answer.direction) || typeof q.answer.closed !== 'boolean')) throw Error('Graph endpoint and direction required');
        const solution=solveInequality(q.math);
        if (q.type==='inequality' && (q.answer.operator!==solution.operator || Math.abs(q.answer.boundary-solution.boundary)>1e-8)) errors.push(q.id+': inequality solution incorrect');
        if (q.type==='graph' && (q.answer.direction!==(solution.operator.startsWith('<')?'left':'right') || q.answer.closed!==solution.operator.includes('=') || Math.abs(q.answer.boundary-solution.boundary)>1e-8)) errors.push(q.id+': graph does not match inequality');
      }
    } catch { errors.push(q.id+': invalid mathematical verification'); }
  }
  for (const f of lesson.mastery.forms) if (f.some(q=>q.phase!=='mastery')) errors.push('Mastery form phases must be mastery');
  return errors;
}
const numeric = value => typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value));
export function correct(q, response) {
  if (q.type === 'number') return numeric(response) && Math.abs(Number(response)-q.answer)<1e-8;
  if (q.type === 'choice') return typeof response === 'string' && response===q.answer;
  if (!response || !numeric(response.boundary) || Math.abs(Number(response.boundary)-q.answer.boundary)>1e-8) return false;
  if (q.type === 'inequality') return response.operator===q.answer.operator;
  return response.direction===q.answer.direction && response.closed===q.answer.closed;
}
export function answered(q, response) {
  if(q.type==='choice')return q.choices.some(o=>o.id===response);
  if(q.type==='number')return numeric(response);
  return !!response && numeric(response.boundary) && (q.type==='inequality'?operators.includes(response.operator):['left','right'].includes(response.direction)&&typeof response.closed==='boolean');
}
export function freshStory(lesson) {
  return {revision:lesson.revision,stage:0,unlocked:0,responses:{},checks:{},notes:{},attempts:[],hints:[],masteryAttempts:[],form:0,reflection:''};
}
export function canAdvance(stage,state) {
  return stage.questions.every(q=>correct(q,state.responses[q.id])&&state.checks[q.id]===true) && (state.notes[stage.id]||'').trim().length>=30;
}
export function gradeMastery(lesson,state) {
  const questions=lesson.mastery.forms[state.form];
  if(!questions.every(q=>answered(q,state.responses[q.id])))throw Error('Answer every mastery question before submitting.');
  const results=questions.map(q=>({id:q.id,response:state.responses[q.id],correct:correct(q,state.responses[q.id])}));
  return {form:state.form,score:results.filter(r=>r.correct).length,total:questions.length,results};
}
export function report(lesson,mission,state) {
  const lines=[mission.title,'Operation Signal Zero — local practice report','Content revision: '+lesson.revision,'Exported: '+new Date().toISOString(),'Objective: '+lesson.objective,'This is a self-reported local record; explanations need teacher review.',''];
  for(const stage of lesson.stages){
    lines.push(stage.title,'Unlocked: '+(state.unlocked>lesson.stages.indexOf(stage)?'yes':'no'));
    for(const q of stage.questions){const attempts=state.attempts.filter(a=>a.id===q.id);lines.push(q.prompt,'Response: '+JSON.stringify(state.responses[q.id]??'(blank)'),'Checks: '+attempts.length+'; first check correct: '+(attempts.length?attempts[0].correct:'not checked')+'; hint opened: '+state.hints.includes(q.id));}
    lines.push('Reasoning: '+(state.notes[stage.id]||'(blank)'),'');
  }
  for(const [i,a] of state.masteryAttempts.entries()){lines.push('Mastery attempt '+(i+1)+': '+a.score+'/'+a.total+' (form '+(a.form+1)+')');for(const r of a.results)lines.push(r.id+': '+JSON.stringify(r.response)+'; correct: '+r.correct);}
  lines.push('Final reflection: '+(state.reflection||'(blank)'),'Student responses are not transmitted. Submit this report through your teacher’s class assignment.');
  return lines.join('\n');
}
