export const OFFICIAL_SOURCES = [
  {id:'prototype',title:'AFC — Prototype de décompte TVA en ligne (TDFN)',scope:'Structure des rubriques 200 à 910 et fenêtre officielle «Calcul»',url:'https://www.estv2.admin.ch/mwst/formulare/mwst-form-abr-muster-sss-fr.pdf',status:'Modèle administratif officiel'},
  {id:'ltva',title:'LTVA — RS 641.20',scope:'Base légale de la TVA, notamment art. 8, 23, 37, 38 et 45 ss',url:'https://www.fedlex.admin.ch/eli/cc/2009/615/fr',status:'Droit fédéral'},
  {id:'afc-main',title:'AFC — TDFN et taux forfaitaires',scope:'Principe TTC, limites, exemple architecte, changements de méthode',url:'https://www.estv.admin.ch/fr/tva-taux-de-la-dette-fiscale-nette-et-taux-forfaitaires',status:'Source pratique officielle'},
  {id:'otva',title:'OTVA — RS 641.201',scope:'Art. 77 à 91, notamment attribution et règle des 10 %',url:'https://www.fedlex.admin.ch/eli/cc/2009/828/fr',status:'Droit fédéral'},
  {id:'rates',title:'Ordonnance AFC sur la valeur des TDFN — RS 641.202.62',scope:'TDFN par branche et activité dès 01.01.2025',url:'https://www.fedlex.admin.ch/eli/cc/2024/500/fr',status:'Droit fédéral'},
  {id:'changes',title:'AFC — modifications des TDFN au 01.01.2025',scope:'Table de correspondance des anciennes et nouvelles activités/taux',url:'https://www.estv.admin.ch/dam/fr/sd-web/WbNBDFahZQYD/mwst-publ-sss-aenderungen-2025-1-fr.pdf',status:'Publication AFC'},
  {id:'info12',title:'Info TVA 12 — TDFN',scope:'Conditions, adhésion, changement de méthode, cas particuliers',url:'https://www.gate.estv.admin.ch/mwst-webpublikationen/public/IT/12',status:'Publication AFC'},
  {id:'forms',title:'AFC — formulaires TVA',scope:'Rubriques du décompte et dépôt dans le Portail AFC',url:'https://www.estv.admin.ch/fr/formulaires-tva',status:'Source administrative'},
  {id:'info12-154',title:'Info TVA 12, ch. 15.4 — règle des 10 %',scope:'Trois périodes consécutives, quatrième période et regroupement par TDFN',url:'https://www.gate.estv.admin.ch/mwst-webpublikationen/public/pages/taxInfos/cipherDisplay.xhtml?componentId=1005406&publicationId=1004992',status:'Pratique AFC publiée le 31.03.2025'}
];

export const DEDUCTIONS = [
  {key:'ch220',code:'220',label:'Prestations exonérées',help:'Notamment exportations documentées au sens de l’art. 23 LTVA'},
  {key:'ch221',code:'221',label:'Prestations fournies à l’étranger',help:'Lieu de la prestation situé à l’étranger'},
  {key:'ch225',code:'225',label:'Transferts par procédure de déclaration',help:'Lorsque la procédure de déclaration s’applique'},
  {key:'ch230',code:'230',label:'Prestations exclues du champ de l’impôt',help:'Sans option dans le cas concerné'},
  {key:'ch235',code:'235',label:'Diminutions de la contre-prestation',help:'Rabais, escomptes et autres diminutions documentées'},
  {key:'ch280',code:'280',label:'Divers',help:'Autres déductions admises et documentées'}
];

const baseSources = ['afc-main','otva','rates','prototype'];
export const CASES = [
  {
    id:'A',tab:'A · Base TTC',title:'Architecte — appliquer le TDFN au montant TTC',entity:'Atelier Horizon Sàrl',sector:'Architecture',location:'Lausanne',period:'S1 2026',level:'Fondamentaux',risk:'low',
    description:'Le premier réflexe consiste à partir du chiffre d’affaires brut TVA comprise.',mission:'Saisissez le chiffre d’affaires au ch. 200, reportez la base imposable au premier TDFN et calculez la dette à 6,2 %.',
    clientNote:'Les factures d’honoraires indiquent le taux légal de 8,1 %.',afcNote:'Le décompte applique le TDFN de 6,2 % au chiffre d’affaires brut TTC.',
    given:[{label:'Honoraires encaissés, TVA comprise',amount:400000,note:'Montant brut du semestre.',tag:'TTC'},{label:'TDFN autorisé dans le cas',note:'Exemple officiel AFC pour un architecte.',tag:'6,2 %'}],
    checks:['La base TDFN est TVA comprise.','Le TDFN ne figure pas sur la facture client.','L’impôt préalable réel n’est pas déduit séparément.'],legal:'Art. 37 LTVA · exemple architecte AFC',sourceIds:baseSources,
    rates:[{label:'Architecture',rate:6.2,base:400000,tax:24800}],fields:{ch200:400000},deductions:{},
    explanations:{ch200:'Le ch. 200 reprend CHF 400’000 de contre-prestations.',r0base:'La base TTC est reportée au premier TDFN.',r0tax:'CHF 400’000 × 6,2 % = CHF 24’800.'},lesson:'Le TDFN sert au décompte avec l’AFC; le taux légal reste celui de la facture client.',diagnostics:{r0base:{100000:'Vous avez probablement utilisé un montant hors taxe au lieu du chiffre d’affaires TTC.'}}
  },
  {
    id:'B',tab:'B · HT/TTC',title:'Agence web — reconstruire la base TTC',entity:'Pixel Léman Sàrl',sector:'Webdesign et services internet',location:'Renens',period:'S1 2026',level:'Fondamentaux',risk:'medium',
    description:'Une multiplication correcte donne un mauvais décompte si la base reste hors taxe.',mission:'Reconstituez le total TTC, puis utilisez-le au ch. 200 et au premier TDFN.',
    clientNote:'CHF 100’000 HT + TVA légale de 8,1 % = CHF 108’100 TTC.',afcNote:'Le cas suppose que le TDFN de 6,2 % a été attribué à l’activité décrite.',
    given:[{label:'Honoraires facturés hors taxe',amount:100000,note:'Prestations au taux légal normal.',tag:'HT'},{label:'TVA facturée',amount:8100,note:'8,1 % de CHF 100’000.',tag:'TVA'},{label:'Total facturé',amount:108100,note:'Base de calcul TDFN.',tag:'TTC'}],
    checks:['CHF 100’000 HT n’est pas la base TDFN.','Le TDFN ne remplace pas 8,1 % sur les factures.','La qualification exacte de l’activité reste à contrôler.'],legal:'Art. 37, al. 2, LTVA · ordonnance AFC sur les TDFN',sourceIds:baseSources,
    rates:[{label:'Services internet / webdesign — hypothèse du cas',rate:6.2,base:108100,tax:6702.2}],fields:{ch200:108100},deductions:{},
    explanations:{ch200:'CHF 100’000 + CHF 8’100 = CHF 108’100 TTC.',r0base:'La base du premier TDFN est CHF 108’100.',r0tax:'CHF 108’100 × 6,2 % = CHF 6’702.20.'},lesson:'Séparer la construction de la facture et le calcul simplifié de la dette fiscale.',diagnostics:{ch200:{100000:'Le montant saisi correspond au chiffre d’affaires HT; le ch. 200 doit reprendre le total TTC.'},r0base:{100000:'La base TDFN doit être TTC.'}}
  },
  {
    id:'C',tab:'C · Hôtel',title:'Hôtel — distinguer taux légaux et TDFN',entity:'Hôtel du Rivage SA',sector:'Hôtellerie et restauration',location:'Montreux',period:'S1 2026',level:'Application',risk:'low',
    description:'Les taux légaux de 3,8 % et 8,1 % ne sont pas les TDFN du décompte.',mission:'Convertissez les montants HT en TTC et ventilez la base entre hébergement et restauration.',
    clientNote:'Hébergement avec petit-déjeuner: 3,8 %. Restauration: 8,1 %.',afcNote:'Le cas utilise 2,1 % pour l’hébergement et 5,3 % pour les prestations hôtelières au taux normal.',
    given:[{label:'Nuitées avec petit-déjeuner',amount:100000,note:'Hors taxe, taux légal spécial 3,8 %.',tag:'HT'},{label:'Nuitées TVA comprise',amount:103800,note:'Base TDFN de l’hébergement.',tag:'TTC'},{label:'Restaurant',amount:40000,note:'Hors taxe, taux légal normal 8,1 %.',tag:'HT'},{label:'Restaurant TVA comprise',amount:43240,note:'Base TDFN de la restauration.',tag:'TTC'}],
    checks:['Le ch. 200 totalise les deux montants TTC.','Chaque activité est rattachée à son TDFN.','La comptabilité permet la ventilation des produits.'],legal:'Art. 25 LTVA · ordonnance AFC sur la valeur des TDFN',sourceIds:baseSources,
    rates:[{label:'Hébergement avec petit-déjeuner',rate:2.1,base:103800,tax:2179.8},{label:'Prestations hôtelières au taux normal',rate:5.3,base:43240,tax:2291.72}],fields:{ch200:147040},deductions:{},
    explanations:{ch200:'CHF 103’800 + CHF 43’240 = CHF 147’040.',r0base:'CHF 100’000 HT deviennent CHF 103’800 TTC.',r0tax:'CHF 103’800 × 2,1 % = CHF 2’179.80.',r1base:'CHF 40’000 HT deviennent CHF 43’240 TTC.',r1tax:'CHF 43’240 × 5,3 % = CHF 2’291.72.'},lesson:'La ventilation suit les activités et les TDFN autorisés, pas seulement les taux légaux facturés.'
  },
  {
    id:'D',tab:'D · 4 TDFN',title:'Magasin de sport — quatre activités dès 2025',entity:'Montagne Active SA',sector:'Commerce, location et atelier',location:'Fribourg',period:'S1 2026',level:'Intermédiaire',risk:'high',
    description:'La réforme 2025 sépare notamment les articles, les vêtements, la location et la réparation.',mission:'Ventilez CHF 300’000 TTC entre quatre activités et calculez la dette avec les taux actuels.',
    clientNote:'Les factures suivent les taux légaux applicables aux biens ou prestations.',afcNote:'Les TDFN du cas sont ceux de l’ordonnance AFC en vigueur dès le 01.01.2025.',
    given:[{label:'Articles de sport neufs, hors vêtements',amount:150000,note:'Commerce de biens neufs.',tag:'2,1 %'},{label:'Vêtements de sport neufs',amount:45000,note:'Activité séparée dès 2025.',tag:'3,0 %'},{label:'Location d’articles de sport',amount:45000,note:'TDFN actuel de la location.',tag:'3,7 %'},{label:'Réparation et service',amount:60000,note:'TDFN actuel de l’atelier.',tag:'4,5 %'},{label:'Total TVA comprise',amount:300000,note:'Comptabilisation séparée par activité.',tag:'TTC'}],
    checks:['Les vêtements ne sont pas mélangés aux autres articles.','Chaque activité dépasse 10 % dans ce cas.','Les bases totalisent exactement CHF 300’000.'],legal:'Art. 84 à 88 OTVA · ordonnance AFC RS 641.202.62 dès 2025',sourceIds:['otva','rates','changes'],
    rates:[{label:'Articles de sport, hors vêtements',rate:2.1,base:150000,tax:3150},{label:'Vêtements de sport',rate:3.0,base:45000,tax:1350},{label:'Location d’articles de sport',rate:3.7,base:45000,tax:1665},{label:'Réparation et service',rate:4.5,base:60000,tax:2700}],fields:{ch200:300000},deductions:{},
    explanations:{ch200:'Le ch. 200 reprend CHF 300’000 TTC.',r0base:'Articles hors vêtements: CHF 150’000.',r0tax:'CHF 150’000 × 2,1 % = CHF 3’150.',r1base:'Vêtements: CHF 45’000.',r1tax:'CHF 45’000 × 3,0 % = CHF 1’350.',r2base:'Location: CHF 45’000.',r2tax:'CHF 45’000 × 3,7 % = CHF 1’665.',r3base:'Réparation: CHF 60’000.',r3tax:'CHF 60’000 × 4,5 % = CHF 2’700.'},lesson:'Une dénomination commerciale générale ne suffit pas: les produits doivent être séparés selon l’activité et le TDFN actuels.'
  },
  {
    id:'E',tab:'E · 10 % nouveau',title:'Nouvelle activité — test prospectif des 10 %',entity:'Glisse & Vélo SA',sector:'Commerce et services',location:'Neuchâtel',period:'Prévision des 12 premiers mois',level:'Intermédiaire',risk:'medium',type:'quiz',
    description:'Pour une nouvelle activité, le test s’appuie sur les chiffres d’affaires attendus des douze premiers mois.',mission:'Calculez les parts et déterminez quelle activité dépasse strictement 10 %.',
    clientNote:'Le seuil concerne l’attribution des TDFN, non le taux légal de facturation.',afcNote:'Les activités soumises au même TDFN sont additionnées pour le test.',
    given:[{label:'Commerce d’articles hors vêtements',amount:192000,note:'Activité principale.',tag:'2,1 %'},{label:'Location',amount:26400,note:'Nouvelle activité prévue.',tag:'3,7 %'},{label:'Réparation',amount:21600,note:'Nouvelle activité prévue.',tag:'4,5 %'},{label:'Total imposable TTC',amount:240000,note:'Base de comparaison.',tag:'100 %'}],
    checks:['Le seuil est dépassé seulement au-dessus de 10 %.','La prévision couvre les douze premiers mois.','Les activités au même TDFN sont regroupées.'],legal:'Art. 86, al. 2, let. a et al. 3, OTVA',sourceIds:['otva','changes'],
    questions:[{q:'Quelle part représente la location?',options:['9 %','10 %','11 %','12 %'],answer:2,why:'CHF 26’400 / CHF 240’000 = 11 %.'},{q:'Quelle part représente la réparation?',options:['8 %','9 %','10 %','11 %'],answer:1,why:'CHF 21’600 / CHF 240’000 = 9 %.'},{q:'Quelle activité dépasse strictement 10 %?',options:['La location uniquement','La réparation uniquement','Les deux','Aucune'],answer:0,why:'La location atteint 11 %, alors que la réparation reste à 9 %.'}],lesson:'Pour un nouvel assujetti ou une nouvelle activité, la référence est la prévision des douze premiers mois.'
  },
  {
    id:'F',tab:'F · 10 % établi',title:'Entreprise existante — trois périodes puis effet en quatrième période',entity:'Sport Services SA',sector:'Commerce et atelier',location:'Bienne',period:'Périodes fiscales 2025–2027 · effet au 01.01.2028',level:'Avancé',risk:'high',type:'quiz',
    description:'Pour une entreprise existante, un dépassement devient régulier seulement lorsqu’il se produit durant trois périodes fiscales consécutives.',mission:'Examinez 2025, 2026 et 2027, regroupez les activités soumises au même TDFN et déterminez le traitement dès 2028.',
    clientNote:'Les pourcentages sont déjà calculés sur le chiffre d’affaires imposable total de chaque période.',afcNote:'Si la part dépasse 10 % pendant trois périodes consécutives, le TDFN supplémentaire est demandé à partir de la quatrième période.',
    given:[{label:'Location à 3,7 %',amount:null,note:'Parts: 12 % en 2025, 11 % en 2026, 9 % en 2027.',tag:'3 périodes'},{label:'Réparations',amount:null,note:'6 % en 2025, 2026 et 2027.',tag:'4,5 %'},{label:'Service skis / snowboards',amount:null,note:'5 % en 2025, 2026 et 2027.',tag:'4,5 %'},{label:'Groupe des activités à 4,5 %',amount:null,note:'6 % + 5 % = 11 % durant chacune des trois périodes.',tag:'Agrégation'}],
    checks:['Les trois périodes doivent être consécutives.','La part doit être strictement supérieure à 10 % dans chacune.','La conséquence intervient au début de la quatrième période.'],legal:'Art. 86, al. 2 à 4, OTVA · Info TVA 12, ch. 15.4',sourceIds:['otva','rates','info12-154'],
    questions:[{q:'La location justifie-t-elle un TDFN supplémentaire dès 2028?',options:['Oui, car elle a dépassé 10 % deux fois','Non, car elle tombe à 9 % en 2027','Oui, car sa moyenne sur trois ans dépasse 10 %'],answer:1,why:'La part doit dépasser 10 % dans chacune des trois périodes consécutives; 9 % en 2027 rompt la série.'},{q:'Faut-il regrouper réparations et service skis?',options:['Oui, car les deux relèvent du TDFN de 4,5 %','Non, chaque libellé est toujours testé isolément'],answer:0,why:'Les chiffres d’affaires des activités auxquelles s’applique le même TDFN sont toujours additionnés pour le test.'},{q:'Quelle conséquence s’applique au groupe à 4,5 %?',options:['Demander/appliquer le TDFN à partir du 01.01.2028','Corriger rétroactivement les décomptes 2025 à 2027','Attendre encore trois périodes'],answer:0,why:'Le groupe représente 11 % pendant trois périodes consécutives; la conséquence intervient dès la quatrième période, soit 2028.'}],lesson:'La règle combine un seuil strict, trois périodes consécutives, l’agrégation par TDFN et un effet à compter de la quatrième période.'
  },
  {
    id:'G',tab:'G · Export',title:'Exportation de biens — déduction au ch. 220',entity:'Alpina Outdoor Sàrl',sector:'Commerce d’articles de sport',location:'Sion',period:'S1 2026',level:'Intermédiaire',risk:'medium',
    description:'Le chiffre d’affaires exporté apparaît d’abord au ch. 200 puis est déduit au ch. 220.',mission:'Déclarez le chiffre d’affaires mondial, déduisez les exportations documentées et calculez le TDFN sur les ventes suisses.',
    clientNote:'Les exportations prouvées sont exonérées au sens de l’art. 23 LTVA.',afcNote:'L’ancienne mise en compte par formulaire 1050 n’est plus utilisée depuis 2025.',
    given:[{label:'Ventes suisses, TVA comprise',amount:81000,note:'Commerce d’articles de sport hors vêtements.',tag:'TTC'},{label:'Exportations documentées',amount:50000,note:'Incluses au ch. 200 puis déduites au ch. 220.',tag:'Export'},{label:'TDFN du cas',note:'Articles de sport hors vêtements.',tag:'2,1 %'}],
    checks:['ch. 200 = CHF 131’000.','ch. 220 = CHF 50’000.','La base imposable reste CHF 81’000.'],legal:'Art. 23 LTVA · structure des rubriques du décompte',sourceIds:['afc-main','rates','forms'],
    rates:[{label:'Ventes suisses d’articles de sport',rate:2.1,base:81000,tax:1701}],fields:{ch200:131000},deductions:{ch220:50000},
    explanations:{ch200:'CHF 81’000 + CHF 50’000 = CHF 131’000.',ch220:'Les exportations documentées sont déduites au ch. 220.',r0base:'CHF 131’000 − CHF 50’000 = CHF 81’000.',r0tax:'CHF 81’000 × 2,1 % = CHF 1’701.'},lesson:'Le chiffre d’affaires exonéré est déclaré puis déduit dans la rubrique appropriée.'
  },
  {
    id:'H',tab:'H · Lieu étranger',title:'Prestation située à l’étranger — ch. 221',entity:'Léman Conseil Sàrl',sector:'Conseil aux entreprises',location:'Genève',period:'S1 2026',level:'Intermédiaire',risk:'medium',
    description:'Le ch. 200 est plus large que le chiffre d’affaires imposable en Suisse.',mission:'Déclarez les contre-prestations totales, déduisez les prestations dont le lieu est à l’étranger et calculez la dette sur le solde.',
    clientNote:'Le lieu de la prestation doit être qualifié avant de conclure qu’aucune TVA suisse n’est due.',afcNote:'Le cas suppose que CHF 30’000 relèvent correctement du ch. 221.',
    given:[{label:'Conseil imposable en Suisse, TVA comprise',amount:81000,note:'Prestations imposables en Suisse.',tag:'TTC'},{label:'Prestations dont le lieu est à l’étranger',amount:30000,note:'Incluses au ch. 200 puis déduites au ch. 221.',tag:'Étranger'},{label:'TDFN du cas',note:'Conseil aux entreprises.',tag:'6,2 %'}],
    checks:['ch. 200 = CHF 111’000.','ch. 221 = CHF 30’000.','ch. 299 et la base TDFN = CHF 81’000.'],legal:'Art. 8 LTVA selon la nature de la prestation · art. 37 LTVA',sourceIds:['afc-main','info12','forms'],
    rates:[{label:'Conseil imposable en Suisse',rate:6.2,base:81000,tax:5022}],fields:{ch200:111000},deductions:{ch221:30000},
    explanations:{ch200:'CHF 81’000 + CHF 30’000 = CHF 111’000.',ch221:'Les CHF 30’000 sont déduits au ch. 221.',r0base:'CHF 111’000 − CHF 30’000 = CHF 81’000.',r0tax:'CHF 81’000 × 6,2 % = CHF 5’022.'},lesson:'La ligne 221 ne s’utilise qu’après une qualification correcte du lieu de la prestation.'
  },
  {
    id:'I',tab:'I · Acquisition',title:'Service acquis à l’étranger — impôt au ch. 383',entity:'Fiduciaire Arc Sàrl',sector:'Fiduciaire',location:'Yverdon-les-Bains',period:'S1 2026',level:'Avancé',risk:'high',
    description:'L’impôt sur les acquisitions s’ajoute à la dette TDFN et ne devient pas une déduction d’impôt préalable.',mission:'Calculez la dette TDFN, puis ajoutez l’impôt sur l’acquisition de la licence étrangère.',
    clientNote:'Le fournisseur étranger n’est pas inscrit au registre suisse de la TVA; la prestation relève du lieu du destinataire.',afcNote:'La licence est supposée imposable au taux légal normal et facturée sans TVA suisse.',
    given:[{label:'Honoraires suisses, TVA comprise',amount:120000,note:'Base de l’activité fiduciaire.',tag:'TTC'},{label:'Licence SaaS étrangère',amount:10000,note:'Base nette soumise à l’impôt sur les acquisitions.',tag:'HT'},{label:'Taux légal de l’acquisition',note:'Taux normal.',tag:'8,1 %'},{label:'TDFN du cas',note:'Bureau fiduciaire.',tag:'6,2 %'}],
    checks:['L’achat étranger n’entre pas au ch. 200.','Le ch. 383 applique le taux légal.','Le ch. 399 additionne la dette TDFN et le ch. 383.'],legal:'Art. 45 à 49 LTVA · art. 91 OTVA',sourceIds:['otva','info12','forms'],
    rates:[{label:'Bureau fiduciaire',rate:6.2,base:120000,tax:7440}],fields:{ch200:120000,acqBase:10000,acqTax:810},deductions:{},
    explanations:{ch200:'Le ch. 200 comprend les honoraires, pas l’achat de la licence.',r0base:'Base TDFN: CHF 120’000 TTC.',r0tax:'CHF 120’000 × 6,2 % = CHF 7’440.',acqBase:'La base nette de l’acquisition est CHF 10’000.',acqTax:'CHF 10’000 × 8,1 % = CHF 810.'},lesson:'Le total du ch. 399 et du ch. 500 est CHF 8’250 dans ce cas.'
  },
  {
    id:'J',tab:'J · Admissibilité',title:'L’entreprise peut-elle appliquer les TDFN?',entity:'Conseil Expansion SA',sector:'Conseil',location:'Bâle',period:'Prévision annuelle 2026',level:'Avancé',risk:'high',type:'quiz',
    description:'Les deux limites quantitatives doivent être respectées simultanément, sans oublier les exclusions liées au statut ou à l’activité.',mission:'Contrôlez le chiffre d’affaires et la dette fiscale prévisible.',
    clientNote:'Le choix de la méthode intervient avant le paramétrage du décompte.',afcNote:'À 6,2 %, CHF 1,74 million est le maximum publié pour les situations de première année ou de passage indiquées par l’AFC.',
    given:[{label:'CA imposable annuel prévu, TVA comprise',amount:1800000,note:'Inférieur à la limite générale de CHF 5,024 mio.',tag:'TTC'},{label:'TDFN du scénario',note:'Conseil.',tag:'6,2 %'},{label:'Limite annuelle de l’impôt dû',amount:108000,note:'Condition cumulative.',tag:'Maximum'}],
    checks:['CA imposable TVA comprise ≤ CHF 5,024 mio.','Impôt dû ≤ CHF 108’000.','Les exclusions de l’art. 77 OTVA doivent encore être contrôlées.'],legal:'Art. 37 LTVA · art. 77 OTVA · limites publiées par l’AFC',sourceIds:['afc-main','otva','info12'],
    questions:[{q:'Quel est l’impôt annuel prévisible?',options:['CHF 108’000','CHF 111’600','CHF 116’100','CHF 180’000'],answer:1,why:'CHF 1’800’000 × 6,2 % = CHF 111’600.'},{q:'La limite annuelle de CHF 108’000 est-elle respectée?',options:['Oui','Non'],answer:1,why:'CHF 111’600 dépasse CHF 108’000.'},{q:'Quelle conclusion est correcte?',options:['Admissible car le CA reste sous CHF 5,024 mio.','Non admissible dans ce scénario','Il suffit de réduire le taux des factures'],answer:1,why:'Les conditions sont cumulatives; la limite de dette fiscale n’est pas respectée.'}],lesson:'Le plafond général de chiffre d’affaires ne suffit jamais à lui seul.'
  },
  {
    id:'K',tab:'K · Changement',title:'Changement de méthode — corrections dès 2025',entity:'Alpina Gestion Sàrl',sector:'Services',location:'Vaud',period:'Passage au 01.01.2027',level:'Expert',risk:'high',type:'quiz',
    description:'Depuis 2025, un changement entre méthode effective et TDFN peut entraîner une correction sur la valeur résiduelle.',mission:'Identifiez la direction de la correction et la rubrique correcte du décompte.',
    clientNote:'Le cas ne calcule pas la valeur résiduelle; il vérifie le traitement et le moment de déclaration.',afcNote:'Les délais et la méthode de calcul doivent être contrôlés dans l’Info TVA 12.',
    given:[{label:'Passage méthode effective → TDFN',note:'Dernier décompte avant le passage.',tag:'ch. 415'},{label:'Passage TDFN → méthode effective',note:'Premier décompte après le passage.',tag:'ch. 410'}],
    checks:['La valeur résiduelle doit être documentée.','Le sens de la correction dépend du changement de méthode.','Les rubriques 410 et 415 ne sont pas interchangeables.'],legal:'Art. 37 LTVA · pratique AFC dès 2025 · Info TVA 12',sourceIds:['afc-main','info12'],
    questions:[{q:'Passage de la méthode effective aux TDFN: quel traitement?',options:['Déduire un impôt préalable supplémentaire au ch. 410','Rembourser/corriger l’impôt préalable sur la valeur résiduelle au ch. 415','Aucune correction possible'],answer:1,why:'La correction intervient dans le dernier décompte avant le passage, au ch. 415.'},{q:'Passage des TDFN à la méthode effective: quel traitement?',options:['Déduire l’impôt préalable admissible sur la valeur résiduelle au ch. 410','Déclarer le montant au ch. 220','Facturer le TDFN au client'],answer:0,why:'La déduction intervient dans le premier décompte sous la méthode effective, au ch. 410.'},{q:'Quelle affirmation est la plus professionnelle?',options:['Le changement est purement administratif','La correction doit être chiffrée et documentée selon l’Info TVA 12','Le ch. 410 est toujours facultatif'],answer:1,why:'Le changement exige une analyse des biens et prestations encore présents et de leur valeur résiduelle.'}],lesson:'Un changement de méthode affecte aussi les valeurs résiduelles; il ne se résume pas à modifier un paramètre du Portail AFC.'
  }
];


CASES.push(
  {
    id:'L',tab:'L · Fonds',title:'Subvention et dividende — rubriques 900 et 910',entity:'Innovation Locale Sàrl',sector:'Conseil et développement de projets',location:'Morges',period:'S1 2026',level:'Avancé',risk:'medium',
    description:'Les autres mouvements de fonds sont déclarés séparément et ne sont pas ajoutés au chiffre d’affaires imposable.',mission:'Déclarez les honoraires au ch. 200, puis reportez la subvention au ch. 900 et le dividende au ch. 910.',
    clientNote:'Les honoraires imposables sont facturés au taux légal; la subvention et le dividende suivent leur qualification propre.',afcNote:'Les montants des ch. 900 et 910 figurent dans la section III et ne modifient pas automatiquement le ch. 299.',
    given:[{label:'Honoraires imposables, TVA comprise',amount:100000,note:'Base de l’activité de conseil.',tag:'TTC'},{label:'Subvention cantonale',amount:20000,note:'Montant à déclarer au ch. 900 dans ce cas simplifié.',tag:'900'},{label:'Dividende reçu',amount:5000,note:'Mouvement de fonds à déclarer au ch. 910.',tag:'910'},{label:'TDFN autorisé dans le cas',note:'Conseil aux entreprises.',tag:'6,2 %'}],
    checks:['Le ch. 200 ne comprend que les contre-prestations du dossier.','Les ch. 900 et 910 n’augmentent pas la base TDFN.','La qualification et les pièces justificatives restent indispensables.'],legal:'Art. 18, al. 2, LTVA · prototype AFC, section III',sourceIds:['ltva','prototype','info12'],
    rates:[{label:'Conseil aux entreprises',rate:6.2,base:100000,tax:6200}],fields:{ch200:100000,ch900:20000,ch910:5000},deductions:{},
    explanations:{ch200:'Les honoraires imposables totalisent CHF 100’000 TTC.',r0base:'La base TDFN est limitée aux honoraires imposables.',ch900:'La subvention est portée séparément au ch. 900.',ch910:'Le dividende est porté séparément au ch. 910.'},lesson:'La section III documente des mouvements de fonds sans les confondre avec les contre-prestations imposables.'
  },
  {
    id:'M',tab:'M · Crédit 415',title:'Reprise d’actifs par procédure de déclaration — ch. 415',entity:'Atelier Repris Sàrl',sector:'Services techniques',location:'Nyon',period:'S1 2026',level:'Expert',risk:'high',
    description:'Une correction au ch. 415 ne se déduit pas d’un simple pourcentage: elle doit résulter d’un dossier de reprise et d’un calcul documenté.',mission:'Établissez le décompte courant, puis reportez au ch. 415 la correction de CHF 1’500 déjà justifiée par le tableau de reprise.',
    clientNote:'Atelier Repris Sàrl a repris, sous procédure de déclaration au sens de l’art. 38 LTVA, des machines et du matériel affectés à une activité imposable.',afcNote:'Le dossier comporte le contrat de transfert, l’inventaire, les valeurs résiduelles, la méthode de décompte des parties et un tableau de correction validé donnant CHF 1’500.',
    given:[{label:'Prestations imposables du semestre, TVA comprise',amount:100000,note:'Base TDFN de l’activité courante.',tag:'TTC'},{label:'TDFN autorisé dans le cas',note:'Hypothèse pédagogique pour les services techniques.',tag:'6,2 %'},{label:'Correction issue du tableau de reprise',amount:1500,note:'Montant documenté à reporter au ch. 415; il n’est pas recalculé à partir du chiffre d’affaires.',tag:'415'},{label:'Pièces du dossier',note:'Contrat art. 38, inventaire, affectation, valeurs résiduelles et rapprochement comptable.',tag:'Justificatifs'}],
    checks:['Vérifier que la procédure de déclaration s’applique effectivement.','Conserver le calcul de la correction et les valeurs résiduelles.','Distinguer le ch. 399 avant crédit du solde après ch. 479.'],legal:'Art. 38 LTVA · prototype AFC, ch. 415, 479, 500 et 510 · traitement à confirmer sur dossier réel',sourceIds:['ltva','prototype','forms','info12'],
    rates:[{label:'Services techniques — hypothèse du cas',rate:6.2,base:100000,tax:6200}],fields:{ch200:100000,ch415:1500},deductions:{},
    explanations:{ch200:'Le chiffre d’affaires imposable courant est CHF 100’000 TTC.',r0base:'La base TDFN du semestre est CHF 100’000.',ch415:'CHF 1’500 proviennent du tableau de correction documenté; le simulateur ne prétend pas reconstituer ce calcul juridique complexe.'},lesson:'Le ch. 415 est une rubrique de correction fondée sur des pièces et une analyse préalable, non une déduction forfaitaire liée au chiffre d’affaires.'
  }
);

CASES.push({
  id:'N',tab:'N · Cas libre',title:'Cas libre — construire et contrôler votre propre décompte',entity:'Votre entreprise',sector:'Activités à définir',location:'Suisse',period:'Période à définir',level:'Atelier libre',risk:'high',type:'free',excludeFromProgress:true,
  description:'Ajoutez vos activités, sélectionnez uniquement des TDFN effectivement autorisés par l’AFC et testez la cohérence interne du décompte.',mission:'Construisez un décompte pédagogique libre, reportez le calcul au ch. 323 et corrigez toutes les incohérences signalées.',
  clientNote:'Les factures clients restent établies aux taux légaux applicables.',afcNote:'Le choix d’un TDFN dans cet outil ne vaut ni demande ni autorisation de l’AFC.',
  given:[{label:'Activités',note:'Ajout et suppression libres; libellé et TDFN à vérifier dans l’ordonnance AFC.',tag:'Libre'},{label:'Montants',note:'Contre-prestations brutes, TVA comprise, pour le calcul TDFN.',tag:'TTC'},{label:'Résultat',note:'Contrôle de cohérence uniquement; aucune déclaration n’est transmise.',tag:'Simulation'}],
  checks:['ch. 289 ne peut pas dépasser ch. 200.','La base reportée au ch. 323 doit correspondre au ch. 299.','La base et l’impôt du ch. 383 doivent être cohérents avec le taux légal sélectionné.'],legal:'Prototype AFC · art. 37 LTVA · art. 77 à 91 OTVA · ordonnance AFC sur les TDFN',sourceIds:['prototype','ltva','otva','rates','afc-main'],rates:[],fields:{},deductions:{},lesson:'Un cas libre valide la cohérence arithmétique; la qualification juridique, le TDFN autorisé et les pièces restent à vérifier.'
});

for (const c of CASES) {
  if (c.type !== 'quiz' && c.type !== 'free' && !c.sourceIds.includes('prototype')) c.sourceIds.push('prototype');
}
