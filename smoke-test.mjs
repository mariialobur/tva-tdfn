import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const read = (name) => readFile(path.join(root, name), 'utf8');
const [html, app, data, pedagogy, legal, logic, store, components, transition, css, workflow, unit, e2e, pkg] = await Promise.all([
  read('index.html'), read('app.js'), read('data.js'), read('pedagogy.js'), read('legal-basis.js'), read('logic.js'), read('store.js'), read('components.js'), read('transition.js'), read('styles.css'),
  read('.github/workflows/quality.yml'), read('tests/unit.mjs'), read('tests/e2e.spec.mjs'), read('package.json')
]);

const checks=[];
function check(name, condition){assert.ok(condition,name);checks.push(name);}

// Build / storage
check('CSS v15 unique et cache-busté', (html.match(/rel="stylesheet"/g)||[]).length===1 && html.includes('styles.css?v=15.0.0'));
check('JS v15 unique et cache-busté', (html.match(/<script/g)||[]).length===1 && html.includes('app.js?v=15.0.0'));
check('package v15', pkg.includes('"version": "15.0.0"'));
check('stockage v150', store.includes("tva_tdfn_v150_state") && store.includes('STATE_VERSION = 150'));
check('migration v140 conservée', store.includes("tva_tdfn_v140_state") && store.includes('version: 140'));
check('migration v130 conservée', store.includes("tva_tdfn_v130_state") && store.includes('version: 130'));
check('migration v120 conservée', store.includes("tva_tdfn_v120_state") && store.includes('version: 120'));
check('37 cas attendus', unit.includes("'J1','J2','J3'") && unit.includes('37 cas'));

// Architecture pédagogique
check('10 modules explicites', (app.match(/label: '\d+ ·/g)||[]).length===10);
check('aucune durée estimée', !/duration\s*:/.test(app+pedagogy) && !/\bmin(?:ute)?s?\b/i.test(pedagogy));
check('admissibilité en premier', app.indexOf("ids: ['J1', 'J2', 'J3']") < app.indexOf("ids: ['A', 'B', 'C']"));
check('parcours essentiel / avancé / atelier', app.includes('Parcours essentiel') && app.includes('Parcours avancé') && app.includes('Atelier autonome'));
check('37 micro-leçons déclarées', (pedagogy.match(/^\s{2}\w+:\{difficulty:/gm)||[]).length===37);
check('37 pratiques AFC dédiées', (pedagogy.split('export const CASE_PRACTICE = {')[1]?.match(/^\s{2}\w+:\[/gm)||[]).length===37);
check('difficultés normalisées', pedagogy.includes("difficulty:'Débutant'") && pedagogy.includes("difficulty:'Intermédiaire'") && pedagogy.includes("difficulty:'Avancé'"));
check('micro-learning théorie puis exemple', app.includes('À comprendre') && app.includes('Exemple guidé') && app.includes('Apprenez une idée, puis appliquez-la immédiatement'));
check('scaffolding retiré en révision et validation', app.includes('!state.ui?.reviewMode&&!state.ui?.validationMode') && app.includes('Rappel théorie + exemple'));
check('onboarding première visite', html.includes('onboardingDialog') && html.includes('Comprendre') && html.includes('Voir un exemple') && html.includes('Appliquer') && html.includes('Justifier'));
check('pas de mur théorique global', !html.includes('foundation-strip'));
check('contraste détaillé non injecté avant les quiz', !app.includes('conceptualNote(c)') && app.indexOf("if(c.type==='quiz')") < app.indexOf("if(step===1) content=renderContrast(c)"));
check('distinction acquis / maîtrisé', app.includes('Compétence acquise') && app.includes('Compétence maîtrisée') && app.includes('competenceConfirmedMarkup'));
check('feedback distingue acquis, maîtrisé et à consolider', app.includes("status==='mastered'?'Compétence maîtrisée':status==='acquired'?'Compétence acquise':'Compétence à consolider'") && app.includes("mastered?'Règle maîtrisée':acquired?'Règle acquise':'Règle à retenir'"));
check('contraste client/AFC sélectif', app.includes('SHOW_CONTRAST.has') && pedagogy.includes("new Set(['A','B','C','G','H','I','O'])"));

// Focus UX
check('un seul canvas de travail', html.includes('<article class="work-canvas">') && css.includes('v15.0 — Acquis & Maîtrisé'));
check('CTA desktop après la zone de travail', html.indexOf('id="workArea"') < html.indexOf('id="desktopActionBar"'));
check('sidebar sans CTA principal', css.includes('.sidebar-actions{display:none!important}'));
check('mission = À vous', app.includes('À vous') && app.includes('Données du cas'));
check('dossier complet secondaire', app.includes('Dossier complet') && app.includes('sidebar-dossier-disclosure'));
check('pas de module-context par cas', html.includes('id="moduleIntroSlot" hidden') && app.includes("intro.innerHTML=''"));
check('workflow en verbes simples', app.includes("['1','Analyser']") && app.includes("['2','Calculer']") && app.includes("['3','Décompte']"));
check('public IDs pédagogiques', app.includes('displayCaseCode') && components.includes("statuses[id]?.code"));
check('quiz en une colonne', css.includes('.question-options{grid-template-columns:1fr!important'));
check('largeur de lecture limitée', css.includes('.work-canvas{max-width:980px'));
check('révision en file', app.includes('reviewQueue') && app.includes('Erreur suivante →') && app.includes('Mode révision'));
check('36 évalués + atelier libre séparé', app.includes('scoredCases') && data.includes('\"id\": \"Q\"') && data.includes('\"excludeFromProgress\": true'));
check('validation sans exemple en file', app.includes('validationQueue') && app.includes('Validation sans aide') && app.includes('Valider mes acquis sans aide'));

// Sources juridiques et pratique AFC
check('37 bases légales déclarées', (legal.match(/^\w+\s*:\s*\{skill:/gm)||[]).length===37);
check('fondement / pratique séparés', app.includes('Fondement juridique') && app.includes('Pratique AFC'));
check('liens Fedlex vers articles, y compris suffixes alphabétiques', app.includes("replace(/^(\\d+)([a-z]+)$/,'$1_$2')") && app.includes("#art_${article}") && app.includes("['ltva','otva']"));
check('source pratique 2025 dédiée', data.includes('info12-2025-practice') && data.includes('2.2.2–2.2.3 et 3.2.2–3.2.3'));
check('liens AFC directs 2.2.2 et 3.2.2', data.includes('componentId=1005202') && data.includes('componentId=1005237'));
check('transition effective→TDFN cite ch.2.2.2/2.2.3', pedagogy.includes('ch. 2.2.2') && pedagogy.includes('ch. 2.2.3'));
check('transition TDFN→effective cite ch.3.2.2/3.2.3', pedagogy.includes('ch. 3.2.2') && pedagogy.includes('ch. 3.2.3'));
check('procédure de déclaration cite ch.4.1', pedagogy.includes('ch. 4.1'));
check('K précise art.69/70 OTVA', legal.includes('art. 69, al. 1–3, OTVA') && legal.includes('art. 70 OTVA'));
check('L précise art.72/73/74 OTVA', legal.includes('art. 72, al. 1–3, OTVA') && legal.includes('art. 73 OTVA') && legal.includes('art. 74 OTVA'));
check('limites TDFN présentes', html.includes('CHF 5’024’000') && html.includes('CHF 108’000'));
check('décompte annuel distingué', html.includes('CHF 5’005’000') && data.includes('annual-reporting'));
check('option TDFN complète', data.includes('ch. 25, 26, 28 et 28bis') && legal.includes('ch. 25, 26, 28 et 28bis'));
check('M qualifie avant correction', data.includes('Procédure de déclaration — faut-il déterminer une correction ?'));
check('P signe négatif ch.415', data.includes('Suite du cas M — reprise de patrimoine') && data.includes('"ch415": -2000'));
check('Décompte TVA pro présent', html.includes('Décompte TVA pro') && data.includes('Décompte TVA pro'));

// Feedback et maîtrise
check('feedback erreurs en premier', app.includes('À corriger (') && app.includes('À revoir ('));
check('réponses correctes repliées', app.includes('Voir les réponses correctes') && app.includes('Voir les contrôles corrects'));
check('correction devient action principale', app.includes('Corriger mes réponses'));
check('solution consultée impose reprise', app.includes('Recommencer sans aide') && app.includes('solution consultée'));
check('fin de module distingue acquis / maîtrisé', app.includes('Module acquis') && app.includes('Module maîtrisé') && app.includes('moduleCompletionMarkup'));
check('base légale disponible après erreur', app.includes('Revoir la base légale ↑') && app.includes("action==='legal-basis'") && app.includes("document.querySelector('.case-sources-inline')?.scrollIntoView"));

// Invariants juridiques sémantiques
check('D2 cumule les activités au même TDFN pour la règle des 10 %', data.includes('Pension + toilettage: CHF 60’000 + CHF 40’000 = CHF 100’000.') && data.includes('même TDFN de 5,3 %'));
check('D2 ne contient plus la règle erronée par activité', !data.includes('Le seuil se contrôle par activité.') && !data.includes('La règle des 10 % s’apprécie par activité concernée'));
check('D2 conserve la traçabilité comptable distincte', data.includes('Conservez les quatre flux comptables distincts'));
check('leçon I enseigne le principe et non le résultat du cas', data.includes('L’achat étranger n’est pas du chiffre d’affaires de l’entreprise') && !data.includes('Le total du ch. 399 et du ch. 500 est CHF 8’250'));
check('D4 exemple guidé différent du cas évalué', pedagogy.includes('CHF 24’500 = 9,8 %') && pedagogy.includes('CHF 25’500 = 10,2 %'));
check('sources juridiques compactées', app.includes('source-more') && app.includes("compactRefs(lawRefs,'law',2)") && app.includes("compactRefs(practiceRefs,'practice',1)"));

// UI / accessibility / maintainability
check('aucun texte écran explicitement sous 13px', !/font-size\s*:\s*(?:[0-9]|1[0-2])px/.test(css) && !/font-size\s*:\s*(?:0?\.[0-7][0-9]*|0\.80[0-9]*)rem/.test(css));
check('cibles tactiles 44px prévues', css.includes('min-height:44px'));
check('axe sans désactivation du contraste', e2e.includes('AxeBuilder') && !e2e.includes('color-contrast'));
check('tests D3/L5 maintenus', e2e.includes('#cas-D3') && e2e.includes('#cas-L5'));
check('progression export/import conservée', app.includes('exportProgress') && app.includes('importProgressFile'));
check('aucun MutationObserver', !/MutationObserver/.test(app+components+transition));
check('un seul accès localStorage hors store', !/localStorage\./.test(app));
check('tableaux ch.410/415 toujours évalués', transition.includes('correctFields') && transition.includes('eligibilityGood'));

for(const file of ['index.html','styles.css','data.js','pedagogy.js','legal-basis.js','logic.js','store.js','components.js','transition.js','app.js','package.json','playwright.config.mjs','tests/unit.mjs','tests/e2e.spec.mjs','.github/workflows/quality.yml']) await access(path.join(root,file));
check('fichiers production/qualité présents',true);
const staticIds=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
check('aucun id HTML statique dupliqué',new Set(staticIds).size===staticIds.length);
check('CI installe Playwright', workflow.includes('playwright install'));
check('script e2e présent', pkg.includes('npx playwright test'));

console.log(`Smoke test: OK — ${checks.length}/${checks.length} contrôles.`);
