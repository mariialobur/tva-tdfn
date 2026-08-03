import fs from 'node:fs';

const html = fs.readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const js = fs.readFileSync(new URL('./v7-enhancements.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('./v7-enhancements.css', import.meta.url), 'utf8');

const checks = [
  ['HTML charge le correctif JS 7.2', html.includes('v7-enhancements.js?v=2026.08.03.2')],
  ['HTML charge le correctif CSS 7.2', html.includes('v7-enhancements.css?v=2026.08.03.2')],
  ['Les deux limites restent visibles dans le résumé', html.includes('CHF 5’024’000') && html.includes('CHF 108’000')],
  ['Le summary des limites reste sémantiquement simple', html.includes('<summary>\n      <span>Comprendre l’admissibilité') && !html.includes('<summary>\n      <div class="method-limits__summary-head"')],
  ['La règle actuelle des trois périodes consécutives est explicitée', html.includes('trois périodes fiscales consécutives') && !html.includes('Dépassement de plus de 50 %')],
  ['Le cas de rectification est ajouté', js.includes("publicId: 'R'") && js.includes("tab: 'R · Rectification'")],
  ['Le cas J est enrichi avec les conséquences du dépassement', js.includes('durant trois périodes fiscales consécutives')],
  ['Le contrôle préalable utilise un label associé', js.includes("label.htmlFor = inputId")],
  ['Le checkbox n’est pas placé dans un summary', !js.includes("document.createElement('summary')")],
  ['Le CTA précise le caractère pédagogique', js.includes('Voir la vue pédagogique AFC')],
  ['Les styles mobiles sont présents', css.includes('@media (max-width: 680px)')]
];

let failed = 0;
for (const [label, ok] of checks) {
  console.log(`${ok ? '✓' : '✕'} ${label}`);
  if (!ok) failed += 1;
}
if (failed) process.exit(1);
console.log(`\n${checks.length} contrôles statiques réussis.`);
