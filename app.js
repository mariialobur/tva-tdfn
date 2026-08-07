import { CASES, DEDUCTIONS, OFFICIAL_SOURCES } from './data.js';
import { rateKey, parseAmount, expectedInputMap, computeCalculator, calculatorSignature, computeDeclaration, validateCase, allActivityBasesEntered, universalChecks, roundToCent } from './logic.js';
import { state, saveState, resetAllState, clearCaseState, createDefaultState, publicCaseId, exportStateSnapshot, importStateSnapshot } from './store.js';
import { componentMarkup, CASE_PRECHECK_PRIORITIES, PRECHECK_DETAILS } from './components.js';
import { worksheetModel, worksheetMarkup, validateWorksheet, worksheetFeedbackMarkup, updateWorksheetField, fillWorksheetSolution, clearWorksheet } from './transition.js';

const save = saveState;
const DEFAULT = createDefaultState();
const worksheetFeedback = {};
const baseCurrent=()=>CASES[state.current];
const stateKey=()=>publicCaseId(baseCurrent());
const freeConfig=()=>state.free||(state.free=structuredClone(DEFAULT.free));
function current(){
  const c=baseCurrent();
  if(c.type!=='free') return c;
  const activities=(freeConfig().activities||[]).map((item,index)=>({label:item.label?.trim()||`Activité ${index+1}`,rate:Number(item.rate),base:0}));
  return {...c,rates:activities};
}
const answers=()=>state.answers[stateKey()]||(state.answers[stateKey()]={});
const quizAnswers=()=>state.quiz[stateKey()]||(state.quiz[stateKey()]={});
const sourceById=id=>OFFICIAL_SOURCES.find(source=>source.id===id);
const fmt=(value,decimals=0)=>new Intl.NumberFormat('fr-CH',{minimumFractionDigits:decimals,maximumFractionDigits:decimals}).format(Number(value||0));
const chf=(value,decimals=2)=>`CHF\u00a0${fmt(value,decimals)}`;
const esc=value=>String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));

export const MODULES = [
  {
    label: '1 · Admissibilité TDFN', track: 'Parcours essentiel', level: 'Débutant', duration: '15–20 min', ids: ['J1', 'J2', 'J3'],
    objectives: ['Vérifier l’accès initial aux TDFN', 'Suivre correctement les dépassements', 'Distinguer TDFN et décompte annuel']
  },
  {
    label: '2 · Comprendre la méthode', track: 'Parcours essentiel', level: 'Débutant', duration: '15–20 min', ids: ['A', 'B', 'C'],
    objectives: ['Distinguer taux légal et TDFN', 'Passer de HT à TTC lorsque nécessaire', 'Calculer la dette TDFN sur la bonne base']
  },
  {
    label: '3 · Plusieurs activités', track: 'Parcours essentiel', level: 'Intermédiaire', duration: '20–25 min', ids: ['D', 'D1', 'D2'],
    objectives: ['Ventiler le chiffre d’affaires par activité', 'Appliquer plusieurs TDFN confirmés', 'Regrouper les activités qui partagent le même TDFN']
  },
  {
    label: '4 · Règle des 10 %', track: 'Parcours essentiel', level: 'Intermédiaire', duration: '20–25 min', ids: ['D4', 'E', 'F'],
    objectives: ['Distinguer 10,0 % de plus de 10 %', 'Traiter une nouvelle activité', 'Appliquer la règle sur trois périodes fiscales pour une activité établie']
  },
  {
    label: '5 · International et synthèse', track: 'Parcours essentiel', level: 'Intermédiaire', duration: '25–30 min', ids: ['G', 'H', 'I', 'D3'],
    objectives: ['Distinguer exportation et prestation à l’étranger', 'Traiter l’impôt sur les acquisitions', 'Combiner plusieurs TDFN avec une opération internationale']
  },
  {
    label: '6 · Rubriques courantes et corrections', track: 'Parcours essentiel', level: 'Intermédiaire', duration: '20–30 min', ids: ['L', 'O', 'R'],
    objectives: ['Séparer chiffre d’affaires et autres flux de fonds', 'Traiter une diminution de contre-prestation', 'Corriger la bonne période sans masquer une erreur']
  },
  {
    label: '7 · Méthode effective → TDFN', track: 'Parcours avancé', level: 'Avancé', duration: '35–45 min', ids: ['K0', 'K1', 'K2', 'K3', 'K4', 'K5'],
    objectives: ['Vérifier si le changement est possible', 'Calculer les corrections de valeur résiduelle', 'Reporter correctement le ch. 415']
  },
  {
    label: '8 · TDFN → méthode effective', track: 'Parcours avancé', level: 'Avancé', duration: '45–60 min', ids: ['L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'],
    objectives: ['Identifier les éléments ouvrant un dégrèvement ultérieur', 'Tenir compte de la part résiduelle et du droit à déduction', 'Reporter correctement le ch. 410']
  },
  {
    label: '9 · Procédures particulières', track: 'Parcours avancé', level: 'Avancé', duration: '25–35 min', ids: ['N', 'M', 'P'],
    objectives: ['Vérifier si une option est admissible sous TDFN', 'Qualifier une reprise de patrimoine avant toute correction', 'Reporter une charge fiscale au ch. 415 avec le bon signe']
  },
  {
    label: '10 · Atelier libre', track: 'Atelier autonome', level: 'Autonome', duration: 'Libre', ids: ['Q'],
    objectives: ['Reproduire un décompte déjà paramétré par l’AFC', 'Contrôler la cohérence arithmétique', 'Conserver une piste d’audit exploitable']
  }
];
const casePublicId = (caseItem = baseCurrent()) => publicCaseId(caseItem);
const publicIndex = (id) => CASES.findIndex((item) => casePublicId(item) === id);
const moduleIndexFor = (caseItem = baseCurrent()) => Math.max(0, MODULES.findIndex((module) => module.ids.includes(casePublicId(caseItem))));
const visualOrder = () => MODULES.flatMap((module) => module.ids.map(publicIndex).filter((index) => index >= 0));
function navigateVisual(direction) {
  const order = visualOrder();
  const position = order.indexOf(state.current);
  const target = position + direction;
  if (position < 0 || target < 0 || target >= order.length) return;
  selectCase(order[target], true);
}
function updateNavigationAvailability() {
  const order = visualOrder();
  const position = order.indexOf(state.current);
  document.querySelectorAll('[data-action="previous"]').forEach((button) => { button.disabled = position <= 0; });
  document.querySelectorAll('[data-action="next"]').forEach((button) => { button.disabled = position < 0 || position >= order.length - 1; });
}

const scoredCases=()=>CASES.filter(c=>!c.excludeFromProgress);
function masteredCount(){return CASES.filter((c)=>{const id=casePublicId(c);return !c.excludeFromProgress&&state.scores[id]===100&&!state.assisted[id];}).length;}
function caseStatus(index){const c=CASES[index],id=casePublicId(c);if(c.excludeFromProgress)return ['libre','free'];if(state.assisted[id])return ['assisté','assisted'];if(state.scores[id]===100)return ['maîtrisé','mastered'];if(Number.isFinite(state.scores[id]))return [`${state.scores[id]}%`,'partial'];return null;}
function renderHeader(){
  const mastered=masteredCount();
  const total=scoredCases().length;
  document.querySelector('#moduleProgressLabel').textContent='Cas maîtrisés';
  document.querySelector('#progressText').textContent=`${mastered} / ${total}`;
  document.querySelector('#progressBar').style.width=total?`${mastered/total*100}%`:'0%';
}
function moduleFor(c){return MODULES[moduleIndexFor(c)]?.label || 'Parcours TDFN';}
function renderTabs(){
  const order=visualOrder();
  document.querySelector('#caseTabs').innerHTML=order.map((index)=>{const c=CASES[index];const status=caseStatus(index);return `<button class="case-tab" id="tab-${casePublicId(c)}" role="tab" aria-selected="${index===state.current}" tabindex="${index===state.current?0:-1}" data-case="${index}">${esc(c.tab)}${status?`<span class="status ${status[1]}">${status[0]}</span>`:''}</button>`;}).join('');
  document.querySelector('#caseSelect').innerHTML=MODULES.map((module)=>`<optgroup label="${esc(`${module.track} · ${module.label}`)}">${module.ids.map((id)=>{const index=publicIndex(id);const c=CASES[index];return c?`<option value="${index}" ${index===state.current?'selected':''}>${esc(module.label)} · ${esc(c.tab)}</option>`:'';}).join('')}</optgroup>`).join('');
}

function dossierMarkup(c,compact=false){
  const links=(c.sourceIds||[]).map(sourceById).filter(Boolean);
  const basis=c.accountingBasis?`<div class="accounting-basis"><span>Mode de décompte</span><strong>${esc(c.accountingBasis)}</strong></div>`:'';
  return `<div class="panel dossier-main">
      ${compact?`<div class="mobile-case-meta"><strong>${esc(c.entity)}</strong><span>${esc(c.period)}</span></div>${basis}`:`<p class="eyebrow dossier-label">Dossier</p><h2 class="entity">${esc(c.entity)}</h2><div class="meta">${esc(c.sector)} · ${esc(c.location)} · ${esc(c.period)}</div>${basis}<span class="level-pill">${esc(c.level)}</span>`}
    </div>
    <div class="panel dossier-data"><p class="eyebrow">Données complètes</p><div class="data-list">${c.given.map(item=>`<div class="data-row"><div class="data-main">${esc(item.label)}${item.tag?`<span class="tag">${esc(item.tag)}</span>`:''}<span class="data-note">${esc(item.note||'')}</span></div>${Number.isFinite(item.amount)?`<div class="data-amount">${chf(item.amount,0)}</div>`:''}</div>`).join('')}</div></div>
    <details class="panel dossier-details"><summary>Contrôles, base légale et sources</summary><div class="dossier-details__body"><p><strong>${esc(c.legal)}</strong></p><div class="checks">${c.checks.map((item,index)=>`<div class="check"><b>${index+1}.</b><span>${esc(item)}</span></div>`).join('')}</div><div class="source-links">${links.map(source=>`<a href="${source.url}" target="_blank" rel="noopener noreferrer">${esc(source.title)}</a>`).join('')}</div></div></details>`;
}
function briefFactsMarkup(c){
  const items=(c.given||[]).map(item=>`<div class="brief-fact"><div><strong>${esc(item.label)}</strong>${item.note?`<small>${esc(item.note)}</small>`:''}</div><div class="brief-fact__value">${Number.isFinite(item.amount)?chf(item.amount,0):''}${item.tag?`<span>${esc(item.tag)}</span>`:''}</div></div>`).join('');
  return `<section class="case-brief" aria-label="Mission et données utiles"><div class="mission-banner"><p class="eyebrow">Votre mission</p><p>${esc(c.mission)}</p></div><details class="brief-data" open><summary>Données utiles pour répondre</summary><div class="brief-facts">${items}</div></details></section>`;
}
function renderSidebar(){
  const c=current();
  const activeModule=moduleIndexFor(c);
  const statuses={};
  CASES.forEach((item,index)=>{const id=casePublicId(item);const status=caseStatus(index);statuses[id]={title:(item.tab?.split('·').slice(1).join('·').trim()||item.title),status:status?.[0]||''};});
  document.querySelector('#sidebar').innerHTML=componentMarkup('navigation',{modules:MODULES,activeModule,currentId:casePublicId(c),statuses})+`<div class="integrated-dossier">${dossierMarkup(c)}</div>
    <div class="sidebar-actions" id="sidebarActionBar" aria-label="Action principale et ressources du cas">
      <button class="btn primary" type="button" data-context-primary>Continuer</button>
      <details class="sidebar-secondary">
        <summary>Ressources et options</summary>
        <div class="sidebar-secondary__menu">
          <button type="button" data-action="open-precheck">Checklist du dossier</button>
          <button type="button" data-action="open-memo">Mémo TDFN</button>
          <button type="button" data-action="open-sources">Sources officielles</button>
          <button type="button" data-action="solution">Afficher la solution</button>
          <button type="button" data-action="summary">Bilan du parcours</button>
          <button type="button" data-action="export-progress">Exporter la progression</button>
          <button type="button" data-action="import-progress">Importer une progression</button>
          <button class="danger" type="button" data-action="reset-case">Réinitialiser ce cas</button>
        </div>
      </details>
    </div>`;
  document.querySelector('#mobileDossierContent').innerHTML=dossierMarkup(c,true)+`<div class="mobile-dossier-actions"><button class="btn" type="button" data-action="summary">Bilan du parcours</button><button class="btn danger" type="button" data-action="reset-case">Réinitialiser ce cas</button></div>`;
  renderActionBars(c);
}
function renderActionBars(c){
  const step=state.steps[stateKey()]||1;
  let config={label:'Contrôler',action:'validate'};
  if(c.type==='quiz') config={label:worksheetModel(casePublicId(c))?'Contrôler le tableau et les réponses':'Vérifier les réponses',action:'validate'};
  else if(state.mode==='portal') config={label:c.type==='free'?'Vérifier la cohérence':'Contrôler le décompte',action:'validate'};
  else if(step===1) config={label:'Continuer vers le calcul →',step:'2'};
  else if(step===2) config={label:'Reporter au décompte →',action:'report-calc'};
  else config={label:c.type==='free'?'Vérifier la cohérence':'Contrôler le décompte',action:'validate'};
  for(const id of ['mobileActionBar','desktopActionBar','sidebarActionBar']){
    const bar=document.querySelector(`#${id}`);if(!bar)continue;
    const primary=bar.querySelector('[data-context-primary]');
    if(primary){primary.textContent=config.label;delete primary.dataset.action;delete primary.dataset.step;if(config.action)primary.dataset.action=config.action;if(config.step)primary.dataset.step=config.step;}
    bar.querySelectorAll('[data-action="solution"]').forEach(button=>button.hidden=c.type==='free');
  }
}
function renderCaseHead(){
  const c=current();
  const step=state.steps[stateKey()]||1;
  document.querySelector('#caseLevel').textContent=c.level;
  document.querySelector('#caseTitle').textContent=c.title;
  document.querySelector('#caseDescription').textContent=c.description;
  const moduleIndex=moduleIndexFor(c);
  const module=MODULES[moduleIndex]||MODULES[0];
  const intro=document.querySelector('#moduleIntroSlot');
  if(intro){
    const done=module.ids.filter((id)=>state.scores[id]===100&&!state.assisted[id]).length;
    intro.innerHTML=`<section class="module-context" aria-label="Position dans le parcours"><div class="module-context__main"><span class="track-pill">${esc(module.track)}</span><div><small>Module ${moduleIndex+1} sur ${MODULES.length}</small><strong>${esc(module.label)}</strong></div></div><div class="module-context__meta"><span>${esc(module.level)}</span><span>≈ ${esc(module.duration)}</span><span>${done}/${module.ids.length} maîtrisés</span></div><details><summary>Objectifs du module</summary><ul>${module.objectives.map((item)=>`<li>${esc(item)}</li>`).join('')}</ul></details></section>`;
  }
  const switcher=document.querySelector('#modeSwitch');
  if(switcher){
    switcher.classList.add('hidden');
    switcher.querySelectorAll('button').forEach(button=>button.classList.toggle('active',button.dataset.mode===state.mode));
  }
  const focusEligible=c.type!=='quiz'&&(state.mode==='portal'||step>1);
  const storedDossierState=state.dossierOpen[stateKey()];
  const transitionCase=Boolean(worksheetModel(casePublicId(c)));
  const dossierOpen=storedDossierState===undefined ? (step===2||transitionCase) : Boolean(storedDossierState);
  const mobileDossier=document.querySelector('#mobileDossier');
  if(mobileDossier) mobileDossier.open=false;
  const layout=document.querySelector('#workspace');
  layout.classList.toggle('focus-mode',focusEligible&&!dossierOpen);
  const toggle=document.querySelector('#toggleDossier');
  if(toggle){toggle.hidden=true;toggle.textContent=dossierOpen?'Masquer le dossier':'Afficher le dossier';}
}
function renderContrast(c){return `<div class="workspace-card contrast"><div class="client"><h3>Facture client</h3><p>${esc(c.clientNote)}</p></div><div class="arrow">→</div><div class="afc"><h3>Décompte AFC</h3><p>${esc(c.afcNote)}</p></div></div>`;}
function renderStepper(){
  const c=current();
  const step=state.steps[stateKey()]||1;
  const canOpenDeclaration=Boolean(state.reported[stateKey()]);
  return `<div class="workspace-card stepper" role="navigation" aria-label="Étapes du cas">${[['1','Analyser'],['2','Calculer'],['3','Reporter']].map(([number,label])=>{const disabled=Number(number)===3&&!canOpenDeclaration&&c.type!=='free';return `<button class="step-button ${Number(number)===step?'active':''}" data-step="${number}" type="button" ${disabled?'disabled':''}><span>${number}</span>${label}</button>`;}).join('')}</div>`;
}
function learning(c){
  const priorities=(CASE_PRECHECK_PRIORITIES[casePublicId(c)]||[]).slice(0,3).map((key)=>PRECHECK_DETAILS[key]?.title).filter(Boolean);
  const points=priorities.length?priorities:['Vérifier la base imposable','Identifier les rubriques concernées','Contrôler la cohérence du dossier'];
  return `<div class="learning-card learning-focus"><div class="learning-focus__head"><div><p class="eyebrow">Étape 1 · Analyser</p><h3>Avant de saisir un montant</h3></div><button class="mini-link" type="button" data-action="open-precheck">Checklist complète</button></div><div class="learning-points">${points.map((item,index)=>`<div><b>${index+1}</b><span>${esc(item)}</span></div>`).join('')}</div><p class="learning-note"><strong>Fil conducteur:</strong> qualifier l’opération → déterminer la bonne rubrique → calculer → contrôler la concordance.</p></div>`;
}

function inputValue(key){return answers()[key]??'';}
function amountInput(key,label=''){return `<input class="amount-input" data-key="${key}" inputmode="decimal" autocomplete="off" value="${esc(inputValue(key))}" aria-label="${esc(label)}">`;}
function textInput(key,label=''){return `<input class="text-input" data-text-key="${key}" value="${esc(inputValue(key))}" aria-label="${esc(label)}">`;}
function reportedCurrent(c){const report=state.reported[stateKey()];return Boolean(report&&report.signature===calculatorSignature(c,answers()));}
function calcSnapshot(c){return computeCalculator(c,answers());}
function acquisitionRate(){return Number(state.acquisitionRate[stateKey()]??(current().fields?.acqRate||8.1));}

function calculatorCaseDataMarkup(c){
  if(c.type==='free') return `<section class="calculator-case-data"><div class="calculator-case-data__head"><div><p class="eyebrow">Données à utiliser</p><h4>Reprenez les activités et TDFN déjà confirmés par l’AFC</h4></div><span class="accounting-basis-inline">${esc(c.accountingBasis||'Selon le dossier')}</span></div><p class="calculator-case-data__note">Le mode libre ne contient pas de montants imposés. Saisissez uniquement les données du dossier réel ou d’un scénario que vous avez préparé.</p></section>`;
  const items=(c.given||[]).map(item=>`<div class="calculator-case-item"><div><strong>${esc(item.label)}</strong>${item.note?`<small>${esc(item.note)}</small>`:''}</div><div class="calculator-case-value">${Number.isFinite(item.amount)?chf(item.amount,0):''}${item.tag?`<span>${esc(item.tag)}</span>`:''}</div></div>`).join('');
  return `<section class="calculator-case-data" aria-label="Rappel des données du cas"><div class="calculator-case-data__head"><div><p class="eyebrow">Rappel du dossier</p><h4>Données à reporter ou à calculer</h4></div><span class="accounting-basis-inline">${esc(c.accountingBasis||'Selon le dossier')}</span></div><div class="calculator-case-grid">${items}</div><p class="calculator-case-data__note">Gardez ce rappel visible pendant la saisie. Les montants à introduire dans «Calcul TDFN» sont des contre-prestations brutes, TVA comprise.</p></section>`;
}
function calculatorRowInstruction(c){
  if(c.id==='B') return 'Calculez d’abord le montant TTC à partir de CHF 100’000 HT et du taux légal de 8,1 %.';
  if(c.id==='G') return 'Saisissez uniquement les ventes imposables en Suisse après la déduction de l’exportation au ch. 220.';
  if(c.id==='H') return 'Saisissez uniquement la part imposable en Suisse après la déduction au ch. 221.';
  return 'Reportez le montant TTC correspondant indiqué dans le rappel du dossier.';
}

function calculatorMarkup(c,{dialog=false}={}){
  const calc=calcSnapshot(c);
  const currentReport=reportedCurrent(c);
  const isFree=c.type==='free';
  const rateOptions=[0.1,0.6,1.3,2.1,3.0,3.7,4.5,5.3,6.2,6.8];
  const rows=(c.rates||[]).map((rate,index)=>`<tr>
    <td>${isFree?`<input class="text-input activity-name" data-free-label="${index}" value="${esc(freeConfig().activities[index]?.label||'')}" aria-label="Libellé de l’activité ${index+1}">`:`<strong>${esc(rate.label)}</strong><small class="calculator-row-instruction">${esc(calculatorRowInstruction(c))}</small>`}</td>
    <td>${isFree?`<select class="rate-select" data-free-rate="${index}" aria-label="TDFN de l’activité ${index+1}">${rateOptions.map(value=>`<option value="${value}" ${Number(rate.rate)===value?'selected':''}>${fmt(value,1)} %</option>`).join('')}</select>`:`${fmt(rate.rate,1)} %`}</td>
    <td>${amountInput(rateKey('base',index),`Contre-prestations ${rate.label}`)}</td>
    <td class="computed-money" data-calc-tax="${index}">${chf(calc.lines[index]?.rawTax??calc.lines[index]?.tax??0,4)}</td>
    ${isFree?`<td><button class="icon-button compact" type="button" data-action="remove-activity" data-index="${index}" aria-label="Supprimer l’activité ${index+1}">×</button></td>`:''}
  </tr>`).join('');
  return `<div class="calculator-shell ${dialog?'calculator-dialog-body':''}">
    <div class="calculator-title"><div><p class="eyebrow">Étape 2 · Calculer</p><h3>Calcul TDFN par activité</h3><p>Saisissez la base TTC de chaque activité. Le total calculé sera ensuite reporté au ch. 323.</p></div><span class="transfer-state ${currentReport?'ok':'pending'}">${currentReport?'Calcul reporté':'À reporter'}</span></div>
    <div class="old-period-note"><strong>Période modélisée:</strong> à partir du 01.01.2025. ${isFree?'Saisissez uniquement les activités et TDFN déjà confirmés dans le courrier ou le profil AFC de l’entreprise.':'Les blocs d’anciens taux ne sont pas utilisés dans ce cas.'}</div>
    ${calculatorCaseDataMarkup(c)}
    ${isFree?'<div class="free-toolbar"><button class="btn" type="button" data-action="add-activity">+ Nouvelle activité</button><span>Maximum pédagogique: 8 activités.</span></div>':''}
    <div class="calculator-table-wrap"><table class="calculator-table"><thead><tr><th>Activité</th><th>TDFN</th><th>Contre-prestations CHF</th><th>Impôt brut CHF</th>${isFree?'<th>Action</th>':''}</tr></thead><tbody>${rows||'<tr><td colspan="5">Ajoutez au moins une activité.</td></tr>'}</tbody></table></div>
    <div class="calculator-summary"><div><span>Taux moyen résultant <small>indicateur calculé — pas un TDFN à appliquer</small></span><strong data-calc-average>${fmt(calc.averageRate,4)} %</strong></div><div><span>Contre-prestations</span><strong data-calc-base>${chf(calc.base,2)}</strong></div><div><span>Total de l’impôt</span><strong data-calc-total>${chf(calc.tax,2)}</strong></div></div>
    <fieldset class="rounding-options"><legend>À propos de l’arrondi</legend><label><input type="radio" checked disabled> Calcul pédagogique sans arrondi intermédiaire</label><label class="unsupported"><input type="radio" disabled> Arrondi par activité <small>non simulé: algorithme public non spécifié</small></label><label class="unsupported"><input type="radio" disabled> Arrondi du total de l’impôt <small>non simulé: algorithme public non spécifié</small></label></fieldset>
    <div class="calculator-note">Le prototype public affiche trois choix, mais ne publie pas leur algorithme de production. Afin de ne pas enseigner une règle inventée, les montants par activité sont affichés à quatre décimales et additionnés sans arrondi intermédiaire; seul le total affiché est arrondi à CHF 0.01. Il ne s’agit pas d’une reproduction certifiée de l’algorithme du Portail AFC.</div>
    <div class="form-actions">${dialog?'<button class="btn" type="button" data-action="close-calc">Annuler</button><button class="btn primary" type="button" data-action="report-calc">Reporter le calcul</button>':'<button class="btn" type="button" data-step="1">← Revoir le principe</button>'}</div>
  </div>`;
}
function portalRow({code,label,sub='',valueKey,computedKey,secondComputed,rateValue,extra='',highlight=false}){
  return `<tr class="${highlight?'highlight-row':''}"><td class="form-label"><div class="label-main">${esc(label)}</div>${sub?`<div class="label-sub">${esc(sub)}</div>`:''}${extra}</td><td class="code">${esc(code)}</td><td class="money">${valueKey?amountInput(valueKey,`Chiffre ${code}`):computedKey?`<span class="computed" data-computed="${computedKey}">${chf(0,2)}</span>`:''}</td><td class="money">${secondComputed?`<span class="computed" data-computed="${secondComputed}">${chf(0,2)}</span>`:''}</td><td class="rate-cell">${rateValue||''}</td></tr>`;
}
function declarationMarkup(c){
  const report=state.reported[stateKey()];
  const reportStatus=reportedCurrent(c)?'current':report?'stale':'missing';
  const reportText=reportStatus==='current'?'Calcul reporté et à jour':reportStatus==='stale'?'Calcul modifié: report à refaire':'Aucun calcul reporté';
  const deductionRows=DEDUCTIONS.map(item=>portalRow({code:item.code,label:item.label,sub:item.help,valueKey:item.key,extra:item.key==='ch225'?'<button class="mini-link" type="button" data-action="attachment-info">Joindre le formulaire 764</button>':item.key==='ch280'?`<div class="divers-note">${textInput('ch280Note','Description de la déduction diverse')}</div>`:''})).join('');
  return `<div class="afc-form-card">
    <div class="afc-form-header"><div><p class="eyebrow">Vue formulaire complet</p><h3>Décompte d’entraînement — méthode TDFN</h3></div><div class="afc-form-header__actions"><span class="simulation-badge">Exercice · aucune transmission</span><button class="btn small" type="button" data-mode="guided">← Revenir au mode guidé</button></div></div>
    <section class="afc-section"><h4>I. Chiffre d’affaires</h4><div class="subsection-title">Contre-prestations</div><div class="afc-table-wrap"><table class="afc-table"><thead><tr><th>Contre-prestations</th><th>Chiffre</th><th>Chiffre d’affaires CHF</th><th></th><th></th></tr></thead><tbody>
      ${portalRow({code:'200',label:'Total des contre-prestations convenues ou reçues',sub:`Mode du cas: ${c.accountingBasis||'contre-prestations convenues'} · y compris prestations imposées par option, transferts par procédure de déclaration et prestations à l’étranger`,valueKey:'ch200',highlight:true})}
      ${portalRow({code:'205',label:'Contre-prestations déclarées sous ch. 200 provenant de prestations exclues du champ de l’impôt pour lesquelles il a été opté',sub:'Rubrique informative; le montant reste compris au ch. 200',valueKey:'ch205'})}
      <tr class="section-row"><td colspan="5">Déductions</td></tr>${deductionRows}
      ${portalRow({code:'289',label:'Total des déductions',computedKey:'ch289',highlight:true})}
      ${portalRow({code:'299',label:'Total du chiffre d’affaires imposable',sub:'Ch. 200 moins ch. 289',computedKey:'ch299',highlight:true})}
    </tbody></table></div></section>
    <section class="afc-section"><h4>II. Calcul de l’impôt</h4><div class="afc-table-wrap"><table class="afc-table"><thead><tr><th>Taux</th><th>Chiffre</th><th>Prestations CHF</th><th>Impôt CHF</th><th>Taux</th></tr></thead><tbody>
      <tr class="highlight-row"><td class="form-label"><div class="label-main">Prestations</div><div class="label-sub">Résultat agrégé de la fenêtre «Calcul»</div><button class="calc-edit" type="button" data-action="open-calc">✎ Ouvrir Calcul</button><div class="report-status ${reportStatus}">${reportText}</div></td><td class="code">323</td><td class="money"><span class="computed" data-computed="ch323Base">${chf(0,2)}</span></td><td class="money"><span class="computed" data-computed="ch323Tax">${chf(0,2)}</span></td><td class="rate-cell"><span data-computed-rate>0,0000 %</span></td></tr>
      <tr class="portal-option-row"><td colspan="5"><details><summary>Avez-vous encore du chiffre d’affaires à déclarer aux anciens taux (jusqu’au 31.12.2024)?</summary><p>Non dans les cas 2026 de cet entraînement. Le prototype affiche des blocs séparés lorsqu’une régularisation d’anciennes périodes est nécessaire.</p></details></td></tr>
      ${portalRow({code:'379',label:'Total du chiffre d’affaires imposable',sub:'Doit correspondre au ch. 299',computedKey:'ch379',highlight:true})}
      <tr class="section-row"><td colspan="5">Impôt sur les acquisitions</td></tr>
      <tr><td class="form-label"><div class="label-main">Impôt sur les acquisitions (net, hors TVA)</div><div class="label-sub">Contrôle pédagogique: base × taux légal sélectionné</div></td><td class="code">383</td><td class="money">${amountInput('acqBase','Base impôt sur les acquisitions')}</td><td class="money">${amountInput('acqTax','Impôt sur les acquisitions')}<div class="suggested-tax" data-acq-suggested></div></td><td class="rate-cell"><select class="rate-select compact-select" data-acq-rate aria-label="Taux légal de l’impôt sur les acquisitions">${[8.1,2.6,3.8].map(value=>`<option value="${value}" ${acquisitionRate()===value?'selected':''}>${fmt(value,1)} %</option>`).join('')}</select></td></tr>
      <tr class="portal-option-row"><td colspan="5"><details><summary>Avez-vous encore de l’impôt sur les acquisitions à déclarer aux anciens taux?</summary><p>Non dans les cas 2026 de cet entraînement.</p></details></td></tr>
      ${portalRow({code:'399',label:'Total de l’impôt dû',sub:'Ch. 323 jusqu’à ch. 383',computedKey:'ch399',highlight:true})}
      <tr class="section-row"><td colspan="5">Crédit d’impôt</td></tr>
      ${portalRow({code:'415',label:'Corrections en cas de prise en charge dans le cadre de la procédure de déclaration',sub:'Art. 38 LTVA; le signe dépend du mécanisme documenté — une charge fiscale peut être négative',valueKey:'ch415'})}
      ${portalRow({code:'479',label:'Total du crédit d’impôt',computedKey:'ch479',highlight:true})}
      <tr class="highlight-row"><td class="form-label"><div class="label-main">Montant à payer</div></td><td class="code">500</td><td></td><td class="money"><span class="computed" data-computed="ch500">${chf(0,2)}</span></td><td class="rate-cell"><label class="round-final" title="Option distincte affichée au ch. 500 dans le prototype"><input type="checkbox" data-final-round ${state.finalRound[stateKey()]?'checked':''}> Arrondir le solde</label></td></tr>
      ${portalRow({code:'510',label:'Solde en faveur de l’assujetti',computedKey:'ch510',highlight:true})}
    </tbody></table></div></section>
    <section class="afc-section"><h4>III. Autres mouvements de fonds (art. 18, al. 2)</h4><div class="afc-table-wrap"><table class="afc-table"><thead><tr><th></th><th>Chiffre</th><th>Montant CHF</th><th></th><th></th></tr></thead><tbody>
      ${portalRow({code:'900',label:'Subventions, taxes touristiques et contributions publiques visées par la rubrique',valueKey:'ch900'})}
      ${portalRow({code:'910',label:'Dons, dividendes, dédommagements, etc.',valueKey:'ch910'})}
    </tbody></table></div></section>
    <div class="concordance-box" data-concordance></div>
    <div class="portal-actions"><button class="btn danger" type="button" data-action="reset-case">Vider</button><button class="btn" type="button" data-action="temporary-save">Enregistrer</button><button class="btn" type="button" data-action="preview">Aperçu</button></div>
  </div>`;
}


function compactFieldRow({code,label,sub='',valueKey,computedKey,highlight=false,action=''}){
  return `<div class="compact-declaration-row ${highlight?'highlight':''}"><div class="compact-declaration-label"><span class="compact-code">ch. ${esc(code)}</span><div><strong>${esc(label)}</strong>${sub?`<small>${esc(sub)}</small>`:''}${action}</div></div><div class="compact-declaration-value">${valueKey?amountInput(valueKey,`Chiffre ${code}`):computedKey?`<span class="computed" data-computed="${computedKey}">${chf(0,2)}</span>`:''}</div></div>`;
}
function compactDeclarationMarkup(c){
  const report=state.reported[stateKey()];
  const reportStatus=reportedCurrent(c)?'current':report?'stale':'missing';
  const reportText=reportStatus==='current'?'Calcul reporté et à jour':reportStatus==='stale'?'Calcul modifié: report à refaire':'Aucun calcul reporté';
  const requiredKeys=new Set(Object.entries(c.deductions||{}).filter(([,value])=>Math.abs(Number(value||0))>0.000001).map(([key])=>key));
  Object.keys(answers()).filter(key=>DEDUCTIONS.some(item=>item.key===key)&&String(answers()[key]).trim()!=='').forEach(key=>requiredKeys.add(key));
  const deductions=(c.type==='free'?DEDUCTIONS:DEDUCTIONS.filter(item=>requiredKeys.has(item.key))).map(item=>compactFieldRow({code:item.code,label:item.label,sub:item.help,valueKey:item.key})).join('');
  const showAcquisition=c.type==='free'||Number(c.fields?.acqBase||0)!==0||Number(c.fields?.acqTax||0)!==0||String(inputValue('acqBase')).trim()!==''||String(inputValue('acqTax')).trim()!=='';
  const showCredit=c.type==='free'||Number(c.fields?.ch415||0)!==0||String(inputValue('ch415')).trim()!=='';
  const showFunds=c.type==='free'||Number(c.fields?.ch900||0)!==0||Number(c.fields?.ch910||0)!==0||String(inputValue('ch900')).trim()!==''||String(inputValue('ch910')).trim()!=='';
  return `<div class="compact-declaration">
    <div class="compact-declaration-head"><div><p class="eyebrow">Étape 3 · Reporter</p><h3>Complétez uniquement les rubriques utiles</h3><p>Commencez par cette vue simplifiée; ouvrez le formulaire complet seulement si vous voulez vous entraîner sur toutes les rubriques.</p></div><button class="btn small" type="button" data-mode="portal">Voir le formulaire complet</button></div>
    <section class="compact-declaration-section"><h4>I. Chiffre d’affaires</h4>
      ${compactFieldRow({code:'200',label:'Total des contre-prestations',sub:c.accountingBasis||'Contre-prestations convenues',valueKey:'ch200',highlight:true})}
      ${deductions||'<p class="compact-empty">Aucune déduction spécifique n’est attendue dans ce cas.</p>'}
      ${compactFieldRow({code:'289',label:'Total des déductions',computedKey:'ch289'})}
      ${compactFieldRow({code:'299',label:'Chiffre d’affaires imposable',sub:'ch. 200 − ch. 289',computedKey:'ch299',highlight:true})}
    </section>
    <section class="compact-declaration-section"><h4>II. Calcul de l’impôt</h4>
      ${compactFieldRow({code:'323',label:'Prestations selon le calcul TDFN',sub:reportText,computedKey:'ch323Base',highlight:true,action:`<button class="mini-link" type="button" data-action="open-calc">Ouvrir Calcul</button><span class="report-status ${reportStatus}">${reportText}</span>`})}
      <div class="compact-tax-summary"><span>Impôt au ch. 323</span><strong data-computed="ch323Tax">${chf(0,2)}</strong><span>Taux moyen résultant <small>indicateur calculé — pas un TDFN à appliquer</small></span><strong data-computed-rate>0,0000 %</strong></div>
      ${compactFieldRow({code:'379',label:'Total du chiffre d’affaires imposable',sub:'Doit correspondre au ch. 299',computedKey:'ch379',highlight:true})}
      <div class="concordance-box pending" data-concordance></div>
      ${showAcquisition?`<div class="compact-subsection"><h5>Impôt sur les acquisitions</h5><div class="compact-acquisition"><label>Base nette ch. 383 ${amountInput('acqBase','Base impôt sur les acquisitions')}</label><label>Impôt ch. 383 ${amountInput('acqTax','Impôt sur les acquisitions')}</label><label>Taux légal <select class="rate-select compact-select" data-acq-rate aria-label="Taux légal de l’impôt sur les acquisitions">${[8.1,2.6,3.8].map(value=>`<option value="${value}" ${acquisitionRate()===value?'selected':''}>${fmt(value,1)} %</option>`).join('')}</select></label><div class="suggested-tax" data-acq-suggested></div></div></div>`:''}
      ${compactFieldRow({code:'399',label:'Total de l’impôt dû',computedKey:'ch399',highlight:true})}
      ${showCredit?`${compactFieldRow({code:'415',label:'Correction documentée — procédure de déclaration',valueKey:'ch415'})}${compactFieldRow({code:'479',label:'Total du crédit d’impôt',computedKey:'ch479'})}`:''}
      <div class="compact-balance"><div><span>ch. 500 · Montant à payer</span><strong data-computed="ch500">${chf(0,2)}</strong></div><div><span>ch. 510 · Solde en faveur</span><strong data-computed="ch510">${chf(0,2)}</strong></div></div>
    </section>
    ${showFunds?`<section class="compact-declaration-section"><h4>III. Autres mouvements de fonds</h4>${compactFieldRow({code:'900',label:'Subventions et contributions',valueKey:'ch900'})}${compactFieldRow({code:'910',label:'Autres mouvements de fonds',valueKey:'ch910'})}</section>`:''}
  </div>`;
}

function quizMarkup(c){
  const qa=quizAnswers();const id=casePublicId(c);const answered=c.questions.filter((_,index)=>qa[index]!==undefined).length;
  return `${c.conceptualNote?`<div class="callout warning conceptual-note"><strong>Repère:</strong> ${esc(c.conceptualNote)}</div>`:''}${worksheetMarkup(id,worksheetFeedback[id]||{})}<div class="quiz-card"><div class="quiz-head"><div><p class="eyebrow">Questions de qualification</p><h3>${answered}/${c.questions.length} réponse(s) sélectionnée(s)</h3></div><span>Répondez sans ouvrir la solution, puis vérifiez l’ensemble.</span></div><div class="quiz-body">${c.questions.map((question,index)=>`<fieldset class="question"><legend><span>${index+1}</span>${esc(question.q)}</legend><div class="question-options">${question.options.map((option,optionIndex)=>`<label class="quiz-option"><input type="radio" name="q-${state.current}-${index}" data-question="${index}" value="${optionIndex}" ${Number(qa[index])===optionIndex?'checked':''}> <span>${esc(option)}</span></label>`).join('')}</div></fieldset>`).join('')}</div></div>`;
}

function renderWork(){
  const c=current();
  const stepperSlot=document.querySelector('#stepperSlot');
  if(c.type==='quiz'){
    stepperSlot.innerHTML='';
    document.querySelector('#workArea').innerHTML=briefFactsMarkup(c)+renderContrast(c)+quizMarkup(c);
    renderActionBars(c);
    return;
  }
  if(state.mode==='portal'){
    stepperSlot.innerHTML='';
    document.querySelector('#workArea').innerHTML=declarationMarkup(c);
    renderActionBars(c);updateComputed();return;
  }
  const step=state.steps[stateKey()]||1;
  stepperSlot.innerHTML=renderStepper();
  let content=learning(c);
  if(step===1) content=briefFactsMarkup(c)+renderContrast(c)+content;
  if(step===2) content=calculatorMarkup(c);
  if(step===3) content=compactDeclarationMarkup(c);
  document.querySelector('#workArea').innerHTML=content;
  renderActionBars(c);updateComputed();
}

function updateComputed(){
  const c=current();
  if(c.type==='quiz') return;
  const calc=calcSnapshot(c);
  document.querySelectorAll('[data-calc-tax]').forEach(node=>{const line=calc.lines[Number(node.dataset.calcTax)];node.textContent=chf(line?.rawTax??line?.tax??0,4);});
  document.querySelectorAll('[data-calc-average]').forEach(node=>node.textContent=`${fmt(calc.averageRate,4)} %`);
  document.querySelectorAll('[data-calc-base]').forEach(node=>node.textContent=chf(calc.base,2));
  document.querySelectorAll('[data-calc-total]').forEach(node=>node.textContent=chf(calc.tax,2));
  const report=state.reported[stateKey()]||null;
  const declaration=computeDeclaration(c,answers(),report,state.finalRound[stateKey()]);
  const map={ch289:declaration.ch289,ch299:declaration.ch299,ch323Base:declaration.ch323Base,ch323Tax:declaration.ch323Tax,ch379:declaration.ch379,ch399:declaration.ch399,ch479:declaration.ch479,ch500:declaration.ch500,ch510:declaration.ch510};
  Object.entries(map).forEach(([key,value])=>document.querySelectorAll(`[data-computed="${key}"]`).forEach(node=>node.textContent=chf(value,2)));
  document.querySelectorAll('[data-computed-rate]').forEach(node=>node.textContent=`${fmt(declaration.ch323Rate,4)} %`);
  const expectedAcq=roundToCent(declaration.acqBase*acquisitionRate()/100);
  document.querySelectorAll('[data-acq-suggested]').forEach(node=>{node.textContent=(declaration.acqBase||declaration.acqTax)?`Contrôle: ${chf(expectedAcq,2)}`:'';});
  document.querySelectorAll('[data-concordance]').forEach(node=>{
    const currentReport=reportedCurrent(c);
    if(!report){node.className='concordance-box pending';node.innerHTML='<strong>Concordance non disponible.</strong> Ouvrez «Calcul», saisissez les bases par activité et reportez le résultat.';return;}
    if(!currentReport){node.className='concordance-box warning';node.innerHTML='<strong>Le calcul reporté n’est plus à jour.</strong> Une activité, un TDFN ou une base a été modifié; reportez à nouveau le calcul.';return;}
    const ok=Math.abs(declaration.concordance)<=0.011;
    node.className=`concordance-box ${ok?'success':'error'}`;
    node.innerHTML=ok?`<strong>Concordance validée:</strong> ch. 379 = ch. 299 = ${chf(declaration.ch299,2)}.`:`<strong>Écart de concordance:</strong> ch. 299 ${chf(declaration.ch299,2)} − ch. 379 ${chf(declaration.ch379,2)} = ${chf(declaration.concordance,2)}.`;
  });
}

function reportCalculation(){
  const c=current();
  if(!allActivityBasesEntered(c,answers())){showToast('Saisissez une contre-prestation pour chaque activité, même si le montant est zéro.','error');return;}
  const calc=calcSnapshot(c);
  state.reported[stateKey()]={...calc,signature:calculatorSignature(c,answers()),reportedAt:new Date().toISOString()};
  state.steps[stateKey()]=3;
  state.dossierOpen[stateKey()]=false;
  save();
  const dialog=document.querySelector('#calcDialog');if(dialog?.open)dialog.close();
  renderAll();showToast(`Calcul reporté au ch. 323: ${chf(calc.base,2)} et ${chf(calc.tax,2)} d’impôt.`,'success');
}

function openCalculator(){const dialog=document.querySelector('#calcDialog');dialog.querySelector('#calcDialogContent').innerHTML=calculatorMarkup(current(),{dialog:true});dialog.showModal();updateComputed();}
function showToast(message,type='info'){const toast=document.querySelector('#toast');toast.textContent=message;toast.className=`toast show ${type}`;clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.className='toast',3200);}
function labelFor(c,key){
  if(key==='ch200')return 'ch. 200 — total des contre-prestations';if(key==='ch205')return 'ch. 205';if(key==='acqBase')return 'ch. 383 — base';if(key==='acqTax')return 'ch. 383 — impôt';if(key==='ch415')return 'ch. 415';if(key==='ch900')return 'ch. 900';if(key==='ch910')return 'ch. 910';
  const deduction=DEDUCTIONS.find(item=>item.key===key);if(deduction)return `ch. ${deduction.code} — ${deduction.label}`;
  const match=key.match(/^r(\d+)base$/);if(match)return `Calcul — ${c.rates[Number(match[1])]?.label||'activité'}`;
  return key;
}
function diagnostic(c,row){
  const messages=c.diagnostics?.[row.key];if(!messages||row.actual===null||Number.isNaN(row.actual))return'';
  for(const [value,message] of Object.entries(messages))if(Math.abs(row.actual-Number(value))<0.011)return message;
  if(row.unexpected)return 'Cette rubrique devrait rester vide ou à zéro dans le dossier présenté.';
  return'';
}

function checksMarkup(rows){return rows.map(row=>`<div class="feedback-row"><div class="feedback-name">${row.good?'✓':'✕'} ${esc(row.title)}</div><div class="feedback-explain">${esc(row.text)}</div></div>`).join('');}
function formFeedbackMarkup(c,rows){
  const render=(row)=>{let entered='aucune réponse';if(row.invalid)entered='format non reconnu';else if(row.actual!==null)entered=`saisi ${chf(row.actual,2)}`;return `<div class="feedback-row ${row.good?'is-good':'is-bad'}"><div class="feedback-top"><div class="feedback-name">${row.good?'✓':'✕'} ${esc(labelFor(c,row.key))}</div><div class="feedback-value">${entered}${row.good?'':` · attendu ${chf(row.target,2)}`}</div></div>${diagnostic(c,row)?`<div class="feedback-explain"><strong>Pourquoi:</strong> ${esc(diagnostic(c,row))}</div>`:''}${c.explanations?.[row.key]?`<div class="feedback-explain">${esc(c.explanations[row.key])}</div>`:''}</div>`;};
  const wrong=rows.filter(row=>!row.good), good=rows.filter(row=>row.good);
  return `${wrong.length?`<div class="feedback-focus"><h4>À corriger (${wrong.length})</h4>${wrong.map(render).join('')}</div>`:'<div class="callout success"><strong>Aucune erreur dans les champs du cas.</strong></div>'}${good.length?`<details class="feedback-correct"><summary>Voir les contrôles corrects (${good.length})</summary>${good.map(render).join('')}</details>`:''}`;
}

function validateFree(){
  const c=current(),report=state.reported[stateKey()];
  const universal=universalChecks(c,answers(),report,{reportCurrent:reportedCurrent(c),acquisitionRate:acquisitionRate()});
  const declaration=universal.declaration;
  state.attempts[stateKey()]=(state.attempts[stateKey()]||0)+1;save();
  document.querySelector('#resultArea').innerHTML=`<div class="result-card"><div class="result-head"><div class="result-score ${universal.allGood?'good':'bad'}">${universal.correct}/${universal.total}</div><div><h3>${universal.allGood?'Cohérence arithmétique vérifiée':'Incohérences à corriger'}</h3><p>Atelier libre · contrôle arithmétique et structurel uniquement</p></div></div><div class="feedback">${checksMarkup(universal.rows)}</div><div class="lesson"><strong>Résultat calculé:</strong> ch. 299 ${chf(declaration.ch299,2)} · ch. 399 ${chf(declaration.ch399,2)} · ch. 479 ${chf(declaration.ch479,2)} · ch. 500 ${chf(declaration.ch500,2)} · ch. 510 ${chf(declaration.ch510,2)}.<br><strong>Limite:</strong> ce contrôle suppose que le paramétrage AFC est déjà confirmé; il ne valide ni la qualification de l’activité ni l’exhaustivité des justificatifs.</div></div>`;
  document.querySelector('#resultArea').scrollIntoView({behavior:'smooth',block:'start'});
}

function validateForm(){
  const c=current();
  if(c.type==='free'){validateFree();return;}
  const validation=validateCase(c,answers());
  const report=state.reported[stateKey()];
  const universal=universalChecks(c,answers(),report,{reportCurrent:reportedCurrent(c),acquisitionRate:acquisitionRate()});
  const total=validation.total+universal.total;
  const correct=validation.correct+universal.correct;
  const score=total?Math.round(correct/total*100):0;
  state.scores[stateKey()]=score;
  state.attempts[stateKey()]=(state.attempts[stateKey()]||0)+1;
  save();renderHeader();renderTabs();renderSidebar();
  validation.rows.forEach(row=>{document.querySelectorAll(`[data-key="${row.key}"]`).forEach(input=>{input.classList.remove('ok','error','blank');input.classList.add(row.blank?'blank':row.good?'ok':'error');input.setAttribute('aria-invalid',String(!row.good));});});
  const mastered=score===100&&!state.assisted[stateKey()];
  const declaration=universal.declaration;
  const primaryResultAction=mastered?'<button class="btn primary" type="button" data-action="next">Cas suivant →</button>':state.assisted[stateKey()]?'<button class="btn primary" type="button" data-action="restart-no-help">Recommencer sans aide</button><button class="btn" type="button" data-action="next">Passer au cas suivant</button>':'<button class="btn primary" type="button" data-action="return-to-work">Corriger mes réponses</button><button class="btn" type="button" data-action="next">Passer au cas suivant</button>';
  document.querySelector('#resultArea').innerHTML=`<div class="result-card"><div class="result-head"><div class="result-score ${mastered?'good':score>=70?'medium':'bad'}">${score}%</div><div><h3>${mastered?'Cas maîtrisé':score===100?'Calcul correct après consultation de la solution':score>=70?'Encore quelques corrections':'Reprenez les points signalés'}</h3><p>${correct} contrôle(s) correct(s) sur ${total} · tentative ${state.attempts[stateKey()]}</p>${state.assisted[stateKey()]?'<div class="assisted-note">La solution a été consultée: recommencez sans aide pour maîtriser le cas.</div>':''}</div></div><div class="feedback">${formFeedbackMarkup(c,validation.rows)}<details class="feedback-universal"><summary>Contrôles de cohérence du décompte (${universal.correct}/${universal.total})</summary>${checksMarkup(universal.rows)}</details></div><div class="lesson"><strong>À retenir:</strong> ${esc(c.lesson)}<br><strong>Résultat du décompte:</strong> ch. 399 ${chf(declaration.ch399,2)} · ch. 479 ${chf(declaration.ch479,2)} · ch. 500 ${chf(declaration.ch500,2)} · ch. 510 ${chf(declaration.ch510,2)}.</div><div class="form-actions">${primaryResultAction}</div></div>`;
  document.querySelector('#resultArea').scrollIntoView({behavior:'smooth',block:'start'});
}

function validateQuiz(){
  const c=current(),qa=quizAnswers(),id=casePublicId(c);let correctQuestions=0;
  const details=c.questions.map((question,index)=>{const blank=qa[index]===undefined;const good=!blank&&Number(qa[index])===question.answer;if(good)correctQuestions++;return{question,good};});
  const worksheet=validateWorksheet(id);worksheetFeedback[id]=worksheet.feedback;
  const correct=correctQuestions+worksheet.correct;
  const total=c.questions.length+worksheet.total;
  const score=total?Math.round(correct/total*100):100;
  state.scores[stateKey()]=score;state.attempts[stateKey()]=(state.attempts[stateKey()]||0)+1;save();renderHeader();renderTabs();renderSidebar();renderWork();
  const mastered=score===100&&!state.assisted[stateKey()];
  const wrong=details.map((item,index)=>({...item,index})).filter(item=>!item.good);
  const good=details.map((item,index)=>({...item,index})).filter(item=>item.good);
  const renderQuizFeedback=(item)=>{const selected=qa[item.index]===undefined?'Aucune réponse':item.question.options[Number(qa[item.index])]??'Aucune réponse';const expected=item.question.options[item.question.answer];return `<div class="feedback-row ${item.good?'is-good':'is-bad'}"><div class="feedback-name">${item.good?'✓':'✕'} Question ${item.index+1}</div><div class="feedback-choice"><strong>Votre choix:</strong> ${esc(selected)}</div>${item.good?'':`<div class="feedback-choice expected"><strong>Réponse attendue:</strong> ${esc(expected)}</div>`}<div class="feedback-explain">${esc(item.question.why)}</div></div>`;};
  const nextActions=mastered?'<button class="btn primary" type="button" data-action="next">Cas suivant →</button>':state.assisted[stateKey()]?'<button class="btn primary" type="button" data-action="restart-no-help">Recommencer sans aide</button><button class="btn" type="button" data-action="next">Passer au cas suivant</button>':'<button class="btn primary" type="button" data-action="return-to-work">Corriger mes réponses</button><button class="btn" type="button" data-action="next">Passer au cas suivant</button>';
  document.querySelector('#resultArea').innerHTML=`<div class="result-card"><div class="result-head"><div class="result-score ${mastered?'good':score>=67?'medium':'bad'}">${score}%</div><div><h3>${mastered?'Qualification maîtrisée':score>=67?'Presque acquis':'Analyse à reprendre'}</h3><p>${correct}/${total} contrôle(s) correct(s)${worksheet.applicable?' · tableau compris':''}</p></div></div>${worksheetFeedbackMarkup(worksheet,esc,chf)}<div class="feedback">${wrong.length?`<div class="feedback-focus"><h4>À revoir (${wrong.length})</h4>${wrong.map(renderQuizFeedback).join('')}</div>`:'<div class="callout success"><strong>Toutes les réponses sont correctes.</strong></div>'}${good.length?`<details class="feedback-correct"><summary>Voir les réponses correctes (${good.length})</summary>${good.map(renderQuizFeedback).join('')}</details>`:''}</div><div class="lesson"><strong>À retenir:</strong> ${esc(c.lesson)}</div><div class="form-actions">${nextActions}</div></div>`;
  document.querySelector('#resultArea').scrollIntoView({behavior:'smooth',block:'start'});
}


function showSolution(){
  const c=current();if(c.type==='free'){showToast('Le cas libre ne possède pas de solution prédéfinie. Utilisez le contrôle de cohérence.','info');return;}state.assisted[stateKey()]=true;delete state.scores[stateKey()];
  if(c.type==='quiz'){const qa=quizAnswers();c.questions.forEach((question,index)=>qa[index]=question.answer);fillWorksheetSolution(casePublicId(c));}
  else{
    state.answers[stateKey()]={};
    Object.entries(expectedInputMap(c)).forEach(([key,value])=>{if(Math.abs(value)>0.000001)state.answers[stateKey()][key]=String(value);});
    const calc=computeCalculator(c,state.answers[stateKey()]);state.reported[stateKey()]={...calc,signature:calculatorSignature(c,state.answers[stateKey()]),reportedAt:new Date().toISOString()};state.steps[stateKey()]=3;
  }
  save();renderAll();document.querySelector('#resultArea').innerHTML='<div class="callout success"><strong>Solution affichée.</strong> Le cas reste marqué «assisté». Recommencez sans aide pour le valider réellement.</div>';
}
function resetCase(noConfirm=false){if(!noConfirm&&!confirm('Réinitialiser les réponses et le statut de ce cas?'))return;clearCaseState(state.current);delete worksheetFeedback[casePublicId(baseCurrent())];document.querySelector('#resultArea').innerHTML='';renderAll();}

function summary(){const mastered=masteredCount(),total=scoredCases().length;const scores=CASES.map((c)=>{const id=casePublicId(c);return !c.excludeFromProgress&&!state.assisted[id]?state.scores[id]:undefined;}).filter(Number.isFinite);const average=scores.length?Math.round(scores.reduce((sum,value)=>sum+value,0)/scores.length):0;const order=visualOrder();document.querySelector('#resultArea').innerHTML=`<div class="result-card"><div class="result-head"><div class="result-score good">${mastered}/${total}</div><div><h3>Bilan du parcours TDFN</h3><p>Score moyen sans solution: ${average}% · le cas libre n’entre pas dans la note</p></div></div><div class="summary-list">${order.map((index)=>{const c=CASES[index];const status=caseStatus(index);const module=MODULES[moduleIndexFor(c)];return `<div class="summary-item"><div><b>${esc(c.tab)} — ${esc(c.title)}</b><span>${esc(module.track)} · ${esc(c.level)}</span></div><div class="summary-state ${status?.[1]||''}">${status?.[0]||'non commencé'}</div></div>`;}).join('')}</div><div class="form-actions"><button class="btn" type="button" data-action="print">Imprimer</button><button class="btn danger" type="button" data-action="reset-all">Effacer toute la progression</button></div></div>`;}
function preview(){const c=current();const declaration=computeDeclaration(c,answers(),state.reported[stateKey()],state.finalRound[stateKey()]);document.querySelector('#previewContent').innerHTML=`<div class="preview-sheet"><h3>Aperçu du décompte — ${esc(c.entity)}</h3><p>${esc(c.period)} · simulation pédagogique</p><div class="preview-grid">${[['ch. 200',declaration.ch200],['ch. 289',declaration.ch289],['ch. 299',declaration.ch299],['ch. 323 — prestations',declaration.ch323Base],['ch. 323 — impôt',declaration.ch323Tax],['ch. 379',declaration.ch379],['ch. 383',declaration.acqTax],['ch. 399',declaration.ch399],['ch. 479',declaration.ch479],['ch. 500',declaration.ch500],['ch. 510',declaration.ch510],['ch. 900',declaration.ch900],['ch. 910',declaration.ch910]].map(([label,value])=>`<div><span>${label}</span><strong>${chf(value,2)}</strong></div>`).join('')}</div></div>`;document.querySelector('#previewDialog').showModal();}
function selectCase(index,focus=false){state.current=Math.max(0,Math.min(CASES.length-1,index));state.currentId=casePublicId(CASES[state.current]);save();history.replaceState(null,'',`#cas-${casePublicId(CASES[state.current])}`);document.querySelector('#resultArea').innerHTML='';renderAll();if(focus){const title=document.querySelector('#caseTitle');title?.focus({preventScroll:true});title?.scrollIntoView({behavior:'smooth',block:'start'});}}
function renderSources(){document.querySelector('#sourceRegistry').innerHTML=`<table class="source-table"><thead><tr><th>Source</th><th>Utilisation</th><th>Statut</th></tr></thead><tbody>${OFFICIAL_SOURCES.map(source=>`<tr><td><a href="${source.url}" target="_blank" rel="noopener noreferrer">${esc(source.title)}</a></td><td>${esc(source.scope)}</td><td>${esc(source.status)}</td></tr>`).join('')}</tbody></table>`;}
function renderPrecheck(){const id=casePublicId(current());const priorities=CASE_PRECHECK_PRIORITIES[id]||[];document.querySelector('#precheckContent').innerHTML=componentMarkup('precheck',{checked:state.precheck[id]||{},priorities});}
function renderAll(){renderHeader();renderTabs();renderSidebar();renderCaseHead();renderWork();updateNavigationAvailability();}



function refreshCalculatorViews(){renderWork();const dialog=document.querySelector('#calcDialog');if(dialog?.open){dialog.querySelector('#calcDialogContent').innerHTML=calculatorMarkup(current(),{dialog:true});updateComputed();}}
function addActivity(){const cfg=freeConfig();if((cfg.activities||[]).length>=8){showToast('Maximum pédagogique: 8 activités.','error');return;}cfg.activities.push({label:`Activité ${cfg.activities.length+1}`,rate:6.2});delete state.reported[stateKey()];save();refreshCalculatorViews();}
function removeActivity(index){const cfg=freeConfig();if(cfg.activities.length<=1){showToast('Conservez au moins une activité.','error');return;}const values=cfg.activities.map((_,i)=>answers()[rateKey('base',i)]??'');cfg.activities.splice(index,1);values.splice(index,1);Object.keys(answers()).filter(key=>/^r\d+base$/.test(key)).forEach(key=>delete answers()[key]);values.forEach((value,i)=>{if(value!=='')answers()[rateKey('base',i)]=value;});delete state.reported[stateKey()];save();refreshCalculatorViews();}

function exportProgress() {
  const payload = JSON.stringify(exportStateSnapshot(), null, 2);
  const blob = new Blob([payload], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `progression-tva-tdfn-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
  showToast('Progression exportée. Le fichier ne contient que vos réponses locales.', 'success');
}
function requestProgressImport() {
  const input = document.querySelector('#progressImportInput');
  if (!input) return;
  input.value = '';
  input.click();
}
async function importProgressFile(file) {
  if (!file) return;
  if (file.size > 2_000_000) { showToast('Fichier trop volumineux pour une sauvegarde de progression.', 'error'); return; }
  if (!confirm('Importer cette sauvegarde remplacera la progression actuellement enregistrée dans ce navigateur. Continuer?')) return;
  try {
    const snapshot = JSON.parse(await file.text());
    importStateSnapshot(snapshot);
    renderAll();
    document.querySelector('#resultArea').innerHTML = '';
    showToast('Progression importée avec succès.', 'success');
  } catch (error) {
    showToast(error?.message || 'Import impossible.', 'error');
  }
}

function handleAction(action,button){
  if(action==='validate')current().type==='quiz'?validateQuiz():validateForm();if(action==='previous')navigateVisual(-1);
  if(action==='solution')showSolution();if(action==='summary')summary();if(action==='reset-case')resetCase();if(action==='restart-no-help')resetCase(true);if(action==='next')navigateVisual(1);if(action==='print')window.print();if(action==='open-calc')openCalculator();if(action==='close-calc')document.querySelector('#calcDialog').close();if(action==='report-calc')reportCalculation();if(action==='preview')preview();if(action==='close-preview')document.querySelector('#previewDialog').close();if(action==='temporary-save')showToast('Progression enregistrée localement dans ce navigateur.','success');if(action==='back-list')showToast('Entraînement local: aucune liste «Mes décomptes TVA» n’est disponible.','info');if(action==='attachment-info')showToast('Dans le service AFC, le justificatif est joint à la procédure de déclaration.','info');if(action==='add-activity')addActivity();if(action==='remove-activity')removeActivity(Number(button?.dataset.index));
  if(action==='toggle-dossier'){state.dossierOpen[stateKey()]=!state.dossierOpen[stateKey()];save();renderAll();}
  if(action==='clear-worksheet'){clearWorksheet(casePublicId(current()));delete worksheetFeedback[casePublicId(current())];renderWork();}
  if(action==='export-progress')exportProgress();
  if(action==='import-progress')requestProgressImport();
  if(action==='open-precheck'){renderPrecheck();document.querySelector('#precheckDialog').showModal();}
  if(action==='open-memo')document.querySelector('#memoDialog').showModal();
  if(action==='open-sources')document.querySelector('#sourceDialog').showModal();
  if(action==='close-precheck')document.querySelector('#precheckDialog').close();
  if(action==='reset-precheck'){state.precheck[casePublicId(current())]={};save();renderPrecheck();}
  if(action==='precheck-open-all'||action==='precheck-close-all'){const open=action==='precheck-open-all';document.querySelectorAll('[data-precheck-panel]').forEach(panel=>{const body=panel.querySelector('.precheck-accordion__body');const toggle=panel.querySelector('[data-action="toggle-precheck-detail"]');if(body)body.hidden=!open;if(toggle)toggle.setAttribute('aria-expanded',String(open));});document.querySelectorAll('.precheck-secondary').forEach(details=>details.open=open);}
  if(action==='toggle-precheck-detail'){const key=button?.dataset.key;const panel=document.querySelector(`[data-precheck-panel="${key}"]`);const body=panel?.querySelector('.precheck-accordion__body');if(body){body.hidden=!body.hidden;button.setAttribute('aria-expanded',String(!body.hidden));}}
  if(action==='return-to-work'){document.querySelector('#resultArea').innerHTML='';document.querySelector('#workArea')?.scrollIntoView({behavior:'smooth',block:'start'});}
  if(action==='reset-all'&&confirm('Effacer toute la progression de l’entraînement?')){resetAllState();renderAll();document.querySelector('#resultArea').innerHTML='';}
}

document.addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;if(button.dataset.publicCase){const index=publicIndex(button.dataset.publicCase);if(index>=0)selectCase(index);return;}if(button.dataset.case!==undefined){selectCase(Number(button.dataset.case));return;}if(button.dataset.mode){state.mode=button.dataset.mode;save();renderAll();return;}if(button.dataset.step){const nextStep=Number(button.dataset.step);state.steps[stateKey()]=nextStep;if(nextStep===2)state.dossierOpen[stateKey()]=true;if(nextStep===3)state.dossierOpen[stateKey()]=false;save();renderAll();return;}if(button.dataset.action)handleAction(button.dataset.action,button);});
document.addEventListener('input',event=>{
  const worksheetInput=event.target.closest('[data-worksheet-field]');if(worksheetInput){updateWorksheetField(casePublicId(current()),worksheetInput.dataset.lineId,worksheetInput.dataset.worksheetField,worksheetInput.value);delete worksheetFeedback[casePublicId(current())];return;}
  const freeLabel=event.target.closest('[data-free-label]');if(freeLabel){freeConfig().activities[Number(freeLabel.dataset.freeLabel)].label=freeLabel.value;delete state.reported[stateKey()];save();updateComputed();return;}
  const input=event.target.closest('[data-key],[data-text-key]');if(!input)return;const key=input.dataset.key||input.dataset.textKey;answers()[key]=input.value;input.classList.remove('ok','error','blank');input.removeAttribute('aria-invalid');save();updateComputed();
});
document.addEventListener('change',event=>{
  const moduleSelect=event.target.closest('[data-module-select]');if(moduleSelect){const module=MODULES[Number(moduleSelect.value)];const index=publicIndex(module?.ids?.[0]);if(index>=0)selectCase(index);return;}
  const worksheetInput=event.target.closest('[data-worksheet-field]');if(worksheetInput){updateWorksheetField(casePublicId(current()),worksheetInput.dataset.lineId,worksheetInput.dataset.worksheetField,worksheetInput.value);delete worksheetFeedback[casePublicId(current())];return;}
  const precheck=event.target.closest('[data-precheck]');if(precheck){const id=casePublicId(current());state.precheck[id]||(state.precheck[id]={});state.precheck[id][precheck.dataset.precheck]=precheck.checked;save();const count=document.querySelector('[data-precheck-count]');if(count){const total=Object.keys(PRECHECK_DETAILS).length;const marked=Object.keys(PRECHECK_DETAILS).filter(key=>Boolean(state.precheck[id][key])).length;count.textContent=`${marked} / ${total} contrôles marqués`;}return;}
  const question=event.target.closest('[data-question]');if(question){quizAnswers()[question.dataset.question]=Number(question.value);save();return;}
  const freeRate=event.target.closest('[data-free-rate]');if(freeRate){freeConfig().activities[Number(freeRate.dataset.freeRate)].rate=Number(freeRate.value);delete state.reported[stateKey()];save();updateComputed();return;}
  const acqRate=event.target.closest('[data-acq-rate]');if(acqRate){state.acquisitionRate[stateKey()]=Number(acqRate.value);save();updateComputed();return;}
  const finalRound=event.target.closest('[data-final-round]');if(finalRound){state.finalRound[stateKey()]=finalRound.checked;save();updateComputed();}
});
document.querySelector('#progressImportInput')?.addEventListener('change',event=>importProgressFile(event.target.files?.[0]));
document.querySelector('#caseSelect').addEventListener('change',event=>selectCase(Number(event.target.value)));
document.querySelector('#caseTabs').addEventListener('keydown',event=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;event.preventDefault();if(event.key==='ArrowRight')navigateVisual(1);if(event.key==='ArrowLeft')navigateVisual(-1);if(event.key==='Home')selectCase(visualOrder()[0],true);if(event.key==='End')selectCase(visualOrder().at(-1),true);});
document.querySelector('#openSources').addEventListener('click',()=>document.querySelector('#sourceDialog').showModal());document.querySelector('#closeSources').addEventListener('click',()=>document.querySelector('#sourceDialog').close());
document.querySelector('#openMemo')?.addEventListener('click',()=>document.querySelector('#memoDialog').showModal());document.querySelector('#openMemoInline')?.addEventListener('click',()=>document.querySelector('#memoDialog').showModal());document.querySelector('#closeMemo')?.addEventListener('click',()=>document.querySelector('#memoDialog').close());
for(const id of ['memoDialog','sourceDialog','precheckDialog','calcDialog','previewDialog'])document.querySelector(`#${id}`).addEventListener('click',event=>{if(event.target===event.currentTarget)event.currentTarget.close();});
const hashMatch=location.hash.match(/^#cas-([A-Z]+\d*)$/i);if(hashMatch){const rawRequested=hashMatch[1].toUpperCase();const requested=rawRequested==='K'?'K0':rawRequested==='J'?'J1':rawRequested;const index=publicIndex(requested);if(index>=0){state.current=index;state.currentId=casePublicId(CASES[index]);if(rawRequested!==requested)history.replaceState(null,'',`#cas-${requested}`);}}
window.addEventListener('error',()=>showToast('Une erreur inattendue est survenue. Rechargez la page; votre progression locale est conservée.', 'error'));
window.addEventListener('unhandledrejection',()=>showToast('Une opération n’a pas pu être terminée. Rechargez la page si nécessaire.', 'error'));
renderSources();renderAll();
