import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = path.dirname(new URL(import.meta.url).pathname);
const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');
const html = read('index.html');
const js = read('v8.1-learning-path.js');
const css = read('v8.1-learning-path.css');

const tests = [];
const test = (name, condition) => tests.push({ name, ok: Boolean(condition) });

for (const name of ['index.html', 'v8.1-learning-path.js', 'v8.1-learning-path.css', 'INSTALLATION-RU.md', 'AUDIT-UPDATE-RU.md']) {
  test(`Fichier présent: ${name}`, fs.existsSync(path.join(root, name)));
}

try {
  execFileSync(process.execPath, ['--check', path.join(root, 'v8.1-learning-path.js')], { stdio: 'pipe' });
  test('Syntaxe JavaScript valide', true);
} catch {
  test('Syntaxe JavaScript valide', false);
}

test('Index charge le CSS 8.1', html.includes('v8.1-learning-path.css?v=2026.08.06.81'));
test('Index charge le JS 8.1', html.includes('v8.1-learning-path.js?v=2026.08.06.81'));
test('Ancien fichier v8 non chargé', !html.includes('v8-learning-path.js') && !html.includes('v8-learning-path.css'));
test('Version pédagogique visible', html.includes('version pédagogique 8.1'));

test('K0 à K5 présents', ['K0','K1','K2','K3','K4','K5'].every((id) => js.includes(`publicId: '${id}'`) || js.includes(`'${id}'`)));
test('L0 présent', js.includes("publicId: 'L0'"));
test('Cas R présent', js.includes("publicId: 'R'"));
test('Liens historiques L à Q non renommés', !js.includes('const publicRelabel') && !js.includes("L: 'M'") && !js.includes("Q: 'S'"));
test('Seul ancien #cas-K redirige vers K0', /const LEGACY_PUBLIC_HASHES = \{\s*K: 'K0'\s*\}/m.test(js));
test('Module des cas historiques conserve L à Q', js.includes("ids: ['L', 'M', 'N', 'O', 'P', 'R']") && js.includes("ids: ['Q']"));

test('Tableaux interactifs de transition présents', js.includes('const TRANSITION_WORKSHEETS = {') && js.includes('data-v81-transition-sheet'));
test('Tableaux couvrent K1 à K5 et L0', ['K1','K2','K3','K4','K5','L0'].every((id) => new RegExp(`\\b${id}: \\{`).test(js)));
test('Validation du tableau bloque un score quiz trompeur', js.includes("dataset.action === 'validate'") && js.includes('validateTransitionWorksheet'));
test('Solution remplit aussi le tableau', js.includes('fillTransitionWorksheetSolution'));
test('Réinitialisation efface aussi le tableau', js.includes('clearTransitionWorksheet'));
test('État des tableaux stocké séparément', js.includes('tva_tdfn_v81_transition_worksheets'));
test('Hypothèse convenues/reçues explicitée', js.includes('les débiteurs et créanciers ne sont pas corrigés dans ces sous-cas'));

test('Navigation par module et liste locale', js.includes('id="v81ModuleSelect"') && js.includes('data-v81-case-list') && js.includes('data-v81-case-index'));
test('Ancien sélecteur miroir supprimé du JS', !js.includes('v8CaseSelect'));
test('Aucun MutationObserver de patch susceptible de boucler', !js.includes('new MutationObserver'));

test('Typographie secondaire desktop au moins 0.76rem', css.includes('.v8-navigation-sidebar .data-note{font-size:.76rem'));
test('Navigation latérale sans scroll principal imbriqué', css.includes('.v8-navigation-sidebar{\n    position:relative;') && css.includes('max-height:none') && css.includes('overflow:visible'));
test('Liste locale de cas stylée', css.includes('.v81-case-link'));
test('Tableau transition responsive', css.includes('.v81-transition-row') && css.includes('@media (max-width:560px)'));
test('Compact limits autorise le panneau déroulant', css.includes('.method-limits.is-compact{\n    position:relative;\n    overflow:visible;'));

test('Montants K2 corrects', js.includes('expectedResidual: 60, expectedCorrection: 486'));
test('Montants K3 corrects', js.includes('expectedCorrection: 3240') && js.includes('total: 6480'));
test('Montant K4 correct', js.includes('total: 1296'));
test('Montant K5 correct', js.includes('total: 4860'));
test('Destination K = ch. 415 dernier effective', js.includes('Dernier décompte selon la méthode effective · ch. 415'));
test('Destination L0 = ch. 410 premier effective', js.includes('Premier décompte selon la méthode effective · ch. 410'));

test('Aucun ID HTML statique dupliqué', (() => {
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  return new Set(ids).size === ids.length;
})());

const failed = tests.filter((item) => !item.ok);
for (const item of tests) console.log(`${item.ok ? '✓' : '✗'} ${item.name}`);
console.log(`\n${tests.length - failed.length}/${tests.length} contrôles réussis.`);
if (failed.length) process.exit(1);
