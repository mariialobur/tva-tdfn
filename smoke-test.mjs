import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const read = (name) => readFile(path.join(root, name), 'utf8');
const [html, app, data, legal, logic, store, components, transition, css, workflow, unit, e2e, pkg] = await Promise.all([
  read('index.html'), read('app.js'), read('data.js'), read('legal-basis.js'), read('logic.js'), read('store.js'), read('components.js'), read('transition.js'), read('styles.css'),
  read('.github/workflows/quality.yml'), read('tests/unit.mjs'), read('tests/e2e.spec.mjs'), read('package.json')
]);

const checks=[];
function check(name, condition){assert.ok(condition,name);checks.push(name);}

// Build / storage
check('CSS v13 unique et cache-busté', (html.match(/rel="stylesheet"/g)||[]).length===1 && html.includes('styles.css?v=13.0.0'));
check('JS v13 unique et cache-busté', (html.match(/<script/g)||[]).length===1 && html.includes('app.js?v=13.0.0'));
check('package v13', pkg.includes('"version": "13.0.0"'));
check('stockage v130', store.includes("tva_tdfn_v130_state") && store.includes('STATE_VERSION = 130'));
check('migration v120 conservée', store.includes("tva_tdfn_v120_state") && store.includes("version: 120"));
check('migration v100 conservée', store.includes("tva_tdfn_v100_state") && store.includes("sourceKey === 'tva_tdfn_v100_state'"));
check('37 cas attendus', unit.includes("'J1','J2','J3'") && unit.includes('37 cas'));

// Information architecture
check('10 modules explicites', (app.match(/label: '\d+ ·/g)||[]).length===10);
check('aucune durée estimée dans les modules', !/duration\s*:/.test(app) && !/module\.duration/.test(app));
check('admissibilité en premier', app.indexOf("ids: ['J1', 'J2', 'J3']") < app.indexOf("ids: ['A', 'B', 'C']"));
check('règle 10 % séparée', app.includes("label: '4 · Règle des 10 %'") && app.includes("ids: ['D4', 'E', 'F']"));
check('parcours essentiel et avancé', app.includes('Parcours essentiel') && app.includes('Parcours avancé') && app.includes('Atelier autonome'));
check('procédures particulières avancées', app.includes("ids: ['N', 'M', 'P']"));
check('J découpé en trois micro-cas', data.includes('"id": "J1"') && data.includes('"id": "J2"') && data.includes('"id": "J3"'));
check('ancienne ancre J redirigée vers J1', app.includes("rawRequested==='J'?'J1'"));

// Mission-first UX
check('mission près du haut du workspace', html.indexOf('caseBriefSlot') < html.indexOf('moduleIntroSlot'));
check('données utiles visibles avec la mission', app.includes('Données utiles') && app.includes('briefFactsMarkup'));
check('base légale intégrée à la mission', app.includes('Compétence travaillée') && app.includes('Base légale') && app.includes('legalAnchorMarkup'));
check('références légales en disclosure progressive', app.includes('Pourquoi ces références?'));
check('dossier desktop replié par défaut', app.includes('sidebar-dossier-disclosure') && app.includes('Dossier complet et sources'));
check('dossier mobile reste secondaire', html.includes('Voir le dossier complet et les sources'));
check('ancien bandeau théorique global supprimé', !html.includes('foundation-strip'));
check('mémo TDFN en dialogue', html.includes('id="memoDialog"') && app.includes('openMemoInline'));
check('workflow en verbes simples', app.includes("['1','Analyser']") && app.includes("['2','Calculer']") && app.includes("['3','Décompte']"));
check('transfert au décompte explicite', app.includes('Transférer au décompte') && !app.includes('Reporter au décompte'));
check('checklist complète en second niveau', app.includes('Checklist du dossier') && components.includes('Afficher les'));
check('feedback erreurs en premier', app.includes('À corriger (') && app.includes('À revoir ('));
check('réponses correctes repliées', app.includes('Voir les réponses correctes') && app.includes('Voir les contrôles corrects'));
check('correction devient action principale', app.includes('Corriger mes réponses') && app.includes("action==='return-to-work'"));
check('solution consultée impose reprise sans aide', app.includes('Recommencer sans aide') && app.includes('solution consultée'));
check('fin de module explicitement signalée', app.includes('Module terminé') && app.includes('moduleCompletionMarkup'));
check('révision des erreurs disponible', app.includes('Revoir mes erreurs') && app.includes('reviewErrors'));
check('termes convenues/reçues expliqués', html.includes('factures émises') && html.includes('encaissements'));
check('abréviation ch. expliquée', html.includes('<strong>ch.</strong> signifie «chiffre»') && html.includes('rubrique du décompte AFC'));

// Legal anchoring
check('37 bases légales déclarées', (legal.match(/^\w+\s*:\s*\{skill:/gm)||[]).length===37);
check('chaque base contient des références', legal.includes('refs:[') && legal.includes('sourceId:'));
check('liens pointent vers les sources officielles', app.includes('sourceById(ref.sourceId)'));
check('limites TDFN présentes', html.includes('CHF 5’024’000') && html.includes('CHF 108’000'));
check('décompte annuel distingué', html.includes('CHF 5’005’000') && data.includes('annual-reporting'));
check('maintien sur trois périodes fiscales', data.includes('trois périodes fiscales consécutives'));
check('ancienne règle +50 % signalée supprimée', data.includes('plus de 50 % a été supprimée'));
check('option TDFN cite toutes les exceptions actuelles', data.includes('ch. 25, 26, 28 et 28bis') && legal.includes('ch. 25, 26, 28 et 28bis'));
check('M qualifie la reprise avant correction', data.includes('Procédure de déclaration — faut-il déterminer une correction ?'));
check('P enseigne le signe du ch.415', data.includes('Suite du cas M — reprise de patrimoine') && data.includes('"ch415": -2000'));
check('ch.415 négatif autorisé par la logique', logic.includes("key==='ch415'"));
check('Décompte TVA pro présent', html.includes('Décompte TVA pro') && data.includes('Décompte TVA pro'));

// UI / accessibility / maintainability
check('CSS v13 mission-first', css.includes('Mission-first UI'));
check('seulement six media blocks', (css.match(/@media/g)||[]).length===6);
check('dossier desktop progressif stylé', css.includes('.sidebar-dossier-disclosure'));
check('aucun texte écran explicitement sous 13px', !/font-size\s*:\s*(?:[0-9]|1[0-2])px/.test(css) && !/font-size\s*:\s*(?:0?\.[0-7][0-9]*|0\.80[0-9]*)rem/.test(css));
check('cibles tactiles 44px prévues', css.includes('min-height:44px'));
check('états de progression explicites', css.includes('.status.mastered') && css.includes('.status.assisted') && css.includes('.status.partial'));
check('axe sans désactivation du contraste', e2e.includes('AxeBuilder') && !e2e.includes('color-contrast'));
check('tests D3/L5 maintenus', e2e.includes('#cas-D3') && e2e.includes('#cas-L5'));
check('progression export/import conservée', app.includes('exportProgress') && app.includes('importProgressFile'));
check('aucun MutationObserver', !/MutationObserver/.test(app+components+transition));
check('un seul accès localStorage hors store', !/localStorage\./.test(app));
check('tableaux ch.410/415 toujours évalués', transition.includes('correctFields') && transition.includes('eligibilityGood'));

for(const file of ['index.html','styles.css','data.js','legal-basis.js','logic.js','store.js','components.js','transition.js','app.js','package.json','playwright.config.mjs','tests/unit.mjs','tests/e2e.spec.mjs','.github/workflows/quality.yml']) await access(path.join(root,file));
check('fichiers production/qualité présents',true);
const staticIds=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
check('aucun id HTML statique dupliqué',new Set(staticIds).size===staticIds.length);
check('CI installe Playwright', workflow.includes('playwright install'));
check('script e2e présent', pkg.includes('npx playwright test'));

console.log(`Smoke test: OK — ${checks.length}/${checks.length} contrôles.`);
