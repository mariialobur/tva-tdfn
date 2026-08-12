from pathlib import Path
import json
import re
import runpy
import shutil
import sys

ROOT = Path.cwd()
PKG = Path(__file__).resolve().parent
FILES = ['index.html','app.js','styles.css','data.js','pedagogy.js','legal-basis.js']

for name in FILES:
    if not (ROOT / name).exists():
        raise SystemExit(f'ERREUR: {name} introuvable. Lancez APPLY-FINAL.cmd depuis la racine du dépôt tva-tdfn.')

backup = ROOT / '.backup-before-v16-final'
if not backup.exists():
    backup.mkdir()
    for name in FILES:
        shutil.copy2(ROOT / name, backup / name)
    print(f'Sauvegarde originale créée: {backup.name}/')
else:
    missing = [n for n in FILES if not (backup / n).exists()]
    if missing:
        raise SystemExit('ERREUR: sauvegarde existante incomplète: ' + ', '.join(missing))
    print(f'Sauvegarde originale conservée: {backup.name}/')

index_path = ROOT / 'index.html'
app_path = ROOT / 'app.js'
styles_path = ROOT / 'styles.css'
data_path = ROOT / 'data.js'
ped_path = ROOT / 'pedagogy.js'
legal_path = ROOT / 'legal-basis.js'

# Apply the previously reviewed v16 UX/legal refinement first when needed.
index_now = index_path.read_text(encoding='utf-8')
app_now = app_path.read_text(encoding='utf-8')
if 'v16-refined-core' not in index_now or 'MODULE_INTRO_RULES_V16' not in app_now:
    print('Application de la couche v16 refined...')
    try:
        runpy.run_path(str(PKG / 'apply-v16-refined.py'), run_name='__main__')
    except SystemExit as exc:
        if exc.code not in (None, 0):
            raise

# Reload after v16 refined.
index = index_path.read_text(encoding='utf-8')
app = app_path.read_text(encoding='utf-8')
styles = styles_path.read_text(encoding='utf-8')
data = data_path.read_text(encoding='utf-8')
ped = ped_path.read_text(encoding='utf-8')
legal = legal_path.read_text(encoding='utf-8')

if 'v16-final-content' in data:
    raise SystemExit('La version finale semble déjà installée. Aucun changement effectué.')

# ---------- helpers ----------
def get_case(cases, cid):
    matches = [c for c in cases if c.get('id') == cid]
    if len(matches) != 1:
        raise RuntimeError(f'Cas {cid}: attendu 1, trouvé {len(matches)}')
    return matches[0]

def insert_object_entries(text, start_marker, end_marker, entries, label):
    start = text.find(start_marker)
    if start < 0:
        raise RuntimeError(f'{label}: début introuvable')
    end = text.find(end_marker, start)
    if end < 0:
        raise RuntimeError(f'{label}: fin introuvable')
    block = text[start:end]
    stripped = block.rstrip()
    if not stripped.endswith('}'):
        # block stops just before the object closing sequence; normal case ends with last entry, not object brace.
        pass
    # Find the last non-whitespace char before the object closing marker. Add comma if needed.
    prefix = text[:end]
    suffix = text[end:]
    i = len(prefix) - 1
    while i >= 0 and prefix[i].isspace():
        i -= 1
    sep = '' if i >= 0 and prefix[i] == ',' else ','
    insertion = sep + '\n' + entries.rstrip() + '\n'
    return prefix + insertion + suffix

# ---------- parse CASES JSON ----------
case_prefix = 'export const CASES = '
case_end_marker = ';\nexport const TRANSITION_WORKSHEETS'
start = data.find(case_prefix)
end = data.find(case_end_marker, start)
if start < 0 or end < 0:
    raise RuntimeError('Bloc CASES introuvable dans data.js')
array_start = start + len(case_prefix)
case_json = data[array_start:end].strip()
try:
    cases = json.loads(case_json)
except json.JSONDecodeError as e:
    raise RuntimeError(f'Le bloc CASES n’est pas du JSON exploitable: {e}')

# ---------- Correct outdated sport TDFN in D / D3 / E / F ----------
d = get_case(cases, 'D')
d.update({
    'description': 'Le cas applique les TDFN en vigueur dès 2025 à trois activités distinctes: commerce d’articles de sport hors vêtements, location et services sur skis ou snowboards.',
    'afcNote': 'Selon la table AFC 2025: commerce d’articles de sport hors vêtements 2,1 %, location 3,7 % et services sur skis ou snowboards 4,5 %. La dette totale du cas est CHF 8’700; le taux moyen résultant de 2,90 % est un indicateur de synthèse, pas un TDFN à appliquer.',
    'given': [
        {'label':'Commerce d’articles de sport hors vêtements','amount':180000,'note':'Contre-prestations TTC du commerce.','tag':'2,1 %'},
        {'label':'Location d’articles de sport','amount':60000,'note':'Contre-prestations TTC de location.','tag':'3,7 %'},
        {'label':'Services sur skis et snowboards','amount':60000,'note':'Entretien, préparation et services TTC.','tag':'4,5 %'},
        {'label':'Total TVA comprise','amount':300000,'note':'Somme des comptes de produits du semestre.','tag':'TTC'}
    ],
    'rates': [
        {'label':'Commerce d’articles de sport hors vêtements','rate':2.1,'base':180000,'tax':3780},
        {'label':'Location d’articles de sport','rate':3.7,'base':60000,'tax':2220},
        {'label':'Services sur skis et snowboards','rate':4.5,'base':60000,'tax':2700}
    ],
    'explanations': {
        'ch200':'Le ch. 200 reprend CHF 300’000 TTC.',
        'r0base':'Commerce hors vêtements: CHF 180’000 TTC.',
        'r0tax':'CHF 180’000 × 2,1 % = CHF 3’780.',
        'r1base':'Location: CHF 60’000 TTC.',
        'r1tax':'CHF 60’000 × 3,7 % = CHF 2’220.',
        'r2base':'Services sur skis et snowboards: CHF 60’000 TTC.',
        'r2tax':'CHF 60’000 × 4,5 % = CHF 2’700.'
    },
    'lesson':'Une enseigne unique peut exercer plusieurs activités TDFN. Chaque base est calculée avec son TDFN propre; le taux moyen de 2,90 % résulte de CHF 8’700 / CHF 300’000 et ne remplace jamais les TDFN autorisés.'
})

d3 = get_case(cases, 'D3')
d3.update({
    'tab':'D3 · 4 TDFN + export',
    'title':'Magasin de sport — quatre activités, quatre TDFN et exportations',
    'conceptualNote':'Depuis 2025, le commerce d’articles de sport hors vêtements relève ici de 2,1 %, le commerce de vêtements de sport de 3,0 %, la location de 3,7 % et les services sur skis ou snowboards de 4,5 %. Les quatre activités dépassent 10 % du chiffre d’affaires imposable du cas et restent donc ventilées séparément. Le ch. 299 est CHF 300’000, après déduction de CHF 30’000 d’exportations du ch. 200.',
    'mission':'Saisissez le chiffre d’affaires au ch. 200, déduisez les exportations au ch. 220, puis réconciliez quatre bases TDFN distinctes avec le ch. 299.',
    'clientNote':'Les CHF 30’000 d’exportations disposent des preuves requises et ne sont inclus dans aucune base TDFN suisse. Les quatre activités suisses sont suivies sur des comptes de produits distincts.',
    'afcNote':'La table AFC 2025 distingue désormais, pour ce dossier, articles de sport hors vêtements 2,1 %, vêtements de sport 3,0 %, location 3,7 % et services sur skis ou snowboards 4,5 %.',
    'given': [
        {'label':'Articles de sport hors vêtements — Suisse','amount':140000,'note':'Compte de produits distinct, recettes TTC.','tag':'2,1 %'},
        {'label':'Vêtements de sport — Suisse','amount':50000,'note':'Compte de produits distinct, recettes TTC.','tag':'3,0 %'},
        {'label':'Location d’articles — Suisse','amount':40000,'note':'Prestations TTC.','tag':'3,7 %'},
        {'label':'Services sur skis et snowboards — Suisse','amount':70000,'note':'Prestations TTC.','tag':'4,5 %'},
        {'label':'Exportations documentées','amount':30000,'note':'Incluses au ch. 200 puis déduites au ch. 220.','tag':'Export'},
        {'label':'Total ch. 200','amount':330000,'note':'CHF 300’000 imposables + CHF 30’000 exportés.','tag':'TTC'}
    ],
    'checks': [
        'ch. 200 = CHF 330’000 et ch. 220 = CHF 30’000.',
        'ch. 299 = CHF 300’000 et correspond à la somme des quatre bases TDFN.',
        'Chaque activité suisse du cas dépasse 10 % du chiffre d’affaires imposable et reste ventilée séparément.',
        'L’impôt TDFN total est CHF 9’070.'
    ],
    'legal':'Art. 23 et 37 LTVA · art. 84, 86 et 88 OTVA · ordonnance AFC sur la valeur des TDFN dès 2025',
    'rates': [
        {'label':'Articles de sport hors vêtements — Suisse','rate':2.1,'base':140000,'tax':2940},
        {'label':'Vêtements de sport — Suisse','rate':3.0,'base':50000,'tax':1500},
        {'label':'Location d’articles de sport — Suisse','rate':3.7,'base':40000,'tax':1480},
        {'label':'Services sur skis et snowboards — Suisse','rate':4.5,'base':70000,'tax':3150}
    ],
    'explanations': {
        'ch200':'CHF 300’000 de recettes suisses + CHF 30’000 d’exportations = CHF 330’000.',
        'ch220':'Les exportations documentées de CHF 30’000 sont déduites au ch. 220.',
        'r0base':'Articles de sport hors vêtements: CHF 140’000.',
        'r0tax':'CHF 140’000 × 2,1 % = CHF 2’940.',
        'r1base':'Vêtements de sport: CHF 50’000.',
        'r1tax':'CHF 50’000 × 3,0 % = CHF 1’500.',
        'r2base':'Location: CHF 40’000.',
        'r2tax':'CHF 40’000 × 3,7 % = CHF 1’480.',
        'r3base':'Services: CHF 70’000.',
        'r3tax':'CHF 70’000 × 4,5 % = CHF 3’150.'
    },
    'lesson':'Réconciliez le ch. 200, les exportations au ch. 220 et les quatre bases TDFN. Depuis 2025, articles hors vêtements, vêtements, location et services de ce dossier ne doivent plus être regroupés selon l’ancienne logique de branche mixte.'
})

e = get_case(cases, 'E')
e['given'][0]['label'] = 'Commerce d’articles de sport hors vêtements'
e['given'][0]['tag'] = '2,1 %'
e['given'][1]['tag'] = '3,7 %'
e['given'][2]['label'] = 'Réparation / service sur skis et snowboards'
e['given'][2]['tag'] = '4,5 %'
e['afcNote'] = 'Le seuil se mesure par activité ou groupe d’activités relevant du même TDFN; il est strictement supérieur à 10 %. Les tags du dossier reprennent les TDFN 2025 correspondant aux activités présentées.'

f = get_case(cases, 'F')
f['given'][0]['tag'] = '3,7 %'
f['given'][1]['tag'] = '4,5 %'
f['given'][2]['tag'] = '4,5 %'
f['given'][3]['label'] = 'Groupe des activités à 4,5 %'
f['questions'][1]['options'][0] = 'Oui, car les deux relèvent du TDFN de 4,5 %'
f['questions'][2]['q'] = 'Quelle conséquence s’applique au groupe à 4,5 %?'

# ---------- New day-to-day fiduciary cases ----------
new_cases = [
  {
    'id':'S1','tab':'S1 · Convenues / reçues','title':'Facture en décembre, paiement en janvier — choisir la bonne période','entity':'Fiduciaire Timing Sàrl','sector':'Services fiduciaires','location':'Lausanne','period':'S2 2026 / S1 2027','level':'Intermédiaire · période','risk':'high','type':'quiz','accountingBasis':'Contre-prestations convenues',
    'description':'La date du paiement ne déplace pas automatiquement le chiffre d’affaires lorsque le décompte est établi selon les contre-prestations convenues.',
    'mission':'Déterminez la période correcte selon le mode de décompte et distinguez la règle normale «convenues» du mode «reçues» autorisé par l’AFC.',
    'clientNote':'Facture de CHF 10’810 TTC émise le 21.12.2026. Paiement du client le 15.01.2027. Aucun acompte antérieur.',
    'afcNote':'Le mode «convenues» est la règle de base. Le mode «reçues» nécessite une autorisation; le moment déterminant diffère alors.',
    'given':[
      {'label':'Facture client','amount':10810,'note':'Émise le 21.12.2026.','tag':'Facture'},
      {'label':'Encaissement','amount':10810,'note':'Reçu le 15.01.2027.','tag':'Banque'},
      {'label':'Mode actuel du dossier','note':'Contre-prestations convenues.','tag':'Convenues'}
    ],
    'checks':['Identifier d’abord le mode de décompte autorisé.','Sous convenues, rattacher la contre-prestation à la facturation.','Sous reçues, rattacher la contre-prestation à l’encaissement.','Ne pas changer de mode facture par facture.'],
    'legal':'Art. 39 et 40 LTVA — modes de décompte et naissance de la créance fiscale','sourceIds':['ltva','info12','afc-main'],
    'questions':[
      {'q':'Quel mode constitue la règle de base selon la LTVA?','options':['Contre-prestations convenues','Contre-prestations reçues dans tous les cas','Le mode choisi facture par facture'],'answer':0,'why':'L’art. 39 LTVA prévoit le décompte sur la base des contre-prestations convenues; le mode «reçues» est soumis à autorisation.'},
      {'q':'Avec le mode «convenues» du dossier, dans quelle période la facture du 21.12.2026 doit-elle être rattachée?','options':['S2 2026','S1 2027','À la date de clôture annuelle seulement'],'answer':0,'why':'Sous le mode convenues, la facturation est déterminante dans ce scénario; le paiement de janvier ne déplace pas la contre-prestation.'},
      {'q':'Si le dossier était valablement autorisé au mode «reçues», quelle période serait déterminante?','options':['S2 2026','S1 2027','Toujours la date de facture'],'answer':1,'why':'Sous le mode reçues, la créance fiscale naît au moment de l’encaissement.'},
      {'q':'Peut-on utiliser convenues pour certaines factures et reçues pour d’autres selon ce qui arrange le décompte?','options':['Oui','Non'],'answer':1,'why':'Le mode de décompte est une règle du dossier et ne se choisit pas opération par opération.'}
    ],
    'lesson':'Avant de chercher une rubrique, identifiez le mode de décompte: il détermine la période à laquelle la contre-prestation doit être rattachée.'
  },
  {
    'id':'S2','tab':'S2 · Acompte','title':'Acompte reçu avant la prestation — ne pas attendre la facture finale','entity':'Digital Projet Sàrl','sector':'Développement informatique','location':'Genève','period':'S2 2026','level':'Intermédiaire · période','risk':'high','type':'quiz','accountingBasis':'Contre-prestations convenues',
    'description':'Un paiement anticipé lié à une future prestation imposable peut faire naître la créance fiscale avant l’exécution finale du mandat.',
    'mission':'Qualifiez l’acompte et déterminez la période correcte sans attendre artificiellement la livraison finale.',
    'clientNote':'Acompte de CHF 21’620 TTC reçu le 20.12.2026. Le développement sera livré en janvier 2027; la facture finale sera émise ensuite.',
    'afcNote':'Le cas suppose que l’acompte est clairement rattaché à une prestation future imposable et ne constitue pas un dépôt purement indemnitaire.',
    'given':[
      {'label':'Acompte encaissé','amount':21620,'note':'Reçu le 20.12.2026.','tag':'Banque'},
      {'label':'Livraison prévue','note':'Janvier 2027.','tag':'Prestation future'},
      {'label':'Facture finale','note':'Émise après la livraison.','tag':'2027'}
    ],
    'checks':['Vérifier que le versement est un acompte sur une prestation imposable.','Ne pas attendre la facture finale lorsque la créance fiscale est déjà née.','Rattacher le paiement anticipé à la période correcte.'],
    'legal':'Art. 40, al. 1, let. c, LTVA — paiements anticipés','sourceIds':['ltva','info12'],
    'questions':[
      {'q':'Dans ce cas, faut-il attendre la livraison de janvier 2027 pour tenir compte de l’acompte?','options':['Oui','Non'],'answer':1,'why':'Le paiement anticipé lié à la prestation future déclenche déjà le traitement TVA selon les règles de naissance de la créance fiscale.'},
      {'q':'Quelle période retient-on pour l’acompte reçu le 20.12.2026 dans le scénario présenté?','options':['S2 2026','S1 2027','Uniquement lors de la facture finale'],'answer':0,'why':'Le paiement anticipé est reçu en décembre 2026 et doit être rattaché à S2 2026 dans ce cas.'},
      {'q':'Quel document doit permettre de relier l’encaissement à la prestation future?','options':['Commande/contrat ou facture d’acompte et preuve d’encaissement','Uniquement le solde du compte bancaire annuel','Aucun document si le montant est rond'],'answer':0,'why':'La piste d’audit doit démontrer la nature du versement, la prestation concernée et sa date.'}
    ],
    'lesson':'Acompte, facture finale et exécution peuvent tomber dans des périodes différentes. Le réflexe est d’identifier le moment où la créance fiscale naît.'
  },
  {
    'id':'S3','tab':'S3 · Créance irrécouvrable','title':'Créance définitivement corrigée — rattacher la diminution à la bonne période','entity':'Conseil Romand SA','sector':'Conseil aux entreprises','location':'Vaud','period':'S2 2026','level':'Intermédiaire · correction','risk':'high','type':'quiz','accountingBasis':'Contre-prestations convenues',
    'description':'Une correction documentée de la contre-prestation ne doit ni disparaître de la piste d’audit ni être rattachée arbitrairement à la facture d’origine.',
    'mission':'Dans l’hypothèse documentée du cas, identifiez la période et l’impact fiscal de la partie de créance définitivement passée en correction de contre-prestation.',
    'clientNote':'Une facture TTC de CHF 54’050 avait été déclarée en S1 2026. CHF 32’430 ont été encaissés. En S2 2026, le solde de CHF 21’620 est définitivement passé en correction de contre-prestation sur la base d’un dossier documenté.',
    'afcNote':'Le cas ne prétend pas que toute créance en retard est automatiquement corrigible. Il suppose que la correction de la contre-prestation est établie, comptabilisée et documentée.',
    'given':[
      {'label':'Facture initiale déclarée','amount':54050,'note':'Incluse en S1 2026.','tag':'Historique'},
      {'label':'Montant encaissé','amount':32430,'note':'Paiements du client.','tag':'Banque'},
      {'label':'Correction comptabilisée en S2','amount':21620,'note':'Solde définitivement corrigé dans l’hypothèse du cas.','tag':'Correction'},
      {'label':'TDFN du dossier','note':'Conseil aux entreprises.','tag':'6,2 %'}
    ],
    'checks':['La facture initiale reste documentée.','La correction est rattachée à la période où elle est comptabilisée/constatée selon le cas.','Le montant corrigé réduit la base imposable et l’impact TDFN correspondant.'],
    'legal':'Art. 41 LTVA — modification de la contre-prestation','sourceIds':['ltva','prototype','info12'],
    'questions':[
      {'q':'Dans l’hypothèse du cas, dans quelle période la diminution doit-elle être prise en compte?','options':['Revenir silencieusement dans S1 2026','S2 2026, période de la correction documentée','Attendre la fin de l’assujettissement'],'answer':1,'why':'L’art. 41 rattache l’adaptation au moment de la correction comptabilisée ou de l’encaissement de la contre-prestation corrigée selon la situation.'},
      {'q':'Quelle rubrique du décompte matérialise ici la diminution de CHF 21’620?','options':['ch. 235','ch. 900','ch. 383'],'answer':0,'why':'Le ch. 235 sert à reporter les diminutions de contre-prestation dans la structure du décompte.'},
      {'q':'Quel est l’impact TDFN de la diminution avec un TDFN de 6,2 %?','options':['CHF 1’340.44','CHF 1’751.22','CHF 21’620'],'answer':0,'why':'CHF 21’620 × 6,2 % = CHF 1’340.44.'},
      {'q':'Quel dossier est le plus professionnel?','options':['Facture, historique des encaissements, preuve de la correction, écriture comptable et rapprochement TVA','Une note «client ne paie pas» sans autre pièce','Supprimer la facture du grand livre'],'answer':0,'why':'La correction doit rester reconstituable depuis la comptabilité et les justificatifs.'}
    ],
    'lesson':'Une correction de contre-prestation doit rester traçable: montant initial, encaissements, motif, date de correction, écriture et effet sur le décompte.'
  },
  {
    'id':'S4','tab':'S4 · Concordance','title':'Concordance comptabilité → décompte — réconcilier tous les flux','entity':'Fiduciaire Arc Léman Sàrl','sector':'Services fiduciaires','location':'Lausanne','period':'S1 2026','level':'Intermédiaire · synthèse','risk':'high','accountingBasis':'Contre-prestations convenues',
    'description':'Le décompte doit pouvoir être réconcilié avec les comptes: chiffre d’affaires brut, déductions, diminution de contre-prestation, autres flux et base TDFN.',
    'mission':'Construisez le décompte depuis les comptes et vérifiez que ch. 299 = ch. 379 avant de valider.',
    'clientNote':'Les honoraires suisses de CHF 162’150 sont la facturation brute avant un avoir de CHF 5’000. Les exportations et prestations situées à l’étranger sont documentées.',
    'afcNote':'Le TDFN de 6,2 % du dossier est déjà présent dans le profil AFC; l’exercice porte sur la concordance des rubriques.',
    'given':[
      {'label':'Honoraires suisses facturés, TTC','amount':162150,'note':'Avant l’avoir de CHF 5’000.','tag':'Suisse'},
      {'label':'Exportations documentées','amount':20000,'note':'Incluses au ch. 200 puis déduites.','tag':'220'},
      {'label':'Prestations dont le lieu est à l’étranger','amount':10000,'note':'Incluses au ch. 200 puis déduites.','tag':'221'},
      {'label':'Avoir client documenté','amount':5000,'note':'Diminution de contre-prestation.','tag':'235'},
      {'label':'Dividende reçu','amount':4000,'note':'Autre mouvement de fonds.','tag':'910'},
      {'label':'TDFN du profil AFC','note':'Services fiduciaires.','tag':'6,2 %'}
    ],
    'checks':['ch. 200 = CHF 192’150.','ch. 220 = CHF 20’000; ch. 221 = CHF 10’000; ch. 235 = CHF 5’000.','ch. 299 = CHF 157’150 et doit correspondre à la base TDFN.','ch. 910 = CHF 4’000 sans gonfler la base TDFN.'],
    'legal':'Art. 23 et 37 LTVA · structure du décompte AFC','sourceIds':['ltva','prototype','forms','afc-main'],
    'rates':[{'label':'Services fiduciaires','rate':6.2,'base':157150,'tax':9743.3}],
    'fields':{'ch200':192150,'ch910':4000},
    'deductions':{'ch220':20000,'ch221':10000,'ch235':5000},
    'explanations':{
      'ch200':'CHF 162’150 + CHF 20’000 + CHF 10’000 = CHF 192’150.',
      'ch220':'Les exportations documentées de CHF 20’000 sont déduites au ch. 220.',
      'ch221':'Les prestations situées à l’étranger de CHF 10’000 sont déduites au ch. 221.',
      'ch235':'L’avoir documenté de CHF 5’000 diminue la contre-prestation.',
      'r0base':'CHF 192’150 − 20’000 − 10’000 − 5’000 = CHF 157’150.',
      'r0tax':'CHF 157’150 × 6,2 % = CHF 9’743.30.',
      'ch910':'Le dividende de CHF 4’000 est déclaré séparément au ch. 910.'
    },
    'lesson':'Un bon décompte n’est pas seulement arithmétiquement juste: il doit se réconcilier avec les comptes de produits, les corrections et les autres flux.'
  },
  {
    'id':'S5','tab':'S5 · Échéance','title':'Décompte TDFN — délai de remise, paiement et intérêt moratoire','entity':'PME Horizon Sàrl','sector':'Services','location':'Vaud','period':'S1 2026','level':'Intermédiaire · procédure','risk':'high','type':'quiz','accountingBasis':'Contre-prestations convenues',
    'description':'La périodicité semestrielle des TDFN ne supprime ni le délai de remise ni l’échéance de paiement.',
    'mission':'Distinguez fin de période, délai de remise, échéance de paiement et conséquence d’un paiement tardif.',
    'clientNote':'L’entreprise décompte selon les TDFN. Le semestre S1 2026 se termine le 30.06.2026. Aucun rappel n’a encore été reçu.',
    'afcNote':'La TVA est un impôt fondé sur l’autodéclaration: remise et paiement ne dépendent pas de l’envoi préalable d’un rappel.',
    'given':[
      {'label':'Méthode','note':'TDFN.','tag':'Semestriel'},
      {'label':'Fin du semestre','note':'30.06.2026.','tag':'S1 2026'},
      {'label':'Délai légal de principe','note':'60 jours après la fin de la période de décompte.','tag':'60 jours'}
    ],
    'checks':['TDFN: décompte ordinairement semestriel.','Remettre le décompte dans les 60 jours suivant la fin de la période.','Acquitter la créance fiscale dans les 60 jours suivant la fin de la période.','Un paiement tardif peut générer un intérêt moratoire.'],
    'legal':'Art. 35, 71, 86 et 87 LTVA','sourceIds':['ltva','payment-interest','online'],
    'questions':[
      {'q':'Quelle est la périodicité ordinaire du décompte lorsqu’une entreprise applique les TDFN?','options':['Mensuelle','Trimestrielle','Semestrielle'],'answer':2,'why':'La LTVA prévoit le décompte semestriel pour la méthode TDFN.'},
      {'q':'Quel est le délai de principe pour remettre le décompte après la fin de la période?','options':['30 jours','60 jours','180 jours'],'answer':1,'why':'Le décompte doit être remis dans les 60 jours suivant l’expiration de la période de décompte.'},
      {'q':'Quel est le délai de principe pour acquitter la créance fiscale?','options':['60 jours après la fin de la période','Uniquement après réception d’un rappel AFC','À la clôture annuelle'],'answer':0,'why':'L’art. 86 LTVA fixe l’échéance de paiement à 60 jours après la fin de la période de décompte.'},
      {'q':'Un paiement effectué après l’échéance peut-il entraîner un intérêt moratoire même sans rappel préalable?','options':['Oui','Non'],'answer':0,'why':'L’intérêt moratoire est lié au retard de paiement; l’autodéclaration ne dépend pas d’une sommation préalable.'}
    ],
    'lesson':'Sous TDFN, pensez en semestre + 60 jours: une échéance de déclaration et une échéance de paiement à suivre activement.'
  },
  {
    'id':'T1','tab':'T1 · Dossier final — qualifier','title':'Dossier fiduciaire final — qualifier les pièces avant le décompte','entity':'Montagne 360 Sàrl','sector':'Commerce, location et atelier de sport','location':'Lausanne','period':'S1 2026','level':'Autonome','risk':'high','type':'quiz','accountingBasis':'Contre-prestations convenues',
    'description':'Aucune rubrique n’est préqualifiée dans la mission. Travaillez comme en fiduciaire à partir du journal des ventes, des pièces, du profil AFC et du relevé des autres flux.',
    'mission':'Classez les flux, identifiez les TDFN du profil AFC et préparez la structure du décompte avant tout calcul.',
    'clientNote':'Le profil AFC du client mentionne: commerce d’articles de sport hors vêtements 2,1 %, location d’articles de sport 3,7 %, travaux de réparation et service 4,5 %. Le taux légal normal est 8,1 % lorsque nécessaire.',
    'afcNote':'Le dossier contient volontairement des ventes imposables, une exportation, une diminution de contre-prestation, une acquisition étrangère et une subvention.',
    'given':[
      {'label':'Journal ventes — articles de sport hors vêtements','amount':150000,'note':'Recettes suisses TTC.','tag':'Compte 3200'},
      {'label':'Journal ventes — location','amount':50000,'note':'Recettes suisses TTC.','tag':'Compte 3410'},
      {'label':'Journal ventes — atelier/service','amount':50000,'note':'Facturation suisse TTC avant avoir.','tag':'Compte 3420'},
      {'label':'Factures export documentées','amount':20000,'note':'Exportations de biens.','tag':'Dossier export'},
      {'label':'Avoir client lié à l’atelier','amount':5000,'note':'Diminution de contre-prestation TTC.','tag':'Avoir'},
      {'label':'Licence SaaS fournisseur étranger','amount':10000,'note':'Montant net sans TVA suisse.','tag':'Facture étrangère'},
      {'label':'Subvention cantonale','amount':15000,'note':'Flux distinct des ventes.','tag':'Banque'}
    ],
    'checks':['Déterminer ce qui entre au ch. 200 avant les déductions.','Affecter chaque correction à la bonne rubrique.','Ne pas traiter l’achat SaaS comme du chiffre d’affaires.','Utiliser les TDFN du profil AFC, pas un taux moyen inventé.'],
    'legal':'Art. 23, 37 et 45 LTVA · art. 84, 86, 88 et 91 OTVA · ordonnance AFC sur les TDFN 2025','sourceIds':['ltva','otva','rates','prototype','afc-main'],
    'questions':[
      {'q':'Quels flux composent le ch. 200 avant déductions dans ce dossier?','options':['Les trois ventes suisses + les exportations','Les trois ventes suisses + le SaaS + la subvention','Uniquement les ventes suisses après l’avoir'],'answer':0,'why':'Le ch. 200 reprend le chiffre d’affaires avant les déductions; l’exportation est ensuite déduite au ch. 220.'},
      {'q':'Comment traiter les CHF 20’000 d’exportations documentées?','options':['Les inclure au ch. 200 puis les déduire au ch. 220','Les porter au ch. 900','Les intégrer à la base TDFN suisse'],'answer':0,'why':'Les exportations documentées sont incluses dans le chiffre d’affaires total puis déduites dans la rubrique correspondante.'},
      {'q':'Comment traiter l’avoir de CHF 5’000 lié à l’atelier?','options':['ch. 235 et réduction de la base de l’activité atelier','ch. 383','Aucune incidence TVA'],'answer':0,'why':'L’avoir documenté réduit la contre-prestation de l’activité concernée.'},
      {'q':'Comment traiter la licence SaaS étrangère de CHF 10’000 net dans les hypothèses du dossier?','options':['L’ajouter au ch. 200','La traiter séparément comme acquisition au taux légal, sans l’ajouter au ch. 200','L’ajouter au ch. 900'],'answer':1,'why':'L’achat étranger n’est pas du chiffre d’affaires; l’impôt sur les acquisitions est calculé séparément lorsque les conditions sont remplies.'},
      {'q':'Comment traiter la subvention cantonale de CHF 15’000 dans le scénario?','options':['Comme vente imposable au TDFN','Au ch. 900, séparément de la base TDFN','Au ch. 235'],'answer':1,'why':'Le flux est qualifié comme subvention dans le dossier et est présenté séparément des contre-prestations.'},
      {'q':'Quelle combinaison de TDFN correspond au profil AFC fourni?','options':['2,1 % / 3,7 % / 4,5 %','2,1 % / 3,0 % / 5,3 %','3,0 % / 4,5 % / 6,2 %'],'answer':0,'why':'Le profil du dossier reprend les TDFN 2025: articles hors vêtements 2,1 %, location 3,7 %, service/réparation 4,5 %.'}
    ],
    'lesson':'Dossier final: qualifier d’abord les pièces et les flux. Le calcul vient seulement après que le ch. 200, les déductions, les acquisitions et les TDFN sont justifiés.'
  },
  {
    'id':'T2','tab':'T2 · Dossier final — décompte','title':'Dossier fiduciaire final — établir et réconcilier le décompte','entity':'Montagne 360 Sàrl','sector':'Commerce, location et atelier de sport','location':'Lausanne','period':'S1 2026','level':'Autonome','risk':'high','accountingBasis':'Contre-prestations convenues',
    'description':'Suite du dossier T1. Aucun chiffre de solution n’est annoncé dans la mission: construisez le décompte complet et contrôlez la concordance.',
    'mission':'Établissez ch. 200, les déductions, les bases TDFN, l’impôt sur les acquisitions et la subvention, puis vérifiez ch. 299 = ch. 379.',
    'clientNote':'Profil AFC: articles de sport hors vêtements 2,1 %, location 3,7 %, travaux de réparation et service 4,5 %. Taux légal de l’acquisition étrangère: 8,1 %.',
    'afcNote':'Les mêmes pièces que dans T1 sont utilisées. Le but est de passer de la qualification au décompte chiffré sans donnée préremplie.',
    'given':[
      {'label':'Articles de sport hors vêtements — Suisse','amount':150000,'note':'Recettes TTC.','tag':'Ventes'},
      {'label':'Location — Suisse','amount':50000,'note':'Recettes TTC.','tag':'Ventes'},
      {'label':'Atelier/service — Suisse avant avoir','amount':50000,'note':'Recettes TTC.','tag':'Ventes'},
      {'label':'Exportations documentées','amount':20000,'note':'Incluses au ch. 200 puis déduites.','tag':'Export'},
      {'label':'Avoir lié à l’atelier','amount':5000,'note':'Diminution TTC.','tag':'Avoir'},
      {'label':'Licence SaaS étrangère','amount':10000,'note':'Base nette de l’acquisition.','tag':'HT'},
      {'label':'Subvention cantonale','amount':15000,'note':'À présenter séparément selon le dossier.','tag':'Subvention'}
    ],
    'checks':['ch. 200 reprend CHF 270’000 avant déductions.','ch. 220 = CHF 20’000 et ch. 235 = CHF 5’000.','Les bases TDFN totalisent CHF 245’000: 150’000 + 50’000 + 45’000.','Le SaaS est déclaré séparément au ch. 383 à 8,1 %.','La subvention est reportée au ch. 900 et ne gonfle pas la base TDFN.'],
    'legal':'Art. 23, 37 et 45 LTVA · art. 84, 88 et 91 OTVA · prototype AFC','sourceIds':['ltva','otva','rates','prototype','afc-main'],
    'rates':[
      {'label':'Articles de sport hors vêtements','rate':2.1,'base':150000,'tax':3150},
      {'label':'Location d’articles de sport','rate':3.7,'base':50000,'tax':1850},
      {'label':'Atelier / travaux de réparation et service','rate':4.5,'base':45000,'tax':2025}
    ],
    'fields':{'ch200':270000,'acqBase':10000,'acqTax':810,'ch900':15000},
    'deductions':{'ch220':20000,'ch235':5000},
    'explanations':{
      'ch200':'CHF 150’000 + 50’000 + 50’000 + 20’000 = CHF 270’000 avant déductions.',
      'ch220':'Les exportations documentées de CHF 20’000 sont déduites au ch. 220.',
      'ch235':'L’avoir atelier de CHF 5’000 est porté au ch. 235.',
      'r0base':'Articles hors vêtements: CHF 150’000.',
      'r0tax':'CHF 150’000 × 2,1 % = CHF 3’150.',
      'r1base':'Location: CHF 50’000.',
      'r1tax':'CHF 50’000 × 3,7 % = CHF 1’850.',
      'r2base':'Atelier: CHF 50’000 − CHF 5’000 = CHF 45’000.',
      'r2tax':'CHF 45’000 × 4,5 % = CHF 2’025.',
      'acqBase':'La licence étrangère de CHF 10’000 n’entre pas au ch. 200.',
      'acqTax':'CHF 10’000 × 8,1 % = CHF 810.',
      'ch900':'La subvention de CHF 15’000 est reportée séparément au ch. 900.'
    },
    'lesson':'Le décompte final doit être reconstituable: ch. 299 = CHF 245’000, bases TDFN = CHF 245’000, dette TDFN CHF 7’025, acquisition CHF 810, soit ch. 399 CHF 7’835 avant autres corrections.'
  }
]

existing_ids = {c.get('id') for c in cases}
for nc in new_cases:
    if nc['id'] in existing_ids:
        raise RuntimeError(f'Le cas {nc["id"]} existe déjà; arrêt pour éviter un doublon.')
q_index = next((i for i,c in enumerate(cases) if c.get('id') == 'Q'), None)
if q_index is None:
    raise RuntimeError('Cas Q introuvable')
cases[q_index:q_index] = new_cases

# Write CASES back, preserving rest of data.js.
new_case_json = json.dumps(cases, ensure_ascii=False, indent=2)
data = data[:array_start] + new_case_json + data[end:]
data = data.replace('// Données intégrées — version 15.0.0', '// Données intégrées — version 16.1.0', 1)
data = data.replace('// Données des cas', '// Données des cas\n// v16-final-content · 12.08.2026', 1) if '// Données des cas' in data else '// v16-final-content · 12.08.2026\n' + data

# ---------- Final module architecture ----------
modules_block = '''export const MODULES = [
  {
    label: '1 · Admissibilité TDFN', track: 'Parcours essentiel', level: 'Débutant', ids: ['J1', 'J2', 'J3'],
    objectives: ['Vérifier l’accès initial aux TDFN', 'Suivre correctement les dépassements', 'Distinguer TDFN et décompte annuel']
  },
  {
    label: '2 · Comprendre la méthode', track: 'Parcours essentiel', level: 'Débutant', ids: ['A', 'B', 'C'],
    objectives: ['Distinguer taux légal et TDFN', 'Passer de HT à TTC lorsque nécessaire', 'Calculer la dette TDFN sur la bonne base']
  },
  {
    label: '3 · Plusieurs activités', track: 'Parcours essentiel', level: 'Intermédiaire', ids: ['D', 'D1', 'D2'],
    objectives: ['Ventiler le chiffre d’affaires par activité', 'Appliquer plusieurs TDFN confirmés', 'Regrouper les activités qui partagent le même TDFN']
  },
  {
    label: '4 · Règle des 10 %', track: 'Parcours essentiel', level: 'Intermédiaire', ids: ['D4', 'E', 'F'],
    objectives: ['Distinguer 10,0 % de plus de 10 %', 'Traiter une nouvelle activité', 'Appliquer la règle sur trois périodes fiscales pour une activité établie']
  },
  {
    label: '5 · International et synthèse', track: 'Parcours essentiel', level: 'Intermédiaire', ids: ['G', 'H', 'I', 'D3'],
    objectives: ['Distinguer exportation et prestation à l’étranger', 'Traiter l’impôt sur les acquisitions', 'Combiner plusieurs TDFN avec une opération internationale']
  },
  {
    label: '6 · Travail courant en fiduciaire', track: 'Parcours essentiel', level: 'Intermédiaire', ids: ['L', 'O', 'S1', 'S2', 'S3', 'S4', 'S5', 'R'],
    objectives: ['Rattacher les opérations à la bonne période', 'Traiter acomptes, diminutions et autres flux', 'Réconcilier comptabilité et décompte', 'Suivre remise, paiement et rectification']
  },
  {
    label: '7 · Méthode effective → TDFN', track: 'Parcours avancé', level: 'Avancé', ids: ['K0', 'K1', 'K2', 'K3', 'K4', 'K5'],
    objectives: ['Vérifier si le changement est possible', 'Calculer les corrections de valeur résiduelle', 'Compléter correctement le ch. 415']
  },
  {
    label: '8 · TDFN → méthode effective', track: 'Parcours avancé', level: 'Avancé', ids: ['L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'],
    objectives: ['Identifier les éléments ouvrant un dégrèvement ultérieur', 'Tenir compte de la part résiduelle et du droit à déduction', 'Compléter correctement le ch. 410']
  },
  {
    label: '9 · Procédures particulières', track: 'Parcours avancé', level: 'Avancé', ids: ['N', 'M', 'P'],
    objectives: ['Vérifier si une option est admissible sous TDFN', 'Qualifier une reprise de patrimoine avant toute correction', 'Saisir une charge fiscale au ch. 415 avec le bon signe']
  },
  {
    label: '10 · Dossier fiduciaire final', track: 'Mise en situation', level: 'Autonome', ids: ['T1', 'T2'],
    objectives: ['Qualifier un dossier non prérempli', 'Construire un décompte complet depuis les pièces', 'Réconcilier rubriques, TDFN et acquisitions']
  },
  {
    label: '11 · Atelier libre', track: 'Atelier autonome', level: 'Autonome', ids: ['Q'],
    objectives: ['Reproduire un décompte déjà paramétré par l’AFC', 'Contrôler la cohérence arithmétique', 'Conserver une piste d’audit exploitable']
  }
];'''
mod_start = app.find('export const MODULES = [')
mod_end = app.find('];\nconst casePublicId', mod_start)
if mod_start < 0 or mod_end < 0:
    raise RuntimeError('Bloc MODULES introuvable dans app.js')
app = app[:mod_start] + modules_block + app[mod_end+2:]

# Cache bust to 16.1.0
index = re.sub(r'styles\.css\?v=\d+\.\d+\.\d+', 'styles.css?v=16.1.0', index, count=1)
index = re.sub(r'app\.js\?v=\d+\.\d+\.\d+', 'app.js?v=16.1.0', index, count=1)

# ---------- Pedagogy for the new everyday cases ----------
ped_entries = '''  S1:{difficulty:'Intermédiaire',kind:'Période',theory:'Le mode de décompte détermine le moment où une contre-prestation entre dans le décompte. Le mode «convenues» est la règle de base; le mode «reçues» est soumis à autorisation.',example:'Exemple distinct: facture émise le 28 juin et encaissée le 5 juillet. Sous convenues, la facturation rattache l’opération à la première période; sous reçues autorisées, l’encaissement devient déterminant.'},
  S2:{difficulty:'Intermédiaire',kind:'Période',theory:'Un paiement anticipé lié à une prestation imposable doit être identifié séparément de la facture finale et de la date d’exécution.',example:'Exemple distinct: acompte reçu le 15 décembre pour une prestation de février. La piste d’audit doit relier le paiement à la prestation future et déterminer le moment de naissance de la créance fiscale.'},
  S3:{difficulty:'Intermédiaire',kind:'Correction',theory:'Une modification documentée de la contre-prestation adapte la base imposable au moment prévu par l’art. 41 LTVA. Une simple créance en retard ne suffit pas: la correction doit être établie.',example:'Exemple distinct: rabais commercial de CHF 2’000 accordé et comptabilisé après la facture initiale. La correction reste liée à la facture d’origine tout en étant prise en compte dans la période déterminante de la modification.'},
  S4:{difficulty:'Intermédiaire',kind:'Concordance',theory:'La qualité d’un décompte se contrôle par la concordance entre les comptes, le ch. 200, les déductions et les bases TDFN. Toute différence doit pouvoir être expliquée par une rubrique ou une pièce.',example:'Exemple distinct: ch. 200 CHF 100’000 moins export CHF 10’000 et avoir CHF 5’000 → ch. 299 CHF 85’000. Les bases TDFN doivent totaliser exactement CHF 85’000.'},
  S5:{difficulty:'Intermédiaire',kind:'Procédure',theory:'Sous TDFN, le décompte est semestriel, mais la remise et le paiement restent soumis à des échéances précises. Un retard de paiement peut générer un intérêt moratoire.',example:'Exemple distinct: une période se termine à une date donnée; le calendrier interne doit déclencher la préparation suffisamment tôt pour respecter le délai légal de 60 jours sans attendre un rappel.'}'''
ped_start = ped.find('export const CASE_PEDAGOGY = {')
ped_end = ped.find('};\nexport const SHOW_CONTRAST', ped_start)
if ped_start < 0 or ped_end < 0:
    raise RuntimeError('CASE_PEDAGOGY introuvable')
pre = ped[:ped_end].rstrip()
if not pre.endswith(','):
    pre += ','
ped = pre + '\n' + ped_entries + '\n' + ped[ped_end:]

practice_entries = '''  S1:[{citation:'LTVA — modes de décompte et naissance de la créance',sourceId:'ltva'}],
  S2:[{citation:'LTVA — paiement anticipé et naissance de la créance',sourceId:'ltva'}],
  S3:[{citation:'Prototype AFC — diminution de contre-prestation, ch. 235',sourceId:'prototype'}],
  S4:[{citation:'Prototype AFC — concordance ch. 200 / 299 / 379',sourceId:'prototype'}],
  S5:[{citation:'AFC — paiement et intérêt moratoire',sourceId:'payment-interest'}]'''
cp_start = ped.find('export const CASE_PRACTICE = {')
cp_end = ped.rfind('};')
if cp_start < 0 or cp_end < cp_start:
    raise RuntimeError('CASE_PRACTICE introuvable')
pre = ped[:cp_end].rstrip()
if not pre.endswith(','):
    pre += ','
ped = pre + '\n' + practice_entries + '\n' + ped[cp_end:]
ped = ped.replace('// Couche pédagogique — version 15.0.0', '// Couche pédagogique — version 16.1.0', 1)

# ---------- Legal anchors ----------
legal_entries = '''  S1:{skill:'Rattacher une facture à la bonne période selon le mode de décompte autorisé.',refs:[{citation:'art. 39, al. 1–2, LTVA',sourceId:'ltva',note:'Le mode convenues est la règle; le mode reçues est soumis à autorisation.'},{citation:'art. 40, al. 1–2, LTVA',sourceId:'ltva',note:'La naissance de la créance dépend du mode de décompte.'}]},
  S2:{skill:'Identifier la naissance de la créance fiscale lors d’un paiement anticipé.',refs:[{citation:'art. 40, al. 1, let. c, LTVA',sourceId:'ltva',note:'Les paiements anticipés sont traités au moment prévu par la loi.'}]},
  S3:{skill:'Traiter une correction documentée de la contre-prestation dans la bonne période.',refs:[{citation:'art. 41, al. 1, LTVA',sourceId:'ltva',note:'La modification de la contre-prestation entraîne une adaptation de la dette fiscale.'},{citation:'décompte AFC — ch. 235',sourceId:'prototype',note:'La diminution de contre-prestation est reportée dans la rubrique prévue.'}]},
  S4:{skill:'Réconcilier les comptes avec ch. 200, les déductions, ch. 299 et les bases TDFN.',refs:[{citation:'art. 37, al. 2–3, LTVA',sourceId:'ltva',note:'La dette TDFN est calculée sur les contre-prestations TVA comprise.'},{citation:'décompte AFC — ch. 200 à 379',sourceId:'prototype',note:'La structure du formulaire permet la concordance entre chiffre d’affaires et calcul TDFN.'}]},
  S5:{skill:'Suivre correctement la périodicité, la remise, le paiement et l’intérêt moratoire.',refs:[{citation:'art. 35, al. 1, LTVA',sourceId:'ltva',note:'Les TDFN sont décomptés semestriellement.'},{citation:'art. 71, al. 1, LTVA',sourceId:'ltva',note:'Le décompte doit être remis dans les 60 jours.'},{citation:'art. 86, al. 1 et art. 87, al. 1, LTVA',sourceId:'ltva',note:'La créance doit être payée dans les 60 jours; un retard peut générer un intérêt moratoire.'}]},
  T1:{skill:'Qualifier un dossier complet avant de construire le décompte.',refs:[{citation:'art. 23, 37 et 45 LTVA',sourceId:'ltva',note:'Exportations, TDFN et acquisitions répondent à des mécanismes distincts.'},{citation:'art. 84, 88 et 91 OTVA',sourceId:'otva',note:'Plusieurs activités TDFN et impôt sur les acquisitions doivent être ventilés selon les règles applicables.'},{citation:'ordonnance AFC sur la valeur des TDFN',sourceId:'rates',note:'Les TDFN du profil doivent correspondre aux activités réelles.'}]},
  T2:{skill:'Établir puis réconcilier un décompte TDFN complet depuis les pièces comptables.',refs:[{citation:'art. 37, al. 2–3, LTVA',sourceId:'ltva',note:'Calcul de la dette selon les TDFN.'},{citation:'art. 45 LTVA',sourceId:'ltva',note:'L’impôt sur les acquisitions est traité séparément de la dette TDFN.'},{citation:'art. 91 OTVA',sourceId:'otva',note:'L’ordonnance précise le traitement des acquisitions sous TDFN.'},{citation:'décompte AFC — ch. 200 à 399 et 900',sourceId:'prototype',note:'Les rubriques du formulaire doivent rester concordantes.'}]}'''
leg_start = legal.find('export const LEGAL_BASIS = {')
leg_end = legal.rfind('};')
if leg_start < 0 or leg_end < leg_start:
    raise RuntimeError('LEGAL_BASIS introuvable')
pre = legal[:leg_end].rstrip()
if not pre.endswith(','):
    pre += ','
legal = pre + '\n' + legal_entries + '\n' + legal[leg_end:]
legal = legal.replace('// Ancrage juridique par cas — version 15.0.0', '// Ancrage juridique par cas — version 16.1.0', 1)

# ---------- Small final UX marker ----------
if '/* v16.1 final */' not in styles:
    styles = styles.rstrip() + '''\n\n/* v16.1 final */\n.module-complete p{line-height:1.55}\n@media(max-width:700px){.calculator-context-list{gap:5px}}\n'''

# ---------- Validate counts / expected values ----------
assert len(cases) == 44, f'Nombre total attendu 44, obtenu {len(cases)}'
assert sum(1 for c in cases if not c.get('excludeFromProgress')) == 43
assert len(get_case(cases,'D3')['rates']) == 4
assert abs(sum(r['tax'] for r in get_case(cases,'T2')['rates']) - 7025) < 0.001

# Write all files only after successful transformations.
index_path.write_text(index, encoding='utf-8')
app_path.write_text(app, encoding='utf-8')
styles_path.write_text(styles, encoding='utf-8')
data_path.write_text(data, encoding='utf-8')
ped_path.write_text(ped, encoding='utf-8')
legal_path.write_text(legal, encoding='utf-8')

print('OK — TVA TDFN v16.1 finale appliquée.')
print('Résultat: 44 cas au total · 43 évalués · 1 atelier libre.')
print('Module 6: 8 cas de travail courant en fiduciaire.')
print('Module 10: dossier fiduciaire final T1 + T2.')
print('Correction incluse: TDFN sport 2025 (D, D3, E, F).')
print('Pour mesurer les visites, utilisez ensuite SETUP-ANALYTICS.cmd.')
