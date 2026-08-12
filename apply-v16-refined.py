from pathlib import Path
import shutil
import sys
from datetime import datetime

ROOT = Path.cwd()
INDEX = ROOT / 'index.html'
APP = ROOT / 'app.js'
STYLES = ROOT / 'styles.css'

for path in (INDEX, APP, STYLES):
    if not path.exists():
        raise SystemExit(f'ERREUR: {path.name} introuvable. Lancez ce script depuis la racine du dépôt tva-tdfn.')


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise RuntimeError(f'{label}: motif attendu 1 fois, trouvé {count}. Aucun fichier n’a été enregistré.')
    return text.replace(old, new, 1)

index = INDEX.read_text(encoding='utf-8')
app = APP.read_text(encoding='utf-8')
styles = STYLES.read_text(encoding='utf-8')

if 'v16-refined-core' in index or 'MODULE_INTRO_RULES_V16' in app:
    raise SystemExit('Cette version v16 refined semble déjà installée. Aucun changement effectué.')

# ---------------- index.html ----------------
index = replace_once(index, 'styles.css?v=15.0.0', 'styles.css?v=16.0.0', 'Version CSS')
index = replace_once(index, 'app.js?v=15.0.0', 'app.js?v=16.0.0', 'Version JS')

old_progress = '<button class="progress progress-button" type="button" data-action="summary" aria-label="Ouvrir le bilan du parcours">'
new_progress = '<button class="progress progress-button" type="button" data-action="summary" aria-label="Ouvrir le bilan du parcours" title="Acquis = réussi après apprentissage · Maîtrisé = revalidé sans exemple" aria-description="Acquis signifie réussi après apprentissage. Maîtrisé signifie revalidé ensuite sans exemple.">'
index = replace_once(index, old_progress, new_progress, 'Aide progression')

old_slots = '''      <div id="learningSlot"></div>\n      <div id="caseBriefSlot"></div>\n      <div id="stepperSlot"></div>\n      <div id="moduleIntroSlot" hidden></div>'''
new_slots = '''      <div id="moduleIntroSlot" hidden></div>\n      <div id="learningSlot"></div>\n      <div id="caseBriefSlot"></div>\n      <div id="stepperSlot"></div>'''
index = replace_once(index, old_slots, new_slots, 'Ordre du contexte de module')

old_footer = '<span>Mise à jour : 10.08.2026 · sources revues le 10.08.2026.</span>'
new_footer = '<span>Mise à jour : 12.08.2026 · sources principales revues le 12.08.2026.</span>'
index = replace_once(index, old_footer, new_footer, 'Date de mise à jour')

old_onboarding = '''    <div><p class="eyebrow">Avant de commencer</p><h2 id="onboardingTitle">Comment apprendre avec ce simulateur</h2></div>\n  </div>\n  <div class="onboarding-content">\n    <p class="onboarding-lead">La théorie générale ne suffit pas pour préparer un décompte. Ici, chaque cas ajoute une règle opérationnelle et vous la fait appliquer immédiatement.</p>\n    <div class="onboarding-flow">\n      <div><b>1</b><strong>Comprendre</strong><span>Une règle courte, sans chapitre inutile.</span></div>\n      <div><b>2</b><strong>Voir un exemple</strong><span>Un exemple guidé sur d’autres données.</span></div>\n      <div><b>3</b><strong>Appliquer</strong><span>Vous résolvez ensuite le dossier du cas.</span></div>\n      <div><b>4</b><strong>Justifier</strong><span>La norme LTVA/OTVA et la pratique AFC restent accessibles.</span></div>\n    </div>\n    <div class="onboarding-principle"><strong>Réflexe TDFN de base</strong><span>Facture client: taux légal → Décompte AFC: chiffre d’affaires brut TTC × TDFN confirmé.</span></div>\n    <button class="btn primary onboarding-start" type="button" data-action="close-onboarding">Commencer le parcours</button>'''
new_onboarding = '''    <div><p class="eyebrow">Avant de commencer</p><h2 id="onboardingTitle">Le réflexe TDFN en 3 étapes</h2></div>\n  </div>\n  <div class="onboarding-content">\n    <p class="onboarding-lead">Trois repères suffisent avant le premier cas. Les règles plus techniques seront introduites seulement au moment où elles deviennent utiles.</p>\n    <div class="onboarding-flow onboarding-flow--tdfn">\n      <div><b>1</b><strong>Facture client</strong><span>Appliquer le taux légal TVA correspondant à la prestation.</span></div>\n      <div><b>2</b><strong>Décompte AFC</strong><span>Calculer la dette sur le chiffre d’affaires brut TTC avec le TDFN confirmé.</span></div>\n      <div><b>3</b><strong>Réflexe professionnel</strong><span>Qualifier l’opération avant de choisir la rubrique et de calculer.</span></div>\n    </div>\n    <div class="onboarding-principle"><strong>À retenir</strong><span>Le TDFN n’est pas le taux à afficher sur la facture client.</span></div>\n    <button class="btn primary onboarding-start" type="button" data-action="close-onboarding">Commencer par l’admissibilité</button>'''
index = replace_once(index, old_onboarding, new_onboarding, 'Onboarding v16')

old_after_admissibility = '''    <section class="memo-rule">\n      <h3>2. Vérifier l’admissibilité</h3>\n      <div class="memo-limits"><div><small>CA imposable annuel, TVA comprise</small><strong>≤ CHF 5’024’000</strong></div><div><small>Impôt annuel calculé avec les TDFN</small><strong>≤ CHF 108’000</strong></div></div>\n      <p>Ces deux limites sont cumulatives et ne remplacent pas le contrôle des exclusions de l’art. 77 OTVA.</p>\n    </section>'''
new_after_admissibility = '''    <section class="memo-rule">\n      <h3>2. Vérifier l’admissibilité</h3>\n      <div class="memo-limits"><div><small>CA imposable annuel, TVA comprise</small><strong>≤ CHF 5’024’000</strong></div><div><small>Impôt annuel calculé avec les TDFN</small><strong>≤ CHF 108’000</strong></div></div>\n      <p>Ces deux limites sont cumulatives et ne remplacent pas le contrôle des exclusions de l’art. 77 OTVA.</p>\n    </section>\n    <section class="memo-rule memo-rule--reference">\n      <h3>3. Repères AFC pour l’entrée aux TDFN</h3>\n      <p>Pour la <strong>première année d’assujettissement</strong>, ou l’<strong>année précédant un passage de la méthode effective aux TDFN</strong>, la limite de CHF 108’000 conduit aux repères de chiffre d’affaires suivants.</p>\n      <div class="memo-rate-table-wrap">\n        <table class="memo-rate-table">\n          <thead><tr><th>TDFN</th><th>CA annuel maximal de référence</th></tr></thead>\n          <tbody>\n            <tr><td>0,1 % · 0,6 % · 1,3 % · 2,1 %</td><td>CHF 5’024’000</td></tr>\n            <tr><td>3,0 %</td><td>CHF 3’600’000</td></tr>\n            <tr><td>3,7 %</td><td>CHF 2’920’000</td></tr>\n            <tr><td>4,5 %</td><td>CHF 2’400’000</td></tr>\n            <tr><td>5,3 %</td><td>CHF 2’040’000</td></tr>\n            <tr><td>6,2 %</td><td>CHF 1’740’000</td></tr>\n            <tr><td>6,8 %</td><td>CHF 1’590’000</td></tr>\n          </tbody>\n        </table>\n      </div>\n      <p class="memo-warning"><strong>À ne pas confondre :</strong> ces montants sont des repères pour l’entrée dans la méthode. Ils ne remplacent pas les règles de maintien après un dépassement, expliquées ci-dessous.</p>\n      <a class="memo-inline-source" href="https://www.estv.admin.ch/fr/tva-taux-de-la-dette-fiscale-nette-et-taux-forfaitaires" target="_blank" rel="noopener noreferrer">Source AFC — conditions et plafonds ↗</a>\n    </section>\n    <section class="memo-rule memo-rule--reform">\n      <div class="memo-rule-heading"><h3>4. Réforme TDFN dès le 01.01.2025</h3><span>Dès 2025</span></div>\n      <div class="memo-before-after">\n        <div><small>Avant</small><strong>Maximum deux TDFN</strong><p>Une règle spéciale à 50 % existait pour certaines branches mixtes.</p></div>\n        <div><small>Depuis 2025</small><strong>Plusieurs TDFN possibles</strong><p>Une activité dépassant strictement 10 % du chiffre d’affaires total imposable doit être traitée selon le TDFN correspondant; la règle spéciale à 50 % a été supprimée.</p></div>\n      </div>\n      <p>Les changements de méthode effective ↔ TDFN peuvent aussi entraîner une correction liée à la valeur résiduelle; le sens du changement détermine notamment l’utilisation du ch. 415 ou du ch. 410.</p>\n      <a class="memo-inline-source" href="https://www.estv.admin.ch/fr/tva-methode-des-taux-de-la-dette-fiscale-nette-2025" target="_blank" rel="noopener noreferrer">AFC — changements depuis 2025 ↗</a>\n    </section>'''
index = replace_once(index, old_after_admissibility, new_after_admissibility, 'Mémo plafonds + réforme')

index = replace_once(index, '<h3>3. Ne pas confondre les périodes</h3>', '<h3>5. Ne pas confondre les périodes</h3>', 'Renumérotation mémo 5')
index = replace_once(index, '<h3>4. Lire le décompte sans jargon inutile</h3>', '<h3>6. Lire le décompte sans jargon inutile</h3>', 'Renumérotation mémo 6')
index = replace_once(index, '<h3>5. Réflexe de travail</h3>', '<h3>7. Réflexe de travail</h3>', 'Renumérotation mémo 7')
index = index.replace('<body>', '<body><!-- v16-refined-core -->', 1)

# ---------------- app.js ----------------
anchor = "const caseKind = (caseItem = baseCurrent()) => CASE_PEDAGOGY[casePublicId(caseItem)]?.kind || (caseItem?.type==='quiz'?'Qualification':'Calcul');"
insert = anchor + r'''
const MODULE_INTRO_RULES_V16 = {
  2: {
    badge: 'Dès 01.01.2025',
    title: 'Plusieurs activités : appliquer les règles en vigueur depuis 2025',
    text: 'Plus de deux TDFN peuvent désormais être appliqués. Pour une activité concernée, le seuil déterminant est strictement supérieur à 10 % du chiffre d’affaires total imposable; l’ancienne règle spéciale à 50 % des branches mixtes a été supprimée.',
    url: 'https://www.estv.admin.ch/fr/tva-methode-des-taux-de-la-dette-fiscale-nette-2025'
  },
  6: {
    badge: 'Dès 01.01.2025',
    title: 'Changement effective → TDFN',
    text: 'Avant tout calcul, vérifiez la validité du changement et documentez les éléments encore pertinents. La correction liée à la valeur résiduelle est portée au ch. 415 selon les conditions applicables.',
    url: 'https://www.estv.admin.ch/fr/tva-taux-de-la-dette-fiscale-nette-et-taux-forfaitaires'
  },
  7: {
    badge: 'Dès 01.01.2025',
    title: 'Changement TDFN → méthode effective',
    text: 'Avant tout calcul, identifiez les éléments ouvrant un dégrèvement ultérieur et documentez la part résiduelle. Le dégrèvement est porté au ch. 410 selon les conditions applicables.',
    url: 'https://www.estv.admin.ch/fr/tva-taux-de-la-dette-fiscale-nette-et-taux-forfaitaires'
  }
};
function moduleIntroMarkup(c){
  const moduleIndex=moduleIndexFor(c);
  if(moduleCasePosition(c)!==0) return '';
  const rule=MODULE_INTRO_RULES_V16[moduleIndex];
  if(!rule) return '';
  return `<section class="module-legal-intro" aria-label="Repère légal du module"><div class="module-legal-intro__head"><div><span class="eyebrow">Repère légal</span><strong>${esc(rule.title)}</strong></div><span class="module-law-badge">${esc(rule.badge)}</span></div><p>${esc(rule.text)}</p><a href="${rule.url}" target="_blank" rel="noopener noreferrer">Voir la pratique AFC ↗</a></section>`;
}'''
app = replace_once(app, anchor, insert, 'Règles de contexte module')

old_intro_line = "  const intro=document.querySelector('#moduleIntroSlot');if(intro)intro.innerHTML='';"
new_intro_line = "  const intro=document.querySelector('#moduleIntroSlot');if(intro){const markup=moduleIntroMarkup(c);intro.innerHTML=markup;intro.hidden=!markup;}"
app = replace_once(app, old_intro_line, new_intro_line, 'Rendu contexte module')

# ---------------- styles.css ----------------
styles = styles.replace('/* TVA TDFN Trainer — v15.0', '/* TVA TDFN Trainer — v16.0 refined', 1)
append_css = r'''

/* v16 refined — calmer hierarchy, entry references and module context */
.level-pill{background:#eef3f5;color:#4d626c;border:1px solid #dde6e9}
.meta,.accounting-basis span,.accounting-basis strong,.accounting-basis small,.data-main,.data-note,.data-amount,.dossier-details>summary,.dossier-details__body>p,.check,.source-links a,.source-line>span,.acquired-note{font-size:.875rem}
.onboarding-flow--tdfn{grid-template-columns:repeat(3,minmax(0,1fr))}
.onboarding-flow--tdfn>div{min-height:108px}
.memo-rule--reference,.memo-rule--reform{background:#fbfcfc}
.memo-rate-table-wrap{overflow-x:auto;margin:10px 0}
.memo-rate-table{width:100%;border-collapse:collapse;font-size:.875rem}
.memo-rate-table th,.memo-rate-table td{padding:8px 9px;border-bottom:1px solid var(--line);text-align:left}
.memo-rate-table th{background:#f4f7f8;color:var(--muted);font-size:.8125rem}
.memo-rate-table td:last-child{text-align:right;font:800 .875rem var(--mono);white-space:nowrap}
.memo-warning{padding:9px 10px;border-radius:8px;background:var(--amber-soft);border:1px solid #ead9b2}
.memo-inline-source{display:inline-flex;align-items:center;min-height:34px;margin-top:5px;padding:5px 8px;border:1px solid var(--line);border-radius:8px;background:#fff;font-size:.8125rem;font-weight:750;text-decoration:none}
.memo-rule-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
.memo-rule-heading>span,.module-law-badge{display:inline-flex;align-items:center;min-height:26px;padding:3px 7px;border-radius:999px;background:var(--brand-soft);color:var(--brand-dark);font-size:.75rem;font-weight:850;white-space:nowrap}
.memo-before-after{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}
.memo-before-after>div{padding:10px;border:1px solid var(--line);border-radius:9px;background:#fff}
.memo-before-after small{display:block;color:var(--muted);font-size:.75rem;font-weight:800;text-transform:uppercase;letter-spacing:.04em}
.memo-before-after strong{display:block;margin-top:2px;font-size:.9rem}
.memo-before-after p{margin-bottom:0}
#moduleIntroSlot:not([hidden]){display:block;margin:0 0 2px}
.module-legal-intro{padding:12px 14px;border:1px solid #d5e3e8;border-radius:11px;background:#f8fbfc}
.module-legal-intro__head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
.module-legal-intro__head .eyebrow{margin-bottom:2px;color:var(--brand)}
.module-legal-intro__head strong{display:block;font-size:.94rem}
.module-legal-intro p{margin:7px 0;color:#455a63;font-size:.875rem;line-height:1.5}
.module-legal-intro a{font-size:.8125rem;font-weight:750;text-decoration:none}
@media(max-width:850px){.onboarding-flow--tdfn{grid-template-columns:1fr}.onboarding-flow--tdfn>div{min-height:0}.memo-before-after{grid-template-columns:1fr}}
@media(max-width:700px){.memo-rate-table{font-size:.8125rem}.memo-rate-table th,.memo-rate-table td{padding:7px 6px}.memo-rule-heading,.module-legal-intro__head{display:grid;gap:6px}.module-law-badge,.memo-rule-heading>span{justify-self:start}}
'''
if '/* v16 refined — calmer hierarchy' in styles:
    raise RuntimeError('Styles v16 refined déjà présents.')
styles = styles.rstrip() + append_css + '\n'

# ---------------- backups + write ----------------
backup_dir = ROOT / '.v15-backup-before-v16-refined'
if backup_dir.exists():
    suffix = datetime.now().strftime('%Y%m%d-%H%M%S')
    backup_dir = ROOT / f'.v15-backup-before-v16-refined-{suffix}'
backup_dir.mkdir()
for path in (INDEX, APP, STYLES):
    shutil.copy2(path, backup_dir / path.name)

INDEX.write_text(index, encoding='utf-8')
APP.write_text(app, encoding='utf-8')
STYLES.write_text(styles, encoding='utf-8')

print('OK — v16 refined appliquée.')
print(f'Sauvegarde v15: {backup_dir.name}/')
print('Fichiers modifiés: index.html, app.js, styles.css')
print('Aucun cas, calcul, score ni donnée pédagogique n’a été modifié.')
