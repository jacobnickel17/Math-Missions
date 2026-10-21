export function graphResponse(q,response) {
  if(q.type==='graph')return response;
  if(q.type==='inequality'&&response&&['<','<=','>','>='].includes(response.operator)){
    return {boundary:response.boundary,direction:response.operator.startsWith('<')?'left':'right',closed:response.operator.includes('=')};
  }
  return null;
}
export function graphScale(q={}) {
  const scale=q.graphScale||{min:-5,max:15,step:1};
  const {min,max,step}=scale;
  if(![min,max,step].every(Number.isFinite)||max<=min||step<=0||(max-min)/step>100)throw Error('Invalid graph scale');
  return {...scale};
}
export function position(value,scale) {
  return 52+(Number(value)-scale.min)/(scale.max-scale.min)*616;
}
export function boundaryAt(clientX,rect,scale) {
  const svgX=(clientX-rect.left)/rect.width*720;
  const raw=scale.min+(svgX-52)/616*(scale.max-scale.min);
  const clamped=Math.min(scale.max,Math.max(scale.min,raw));
  return Number((scale.min+Math.round((clamped-scale.min)/scale.step)*scale.step).toFixed(10));
}
export function numberLineGeometry(response,scale) {
  const ticks=[];
  for(let i=0;i<=Math.floor((scale.max-scale.min)/scale.step+1e-9);i++){
    const value=Number((scale.min+i*scale.step).toFixed(10));
    ticks.push({value,x:position(value,scale)});
  }
  const valid=response&&String(response.boundary??'').trim()!==''&&Number.isFinite(Number(response.boundary))&&['left','right'].includes(response.direction)&&typeof response.closed==='boolean';
  if(!valid){
    const value=Number(response?.boundary);
    const candidate=response&&String(response.boundary??'').trim()!==''&&Number.isFinite(value)?{value,x:position(value,scale),visible:value>=scale.min&&value<=scale.max}:null;
    return {ticks,endpoint:null,ray:null,candidate};
  }
  const value=Number(response.boundary),x=position(value,scale);
  return {ticks,endpoint:{value,x,visible:value>=scale.min&&value<=scale.max,closed:response.closed},ray:{from:x,to:response.direction==='left'?28:692,direction:response.direction}};
}
export function graphDescription(response,variable='x') {
  const relation=response.direction==='left'?(response.closed?'≤':'<'):(response.closed?'≥':'>');
  return variable+' '+relation+' '+Number(response.boundary)+'. '+(response.closed?'Filled':'Open')+' circle at '+Number(response.boundary)+'; shade '+response.direction+' toward '+(response.direction==='left'?'smaller':'larger')+' values.';
}
export function renderNumberLine(container,response,{scale=graphScale(),variable='x',title='Your graph — not checked',onPlace}={}) {
  container.replaceChildren();
  const doc=container.ownerDocument||document,ns='http://www.w3.org/2000/svg';
  const heading=doc.createElement('p');heading.className='graph-title';heading.textContent=title;container.append(heading);
  const wrap=doc.createElement('div');wrap.className='number-line-scroll';
  const svg=doc.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 720 160');svg.setAttribute('role','img');
  const geometry=numberLineGeometry(response,scale);
  svg.setAttribute('aria-label',geometry.endpoint?graphDescription(response,variable):geometry.candidate?'Boundary placed at '+geometry.candidate.value+'. Choose endpoint type and shading direction.':'Number line from '+scale.min+' to '+scale.max+'. No complete graph has been entered.');
  const shape=(tag,attrs,text)=>{const el=doc.createElementNS(ns,tag);for(const[k,v]of Object.entries(attrs))el.setAttribute(k,String(v));if(text!==undefined)el.textContent=String(text);svg.append(el);return el;};
  shape('line',{x1:28,y1:62,x2:692,y2:62,stroke:'#a9c9c7','stroke-width':2});
  shape('polygon',{points:'20,62 31,56 31,68',fill:'#a9c9c7'});
  shape('polygon',{points:'700,62 689,56 689,68',fill:'#a9c9c7'});
  const count=geometry.ticks.length,labelEvery=Math.max(1,Math.ceil(count/22));
  geometry.ticks.forEach((tick,i)=>{
    shape('line',{x1:tick.x,y1:54,x2:tick.x,y2:70,stroke:'#a9c9c7','stroke-width':tick.value===0?2.5:1});
    if(i%labelEvery===0||i===count-1||tick.value===0)shape('text',{x:tick.x,y:98,'text-anchor':'middle',fill:'#eefaf7','font-size':15},tick.value);
  });
  const {endpoint,ray}=geometry;
  if(!endpoint&&geometry.candidate?.visible){
    const p=geometry.candidate;
    shape('line',{x1:p.x,y1:40,x2:p.x,y2:80,stroke:'#90d8f5','stroke-width':3,'stroke-dasharray':'4 3'});
    shape('text',{x:p.x,y:28,'text-anchor':'middle',fill:'#90d8f5','font-size':17},p.value);
  }
  if(endpoint?.visible){
    shape('line',{x1:endpoint.x,y1:62,x2:ray.to,y2:62,stroke:'#64eeb4','stroke-width':7});
    shape('polygon',{points:ray.direction==='left'?'20,62 36,51 36,73':'700,62 684,51 684,73',fill:'#64eeb4'});
    shape('circle',{cx:endpoint.x,cy:62,r:9,fill:endpoint.closed?'#64eeb4':'#07191f',stroke:'#64eeb4','stroke-width':3});
    shape('text',{x:endpoint.x,y:28,'text-anchor':'middle',fill:'#64eeb4','font-size':17,'font-weight':700},endpoint.value);
  }
  if(onPlace){svg.classList.add('place-boundary');svg.onclick=e=>onPlace(boundaryAt(e.clientX,svg.getBoundingClientRect(),scale));}
  wrap.append(svg);container.append(wrap);
  const caption=doc.createElement('p');caption.className='minor';
  caption.textContent=endpoint?graphDescription(response,variable)+(endpoint.visible?'':' Boundary lies outside the displayed interval; use the boundary field to enter any number.'):geometry.candidate?'Boundary placed at '+geometry.candidate.value+'. Choose the circle type and shading direction to complete your graph.':'Choose a boundary, direction, and endpoint to complete your graph.';
  container.append(caption);
  const note=doc.createElement('p');note.className='minor';note.textContent='Equal tick spacing = '+scale.step+' unit'+(scale.step===1?'':'s')+'. Arrows continue beyond the displayed values. This shows the real-number solution set.';container.append(note);
}
export function graphVariable(q) {
  return q.variable||q.prompt.match(/\b([a-z])\s*[<>≤≥]/)?.[1]||'x';
}
