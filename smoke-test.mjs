import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const read = (name) => readFile(path.join(root, name), 'utf8');
const [html, app, data, logic, store, components, transition, css, workflow, unit, e2e] = await Promise.all([
  read('index.html'), read('app.js'), read('data.js'), read('logic.js'), read('store.js'), read('components.js'), read('transition.js'), read('styles.css'),
  read('.github/workflows/quality.yml'), read('tests/unit.mjs'), read('tests/e2e.spec.mjs')
]);

const checks = [];
function check(name, condition) { assert.ok(condition, name); checks.push(name); }

check('index charge un seul CSS intégré v11', (html.match(/rel="stylesheet"/g) || []).length === 1 && html.includes('styles.css?v=11.0.0'));
check('index charge un seul module applicatif v11', (html.match(/<script/g) || []).length === 1 && html.includes('app.js?v=11.0.0'));
check('anciens patchs absents de l’index', !/v7-enhancements|v8(?:\.\d+)?-learning-path|ui-fixes\.js/.test(html));
check('footer public sans numéro de version technique', html.includes('Mise à jour : 07.08.2026') && !html.includes('version intégrée'));
check('stockage unifié v100', store.includes("tva_tdfn_v100_state") && store.includes('STATE_VERSION = 100') && store.includes('worksheets') && store.includes('precheck'));
check('migration v90/v84/v63/v61 prévue', ['tva_tdfn_v90_state','tva_tdfn_v84_transition_worksheets','tva_tdfn_v63_state','tva_tdfn_v61_state'].every((value) => store.includes(value)));
check('ancien score K invalidé', store.includes('delete migrated.scores.K0'));
check('données intégrées sans mutation de CASES', data.includes('export const CASES') && !data.includes('CASES.push'));
check('35 cas intégrés', unit.includes("expectedIds = ['A','B','C','D','D1'"));
check('cas D1–D4 intégrés', ['D1','D2','D3','D4'].every((id) => data.includes(`"id": "${id}"`)));
check('cas L1–L7 intégrés', ['L1','L2','L3','L4','L5','L6','L7'].every((id) => data.includes(`"id": "${id}"`)));
check('cas sportifs corrigés 2,1 / 3,0 / 5,3', /"rate": 2\.1/.test(data) && /"rate": 3(?:\.0)?[,\n]/.test(data) && /"rate": 5\.3/.test(data));
check('art. 81 OTVA actuel: trois périodes fiscales consécutives', data.includes('trois périodes fiscales consécutives') && data.includes('règle spéciale liée à un dépassement de plus de 50 % a été supprimée') && !data.includes('Un dépassement de plus de 50 % d’une seule limite pendant une période fiscale suffit'));
check('admissibilité art. 77 et seuil annuel distincts', data.includes('art. 77 OTVA') && data.includes('CHF 5’005’000'));
check('références de transition précisées', data.includes('art. 79 OTVA') && data.includes('art. 81 OTVA'));
check('anciens sélecteurs de patch absents du CSS', !/(?:\.v7\d*[-_]|\.v8\d*[-_]|#v8\d*)/.test(css));
check('tableaux ch. 410 avec part ouvrant droit', transition.includes('eligibilityGood') && components.includes('Part ouvrant droit'));
check('terminologie ch. 410/ch. 415 distincte', components.includes('Tableau de dégrèvement ultérieur') && components.includes('Tableau de correction de la valeur résiduelle'));
check('documents du dossier affichables', components.includes('transition-documents') && data.includes('"documents"'));
check('tableau évalué avec le quiz', app.includes('validateWorksheet') && app.includes('correctQuestions+worksheet.correct'));
check('solution remplit tous les facteurs', transition.includes('eligibility: String(line.expectedEligibility)'));
check('un seul état dans app', !/localStorage\./.test(app) && app.includes('stateKey'));
check('aucun MutationObserver', !/MutationObserver/.test(app + components + transition));
check('navigation complète D1–D4 et L1–L7', app.includes("['D', 'D1', 'D2', 'D4', 'E', 'F', 'D3']") && app.includes("['L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7']"));
check('action principale visible dans la barre latérale', app.includes('id=\"sidebarActionBar\"') && app.includes("['mobileActionBar','desktopActionBar','sidebarActionBar']"));
check('sources et contrôle préalable disponibles dans la barre latérale', app.includes('data-action=\"open-precheck\"') && app.includes('data-action=\"open-sources\"'));
check('parcours essentiel et avancé explicitement séparés', app.includes('Parcours essentiel') && app.includes('Parcours avancé') && app.includes('Atelier autonome'));
check('objectifs, durée et niveau affichés par module', app.includes('moduleIntroSlot') && app.includes('Ce que vous saurez faire') && app.includes('module.duration') && app.includes('module.level'));
check('admissibilité placée en premier dans le parcours', app.indexOf("ids: ['J']") < app.indexOf("ids: ['A', 'B', 'C']"));
check('feedback QCM montre choix et réponse attendue', app.includes('Votre choix:') && app.includes('Réponse attendue:'));
check('précontrôle prioritaire masque les vérifications secondaires', components.includes('À vérifier en priorité pour ce cas') && components.includes('precheck-secondary'));
check('explication du taux moyen ajoutée', data.includes('2,92 %') && data.includes('pas un TDFN à appliquer'));
check('ch. 415 cadré avec le signe fiscal du dossier', data.includes('procédure de déclaration') && data.includes('art. 38 LTVA') && data.includes('ch415": -2000') && logic.includes("key==='ch415'"));
check('styles v11 améliorent lisibilité et cibles tactiles', css.includes('v11.0 — parcours pédagogique') && css.includes('font-size:max(.82rem,13px)') && css.includes('min-height:44px'));
check('ancien lien K normalisé', app.includes("rawRequested==='K'?'K0'"));
check('bloc limites accessible dans le flux', html.includes('id="methodLimitsToggle"') && html.includes('aria-controls="methodLimitsDetails"') && html.includes('id="methodLimitsDetails" hidden'));
check('rectification et Décompte TVA pro présents', data.includes('Décompte de rectification TVA') && html.includes('Décompte TVA pro'));
check('Playwright configuré avec npx', (await read('package.json')).includes('npx playwright test') && workflow.includes('playwright install'));
check('axe présent dans les tests', e2e.includes('AxeBuilder'));
check('tests D3, L5 et migration v100 présents', e2e.includes("#cas-D3") && e2e.includes("#cas-L5") && e2e.includes('tva_tdfn_v100_state'));
check('limite du décompte annuel distinguée des limites TDFN', html.includes('CHF 5’005’000') && data.includes('annual-reporting'));
check('sauvegarde export/import disponible', app.includes('exportProgress') && app.includes('importProgressFile') && store.includes('exportStateSnapshot') && store.includes('importStateSnapshot'));
check('navigation sans boucle et boutons désactivables', app.includes('target < 0 || target >= order.length') && app.includes('updateNavigationAvailability'));
check('tableau de transition noté par champ', transition.includes('correctFields') && transition.includes('totalFields'));
check('styles du troisième facteur présents', css.includes('.transition-table.has-eligibility') && css.includes('.transition-formula'));

for (const file of ['index.html','styles.css','data.js','logic.js','store.js','components.js','transition.js','app.js','package.json','playwright.config.mjs','tests/unit.mjs','tests/e2e.spec.mjs','.github/workflows/quality.yml']) {
  await access(path.join(root, file));
}
check('fichiers de production et qualité présents', true);

const staticIds = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
check('aucun id HTML statique dupliqué', new Set(staticIds).size === staticIds.length);

console.log(`Smoke test: OK — ${checks.length}/${checks.length} contrôles.`);
