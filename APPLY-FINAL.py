from pathlib import Path
from datetime import datetime
import ast
import json
import re
import runpy
import shutil
import subprocess
import tempfile

ROOT = Path.cwd()
PKG = Path(__file__).resolve().parent
FILES = ['index.html','app.js','styles.css','data.js','pedagogy.js','legal-basis.js']

for name in FILES:
    if not (ROOT / name).exists():
        raise SystemExit(f'ERREUR: {name} introuvable. Lancez APPLY-FINAL.cmd depuis la racine du dépôt tva-tdfn.')

# Install the previously validated v16.1 base first when the repository is still v15/v16-refined.
base_data = (ROOT / 'data.js').read_text(encoding='utf-8')
if 'v16-final-content' not in base_data:
    print('Installation de la base v16.1...')
    try:
        runpy.run_path(str(PKG / '_INSTALL-V16.1.py'), run_name='__main__')
    except SystemExit as exc:
        if exc.code not in (None, 0):
            raise

# Reload after base installation.
index_path = ROOT / 'index.html'
app_path = ROOT / 'app.js'
styles_path = ROOT / 'styles.css'
data_path = ROOT / 'data.js'
ped_path = ROOT / 'pedagogy.js'
legal_path = ROOT / 'legal-basis.js'

index = index_path.read_text(encoding='utf-8')
app = app_path.read_text(encoding='utf-8')
styles = styles_path.read_text(encoding='utf-8')
data = data_path.read_text(encoding='utf-8')
ped = ped_path.read_text(encoding='utf-8')
legal = legal_path.read_text(encoding='utf-8')

if 'v16.2-audited-content' in data:
    print('TVA TDFN v16.2 audited est déjà installée. Aucun changement effectué.')
    raise SystemExit(0)

# Backup the state immediately before the audit refinement. The original v15 backup made by v16.1 remains untouched.
audit_backup = ROOT / '.backup-before-v16.2-audit'
if not audit_backup.exists():
    audit_backup.mkdir()
    for name in FILES:
        shutil.copy2(ROOT / name, audit_backup / name)
    print(f'Sauvegarde pré-v16.2 créée: {audit_backup.name}/')
else:
    missing = [n for n in FILES if not (audit_backup / n).exists()]
    if missing:
        raise SystemExit('ERREUR: sauvegarde v16.2 existante incomplète: ' + ', '.join(missing))
    print(f'Sauvegarde pré-v16.2 conservée: {audit_backup.name}/')


def extract_json_array(text, name):
    prefix = f'export const {name} = '
    start = text.find(prefix)
    if start < 0:
        return None, None, None
    arr_start = start + len(prefix)
    end = text.find(';\n', arr_start)
    if end < 0:
        end = text.find(';\r\n', arr_start)
    if end < 0:
        raise RuntimeError(f'Fin de {name} introuvable')
    raw = text[arr_start:end].strip()
    return json.loads(raw), arr_start, end


def case_by_id(cases, cid):
    found = [c for c in cases if c.get('id') == cid]
    if len(found) != 1:
        raise RuntimeError(f'Cas {cid}: attendu 1, trouvé {len(found)}')
    return found[0]


cases, cases_start, cases_end = extract_json_array(data, 'CASES')
if cases is None:
    raise RuntimeError('Bloc CASES introuvable')

# ---------------- Final dossier: remove solution leakage and make document qualification genuinely autonomous ----------------
t1 = case_by_id(cases, 'T1')
t1.update({
    'tab':'T1 · Dossier final — qualifier',
    'title':'Dossier fiduciaire final — qualifier les pièces avant le décompte',
    'description':'Vous recevez un extrait du grand livre, des pièces clients et fournisseurs, une décision cantonale et le profil AFC. Aucune rubrique du décompte n’est indiquée: la qualification fait partie du travail.',
    'mission':'Pour chaque pièce, déterminez sa nature TVA, la rubrique éventuelle du décompte et, pour les opérations suisses, l’activité TDFN concernée. Ne calculez pas encore la dette fiscale.',
    'clientNote':'Extrait du profil AFC du client: commerce d’articles de sport hors vêtements 2,1 %, location d’articles de sport 3,7 %, travaux de réparation et service 4,5 %. L’entreprise est inscrite au registre TVA et décompte selon les contre-prestations convenues.',
    'afcNote':'Une désignation comptable ou un mouvement bancaire ne suffit pas à lui seul. Chaque qualification doit pouvoir être reliée à la facture, au contrat, à la preuve d’exportation ou à la décision qui documente le flux.',
    'given':[
      {'label':'Compte 3200 — ventes magasin','amount':150000,'note':'Articles de sport hors vêtements vendus à des clients en Suisse; montants TTC.','tag':'GL 3200'},
      {'label':'Compte 3410 — mise à disposition de matériel','amount':50000,'note':'Matériel de sport mis à disposition contre rémunération en Suisse; montants TTC.','tag':'GL 3410'},
      {'label':'Compte 3420 — atelier','amount':50000,'note':'Entretien et réparation de skis/snowboards facturés en Suisse, avant la pièce AV-17; montants TTC.','tag':'GL 3420'},
      {'label':'Facture E-204 — client à Lyon','amount':20000,'note':'Vente de matériel expédié depuis la Suisse vers la France; preuve de sortie douanière jointe.','tag':'E-204'},
      {'label':'Pièce AV-17 — client atelier','amount':5000,'note':'Crédit accordé au client après rectification du prix d’une réparation déjà facturée.','tag':'AV-17'},
      {'label':'Facture F-88 — CloudDesk Ltd., Irlande','amount':10000,'note':'Abonnement logiciel utilisé par l’entreprise; facture sans TVA suisse.','tag':'F-88'},
      {'label':'Versement du Canton — décision 2026-114','amount':15000,'note':'Contribution accordée par décision de droit public sans contre-prestation individualisable au canton.','tag':'Banque'}
    ],
    'checks':[
      'Réconcilier le chiffre d’affaires brut avec les comptes de produits avant toute déduction.',
      'Qualifier chaque flux hors ventes à partir de sa pièce justificative, pas de son seul libellé bancaire.',
      'Justifier toute opération non imposée en Suisse avant de la retrancher du chiffre d’affaires.',
      'Analyser séparément la facture du fournisseur étranger et le versement public avant de choisir une rubrique.'
    ],
    'questions':[
      {'q':'Comment traiter la facture E-204 de CHF 20’000 au vu de la preuve de sortie jointe?','options':['L’inclure au ch. 200 puis la déduire au ch. 220','La porter au ch. 900','L’intégrer à une base TDFN suisse'],'answer':0,'why':'Qualification / rubrique: la livraison exportée et documentée entre dans le chiffre d’affaires total puis est déduite comme prestation exonérée.'},
      {'q':'Quel traitement correspond à la pièce AV-17 de CHF 5’000?','options':['Diminution de contre-prestation au ch. 235 et réduction de la base atelier','Impôt sur les acquisitions au ch. 383','Aucune incidence TVA'],'answer':0,'why':'Correction / rubrique: la pièce réduit le prix d’une prestation déjà facturée et doit rester rattachée à l’activité atelier.'},
      {'q':'Comment analyser la facture F-88 de CloudDesk Ltd. dans ce dossier?','options':['Comme chiffre d’affaires au ch. 200','Séparément comme acquisition d’une prestation étrangère imposable, sans l’ajouter au ch. 200','Comme autre mouvement de fonds au ch. 900'],'answer':1,'why':'Qualification: l’entreprise est déjà inscrite au registre TVA; une acquisition imposable auprès d’un fournisseur étranger doit être déclarée par l’assujetti. Le seuil annuel de CHF 10’000 vise le destinataire qui n’est pas inscrit au registre TVA.'},
      {'q':'Que révèle la décision cantonale 2026-114 dans l’hypothèse du dossier?','options':['Une vente imposable à soumettre au TDFN','Une contribution de droit public à présenter séparément au ch. 900','Une diminution de contre-prestation au ch. 235'],'answer':1,'why':'Qualification / rubrique: la décision établit une contribution publique sans échange individualisable de prestations; elle ne constitue pas une contre-prestation TDFN dans ce scénario.'},
      {'q':'Quelle activité du profil AFC correspond au compte 3410?','options':['Commerce 2,1 %','Location 3,7 %','Service/réparation 4,5 %'],'answer':1,'why':'Affectation: la mise à disposition rémunérée du matériel relève de l’activité de location indiquée dans le profil AFC.'},
      {'q':'Quelle activité du profil AFC correspond au compte 3420?','options':['Commerce 2,1 %','Location 3,7 %','Travaux de réparation et service 4,5 %'],'answer':2,'why':'Affectation: l’entretien et la réparation de skis/snowboards relèvent du TDFN de service/réparation prévu dans le profil du cas.'}
    ],
    'lesson':'Dossier final: partez des pièces et des faits, pas des rubriques. Le calcul ne commence qu’après avoir justifié le chiffre d’affaires, les déductions, les autres flux, les acquisitions et l’affectation aux TDFN.'
})

t2 = case_by_id(cases, 'T2')
t2.update({
    'tab':'T2 · Dossier final — décompte',
    'title':'Dossier fiduciaire final — établir et réconcilier le décompte',
    'description':'Suite du dossier T1. Reprenez les mêmes pièces et établissez le décompte sans chiffre de solution dans la mission ni dans la checklist.',
    'mission':'Établissez le chiffre d’affaires brut, les déductions, les bases TDFN, l’impôt sur l’acquisition étrangère et le traitement du versement public. Terminez par une concordance entre le décompte et les comptes.',
    'clientNote':'Profil AFC du client: commerce d’articles de sport hors vêtements 2,1 %, location d’articles de sport 3,7 %, travaux de réparation et service 4,5 %. L’entreprise est inscrite au registre TVA; taux légal normal 8,1 %.',
    'afcNote':'Les contrôles du dossier décrivent la méthode de vérification, pas le résultat. La solution chiffrée ne doit être consultée qu’après votre propre saisie.',
    'given':[
      {'label':'Compte 3200 — ventes magasin','amount':150000,'note':'Articles de sport hors vêtements, clients en Suisse; montants TTC.','tag':'GL 3200'},
      {'label':'Compte 3410 — mise à disposition de matériel','amount':50000,'note':'Matériel de sport mis à disposition contre rémunération en Suisse; montants TTC.','tag':'GL 3410'},
      {'label':'Compte 3420 — atelier','amount':50000,'note':'Entretien et réparation de skis/snowboards en Suisse, avant AV-17; montants TTC.','tag':'GL 3420'},
      {'label':'Facture E-204 — client à Lyon','amount':20000,'note':'Matériel expédié hors de Suisse; preuve de sortie douanière jointe.','tag':'E-204'},
      {'label':'Pièce AV-17 — client atelier','amount':5000,'note':'Crédit accordé après rectification du prix d’une réparation.','tag':'AV-17'},
      {'label':'Facture F-88 — CloudDesk Ltd., Irlande','amount':10000,'note':'Abonnement logiciel; facture sans TVA suisse.','tag':'F-88'},
      {'label':'Versement du Canton — décision 2026-114','amount':15000,'note':'Contribution publique sans contre-prestation individualisable au canton.','tag':'Banque'}
    ],
    'checks':[
      'Construire le ch. 200 à partir des comptes de produits avant de saisir les déductions.',
      'Documenter séparément chaque déduction et conserver le lien vers la pièce qui la justifie.',
      'Vérifier que la somme des bases TDFN concorde avec le chiffre d’affaires restant après les déductions pertinentes.',
      'Traiter la facture du fournisseur étranger hors du chiffre d’affaires et contrôler le mécanisme de l’impôt sur les acquisitions.',
      'Présenter séparément le versement public lorsque sa qualification est confirmée par la décision.'
    ],
    'diagnostics':{
      'ch200':{
        '245000':'Rubrique — Vous avez probablement saisi directement le montant après déductions. Le ch. 200 reprend d’abord le chiffre d’affaires brut.',
        '250000':'Rubrique — Vérifiez la facture E-204: une opération exonérée documentée reste comprise dans le ch. 200 avant sa déduction.',
        '265000':'Rubrique — Vérifiez AV-17: une diminution de contre-prestation ne doit pas être soustraite avant la construction du ch. 200.'
      },
      'ch220':{'0':'Qualification / rubrique — Réexaminez E-204 et sa preuve de sortie: le traitement dépend de la qualification de cette livraison.'},
      'ch235':{'0':'Correction / rubrique — Réexaminez AV-17: le crédit documenté modifie la contre-prestation de l’atelier.'},
      'r2base':{'50000':'Base — La base atelier doit tenir compte de la modification documentée par AV-17.'},
      'acqBase':{'0':'Qualification — F-88 n’est pas du chiffre d’affaires, mais l’entreprise inscrite au registre TVA doit analyser l’impôt sur les acquisitions.'},
      'ch900':{'0':'Qualification — La décision 2026-114 établit, dans les faits du cas, une contribution publique à présenter séparément.'}
    },
    'explanations':{
      'ch200':'Les quatre facturations de produits/prestations totalisent CHF 270’000 avant les déductions.',
      'ch220':'E-204, CHF 20’000, est déduite au ch. 220 sur la base de la preuve d’exportation.',
      'ch235':'AV-17, CHF 5’000, réduit la contre-prestation de l’atelier.',
      'r0base':'Compte 3200: CHF 150’000.',
      'r0tax':'CHF 150’000 × 2,1 % = CHF 3’150.',
      'r1base':'Compte 3410: CHF 50’000.',
      'r1tax':'CHF 50’000 × 3,7 % = CHF 1’850.',
      'r2base':'Compte 3420 CHF 50’000 − AV-17 CHF 5’000 = CHF 45’000.',
      'r2tax':'CHF 45’000 × 4,5 % = CHF 2’025.',
      'acqBase':'F-88, CHF 10’000, n’entre pas au ch. 200; elle constitue la base de l’acquisition dans les hypothèses du dossier.',
      'acqTax':'CHF 10’000 × 8,1 % = CHF 810.',
      'ch900':'La décision cantonale qualifie le versement de CHF 15’000 comme contribution publique présentée séparément au ch. 900.'
    },
    'lesson':'Le dossier est réconcilié lorsque le chiffre d’affaires après déductions concorde avec les bases TDFN et que les flux hors base TDFN sont traités séparément. Solution: ch. 299 CHF 245’000; dette TDFN CHF 7’025; acquisition CHF 810; ch. 399 CHF 7’835.'
})

# Use legally cautious wording for the debtor-loss exercise: the case teaches a documented diminution, not that every overdue receivable is deductible.
s3 = case_by_id(cases, 'S3')
s3.update({
    'tab':'S3 · Diminution documentée',
    'title':'Diminution de contre-prestation documentée — choisir la bonne période',
    'description':'Le dossier suppose qu’une diminution de contre-prestation est réellement établie, comptabilisée et documentée. Une simple créance échue ou un retard de paiement ne suffit pas à lui seul.',
    'mission':'Dans les faits expressément établis du cas, déterminez la période, la rubrique et l’impact TDFN de la diminution documentée.',
    'afcNote':'Le cas isole le mécanisme de l’art. 41 LTVA et du ch. 235. En pratique, il faut d’abord établir la réalité et le montant de la diminution; une créance simplement en souffrance ne doit pas être assimilée automatiquement à une correction de contre-prestation.',
    'lesson':'Avant de corriger la TVA, documentez la réalité de la diminution. Ensuite seulement, rattachez le montant à la période et à la rubrique correctes tout en conservant la facture initiale, les encaissements et l’écriture de correction.'
})

# Also remove numeric answer leakage from the new concordance case; exact figures remain available only after validation/solution.
s4 = case_by_id(cases, 'S4')
s4['checks'] = [
    'Réconcilier le ch. 200 avec les comptes de produits avant toute déduction.',
    'Justifier séparément les opérations exonérées, les prestations situées à l’étranger et les diminutions de contre-prestation.',
    'Vérifier que le chiffre d’affaires restant après déductions concorde avec la somme des bases TDFN.',
    'Identifier les autres mouvements de fonds qui doivent être déclarés séparément sans gonfler la base TDFN.'
]

# Write CASES back in memory.
new_cases_json = json.dumps(cases, ensure_ascii=False, indent=2)
data = data[:cases_start] + new_cases_json + data[cases_end:]
data = data.replace('// Données intégrées — version 16.1.0', '// Données intégrées — version 16.2.0', 1)
data = data.replace('// v16-final-content · 12.08.2026', '// v16-final-content · 12.08.2026\n// v16.2-audited-content · 12.08.2026', 1)

# ---------------- Static HTML consistency / discoverability ----------------
index = re.sub(r'styles\.css\?v=\d+\.\d+\.\d+', 'styles.css?v=16.2.0', index, count=1)
index = re.sub(r'app\.js\?v=\d+\.\d+\.\d+', 'app.js?v=16.2.0', index, count=1)
index = index.replace(
    'Entraînement pédagogique au décompte TVA suisse selon la méthode TDFN, avec cas progressifs, changements de méthode, contrôle préalable et vue pédagogique du décompte.',
    'Entraînement pédagogique à la TVA suisse selon la méthode TDFN: cas progressifs, travail courant en fiduciaire, opérations internationales, corrections, changements de méthode et dossier final.'
)
index = index.replace(
    'Cas progressifs, tableau de correction des valeurs résiduelles et vue pédagogique inspirée du prototype AFC.',
    'Cas progressifs TDFN, travail fiduciaire, corrections, changements de méthode et dossier final avec références AFC/Fedlex.'
)
index = index.replace(
    'Cas progressifs · plusieurs TDFN · changements de méthode · rectification',
    'Cas progressifs · plusieurs TDFN · travail fiduciaire · changements de méthode'
)
index = re.sub(
    r'<div><span id="moduleProgressLabel">[^<]*</span><strong id="progressText">[^<]*</strong></div>',
    '<div><span id="moduleProgressLabel">Progression</span><strong id="progressText">0 / 43 acquis · 0 maîtrisés</strong></div>',
    index,
    count=1
)
index = index.replace('Mise à jour : 10.08.2026 · sources revues le 10.08.2026.', 'Mise à jour : 12.08.2026 · sources revues le 12.08.2026.')

# Keep version comments aligned.
ped = ped.replace('// Couche pédagogique — version 16.1.0', '// Couche pédagogique — version 16.2.0', 1)
legal = legal.replace('// Ancrage juridique par cas — version 16.1.0', '// Ancrage juridique par cas — version 16.2.0', 1)
if '/* v16.2 audited */' not in styles:
    styles = styles.rstrip() + '\n\n/* v16.2 audited */\n/* Final dossier keeps documentary clues neutral; solution figures remain in feedback only. */\n'

# ---------------- Validation before writing ----------------
def validate_transformed(index, app, styles, data, ped, legal):
    cases_v, _, _ = extract_json_array(data, 'CASES')
    if cases_v is None:
        raise RuntimeError('Validation: CASES introuvable')
    ids = [c.get('id') for c in cases_v]
    if len(ids) != 44 or len(set(ids)) != 44:
        raise RuntimeError(f'Validation: 44 identifiants uniques attendus, obtenu {len(ids)} / uniques {len(set(ids))}')
    if sum(1 for c in cases_v if not c.get('excludeFromProgress')) != 43:
        raise RuntimeError('Validation: 43 cas évalués attendus')
    excluded = [c.get('id') for c in cases_v if c.get('excludeFromProgress')]
    if excluded != ['Q']:
        raise RuntimeError(f'Validation: seul Q doit être libre, obtenu {excluded}')

    # Module coverage: each case appears exactly once in the visual module list.
    ms = app.find('export const MODULES = [')
    me = app.find('];\nconst casePublicId', ms)
    if ms < 0 or me < 0:
        raise RuntimeError('Validation: MODULES introuvable')
    module_block = app[ms:me]
    module_ids = []
    for body in re.findall(r'ids:\s*(\[[^\]]*\])', module_block):
        module_ids.extend(ast.literal_eval(body))
    if len(module_ids) != len(set(module_ids)):
        raise RuntimeError('Validation: un cas apparaît dans plusieurs modules')
    if set(module_ids) != set(ids):
        missing = sorted(set(ids)-set(module_ids)); extra = sorted(set(module_ids)-set(ids))
        raise RuntimeError(f'Validation modules: manquants={missing}, inconnus={extra}')

    # Sources referenced by cases and legal/practice layers must exist when OFFICIAL_SOURCES is present.
    sources_v, _, _ = extract_json_array(data, 'OFFICIAL_SOURCES')
    if sources_v is not None:
        valid_sources = {s.get('id') for s in sources_v}
        bad = []
        for c in cases_v:
            for sid in c.get('sourceIds', []):
                if sid not in valid_sources:
                    bad.append((c.get('id'), sid))
        for filename, text in [('legal-basis.js', legal), ('pedagogy.js', ped)]:
            for sid in re.findall(r"sourceId\s*:\s*['\"]([^'\"]+)['\"]", text):
                if sid not in valid_sources:
                    bad.append((filename, sid))
        if bad:
            raise RuntimeError(f'Validation sources: références inconnues {bad[:10]}')

    # Changed sport rates: current 2025 allocation.
    d = case_by_id(cases_v, 'D'); d3 = case_by_id(cases_v, 'D3')
    if [r['rate'] for r in d.get('rates',[])] != [2.1,3.7,4.5]:
        raise RuntimeError('Validation: taux D incorrects')
    if [r['rate'] for r in d3.get('rates',[])] != [2.1,3.0,3.7,4.5]:
        raise RuntimeError('Validation: taux D3 incorrects')

    # Final dossier arithmetic and anti-leak controls.
    t1v = case_by_id(cases_v, 'T1'); t2v = case_by_id(cases_v, 'T2')
    forbidden_labels = {'Factures export documentées','Exportations documentées','Licence SaaS étrangère','Subvention cantonale'}
    if any(x.get('label') in forbidden_labels for x in t1v.get('given',[])+t2v.get('given',[])):
        raise RuntimeError('Validation: final dossier contains prequalified labels')
    for cid, c in [('T1', t1v), ('T2', t2v)]:
        for check in c.get('checks',[]):
            if 'CHF' in check or re.search(r'ch\.\s*\d+\s*=', check, re.I):
                raise RuntimeError(f'Validation: {cid} checklist leaks a numeric solution: {check}')
    if t2v.get('fields',{}).get('ch200') != 270000 or t2v.get('deductions',{}).get('ch220') != 20000 or t2v.get('deductions',{}).get('ch235') != 5000:
        raise RuntimeError('Validation: T2 rubriques attendues incorrectes')
    if abs(sum(r.get('base',0) for r in t2v.get('rates',[])) - 245000) > 0.001:
        raise RuntimeError('Validation: T2 bases TDFN ne concordent pas à 245000')
    tdfn_tax = sum(r.get('tax',0) for r in t2v.get('rates',[]))
    if abs(tdfn_tax - 7025) > 0.001 or abs(tdfn_tax + t2v.get('fields',{}).get('acqTax',0) - 7835) > 0.001:
        raise RuntimeError('Validation: T2 dette finale incorrecte')

    # T1/T2 intentionally have no guided pedagogy: they are final autonomous cases.
    ps = ped.find('export const CASE_PEDAGOGY = {')
    pe = ped.find('};\nexport const SHOW_CONTRAST', ps)
    if ps >= 0 and pe >= 0:
        pedagogy_block = ped[ps:pe]
        if re.search(r'(^|\n)\s*T[12]\s*:', pedagogy_block):
            raise RuntimeError('Validation: T1/T2 must not receive guided theory/example')

    # Static HTML must match dynamic state and version.
    if '0 / 43 acquis · 0 maîtrisés' not in index or 'styles.css?v=16.2.0' not in index or 'app.js?v=16.2.0' not in index:
        raise RuntimeError('Validation: HTML statique/version incohérent')
    if 'sources revues le 12.08.2026' not in index:
        raise RuntimeError('Validation: date de revue des sources absente')
    if 'v16.2-audited-content' not in data:
        raise RuntimeError('Validation: marqueur v16.2 absent')

    # Legal anchors for all added cases.
    for cid in ['S1','S2','S3','S4','S5','T1','T2']:
        if not re.search(rf'(^|\n)\s*{re.escape(cid)}\s*:', legal):
            raise RuntimeError(f'Validation: ancrage juridique {cid} absent')

    return cases_v

cases_validated = validate_transformed(index, app, styles, data, ped, legal)

# Syntax-check changed JS files in a temporary directory when Node is available.
node = shutil.which('node')
if node:
    with tempfile.TemporaryDirectory(prefix='tdfn-v162-') as td:
        td = Path(td)
        for name, content in [('app.js',app),('data.js',data),('pedagogy.js',ped),('legal-basis.js',legal)]:
            p = td / name
            p.write_text(content, encoding='utf-8')
            proc = subprocess.run([node, '--check', str(p)], capture_output=True, text=True)
            if proc.returncode != 0:
                raise RuntimeError(f'Validation syntaxe {name}: {proc.stderr.strip()}')

# Write only after all validations succeed.
index_path.write_text(index, encoding='utf-8')
app_path.write_text(app, encoding='utf-8')
styles_path.write_text(styles, encoding='utf-8')
data_path.write_text(data, encoding='utf-8')
ped_path.write_text(ped, encoding='utf-8')
legal_path.write_text(legal, encoding='utf-8')

print('OK — TVA TDFN v16.2 audited appliquée.')
print('44 cas au total · 43 évalués · 1 atelier libre.')
print('Dossier final T1/T2: données documentaires neutralisées, aucune solution chiffrée dans les contrôles.')
print('HTML statique: compteur 43, métadonnées et cache v16.2.0 alignés.')
print('Validation structurelle, juridique-référentielle et arithmétique: OK.')
