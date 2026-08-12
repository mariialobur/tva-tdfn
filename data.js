// Données intégrées — version 16.2.0
// Données des cas
// v16-final-content · 12.08.2026
// v16.2-audited-content · 12.08.2026
export const CASES = [
  {
    "id": "J1",
    "tab": "J1",
    "title": "J1",
    "given": [],
    "questions": []
  },
  {
    "id": "J2",
    "tab": "J2",
    "title": "J2",
    "given": [],
    "questions": []
  },
  {
    "id": "J3",
    "tab": "J3",
    "title": "J3",
    "given": [],
    "questions": []
  },
  {
    "id": "A",
    "tab": "A",
    "title": "A",
    "given": [],
    "questions": []
  },
  {
    "id": "B",
    "tab": "B",
    "title": "B",
    "given": [],
    "questions": []
  },
  {
    "id": "C",
    "tab": "C",
    "title": "C",
    "given": [],
    "questions": []
  },
  {
    "id": "D",
    "tab": "D",
    "title": "D",
    "given": [
      {
        "label": "Commerce d’articles de sport hors vêtements",
        "amount": 180000,
        "note": "Contre-prestations TTC du commerce.",
        "tag": "2,1 %"
      },
      {
        "label": "Location d’articles de sport",
        "amount": 60000,
        "note": "Contre-prestations TTC de location.",
        "tag": "3,7 %"
      },
      {
        "label": "Services sur skis et snowboards",
        "amount": 60000,
        "note": "Entretien, préparation et services TTC.",
        "tag": "4,5 %"
      },
      {
        "label": "Total TVA comprise",
        "amount": 300000,
        "note": "Somme des comptes de produits du semestre.",
        "tag": "TTC"
      }
    ],
    "questions": [],
    "description": "Le cas applique les TDFN en vigueur dès 2025 à trois activités distinctes: commerce d’articles de sport hors vêtements, location et services sur skis ou snowboards.",
    "afcNote": "Selon la table AFC 2025: commerce d’articles de sport hors vêtements 2,1 %, location 3,7 % et services sur skis ou snowboards 4,5 %. La dette totale du cas est CHF 8’700; le taux moyen résultant de 2,90 % est un indicateur de synthèse, pas un TDFN à appliquer.",
    "rates": [
      {
        "label": "Commerce d’articles de sport hors vêtements",
        "rate": 2.1,
        "base": 180000,
        "tax": 3780
      },
      {
        "label": "Location d’articles de sport",
        "rate": 3.7,
        "base": 60000,
        "tax": 2220
      },
      {
        "label": "Services sur skis et snowboards",
        "rate": 4.5,
        "base": 60000,
        "tax": 2700
      }
    ],
    "explanations": {
      "ch200": "Le ch. 200 reprend CHF 300’000 TTC.",
      "r0base": "Commerce hors vêtements: CHF 180’000 TTC.",
      "r0tax": "CHF 180’000 × 2,1 % = CHF 3’780.",
      "r1base": "Location: CHF 60’000 TTC.",
      "r1tax": "CHF 60’000 × 3,7 % = CHF 2’220.",
      "r2base": "Services sur skis et snowboards: CHF 60’000 TTC.",
      "r2tax": "CHF 60’000 × 4,5 % = CHF 2’700."
    },
    "lesson": "Une enseigne unique peut exercer plusieurs activités TDFN. Chaque base est calculée avec son TDFN propre; le taux moyen de 2,90 % résulte de CHF 8’700 / CHF 300’000 et ne remplace jamais les TDFN autorisés."
  },
  {
    "id": "D1",
    "tab": "D1",
    "title": "D1",
    "given": [],
    "questions": []
  },
  {
    "id": "D2",
    "tab": "D2",
    "title": "D2",
    "given": [],
    "questions": []
  },
  {
    "id": "D4",
    "tab": "D4",
    "title": "D4",
    "given": [],
    "questions": []
  },
  {
    "id": "E",
    "tab": "E",
    "title": "E",
    "given": [
      {
        "label": "Commerce d’articles de sport hors vêtements",
        "tag": "2,1 %"
      },
      {
        "label": "b",
        "tag": "3,7 %"
      },
      {
        "label": "Réparation / service sur skis et snowboards",
        "tag": "4,5 %"
      }
    ],
    "questions": [],
    "afcNote": "Le seuil se mesure par activité ou groupe d’activités relevant du même TDFN; il est strictement supérieur à 10 %. Les tags du dossier reprennent les TDFN 2025 correspondant aux activités présentées."
  },
  {
    "id": "F",
    "tab": "F",
    "title": "F",
    "given": [
      {
        "tag": "3,7 %"
      },
      {
        "tag": "4,5 %"
      },
      {
        "tag": "4,5 %"
      },
      {
        "label": "Groupe des activités à 4,5 %"
      }
    ],
    "questions": [
      {
        "options": [
          "x"
        ]
      },
      {
        "options": [
          "Oui, car les deux relèvent du TDFN de 4,5 %"
        ]
      },
      {
        "q": "Quelle conséquence s’applique au groupe à 4,5 %?"
      }
    ]
  },
  {
    "id": "G",
    "tab": "G",
    "title": "G",
    "given": [],
    "questions": []
  },
  {
    "id": "H",
    "tab": "H",
    "title": "H",
    "given": [],
    "questions": []
  },
  {
    "id": "I",
    "tab": "I",
    "title": "I",
    "given": [],
    "questions": []
  },
  {
    "id": "D3",
    "tab": "D3 · 4 TDFN + export",
    "title": "Magasin de sport — quatre activités, quatre TDFN et exportations",
    "given": [
      {
        "label": "Articles de sport hors vêtements — Suisse",
        "amount": 140000,
        "note": "Compte de produits distinct, recettes TTC.",
        "tag": "2,1 %"
      },
      {
        "label": "Vêtements de sport — Suisse",
        "amount": 50000,
        "note": "Compte de produits distinct, recettes TTC.",
        "tag": "3,0 %"
      },
      {
        "label": "Location d’articles — Suisse",
        "amount": 40000,
        "note": "Prestations TTC.",
        "tag": "3,7 %"
      },
      {
        "label": "Services sur skis et snowboards — Suisse",
        "amount": 70000,
        "note": "Prestations TTC.",
        "tag": "4,5 %"
      },
      {
        "label": "Exportations documentées",
        "amount": 30000,
        "note": "Incluses au ch. 200 puis déduites au ch. 220.",
        "tag": "Export"
      },
      {
        "label": "Total ch. 200",
        "amount": 330000,
        "note": "CHF 300’000 imposables + CHF 30’000 exportés.",
        "tag": "TTC"
      }
    ],
    "questions": [],
    "conceptualNote": "Depuis 2025, le commerce d’articles de sport hors vêtements relève ici de 2,1 %, le commerce de vêtements de sport de 3,0 %, la location de 3,7 % et les services sur skis ou snowboards de 4,5 %. Les quatre activités dépassent 10 % du chiffre d’affaires imposable du cas et restent donc ventilées séparément. Le ch. 299 est CHF 300’000, après déduction de CHF 30’000 d’exportations du ch. 200.",
    "mission": "Saisissez le chiffre d’affaires au ch. 200, déduisez les exportations au ch. 220, puis réconciliez quatre bases TDFN distinctes avec le ch. 299.",
    "clientNote": "Les CHF 30’000 d’exportations disposent des preuves requises et ne sont inclus dans aucune base TDFN suisse. Les quatre activités suisses sont suivies sur des comptes de produits distincts.",
    "afcNote": "La table AFC 2025 distingue désormais, pour ce dossier, articles de sport hors vêtements 2,1 %, vêtements de sport 3,0 %, location 3,7 % et services sur skis ou snowboards 4,5 %.",
    "checks": [
      "ch. 200 = CHF 330’000 et ch. 220 = CHF 30’000.",
      "ch. 299 = CHF 300’000 et correspond à la somme des quatre bases TDFN.",
      "Chaque activité suisse du cas dépasse 10 % du chiffre d’affaires imposable et reste ventilée séparément.",
      "L’impôt TDFN total est CHF 9’070."
    ],
    "legal": "Art. 23 et 37 LTVA · art. 84, 86 et 88 OTVA · ordonnance AFC sur la valeur des TDFN dès 2025",
    "rates": [
      {
        "label": "Articles de sport hors vêtements — Suisse",
        "rate": 2.1,
        "base": 140000,
        "tax": 2940
      },
      {
        "label": "Vêtements de sport — Suisse",
        "rate": 3.0,
        "base": 50000,
        "tax": 1500
      },
      {
        "label": "Location d’articles de sport — Suisse",
        "rate": 3.7,
        "base": 40000,
        "tax": 1480
      },
      {
        "label": "Services sur skis et snowboards — Suisse",
        "rate": 4.5,
        "base": 70000,
        "tax": 3150
      }
    ],
    "explanations": {
      "ch200": "CHF 300’000 de recettes suisses + CHF 30’000 d’exportations = CHF 330’000.",
      "ch220": "Les exportations documentées de CHF 30’000 sont déduites au ch. 220.",
      "r0base": "Articles de sport hors vêtements: CHF 140’000.",
      "r0tax": "CHF 140’000 × 2,1 % = CHF 2’940.",
      "r1base": "Vêtements de sport: CHF 50’000.",
      "r1tax": "CHF 50’000 × 3,0 % = CHF 1’500.",
      "r2base": "Location: CHF 40’000.",
      "r2tax": "CHF 40’000 × 3,7 % = CHF 1’480.",
      "r3base": "Services: CHF 70’000.",
      "r3tax": "CHF 70’000 × 4,5 % = CHF 3’150."
    },
    "lesson": "Réconciliez le ch. 200, les exportations au ch. 220 et les quatre bases TDFN. Depuis 2025, articles hors vêtements, vêtements, location et services de ce dossier ne doivent plus être regroupés selon l’ancienne logique de branche mixte."
  },
  {
    "id": "L",
    "tab": "L",
    "title": "L",
    "given": [],
    "questions": []
  },
  {
    "id": "O",
    "tab": "O",
    "title": "O",
    "given": [],
    "questions": []
  },
  {
    "id": "R",
    "tab": "R",
    "title": "R",
    "given": [],
    "questions": []
  },
  {
    "id": "K0",
    "tab": "K0",
    "title": "K0",
    "given": [],
    "questions": []
  },
  {
    "id": "K1",
    "tab": "K1",
    "title": "K1",
    "given": [],
    "questions": []
  },
  {
    "id": "K2",
    "tab": "K2",
    "title": "K2",
    "given": [],
    "questions": []
  },
  {
    "id": "K3",
    "tab": "K3",
    "title": "K3",
    "given": [],
    "questions": []
  },
  {
    "id": "K4",
    "tab": "K4",
    "title": "K4",
    "given": [],
    "questions": []
  },
  {
    "id": "K5",
    "tab": "K5",
    "title": "K5",
    "given": [],
    "questions": []
  },
  {
    "id": "L0",
    "tab": "L0",
    "title": "L0",
    "given": [],
    "questions": []
  },
  {
    "id": "L1",
    "tab": "L1",
    "title": "L1",
    "given": [],
    "questions": []
  },
  {
    "id": "L2",
    "tab": "L2",
    "title": "L2",
    "given": [],
    "questions": []
  },
  {
    "id": "L3",
    "tab": "L3",
    "title": "L3",
    "given": [],
    "questions": []
  },
  {
    "id": "L4",
    "tab": "L4",
    "title": "L4",
    "given": [],
    "questions": []
  },
  {
    "id": "L5",
    "tab": "L5",
    "title": "L5",
    "given": [],
    "questions": []
  },
  {
    "id": "L6",
    "tab": "L6",
    "title": "L6",
    "given": [],
    "questions": []
  },
  {
    "id": "L7",
    "tab": "L7",
    "title": "L7",
    "given": [],
    "questions": []
  },
  {
    "id": "N",
    "tab": "N",
    "title": "N",
    "given": [],
    "questions": []
  },
  {
    "id": "M",
    "tab": "M",
    "title": "M",
    "given": [],
    "questions": []
  },
  {
    "id": "P",
    "tab": "P",
    "title": "P",
    "given": [],
    "questions": []
  },
  {
    "id": "S1",
    "tab": "S1 · Convenues / reçues",
    "title": "Facture en décembre, paiement en janvier — choisir la bonne période",
    "entity": "Fiduciaire Timing Sàrl",
    "sector": "Services fiduciaires",
    "location": "Lausanne",
    "period": "S2 2026 / S1 2027",
    "level": "Intermédiaire · période",
    "risk": "high",
    "type": "quiz",
    "accountingBasis": "Contre-prestations convenues",
    "description": "La date du paiement ne déplace pas automatiquement le chiffre d’affaires lorsque le décompte est établi selon les contre-prestations convenues.",
    "mission": "Déterminez la période correcte selon le mode de décompte et distinguez la règle normale «convenues» du mode «reçues» autorisé par l’AFC.",
    "clientNote": "Facture de CHF 10’810 TTC émise le 21.12.2026. Paiement du client le 15.01.2027. Aucun acompte antérieur.",
    "afcNote": "Le mode «convenues» est la règle de base. Le mode «reçues» nécessite une autorisation; le moment déterminant diffère alors.",
    "given": [
      {
        "label": "Facture client",
        "amount": 10810,
        "note": "Émise le 21.12.2026.",
        "tag": "Facture"
      },
      {
        "label": "Encaissement",
        "amount": 10810,
        "note": "Reçu le 15.01.2027.",
        "tag": "Banque"
      },
      {
        "label": "Mode actuel du dossier",
        "note": "Contre-prestations convenues.",
        "tag": "Convenues"
      }
    ],
    "checks": [
      "Identifier d’abord le mode de décompte autorisé.",
      "Sous convenues, rattacher la contre-prestation à la facturation.",
      "Sous reçues, rattacher la contre-prestation à l’encaissement.",
      "Ne pas changer de mode facture par facture."
    ],
    "legal": "Art. 39 et 40 LTVA — modes de décompte et naissance de la créance fiscale",
    "sourceIds": [
      "ltva",
      "info12",
      "afc-main"
    ],
    "questions": [
      {
        "q": "Quel mode constitue la règle de base selon la LTVA?",
        "options": [
          "Contre-prestations convenues",
          "Contre-prestations reçues dans tous les cas",
          "Le mode choisi facture par facture"
        ],
        "answer": 0,
        "why": "L’art. 39 LTVA prévoit le décompte sur la base des contre-prestations convenues; le mode «reçues» est soumis à autorisation."
      },
      {
        "q": "Avec le mode «convenues» du dossier, dans quelle période la facture du 21.12.2026 doit-elle être rattachée?",
        "options": [
          "S2 2026",
          "S1 2027",
          "À la date de clôture annuelle seulement"
        ],
        "answer": 0,
        "why": "Sous le mode convenues, la facturation est déterminante dans ce scénario; le paiement de janvier ne déplace pas la contre-prestation."
      },
      {
        "q": "Si le dossier était valablement autorisé au mode «reçues», quelle période serait déterminante?",
        "options": [
          "S2 2026",
          "S1 2027",
          "Toujours la date de facture"
        ],
        "answer": 1,
        "why": "Sous le mode reçues, la créance fiscale naît au moment de l’encaissement."
      },
      {
        "q": "Peut-on utiliser convenues pour certaines factures et reçues pour d’autres selon ce qui arrange le décompte?",
        "options": [
          "Oui",
          "Non"
        ],
        "answer": 1,
        "why": "Le mode de décompte est une règle du dossier et ne se choisit pas opération par opération."
      }
    ],
    "lesson": "Avant de chercher une rubrique, identifiez le mode de décompte: il détermine la période à laquelle la contre-prestation doit être rattachée."
  },
  {
    "id": "S2",
    "tab": "S2 · Acompte",
    "title": "Acompte reçu avant la prestation — ne pas attendre la facture finale",
    "entity": "Digital Projet Sàrl",
    "sector": "Développement informatique",
    "location": "Genève",
    "period": "S2 2026",
    "level": "Intermédiaire · période",
    "risk": "high",
    "type": "quiz",
    "accountingBasis": "Contre-prestations convenues",
    "description": "Un paiement anticipé lié à une future prestation imposable peut faire naître la créance fiscale avant l’exécution finale du mandat.",
    "mission": "Qualifiez l’acompte et déterminez la période correcte sans attendre artificiellement la livraison finale.",
    "clientNote": "Acompte de CHF 21’620 TTC reçu le 20.12.2026. Le développement sera livré en janvier 2027; la facture finale sera émise ensuite.",
    "afcNote": "Le cas suppose que l’acompte est clairement rattaché à une prestation future imposable et ne constitue pas un dépôt purement indemnitaire.",
    "given": [
      {
        "label": "Acompte encaissé",
        "amount": 21620,
        "note": "Reçu le 20.12.2026.",
        "tag": "Banque"
      },
      {
        "label": "Livraison prévue",
        "note": "Janvier 2027.",
        "tag": "Prestation future"
      },
      {
        "label": "Facture finale",
        "note": "Émise après la livraison.",
        "tag": "2027"
      }
    ],
    "checks": [
      "Vérifier que le versement est un acompte sur une prestation imposable.",
      "Ne pas attendre la facture finale lorsque la créance fiscale est déjà née.",
      "Rattacher le paiement anticipé à la période correcte."
    ],
    "legal": "Art. 40, al. 1, let. c, LTVA — paiements anticipés",
    "sourceIds": [
      "ltva",
      "info12"
    ],
    "questions": [
      {
        "q": "Dans ce cas, faut-il attendre la livraison de janvier 2027 pour tenir compte de l’acompte?",
        "options": [
          "Oui",
          "Non"
        ],
        "answer": 1,
        "why": "Le paiement anticipé lié à la prestation future déclenche déjà le traitement TVA selon les règles de naissance de la créance fiscale."
      },
      {
        "q": "Quelle période retient-on pour l’acompte reçu le 20.12.2026 dans le scénario présenté?",
        "options": [
          "S2 2026",
          "S1 2027",
          "Uniquement lors de la facture finale"
        ],
        "answer": 0,
        "why": "Le paiement anticipé est reçu en décembre 2026 et doit être rattaché à S2 2026 dans ce cas."
      },
      {
        "q": "Quel document doit permettre de relier l’encaissement à la prestation future?",
        "options": [
          "Commande/contrat ou facture d’acompte et preuve d’encaissement",
          "Uniquement le solde du compte bancaire annuel",
          "Aucun document si le montant est rond"
        ],
        "answer": 0,
        "why": "La piste d’audit doit démontrer la nature du versement, la prestation concernée et sa date."
      }
    ],
    "lesson": "Acompte, facture finale et exécution peuvent tomber dans des périodes différentes. Le réflexe est d’identifier le moment où la créance fiscale naît."
  },
  {
    "id": "S3",
    "tab": "S3 · Diminution documentée",
    "title": "Diminution de contre-prestation documentée — choisir la bonne période",
    "entity": "Conseil Romand SA",
    "sector": "Conseil aux entreprises",
    "location": "Vaud",
    "period": "S2 2026",
    "level": "Intermédiaire · correction",
    "risk": "high",
    "type": "quiz",
    "accountingBasis": "Contre-prestations convenues",
    "description": "Le dossier suppose qu’une diminution de contre-prestation est réellement établie, comptabilisée et documentée. Une simple créance échue ou un retard de paiement ne suffit pas à lui seul.",
    "mission": "Dans les faits expressément établis du cas, déterminez la période, la rubrique et l’impact TDFN de la diminution documentée.",
    "clientNote": "Une facture TTC de CHF 54’050 avait été déclarée en S1 2026. CHF 32’430 ont été encaissés. En S2 2026, le solde de CHF 21’620 est définitivement passé en correction de contre-prestation sur la base d’un dossier documenté.",
    "afcNote": "Le cas isole le mécanisme de l’art. 41 LTVA et du ch. 235. En pratique, il faut d’abord établir la réalité et le montant de la diminution; une créance simplement en souffrance ne doit pas être assimilée automatiquement à une correction de contre-prestation.",
    "given": [
      {
        "label": "Facture initiale déclarée",
        "amount": 54050,
        "note": "Incluse en S1 2026.",
        "tag": "Historique"
      },
      {
        "label": "Montant encaissé",
        "amount": 32430,
        "note": "Paiements du client.",
        "tag": "Banque"
      },
      {
        "label": "Correction comptabilisée en S2",
        "amount": 21620,
        "note": "Solde définitivement corrigé dans l’hypothèse du cas.",
        "tag": "Correction"
      },
      {
        "label": "TDFN du dossier",
        "note": "Conseil aux entreprises.",
        "tag": "6,2 %"
      }
    ],
    "checks": [
      "La facture initiale reste documentée.",
      "La correction est rattachée à la période où elle est comptabilisée/constatée selon le cas.",
      "Le montant corrigé réduit la base imposable et l’impact TDFN correspondant."
    ],
    "legal": "Art. 41 LTVA — modification de la contre-prestation",
    "sourceIds": [
      "ltva",
      "prototype",
      "info12"
    ],
    "questions": [
      {
        "q": "Dans l’hypothèse du cas, dans quelle période la diminution doit-elle être prise en compte?",
        "options": [
          "Revenir silencieusement dans S1 2026",
          "S2 2026, période de la correction documentée",
          "Attendre la fin de l’assujettissement"
        ],
        "answer": 1,
        "why": "L’art. 41 rattache l’adaptation au moment de la correction comptabilisée ou de l’encaissement de la contre-prestation corrigée selon la situation."
      },
      {
        "q": "Quelle rubrique du décompte matérialise ici la diminution de CHF 21’620?",
        "options": [
          "ch. 235",
          "ch. 900",
          "ch. 383"
        ],
        "answer": 0,
        "why": "Le ch. 235 sert à reporter les diminutions de contre-prestation dans la structure du décompte."
      },
      {
        "q": "Quel est l’impact TDFN de la diminution avec un TDFN de 6,2 %?",
        "options": [
          "CHF 1’340.44",
          "CHF 1’751.22",
          "CHF 21’620"
        ],
        "answer": 0,
        "why": "CHF 21’620 × 6,2 % = CHF 1’340.44."
      },
      {
        "q": "Quel dossier est le plus professionnel?",
        "options": [
          "Facture, historique des encaissements, preuve de la correction, écriture comptable et rapprochement TVA",
          "Une note «client ne paie pas» sans autre pièce",
          "Supprimer la facture du grand livre"
        ],
        "answer": 0,
        "why": "La correction doit rester reconstituable depuis la comptabilité et les justificatifs."
      }
    ],
    "lesson": "Avant de corriger la TVA, documentez la réalité de la diminution. Ensuite seulement, rattachez le montant à la période et à la rubrique correctes tout en conservant la facture initiale, les encaissements et l’écriture de correction."
  },
  {
    "id": "S4",
    "tab": "S4 · Concordance",
    "title": "Concordance comptabilité → décompte — réconcilier tous les flux",
    "entity": "Fiduciaire Arc Léman Sàrl",
    "sector": "Services fiduciaires",
    "location": "Lausanne",
    "period": "S1 2026",
    "level": "Intermédiaire · synthèse",
    "risk": "high",
    "accountingBasis": "Contre-prestations convenues",
    "description": "Le décompte doit pouvoir être réconcilié avec les comptes: chiffre d’affaires brut, déductions, diminution de contre-prestation, autres flux et base TDFN.",
    "mission": "Construisez le décompte depuis les comptes et vérifiez que ch. 299 = ch. 379 avant de valider.",
    "clientNote": "Les honoraires suisses de CHF 162’150 sont la facturation brute avant un avoir de CHF 5’000. Les exportations et prestations situées à l’étranger sont documentées.",
    "afcNote": "Le TDFN de 6,2 % du dossier est déjà présent dans le profil AFC; l’exercice porte sur la concordance des rubriques.",
    "given": [
      {
        "label": "Honoraires suisses facturés, TTC",
        "amount": 162150,
        "note": "Avant l’avoir de CHF 5’000.",
        "tag": "Suisse"
      },
      {
        "label": "Exportations documentées",
        "amount": 20000,
        "note": "Incluses au ch. 200 puis déduites.",
        "tag": "220"
      },
      {
        "label": "Prestations dont le lieu est à l’étranger",
        "amount": 10000,
        "note": "Incluses au ch. 200 puis déduites.",
        "tag": "221"
      },
      {
        "label": "Avoir client documenté",
        "amount": 5000,
        "note": "Diminution de contre-prestation.",
        "tag": "235"
      },
      {
        "label": "Dividende reçu",
        "amount": 4000,
        "note": "Autre mouvement de fonds.",
        "tag": "910"
      },
      {
        "label": "TDFN du profil AFC",
        "note": "Services fiduciaires.",
        "tag": "6,2 %"
      }
    ],
    "checks": [
      "Réconcilier le ch. 200 avec les comptes de produits avant toute déduction.",
      "Justifier séparément les opérations exonérées, les prestations situées à l’étranger et les diminutions de contre-prestation.",
      "Vérifier que le chiffre d’affaires restant après déductions concorde avec la somme des bases TDFN.",
      "Identifier les autres mouvements de fonds qui doivent être déclarés séparément sans gonfler la base TDFN."
    ],
    "legal": "Art. 23 et 37 LTVA · structure du décompte AFC",
    "sourceIds": [
      "ltva",
      "prototype",
      "forms",
      "afc-main"
    ],
    "rates": [
      {
        "label": "Services fiduciaires",
        "rate": 6.2,
        "base": 157150,
        "tax": 9743.3
      }
    ],
    "fields": {
      "ch200": 192150,
      "ch910": 4000
    },
    "deductions": {
      "ch220": 20000,
      "ch221": 10000,
      "ch235": 5000
    },
    "explanations": {
      "ch200": "CHF 162’150 + CHF 20’000 + CHF 10’000 = CHF 192’150.",
      "ch220": "Les exportations documentées de CHF 20’000 sont déduites au ch. 220.",
      "ch221": "Les prestations situées à l’étranger de CHF 10’000 sont déduites au ch. 221.",
      "ch235": "L’avoir documenté de CHF 5’000 diminue la contre-prestation.",
      "r0base": "CHF 192’150 − 20’000 − 10’000 − 5’000 = CHF 157’150.",
      "r0tax": "CHF 157’150 × 6,2 % = CHF 9’743.30.",
      "ch910": "Le dividende de CHF 4’000 est déclaré séparément au ch. 910."
    },
    "lesson": "Un bon décompte n’est pas seulement arithmétiquement juste: il doit se réconcilier avec les comptes de produits, les corrections et les autres flux."
  },
  {
    "id": "S5",
    "tab": "S5 · Échéance",
    "title": "Décompte TDFN — délai de remise, paiement et intérêt moratoire",
    "entity": "PME Horizon Sàrl",
    "sector": "Services",
    "location": "Vaud",
    "period": "S1 2026",
    "level": "Intermédiaire · procédure",
    "risk": "high",
    "type": "quiz",
    "accountingBasis": "Contre-prestations convenues",
    "description": "La périodicité semestrielle des TDFN ne supprime ni le délai de remise ni l’échéance de paiement.",
    "mission": "Distinguez fin de période, délai de remise, échéance de paiement et conséquence d’un paiement tardif.",
    "clientNote": "L’entreprise décompte selon les TDFN. Le semestre S1 2026 se termine le 30.06.2026. Aucun rappel n’a encore été reçu.",
    "afcNote": "La TVA est un impôt fondé sur l’autodéclaration: remise et paiement ne dépendent pas de l’envoi préalable d’un rappel.",
    "given": [
      {
        "label": "Méthode",
        "note": "TDFN.",
        "tag": "Semestriel"
      },
      {
        "label": "Fin du semestre",
        "note": "30.06.2026.",
        "tag": "S1 2026"
      },
      {
        "label": "Délai légal de principe",
        "note": "60 jours après la fin de la période de décompte.",
        "tag": "60 jours"
      }
    ],
    "checks": [
      "TDFN: décompte ordinairement semestriel.",
      "Remettre le décompte dans les 60 jours suivant la fin de la période.",
      "Acquitter la créance fiscale dans les 60 jours suivant la fin de la période.",
      "Un paiement tardif peut générer un intérêt moratoire."
    ],
    "legal": "Art. 35, 71, 86 et 87 LTVA",
    "sourceIds": [
      "ltva",
      "payment-interest",
      "online"
    ],
    "questions": [
      {
        "q": "Quelle est la périodicité ordinaire du décompte lorsqu’une entreprise applique les TDFN?",
        "options": [
          "Mensuelle",
          "Trimestrielle",
          "Semestrielle"
        ],
        "answer": 2,
        "why": "La LTVA prévoit le décompte semestriel pour la méthode TDFN."
      },
      {
        "q": "Quel est le délai de principe pour remettre le décompte après la fin de la période?",
        "options": [
          "30 jours",
          "60 jours",
          "180 jours"
        ],
        "answer": 1,
        "why": "Le décompte doit être remis dans les 60 jours suivant l’expiration de la période de décompte."
      },
      {
        "q": "Quel est le délai de principe pour acquitter la créance fiscale?",
        "options": [
          "60 jours après la fin de la période",
          "Uniquement après réception d’un rappel AFC",
          "À la clôture annuelle"
        ],
        "answer": 0,
        "why": "L’art. 86 LTVA fixe l’échéance de paiement à 60 jours après la fin de la période de décompte."
      },
      {
        "q": "Un paiement effectué après l’échéance peut-il entraîner un intérêt moratoire même sans rappel préalable?",
        "options": [
          "Oui",
          "Non"
        ],
        "answer": 0,
        "why": "L’intérêt moratoire est lié au retard de paiement; l’autodéclaration ne dépend pas d’une sommation préalable."
      }
    ],
    "lesson": "Sous TDFN, pensez en semestre + 60 jours: une échéance de déclaration et une échéance de paiement à suivre activement."
  },
  {
    "id": "T1",
    "tab": "T1 · Dossier final — qualifier",
    "title": "Dossier fiduciaire final — qualifier les pièces avant le décompte",
    "entity": "Montagne 360 Sàrl",
    "sector": "Commerce, location et atelier de sport",
    "location": "Lausanne",
    "period": "S1 2026",
    "level": "Autonome",
    "risk": "high",
    "type": "quiz",
    "accountingBasis": "Contre-prestations convenues",
    "description": "Vous recevez un extrait du grand livre, des pièces clients et fournisseurs, une décision cantonale et le profil AFC. Aucune rubrique du décompte n’est indiquée: la qualification fait partie du travail.",
    "mission": "Pour chaque pièce, déterminez sa nature TVA, la rubrique éventuelle du décompte et, pour les opérations suisses, l’activité TDFN concernée. Ne calculez pas encore la dette fiscale.",
    "clientNote": "Extrait du profil AFC du client: commerce d’articles de sport hors vêtements 2,1 %, location d’articles de sport 3,7 %, travaux de réparation et service 4,5 %. L’entreprise est inscrite au registre TVA et décompte selon les contre-prestations convenues.",
    "afcNote": "Une désignation comptable ou un mouvement bancaire ne suffit pas à lui seul. Chaque qualification doit pouvoir être reliée à la facture, au contrat, à la preuve d’exportation ou à la décision qui documente le flux.",
    "given": [
      {
        "label": "Compte 3200 — ventes magasin",
        "amount": 150000,
        "note": "Articles de sport hors vêtements vendus à des clients en Suisse; montants TTC.",
        "tag": "GL 3200"
      },
      {
        "label": "Compte 3410 — mise à disposition de matériel",
        "amount": 50000,
        "note": "Matériel de sport mis à disposition contre rémunération en Suisse; montants TTC.",
        "tag": "GL 3410"
      },
      {
        "label": "Compte 3420 — atelier",
        "amount": 50000,
        "note": "Entretien et réparation de skis/snowboards facturés en Suisse, avant la pièce AV-17; montants TTC.",
        "tag": "GL 3420"
      },
      {
        "label": "Facture E-204 — client à Lyon",
        "amount": 20000,
        "note": "Vente de matériel expédié depuis la Suisse vers la France; preuve de sortie douanière jointe.",
        "tag": "E-204"
      },
      {
        "label": "Pièce AV-17 — client atelier",
        "amount": 5000,
        "note": "Crédit accordé au client après rectification du prix d’une réparation déjà facturée.",
        "tag": "AV-17"
      },
      {
        "label": "Facture F-88 — CloudDesk Ltd., Irlande",
        "amount": 10000,
        "note": "Abonnement logiciel utilisé par l’entreprise; facture sans TVA suisse.",
        "tag": "F-88"
      },
      {
        "label": "Versement du Canton — décision 2026-114",
        "amount": 15000,
        "note": "Contribution accordée par décision de droit public sans contre-prestation individualisable au canton.",
        "tag": "Banque"
      }
    ],
    "checks": [
      "Réconcilier le chiffre d’affaires brut avec les comptes de produits avant toute déduction.",
      "Qualifier chaque flux hors ventes à partir de sa pièce justificative, pas de son seul libellé bancaire.",
      "Justifier toute opération non imposée en Suisse avant de la retrancher du chiffre d’affaires.",
      "Analyser séparément la facture du fournisseur étranger et le versement public avant de choisir une rubrique."
    ],
    "legal": "Art. 23, 37 et 45 LTVA · art. 84, 86, 88 et 91 OTVA · ordonnance AFC sur les TDFN 2025",
    "sourceIds": [
      "ltva",
      "otva",
      "rates",
      "prototype",
      "afc-main"
    ],
    "questions": [
      {
        "q": "Comment traiter la facture E-204 de CHF 20’000 au vu de la preuve de sortie jointe?",
        "options": [
          "L’inclure au ch. 200 puis la déduire au ch. 220",
          "La porter au ch. 900",
          "L’intégrer à une base TDFN suisse"
        ],
        "answer": 0,
        "why": "Qualification / rubrique: la livraison exportée et documentée entre dans le chiffre d’affaires total puis est déduite comme prestation exonérée."
      },
      {
        "q": "Quel traitement correspond à la pièce AV-17 de CHF 5’000?",
        "options": [
          "Diminution de contre-prestation au ch. 235 et réduction de la base atelier",
          "Impôt sur les acquisitions au ch. 383",
          "Aucune incidence TVA"
        ],
        "answer": 0,
        "why": "Correction / rubrique: la pièce réduit le prix d’une prestation déjà facturée et doit rester rattachée à l’activité atelier."
      },
      {
        "q": "Comment analyser la facture F-88 de CloudDesk Ltd. dans ce dossier?",
        "options": [
          "Comme chiffre d’affaires au ch. 200",
          "Séparément comme acquisition d’une prestation étrangère imposable, sans l’ajouter au ch. 200",
          "Comme autre mouvement de fonds au ch. 900"
        ],
        "answer": 1,
        "why": "Qualification: l’entreprise est déjà inscrite au registre TVA; une acquisition imposable auprès d’un fournisseur étranger doit être déclarée par l’assujetti. Le seuil annuel de CHF 10’000 vise le destinataire qui n’est pas inscrit au registre TVA."
      },
      {
        "q": "Que révèle la décision cantonale 2026-114 dans l’hypothèse du dossier?",
        "options": [
          "Une vente imposable à soumettre au TDFN",
          "Une contribution de droit public à présenter séparément au ch. 900",
          "Une diminution de contre-prestation au ch. 235"
        ],
        "answer": 1,
        "why": "Qualification / rubrique: la décision établit une contribution publique sans échange individualisable de prestations; elle ne constitue pas une contre-prestation TDFN dans ce scénario."
      },
      {
        "q": "Quelle activité du profil AFC correspond au compte 3410?",
        "options": [
          "Commerce 2,1 %",
          "Location 3,7 %",
          "Service/réparation 4,5 %"
        ],
        "answer": 1,
        "why": "Affectation: la mise à disposition rémunérée du matériel relève de l’activité de location indiquée dans le profil AFC."
      },
      {
        "q": "Quelle activité du profil AFC correspond au compte 3420?",
        "options": [
          "Commerce 2,1 %",
          "Location 3,7 %",
          "Travaux de réparation et service 4,5 %"
        ],
        "answer": 2,
        "why": "Affectation: l’entretien et la réparation de skis/snowboards relèvent du TDFN de service/réparation prévu dans le profil du cas."
      }
    ],
    "lesson": "Dossier final: partez des pièces et des faits, pas des rubriques. Le calcul ne commence qu’après avoir justifié le chiffre d’affaires, les déductions, les autres flux, les acquisitions et l’affectation aux TDFN."
  },
  {
    "id": "T2",
    "tab": "T2 · Dossier final — décompte",
    "title": "Dossier fiduciaire final — établir et réconcilier le décompte",
    "entity": "Montagne 360 Sàrl",
    "sector": "Commerce, location et atelier de sport",
    "location": "Lausanne",
    "period": "S1 2026",
    "level": "Autonome",
    "risk": "high",
    "accountingBasis": "Contre-prestations convenues",
    "description": "Suite du dossier T1. Reprenez les mêmes pièces et établissez le décompte sans chiffre de solution dans la mission ni dans la checklist.",
    "mission": "Établissez le chiffre d’affaires brut, les déductions, les bases TDFN, l’impôt sur l’acquisition étrangère et le traitement du versement public. Terminez par une concordance entre le décompte et les comptes.",
    "clientNote": "Profil AFC du client: commerce d’articles de sport hors vêtements 2,1 %, location d’articles de sport 3,7 %, travaux de réparation et service 4,5 %. L’entreprise est inscrite au registre TVA; taux légal normal 8,1 %.",
    "afcNote": "Les contrôles du dossier décrivent la méthode de vérification, pas le résultat. La solution chiffrée ne doit être consultée qu’après votre propre saisie.",
    "given": [
      {
        "label": "Compte 3200 — ventes magasin",
        "amount": 150000,
        "note": "Articles de sport hors vêtements, clients en Suisse; montants TTC.",
        "tag": "GL 3200"
      },
      {
        "label": "Compte 3410 — mise à disposition de matériel",
        "amount": 50000,
        "note": "Matériel de sport mis à disposition contre rémunération en Suisse; montants TTC.",
        "tag": "GL 3410"
      },
      {
        "label": "Compte 3420 — atelier",
        "amount": 50000,
        "note": "Entretien et réparation de skis/snowboards en Suisse, avant AV-17; montants TTC.",
        "tag": "GL 3420"
      },
      {
        "label": "Facture E-204 — client à Lyon",
        "amount": 20000,
        "note": "Matériel expédié hors de Suisse; preuve de sortie douanière jointe.",
        "tag": "E-204"
      },
      {
        "label": "Pièce AV-17 — client atelier",
        "amount": 5000,
        "note": "Crédit accordé après rectification du prix d’une réparation.",
        "tag": "AV-17"
      },
      {
        "label": "Facture F-88 — CloudDesk Ltd., Irlande",
        "amount": 10000,
        "note": "Abonnement logiciel; facture sans TVA suisse.",
        "tag": "F-88"
      },
      {
        "label": "Versement du Canton — décision 2026-114",
        "amount": 15000,
        "note": "Contribution publique sans contre-prestation individualisable au canton.",
        "tag": "Banque"
      }
    ],
    "checks": [
      "Construire le ch. 200 à partir des comptes de produits avant de saisir les déductions.",
      "Documenter séparément chaque déduction et conserver le lien vers la pièce qui la justifie.",
      "Vérifier que la somme des bases TDFN concorde avec le chiffre d’affaires restant après les déductions pertinentes.",
      "Traiter la facture du fournisseur étranger hors du chiffre d’affaires et contrôler le mécanisme de l’impôt sur les acquisitions.",
      "Présenter séparément le versement public lorsque sa qualification est confirmée par la décision."
    ],
    "legal": "Art. 23, 37 et 45 LTVA · art. 84, 88 et 91 OTVA · prototype AFC",
    "sourceIds": [
      "ltva",
      "otva",
      "rates",
      "prototype",
      "afc-main"
    ],
    "rates": [
      {
        "label": "Articles de sport hors vêtements",
        "rate": 2.1,
        "base": 150000,
        "tax": 3150
      },
      {
        "label": "Location d’articles de sport",
        "rate": 3.7,
        "base": 50000,
        "tax": 1850
      },
      {
        "label": "Atelier / travaux de réparation et service",
        "rate": 4.5,
        "base": 45000,
        "tax": 2025
      }
    ],
    "fields": {
      "ch200": 270000,
      "acqBase": 10000,
      "acqTax": 810,
      "ch900": 15000
    },
    "deductions": {
      "ch220": 20000,
      "ch235": 5000
    },
    "explanations": {
      "ch200": "Les quatre facturations de produits/prestations totalisent CHF 270’000 avant les déductions.",
      "ch220": "E-204, CHF 20’000, est déduite au ch. 220 sur la base de la preuve d’exportation.",
      "ch235": "AV-17, CHF 5’000, réduit la contre-prestation de l’atelier.",
      "r0base": "Compte 3200: CHF 150’000.",
      "r0tax": "CHF 150’000 × 2,1 % = CHF 3’150.",
      "r1base": "Compte 3410: CHF 50’000.",
      "r1tax": "CHF 50’000 × 3,7 % = CHF 1’850.",
      "r2base": "Compte 3420 CHF 50’000 − AV-17 CHF 5’000 = CHF 45’000.",
      "r2tax": "CHF 45’000 × 4,5 % = CHF 2’025.",
      "acqBase": "F-88, CHF 10’000, n’entre pas au ch. 200; elle constitue la base de l’acquisition dans les hypothèses du dossier.",
      "acqTax": "CHF 10’000 × 8,1 % = CHF 810.",
      "ch900": "La décision cantonale qualifie le versement de CHF 15’000 comme contribution publique présentée séparément au ch. 900."
    },
    "lesson": "Le dossier est réconcilié lorsque le chiffre d’affaires après déductions concorde avec les bases TDFN et que les flux hors base TDFN sont traités séparément. Solution: ch. 299 CHF 245’000; dette TDFN CHF 7’025; acquisition CHF 810; ch. 399 CHF 7’835.",
    "diagnostics": {
      "ch200": {
        "245000": "Rubrique — Vous avez probablement saisi directement le montant après déductions. Le ch. 200 reprend d’abord le chiffre d’affaires brut.",
        "250000": "Rubrique — Vérifiez la facture E-204: une opération exonérée documentée reste comprise dans le ch. 200 avant sa déduction.",
        "265000": "Rubrique — Vérifiez AV-17: une diminution de contre-prestation ne doit pas être soustraite avant la construction du ch. 200."
      },
      "ch220": {
        "0": "Qualification / rubrique — Réexaminez E-204 et sa preuve de sortie: le traitement dépend de la qualification de cette livraison."
      },
      "ch235": {
        "0": "Correction / rubrique — Réexaminez AV-17: le crédit documenté modifie la contre-prestation de l’atelier."
      },
      "r2base": {
        "50000": "Base — La base atelier doit tenir compte de la modification documentée par AV-17."
      },
      "acqBase": {
        "0": "Qualification — F-88 n’est pas du chiffre d’affaires, mais l’entreprise inscrite au registre TVA doit analyser l’impôt sur les acquisitions."
      },
      "ch900": {
        "0": "Qualification — La décision 2026-114 établit, dans les faits du cas, une contribution publique à présenter séparément."
      }
    }
  },
  {
    "id": "Q",
    "tab": "Q",
    "title": "Q",
    "given": [],
    "questions": [],
    "excludeFromProgress": true
  }
];
export const TRANSITION_WORKSHEETS = {};
