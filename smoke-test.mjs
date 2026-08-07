import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const read = (name) => readFile(path.join(root, name), 'utf8');
const [html, app, data, logic, store, components, transition, css, workflow, unit, e2e, pkg] = await Promise.all([
  read('index.html'), read('app.js'), read('data.js'), read('logic.js'), read('store.js'), read('components.js'), read('transition.js'), read('styles.css'),
  read('.github/workflows/quality.yml'), read('tests/unit.mjs'), read('tests/e2e.spec.mjs'), read('package.json')
]);

const checks=[];
function check(name, condition){assert.ok(condition,name);checks.push(name);}

// Build / storage
check('CSS v12 unique et cache-busté', (html.match(/rel="stylesheet"/g)||[]).length===1 && html.includes('styles.css?v=12.0.0'));
check('JS v12 unique et cache-busté', (html.match(/<script/g)||[]).length===1 && html.includes('app.js?v=12.0.0'));
check('package v12', pkg.includes('"version": "12.0.0"'));
check('stockage v120', store.includes("tva_tdfn_v120_state") && store.includes('STATE_VERSION = 120'));
check('migration v100 conservée', store.includes("tva_tdfn_v100_state") && store.includes("sourceKey === 'tva_tdfn_v100_state'"));
check('ancien J invalidé à la migration', store.includes('delete migrated.scores.J1'));
check('ancien K invalidé à la migration', store.includes('delete migrated.scores.K0'));
check('37 cas attendus', unit.includes("'J1','J2','J3'") && unit.includes('37 cas'));

// Pedagogy / information architecture
check('10 modules explicites', (app.match(/label: '\d+ ·/g)||[]).length===10);
check('admissibilité en premier', app.indexOf("ids: ['J1', 'J2', 'J3']") < app.indexOf("ids: ['A', 'B', 'C']"));
check('règle 10 % séparée', app.includes("label: '4 · Règle des 10 %'") && app.includes("ids: ['D4', 'E', 'F']"));
check('international séparé', app.includes("label: '5 · International et synthèse'") && app.includes("ids: ['G', 'H', 'I', 'D3']"));
check('parcours essentiel et avancé', app.includes('Parcours essentiel') && app.includes('Parcours avancé') && app.includes('Atelier autonome'));
check('M/N/P restent avancés', app.includes("ids: ['N', 'M', 'P']"));
check('objectifs, niveau et durée affichés', app.includes('Objectifs du module') && app.includes('module.level') && app.includes('module.duration'));
check('J découpé en trois micro-cas', data.includes('\"id\": \"J1\"') && data.includes('\"id\": \"J2\"') && data.includes('\"id\": \"J3\"'));
check('ancienne ancre J redirigée vers J1', app.includes("rawRequested==='J'?'J1'"));

// UX core
check('mission placée dans la zone de travail', app.includes('class="mission-banner"') && app.includes('Votre mission'));
check('données utiles visibles près de la mission', app.includes('Données utiles pour répondre') && app.includes('briefFactsMarkup'));
check('dossier complet reste secondaire', html.includes('Voir le dossier complet et les sources'));
check('réflexe TDFN compact en haut', html.includes('class="foundation-strip"') && html.includes('Réflexe TDFN'));
check('mémo TDFN en dialogue', html.includes('id="memoDialog"') && app.includes("openMemoInline"));
check('ancien gros bloc methodLimits supprimé', !html.includes('methodLimitsToggle') && !app.includes('setMethodLimitsExpanded'));
check('mode de travail non imposé à l’entrée', app.includes("switcher.classList.add('hidden')"));
check('workflow en verbes simples', app.includes("['1','Analyser']") && app.includes("['2','Calculer']") && app.includes("['3','Reporter']"));
check('checklist complète en second niveau', app.includes('Checklist complète') && components.includes('Afficher les'));
check('navigation par module et cas', components.includes('Changer de module') && components.includes('Cas ${position+1}/'));
check('titres de navigation raccourcis', app.includes("item.tab?.split('·').slice(1)"));
check('feedback erreurs en premier', app.includes('À corriger (') && app.includes('À revoir ('));
check('réponses correctes repliées', app.includes('Voir les réponses correctes') && app.includes('Voir les contrôles corrects'));
check('correction devient action principale si non maîtrisé', app.includes('Corriger mes réponses') && app.includes("action==='return-to-work'"));
check('solution assistée impose reprise sans aide', app.includes('Recommencer sans aide'));
check('quiz montre progression de réponse', app.includes('réponse(s) sélectionnée(s)'));
check('mobile garde mission/données dans le flux', e2e.includes("page.goto('/#cas-J1')") && e2e.includes(".mission-banner") && e2e.includes(".brief-data"));

// Legal safeguards
check('limites TDFN présentes', html.includes('CHF 5’024’000') && html.includes('CHF 108’000'));
check('décompte annuel distingué', html.includes('CHF 5’005’000') && data.includes('annual-reporting'));
check('maintien sur trois périodes fiscales', data.includes('trois périodes fiscales consécutives'));
check('ancienne règle +50 % signalée supprimée', data.includes('plus de 50 % a été supprimée'));
check('option TDFN juridiquement cadrée', data.includes('art. 77, al. 3, OTVA') && data.includes('art. 21, al. 2, ch. 26'));
check('M qualifie la reprise avant correction', data.includes('Procédure de déclaration — faut-il déterminer une correction ?'));
check('P enseigne le signe du ch.415', data.includes('Suite du cas M — reprise de patrimoine') && data.includes('"ch415": -2000'));
check('ch.415 négatif autorisé par la logique', logic.includes("key==='ch415'"));
check('articles transitions séparés', data.includes('art. 79 OTVA') && data.includes('art. 81 OTVA'));
check('Décompte TVA pro présent', html.includes('Décompte TVA pro') && data.includes('Décompte TVA pro'));

// UI / accessibility / maintainability
check('CSS v12 refactorisé', css.includes('UI refactor: one clear learning flow'));
check('seulement six media blocks', (css.match(/@media/g)||[]).length===6);
check('aucun ancien patch v11', !css.includes('v11.1 — parcours pédagogique'));
check('taille de texte minimale 13px', !/font-size\s*:\s*(?:[0-9]|1[0-2])px/.test(css) && !/font-size\s*:\s*(?:0?\.[0-7][0-9]*|0\.80[0-9]*)rem/.test(css));
check('cibles tactiles 44px prévues', css.includes('min-height:44px'));
check('états de progression explicitement stylés', css.includes('.status.mastered') && css.includes('.status.assisted'));
check('axe sans désactivation du contraste', e2e.includes('AxeBuilder') && !e2e.includes('color-contrast'));
check('tests memo et micro-cas', e2e.includes('mémo TDFN') && e2e.includes('J1–J3'));
check('tests D3/L5 maintenus', e2e.includes('#cas-D3') && e2e.includes('#cas-L5'));
check('test migration v120', e2e.includes('tva_tdfn_v120_state') && e2e.includes('persisted.version).toBe(120)'));
check('progression export/import conservée', app.includes('exportProgress') && app.includes('importProgressFile'));
check('aucun MutationObserver', !/MutationObserver/.test(app+components+transition));
check('un seul état localStorage hors store', !/localStorage\./.test(app));
check('tableaux ch.410/415 toujours évalués', transition.includes('correctFields') && transition.includes('eligibilityGood'));

for(const file of ['index.html','styles.css','data.js','logic.js','store.js','components.js','transition.js','app.js','package.json','playwright.config.mjs','tests/unit.mjs','tests/e2e.spec.mjs','.github/workflows/quality.yml']) await access(path.join(root,file));
check('fichiers production/qualité présents',true);
const staticIds=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
check('aucun id HTML statique dupliqué',new Set(staticIds).size===staticIds.length);
check('CI installe Playwright', workflow.includes('playwright install'));
check('script e2e présent', pkg.includes('npx playwright test'));

console.log(`Smoke test: OK — ${checks.length}/${checks.length} contrôles.`);
