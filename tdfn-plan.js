import './tdfn-final-v4.js';
import { CASES } from './data.js';
import { state, publicCaseId } from './store.js';

const PLAN_MODULES = [
  { label:'1 · Admissibilité TDFN', track:'Parcours essentiel', ids:['J1','J2','J3'] },
  { label:'2 · Comprendre la méthode', track:'Parcours essentiel', ids:['A','B','C'] },
  { label:'3 · Plusieurs activités', track:'Parcours essentiel', ids:['D','D1','D2'] },
  { label:'4 · Règle des 10 %', track:'Parcours essentiel', ids:['D4','E','F'] },
  { label:'5 · International et synthèse', track:'Parcours essentiel', ids:['G','H','I','D3'] },
  { label:'6 · Travail courant en fiduciaire', track:'Parcours essentiel', ids:['L','O','S1','S2','S3','S4','S5','R'] },
  { label:'7 · Méthode effective → TDFN', track:'Parcours avancé', ids:['K0','K1','K2','K3','K4','K5'] },
  { label:'8 · TDFN → méthode effective', track:'Parcours avancé', ids:['L0','L1','L2','L3','L4','L5','L6','L7'] },
  { label:'9 · Procédures particulières', track:'Parcours avancé', ids:['N','M','P'] },
  { label:'10 · Dossier fiduciaire final', track:'Mise en situation', ids:['T1','T2'] },
  { label:'11 · Atelier libre', track:'Atelier autonome', ids:['Q'] }
];

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const caseById = id => CASES.find(c => publicCaseId(c) === id);
const caseIndex = id => CASES.findIndex(c => publicCaseId(c) === id);
const shortTitle = c => String(c?.tab || c?.title || '').split('·').slice(1).join('·').trim() || c?.title || publicCaseId(c);

function ensureStyles(){
  if(document.querySelector('link[data-tdfn-plan-style]')) return;
  const link=document.createElement('link');
  link.rel='stylesheet'; link.href='tdfn-plan.css?v=17.3.0'; link.dataset.tdfnPlanStyle='';
  document.head.appendChild(link);
}

function statusFor(c){
  const id=publicCaseId(c);
  if(c?.excludeFromProgress) return {label:'Atelier libre', cls:'is-free'};
  if(state.mastered?.[id]) return {label:'Maîtrisé ✓', cls:'is-mastered'};
  if(state.scores?.[id]===100 && !state.assisted?.[id]) return {label:'Acquis ✓', cls:'is-acquired'};
  if(state.assisted?.[id] || Number.isFinite(state.scores?.[id]) || Number(state.attempts?.[id]||0)>0) return {label:'En cours', cls:'is-progress'};
  return {label:'À faire', cls:''};
}

function progressSummary(){
  const scored=CASES.filter(c=>!c.excludeFromProgress);
  const acquired=scored.filter(c=>state.scores?.[publicCaseId(c)]===100&&!state.assisted?.[publicCaseId(c)]).length;
  const mastered=scored.filter(c=>Boolean(state.mastered?.[publicCaseId(c)])).length;
  return {acquired,mastered,total:scored.length};
}

function cardMarkup(id,moduleIndex,itemIndex){
  const c=caseById(id); if(!c) return '';
  const status=statusFor(c);
  const current=publicCaseId(CASES[state.current])===id;
  return `<button type="button" class="tdfn-plan-card" data-plan-case="${esc(id)}" aria-current="${current?'true':'false'}"><span class="tdfn-plan-code">${moduleIndex+1}.${itemIndex+1}</span><span class="tdfn-plan-title"><strong>${esc(shortTitle(c))}</strong><small>${esc(c.level||c.sector||'Cas pratique')}</small></span><span class="tdfn-plan-status ${status.cls}">${esc(status.label)}</span></button>`;
}

function renderPlan(){
  const dialog=document.querySelector('#tdfnPlanDialog'); if(!dialog) return;
  const p=progressSummary();
  const body=dialog.querySelector('[data-plan-body]');
  dialog.querySelector('[data-plan-summary]').textContent=`${p.acquired} / ${p.total} acquis · ${p.mastered} maîtrisés`;
  body.innerHTML=`<div class="tdfn-plan-legend"><span>À faire</span><span>En cours</span><span>Acquis ✓</span><span>Maîtrisé ✓</span></div>${PLAN_MODULES.map((module,mi)=>`<section class="tdfn-plan-module"><div class="tdfn-plan-module-head"><h3>${esc(module.label)}</h3><span class="tdfn-plan-track">${esc(module.track)}</span></div><div class="tdfn-plan-grid">${module.ids.map((id,ii)=>cardMarkup(id,mi,ii)).join('')}</div></section>`).join('')}`;
}

function selectCase(id){
  const index=caseIndex(id); if(index<0) return;
  const select=document.querySelector('#caseSelect'); if(!select) return;
  select.value=String(index);
  select.dispatchEvent(new Event('change',{bubbles:true}));
  const dialog=document.querySelector('#tdfnPlanDialog'); if(dialog?.open) dialog.close();
  requestAnimationFrame(()=>document.querySelector('#caseTitle')?.focus({preventScroll:false}));
}

function openPlan(){
  const dialog=document.querySelector('#tdfnPlanDialog'); if(!dialog) return;
  renderPlan(); dialog.showModal();
  requestAnimationFrame(()=>dialog.querySelector('.tdfn-plan-close')?.focus());
}

function install(){
  if(document.querySelector('#tdfnPlanDialog')) return;
  ensureStyles();
  const nav=document.querySelector('.case-nav__inner');
  if(nav){
    const trigger=document.createElement('button');
    trigger.type='button'; trigger.className='tdfn-plan-trigger'; trigger.id='tdfnOpenPlan'; trigger.textContent='Plan';
    trigger.setAttribute('aria-haspopup','dialog'); trigger.setAttribute('aria-controls','tdfnPlanDialog');
    const next=nav.querySelector('[data-action="next"]');
    nav.insertBefore(trigger,next||null);
    trigger.addEventListener('click',openPlan);
  }
  const dialog=document.createElement('dialog');
  dialog.id='tdfnPlanDialog'; dialog.className='tdfn-plan-dialog'; dialog.setAttribute('aria-labelledby','tdfnPlanTitle');
  dialog.innerHTML=`<div class="tdfn-plan-shell"><header class="tdfn-plan-head"><div><p class="eyebrow">Navigation du parcours</p><h2 id="tdfnPlanTitle">Plan de spécialisation TDFN</h2><p class="tdfn-plan-summary" data-plan-summary></p></div><button type="button" class="tdfn-plan-close" aria-label="Fermer le plan">×</button></header><div class="tdfn-plan-body" data-plan-body></div><footer class="tdfn-plan-footer"><span>44 cas · 43 étapes évaluées + 1 atelier libre</span><a href="#tdfnFinalEvaluation" data-plan-final>Évaluation finale ↓</a></footer></div>`;
  document.body.appendChild(dialog);
  dialog.querySelector('.tdfn-plan-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog) dialog.close();});
  dialog.addEventListener('click',event=>{const card=event.target.closest('[data-plan-case]');if(card) selectCase(card.dataset.planCase);});
  dialog.querySelector('[data-plan-final]').addEventListener('click',()=>dialog.close());
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true}); else install();
