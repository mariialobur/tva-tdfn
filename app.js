import {CASES,DEDUCTIONS,OFFICIAL_SOURCES} from './data.js';
import {rateKey,parseAmount,expectedInputMap,computeCalculator,calculatorSignature,computeDeclaration,validateCase,allActivityBasesEntered,universalChecks,roundToCent} from './logic.js';

const STORAGE_KEY='tva_tdfn_v6_state';
const DEFAULT={version:6,current:0,mode:'guided',steps:{},answers:{},quiz:{},scores:{},assisted:{},attempts:{},reported:{},finalRound:{},acquisitionRate:{},free:{activities:[{label:'Activité 1',rate:6.2}]}};
let state=loadState();

function loadState(){
  try{
    const raw=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');
    if(raw?.version===6) return {...structuredClone(DEFAULT),...raw,free:{...structuredClone(DEFAULT.free),...(raw.free||{})}};
    if([4,5].includes(raw?.version)) return {...structuredClone(DEFAULT),...raw,version:6,free:{...structuredClone(DEFAULT.free),...(raw.free||{})}};
  }catch{}
  return structuredClone(DEFAULT);
}
function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch{}}
const baseCurrent=()=>CASES[state.current];
const freeConfig=()=>state.free||(state.free=structuredClone(DEFAULT.free));
function current(){
  const c=baseCurrent();
  if(c.type!=='free') return c;
  const activities=(freeConfig().activities||[]).map((item,index)=>({label:item.label?.trim()||`Activité ${index+1}`,rate:Number(item.rate),base:0}));
  return {...c,rates:activities};
}
const answers=()=>state.answers[state.current]||(state.answers[state.current]={});
const quizAnswers=()=>state.quiz[state.current]||(state.quiz[state.current]={});
const sourceById=id=>OFFICIAL_SOURCES.find(source=>source.id===id);
const fmt=(value,decimals=0)=>new Intl.NumberFormat('fr-CH',{minimumFractionDigits:decimals,maximumFractionDigits:decimals}).format(Number(value||0));
const chf=(value,decimals=2)=>`CHF\u00a0${fmt(value,decimals)}`;
const esc=value=>String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));

const scoredCases=()=>CASES.filter(c=>!c.excludeFromProgress);
function masteredCount(){return CASES.filter((c,index)=>!c.excludeFromProgress&&state.scores[index]===100&&!state.assisted[index]).length;}
function caseStatus(index){const c=CASES[index];if(c.excludeFromProgress)return ['libre','free'];if(state.assisted[index])return ['assisté','assisted'];if(state.scores[index]===100)return ['maîtrisé','mastered'];if(Number.isFinite(state.scores[index]))return [`${state.scores[index]}%`,'partial'];return null;}
function renderHeader(){const count=masteredCount(),total=scoredCases().length;document.querySelector('#progressText').textContent=`${count} / ${total}`;document.querySelector('#progressBar').style.width=`${total?count/total*100:0}%`;}
function moduleFor(c){if('ABC'.includes(c.id))return '1 · Fondamentaux';if('DEF'.includes(c.id))return '2 · Plusieurs activités';if('GHI'.includes(c.id))return '3 · International';if('JKLM'.includes(c.id))return '4 · Cas avancés';return '5 · Atelier libre';}
function renderTabs(){document.querySelector('#caseTabs').innerHTML=CASES.map((c,index)=>{const status=caseStatus(index);return `<button class="case-tab" id="tab-${c.id}" role="tab" aria-selected="${index===state.current}" tabindex="${index===state.current?0:-1}" data-case="${index}">${esc(c.tab)}${status?`<span class="status ${status[1]}">${status[0]}</span>`:''}</button>`;}).join('');const groups=new Map();CASES.forEach((c,index)=>{const module=moduleFor(c);if(!groups.has(module))groups.set(module,[]);groups.get(module).push({c,index});});document.querySelector('#caseSelect').innerHTML=[...groups].map(([label,items])=>`<optgroup label="${esc(label)}">${items.map(({c,index})=>`<option value="${index}" ${index===state.current?'selected':''}>${esc(c.tab)} — ${esc(c.title)}</option>`).join('')}</optgroup>`).join('');}

function dossierMarkup(c,compact=false){
  const links=(c.sourceIds||[]).map(sourceById).filter(Boolean);
  return `<div class="panel dossier-main">
      ${compact?'':`<h2 class="entity">${esc(c.entity)}</h2><div class="meta">${esc(c.sector)} · ${esc(c.location)} · ${esc(c.period)}</div><span class="level-pill">${esc(c.level)}</span>`}
      <p class="eyebrow dossier-label">Votre mission</p><p class="mission-text">${esc(c.mission)}</p>
    </div>
    <div class="panel dossier-data"><p class="eyebrow">Données du dossier</p><div class="data-list">${c.given.map(item=>`<div class="data-row"><div class="data-main">${esc(item.label)}${item.tag?`<span class="tag">${esc(item.tag)}</span>`:''}<span class="data-note">${esc(item.note||'')}</span></div>${Number.isFinite(item.amount)?`<div class="data-amount">${chf(item.amount,0)}</div>`:''}</div>`).join('')}</div></div>
    <details class="panel dossier-details"><summary>Références et contrôles</summary><div class="dossier-details__body"><p><strong>${esc(c.legal)}</strong></p><div class="checks">${c.checks.map((item,index)=>`<div class="check"><b>${index+1}.</b><span>${esc(item)}</span></div>`).join('')}</div><div class="source-links">${links.map(source=>`<a href="${source.url}" target="_blank" rel="noopener noreferrer">${esc(source.title)}</a>`).join('')}</div></div></details>`;
}
function renderSidebar(){
  const c=current();
  document.querySelector('#sidebar').innerHTML=dossierMarkup(c);
  document.querySelector('#mobileDossierContent').innerHTML=dossierMarkup(c,true)+`<div class="mobile-dossier-actions"><button class="btn" type="button" data-action="summary">Bilan du parcours</button><button class="btn danger" type="button" data-action="reset-case">Réinitialiser ce cas</button></div>`;
  renderActionBars(c);
}
function renderActionBars(c){
  for(const id of ['mobileActionBar','desktopActionBar']){
    const bar=document.querySelector(`#${id}`);if(!bar)continue;
    const validate=bar.querySelector('[data-action="validate"]');if(validate)validate.textContent=c.type==='free'?'Vérifier':'Contrôler';
    const solution=bar.querySelector('[data-action="solution"]');if(solution)solution.hidden=c.type==='free';
  }
}
function renderCaseHead(){
  const c=current();
  document.querySelector('#caseLevel').textContent=c.level;
  document.querySelector('#caseTitle').textContent=c.title;
  document.querySelector('#caseDescription').textContent=c.description;
  const switcher=document.querySelector('#modeSwitch');
  switcher.classList.toggle('hidden',c.type==='quiz');
  switcher.querySelectorAll('button').forEach(button=>button.classList.toggle('active',button.dataset.mode===state.mode));
}
function renderContrast(c){return `<div class="workspace-card contrast"><div class="client"><h3>Facture client</h3><p>${esc(c.clientNote)}</p></div><div class="arrow">→</div><div class="afc"><h3>Décompte AFC</h3><p>${esc(c.afcNote)}</p></div></div>`;}
function renderStepper(){const step=state.steps[state.current]||1;return `<div class="workspace-card stepper" role="navigation" aria-label="Étapes du cas">${[['1','Comprendre'],['2','Calcul TDFN'],['3','Décompte']].map(([number,label])=>`<button class="step-button ${Number(number)===step?'active':''}" data-step="${number}" type="button"><span>${number}</span>${label}</button>`).join('')}</div>`;}
function learning(){return `<div class="learning-card learning-focus"><p class="eyebrow">Étape 1 · Comprendre</p><h3>Préparez les trois contrôles avant de saisir la déclaration</h3><div class="learning-points"><div><b>1</b><span>Déterminer le ch. 200 et les déductions admises: <strong>ch. 299 = ch. 200 − ch. 289</strong>.</span></div><div><b>2</b><span>Ventiler le chiffre d’affaires brut TTC par activité et TDFN confirmé.</span></div><div><b>3</b><span>Reporter le calcul au ch. 323 et vérifier que <strong>ch. 379 = ch. 299</strong>.</span></div></div><p class="learning-note">Le solde final se calcule ensuite par ch. 399 − ch. 479, au ch. 500 ou 510.</p></div><div class="form-actions"><button class="btn primary" type="button" data-step="2">Passer au calcul TDFN →</button></div>`;}

function inputValue(key){return answers()[key]??'';}
function amountInput(key,label=''){return `<input class="amount-input" data-key="${key}" inputmode="decimal" autocomplete="off" value="${esc(inputValue(key))}" aria-label="${esc(label)}">`;}
function textInput(key,label=''){return `<input class="text-input" data-text-key="${key}" value="${esc(inputValue(key))}" aria-label="${esc(label)}">`;}
function reportedCurrent(c){const report=state.reported[state.current];return Boolean(report&&report.signature===calculatorSignature(c,answers()));}
function calcSnapshot(c){return computeCalculator(c,answers());}
function acquisitionRate(){return Number(state.acquisitionRate[state.current]??(current().fields?.acqRate||8.1));}

function calculatorMarkup(c,{dialog=false}={}){
  const calc=calcSnapshot(c);
  const currentReport=reportedCurrent(c);
  const isFree=c.type==='free';
  const rateOptions=[0.1,0.6,1.3,2.1,3.0,3.7,4.5,5.3,6.2,6.8];
  const rows=(c.rates||[]).map((rate,index)=>`<tr>
    <td>${isFree?`<input class="text-input activity-name" data-free-label="${index}" value="${esc(freeConfig().activities[index]?.label||'')}" aria-label="Libellé de l’activité ${index+1}">`:`<strong>${esc(rate.label)}</strong>`}</td>
    <td>${isFree?`<select class="rate-select" data-free-rate="${index}" aria-label="TDFN de l’activité ${index+1}">${rateOptions.map(value=>`<option value="${value}" ${Number(rate.rate)===value?'selected':''}>${fmt(value,1)} %</option>`).join('')}</select>`:`${fmt(rate.rate,1)} %`}</td>
    <td>${amountInput(rateKey('base',index),`Contre-prestations ${rate.label}`)}</td>
    <td class="computed-money" data-calc-tax="${index}">${chf(calc.lines[index]?.rawTax??calc.lines[index]?.tax??0,4)}</td>
    ${isFree?`<td><button class="icon-button compact" type="button" data-action="remove-activity" data-index="${index}" aria-label="Supprimer l’activité ${index+1}">×</button></td>`:''}
  </tr>`).join('');
  return `<div class="calculator-shell ${dialog?'calculator-dialog-body':''}">
    <div class="calculator-title"><div><p class="eyebrow">Calcul pédagogique basé sur le prototype AFC</p><h3>Ventilation des contre-prestations par activité</h3><p>Les montants sont bruts, TVA comprise. Le résultat agrégé est reporté au ch. 323.</p></div><span class="transfer-state ${currentReport?'ok':'pending'}">${currentReport?'Calcul reporté':'À reporter'}</span></div>
    <div class="old-period-note"><strong>Période modélisée:</strong> à partir du 01.01.2025. ${isFree?'Saisissez uniquement les activités et TDFN déjà confirmés dans le courrier ou le profil AFC de l’entreprise.':'Les blocs d’anciens taux ne sont pas utilisés dans ce cas.'}</div>
    ${isFree?'<div class="free-toolbar"><button class="btn" type="button" data-action="add-activity">+ Nouvelle activité</button><span>Maximum pédagogique: 8 activités.</span></div>':''}
    <div class="calculator-table-wrap"><table class="calculator-table"><thead><tr><th>Activité</th><th>TDFN</th><th>Contre-prestations CHF</th><th>Impôt brut CHF</th>${isFree?'<th>Action</th>':''}</tr></thead><tbody>${rows||'<tr><td colspan="5">Ajoutez au moins une activité.</td></tr>'}</tbody></table></div>
    <div class="calculator-summary"><div><span>Taux moyen</span><strong data-calc-average>${fmt(calc.averageRate,4)} %</strong></div><div><span>Contre-prestations</span><strong data-calc-base>${chf(calc.base,2)}</strong></div><div><span>Total de l’impôt</span><strong data-calc-total>${chf(calc.tax,2)}</strong></div></div>
    <fieldset class="rounding-options"><legend>Options d’arrondi visibles dans le prototype</legend><label><input type="radio" checked disabled> Calcul pédagogique sans arrondi intermédiaire</label><label class="unsupported"><input type="radio" disabled> Arrondi par activité <small>non simulé: algorithme public non spécifié</small></label><label class="unsupported"><input type="radio" disabled> Arrondi du total de l’impôt <small>non simulé: algorithme public non spécifié</small></label></fieldset>
    <div class="calculator-note">Le prototype public affiche trois choix, mais ne publie pas leur algorithme de production. Afin de ne pas enseigner une règle inventée, les montants par activité sont affichés à quatre décimales et additionnés sans arrondi intermédiaire; seul le total affiché est arrondi à CHF 0.01. Il ne s’agit pas d’une reproduction certifiée de l’algorithme du Portail AFC.</div>
    <div class="form-actions">${dialog?'<button class="btn" type="button" data-action="close-calc">Annuler</button>':'<button class="btn" type="button" data-step="1">← Revoir le principe</button>'}<button class="btn primary" type="button" data-action="report-calc">Reporter le calcul</button></div>
  </div>`;
}
function portalRow({code,label,sub='',valueKey,computedKey,secondComputed,rateValue,extra='',highlight=false}){
  return `<tr class="${highlight?'highlight-row':''}"><td class="form-label"><div class="label-main">${esc(label)}</div>${sub?`<div class="label-sub">${esc(sub)}</div>`:''}${extra}</td><td class="code">${esc(code)}</td><td class="money">${valueKey?amountInput(valueKey,`Chiffre ${code}`):computedKey?`<span class="computed" data-computed="${computedKey}">${chf(0,2)}</span>`:''}</td><td class="money">${secondComputed?`<span class="computed" data-computed="${secondComputed}">${chf(0,2)}</span>`:''}</td><td class="rate-cell">${rateValue||''}</td></tr>`;
}
function declarationMarkup(c){
  const report=state.reported[state.current];
  const reportStatus=reportedCurrent(c)?'current':report?'stale':'missing';
  const reportText=reportStatus==='current'?'Calcul reporté et à jour':reportStatus==='stale'?'Calcul modifié: report à refaire':'Aucun calcul reporté';
  const deductionRows=DEDUCTIONS.map(item=>portalRow({code:item.code,label:item.label,sub:item.help,valueKey:item.key,extra:item.key==='ch225'?'<button class="mini-link" type="button" data-action="attachment-info">Joindre le formulaire 764</button>':item.key==='ch280'?`<div class="divers-note">${textInput('ch280Note','Description de la déduction diverse')}</div>`:''})).join('');
  return `<div class="afc-form-card">
    <div class="afc-form-header"><div><p class="eyebrow">Vue pédagogique inspirée du prototype AFC</p><h3>Décompte d’entraînement — méthode TDFN</h3></div><span class="simulation-badge">Exercice · aucune transmission</span></div>
    <section class="afc-section"><h4>I. Chiffre d’affaires</h4><div class="subsection-title">Contre-prestations</div><div class="afc-table-wrap"><table class="afc-table"><thead><tr><th>Contre-prestations</th><th>Chiffre</th><th>Chiffre d’affaires CHF</th><th></th><th></th></tr></thead><tbody>
      ${portalRow({code:'200',label:'Total des contre-prestations convenues ou reçues',sub:'Y compris prestations imposées par option, transferts par procédure de déclaration et prestations à l’étranger',valueKey:'ch200',highlight:true})}
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
      ${portalRow({code:'415',label:'Corrections en cas de prise en charge dans le cadre de la procédure de déclaration',sub:'Art. 38 LTVA; utiliser uniquement si le dossier le justifie',valueKey:'ch415'})}
      ${portalRow({code:'479',label:'Total du crédit d’impôt',computedKey:'ch479',highlight:true})}
      <tr class="highlight-row"><td class="form-label"><div class="label-main">Montant à payer</div></td><td class="code">500</td><td></td><td class="money"><span class="computed" data-computed="ch500">${chf(0,2)}</span></td><td class="rate-cell"><label class="round-final" title="Option distincte affichée au ch. 500 dans le prototype"><input type="checkbox" data-final-round ${state.finalRound[state.current]?'checked':''}> Arrondir le solde</label></td></tr>
      ${portalRow({code:'510',label:'Solde en faveur de l’assujetti',computedKey:'ch510',highlight:true})}
    </tbody></table></div></section>
    <section class="afc-section"><h4>III. Autres mouvements de fonds (art. 18, al. 2)</h4><div class="afc-table-wrap"><table class="afc-table"><thead><tr><th></th><th>Chiffre</th><th>Montant CHF</th><th></th><th></th></tr></thead><tbody>
      ${portalRow({code:'900',label:'Subventions, taxes touristiques et contributions publiques visées par la rubrique',valueKey:'ch900'})}
      ${portalRow({code:'910',label:'Dons, dividendes, dédommagements, etc.',valueKey:'ch910'})}
    </tbody></table></div></section>
    <div class="concordance-box" data-concordance></div>
    <div class="portal-actions"><button class="btn danger" type="button" data-action="reset-case">Vider</button><button class="btn" type="button" data-action="temporary-save">Enregistrer</button><button class="btn" type="button" data-action="preview">Aperçu</button><button class="btn primary" type="button" data-action="validate">Contrôler</button></div>
  </div>`;
}

function quizMarkup(c){const qa=quizAnswers();return `${c.conceptualNote?`<div class="callout warning conceptual-note"><strong>Cas conceptuel:</strong> ${esc(c.conceptualNote)}</div>`:''}<div class="quiz-card">${c.questions.map((question,index)=>`<fieldset class="question"><legend>${index+1}. ${esc(question.q)}</legend>${question.options.map((option,optionIndex)=>`<label><input type="radio" name="q-${state.current}-${index}" data-question="${index}" value="${optionIndex}" ${Number(qa[index])===optionIndex?'checked':''}> <span>${esc(option)}</span></label>`).join('')}</fieldset>`).join('')}<div class="form-actions"><button class="btn primary" type="button" data-action="validate">Vérifier les réponses</button><button class="btn" type="button" data-action="solution">Afficher la solution</button></div></div>`;}

function renderWork(){
  const c=current();
  if(c.type==='quiz'){document.querySelector('#workArea').innerHTML=renderContrast(c)+quizMarkup(c);return;}
  if(state.mode==='portal'){document.querySelector('#workArea').innerHTML=renderContrast(c)+declarationMarkup(c);updateComputed();return;}
  const step=state.steps[state.current]||1;
  let content=learning(c);
  if(step===2) content=calculatorMarkup(c);
  if(step===3) content=declarationMarkup(c);
  document.querySelector('#workArea').innerHTML=renderContrast(c)+renderStepper()+content;
  updateComputed();
}

function updateComputed(){
  const c=current();
  if(c.type==='quiz') return;
  const calc=calcSnapshot(c);
  document.querySelectorAll('[data-calc-tax]').forEach(node=>{const line=calc.lines[Number(node.dataset.calcTax)];node.textContent=chf(line?.rawTax??line?.tax??0,4);});
  document.querySelectorAll('[data-calc-average]').forEach(node=>node.textContent=`${fmt(calc.averageRate,4)} %`);
  document.querySelectorAll('[data-calc-base]').forEach(node=>node.textContent=chf(calc.base,2));
  document.querySelectorAll('[data-calc-total]').forEach(node=>node.textContent=chf(calc.tax,2));
  const report=state.reported[state.current]||null;
  const declaration=computeDeclaration(c,answers(),report,state.finalRound[state.current]);
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
  if(!allActivityBasesEntered(c,answers())){showToast('Ajoutez au moins une activité et saisissez une contre-prestation pour chacune, même si le montant est zéro.','error');return;}
  const calc=calcSnapshot(c);
  state.reported[state.current]={...calc,signature:calculatorSignature(c,answers()),reportedAt:new Date().toISOString()};
  state.steps[state.current]=3;
  save();
  const dialog=document.querySelector('#calcDialog');if(dialog?.open)dialog.close();
  renderWork();showToast(`Calcul reporté au ch. 323: ${chf(calc.base,2)} et ${chf(calc.tax,2)} d’impôt.`,'success');
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

function validateFree(){
  const c=current(),report=state.reported[state.current];
  const universal=universalChecks(c,answers(),report,{reportCurrent:reportedCurrent(c),acquisitionRate:acquisitionRate()});
  const declaration=universal.declaration;
  state.attempts[state.current]=(state.attempts[state.current]||0)+1;save();
  document.querySelector('#resultArea').innerHTML=`<div class="result-card"><div class="result-head"><div class="result-score ${universal.allGood?'good':'bad'}">${universal.correct}/${universal.total}</div><div><h3>${universal.allGood?'Cohérence arithmétique vérifiée':'Incohérences à corriger'}</h3><p>Atelier libre · contrôle arithmétique et structurel uniquement</p></div></div><div class="feedback">${checksMarkup(universal.rows)}</div><div class="lesson"><strong>Résultat calculé:</strong> ch. 299 ${chf(declaration.ch299,2)} · ch. 399 ${chf(declaration.ch399,2)} · ch. 479 ${chf(declaration.ch479,2)} · ch. 500 ${chf(declaration.ch500,2)} · ch. 510 ${chf(declaration.ch510,2)}.<br><strong>Limite:</strong> ce contrôle suppose que le paramétrage AFC est déjà confirmé; il ne valide ni la qualification de l’activité ni l’exhaustivité des justificatifs.</div></div>`;
  document.querySelector('#resultArea').scrollIntoView({behavior:'smooth',block:'start'});
}

function validateForm(){
  const c=current();
  if(c.type==='free'){validateFree();return;}
  const validation=validateCase(c,answers());
  const report=state.reported[state.current];
  const universal=universalChecks(c,answers(),report,{reportCurrent:reportedCurrent(c),acquisitionRate:acquisitionRate()});
  const total=validation.total+universal.total;
  const correct=validation.correct+universal.correct;
  const score=total?Math.round(correct/total*100):0;
  state.scores[state.current]=score;
  state.attempts[state.current]=(state.attempts[state.current]||0)+1;
  save();renderHeader();renderTabs();renderSidebar();
  validation.rows.forEach(row=>{document.querySelectorAll(`[data-key="${row.key}"]`).forEach(input=>{input.classList.remove('ok','error','blank');input.classList.add(row.blank?'blank':row.good?'ok':'error');input.setAttribute('aria-invalid',String(!row.good));});});
  const mastered=score===100&&!state.assisted[state.current];
  const declaration=universal.declaration;
  document.querySelector('#resultArea').innerHTML=`<div class="result-card"><div class="result-head"><div class="result-score ${mastered?'good':score>=70?'medium':'bad'}">${score}%</div><div><h3>${mastered?'Cas maîtrisé':score===100?'Calcul correct après consultation de la solution':score>=70?'Presque terminé':'Corrections nécessaires'}</h3><p>${correct} contrôle(s) correct(s) sur ${total} · tentative ${state.attempts[state.current]}</p>${state.assisted[state.current]?'<div class="assisted-note">La solution a été consultée; le cas reste marqué «assisté».</div>':''}</div></div><div class="feedback">${validation.rows.map(row=>{let entered='aucune réponse';if(row.invalid)entered='format non reconnu';else if(row.negative)entered='montant négatif';else if(row.actual!==null)entered=`saisi ${chf(row.actual,2)}`;return `<div class="feedback-row"><div class="feedback-top"><div class="feedback-name">${row.good?'✓':'✕'} ${esc(labelFor(c,row.key))}</div><div class="feedback-value">${entered} · attendu ${chf(row.target,2)}</div></div>${diagnostic(c,row)?`<div class="feedback-explain"><strong>Diagnostic:</strong> ${esc(diagnostic(c,row))}</div>`:''}${c.explanations?.[row.key]?`<div class="feedback-explain">${esc(c.explanations[row.key])}</div>`:''}</div>`;}).join('')}${checksMarkup(universal.rows)}</div><div class="lesson"><strong>Leçon du cas:</strong> ${esc(c.lesson)}<br><strong>Décompte calculé:</strong> ch. 399 ${chf(declaration.ch399,2)} · ch. 479 ${chf(declaration.ch479,2)} · ch. 500 ${chf(declaration.ch500,2)} · ch. 510 ${chf(declaration.ch510,2)}.</div><div class="form-actions">${state.assisted[state.current]?'<button class="btn" type="button" data-action="restart-no-help">Recommencer sans aide</button>':''}<button class="btn" type="button" data-action="next">Cas suivant →</button></div></div>`;
  document.querySelector('#resultArea').scrollIntoView({behavior:'smooth',block:'start'});
}

function validateQuiz(){
  const c=current(),qa=quizAnswers();let correct=0;
  const details=c.questions.map((question,index)=>{const blank=qa[index]===undefined;const good=!blank&&Number(qa[index])===question.answer;if(good)correct++;return{question,good};});
  const score=Math.round(correct/c.questions.length*100);state.scores[state.current]=score;state.attempts[state.current]=(state.attempts[state.current]||0)+1;save();renderHeader();renderTabs();renderSidebar();
  const mastered=score===100&&!state.assisted[state.current];
  document.querySelector('#resultArea').innerHTML=`<div class="result-card"><div class="result-head"><div class="result-score ${mastered?'good':score>=67?'medium':'bad'}">${score}%</div><div><h3>${mastered?'Qualification maîtrisée':'Analyse à reprendre'}</h3><p>${correct}/${c.questions.length} réponse(s) correcte(s)</p></div></div><div class="feedback">${details.map((item,index)=>`<div class="feedback-row"><div class="feedback-name">${item.good?'✓':'✕'} Question ${index+1}</div><div class="feedback-explain">${esc(item.question.why)}</div></div>`).join('')}</div><div class="lesson"><strong>Leçon du cas:</strong> ${esc(c.lesson)}</div></div>`;
}

function showSolution(){
  const c=current();if(c.type==='free'){showToast('Le cas libre ne possède pas de solution prédéfinie. Utilisez le contrôle de cohérence.','info');return;}state.assisted[state.current]=true;delete state.scores[state.current];
  if(c.type==='quiz'){const qa=quizAnswers();c.questions.forEach((question,index)=>qa[index]=question.answer);}
  else{
    state.answers[state.current]={};
    Object.entries(expectedInputMap(c)).forEach(([key,value])=>{if(Math.abs(value)>0.000001)state.answers[state.current][key]=String(value);});
    const calc=computeCalculator(c,state.answers[state.current]);state.reported[state.current]={...calc,signature:calculatorSignature(c,state.answers[state.current]),reportedAt:new Date().toISOString()};state.steps[state.current]=3;
  }
  save();renderAll();document.querySelector('#resultArea').innerHTML='<div class="callout success"><strong>Solution affichée.</strong> Le cas reste marqué «assisté». Recommencez sans aide pour le valider réellement.</div>';
}
function resetCase(noConfirm=false){if(!noConfirm&&!confirm('Réinitialiser les réponses et le statut de ce cas?'))return;['answers','quiz','scores','assisted','attempts','steps','reported','finalRound','acquisitionRate'].forEach(group=>delete state[group][state.current]);if(baseCurrent().type==='free')state.free=structuredClone(DEFAULT.free);save();document.querySelector('#resultArea').innerHTML='';renderAll();}
function summary(){const mastered=masteredCount(),total=scoredCases().length;const scores=CASES.map((c,index)=>!c.excludeFromProgress&&!state.assisted[index]?state.scores[index]:undefined).filter(Number.isFinite);const average=scores.length?Math.round(scores.reduce((sum,value)=>sum+value,0)/scores.length):0;document.querySelector('#resultArea').innerHTML=`<div class="result-card"><div class="result-head"><div class="result-score good">${mastered}/${total}</div><div><h3>Bilan du parcours TDFN</h3><p>Score moyen sans solution: ${average}% · le cas libre n’entre pas dans la note</p></div></div><div class="summary-list">${CASES.map((c,index)=>{const status=caseStatus(index);return `<div class="summary-item"><div><b>${esc(c.tab)} — ${esc(c.title)}</b><span>${esc(c.level)}</span></div><div class="summary-state ${status?.[1]||''}">${status?.[0]||'non commencé'}</div></div>`;}).join('')}</div><div class="form-actions"><button class="btn" type="button" data-action="print">Imprimer</button><button class="btn danger" type="button" data-action="reset-all">Effacer toute la progression</button></div></div>`;}
function preview(){const c=current();const declaration=computeDeclaration(c,answers(),state.reported[state.current],state.finalRound[state.current]);document.querySelector('#previewContent').innerHTML=`<div class="preview-sheet"><h3>Aperçu du décompte — ${esc(c.entity)}</h3><p>${esc(c.period)} · simulation pédagogique</p><div class="preview-grid">${[['ch. 200',declaration.ch200],['ch. 289',declaration.ch289],['ch. 299',declaration.ch299],['ch. 323 — prestations',declaration.ch323Base],['ch. 323 — impôt',declaration.ch323Tax],['ch. 379',declaration.ch379],['ch. 383',declaration.acqTax],['ch. 399',declaration.ch399],['ch. 479',declaration.ch479],['ch. 500',declaration.ch500],['ch. 510',declaration.ch510],['ch. 900',declaration.ch900],['ch. 910',declaration.ch910]].map(([label,value])=>`<div><span>${label}</span><strong>${chf(value,2)}</strong></div>`).join('')}</div></div>`;document.querySelector('#previewDialog').showModal();}
function selectCase(index,focus=false){state.current=Math.max(0,Math.min(CASES.length-1,index));save();history.replaceState(null,'',`#cas-${CASES[state.current].id}`);document.querySelector('#resultArea').innerHTML='';renderAll();if(focus)document.querySelector(`#tab-${CASES[state.current].id}`)?.focus();}
function renderSources(){document.querySelector('#sourceRegistry').innerHTML=`<table class="source-table"><thead><tr><th>Source</th><th>Utilisation</th><th>Statut</th></tr></thead><tbody>${OFFICIAL_SOURCES.map(source=>`<tr><td><a href="${source.url}" target="_blank" rel="noopener noreferrer">${esc(source.title)}</a></td><td>${esc(source.scope)}</td><td>${esc(source.status)}</td></tr>`).join('')}</tbody></table>`;}
function renderAll(){renderHeader();renderTabs();renderSidebar();renderCaseHead();renderWork();}

function refreshCalculatorViews(){renderWork();const dialog=document.querySelector('#calcDialog');if(dialog?.open){dialog.querySelector('#calcDialogContent').innerHTML=calculatorMarkup(current(),{dialog:true});updateComputed();}}
function addActivity(){const cfg=freeConfig();if((cfg.activities||[]).length>=8){showToast('Maximum pédagogique: 8 activités.','error');return;}cfg.activities.push({label:`Activité ${cfg.activities.length+1}`,rate:6.2});delete state.reported[state.current];save();refreshCalculatorViews();}
function removeActivity(index){const cfg=freeConfig();if(cfg.activities.length<=1){showToast('Conservez au moins une activité.','error');return;}const values=cfg.activities.map((_,i)=>answers()[rateKey('base',i)]??'');cfg.activities.splice(index,1);values.splice(index,1);Object.keys(answers()).filter(key=>/^r\d+base$/.test(key)).forEach(key=>delete answers()[key]);values.forEach((value,i)=>{if(value!=='')answers()[rateKey('base',i)]=value;});delete state.reported[state.current];save();refreshCalculatorViews();}

function handleAction(action,button){
  if(action==='validate')current().type==='quiz'?validateQuiz():validateForm();if(action==='previous')selectCase((state.current-1+CASES.length)%CASES.length);
  if(action==='solution')showSolution();if(action==='summary')summary();if(action==='reset-case')resetCase();if(action==='restart-no-help')resetCase(true);if(action==='next')selectCase((state.current+1)%CASES.length);if(action==='print')window.print();if(action==='open-calc')openCalculator();if(action==='close-calc')document.querySelector('#calcDialog').close();if(action==='report-calc')reportCalculation();if(action==='preview')preview();if(action==='close-preview')document.querySelector('#previewDialog').close();if(action==='temporary-save')showToast('Progression enregistrée localement dans ce navigateur.','success');if(action==='back-list')showToast('Entraînement local: aucune liste «Mes décomptes TVA» n’est disponible.','info');if(action==='attachment-info')showToast('Dans le service AFC, le justificatif est joint à la procédure de déclaration.','info');if(action==='add-activity')addActivity();if(action==='remove-activity')removeActivity(Number(button?.dataset.index));
  if(action==='reset-all'&&confirm('Effacer toute la progression de l’entraînement?')){localStorage.removeItem(STORAGE_KEY);state=structuredClone(DEFAULT);renderAll();document.querySelector('#resultArea').innerHTML='';}
}

document.addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;if(button.dataset.case!==undefined){selectCase(Number(button.dataset.case));return;}if(button.dataset.mode){state.mode=button.dataset.mode;save();renderAll();return;}if(button.dataset.step){state.steps[state.current]=Number(button.dataset.step);save();renderWork();return;}if(button.dataset.action)handleAction(button.dataset.action,button);});
document.addEventListener('input',event=>{
  const freeLabel=event.target.closest('[data-free-label]');if(freeLabel){freeConfig().activities[Number(freeLabel.dataset.freeLabel)].label=freeLabel.value;delete state.reported[state.current];save();updateComputed();return;}
  const input=event.target.closest('[data-key],[data-text-key]');if(!input)return;const key=input.dataset.key||input.dataset.textKey;answers()[key]=input.value;input.classList.remove('ok','error','blank');input.removeAttribute('aria-invalid');save();updateComputed();
});
document.addEventListener('change',event=>{
  const question=event.target.closest('[data-question]');if(question){quizAnswers()[question.dataset.question]=Number(question.value);save();return;}
  const freeRate=event.target.closest('[data-free-rate]');if(freeRate){freeConfig().activities[Number(freeRate.dataset.freeRate)].rate=Number(freeRate.value);delete state.reported[state.current];save();updateComputed();return;}
  const acqRate=event.target.closest('[data-acq-rate]');if(acqRate){state.acquisitionRate[state.current]=Number(acqRate.value);save();updateComputed();return;}
  const finalRound=event.target.closest('[data-final-round]');if(finalRound){state.finalRound[state.current]=finalRound.checked;save();updateComputed();}
});
document.querySelector('#caseSelect').addEventListener('change',event=>selectCase(Number(event.target.value)));
document.querySelector('#caseTabs').addEventListener('keydown',event=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;event.preventDefault();let index=state.current;if(event.key==='ArrowRight')index=(index+1)%CASES.length;if(event.key==='ArrowLeft')index=(index-1+CASES.length)%CASES.length;if(event.key==='Home')index=0;if(event.key==='End')index=CASES.length-1;selectCase(index,true);});
document.querySelector('#openSources').addEventListener('click',()=>document.querySelector('#sourceDialog').showModal());document.querySelector('#closeSources').addEventListener('click',()=>document.querySelector('#sourceDialog').close());
for(const id of ['sourceDialog','calcDialog','previewDialog'])document.querySelector(`#${id}`).addEventListener('click',event=>{if(event.target===event.currentTarget)event.currentTarget.close();});
const hashMatch=location.hash.match(/^#cas-([A-N])$/);if(hashMatch){const index=CASES.findIndex(c=>c.id===hashMatch[1]);if(index>=0)state.current=index;}
renderSources();renderAll();
