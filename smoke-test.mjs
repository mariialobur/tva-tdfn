import fs from 'node:fs';

const html = fs.readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const js = fs.readFileSync(new URL('./v7-enhancements.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('./v7-enhancements.css', import.meta.url), 'utf8');

const checks = [
  ['HTML charge le correctif JS 7.4', html.includes('v7-enhancements.js?v=2026.08.03.4')],
  ['HTML charge le correctif CSS 7.4', html.includes('v7-enhancements.css?v=2026.08.03.4')],
  ['Les deux limites restent visibles dans le résumé', html.includes('CHF 5’024’000') && html.includes('CHF 108’000')],
  ['Le résumé des limites reste sémantiquement simple', html.includes('<summary>\n      <span>Comprendre l’admissibilité') && !html.includes('<summary>\n      <div class="method-limits__summary-head"')],
  ['Période fiscale et période de décompte sont distinguées', html.includes('trois <em>périodes fiscales</em>') && html.includes('et non trois périodes de décompte')],
  ['Aucune ancienne règle de dépassement à 50 % ne subsiste', !html.includes('Dépassement de plus de 50 %') && !js.includes('Dépassement de plus de 50 %')],
  ['Le cas J sépare admissibilité initiale et maintien', js.includes('Deux analyses distinctes') && js.includes('Ne transposez pas la règle des trois périodes fiscales')],
  ['Les taux supplémentaires 2025 sont correctement nuancés', html.includes('sous réserve du contrôle ultérieur de l’AFC') && js.includes('déclaré directement dans le décompte')],
  ['Le cas de rectification est ajouté', js.includes("publicId: 'R'") && js.includes("tab: 'R · Rectification'")],
  ['L’intérêt moratoire est formulé comme dû en cas de retard', js.includes('En cas de paiement tardif, l’intérêt moratoire est dû')],
  ['Le cas R affiche un plan d’action avec les rubriques affectées', js.includes('Plan d’action pour corriger le S1 2026') && js.includes('ch. 323 et 399')],
  ['Le contrôle préalable utilise un label associé', js.includes('label.htmlFor = inputId')],
  ['Les panneaux de détail exposent leur région accessible', js.includes("body.setAttribute('role', 'region')") && js.includes("body.setAttribute('aria-labelledby', toggleId)")],
  ['Les commandes Tout ouvrir / Tout fermer sont présentes', js.includes('data-v73-precheck-all="open"') && js.includes('toggleAllPrechecks')],
  ['Les priorités du cas sont explicites', js.includes('CASE_PRECHECK_PRIORITIES') && js.includes('Priorité du cas')],
  ['Le checkbox n’est pas placé dans un summary', !js.includes("document.createElement('summary')")],
  ['Le CTA précise le caractère pédagogique', js.includes('Voir la vue pédagogique AFC') && js.includes("'Vue pédagogique' : 'Voir la vue pédagogique AFC'")],
  ['Les termes ambigus du prototype sont normalisés', js.includes("heading.textContent = 'Traitement dans le décompte'") && js.includes('La vue pédagogique complète reste disponible séparément.')],
  ['Le taux moyen est renommé en indicateur pédagogique', js.includes('normalizeAggregateRateTerminology') && js.includes('Taux effectif résultant — indicateur pédagogique') && js.includes('il ne constitue ni un TDFN autorisé')],
  ['Le rendu dynamique du calcul est observé', js.includes("document.querySelector('#workArea')") && js.includes('new MutationObserver(queueEnhancements).observe(workArea')],
  ['Le délai de changement n’est plus affirmé sans renvoi à la règle applicable', html.includes('vérifier le délai concret dans l’Info TVA 12') && !html.includes('au plus tard 60 jours après le début de la période fiscale concernée')],
  ['Les styles du plan de rectification sont présents', css.includes('.v73-rectification-workflow')],
  ['Les styles mobiles sont présents', css.includes('@media (max-width: 680px)')]
];

let failed = 0;
for (const [label, ok] of checks) {
  console.log(`${ok ? '✓' : '✕'} ${label}`);
  if (!ok) failed += 1;
}
if (failed) process.exit(1);
console.log(`\n${checks.length} contrôles statiques réussis.`);
