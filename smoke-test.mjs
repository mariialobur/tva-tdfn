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
check('CSS v14 unique et cache-busté', (html.match(/rel="stylesheet"/g)||[]).length===1 && html.includes('styles.css?v=14.0.0'));
check('JS v14 unique et cache-busté', (html.match(/<script/g)||[]).length===1 && html.includes('app.js?v=14.0.0'));
check('package v14', pkg.includes('"version": "14.0.0"'));
check('stockage v140', store.includes("tva_tdfn_v140_state") && store.includes('STATE_VERSION = 140'));
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
check('scaffolding retiré en révision', app.includes('lessonExpanded=!state.ui?.reviewMode') && app.includes('Rappel théorie + exemple'));
check('onboarding première visite', html.includes('onboardingDialog') && html.includes('Comprendre') && html.includes('Voir un exemple') && html.includes('Appliquer') && html.includes('Justifier'));
check('pas de mur théorique global', !html.includes('foundation-strip'));
check('contraste détaillé non injecté avant les quiz', !app.includes('conceptualNote(c)') && app.indexOf("if(c.type==='quiz')") < app.indexOf("if(step===1) content=renderContrast(c)"));
check('compétence exacte seulement après validation', app.includes('Compétence consolidée') && app.includes('competenceConfirmedMarkup'));
check('feedback ne prétend pas consolider une compétence erronée', app.includes("mastered?'Compétence consolidée':'Compétence à consolider'") && app.includes("mastered?'Règle consolidée':'Règle à retenir'"));
check('contraste client/AFC sélectif', app.includes('SHOW_CONTRAST.has') && pedagogy.includes("new Set(['A','B','C','G','H','I','O'])"));

// Focus UX
check('un seul canvas de travail', html.includes('<article class="work-canvas">') && css.includes('v14.0 — Focus & Mastery'));
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
check('36 évalués + atelier libre explicités', app.includes('cas évalués + 1 atelier libre'));

// Sources juridiques et pratique AFC
check('37 bases légales déclarées', (legal.match(/^\w+\s*:\s*\{skill:/gm)||[]).length===37);
check('fondement / pratique séparés', app.includes('Fondement juridique') && app.includes('Pratique AFC'));
check('liens Fedlex vers articles', app.includes("#art_${match[1].toLowerCase()}") && app.includes("['ltva','otva']"));
check('source pratique 2025 dédiée', data.includes('info12-2025-practice') && data.includes('2.2.2–2.2.3 et 3.2.2–3.2.3'));
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
check('fin de module signalée', app.includes('Module terminé') && app.includes('moduleCompletionMarkup'));
check('base légale disponible après erreur', app.includes('Revoir la base légale ↑') && app.includes("action==='legal-basis'") && app.includes("document.querySelector('.case-sources-inline')?.scrollIntoView"));

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
