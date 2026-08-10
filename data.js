// Données intégrées — version 15.0.0
// Cas, sources et tableaux de transition sont réunis dans un module unique.

export const OFFICIAL_SOURCES = [
  {
    "id": "prototype",
    "title": "AFC — Prototype de décompte TVA en ligne (TDFN)",
    "scope": "Structure des rubriques 200 à 910 et fenêtre officielle «Calcul»",
    "url": "https://www.estv2.admin.ch/mwst/formulare/mwst-form-abr-muster-sss-fr.pdf",
    "status": "Modèle administratif officiel"
  },
  {
    "id": "ltva",
    "title": "LTVA — RS 641.20",
    "scope": "Base légale de la TVA, notamment art. 8, 23, 37, 38 et 45 ss",
    "url": "https://www.fedlex.admin.ch/eli/cc/2009/615/fr",
    "status": "Droit fédéral"
  },
  {
    "id": "afc-main",
    "title": "AFC — TDFN et taux forfaitaires",
    "scope": "Principe TTC, limites, exemple architecte, changements de méthode",
    "url": "https://www.estv.admin.ch/fr/tva-taux-de-la-dette-fiscale-nette-et-taux-forfaitaires",
    "status": "Source pratique officielle"
  },
  {
    "id": "otva",
    "title": "OTVA — RS 641.201",
    "scope": "Art. 77 à 91, notamment attribution et règle des 10 %",
    "url": "https://www.fedlex.admin.ch/eli/cc/2009/828/fr",
    "status": "Droit fédéral"
  },
  {
    "id": "rates",
    "title": "Ordonnance AFC sur la valeur des TDFN — RS 641.202.62",
    "scope": "TDFN par branche et activité dès 01.01.2025",
    "url": "https://www.fedlex.admin.ch/eli/cc/2024/500/fr",
    "status": "Droit fédéral"
  },
  {
    "id": "changes",
    "title": "AFC — modifications des TDFN au 01.01.2025",
    "scope": "Table de correspondance des anciennes et nouvelles activités/taux",
    "url": "https://www.estv.admin.ch/dam/fr/sd-web/WbNBDFahZQYD/mwst-publ-sss-aenderungen-2025-1-fr.pdf",
    "status": "Publication AFC"
  },
  {
    "id": "info12",
    "title": "Info TVA 12 — TDFN",
    "scope": "Conditions, adhésion, changement de méthode, cas particuliers",
    "url": "https://www.gate.estv.admin.ch/mwst-webpublikationen/public/IT/12",
    "status": "Publication AFC"
  },
  {
    "id": "info12-2025-practice",
    "title": "AFC — Info TVA 12, adaptations de pratique dès 2025",
    "scope": "Ch. 2.2.2–2.2.3 et 3.2.2–3.2.3: délais et corrections lors des changements de méthode; ch. 4: procédure de déclaration",
    "url": "https://www.estv.admin.ch/dam/estv/fr/dokumente/mwst/publikationen/mwst-publ-sss-aenderungen-2025-2-fr.pdf.download.pdf/mwst-publ-sss-aenderungen-2025-2-fr.pdf",
    "status": "Pratique AFC publiée, applicable dès le 01.01.2025"
  },
  {
    "id": "info12-222",
    "title": "Info TVA 12, ch. 2.2.2 — passage de la méthode effective aux TDFN",
    "scope": "Délais et conditions temporelles du passage de la méthode effective aux TDFN",
    "url": "https://www.gate.estv.admin.ch/mwst-webpublikationen/public/pages/taxInfos/cipherDisplay.xhtml?componentId=1005202&publicationId=1004992",
    "status": "Pratique AFC officielle"
  },
  {
    "id": "info12-322",
    "title": "Info TVA 12, ch. 3.2.2 — passage des TDFN à la méthode effective",
    "scope": "Délais et conditions temporelles du passage des TDFN à la méthode effective",
    "url": "https://www.gate.estv.admin.ch/mwst-webpublikationen/public/pages/taxInfos/cipherDisplay.xhtml?componentId=1005237&publicationId=1004992",
    "status": "Pratique AFC officielle"
  },
  {
    "id": "forms",
    "title": "AFC — formulaires TVA",
    "scope": "Rubriques du décompte et dépôt dans le Portail AFC",
    "url": "https://www.estv.admin.ch/fr/formulaires-tva",
    "status": "Source administrative"
  },
  {
    "id": "info12-154",
    "title": "Info TVA 12, ch. 15.4 — règle des 10 %",
    "scope": "Trois périodes consécutives, quatrième période et regroupement par TDFN",
    "url": "https://www.gate.estv.admin.ch/mwst-webpublikationen/public/pages/taxInfos/cipherDisplay.xhtml?componentId=1005406&publicationId=1004992",
    "status": "Pratique AFC publiée le 31.03.2025"
  },
  {
    "id": "rectification",
    "title": "AFC — Décompte de rectification TVA",
    "scope": "Correction en ligne d’un décompte mensuel, trimestriel ou semestriel pour la période concernée",
    "url": "https://www.estv.admin.ch/fr/tva-decompte-de-rectification",
    "status": "Source administrative actuelle"
  },
  {
    "id": "annual-concordance",
    "title": "AFC — Concordance annuelle TVA",
    "scope": "Art. 72 LTVA, différences à déclarer, délai de finalisation et intérêt moratoire",
    "url": "https://www.estv.admin.ch/fr/tva-concordance-annuelle",
    "status": "Source administrative actuelle"
  },
  {
    "id": "payment-interest",
    "title": "AFC — Payer la TVA et intérêt moratoire",
    "scope": "Échéance, retard de paiement, calcul de l’intérêt moratoire et seuil administratif de CHF 100",
    "url": "https://www.estv.admin.ch/fr/payer-la-tva",
    "status": "Source administrative actuelle"
  },
  {
    "id": "tdfn-2025-additional-rates",
    "title": "AFC — TDFN dès 2025: activités et taux supplémentaires",
    "scope": "Plus de deux TDFN, règle des 10 % et déclaration directe d’un taux supplémentaire avec contrôle ultérieur de l’AFC",
    "url": "https://www.estv.admin.ch/fr/tva-methode-des-taux-de-la-dette-fiscale-nette-2025",
    "status": "Source administrative actuelle"
  },
  {
    "id": "tdfn-rates-2025-pdf",
    "title": "AFC — Modifications des TDFN au 1er janvier 2025",
    "scope": "Liste comparative officielle des branches et activités avec les TDFN applicables dès 2025",
    "url": "https://www.estv.admin.ch/dam/fr/sd-web/WbNBDFahZQYD/mwst-publ-sss-aenderungen-2025-1-fr.pdf",
    "status": "Publication officielle AFC du 26.02.2025"
  },
  {
    "id": "info12-limits",
    "title": "Info TVA 12 — dépassement des limites et passage à la méthode effective",
    "scope": "Dépassement d’une ou des deux limites durant trois périodes fiscales consécutives; passage à la méthode effective; changement de méthode",
    "url": "https://www.gate.estv.admin.ch/mwst-webpublikationen/public/pages/taxInfos/cipherDisplay.xhtml?componentId=1005232&publicationId=1004992",
    "status": "Pratique AFC fondée notamment sur l’art. 81 OTVA"
  },
  {
    "id": "tdfn-transition-2025",
    "title": "AFC — TDFN dès 2025: changements de méthode",
    "scope": "Corrections sur la valeur résiduelle lors du passage entre méthode effective et TDFN; ch. 415 et ch. 410",
    "url": "https://www.estv.admin.ch/fr/tva-methode-des-taux-de-la-dette-fiscale-nette-2025",
    "status": "Source administrative actuelle"
  },
  {
    "id": "online",
    "title": "AFC — Décompter la TVA en ligne",
    "scope": "Remise des décomptes et rectificatifs via «Décompte TVA pro» dans le Portail AFC",
    "url": "https://www.estv.admin.ch/fr/decompter-la-tva-en-ligne",
    "status": "Source administrative actuelle"
  },
  {
    "id": "annual-reporting",
    "title": "AFC — Décompte annuel",
    "scope": "Limite distincte de CHF 5’005’000 pour demander la périodicité annuelle; ne pas confondre avec les limites TDFN",
    "url": "https://www.estv.admin.ch/fr/tva-decompte-annuel-2025",
    "status": "Source administrative actuelle"
  }
];

export const DEDUCTIONS = [
  {
    "key": "ch220",
    "code": "220",
    "label": "Prestations exonérées",
    "help": "Notamment exportations documentées au sens de l’art. 23 LTVA"
  },
  {
    "key": "ch221",
    "code": "221",
    "label": "Prestations fournies à l’étranger",
    "help": "Lieu de la prestation situé à l’étranger"
  },
  {
    "key": "ch225",
    "code": "225",
    "label": "Transferts par procédure de déclaration",
    "help": "Lorsque la procédure de déclaration s’applique"
  },
  {
    "key": "ch230",
    "code": "230",
    "label": "Prestations exclues du champ de l’impôt",
    "help": "Sans option dans le cas concerné"
  },
  {
    "key": "ch235",
    "code": "235",
    "label": "Diminutions de la contre-prestation",
    "help": "Rabais, escomptes et autres diminutions documentées"
  },
  {
    "key": "ch280",
    "code": "280",
    "label": "Divers",
    "help": "Autres déductions admises et documentées"
  }
];

export const CASES = [
  {
    "id": "A",
    "tab": "A · Base TTC",
    "title": "Architecte — appliquer le TDFN au montant TTC",
    "entity": "Atelier Horizon Sàrl",
    "sector": "Architecture",
    "location": "Lausanne",
    "period": "S1 2026",
    "level": "Fondamentaux",
    "risk": "low",
    "accountingBasis": "Contre-prestations reçues",
    "description": "Le premier réflexe consiste à partir du chiffre d’affaires brut TVA comprise.",
    "mission": "Saisissez le chiffre d’affaires au ch. 200, reportez la base imposable au premier TDFN et calculez la dette à 6,2 %.",
    "clientNote": "Les factures d’honoraires indiquent le taux légal de 8,1 %.",
    "afcNote": "Le décompte applique le TDFN de 6,2 % au chiffre d’affaires brut TTC.",
    "given": [
      {
        "label": "Honoraires encaissés, TVA comprise",
        "amount": 400000,
        "note": "Montant brut du semestre.",
        "tag": "TTC"
      },
      {
        "label": "TDFN autorisé dans le cas",
        "note": "Exemple officiel AFC pour un architecte.",
        "tag": "6,2 %"
      }
    ],
    "checks": [
      "La base TDFN est TVA comprise.",
      "Le TDFN ne figure pas sur la facture client.",
      "L’impôt préalable réel n’est pas déduit séparément."
    ],
    "legal": "Art. 37 LTVA · exemple architecte AFC",
    "sourceIds": [
      "afc-main",
      "otva",
      "rates",
      "prototype"
    ],
    "rates": [
      {
        "label": "Architecture",
        "rate": 6.2,
        "base": 400000,
        "tax": 24800
      }
    ],
    "fields": {
      "ch200": 400000
    },
    "deductions": {},
    "explanations": {
      "ch200": "Le ch. 200 reprend CHF 400’000 de contre-prestations.",
      "r0base": "La base TTC est reportée au premier TDFN.",
      "r0tax": "CHF 400’000 × 6,2 % = CHF 24’800."
    },
    "lesson": "Le TDFN sert au décompte avec l’AFC; le taux légal reste celui de la facture client.",
    "diagnostics": {
      "r0base": {
        "100000": "Vous avez probablement utilisé un montant hors taxe au lieu du chiffre d’affaires TTC."
      }
    }
  },
  {
    "id": "B",
    "tab": "B · HT/TTC",
    "title": "Agence web — reconstruire la base TTC",
    "entity": "Pixel Léman Sàrl",
    "sector": "Webdesign et services internet",
    "location": "Renens",
    "period": "S1 2026",
    "level": "Fondamentaux",
    "risk": "medium",
    "accountingBasis": "Contre-prestations convenues",
    "description": "Une multiplication correcte donne un mauvais décompte si la base reste hors taxe.",
    "mission": "Reconstituez le total TTC, puis utilisez-le au ch. 200 et au premier TDFN.",
    "clientNote": "Les honoraires sont facturés hors taxe au taux légal de 8,1 %. Reconstituez vous-même le total TTC.",
    "afcNote": "Le cas suppose que le TDFN de 6,2 % a été attribué à l’activité décrite.",
    "given": [
      {
        "label": "Honoraires facturés hors taxe",
        "amount": 100000,
        "note": "Prestations au taux légal normal.",
        "tag": "HT"
      },
      {
        "label": "Taux légal applicable",
        "note": "À appliquer aux honoraires HT pour reconstituer le TTC.",
        "tag": "8,1 %"
      }
    ],
    "checks": [
      "CHF 100’000 HT n’est pas la base TDFN.",
      "Le TDFN ne remplace pas 8,1 % sur les factures.",
      "La qualification exacte de l’activité reste à contrôler."
    ],
    "legal": "Art. 37, al. 2, LTVA · ordonnance AFC sur les TDFN",
    "sourceIds": [
      "afc-main",
      "otva",
      "rates",
      "prototype"
    ],
    "rates": [
      {
        "label": "Services internet / webdesign — hypothèse du cas",
        "rate": 6.2,
        "base": 108100,
        "tax": 6702.2
      }
    ],
    "fields": {
      "ch200": 108100
    },
    "deductions": {},
    "explanations": {
      "ch200": "CHF 100’000 + CHF 8’100 = CHF 108’100 TTC.",
      "r0base": "La base du premier TDFN est CHF 108’100.",
      "r0tax": "CHF 108’100 × 6,2 % = CHF 6’702.20."
    },
    "lesson": "Séparer la construction de la facture et le calcul simplifié de la dette fiscale.",
    "diagnostics": {
      "ch200": {
        "100000": "Le montant saisi correspond au chiffre d’affaires HT; le ch. 200 doit reprendre le total TTC."
      },
      "r0base": {
        "100000": "La base TDFN doit être TTC."
      }
    }
  },
  {
    "id": "C",
    "tab": "C · Hôtel",
    "title": "Hôtel — distinguer taux légaux et TDFN",
    "entity": "Hôtel du Rivage SA",
    "sector": "Hôtellerie et restauration",
    "location": "Montreux",
    "period": "S1 2026",
    "level": "Application",
    "risk": "low",
    "description": "Les taux légaux de 3,8 % et 8,1 % ne sont pas les TDFN du décompte.",
    "mission": "Convertissez les montants HT en TTC et ventilez la base entre hébergement et restauration.",
    "clientNote": "Hébergement avec petit-déjeuner: 3,8 %. Restauration: 8,1 %.",
    "afcNote": "Le cas utilise 2,1 % pour l’hébergement et 5,3 % pour les prestations hôtelières au taux normal.",
    "given": [
      {
        "label": "Nuitées avec petit-déjeuner",
        "amount": 100000,
        "note": "Hors taxe, taux légal spécial 3,8 %.",
        "tag": "HT"
      },
      {
        "label": "Nuitées TVA comprise",
        "amount": 103800,
        "note": "Base TDFN de l’hébergement.",
        "tag": "TTC"
      },
      {
        "label": "Restaurant",
        "amount": 40000,
        "note": "Hors taxe, taux légal normal 8,1 %.",
        "tag": "HT"
      },
      {
        "label": "Restaurant TVA comprise",
        "amount": 43240,
        "note": "Base TDFN de la restauration.",
        "tag": "TTC"
      }
    ],
    "checks": [
      "Le ch. 200 totalise les deux montants TTC.",
      "Chaque activité est rattachée à son TDFN.",
      "La comptabilité permet la ventilation des produits."
    ],
    "legal": "Art. 25 LTVA · ordonnance AFC sur la valeur des TDFN",
    "sourceIds": [
      "afc-main",
      "otva",
      "rates",
      "prototype"
    ],
    "rates": [
      {
        "label": "Hébergement avec petit-déjeuner",
        "rate": 2.1,
        "base": 103800,
        "tax": 2179.8
      },
      {
        "label": "Prestations hôtelières au taux normal",
        "rate": 5.3,
        "base": 43240,
        "tax": 2291.72
      }
    ],
    "fields": {
      "ch200": 147040
    },
    "deductions": {},
    "explanations": {
      "ch200": "CHF 103’800 + CHF 43’240 = CHF 147’040.",
      "r0base": "CHF 100’000 HT deviennent CHF 103’800 TTC.",
      "r0tax": "CHF 103’800 × 2,1 % = CHF 2’179.80.",
      "r1base": "CHF 40’000 HT deviennent CHF 43’240 TTC.",
      "r1tax": "CHF 43’240 × 5,3 % = CHF 2’291.72."
    },
    "lesson": "La ventilation suit les activités et les TDFN autorisés, pas seulement les taux légaux facturés.",
    "accountingBasis": "Contre-prestations convenues"
  },
  {
    "id": "D",
    "tab": "D · 3 TDFN",
    "title": "Magasin de sport — trois activités et trois TDFN",
    "entity": "Montagne Active SA",
    "sector": "Commerce, location et atelier",
    "location": "Fribourg",
    "period": "S1 2026",
    "level": "Intermédiaire",
    "risk": "high",
    "accountingBasis": "Contre-prestations convenues",
    "description": "Le cas reprend la logique de l’exemple AFC: commerce d’articles et vêtements de sport, location et services sur skis ou snowboards.",
    "mission": "Réconciliez CHF 300’000 TTC avec trois comptes de produits, puis calculez la dette TDFN activité par activité.",
    "clientNote": "Les factures restent établies aux taux légaux applicables; les montants du dossier sont des contre-prestations TTC.",
    "afcNote": "Le cas utilise les TDFN de l’exemple AFC dès 2025: commerce 2,1 %, location 3,0 % et services sur skis ou snowboards 5,3 %. Le total d’impôt est CHF 8’760; rapporté à CHF 300’000, le taux moyen résultant est 2,92 %. Ce 2,92 % est un résultat de synthèse, pas un TDFN à appliquer.",
    "given": [
      {
        "label": "Commerce d’articles et vêtements de sport",
        "amount": 180000,
        "note": "Contre-prestations TTC du commerce.",
        "tag": "2,1 %"
      },
      {
        "label": "Location d’articles de sport",
        "amount": 60000,
        "note": "Contre-prestations TTC de location.",
        "tag": "3,0 %"
      },
      {
        "label": "Services sur skis et snowboards",
        "amount": 60000,
        "note": "Entretien, préparation et services TTC.",
        "tag": "5,3 %"
      },
      {
        "label": "Total TVA comprise",
        "amount": 300000,
        "note": "Somme des comptes de produits du semestre.",
        "tag": "TTC"
      }
    ],
    "checks": [
      "La ventilation repose sur l’activité réellement exercée.",
      "Chaque activité représente 20 % ou plus du ch. 299 dans ce cas.",
      "La somme des bases du calcul doit correspondre au ch. 299."
    ],
    "legal": "AFC — TDFN dès 2025, exemple du magasin d’articles de sport · art. 37 LTVA",
    "sourceIds": [
      "tdfn-2025-additional-rates",
      "rates",
      "prototype",
      "ltva"
    ],
    "rates": [
      {
        "label": "Commerce d’articles et vêtements de sport",
        "rate": 2.1,
        "base": 180000,
        "tax": 3780
      },
      {
        "label": "Location d’articles de sport",
        "rate": 3,
        "base": 60000,
        "tax": 1800
      },
      {
        "label": "Services sur skis et snowboards",
        "rate": 5.3,
        "base": 60000,
        "tax": 3180
      }
    ],
    "fields": {
      "ch200": 300000
    },
    "deductions": {},
    "explanations": {
      "ch200": "Le ch. 200 reprend CHF 300’000 TTC.",
      "r0base": "Commerce: CHF 180’000 TTC.",
      "r0tax": "CHF 180’000 × 2,1 % = CHF 3’780.",
      "r1base": "Location: CHF 60’000 TTC.",
      "r1tax": "CHF 60’000 × 3,0 % = CHF 1’800.",
      "r2base": "Services sur skis et snowboards: CHF 60’000 TTC.",
      "r2tax": "CHF 60’000 × 5,3 % = CHF 3’180."
    },
    "lesson": "Une enseigne unique peut exercer plusieurs activités TDFN. Chaque base est calculée avec son TDFN propre; le taux moyen de 2,92 % résulte ensuite de CHF 8’760 / CHF 300’000 et ne remplace jamais les TDFN autorisés."
  },
  {
    "id": "D1",
    "tab": "D1 · Garage multi-activités",
    "title": "Garage automobile — quatre activités et quatre TDFN",
    "entity": "Garage Riviera SA",
    "sector": "Commerce automobile et atelier",
    "location": "Vevey",
    "period": "S1 2026",
    "level": "Activités multiples · application",
    "risk": "high",
    "description": "Le même garage peut cumuler vente de véhicules neufs, commerce de pneus, mécanique-électricité et carrosserie-peinture. Chaque flux doit être identifiable séparément.",
    "conceptualNote": "Les montants du cas sont des contre-prestations TTC. Les quatre activités dépassent chacune 10 % du chiffre d’affaires imposable total et sont donc ventilées avec leur TDFN propre.",
    "mission": "Réconciliez le ch. 200 avec les quatre comptes de produits, puis reportez chaque base TTC dans le calcul TDFN.",
    "clientNote": "La comptabilité utilise des comptes de produits distincts pour véhicules neufs, pneus, atelier mécanique-électricité et carrosserie-peinture.",
    "afcNote": "Les TDFN utilisés correspondent aux activités 2025 de la liste AFC: véhicules neufs 0,6 %, pneus 1,3 %, réparations/électricité 3,7 %, carrosserie/peinture 4,5 %.",
    "given": [
      {
        "label": "Vente de voitures neuves",
        "amount": 250000,
        "note": "Contre-prestations TTC.",
        "tag": "0,6 %"
      },
      {
        "label": "Commerce de pneus",
        "amount": 60000,
        "note": "Ventes de pneus TTC.",
        "tag": "1,3 %"
      },
      {
        "label": "Atelier mécanique et électricité",
        "amount": 120000,
        "note": "Réparations et services TTC.",
        "tag": "3,7 %"
      },
      {
        "label": "Carrosserie et peinture",
        "amount": 70000,
        "note": "Travaux TTC.",
        "tag": "4,5 %"
      },
      {
        "label": "Total imposable",
        "amount": 500000,
        "note": "Doit concorder avec le ch. 200 et les bases du calcul.",
        "tag": "TTC"
      }
    ],
    "checks": [
      "Les quatre bases totalisent CHF 500’000.",
      "Chaque activité est comptabilisée séparément et rattachée au TDFN correspondant.",
      "Le total de l’impôt TDFN est CHF 9’870.",
      "Le taux légal sur les factures clients reste distinct du TDFN utilisé dans le décompte."
    ],
    "legal": "Art. 37 LTVA · art. 84 à 88 OTVA · ordonnance AFC sur les TDFN dès 2025",
    "sourceIds": [
      "tdfn-2025-additional-rates",
      "tdfn-rates-2025-pdf",
      "rates",
      "otva",
      "afc-main"
    ],
    "rates": [
      {
        "label": "Commerce de voitures neuves",
        "rate": 0.6,
        "base": 250000,
        "tax": 1500
      },
      {
        "label": "Commerce de pneus",
        "rate": 1.3,
        "base": 60000,
        "tax": 780
      },
      {
        "label": "Atelier de réparations et d’électricité",
        "rate": 3.7,
        "base": 120000,
        "tax": 4440
      },
      {
        "label": "Carrosserie et peinture",
        "rate": 4.5,
        "base": 70000,
        "tax": 3150
      }
    ],
    "fields": {
      "ch200": 500000
    },
    "deductions": {},
    "explanations": {
      "ch200": "CHF 250’000 + CHF 60’000 + CHF 120’000 + CHF 70’000 = CHF 500’000 TTC.",
      "r0base": "Véhicules neufs: CHF 250’000 TTC.",
      "r0tax": "CHF 250’000 × 0,6 % = CHF 1’500.",
      "r1base": "Pneus: CHF 60’000 TTC.",
      "r1tax": "CHF 60’000 × 1,3 % = CHF 780.",
      "r2base": "Mécanique et électricité: CHF 120’000 TTC.",
      "r2tax": "CHF 120’000 × 3,7 % = CHF 4’440.",
      "r3base": "Carrosserie et peinture: CHF 70’000 TTC.",
      "r3tax": "CHF 70’000 × 4,5 % = CHF 3’150."
    },
    "lesson": "Une seule entreprise peut appliquer plusieurs TDFN; la qualité du décompte dépend d’une ventilation comptable durable et réconciliable."
  },
  {
    "id": "D2",
    "tab": "D2 · Animalerie et services",
    "title": "Animalerie — quatre activités, trois TDFN distincts",
    "entity": "Compagnons du Léman Sàrl",
    "sector": "Commerce animalier et services",
    "location": "Lausanne",
    "period": "S1 2026",
    "level": "Activités multiples · regroupement",
    "risk": "high",
    "description": "Quatre activités restent identifiables dans la comptabilité, mais pension et toilettage relèvent du même TDFN de 5,3 %. Pour la règle des 10 %, leurs chiffres d’affaires sont donc cumulés.",
    "conceptualNote": "La traçabilité comptable et le contrôle fiscal répondent à deux besoins différents. Pension et toilettage restent identifiables dans les comptes, mais, puisqu’elles relèvent du même TDFN de 5,3 %, leurs chiffres d’affaires sont cumulés pour la règle des 10 % conformément à l’art. 86, al. 3, OTVA.",
    "mission": "Conservez les quatre flux comptables distincts, puis regroupez pension et toilettage pour le contrôle des 10 % et pour la ligne de calcul au TDFN de 5,3 %. Le décompte utilise ainsi trois lignes TDFN.",
    "clientNote": "Les recettes TTC sont extraites de quatre comptes de produits et rapprochées avec la caisse et les factures.",
    "afcNote": "Le cas utilise trois TDFN: commerce au taux normal 2,1 %, commerce au taux réduit 0,1 % et services pension + toilettage 5,3 %. Les deux activités de services restent traçables séparément en comptabilité.",
    "given": [
      {
        "label": "Articles et animaux imposables au taux normal",
        "amount": 120000,
        "note": "Commerce TTC.",
        "tag": "2,1 %"
      },
      {
        "label": "Biens imposables au taux réduit",
        "amount": 80000,
        "note": "Commerce TTC.",
        "tag": "0,1 %"
      },
      {
        "label": "Pension et hôtel pour animaux",
        "amount": 60000,
        "note": "Prestations TTC, compte de produits distinct.",
        "tag": "5,3 %"
      },
      {
        "label": "Salon de toilettage",
        "amount": 40000,
        "note": "Prestations TTC, compte de produits distinct.",
        "tag": "5,3 %"
      },
      {
        "label": "Total imposable",
        "amount": 300000,
        "note": "Base globale TTC.",
        "tag": "100 %"
      }
    ],
    "checks": [
      "Les quatre activités restent identifiables dans la comptabilité et la piste d’audit.",
      "Pour la règle des 10 %, pension et toilettage sont cumulées: CHF 60’000 + CHF 40’000 = CHF 100’000, soit 33,33 % du chiffre d’affaires imposable.",
      "Le calcul TDFN comporte trois lignes: 2,1 %, 0,1 % et 5,3 %; leur base totale est CHF 300’000.",
      "L’impôt TDFN totalise CHF 7’900."
    ],
    "legal": "Art. 37 LTVA · art. 86, al. 3, OTVA · pratique AFC TDFN dès 2025",
    "sourceIds": [
      "info12-154",
      "tdfn-2025-additional-rates",
      "tdfn-rates-2025-pdf",
      "rates",
      "otva",
      "afc-main"
    ],
    "rates": [
      {
        "label": "Commerce de biens et animaux au taux normal",
        "rate": 2.1,
        "base": 120000,
        "tax": 2520
      },
      {
        "label": "Commerce de biens au taux réduit",
        "rate": 0.1,
        "base": 80000,
        "tax": 80
      },
      {
        "label": "Pension + toilettage — activités regroupées au même TDFN",
        "rate": 5.3,
        "base": 100000,
        "tax": 5300
      }
    ],
    "fields": {
      "ch200": 300000
    },
    "deductions": {},
    "explanations": {
      "ch200": "CHF 120’000 + CHF 80’000 + CHF 60’000 + CHF 40’000 = CHF 300’000 TTC.",
      "r0base": "Commerce au taux normal: CHF 120’000.",
      "r0tax": "CHF 120’000 × 2,1 % = CHF 2’520.",
      "r1base": "Commerce au taux réduit: CHF 80’000.",
      "r1tax": "CHF 80’000 × 0,1 % = CHF 80.",
      "r2base": "Pension + toilettage: CHF 60’000 + CHF 40’000 = CHF 100’000.",
      "r2tax": "CHF 100’000 × 5,3 % = CHF 5’300."
    },
    "lesson": "Pour la règle des 10 %, les activités auxquelles s’applique le même TDFN sont cumulées. Elles restent néanmoins suffisamment détaillées en comptabilité pour préserver la traçabilité du dossier."
  },
  {
    "id": "D3",
    "tab": "D3 · Multi-taux + export",
    "title": "Magasin de sport — quatre flux comptables, trois TDFN et exportations",
    "entity": "Alpes Sport Export SA",
    "sector": "Commerce, location, atelier et export",
    "location": "Sion",
    "period": "S1 2026",
    "level": "Activités multiples · avancé",
    "risk": "high",
    "description": "Le ch. 200 peut être supérieur aux bases TDFN: les exportations documentées sont comprises dans le chiffre d’affaires puis déduites au ch. 220.",
    "conceptualNote": "Le commerce d’articles et de vêtements de sport est suivi sur deux comptes de produits mais relève ici du même TDFN de 2,1 %, conformément à l’exemple AFC de la branche mixte. La location relève de 3,0 % et les services sur skis et snowboards de 5,3 %. Le dénominateur du test des 10 % et la somme des bases TDFN correspondent au ch. 299 de CHF 300’000, pas au ch. 200 de CHF 330’000 incluant les exportations.",
    "mission": "Saisissez le chiffre d’affaires au ch. 200, déduisez les exportations au ch. 220, contrôlez les parts d’activité sur le ch. 299 et reportez trois lignes TDFN.",
    "clientNote": "Les CHF 30’000 d’exportations disposent des preuves requises et ne sont inclus dans aucune base TDFN suisse. Articles et vêtements restent identifiables séparément dans les comptes.",
    "afcNote": "Le cas reprend l’exemple officiel AFC: commerce d’articles et de vêtements de sport 2,1 %, location d’articles 3,0 %, services sur skis et snowboards 5,3 %.",
    "given": [
      {
        "label": "Articles de sport — Suisse",
        "amount": 140000,
        "note": "Compte de produits distinct, recettes TTC.",
        "tag": "2,1 %"
      },
      {
        "label": "Vêtements de sport — Suisse",
        "amount": 50000,
        "note": "Compte de produits distinct; même TDFN dans ce cas.",
        "tag": "2,1 %"
      },
      {
        "label": "Location d’articles — Suisse",
        "amount": 40000,
        "note": "Prestations TTC.",
        "tag": "3,0 %"
      },
      {
        "label": "Services sur skis et snowboards — Suisse",
        "amount": 70000,
        "note": "Prestations TTC.",
        "tag": "5,3 %"
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
    "checks": [
      "ch. 200 = CHF 330’000 et ch. 220 = CHF 30’000.",
      "ch. 299 = CHF 300’000 et correspond aux trois bases TDFN.",
      "Le test des 10 % est calculé sur CHF 300’000 de chiffre d’affaires total imposable.",
      "Articles et vêtements restent séparés dans les comptes mais sont regroupés à 2,1 % dans le calcul.",
      "L’impôt TDFN total est CHF 8’900."
    ],
    "legal": "Art. 23 et 37 LTVA · pratique AFC TDFN dès 2025 · exemple officiel de la branche mixte «magasin d’articles de sport»",
    "sourceIds": [
      "tdfn-2025-additional-rates",
      "rates",
      "otva",
      "afc-main",
      "forms"
    ],
    "rates": [
      {
        "label": "Commerce d’articles et de vêtements de sport — Suisse",
        "rate": 2.1,
        "base": 190000,
        "tax": 3990
      },
      {
        "label": "Location d’articles de sport — Suisse",
        "rate": 3,
        "base": 40000,
        "tax": 1200
      },
      {
        "label": "Services sur skis et snowboards — Suisse",
        "rate": 5.3,
        "base": 70000,
        "tax": 3710
      }
    ],
    "fields": {
      "ch200": 330000
    },
    "deductions": {
      "ch220": 30000
    },
    "explanations": {
      "ch200": "CHF 300’000 de recettes suisses + CHF 30’000 d’exportations = CHF 330’000.",
      "ch220": "Les exportations documentées de CHF 30’000 sont déduites au ch. 220.",
      "r0base": "Articles CHF 140’000 + vêtements CHF 50’000 = CHF 190’000.",
      "r0tax": "CHF 190’000 × 2,1 % = CHF 3’990.",
      "r1base": "Location: CHF 40’000.",
      "r1tax": "CHF 40’000 × 3,0 % = CHF 1’200.",
      "r2base": "Services: CHF 70’000.",
      "r2tax": "CHF 70’000 × 5,3 % = CHF 3’710."
    },
    "lesson": "Réconciliez quatre flux comptables, une déduction au ch. 220 et trois lignes TDFN. Une activité comptable distincte n’implique pas automatiquement un taux distinct lorsque le TDFN applicable est identique."
  },
  {
    "id": "D4",
    "tab": "D4 · Seuil exact 10 %",
    "title": "Règle des 10 % — distinguer 10,0 % de plus de 10 %",
    "entity": "Atelier Seuil SA",
    "sector": "Commerce, location et réparation",
    "location": "Neuchâtel",
    "period": "Exercice 2026",
    "level": "Activités multiples · contrôle",
    "risk": "high",
    "type": "quiz",
    "description": "La règle officielle vise une part supérieure à 10 % du chiffre d’affaires total imposable. Une activité exactement à 10,0 % ne franchit pas ce seuil.",
    "conceptualNote": "Le dénominateur du cas est CHF 500’000 de chiffre d’affaires total imposable. La location représente exactement 10,0 %, tandis que la réparation représente 10,1 %. Le cas vérifie uniquement le franchissement du seuil; l’attribution concrète des TDFN reste à documenter selon les activités réelles et le contrôle de l’AFC.",
    "mission": "Calculez les deux pourcentages et identifiez l’activité qui déclenche l’application d’un TDFN supplémentaire selon la règle «supérieure à 10 %».",
    "clientNote": "Les trois activités sont enregistrées sur des comptes de produits distincts et rapprochées avec le chiffre d’affaires imposable.",
    "afcNote": "La formulation officielle est «supérieure à 10 %», et non «égale ou supérieure à 10 %».",
    "given": [
      {
        "label": "Activité principale",
        "amount": 399500,
        "note": "79,9 % du total imposable.",
        "tag": "Principal"
      },
      {
        "label": "Location",
        "amount": 50000,
        "note": "Exactement 10,0 % du total imposable.",
        "tag": "Seuil"
      },
      {
        "label": "Réparation",
        "amount": 50500,
        "note": "10,1 % du total imposable.",
        "tag": "Dépassement"
      },
      {
        "label": "Chiffre d’affaires total imposable",
        "amount": 500000,
        "note": "Dénominateur du test.",
        "tag": "100 %"
      }
    ],
    "checks": [
      "CHF 50’000 / CHF 500’000 = 10,0 %.",
      "CHF 50’500 / CHF 500’000 = 10,1 %.",
      "La règle vise une part strictement supérieure à 10 %.",
      "La ventilation comptable doit permettre de reproduire le test."
    ],
    "legal": "Art. 37 LTVA · pratique AFC TDFN dès 2025 · règle des 10 %",
    "sourceIds": [
      "tdfn-2025-additional-rates",
      "otva",
      "afc-main"
    ],
    "questions": [
      {
        "q": "Quelle part représente la location?",
        "options": [
          "9,9 %",
          "10,0 %",
          "10,1 %"
        ],
        "answer": 1,
        "why": "CHF 50’000 / CHF 500’000 = 10,0 %."
      },
      {
        "q": "La location franchit-elle à elle seule le seuil formulé comme «supérieure à 10 %»?",
        "options": [
          "Oui",
          "Non"
        ],
        "answer": 1,
        "why": "Une part exactement égale à 10,0 % n’est pas supérieure à 10 %."
      },
      {
        "q": "Quelle part représente la réparation?",
        "options": [
          "10,0 %",
          "10,1 %",
          "11,0 %"
        ],
        "answer": 1,
        "why": "CHF 50’500 / CHF 500’000 = 10,1 %."
      },
      {
        "q": "Quelle activité déclenche ici l’application d’un TDFN supplémentaire selon ce seul test?",
        "options": [
          "La location uniquement",
          "La réparation uniquement",
          "Les deux activités"
        ],
        "answer": 1,
        "why": "La réparation dépasse 10 %; la location atteint exactement 10 % sans le dépasser."
      }
    ],
    "lesson": "Dans un contrôle réel, une différence de 0,1 point peut changer la conclusion. Le calcul du dénominateur et la séparation comptable des activités doivent donc être reproductibles."
  },
  {
    "id": "E",
    "tab": "E · 10 % nouveau",
    "title": "Nouvelle activité — test prospectif des 10 %",
    "entity": "Glisse & Vélo SA",
    "sector": "Commerce et services",
    "location": "Neuchâtel",
    "period": "Prévision des 12 premiers mois",
    "level": "Intermédiaire",
    "risk": "medium",
    "type": "quiz",
    "description": "Pour une nouvelle activité, le test s’appuie sur les chiffres d’affaires attendus des douze premiers mois.",
    "mission": "Calculez les parts et déterminez quelle activité dépasse strictement 10 %.",
    "clientNote": "Le seuil concerne l’attribution des TDFN, non le taux légal de facturation.",
    "afcNote": "Le seuil se mesure par activité ou groupe d’activités relevant du même TDFN; il est strictement supérieur à 10 %.",
    "given": [
      {
        "label": "Commerce d’articles et vêtements de sport",
        "amount": 192000,
        "note": "Activité principale.",
        "tag": "2,1 %"
      },
      {
        "label": "Location d’articles de sport",
        "amount": 26400,
        "note": "Nouvelle activité prévue.",
        "tag": "3,0 %"
      },
      {
        "label": "Services sur skis et snowboards",
        "amount": 21600,
        "note": "Nouvelle activité prévue.",
        "tag": "5,3 %"
      },
      {
        "label": "Total imposable TTC",
        "amount": 240000,
        "note": "Base de comparaison.",
        "tag": "100 %"
      }
    ],
    "checks": [
      "Le seuil est dépassé seulement au-dessus de 10 %.",
      "La prévision couvre les douze premiers mois.",
      "Les activités au même TDFN sont regroupées."
    ],
    "legal": "AFC — TDFN dès 2025, règle des 10 % · Info TVA 12",
    "sourceIds": [
      "tdfn-2025-additional-rates",
      "info12-154",
      "rates"
    ],
    "questions": [
      {
        "q": "Quelle part représente la location?",
        "options": [
          "9 %",
          "10 %",
          "11 %",
          "12 %"
        ],
        "answer": 2,
        "why": "CHF 26’400 / CHF 240’000 = 11 %."
      },
      {
        "q": "Quelle part représente la réparation?",
        "options": [
          "8 %",
          "9 %",
          "10 %",
          "11 %"
        ],
        "answer": 1,
        "why": "CHF 21’600 / CHF 240’000 = 9 %."
      },
      {
        "q": "Quelle activité dépasse strictement 10 %?",
        "options": [
          "La location uniquement",
          "La réparation uniquement",
          "Les deux",
          "Aucune"
        ],
        "answer": 0,
        "why": "La location atteint 11 %, alors que la réparation reste à 9 %."
      }
    ],
    "lesson": "Pour un nouvel assujetti ou une nouvelle activité, la référence est la prévision des douze premiers mois."
  },
  {
    "id": "F",
    "tab": "F · 10 % établi",
    "title": "Entreprise existante — trois périodes puis effet en quatrième période",
    "entity": "Sport Services SA",
    "sector": "Commerce et atelier",
    "location": "Bienne",
    "period": "Périodes fiscales 2025–2027 · effet au 01.01.2028",
    "level": "Avancé",
    "risk": "high",
    "type": "quiz",
    "description": "Pour une entreprise existante, un dépassement devient régulier seulement lorsqu’il se produit durant trois périodes fiscales consécutives.",
    "mission": "Examinez 2025, 2026 et 2027, regroupez les activités soumises au même TDFN et déterminez le traitement dès 2028.",
    "clientNote": "Les pourcentages sont déjà calculés sur le chiffre d’affaires imposable total de chaque période.",
    "afcNote": "Si la part dépasse 10 % pendant trois périodes consécutives, le TDFN supplémentaire est demandé à partir de la quatrième période.",
    "given": [
      {
        "label": "Location d’articles de sport",
        "amount": null,
        "note": "Parts: 12 % en 2025, 11 % en 2026, 9 % en 2027.",
        "tag": "3,0 %"
      },
      {
        "label": "Services sur skis",
        "amount": null,
        "note": "6 % en 2025, 2026 et 2027.",
        "tag": "5,3 %"
      },
      {
        "label": "Services sur snowboards",
        "amount": null,
        "note": "5 % en 2025, 2026 et 2027.",
        "tag": "5,3 %"
      },
      {
        "label": "Groupe des activités à 5,3 %",
        "amount": null,
        "note": "6 % + 5 % = 11 % durant chacune des trois périodes fiscales.",
        "tag": "Agrégation"
      }
    ],
    "checks": [
      "Les trois périodes doivent être consécutives.",
      "La part doit être strictement supérieure à 10 % dans chacune.",
      "La conséquence intervient au début de la quatrième période."
    ],
    "legal": "Info TVA 12 — règle des 10 %, trois périodes fiscales consécutives et effet dès la quatrième",
    "sourceIds": [
      "tdfn-2025-additional-rates",
      "info12-154",
      "rates"
    ],
    "questions": [
      {
        "q": "La location justifie-t-elle un TDFN supplémentaire dès 2028?",
        "options": [
          "Oui, car elle a dépassé 10 % deux fois",
          "Non, car elle tombe à 9 % en 2027",
          "Oui, car sa moyenne sur trois ans dépasse 10 %"
        ],
        "answer": 1,
        "why": "La part doit dépasser 10 % dans chacune des trois périodes consécutives; 9 % en 2027 rompt la série."
      },
      {
        "q": "Faut-il regrouper les services sur skis et sur snowboards?",
        "options": [
          "Oui, car les deux relèvent du TDFN de 5,3 %",
          "Non, chaque libellé est toujours testé isolément"
        ],
        "answer": 0,
        "why": "Les chiffres d’affaires des activités auxquelles s’applique le même TDFN sont additionnés pour le test."
      },
      {
        "q": "Quelle conséquence s’applique au groupe à 5,3 %?",
        "options": [
          "Demander/appliquer le TDFN à partir du 01.01.2028",
          "Corriger rétroactivement les décomptes 2025 à 2027",
          "Attendre encore trois périodes"
        ],
        "answer": 0,
        "why": "Le groupe représente 11 % pendant trois périodes consécutives; la conséquence intervient dès la quatrième période, soit 2028."
      }
    ],
    "lesson": "La règle combine un seuil strict, trois périodes consécutives, l’agrégation par TDFN et un effet à compter de la quatrième période."
  },
  {
    "id": "G",
    "tab": "G · Export",
    "title": "Exportation de biens — déduction au ch. 220",
    "entity": "Alpina Outdoor Sàrl",
    "sector": "Commerce d’articles de sport",
    "location": "Sion",
    "period": "S1 2026",
    "level": "Intermédiaire",
    "risk": "medium",
    "description": "Le chiffre d’affaires exporté apparaît d’abord au ch. 200 puis est déduit au ch. 220.",
    "mission": "Déclarez le chiffre d’affaires mondial, déduisez les exportations documentées et calculez le TDFN sur les ventes suisses.",
    "clientNote": "Les exportations prouvées sont exonérées au sens de l’art. 23 LTVA.",
    "afcNote": "L’ancienne mise en compte par formulaire 1050 n’est plus utilisée depuis 2025.",
    "given": [
      {
        "label": "Ventes suisses, TVA comprise",
        "amount": 81000,
        "note": "Commerce d’articles de sport hors vêtements.",
        "tag": "TTC"
      },
      {
        "label": "Exportations documentées",
        "amount": 50000,
        "note": "Incluses au ch. 200 puis déduites au ch. 220.",
        "tag": "Export"
      },
      {
        "label": "TDFN du cas",
        "note": "Articles de sport hors vêtements.",
        "tag": "2,1 %"
      }
    ],
    "checks": [
      "ch. 200 = CHF 131’000.",
      "ch. 220 = CHF 50’000.",
      "La base imposable reste CHF 81’000."
    ],
    "legal": "Art. 23 LTVA · structure des rubriques du décompte",
    "sourceIds": [
      "afc-main",
      "rates",
      "forms",
      "prototype"
    ],
    "rates": [
      {
        "label": "Ventes suisses d’articles de sport",
        "rate": 2.1,
        "base": 81000,
        "tax": 1701
      }
    ],
    "fields": {
      "ch200": 131000
    },
    "deductions": {
      "ch220": 50000
    },
    "explanations": {
      "ch200": "CHF 81’000 + CHF 50’000 = CHF 131’000.",
      "ch220": "Les exportations documentées sont déduites au ch. 220.",
      "r0base": "CHF 131’000 − CHF 50’000 = CHF 81’000.",
      "r0tax": "CHF 81’000 × 2,1 % = CHF 1’701."
    },
    "lesson": "Le chiffre d’affaires exonéré est déclaré puis déduit dans la rubrique appropriée.",
    "accountingBasis": "Contre-prestations convenues"
  },
  {
    "id": "H",
    "tab": "H · Lieu étranger",
    "title": "Prestation située à l’étranger — ch. 221",
    "entity": "Léman Conseil Sàrl",
    "sector": "Conseil aux entreprises",
    "location": "Genève",
    "period": "S1 2026",
    "level": "Intermédiaire",
    "risk": "medium",
    "description": "Le ch. 200 est plus large que le chiffre d’affaires imposable en Suisse.",
    "mission": "Déclarez les contre-prestations totales, déduisez les prestations dont le lieu est à l’étranger et calculez la dette sur le solde.",
    "clientNote": "Le lieu de la prestation doit être qualifié avant de conclure qu’aucune TVA suisse n’est due.",
    "afcNote": "Le cas suppose que CHF 30’000 relèvent correctement du ch. 221.",
    "given": [
      {
        "label": "Conseil imposable en Suisse, TVA comprise",
        "amount": 81000,
        "note": "Prestations imposables en Suisse.",
        "tag": "TTC"
      },
      {
        "label": "Prestations dont le lieu est à l’étranger",
        "amount": 30000,
        "note": "Incluses au ch. 200 puis déduites au ch. 221.",
        "tag": "Étranger"
      },
      {
        "label": "TDFN du cas",
        "note": "Conseil aux entreprises.",
        "tag": "6,2 %"
      }
    ],
    "checks": [
      "ch. 200 = CHF 111’000.",
      "ch. 221 = CHF 30’000.",
      "ch. 299 et la base TDFN = CHF 81’000."
    ],
    "legal": "Art. 8 LTVA selon la nature de la prestation · art. 37 LTVA",
    "sourceIds": [
      "afc-main",
      "info12",
      "forms",
      "prototype"
    ],
    "rates": [
      {
        "label": "Conseil imposable en Suisse",
        "rate": 6.2,
        "base": 81000,
        "tax": 5022
      }
    ],
    "fields": {
      "ch200": 111000
    },
    "deductions": {
      "ch221": 30000
    },
    "explanations": {
      "ch200": "CHF 81’000 + CHF 30’000 = CHF 111’000.",
      "ch221": "Les CHF 30’000 sont déduits au ch. 221.",
      "r0base": "CHF 111’000 − CHF 30’000 = CHF 81’000.",
      "r0tax": "CHF 81’000 × 6,2 % = CHF 5’022."
    },
    "lesson": "La ligne 221 ne s’utilise qu’après une qualification correcte du lieu de la prestation.",
    "accountingBasis": "Contre-prestations convenues"
  },
  {
    "id": "I",
    "tab": "I · Acquisition",
    "title": "Service acquis à l’étranger — impôt au ch. 383",
    "entity": "Fiduciaire Arc Sàrl",
    "sector": "Fiduciaire",
    "location": "Yverdon-les-Bains",
    "period": "S1 2026",
    "level": "Avancé",
    "risk": "high",
    "description": "L’impôt sur les acquisitions s’ajoute à la dette TDFN et ne devient pas une déduction d’impôt préalable.",
    "mission": "Calculez la dette TDFN, puis ajoutez l’impôt sur l’acquisition de la licence étrangère.",
    "clientNote": "Le fournisseur étranger n’est pas inscrit au registre suisse de la TVA; la prestation relève du lieu du destinataire.",
    "afcNote": "La licence est supposée imposable au taux légal normal et facturée sans TVA suisse.",
    "given": [
      {
        "label": "Honoraires suisses, TVA comprise",
        "amount": 120000,
        "note": "Base de l’activité fiduciaire.",
        "tag": "TTC"
      },
      {
        "label": "Licence SaaS étrangère",
        "amount": 10000,
        "note": "Base nette soumise à l’impôt sur les acquisitions.",
        "tag": "HT"
      },
      {
        "label": "Taux légal de l’acquisition",
        "note": "Taux normal.",
        "tag": "8,1 %"
      },
      {
        "label": "TDFN du cas",
        "note": "Bureau fiduciaire.",
        "tag": "6,2 %"
      }
    ],
    "checks": [
      "L’achat étranger n’entre pas au ch. 200.",
      "Le ch. 383 applique le taux légal.",
      "Le ch. 399 additionne la dette TDFN et le ch. 383."
    ],
    "legal": "Art. 45 à 49 LTVA · art. 91 OTVA",
    "sourceIds": [
      "otva",
      "info12",
      "forms",
      "prototype"
    ],
    "rates": [
      {
        "label": "Bureau fiduciaire",
        "rate": 6.2,
        "base": 120000,
        "tax": 7440
      }
    ],
    "fields": {
      "ch200": 120000,
      "acqBase": 10000,
      "acqTax": 810
    },
    "deductions": {},
    "explanations": {
      "ch200": "Le ch. 200 comprend les honoraires, pas l’achat de la licence.",
      "r0base": "Base TDFN: CHF 120’000 TTC.",
      "r0tax": "CHF 120’000 × 6,2 % = CHF 7’440.",
      "acqBase": "La base nette de l’acquisition est CHF 10’000.",
      "acqTax": "CHF 10’000 × 8,1 % = CHF 810."
    },
    "lesson": "L’impôt sur les acquisitions est calculé séparément au taux légal et s’ajoute à la dette TDFN. L’achat étranger n’est pas du chiffre d’affaires de l’entreprise et ne doit pas être ajouté au ch. 200.",
    "accountingBasis": "Contre-prestations convenues"
  },
  {
    "id": "J1",
    "tab": "J1 · Accès TDFN",
    "title": "Accès initial — vérifier les limites et les exclusions",
    "entity": "Conseil Expansion SA",
    "sector": "Conseil",
    "location": "Bâle",
    "period": "Prévision annuelle 2026",
    "level": "Débutant · qualification",
    "risk": "high",
    "type": "quiz",
    "description": "Première étape: déterminer si l’entreprise peut demander la méthode TDFN avant de paramétrer le moindre décompte.",
    "mission": "Calculez la dette fiscale prévisible, contrôlez les deux limites cumulatives, puis vérifiez qu’aucune exclusion de l’art. 77 OTVA ne bloque la méthode.",
    "clientNote": "L’entreprise envisage la méthode TDFN pour la première fois. Le choix de la méthode intervient avant le paramétrage du décompte.",
    "afcNote": "L’accès initial exige le respect simultané des limites de chiffre d’affaires et de dette fiscale. Le respect des limites ne neutralise pas les exclusions prévues par l’art. 77 OTVA.",
    "given": [
      {
        "label": "CA imposable annuel prévu, TVA comprise",
        "amount": 1800000,
        "note": "Inférieur à la limite générale de CHF 5,024 mio.",
        "tag": "TTC"
      },
      {
        "label": "TDFN du scénario",
        "note": "Conseil.",
        "tag": "6,2 %"
      },
      {
        "label": "Limite annuelle de l’impôt dû",
        "amount": 108000,
        "note": "Condition cumulative.",
        "tag": "Maximum"
      }
    ],
    "checks": [
      "Accès initial: CA imposable annuel TVA comprise ≤ CHF 5’024’000.",
      "Accès initial: impôt annuel calculé avec les TDFN ≤ CHF 108’000.",
      "Nouvel assujetti: les chiffres escomptés des douze premiers mois doivent respecter les deux limites.",
      "Contrôler aussi les exclusions de l’art. 77 OTVA."
    ],
    "legal": "Art. 37 LTVA · art. 77 et 78 OTVA · limites publiées par l’AFC",
    "sourceIds": [
      "afc-main",
      "otva",
      "info12"
    ],
    "questions": [
      {
        "q": "Quel est l’impôt annuel prévisible?",
        "options": [
          "CHF 108’000",
          "CHF 111’600",
          "CHF 116’100",
          "CHF 180’000"
        ],
        "answer": 1,
        "why": "CHF 1’800’000 × 6,2 % = CHF 111’600."
      },
      {
        "q": "La limite annuelle de CHF 108’000 est-elle respectée?",
        "options": [
          "Oui",
          "Non"
        ],
        "answer": 1,
        "why": "CHF 111’600 dépasse CHF 108’000."
      },
      {
        "q": "Quelle conclusion est correcte pour la demande initiale?",
        "options": [
          "Admissible car le CA reste sous CHF 5,024 mio.",
          "Non admissible dans ce scénario",
          "Il suffit de réduire le taux des factures"
        ],
        "answer": 1,
        "why": "Les conditions sont cumulatives; la limite de dette fiscale n’est pas respectée."
      },
      {
        "q": "Nouvel assujetti — les chiffres d’affaires et l’impôt escomptés pour les douze premiers mois dépassent déjà les limites de l’art. 37 LTVA. L’AFC peut-elle autoriser l’application initiale des TDFN sur cette base?",
        "options": [
          "Oui, puis elle attend trois périodes fiscales",
          "Non, les chiffres escomptés des douze premiers mois doivent respecter les limites pour l’autorisation initiale",
          "Oui, si l’entreprise n’utilise qu’un seul TDFN"
        ],
        "answer": 1,
        "why": "Pour un nouvel assujetti, l’art. 78 OTVA exige que le chiffre d’affaires et l’impôt escomptés des douze premiers mois ne dépassent pas les limites de l’art. 37, al. 1, LTVA."
      },
      {
        "q": "Une entreprise respecte les deux limites mais applique l’imposition de groupe au sens de l’art. 13 LTVA. Peut-elle choisir les TDFN?",
        "options": [
          "Oui, car seules les deux limites quantitatives comptent",
          "Non, l’imposition de groupe fait partie des exclusions de l’art. 77 OTVA",
          "Oui, mais uniquement avec un seul TDFN"
        ],
        "answer": 1,
        "why": "Le respect des limites ne suffit pas. L’art. 77 OTVA exclut notamment les assujettis qui appliquent l’imposition de groupe."
      }
    ],
    "lesson": "Pour une demande initiale, raisonnez toujours dans cet ordre: dette fiscale prévisible → deux limites cumulatives → exclusions de l’art. 77 OTVA.",
    "conceptualNote": "Question professionnelle à se poser: «L’entreprise peut-elle utiliser la méthode?» avant «Comment remplir le décompte?». "
  },
  {
    "id": "J2",
    "tab": "J2 · Maintien",
    "title": "Maintien des TDFN — suivre trois périodes fiscales",
    "entity": "Conseil Expansion SA",
    "sector": "Conseil",
    "location": "Bâle",
    "period": "Entreprise déjà autorisée",
    "level": "Débutant · maintien",
    "risk": "high",
    "type": "quiz",
    "description": "Une entreprise déjà autorisée dépasse une limite. Il faut distinguer un dépassement ponctuel d’une obligation de changer de méthode.",
    "mission": "Décidez à quel moment le dépassement impose réellement le passage à la méthode effective et écartez l’ancienne règle du dépassement de plus de 50 %.",
    "clientNote": "La société utilise déjà les TDFN. Un contrôle interne montre des dépassements au cours de certaines périodes fiscales.",
    "afcNote": "Depuis 2025, le passage obligatoire est lié au dépassement d’une ou des deux limites durant trois périodes fiscales consécutives; l’ancienne règle accélérée fondée sur un dépassement de plus de 50 % a été supprimée.",
    "given": [
      {
        "label": "Situation de départ",
        "note": "Méthode TDFN déjà autorisée.",
        "tag": "TDFN"
      },
      {
        "label": "Unité de temps à suivre",
        "note": "Périodes fiscales, pas périodes de décompte.",
        "tag": "Important"
      },
      {
        "label": "Règle de maintien",
        "note": "Observer la succession des dépassements.",
        "tag": "3 périodes"
      }
    ],
    "checks": [
      "Maintien après autorisation: le dépassement d’une ou des deux limites doit être observé durant trois périodes fiscales consécutives avant le passage obligatoire à la méthode effective.",
      "Depuis 2025, l’ampleur du dépassement ne crée plus de règle accélérée à +50 %."
    ],
    "legal": "Art. 81 OTVA · Info TVA 12 — changement de méthode",
    "sourceIds": [
      "info12",
      "info12-limits",
      "otva"
    ],
    "questions": [
      {
        "q": "Entreprise déjà autorisée — une limite est dépassée pendant une seule période fiscale. Quelle conclusion est correcte?",
        "options": [
          "Le passage immédiat à la méthode effective est obligatoire",
          "Le dépassement doit être documenté et suivi; cette seule période ne suffit pas encore à imposer le changement",
          "Le dépassement peut être ignoré"
        ],
        "answer": 1,
        "why": "Depuis 2025, le passage obligatoire intervient si l’une ou les deux limites sont dépassées durant trois périodes fiscales consécutives."
      },
      {
        "q": "Entreprise déjà autorisée — une limite est dépassée de 60 % pendant une seule période fiscale. La seule ampleur du dépassement impose-t-elle un passage immédiat?",
        "options": [
          "Oui, car tout dépassement supérieur à 50 % accélère automatiquement le changement",
          "Non; depuis 2025, l’ampleur du dépassement ne crée plus cette règle accélérée",
          "Oui, mais seulement si le chiffre d’affaires est concerné"
        ],
        "answer": 1,
        "why": "La règle spéciale liée à un dépassement de plus de 50 % a été supprimée. Le critère de maintien est désormais le dépassement durant trois périodes fiscales consécutives."
      },
      {
        "q": "Entreprise déjà autorisée — l’une des limites est dépassée durant trois périodes fiscales consécutives. Quelle est la conséquence?",
        "options": [
          "Passage obligatoire à la méthode effective au début de la période fiscale suivante",
          "Attendre une quatrième période de dépassement puis changer à la cinquième",
          "Modifier le taux légal indiqué sur les factures"
        ],
        "answer": 0,
        "why": "L’art. 81, al. 3, OTVA impose le passage à la méthode effective au début de la période fiscale qui suit les trois périodes fiscales consécutives de dépassement."
      }
    ],
    "lesson": "Un dépassement isolé ne déclenche pas à lui seul le changement. Le réflexe est de documenter chaque période fiscale et de suivre la séquence de trois dépassements consécutifs.",
    "conceptualNote": "Ne confondez pas période fiscale et période de décompte. Le suivi se fait sur les périodes fiscales."
  },
  {
    "id": "J3",
    "tab": "J3 · TDFN vs annuel",
    "title": "TDFN et décompte annuel — ne pas confondre les seuils",
    "entity": "Gestion Horizon SA",
    "sector": "Services",
    "location": "Vaud",
    "period": "Choix des modalités 2026",
    "level": "Débutant · distinction",
    "risk": "medium",
    "type": "quiz",
    "description": "La limite d’accès aux TDFN et la limite permettant de demander un décompte annuel sont proches, mais juridiquement différentes.",
    "mission": "Distinguez le seuil TDFN de CHF 5’024’000 du seuil distinct de CHF 5’005’000 applicable au décompte annuel.",
    "clientNote": "L’entreprise envisage les TDFN et souhaite aussi savoir si elle peut remettre la TVA une seule fois par année.",
    "afcNote": "L’admissibilité TDFN et la périodicité annuelle répondent à des conditions distinctes. Une entreprise peut satisfaire au seuil TDFN tout en dépassant le seuil du décompte annuel.",
    "given": [
      {
        "label": "CA annuel, TVA comprise",
        "amount": 5015000,
        "note": "Sous le seuil TDFN, mais au-dessus du seuil du décompte annuel.",
        "tag": "CHF 5’015’000"
      },
      {
        "label": "Dette fiscale annuelle",
        "amount": 100000,
        "note": "Sous le maximum TDFN de CHF 108’000.",
        "tag": "CHF 100’000"
      },
      {
        "label": "Seuil du décompte annuel",
        "amount": 5005000,
        "note": "Condition distincte liée à la périodicité.",
        "tag": "CHF 5’005’000"
      }
    ],
    "checks": [
      "Ne pas confondre la limite TDFN de CHF 5’024’000 avec la limite distincte du décompte annuel de CHF 5’005’000."
    ],
    "legal": "Art. 37 LTVA · règles AFC sur le décompte annuel",
    "sourceIds": [
      "afc-main",
      "annual-reporting"
    ],
    "questions": [
      {
        "q": "Si le CA est exactement de CHF 5’024’000 et la dette fiscale exactement de CHF 108’000, que peut-on conclure sur les deux limites quantitatives?",
        "options": [
          "Elles sont respectées, sous réserve des autres conditions et exclusions",
          "Elles sont dépassées car les montants doivent être strictement inférieurs",
          "Seule la limite de chiffre d’affaires est respectée"
        ],
        "answer": 0,
        "why": "Les limites sont formulées comme des maxima. Les atteindre exactement ne constitue pas, à lui seul, un dépassement; les autres conditions doivent néanmoins être contrôlées."
      },
      {
        "q": "Avec un CA de CHF 5’015’000 et une dette fiscale de CHF 100’000, les deux limites quantitatives TDFN sont-elles respectées?",
        "options": [
          "Oui, sous réserve des autres conditions et exclusions",
          "Non, car CHF 5’015’000 dépasse la limite TDFN"
        ],
        "answer": 0,
        "why": "CHF 5’015’000 reste inférieur à CHF 5’024’000 et CHF 100’000 reste inférieur à CHF 108’000. Les autres conditions doivent néanmoins être contrôlées."
      },
      {
        "q": "Une entreprise remplit les conditions TDFN avec un CA de CHF 5’015’000 et une dette fiscale de CHF 100’000. Peut-elle demander le décompte annuel uniquement sur cette base?",
        "options": [
          "Oui, car elle reste sous la limite TDFN de CHF 5’024’000",
          "Non, la limite distincte du décompte annuel est de CHF 5’005’000",
          "Oui, car la dette fiscale reste sous CHF 108’000"
        ],
        "answer": 1,
        "why": "L’admissibilité aux TDFN et la périodicité annuelle répondent à deux limites de chiffre d’affaires différentes. CHF 5’015’000 reste sous la limite TDFN mais dépasse la limite distincte du décompte annuel de CHF 5’005’000."
      }
    ],
    "lesson": "Deux questions différentes appellent deux seuils différents: «Puis-je utiliser les TDFN?» et «Puis-je remettre un décompte annuel?». Ne les fusionnez jamais.",
    "conceptualNote": "Retenez le couple: TDFN = CHF 5’024’000 / CHF 108’000; décompte annuel = seuil de CA CHF 5’005’000 + autres conditions propres à cette périodicité."
  },
  {
    "id": "K0",
    "tab": "K0 · Admissibilité",
    "title": "Avant le ch. 415 — le passage aux TDFN est-il possible?",
    "entity": "Transition Conseil SA",
    "sector": "Conseil aux entreprises",
    "location": "Vaud",
    "period": "Passage souhaité au 01.01.2027",
    "level": "Transition · étape 1",
    "risk": "high",
    "type": "quiz",
    "description": "Avant de calculer une correction, il faut vérifier le délai de maintien de la méthode effective, les deux limites TDFN et la date d’effet du changement.",
    "conceptualNote": "Le calcul du ch. 415 ne rend pas le changement admissible à lui seul. L’autorisation et les conditions d’accès à la méthode doivent être contrôlées séparément.",
    "mission": "Décidez si le passage peut prendre effet au 01.01.2027, puis identifiez le travail préparatoire à effectuer avant le dernier décompte selon la méthode effective.",
    "clientNote": "L’entreprise applique la méthode effective depuis le 01.01.2024 et souhaite passer aux TDFN au 01.01.2027.",
    "afcNote": "La demande est effectuée dans le Portail AFC. La période fiscale 2026 respecte les limites et une correction éventuelle des valeurs résiduelles doit être portée au ch. 415 du dernier décompte selon la méthode effective.",
    "given": [
      {
        "label": "Méthode effective appliquée",
        "note": "Périodes fiscales 2024, 2025 et 2026 entièrement écoulées avant le changement.",
        "tag": "3 périodes"
      },
      {
        "label": "CA imposable 2026, TVA comprise",
        "amount": 1200000,
        "note": "Montant inférieur aux limites du scénario.",
        "tag": "TTC"
      },
      {
        "label": "TDFN prévu pour le test",
        "note": "6,2 %; dette fiscale théorique CHF 74’400.",
        "tag": "6,2 %"
      },
      {
        "label": "Date d’effet souhaitée",
        "note": "Début d’une nouvelle période fiscale.",
        "tag": "01.01.2027"
      },
      {
        "label": "Mode de décompte",
        "note": "Le mode «convenues» ou «reçues» reste inchangé dans ce module.",
        "tag": "Hypothèse"
      }
    ],
    "checks": [
      "La méthode effective a été appliquée pendant au moins trois périodes fiscales.",
      "La période fiscale précédant le passage respecte les limites de chiffre d’affaires et d’impôt dû.",
      "La demande est effectuée dans le Portail AFC dans le délai applicable.",
      "Un inventaire des biens et prestations encore disponibles est préparé avant le ch. 415.",
      "Le mode «convenues» ou «reçues» reste inchangé; les corrections de débiteurs et créanciers ne sont pas traitées ici."
    ],
    "legal": "Art. 31 et 37 LTVA · pratique AFC applicable aux changements de méthode dès 2025 · ch. 415 · art. 79 OTVA",
    "sourceIds": [
      "tdfn-transition-2025",
      "afc-main",
      "info12",
      "ltva",
      "otva"
    ],
    "questions": [
      {
        "q": "La durée minimale de la méthode effective est-elle remplie pour un passage au 01.01.2027?",
        "options": [
          "Oui, trois périodes fiscales entières se sont écoulées",
          "Non, cinq années sont toujours nécessaires",
          "La durée ne joue aucun rôle"
        ],
        "answer": 0,
        "why": "L’entreprise a appliqué la méthode effective durant les périodes fiscales 2024, 2025 et 2026. Le passage peut donc être examiné pour le début de 2027, sous réserve des autres conditions."
      },
      {
        "q": "Quel est l’impôt annuel théorique avec un TDFN de 6,2 % sur CHF 1’200’000 TTC?",
        "options": [
          "CHF 62’000",
          "CHF 74’400",
          "CHF 97’200"
        ],
        "answer": 1,
        "why": "CHF 1’200’000 × 6,2 % = CHF 74’400. Le chiffre d’affaires et l’impôt restent sous les limites du scénario."
      },
      {
        "q": "Quelle vérification vient avant la saisie du ch. 415?",
        "options": [
          "Inventorier les biens et prestations encore disponibles et rapprocher l’impôt préalable effectivement déduit",
          "Multiplier la valeur comptable nette par 8,1 %",
          "Rembourser toute la TVA déduite depuis la création de l’entreprise"
        ],
        "answer": 0,
        "why": "La correction porte sur l’impôt préalable antérieurement déduit à concurrence de la valeur résiduelle au moment du changement."
      },
      {
        "q": "Dans quel décompte une correction méthode effective → TDFN est-elle portée?",
        "options": [
          "Dans le premier décompte TDFN, au ch. 410",
          "Dans le dernier décompte selon la méthode effective, au ch. 415",
          "Dans une annexe sans report dans le décompte"
        ],
        "answer": 1,
        "why": "L’AFC prévoit le remboursement de l’impôt préalable sur les valeurs résiduelles au ch. 415 du dernier décompte avant le passage aux TDFN."
      }
    ],
    "lesson": "Commencez par l’admissibilité, puis établissez l’inventaire fiscal. Le ch. 415 est la dernière étape du calcul, pas le point de départ."
  },
  {
    "id": "K1",
    "tab": "K1 · Aucun résiduel",
    "title": "Aucune valeur résiduelle — la correction peut être nulle",
    "entity": "Bureau Clair Sàrl",
    "sector": "Conseil",
    "location": "Lausanne",
    "period": "Passage au 01.01.2027",
    "level": "Transition · débutant",
    "risk": "medium",
    "type": "quiz",
    "description": "Le changement de méthode ne signifie pas que toute la TVA déduite dans le passé doit être remboursée.",
    "conceptualNote": "Une correction n’existe que pour les biens et prestations encore disponibles ayant une valeur résiduelle et ayant donné lieu à une déduction de l’impôt préalable.",
    "mission": "Déterminez si une correction est nécessaire et identifiez la preuve à conserver lorsque le ch. 415 est nul.",
    "clientNote": "Le bureau ne détient ni stock, ni immobilisation, ni prestation acquise encore disponible, ni avance payée couvrant une période postérieure au changement.",
    "afcNote": "Les loyers, télécommunications, honoraires comptables et campagnes publicitaires des périodes écoulées ont été entièrement consommés.",
    "given": [
      {
        "label": "Stocks au 31.12.2026",
        "amount": 0,
        "note": "Aucune marchandise encore disponible.",
        "tag": "Inventaire"
      },
      {
        "label": "Immobilisations ayant donné droit à déduction",
        "amount": 0,
        "note": "Aucun actif détenu au moment du changement.",
        "tag": "Registre"
      },
      {
        "label": "Prestations encore disponibles",
        "amount": 0,
        "note": "Aucun droit, développement ou avance présentant une valeur résiduelle.",
        "tag": "Services"
      }
    ],
    "checks": [
      "Inventaire signé au 31.12.2026.",
      "Rapprochement avec le registre des immobilisations.",
      "Analyse des charges payées d’avance, des droits acquis et des prestations encore disponibles."
    ],
    "legal": "Art. 31 et 37 LTVA · pratique AFC applicable aux changements de méthode dès 2025 · ch. 415 · art. 79 OTVA",
    "sourceIds": [
      "tdfn-transition-2025",
      "afc-main",
      "info12",
      "ltva"
    ],
    "questions": [
      {
        "q": "Le seul fait de changer de méthode entraîne-t-il automatiquement un remboursement de toute la TVA déduite antérieurement?",
        "options": [
          "Oui",
          "Non"
        ],
        "answer": 1,
        "why": "Seul l’impôt préalable lié aux biens et prestations encore disponibles à concurrence de leur valeur résiduelle est concerné."
      },
      {
        "q": "Quel montant doit être porté au ch. 415 selon les données complètes de ce cas?",
        "options": [
          "CHF 0",
          "La totalité de l’impôt préalable 2026",
          "Un forfait de 20 % du chiffre d’affaires"
        ],
        "answer": 0,
        "why": "Aucune position ayant une valeur résiduelle n’a été identifiée. La correction est donc nulle dans ce scénario."
      },
      {
        "q": "Que faut-il conserver même si la correction est nulle?",
        "options": [
          "Aucun document",
          "Une note de rapprochement avec inventaire, immobilisations et prestations encore disponibles",
          "Uniquement une capture d’écran du Portail AFC"
        ],
        "answer": 1,
        "why": "Le dossier doit montrer pourquoi aucune valeur résiduelle n’a été retenue."
      }
    ],
    "lesson": "Un ch. 415 nul doit résulter d’un contrôle documenté, et non de l’absence de calcul."
  },
  {
    "id": "K2",
    "tab": "K2 · Ordinateur",
    "title": "Un ordinateur — calculer la part résiduelle selon les périodes fiscales",
    "entity": "Digital Comptabilité Sàrl",
    "sector": "Services",
    "location": "Renens",
    "period": "Passage au 01.01.2027",
    "level": "Transition · calcul simple",
    "risk": "medium",
    "type": "quiz",
    "description": "La valeur résiduelle TVA ne suit pas l’amortissement comptable. Le calcul part de l’impôt préalable effectivement déduit.",
    "conceptualNote": "Pour ce cas pédagogique, deux périodes fiscales sont prises en compte pour la dépréciation à raison de 1/5 par période.",
    "mission": "Calculez la part résiduelle, la correction et la rubrique du dernier décompte selon la méthode effective.",
    "clientNote": "L’ordinateur est affecté exclusivement à l’activité imposable et aucun changement d’utilisation n’est intervenu.",
    "afcNote": "L’impôt préalable de CHF 810 a été entièrement admis lors de l’acquisition. Mise en service le 01.01.2025.",
    "given": [
      {
        "label": "Impôt préalable effectivement déduit",
        "amount": 810,
        "note": "Montant admis après contrôle de la facture.",
        "tag": "IP"
      },
      {
        "label": "Mise en service",
        "note": "01.01.2025.",
        "tag": "Départ"
      },
      {
        "label": "Périodes fiscales prises en compte",
        "amount": 2,
        "note": "2025 et 2026.",
        "tag": "2 × 20 %"
      },
      {
        "label": "Passage aux TDFN",
        "note": "01.01.2027.",
        "tag": "Changement"
      }
    ],
    "checks": [
      "Utiliser l’impôt préalable admis, pas la valeur comptable nette.",
      "Déterminer les périodes fiscales selon les règles TVA.",
      "Reporter le résultat au ch. 415 du dernier décompte selon la méthode effective."
    ],
    "legal": "Art. 31 et 37 LTVA · pratique AFC applicable aux changements de méthode dès 2025 · ch. 415 · art. 79 OTVA",
    "sourceIds": [
      "tdfn-transition-2025",
      "afc-main",
      "info12",
      "ltva",
      "otva"
    ],
    "questions": [
      {
        "q": "Quelle part résiduelle reste après deux périodes fiscales à 20 % chacune?",
        "options": [
          "40 %",
          "60 %",
          "80 %"
        ],
        "answer": 1,
        "why": "Deux périodes représentent 40 % de dépréciation; la part résiduelle est donc de 60 %."
      },
      {
        "q": "Quelle correction doit être calculée?",
        "options": [
          "CHF 324",
          "CHF 486",
          "CHF 810"
        ],
        "answer": 1,
        "why": "CHF 810 × 60 % = CHF 486."
      },
      {
        "q": "L’ordinateur est totalement amorti dans la comptabilité commerciale. Le ch. 415 devient-il automatiquement nul?",
        "options": [
          "Oui",
          "Non"
        ],
        "answer": 1,
        "why": "La valeur comptable et le plan d’amortissement commercial ne déterminent pas la valeur résiduelle TVA."
      },
      {
        "q": "Où reporter CHF 486?",
        "options": [
          "Ch. 415 du dernier décompte selon la méthode effective",
          "Ch. 410 du premier décompte TDFN",
          "Ch. 220"
        ],
        "answer": 0,
        "why": "Le passage méthode effective → TDFN est corrigé au ch. 415 avant le changement."
      }
    ],
    "lesson": "Base de calcul: impôt préalable effectivement admis × part résiduelle TVA."
  },
  {
    "id": "K3",
    "tab": "K3 · Stock et machine",
    "title": "Stock non utilisé et machine — deux règles dans un même dossier",
    "entity": "Atelier Commerce Sàrl",
    "sector": "Commerce et production",
    "location": "Morges",
    "period": "Passage au 01.01.2027",
    "level": "Transition · application",
    "risk": "high",
    "type": "quiz",
    "description": "Un stock encore disponible conserve ici 100 % de l’impôt préalable admis, tandis qu’une machine utilisée perd 1/5 par période fiscale.",
    "conceptualNote": "Le montant du stock est déjà rapproché avec les factures et représente l’impôt préalable effectivement déduit; il ne provient pas d’un taux appliqué globalement à la valeur comptable.",
    "mission": "Calculez séparément la correction du stock et celle de la machine, puis totalisez le ch. 415.",
    "clientNote": "Le stock est composé uniquement de marchandises achetées en Suisse, encore non vendues et non utilisées au 31.12.2026.",
    "afcNote": "La machine a été mise en service le 01.01.2026 et une période fiscale est prise en compte.",
    "given": [
      {
        "label": "IP admis sur le stock encore disponible",
        "amount": 3240,
        "note": "Montant concilié avec l’inventaire et les pièces fournisseurs.",
        "tag": "100 % résiduel"
      },
      {
        "label": "IP admis sur la machine",
        "amount": 4050,
        "note": "Mise en service le 01.01.2026.",
        "tag": "1 période"
      },
      {
        "label": "Part résiduelle de la machine",
        "note": "80 % après une période fiscale.",
        "tag": "4/5"
      }
    ],
    "checks": [
      "Rapprocher le stock avec les factures et notes de crédit.",
      "Ne pas appliquer automatiquement 8,1 % à la valeur comptable du stock.",
      "Séparer les biens non utilisés des immobilisations déjà utilisées."
    ],
    "legal": "Art. 31 et 37 LTVA · pratique AFC applicable aux changements de méthode dès 2025 · ch. 415 · art. 79 OTVA",
    "sourceIds": [
      "tdfn-transition-2025",
      "afc-main",
      "info12",
      "ltva",
      "otva"
    ],
    "questions": [
      {
        "q": "Quelle correction concerne le stock encore non utilisé?",
        "options": [
          "CHF 0",
          "CHF 648",
          "CHF 3’240"
        ],
        "answer": 2,
        "why": "Dans ce cas, le stock est encore entièrement disponible; l’impôt préalable admis de CHF 3’240 est retenu à 100 %."
      },
      {
        "q": "Quelle correction concerne la machine?",
        "options": [
          "CHF 810",
          "CHF 3’240",
          "CHF 4’050"
        ],
        "answer": 1,
        "why": "CHF 4’050 × 80 % = CHF 3’240."
      },
      {
        "q": "Quel total doit être porté au ch. 415?",
        "options": [
          "CHF 3’240",
          "CHF 6’480",
          "CHF 7’290"
        ],
        "answer": 1,
        "why": "CHF 3’240 de stock + CHF 3’240 de machine = CHF 6’480."
      },
      {
        "q": "Pourquoi ne faut-il pas multiplier toute la valeur comptable du stock par 8,1 %?",
        "options": [
          "Parce que la correction se fonde sur l’impôt préalable effectivement déduit et documenté",
          "Parce que les stocks ne sont jamais corrigés",
          "Parce que le TDFN remplace les factures fournisseurs"
        ],
        "answer": 0,
        "why": "Les taux d’achat, importations, acquisitions sans TVA, notes de crédit et restrictions de déduction peuvent différer."
      }
    ],
    "lesson": "Traitez chaque catégorie séparément et partez toujours de l’impôt préalable réellement admis."
  },
  {
    "id": "K4",
    "tab": "K4 · Services",
    "title": "ERP, SaaS et honoraires — quelles prestations ont encore une valeur?",
    "entity": "Processus PME SA",
    "sector": "Services numériques",
    "location": "Genève",
    "period": "Passage au 01.01.2027",
    "level": "Transition · qualification",
    "risk": "high",
    "type": "quiz",
    "description": "Toutes les prestations de services ne conservent pas une valeur résiduelle. La qualification précède le calcul.",
    "conceptualNote": "Le cas suppose qu’une licence ERP perpétuelle et un développement individualisé constituent un résultat encore disponible. Les abonnements et prestations courantes des périodes écoulées sont consommés; aucune charge payée d’avance ne couvre une période postérieure au changement.",
    "mission": "Séparez les prestations encore disponibles des charges déjà consommées, puis calculez la correction ERP.",
    "clientNote": "L’ERP continue d’être exploité après le passage. Les frais annuels de support, de SaaS et d’hébergement prennent fin au 31.12.2026 et ne comprennent aucune avance pour 2027.",
    "afcNote": "L’impôt préalable admis sur la licence perpétuelle et le développement durable est de CHF 1’620; une période fiscale est prise en compte.",
    "given": [
      {
        "label": "Licence ERP perpétuelle et développement individualisé",
        "amount": 1620,
        "note": "Impôt préalable admis; résultat encore disponible.",
        "tag": "Valeur résiduelle"
      },
      {
        "label": "SaaS mensuel et hébergement 2026",
        "note": "Prestations courantes consommées.",
        "tag": "Pas de résiduel"
      },
      {
        "label": "Support, publicité et comptabilité 2026",
        "note": "Prestations achevées dans le cas.",
        "tag": "Consommées"
      },
      {
        "label": "Part résiduelle ERP",
        "note": "80 % après une période fiscale.",
        "tag": "4/5"
      }
    ],
    "checks": [
      "Documenter la nature et la durée du droit acquis.",
      "Exclure maintenance et exploitation courantes du calcul.",
      "Éviter de reprendre automatiquement toutes les factures de services des cinq dernières années."
    ],
    "legal": "Art. 31 et 37 LTVA · pratique AFC applicable aux changements de méthode dès 2025 · ch. 415 · art. 79 OTVA",
    "sourceIds": [
      "tdfn-transition-2025",
      "afc-main",
      "info12",
      "ltva",
      "otva"
    ],
    "questions": [
      {
        "q": "Quelle position présente une valeur résiduelle selon les hypothèses du cas?",
        "options": [
          "La licence ERP perpétuelle et le développement individualisé",
          "La campagne publicitaire achevée",
          "Les honoraires comptables mensuels"
        ],
        "answer": 0,
        "why": "Le résultat ERP continue d’être disponible; les autres prestations indiquées sont déjà consommées."
      },
      {
        "q": "Quelle correction est calculée sur l’ERP?",
        "options": [
          "CHF 324",
          "CHF 1’296",
          "CHF 1’620"
        ],
        "answer": 1,
        "why": "CHF 1’620 × 80 % = CHF 1’296."
      },
      {
        "q": "Quelle méthode de travail est correcte?",
        "options": [
          "Reprendre toutes les factures de services des cinq dernières années",
          "Analyser si le résultat de la prestation est encore disponible au moment du changement",
          "Exclure toutes les prestations immatérielles sans analyse"
        ],
        "answer": 1,
        "why": "La présence d’une valeur résiduelle dépend de la prestation et de sa disponibilité, pas seulement de son caractère matériel ou immatériel."
      }
    ],
    "lesson": "Pour les services, la qualification de la valeur encore disponible est aussi importante que l’arithmétique."
  },
  {
    "id": "K5",
    "tab": "K5 · Déduction partielle",
    "title": "Droit partiel à l’impôt préalable — corriger uniquement le montant admis",
    "entity": "Formation Mixte SA",
    "sector": "Activités imposables et exclues",
    "location": "Fribourg",
    "period": "Passage au 01.01.2027",
    "level": "Transition · avancé",
    "risk": "high",
    "type": "quiz",
    "description": "La TVA figurant sur la facture n’est pas toujours la base de la correction. Il faut partir du montant définitivement admis après les corrections antérieures.",
    "conceptualNote": "Le cas fournit directement l’impôt préalable définitivement admis afin de concentrer l’exercice sur la transition de méthode.",
    "mission": "Identifiez la bonne base, appliquez la part résiduelle et documentez le ch. 415.",
    "clientNote": "L’équipement sert à des activités imposables et exclues. La clé d’utilisation a déjà été contrôlée dans les périodes antérieures.",
    "afcNote": "TVA de la facture CHF 8’100; impôt préalable définitivement admis après corrections CHF 6’075; une période fiscale écoulée.",
    "given": [
      {
        "label": "TVA figurant sur la facture",
        "amount": 8100,
        "note": "Montant brut, non entièrement déductible.",
        "tag": "Facture"
      },
      {
        "label": "Impôt préalable définitivement admis",
        "amount": 6075,
        "note": "75 % après les corrections antérieures.",
        "tag": "Base correcte"
      },
      {
        "label": "Part résiduelle",
        "note": "80 % après une période fiscale.",
        "tag": "4/5"
      }
    ],
    "checks": [
      "Reprendre le montant admis après les corrections antérieures.",
      "Conserver la clé d’affectation et son rapprochement.",
      "Ne pas recalculer rétroactivement une déduction fictive de 100 %."
    ],
    "legal": "Art. 31 et 37 LTVA · pratique AFC applicable aux changements de méthode dès 2025 · ch. 415 · art. 79 OTVA",
    "sourceIds": [
      "tdfn-transition-2025",
      "afc-main",
      "info12",
      "ltva",
      "otva"
    ],
    "questions": [
      {
        "q": "Quelle base faut-il utiliser pour la correction?",
        "options": [
          "CHF 8’100, soit toute la TVA de la facture",
          "CHF 6’075, soit l’impôt préalable définitivement admis",
          "La valeur comptable nette de l’équipement"
        ],
        "answer": 1,
        "why": "La correction porte sur l’impôt préalable réellement déduit après les restrictions et corrections antérieures."
      },
      {
        "q": "Quelle correction résulte du cas?",
        "options": [
          "CHF 1’215",
          "CHF 4’860",
          "CHF 6’480"
        ],
        "answer": 1,
        "why": "CHF 6’075 × 80 % = CHF 4’860."
      },
      {
        "q": "Quel document est essentiel?",
        "options": [
          "La clé d’affectation et le rapprochement de l’impôt préalable admis",
          "Une estimation orale du client",
          "Uniquement le tableau d’amortissement commercial"
        ],
        "answer": 0,
        "why": "Le dossier doit permettre de reconstituer le droit partiel et les corrections déjà opérées."
      }
    ],
    "lesson": "Ne corrigez jamais plus d’impôt préalable que celui qui a effectivement été admis."
  },
  {
    "id": "L0",
    "tab": "L0 · Cadre du retour",
    "title": "Passage des TDFN à la méthode effective — préparer le dossier avant le ch. 410",
    "entity": "Retour Effective Sàrl",
    "sector": "Services",
    "location": "Neuchâtel",
    "period": "Passage au 01.01.2027",
    "level": "Transition inverse · cadre",
    "risk": "high",
    "type": "quiz",
    "description": "Le retour à la méthode effective exige une décision de méthode, un inventaire à la date d’effet et un calcul séparé du dégrèvement ultérieur.",
    "conceptualNote": "La demande de changement doit être effectuée dans le délai applicable. Les sous-cas L1 à L7 supposent que le changement prend effet au 01.01.2027 et que le mode «convenues» ou «reçues» reste inchangé.",
    "mission": "Identifiez le délai, le premier décompte concerné, le chiffre 410 et les contrôles à effectuer avant tout calcul.",
    "clientNote": "L’entreprise sort des TDFN au début d’une période fiscale complète. Aucun changement simultané du mode de décompte convenues/reçues n’est traité dans ce module.",
    "afcNote": "Le dégrèvement ultérieur est déclaré dans le premier décompte selon la méthode effective, au ch. 410. Le calcul doit être documenté par actif ou prestation.",
    "given": [
      {
        "label": "Méthode jusqu’au 31.12.2026",
        "note": "TDFN appliquée pendant toute la période fiscale 2026.",
        "tag": "1 période"
      },
      {
        "label": "Méthode dès le 01.01.2027",
        "note": "Méthode effective.",
        "tag": "Entrée"
      },
      {
        "label": "Délai de demande",
        "note": "Au plus tard 60 jours après le début de la période fiscale visée.",
        "tag": "Délai"
      },
      {
        "label": "Rubrique de la déduction",
        "note": "Premier décompte selon la méthode effective, ch. 410.",
        "tag": "410"
      }
    ],
    "checks": [
      "Vérifier qu’au moins une période fiscale complète a été décomptée aux TDFN et que le changement prend effet au début de la période suivante.",
      "Inventorier les biens et prestations encore disponibles au moment du changement.",
      "Reconstituer l’impôt grevant à partir des pièces, sans inventer un impôt préalable forfaitaire.",
      "Appliquer la part résiduelle et, le cas échéant, la part d’utilisation ouvrant droit à déduction.",
      "Traiter séparément toute modification simultanée du mode convenues/reçues."
    ],
    "legal": "Art. 32 et 37 LTVA · pratique AFC applicable aux changements de méthode dès 2025 · ch. 410 · art. 81 OTVA",
    "sourceIds": [
      "tdfn-transition-2025",
      "afc-main",
      "info12",
      "ltva",
      "otva"
    ],
    "questions": [
      {
        "q": "La durée minimale est-elle respectée dans ce cas?",
        "options": [
          "Oui, une période fiscale complète a été décomptée aux TDFN",
          "Non, trois périodes TDFN sont toujours obligatoires",
          "La durée ne doit jamais être vérifiée"
        ],
        "answer": 0,
        "why": "Le cas retient une période fiscale complète sous TDFN avant le retour à la méthode effective."
      },
      {
        "q": "Dans quel délai la demande de retour à la méthode effective doit-elle être effectuée pour la période visée?",
        "options": [
          "Dans les 60 jours suivant le début de la période fiscale",
          "À n’importe quel moment après la clôture",
          "Uniquement après réception du premier décompte effectif"
        ],
        "answer": 0,
        "why": "Le cas applique le délai prévu à l’art. 81 OTVA: au plus tard 60 jours après le début de la période fiscale à partir de laquelle le changement doit prendre effet."
      },
      {
        "q": "Dans quel décompte le dégrèvement ultérieur est-il revendiqué?",
        "options": [
          "Dernier décompte TDFN",
          "Premier décompte selon la méthode effective",
          "Uniquement dans la concordance annuelle"
        ],
        "answer": 1,
        "why": "La déduction est portée au ch. 410 du premier décompte après le passage à la méthode effective."
      },
      {
        "q": "Quelle base de travail est professionnelle?",
        "options": [
          "La valeur comptable nette multipliée par 8,1 %",
          "L’impôt grevant documenté, limité par la valeur résiduelle et le droit à déduction",
          "Un forfait de 20 % du chiffre d’affaires"
        ],
        "answer": 1,
        "why": "La valeur résiduelle TVA et l’impôt grevant doivent être reconstitués et documentés par position."
      },
      {
        "q": "Pourquoi le mode convenues/reçues est-il explicitement maintenu dans les sous-cas?",
        "options": [
          "Pour éviter de mélanger le dégrèvement avec des corrections distinctes sur débiteurs et créanciers",
          "Parce que ce mode n’a jamais d’effet TVA",
          "Parce que le ch. 410 est réservé aux encaissements"
        ],
        "answer": 0,
        "why": "Un changement simultané du mode de décompte entraîne des corrections séparées qui ne doivent pas être confondues avec la valeur résiduelle."
      }
    ],
    "lesson": "Le ch. 410 est l’aboutissement d’un dossier documenté: admissibilité du changement, inventaire, impôt grevant, valeur résiduelle et droit à déduction."
  },
  {
    "id": "L1",
    "tab": "L1 · Aucun résiduel",
    "title": "Aucun bien ni service encore disponible — ch. 410 égal à zéro",
    "entity": "Conseil Simple Sàrl",
    "sector": "Conseil",
    "location": "Lausanne",
    "period": "Passage au 01.01.2027",
    "level": "Transition inverse · débutant",
    "risk": "medium",
    "type": "quiz",
    "description": "Le retour à la méthode effective ne crée pas automatiquement un crédit de TVA.",
    "conceptualNote": "Aucun stock, actif, droit durable, travail en cours ni avance couvrant une période postérieure au changement n’a été identifié.",
    "mission": "Concluez sur le ch. 410 et choisissez les documents qui justifient un montant nul.",
    "clientNote": "Les loyers, honoraires, publicité, télécommunications et abonnements 2026 sont entièrement consommés au 31.12.2026.",
    "afcNote": "Le dossier contient un inventaire nul, un registre des immobilisations rapproché et une analyse des prestations encore disponibles.",
    "given": [
      {
        "label": "Stocks",
        "amount": 0,
        "note": "Aucun stock.",
        "tag": "Inventaire"
      },
      {
        "label": "Immobilisations et droits encore disponibles",
        "amount": 0,
        "note": "Aucune position.",
        "tag": "Registre"
      },
      {
        "label": "Charges payées d’avance pour 2027",
        "amount": 0,
        "note": "Aucune avance.",
        "tag": "Cut-off"
      }
    ],
    "checks": [
      "Documenter la conclusion nulle.",
      "Ne pas recréer un impôt préalable sur des charges déjà consommées.",
      "Reporter CHF 0 au ch. 410 dans les hypothèses du cas."
    ],
    "legal": "Art. 32 et 37 LTVA · pratique AFC applicable aux changements de méthode dès 2025 · ch. 410 · art. 81 OTVA",
    "sourceIds": [
      "tdfn-transition-2025",
      "afc-main",
      "info12",
      "ltva",
      "otva"
    ],
    "questions": [
      {
        "q": "Le simple retour à la méthode effective donne-t-il droit à récupérer toute la TVA supportée pendant les années TDFN?",
        "options": [
          "Oui",
          "Non"
        ],
        "answer": 1,
        "why": "Seul l’impôt grevant les biens et prestations encore disponibles à concurrence de leur valeur résiduelle peut être pris en compte."
      },
      {
        "q": "Quel montant résulte des données complètes du cas?",
        "options": [
          "CHF 0",
          "Toute la TVA 2026",
          "20 % des charges"
        ],
        "answer": 0,
        "why": "Aucune position encore disponible n’a été identifiée."
      },
      {
        "q": "Quelle preuve est attendue?",
        "options": [
          "Aucune, puisque le montant est nul",
          "Inventaire, registre des immobilisations et analyse des prestations/avances",
          "Une estimation orale du client"
        ],
        "answer": 1,
        "why": "Le dossier doit rendre la conclusion nulle contrôlable."
      }
    ],
    "lesson": "Un ch. 410 nul est une conclusion documentée, pas une absence de travail."
  },
  {
    "id": "L2",
    "tab": "L2 · Ordinateur",
    "title": "Un ordinateur — calcul simple du dégrèvement ultérieur",
    "entity": "Digital Retour Sàrl",
    "sector": "Services",
    "location": "Renens",
    "period": "Passage au 01.01.2027",
    "level": "Transition inverse · calcul simple",
    "risk": "medium",
    "type": "quiz",
    "description": "L’entreprise n’a pas déduit l’impôt préalable pendant la période TDFN. La part correspondant à la valeur résiduelle peut devenir déductible lors du passage à la méthode effective.",
    "conceptualNote": "L’ordinateur a été mis en service le 01.01.2025. Deux périodes fiscales sont prises en compte à raison de 1/5 chacune; l’utilisation future ouvre entièrement droit à déduction.",
    "mission": "Calculez la part résiduelle et le montant à porter au ch. 410 du premier décompte effectif.",
    "clientNote": "La facture suisse documente une TVA de CHF 810. L’actif est utilisé exclusivement pour l’activité imposable après le changement.",
    "afcNote": "La valeur comptable commerciale n’est pas la base du calcul TVA.",
    "given": [
      {
        "label": "Impôt grevant documenté",
        "amount": 810,
        "note": "TVA selon la facture admissible.",
        "tag": "Base"
      },
      {
        "label": "Périodes fiscales prises en compte",
        "amount": 2,
        "note": "2025 et 2026.",
        "tag": "2 × 20 %"
      },
      {
        "label": "Part résiduelle",
        "note": "60 %.",
        "tag": "3/5"
      },
      {
        "label": "Utilisation ouvrant droit après le changement",
        "note": "100 %.",
        "tag": "Droit"
      }
    ],
    "checks": [
      "Partir de la TVA documentée.",
      "Appliquer 60 % de valeur résiduelle.",
      "Déduire CHF 486 au ch. 410 du premier décompte effectif."
    ],
    "legal": "Art. 32 et 37 LTVA · pratique AFC applicable aux changements de méthode dès 2025 · ch. 410 · art. 81 OTVA",
    "sourceIds": [
      "tdfn-transition-2025",
      "afc-main",
      "info12",
      "ltva",
      "otva"
    ],
    "questions": [
      {
        "q": "Quelle part résiduelle subsiste?",
        "options": [
          "40 %",
          "60 %",
          "80 %"
        ],
        "answer": 1,
        "why": "Deux périodes à 20 % représentent 40 % de dépréciation; il reste 60 %."
      },
      {
        "q": "Quel montant peut être revendiqué?",
        "options": [
          "CHF 324",
          "CHF 486",
          "CHF 810"
        ],
        "answer": 1,
        "why": "CHF 810 × 60 % × 100 % = CHF 486."
      },
      {
        "q": "Où déclarer ce montant?",
        "options": [
          "Premier décompte effectif, ch. 410",
          "Dernier décompte TDFN, ch. 415",
          "Ch. 220"
        ],
        "answer": 0,
        "why": "Le dégrèvement est revendiqué après le passage, au ch. 410."
      }
    ],
    "lesson": "Impôt grevant documenté × part résiduelle × part ouvrant droit = déduction ch. 410."
  },
  {
    "id": "L3",
    "tab": "L3 · Stock et machine",
    "title": "Stock non utilisé et machine — deux positions, un ch. 410",
    "entity": "Commerce Relance SA",
    "sector": "Commerce et production",
    "location": "Morges",
    "period": "Passage au 01.01.2027",
    "level": "Transition inverse · application",
    "risk": "high",
    "type": "quiz",
    "description": "Un stock non utilisé conserve ici 100 % de l’impôt grevant, tandis qu’une machine déjà utilisée conserve 80 % après une période fiscale.",
    "conceptualNote": "Les montants de TVA ont été rapprochés avec les factures et l’inventaire. Aucun calcul global à partir de la valeur comptable du stock n’est admis.",
    "mission": "Calculez chaque ligne et totalisez la déduction du premier décompte effectif.",
    "clientNote": "Le stock n’a pas encore été vendu ni utilisé. La machine a été mise en service le 01.01.2026 et sera affectée entièrement à l’activité imposable.",
    "afcNote": "Impôt grevant documenté: stock CHF 3’240; machine CHF 4’050.",
    "given": [
      {
        "label": "Stock non utilisé",
        "amount": 3240,
        "note": "Impôt grevant documenté, part résiduelle 100 %.",
        "tag": "Stock"
      },
      {
        "label": "Machine",
        "amount": 4050,
        "note": "Impôt grevant documenté, part résiduelle 80 %.",
        "tag": "Machine"
      },
      {
        "label": "Utilisation future ouvrant droit",
        "note": "100 % pour les deux positions.",
        "tag": "Droit"
      }
    ],
    "checks": [
      "Stock: CHF 3’240.",
      "Machine: CHF 4’050 × 80 % = CHF 3’240.",
      "Total ch. 410: CHF 6’480."
    ],
    "legal": "Art. 32 et 37 LTVA · pratique AFC applicable aux changements de méthode dès 2025 · ch. 410 · art. 81 OTVA",
    "sourceIds": [
      "tdfn-transition-2025",
      "afc-main",
      "info12",
      "ltva",
      "otva"
    ],
    "questions": [
      {
        "q": "Quel montant concerne le stock?",
        "options": [
          "CHF 0",
          "CHF 648",
          "CHF 3’240"
        ],
        "answer": 2,
        "why": "Le stock est encore entièrement disponible et ouvre droit selon les hypothèses."
      },
      {
        "q": "Quel montant concerne la machine?",
        "options": [
          "CHF 810",
          "CHF 3’240",
          "CHF 4’050"
        ],
        "answer": 1,
        "why": "CHF 4’050 × 80 % = CHF 3’240."
      },
      {
        "q": "Quel total doit être porté au ch. 410?",
        "options": [
          "CHF 3’240",
          "CHF 6’480",
          "CHF 7’290"
        ],
        "answer": 1,
        "why": "CHF 3’240 + CHF 3’240 = CHF 6’480."
      }
    ],
    "lesson": "Le tableau de reprise doit rester traçable jusqu’aux factures, à l’inventaire et au registre des immobilisations."
  },
  {
    "id": "L4",
    "tab": "L4 · Prestations",
    "title": "ERP, SaaS et honoraires — distinguer ce qui reste disponible",
    "entity": "Processus Retour SA",
    "sector": "Services numériques",
    "location": "Genève",
    "period": "Passage au 01.01.2027",
    "level": "Transition inverse · qualification",
    "risk": "high",
    "type": "quiz",
    "description": "Le dégrèvement ultérieur ne vise pas toutes les prestations payées sous TDFN. Il faut déterminer si leur résultat est encore disponible au moment du changement.",
    "conceptualNote": "Le cas retient une licence ERP perpétuelle et un développement individualisé encore exploités. Le SaaS, l’hébergement, le support, la publicité et la comptabilité des périodes écoulées sont consommés; aucune avance 2027 n’existe.",
    "mission": "Qualifiez chaque prestation et calculez uniquement le montant lié à l’ERP.",
    "clientNote": "L’impôt grevant documenté sur l’ERP est CHF 1’620. Une période fiscale est prise en compte et l’utilisation future ouvre entièrement droit.",
    "afcNote": "Les prestations courantes consommées ne sont pas transformées en valeur résiduelle par le seul passage à la méthode effective.",
    "given": [
      {
        "label": "ERP perpétuel et développement individualisé",
        "amount": 1620,
        "note": "Impôt grevant documenté; part résiduelle 80 %.",
        "tag": "Disponible"
      },
      {
        "label": "SaaS et hébergement jusqu’au 31.12.2026",
        "amount": 0,
        "note": "Prestations consommées; aucune avance 2027.",
        "tag": "Consommé"
      },
      {
        "label": "Support, publicité et comptabilité",
        "amount": 0,
        "note": "Prestations achevées.",
        "tag": "Consommé"
      }
    ],
    "checks": [
      "Qualifier la disponibilité avant le calcul.",
      "ERP: CHF 1’620 × 80 % = CHF 1’296.",
      "Autres prestations: aucune déduction dans les hypothèses."
    ],
    "legal": "Art. 32 et 37 LTVA · pratique AFC applicable aux changements de méthode dès 2025 · ch. 410 · art. 81 OTVA",
    "sourceIds": [
      "tdfn-transition-2025",
      "afc-main",
      "info12",
      "ltva",
      "otva"
    ],
    "questions": [
      {
        "q": "Quelle position reste disponible selon le cas?",
        "options": [
          "ERP perpétuel et développement individualisé",
          "Publicité achevée",
          "Honoraires comptables mensuels"
        ],
        "answer": 0,
        "why": "Le résultat ERP continue à être utilisé; les autres prestations sont consommées."
      },
      {
        "q": "Quel montant peut être revendiqué?",
        "options": [
          "CHF 324",
          "CHF 1’296",
          "CHF 1’620"
        ],
        "answer": 1,
        "why": "CHF 1’620 × 80 % = CHF 1’296."
      },
      {
        "q": "Quelle approche est incorrecte?",
        "options": [
          "Analyser chaque prestation",
          "Reprendre automatiquement toutes les factures de services des cinq dernières années",
          "Contrôler les avances et périodes couvertes"
        ],
        "answer": 1,
        "why": "La durée passée ne suffit pas; il faut établir la disponibilité au moment du changement."
      }
    ],
    "lesson": "Pour les services, la qualification juridique et factuelle précède toujours l’arithmétique."
  },
  {
    "id": "L5",
    "tab": "L5 · Droit partiel",
    "title": "Utilisation future partiellement déductible — ajouter le troisième facteur",
    "entity": "Formation Mixte Retour SA",
    "sector": "Activités imposables et exclues",
    "location": "Fribourg",
    "period": "Passage au 01.01.2027",
    "level": "Transition inverse · avancé",
    "risk": "high",
    "type": "quiz",
    "description": "La valeur résiduelle ne suffit pas. Le dégrèvement est limité à la part d’utilisation qui ouvrira droit à déduction sous la méthode effective.",
    "conceptualNote": "L’équipement a supporté CHF 8’100 de TVA documentée. Après une période fiscale, la part résiduelle est 80 %. L’utilisation future est prévue à 75 % pour des prestations imposables et à 25 % pour des prestations exclues.",
    "mission": "Appliquez successivement la part résiduelle et la part ouvrant droit à déduction.",
    "clientNote": "La clé future de 75/25 est fondée sur un budget d’activité et sera revue si l’utilisation réelle diverge.",
    "afcNote": "Le cas ne suppose pas un droit rétroactif de 100 %: la déduction est limitée à l’affectation ouvrant droit.",
    "given": [
      {
        "label": "Impôt grevant documenté",
        "amount": 8100,
        "note": "TVA de la facture.",
        "tag": "Base"
      },
      {
        "label": "Part résiduelle",
        "note": "80 %.",
        "tag": "4/5"
      },
      {
        "label": "Part d’utilisation ouvrant droit",
        "note": "75 %.",
        "tag": "Droit"
      },
      {
        "label": "Part d’utilisation exclue",
        "note": "25 %.",
        "tag": "Sans droit"
      }
    ],
    "checks": [
      "Calculer CHF 8’100 × 80 % × 75 %.",
      "Documenter la clé future.",
      "Ne pas confondre la part résiduelle avec la part ouvrant droit."
    ],
    "legal": "Art. 32 et 37 LTVA · pratique AFC applicable aux changements de méthode dès 2025 · ch. 410 · art. 81 OTVA",
    "sourceIds": [
      "tdfn-transition-2025",
      "afc-main",
      "info12",
      "ltva",
      "otva"
    ],
    "questions": [
      {
        "q": "Quelle est la valeur fiscale résiduelle de l’impôt grevant avant la restriction d’utilisation?",
        "options": [
          "CHF 1’620",
          "CHF 6’480",
          "CHF 8’100"
        ],
        "answer": 1,
        "why": "CHF 8’100 × 80 % = CHF 6’480."
      },
      {
        "q": "Quel montant final peut être revendiqué?",
        "options": [
          "CHF 4’860",
          "CHF 6’075",
          "CHF 6’480"
        ],
        "answer": 0,
        "why": "CHF 8’100 × 80 % × 75 % = CHF 4’860."
      },
      {
        "q": "Quel document est déterminant en plus de la facture?",
        "options": [
          "La clé d’affectation future et son fondement",
          "Uniquement l’amortissement commercial",
          "Une estimation non documentée"
        ],
        "answer": 0,
        "why": "Le droit partiel doit être justifié et contrôlable."
      }
    ],
    "lesson": "Trois éléments distincts: impôt grevant, part résiduelle, part d’utilisation ouvrant droit."
  },
  {
    "id": "L6",
    "tab": "L6 · Immeuble expert",
    "title": "Immeuble propre — valeur résiduelle sur vingt périodes",
    "entity": "Administration Immo SA",
    "sector": "Entreprise avec bâtiment administratif propre",
    "location": "Vaud",
    "period": "Passage au 01.01.2027",
    "level": "Transition inverse · expert",
    "risk": "high",
    "type": "quiz",
    "description": "Pour un immeuble, la dépréciation TVA se calcule en principe à raison de 1/20 par période fiscale. Les hypothèses doivent être strictement encadrées.",
    "conceptualNote": "Le cas porte uniquement sur des travaux augmentant la valeur d’un bâtiment propre utilisé intégralement pour une activité imposable. Le terrain, l’entretien courant, les subventions, l’utilisation mixte et les règles spéciales de transformation importante sont exclus.",
    "mission": "Calculez la part résiduelle après trois périodes fiscales et le montant du ch. 410.",
    "clientNote": "Travaux mis en service le 01.01.2024; impôt grevant documenté CHF 16’200; utilisation ouvrant droit 100 % après le changement.",
    "afcNote": "Trois périodes représentent 15 % de dépréciation; la part résiduelle est 85 %.",
    "given": [
      {
        "label": "Impôt grevant sur travaux augmentant la valeur",
        "amount": 16200,
        "note": "Terrain et entretien exclus.",
        "tag": "Base"
      },
      {
        "label": "Périodes fiscales prises en compte",
        "amount": 3,
        "note": "2024, 2025 et 2026.",
        "tag": "3 × 5 %"
      },
      {
        "label": "Part résiduelle",
        "note": "85 %.",
        "tag": "17/20"
      },
      {
        "label": "Utilisation ouvrant droit",
        "note": "100 %.",
        "tag": "Droit"
      }
    ],
    "checks": [
      "Exclure terrain et frais d’entretien courant.",
      "Appliquer 5 % par période fiscale.",
      "CHF 16’200 × 85 % = CHF 13’770.",
      "Conserver factures, mise en service, affectation et historique des corrections."
    ],
    "legal": "Art. 32 et 37 LTVA · pratique AFC applicable aux changements de méthode dès 2025 · ch. 410 · art. 81 OTVA",
    "sourceIds": [
      "tdfn-transition-2025",
      "afc-main",
      "info12",
      "ltva",
      "otva"
    ],
    "questions": [
      {
        "q": "Quelle part résiduelle subsiste après trois périodes à 5 %?",
        "options": [
          "15 %",
          "80 %",
          "85 %"
        ],
        "answer": 2,
        "why": "100 % − 3 × 5 % = 85 %."
      },
      {
        "q": "Quel montant peut être revendiqué dans le cas?",
        "options": [
          "CHF 2’430",
          "CHF 12’960",
          "CHF 13’770"
        ],
        "answer": 2,
        "why": "CHF 16’200 × 85 % = CHF 13’770."
      },
      {
        "q": "Quel élément est exclu du calcul simplifié?",
        "options": [
          "Le terrain et les frais d’entretien courant",
          "Les travaux augmentant la valeur",
          "La date de mise en service"
        ],
        "answer": 0,
        "why": "Le cas vise uniquement la charge fiscale documentée sur les travaux augmentant la valeur."
      }
    ],
    "lesson": "L’immobilier exige un dossier séparé et des hypothèses explicites; il ne doit pas être réduit à une formule sans pièces."
  },
  {
    "id": "L7",
    "tab": "L7 · Prestation prépayée",
    "title": "Prestation payée d’avance — droit encore disponible au changement",
    "entity": "Services Anticipés SA",
    "sector": "Conseil et maintenance",
    "location": "Lausanne",
    "period": "Passage au 01.01.2027",
    "level": "Transition inverse · qualification avancée",
    "risk": "high",
    "type": "quiz",
    "description": "Une prestation de services n’est pas forcément consommée parce que la facture a été payée. Il faut vérifier ce qui reste contractuellement disponible au moment du changement.",
    "conceptualNote": "Une facture suisse de CHF 10’810 TTC a été émise et payée en décembre 2026 pour une prestation de maintenance entièrement fournie de janvier à décembre 2027. L’impôt grevant documenté est CHF 810. Le droit acquis est encore disponible à 100 % au 01.01.2027 et sera utilisé exclusivement pour une activité imposable.",
    "mission": "Distinguez une charge prépayée encore disponible d’une prestation déjà consommée, puis calculez le dégrèvement du premier décompte effectif.",
    "clientNote": "Le contrat, la facture, le paiement et le calendrier de prestation concordent. Aucune partie du service n’a été fournie avant le 01.01.2027.",
    "afcNote": "Le traitement dépend de la disponibilité réelle et documentée de la prestation au moment du changement, pas seulement de la date de paiement ou de la comptabilisation.",
    "given": [
      {
        "label": "Prix TTC de la maintenance 2027",
        "amount": 10810,
        "note": "Facture suisse payée en décembre 2026.",
        "tag": "Prépayé"
      },
      {
        "label": "Impôt grevant documenté",
        "amount": 810,
        "note": "TVA indiquée sur la facture.",
        "tag": "Base"
      },
      {
        "label": "Part encore disponible au 01.01.2027",
        "note": "100 %.",
        "tag": "Résiduel"
      },
      {
        "label": "Utilisation future ouvrant droit",
        "note": "100 %.",
        "tag": "Droit"
      }
    ],
    "checks": [
      "Contrat et calendrier: prestation entièrement postérieure au changement.",
      "Facture et preuve de paiement rapprochées avec le compte de charges payées d’avance.",
      "Part résiduelle 100 % et part ouvrant droit 100 %.",
      "Déduction ch. 410: CHF 810."
    ],
    "legal": "Art. 32 et 37 LTVA · pratique AFC applicable aux changements de méthode dès 2025 · ch. 410 · art. 81 OTVA",
    "sourceIds": [
      "tdfn-transition-2025",
      "afc-main",
      "info12",
      "ltva",
      "otva"
    ],
    "questions": [
      {
        "q": "La prestation est-elle considérée comme entièrement consommée au 01.01.2027?",
        "options": [
          "Oui, parce qu’elle a été payée en 2026",
          "Non, car elle sera entièrement fournie en 2027 et le droit reste disponible"
        ],
        "answer": 1,
        "why": "Le paiement antérieur ne suffit pas à rendre la prestation consommée; le contrat montre qu’elle reste disponible après le changement."
      },
      {
        "q": "Quelle part résiduelle est retenue dans ce cas?",
        "options": [
          "0 %",
          "80 %",
          "100 %"
        ],
        "answer": 2,
        "why": "Aucune partie de la prestation n’a été fournie avant le changement."
      },
      {
        "q": "Quel montant peut être porté au ch. 410?",
        "options": [
          "CHF 0",
          "CHF 648",
          "CHF 810"
        ],
        "answer": 2,
        "why": "CHF 810 × 100 % × 100 % = CHF 810."
      },
      {
        "q": "Quel document est essentiel en plus de la facture?",
        "options": [
          "Le contrat et le calendrier de prestation",
          "Uniquement l’extrait bancaire",
          "La valeur comptable d’un ordinateur"
        ],
        "answer": 0,
        "why": "Le contrat et le calendrier démontrent que le service est encore disponible au moment du changement."
      }
    ],
    "lesson": "Pour les prestations prépayées, vérifiez la période réellement couverte. Date de facture, paiement, consommation et disponibilité sont quatre éléments distincts."
  },
  {
    "id": "L",
    "tab": "L · Fonds",
    "title": "Subvention et dividende — rubriques 900 et 910",
    "entity": "Innovation Locale Sàrl",
    "sector": "Conseil et développement de projets",
    "location": "Morges",
    "period": "S1 2026",
    "level": "Avancé",
    "risk": "medium",
    "description": "Les autres mouvements de fonds sont déclarés séparément et ne sont pas ajoutés au chiffre d’affaires imposable.",
    "mission": "Déclarez les honoraires au ch. 200, puis reportez la subvention au ch. 900 et le dividende au ch. 910.",
    "clientNote": "Les honoraires imposables sont facturés au taux légal; la subvention et le dividende suivent leur qualification propre.",
    "afcNote": "Les montants des ch. 900 et 910 figurent dans la section III et ne modifient pas automatiquement le ch. 299.",
    "given": [
      {
        "label": "Honoraires imposables, TVA comprise",
        "amount": 100000,
        "note": "Base de l’activité de conseil.",
        "tag": "TTC"
      },
      {
        "label": "Subvention cantonale",
        "amount": 20000,
        "note": "Montant à déclarer au ch. 900 dans ce cas simplifié.",
        "tag": "900"
      },
      {
        "label": "Dividende reçu",
        "amount": 5000,
        "note": "Mouvement de fonds à déclarer au ch. 910.",
        "tag": "910"
      },
      {
        "label": "TDFN autorisé dans le cas",
        "note": "Conseil aux entreprises.",
        "tag": "6,2 %"
      }
    ],
    "checks": [
      "Le ch. 200 ne comprend que les contre-prestations du dossier.",
      "Les ch. 900 et 910 n’augmentent pas la base TDFN.",
      "La qualification et les pièces justificatives restent indispensables."
    ],
    "legal": "Art. 18, al. 2, LTVA · prototype AFC, section III",
    "sourceIds": [
      "ltva",
      "prototype",
      "info12"
    ],
    "rates": [
      {
        "label": "Conseil aux entreprises",
        "rate": 6.2,
        "base": 100000,
        "tax": 6200
      }
    ],
    "fields": {
      "ch200": 100000,
      "ch900": 20000,
      "ch910": 5000
    },
    "deductions": {},
    "explanations": {
      "ch200": "Les honoraires imposables totalisent CHF 100’000 TTC.",
      "r0base": "La base TDFN est limitée aux honoraires imposables.",
      "ch900": "La subvention est portée séparément au ch. 900.",
      "ch910": "Le dividende est porté séparément au ch. 910."
    },
    "lesson": "La section III documente des mouvements de fonds sans les confondre avec les contre-prestations imposables.",
    "accountingBasis": "Contre-prestations convenues"
  },
  {
    "id": "M",
    "tab": "M · Art. 83",
    "title": "Procédure de déclaration — faut-il déterminer une correction ?",
    "entity": "Atelier Repris Sàrl",
    "sector": "Reprise de patrimoine",
    "location": "Nyon",
    "period": "S1 2026",
    "level": "Avancé",
    "risk": "high",
    "type": "quiz",
    "description": "Avant de saisir quoi que ce soit au ch. 415, il faut qualifier la reprise: méthode de décompte de l’aliénateur, méthode du repreneur, affectation antérieure et preuve de l’impôt préalable sont déterminantes.",
    "mission": "Décidez si le dossier exige une correction selon l’art. 83 OTVA. Ne calculez encore ni montant ni signe: ce cas porte uniquement sur la qualification juridique préalable.",
    "clientNote": "Atelier Repris Sàrl décompte selon les TDFN. Elle reprend par procédure de déclaration des machines d’une société qui décomptait selon la méthode effective. Les machines avaient été utilisées exclusivement pour une activité donnant droit à la déduction de l’impôt préalable; les factures d’origine et l’affectation sont documentées.",
    "afcNote": "Lorsqu’un repreneur aux TDFN reprend, par procédure de déclaration, un patrimoine d’un assujetti à la méthode effective, la correction suit la logique d’un passage de la méthode effective aux TDFN pour la valeur résiduelle concernée. Le montant doit être établi sur pièces; il ne se déduit pas du chiffre d’affaires courant.",
    "given": [
      {"label": "Méthode de l’aliénateur", "note": "Méthode effective avant le transfert.", "tag": "Effective"},
      {"label": "Méthode du repreneur", "note": "Atelier Repris Sàrl applique les TDFN.", "tag": "TDFN"},
      {"label": "Affectation antérieure", "note": "100 % à une activité donnant droit à la déduction de l’impôt préalable.", "tag": "Documentée"},
      {"label": "Pièces disponibles", "note": "Factures d’origine, inventaire, date d’acquisition, affectation et valeurs résiduelles.", "tag": "Complet"}
    ],
    "checks": [
      "Identifier la méthode de décompte de l’aliénateur et celle du repreneur.",
      "Vérifier l’affectation antérieure et la preuve de l’impôt préalable.",
      "Ne jamais calculer une correction art. 83 à partir d’un simple pourcentage du chiffre d’affaires ou du prix de transfert."
    ],
    "legal": "Art. 38 LTVA · art. 83 OTVA · Info TVA 12 TDFN, reprise de patrimoine avec procédure de déclaration",
    "sourceIds": ["ltva", "otva", "info12", "forms"],
    "questions": [
      {
        "q": "La seule existence d’une procédure de déclaration suffit-elle pour saisir automatiquement un montant au ch. 415?",
        "options": ["Oui", "Non, il faut d’abord qualifier les méthodes, l’affectation et la valeur résiduelle"],
        "answer": 1,
        "why": "Le ch. 415 n’est pas une déduction ou une charge automatique liée au transfert. La correction dépend de la situation documentée au sens de l’art. 83 OTVA."
      },
      {
        "q": "Dans ce dossier, le passage économique des biens d’un cédant à la méthode effective vers un repreneur aux TDFN conduit-il à déterminer une correction sur la valeur résiduelle concernée?",
        "options": ["Oui, sous réserve du calcul documenté", "Non, jamais sous TDFN"],
        "answer": 0,
        "why": "La situation est traitée selon la logique du passage de la méthode effective aux TDFN pour les éléments repris concernés."
      },
      {
        "q": "Peut-on obtenir le montant de la correction en appliquant le TDFN de l’activité au prix de transfert?",
        "options": ["Oui", "Non"],
        "answer": 1,
        "why": "La correction repose sur la valeur résiduelle et sur l’impôt préalable documenté selon les règles applicables, pas sur le TDFN du chiffre d’affaires courant."
      },
      {
        "q": "Si l’aliénateur avait lui-même décompté selon les TDFN, la conclusion pourrait-elle être différente?",
        "options": ["Oui", "Non, la méthode de l’aliénateur est sans importance"],
        "answer": 0,
        "why": "La méthode de l’aliénateur est une donnée déterminante. Une reprise auprès d’un assujetti aux TDFN n’entraîne pas la même correction qu’une reprise auprès d’un assujetti à la méthode effective."
      }
    ],
    "lesson": "Avant le ch. 415, il y a une qualification. Méthode du cédant, méthode du repreneur, affectation et preuve de l’impôt préalable doivent être établies avant de calculer ou de saisir une correction."
  },
  {
    "id": "N",
    "tab": "N · Option sous TDFN",
    "title": "Option sous TDFN — vérifier d’abord si elle est admise",
    "entity": "Ferme du Léman",
    "sector": "Production agricole — produits de propre exploitation",
    "location": "Vaud",
    "period": "S1 2026",
    "level": "Avancé",
    "risk": "high",
    "type": "quiz",
    "description": "Sous TDFN, l’option pour imposer des prestations exclues est fortement limitée. Le réflexe correct n’est donc pas de commencer par le ch. 205, mais de vérifier d’abord si l’option est juridiquement admissible.",
    "mission": "Qualifiez une contre-prestation de CHF 30’000 provenant de produits agricoles de la propre exploitation. L’entreprise applique les TDFN et a valablement exercé l’option pour cette prestation relevant de l’art. 21, al. 2, ch. 26 LTVA.",
    "clientNote": "Le dossier documente que la prestation relève bien de l’exception de l’art. 21, al. 2, ch. 26 LTVA. Il ne s’agit ni de formation, ni de location immobilière, ni d’une autre prestation exclue pour laquelle l’option serait interdite sous TDFN.",
    "afcNote": "En principe, un assujetti aux TDFN ne peut pas opter pour l’imposition des prestations exclues. L’art. 77, al. 3, OTVA maintient toutefois des exceptions pour les prestations visées à l’art. 21, al. 2, ch. 25, 26, 28 et 28bis LTVA. Ce cas porte uniquement sur le ch. 26. Une option valable doit être distinguée d’une simple mention erronée de TVA sur une facture.",
    "given": [
      {"label": "Contre-prestation concernée", "amount": 30000, "note": "Produits agricoles provenant de la propre exploitation; montant de l’exercice.", "tag": "Art. 21 al. 2 ch. 26"},
      {"label": "Méthode de décompte", "note": "TDFN.", "tag": "TDFN"},
      {"label": "Qualification", "note": "Option valablement exercée pour l’exception admise dans ce cas.", "tag": "Prérequis vérifié"}
    ],
    "checks": [
      "Sous TDFN, vérifier l’admissibilité de l’option avant toute saisie au ch. 205.",
      "Ne pas transposer ce traitement à une autre prestation exclue: vérifier l’art. 77, al. 3, OTVA et la liste complète des exceptions (art. 21, al. 2, ch. 25, 26, 28 et 28bis LTVA).",
      "Une contre-prestation valablement imposée par option reste comprise au ch. 200; le ch. 205 en précise la part et ne constitue pas une déduction."
    ],
    "legal": "Art. 22 LTVA · art. 77, al. 3, OTVA · Info TVA 12 TDFN · prototype AFC, ch. 200, 205 et 230",
    "sourceIds": ["ltva", "otva", "info12", "prototype"],
    "questions": [
      {
        "q": "Un assujetti aux TDFN peut-il librement opter pour toutes les prestations exclues de l’art. 21 LTVA?",
        "options": ["Oui", "Non"],
        "answer": 1,
        "why": "Sous TDFN, l’option est en principe exclue. L’art. 77, al. 3, OTVA prévoit toutefois des exceptions pour les prestations visées à l’art. 21, al. 2, ch. 25, 26, 28 et 28bis LTVA."
      },
      {
        "q": "L’exception retenue dans ce dossier — produits agricoles de la propre exploitation visés à l’art. 21, al. 2, ch. 26 LTVA — permet-elle une option sous TDFN?",
        "options": ["Oui, si les conditions de l’option sont remplies", "Non, jamais"],
        "answer": 0,
        "why": "Le ch. 26 fait partie des exceptions expressément maintenues par l’art. 77, al. 3, OTVA. Le dossier doit néanmoins établir que la prestation entre réellement dans cette catégorie et que les conditions de l’option sont remplies."
      },
      {
        "q": "Une fois l’option valablement exercée dans ce cas, la contre-prestation reste-t-elle comprise au ch. 200?",
        "options": ["Oui", "Non, elle figure seulement au ch. 205"],
        "answer": 0,
        "why": "Le ch. 205 détaille une part du chiffre d’affaires déjà comprise dans le ch. 200."
      },
      {
        "q": "Faut-il également indiquer cette part au ch. 205?",
        "options": ["Oui", "Non"],
        "answer": 0,
        "why": "Le ch. 205 sert à identifier les prestations exclues pour lesquelles une option admissible a été exercée."
      },
      {
        "q": "Faut-il déduire la même somme au ch. 230?",
        "options": ["Oui", "Non"],
        "answer": 1,
        "why": "Une prestation valablement imposée par option n’est pas traitée comme une prestation exclue sans option au ch. 230."
      }
    ],
    "lesson": "Sous TDFN, la première question n’est pas «où saisir l’option?», mais «cette option est-elle admise?». L’art. 77, al. 3, OTVA maintient les exceptions des ch. 25, 26, 28 et 28bis de l’art. 21, al. 2, LTVA. Le ch. 205 ne s’utilise qu’après cette qualification."
  },
  {
    "id": "O",
    "tab": "O · Ch. 235",
    "title": "Note de crédit — diminution de la contre-prestation",
    "entity": "Conseil Horizon Sàrl",
    "sector": "Conseil aux entreprises",
    "location": "Lausanne",
    "period": "S1 2026",
    "level": "Application",
    "risk": "medium",
    "accountingBasis": "Contre-prestations convenues",
    "description": "Une note de crédit documentée réduit la contre-prestation imposable et la base soumise au TDFN.",
    "mission": "Déclarez la facturation brute au ch. 200, la diminution au ch. 235, puis reportez la base nette au calcul TDFN.",
    "clientNote": "Le dossier contient une note de crédit de CHF 8’100 TVA comprise liée à des honoraires initialement facturés.",
    "afcNote": "Le TDFN de 6,2 % est déjà confirmé pour l’activité du cas; l’exercice porte sur le report de la diminution.",
    "given": [
      {
        "label": "Honoraires facturés, TVA comprise",
        "amount": 108100,
        "note": "Total avant la note de crédit.",
        "tag": "200"
      },
      {
        "label": "Note de crédit documentée, TVA comprise",
        "amount": 8100,
        "note": "Diminution de la contre-prestation.",
        "tag": "235"
      },
      {
        "label": "Base nette après diminution",
        "amount": 100000,
        "note": "Montant à ventiler au TDFN.",
        "tag": "TTC"
      },
      {
        "label": "TDFN confirmé",
        "note": "Conseil aux entreprises.",
        "tag": "6,2 %"
      }
    ],
    "checks": [
      "Le ch. 200 reprend la facturation brute du dossier.",
      "La note de crédit est portée au ch. 235.",
      "Le ch. 299 et le ch. 379 doivent tous deux être de CHF 100’000."
    ],
    "legal": "Prototype AFC, ch. 200, 235, 289, 299, 323 et 379 · art. 37 LTVA",
    "sourceIds": [
      "prototype",
      "afc-main",
      "info12"
    ],
    "rates": [
      {
        "label": "Conseil aux entreprises",
        "rate": 6.2,
        "base": 100000,
        "tax": 6200
      }
    ],
    "fields": {
      "ch200": 108100
    },
    "deductions": {
      "ch235": 8100
    },
    "explanations": {
      "ch200": "Le ch. 200 reprend CHF 108’100 avant la diminution.",
      "ch235": "La note de crédit documentée de CHF 8’100 est portée au ch. 235.",
      "r0base": "CHF 108’100 − CHF 8’100 = CHF 100’000 de base nette.",
      "r0tax": "CHF 100’000 × 6,2 % = CHF 6’200."
    },
    "lesson": "Une diminution documentée corrige la contre-prestation; la base TDFN doit correspondre au chiffre d’affaires imposable net."
  },
  {
    "id": "P",
    "tab": "P · Ch. 415 signé",
    "title": "Procédure de déclaration — reporter une charge fiscale au ch. 415",
    "entity": "Atelier Repris Sàrl",
    "sector": "Suite du cas M — reprise de patrimoine",
    "location": "Nyon",
    "period": "S1 2026",
    "level": "Avancé",
    "risk": "high",
    "accountingBasis": "Contre-prestations convenues",
    "description": "Après la qualification juridique du cas M, le dossier de reprise a déterminé une correction de CHF 2’000 constituant une charge fiscale. Ce cas porte uniquement sur son report avec le bon signe dans le décompte TDFN.",
    "mission": "Calculez la dette TDFN sur CHF 20’000 TTC, puis reportez la charge fiscale documentée de CHF 2’000 au ch. 415 avec le signe prévu par la pratique AFC et contrôlez le montant à payer.",
    "clientNote": "Les méthodes des parties, l’affectation, les valeurs résiduelles et le calcul de la correction ont déjà été vérifiés dans le dossier. Ne refaites pas la qualification du cas M: concentrez-vous sur la saisie.",
    "afcNote": "Pour une correction constituant une charge fiscale dans ce contexte, le montant est déclaré négativement au ch. 415. Une correction de CHF 2’000 est donc saisie CHF -2’000; le ch. 500 augmente en conséquence.",
    "given": [
      {"label": "Honoraires imposables, TVA comprise", "amount": 20000, "note": "Base TDFN du semestre.", "tag": "TTC"},
      {"label": "TDFN confirmé", "note": "Conseil aux entreprises pour l’exercice.", "tag": "6,2 %"},
      {"label": "Correction déjà déterminée", "amount": 2000, "note": "Charge fiscale documentée à reporter au ch. 415 comme montant négatif.", "tag": "− CHF 2’000"}
    ],
    "checks": [
      "Le cas M a déjà établi qu’une correction doit être déterminée: ici, ne pas refaire la qualification.",
      "Identifier le sens fiscal de la correction avant de choisir le signe au ch. 415.",
      "Une charge fiscale saisie négativement au ch. 415 augmente le montant à payer dans le calcul du formulaire."
    ],
    "legal": "Art. 38 LTVA · art. 83 OTVA · Info TVA 12 TDFN · prototype AFC, ch. 399, 415, 479, 500 et 510",
    "sourceIds": ["prototype", "forms", "info12", "ltva", "otva"],
    "rates": [{"label": "Services techniques — hypothèse du cas", "rate": 6.2, "base": 20000, "tax": 1240}],
    "fields": {"ch200": 20000, "ch415": -2000},
    "deductions": {},
    "explanations": {
      "ch200": "Le chiffre d’affaires imposable du semestre est CHF 20’000 TTC.",
      "r0base": "La base TDFN est CHF 20’000.",
      "r0tax": "CHF 20’000 × 6,2 % = CHF 1’240.",
      "ch415": "La correction de CHF 2’000 constitue une charge fiscale. La pratique AFC prévoit son report comme montant négatif au ch. 415; le calcul final augmente donc la dette de CHF 2’000."
    },
    "lesson": "Qualification d’abord, saisie ensuite. Une charge fiscale relevant de ce mécanisme est reportée négativement au ch. 415; le signe ne se choisit jamais à partir du seul intitulé visuel «Crédit d’impôt»."
  },
  {
    "id": "R",
    "tab": "R · Rectification",
    "title": "Erreur dans un décompte déjà remis — corriger la bonne période",
    "entity": "Fiduciaire Léman Sàrl",
    "sector": "Services fiduciaires",
    "location": "Vaud",
    "period": "Décompte S1 2026 déjà remis",
    "level": "Déclaration pratique",
    "risk": "high",
    "type": "quiz",
    "description": "Une omission découverte après la remise ne se compense pas silencieusement dans le décompte courant.",
    "conceptualNote": "Distinguez une correction isolée de la période concernée de la concordance annuelle prévue à l’art. 72 LTVA.",
    "mission": "Choisissez la procédure correcte, rattachez l’erreur à la bonne période et constituez une piste d’audit complète.",
    "clientNote": "Après la remise du S1 2026, une facture d’honoraires de CHF 10’810 TTC a été retrouvée. Elle avait été omise du chiffre d’affaires.",
    "afcNote": "La correction isolée vise la période concernée. Lors de la concordance annuelle, seules les différences par rapport aux décomptes déjà remis sont déclarées.",
    "given": [
      {
        "label": "Décompte concerné",
        "note": "S1 2026 déjà transmis dans le Portail AFC.",
        "tag": "Remis"
      },
      {
        "label": "Honoraires omis, TVA comprise",
        "amount": 10810,
        "note": "Contre-prestation qui aurait dû être comprise dans le décompte du S1 2026.",
        "tag": "TTC"
      },
      {
        "label": "TDFN confirmé dans le cas",
        "note": "Taux utilisé uniquement pour mesurer l’impact fiscal de l’omission.",
        "tag": "6,2 %"
      },
      {
        "label": "Dette fiscale supplémentaire",
        "note": "CHF 10’810 × 6,2 % = CHF 670.22.",
        "tag": "CHF 670.22"
      },
      {
        "label": "Piste d’audit à conserver",
        "note": "Cause, période, rubriques touchées, calcul du delta, paiement, intérêt éventuel et pièces justificatives.",
        "tag": "Dossier"
      }
    ],
    "checks": [
      "Identifier la période exacte et les rubriques affectées par l’omission.",
      "Ne pas ajouter l’opération au prochain décompte ordinaire pour compenser.",
      "Utiliser le décompte rectificatif de la période concernée dans le Portail AFC.",
      "Distinguer ce rectificatif de la concordance annuelle au sens de l’art. 72 LTVA.",
      "Contrôler le paiement complémentaire et, s’il intervient après l’échéance, l’intérêt moratoire dû ainsi que la piste d’audit."
    ],
    "legal": "Art. 72 LTVA · décompte rectificatif de la période concernée · concordance annuelle TVA",
    "sourceIds": [
      "rectification",
      "annual-concordance",
      "payment-interest",
      "online",
      "ltva"
    ],
    "questions": [
      {
        "q": "L’erreur isolée du S1 2026 est découverte avant la concordance annuelle. Quelle démarche est correcte?",
        "options": [
          "Ajouter CHF 10’810 au prochain décompte ordinaire",
          "Déposer en ligne un décompte rectificatif pour le S1 2026",
          "Attendre obligatoirement la fin du délai de 240 jours"
        ],
        "answer": 1,
        "why": "Pour la correction isolée d’un décompte semestriel, il faut utiliser le décompte rectificatif de la période concernée dans le Portail AFC."
      },
      {
        "q": "À quelle période l’omission doit-elle rester rattachée?",
        "options": [
          "Au S1 2026, période dans laquelle elle aurait dû être déclarée",
          "Au semestre pendant lequel elle est découverte",
          "À la prochaine période encore ouverte, au choix"
        ],
        "answer": 0,
        "why": "La correction fiscale reste liée à la période erronée et ne doit pas fausser le chiffre d’affaires d’une période ultérieure."
      },
      {
        "q": "Quel impact fiscal minimal doit être documenté pour ce cas?",
        "options": [
          "Une base supplémentaire de CHF 10’810 et une dette TDFN supplémentaire de CHF 670.22 pour la période concernée",
          "Uniquement CHF 670.22 dans la comptabilité, sans corriger les bases déclarées",
          "Aucun impact puisque la facture a été retrouvée après la remise"
        ],
        "answer": 0,
        "why": "La piste d’audit doit relier la contre-prestation omise au calcul de CHF 10’810 × 6,2 % = CHF 670.22 et aux rubriques affectées de la période."
      },
      {
        "q": "L’erreur est découverte lors de la concordance avec les comptes annuels. Que faut-il déclarer dans la concordance annuelle rectificative?",
        "options": [
          "Tous les chiffres de l’année depuis zéro",
          "Uniquement les différences par rapport aux décomptes déjà remis",
          "Uniquement le montant de TVA, sans documenter les bases concernées"
        ],
        "answer": 1,
        "why": "La concordance annuelle complète les décomptes déjà remis; l’AFC demande d’y déclarer les différences constatées."
      },
      {
        "q": "Une dette fiscale supplémentaire est payée après l’échéance initiale. Quel contrôle faut-il encore effectuer?",
        "options": [
          "Aucun, une rectification supprime automatiquement tout intérêt",
          "Vérifier l’intérêt moratoire dû entre l’échéance et la réception du paiement tardif",
          "Appliquer soi-même une pénalité forfaitaire de 10 %"
        ],
        "answer": 1,
        "why": "En cas de paiement tardif, l’intérêt moratoire est dû entre l’échéance et la réception du paiement. L’AFC indique qu’il n’est en principe pas prélevé lorsque son montant reste inférieur à CHF 100."
      },
      {
        "q": "Quelle piste d’audit est la plus professionnelle?",
        "options": [
          "Une note indiquant seulement «erreur corrigée»",
          "Cause, période, rubriques touchées, calcul du delta, preuve de remise et suivi du paiement",
          "La facture retrouvée sans rapprochement avec le rectificatif"
        ],
        "answer": 1,
        "why": "Le dossier doit permettre de reconstituer l’erreur, la correction fiscale et son règlement sans dépendre de la mémoire du préparateur."
      }
    ],
    "lesson": "Corriger la période erronée, distinguer rectificatif et concordance annuelle, puis conserver une piste d’audit complète."
  },
  {
    "id": "Q",
    "tab": "Q · Cas libre",
    "title": "Atelier libre — contrôler un décompte déjà paramétré par l’AFC",
    "entity": "Votre entreprise",
    "sector": "Activités à définir",
    "location": "Suisse",
    "period": "Période à définir",
    "level": "Atelier libre",
    "risk": "high",
    "type": "free",
    "excludeFromProgress": true,
    "description": "Reproduisez un décompte à partir des activités et TDFN figurant déjà dans la confirmation écrite ou le profil AFC de l’entreprise.",
    "mission": "Saisissez uniquement les activités et TDFN déjà confirmés par l’AFC, reportez le calcul au ch. 323 et corrigez les incohérences arithmétiques signalées.",
    "clientNote": "Les factures clients restent établies aux taux légaux applicables.",
    "afcNote": "L’atelier suppose que chaque activité et chaque TDFN saisi figurent déjà dans la confirmation ou le profil AFC.",
    "given": [
      {
        "label": "Confirmation ou profil AFC",
        "note": "Les activités et TDFN saisis doivent déjà y figurer.",
        "tag": "Prérequis"
      },
      {
        "label": "Montants",
        "note": "Contre-prestations brutes, TVA comprise, pour le calcul TDFN.",
        "tag": "TTC"
      },
      {
        "label": "Résultat",
        "note": "Contrôle arithmétique uniquement; aucune déclaration n’est transmise.",
        "tag": "Simulation"
      }
    ],
    "checks": [
      "ch. 289 ne peut pas dépasser ch. 200.",
      "La base reportée au ch. 323 doit correspondre au ch. 299.",
      "La base et l’impôt du ch. 383 doivent être cohérents avec le taux légal sélectionné."
    ],
    "legal": "Prototype AFC · art. 37 LTVA · art. 77 à 91 OTVA · ordonnance AFC sur les TDFN",
    "sourceIds": [
      "prototype",
      "ltva",
      "otva",
      "rates",
      "afc-main"
    ],
    "rates": [],
    "fields": {},
    "deductions": {},
    "lesson": "L’atelier vérifie la cohérence arithmétique d’un paramétrage déjà confirmé par l’AFC; il ne valide ni la qualification juridique ni les pièces.",
    "accountingBasis": "Contre-prestations convenues"
  }
];

export const TRANSITION_WORKSHEETS = {
  "K1": {
    "destination": "Dernier décompte selon la méthode effective · ch. 415",
    "direction": "Aucune dette supplémentaire dans les hypothèses du cas",
    "total": 0,
    "lines": [
      {
        "id": "absence",
        "label": "Biens et prestations encore disponibles",
        "base": "Aucun montant identifié",
        "expectedTreatment": "no",
        "expectedResidual": 0,
        "expectedCorrection": 0
      }
    ]
  },
  "K2": {
    "destination": "Dernier décompte selon la méthode effective · ch. 415",
    "direction": "La correction augmente la dette envers l’AFC",
    "total": 486,
    "lines": [
      {
        "id": "computer",
        "label": "Ordinateur",
        "base": "Impôt préalable admis CHF 810",
        "expectedTreatment": "yes",
        "expectedResidual": 60,
        "expectedCorrection": 486
      }
    ]
  },
  "K3": {
    "destination": "Dernier décompte selon la méthode effective · ch. 415",
    "direction": "La correction augmente la dette envers l’AFC",
    "total": 6480,
    "lines": [
      {
        "id": "stock",
        "label": "Stock non utilisé",
        "base": "Impôt préalable admis CHF 3’240",
        "expectedTreatment": "yes",
        "expectedResidual": 100,
        "expectedCorrection": 3240
      },
      {
        "id": "machine",
        "label": "Machine · une période fiscale prise en compte",
        "base": "Impôt préalable admis CHF 4’050",
        "expectedTreatment": "yes",
        "expectedResidual": 80,
        "expectedCorrection": 3240
      }
    ]
  },
  "K4": {
    "destination": "Dernier décompte selon la méthode effective · ch. 415",
    "direction": "Seul le résultat encore disponible entre dans la correction",
    "total": 1296,
    "lines": [
      {
        "id": "erp",
        "label": "Licence ERP perpétuelle + développement individualisé",
        "base": "Impôt préalable admis CHF 1’620",
        "expectedTreatment": "yes",
        "expectedResidual": 80,
        "expectedCorrection": 1296
      },
      {
        "id": "saas",
        "label": "SaaS et hébergement consommés jusqu’au 31.12.2026",
        "base": "Aucune avance pour 2027",
        "expectedTreatment": "no",
        "expectedResidual": 0,
        "expectedCorrection": 0
      },
      {
        "id": "services",
        "label": "Support, publicité et comptabilité achevés",
        "base": "Prestations consommées",
        "expectedTreatment": "no",
        "expectedResidual": 0,
        "expectedCorrection": 0
      }
    ]
  },
  "K5": {
    "destination": "Dernier décompte selon la méthode effective · ch. 415",
    "direction": "La correction part de l’impôt préalable définitivement admis",
    "total": 4860,
    "lines": [
      {
        "id": "mixed",
        "label": "Équipement à double affectation",
        "base": "Impôt préalable définitivement admis CHF 6’075",
        "expectedTreatment": "yes",
        "expectedResidual": 80,
        "expectedCorrection": 4860
      }
    ]
  },
  "L1": {
    "destination": "Premier décompte selon la méthode effective · ch. 410",
    "direction": "Aucune déduction dans les hypothèses du cas",
    "total": 0,
    "showEligibility": true,
    "lines": [
      {
        "id": "absence",
        "label": "Biens et prestations encore disponibles",
        "base": "Aucun montant identifié",
        "expectedTreatment": "no",
        "expectedResidual": 0,
        "expectedEligibility": 0,
        "expectedCorrection": 0
      }
    ]
  },
  "L2": {
    "destination": "Premier décompte selon la méthode effective · ch. 410",
    "direction": "Dégrèvement ultérieur en faveur de l’entreprise",
    "total": 486,
    "showEligibility": true,
    "lines": [
      {
        "id": "computer",
        "label": "Ordinateur",
        "base": "Impôt grevant documenté CHF 810",
        "expectedTreatment": "yes",
        "expectedResidual": 60,
        "expectedEligibility": 100,
        "expectedCorrection": 486
      }
    ]
  },
  "L3": {
    "destination": "Premier décompte selon la méthode effective · ch. 410",
    "direction": "Dégrèvement ultérieur en faveur de l’entreprise",
    "total": 6480,
    "showEligibility": true,
    "lines": [
      {
        "id": "stock",
        "label": "Stock non utilisé",
        "base": "Impôt grevant documenté CHF 3’240",
        "expectedTreatment": "yes",
        "expectedResidual": 100,
        "expectedEligibility": 100,
        "expectedCorrection": 3240
      },
      {
        "id": "machine",
        "label": "Machine · une période fiscale",
        "base": "Impôt grevant documenté CHF 4’050",
        "expectedTreatment": "yes",
        "expectedResidual": 80,
        "expectedEligibility": 100,
        "expectedCorrection": 3240
      }
    ]
  },
  "L4": {
    "destination": "Premier décompte selon la méthode effective · ch. 410",
    "direction": "Seules les prestations encore disponibles sont retenues",
    "total": 1296,
    "showEligibility": true,
    "lines": [
      {
        "id": "erp",
        "label": "ERP perpétuel + développement individualisé",
        "base": "Impôt grevant documenté CHF 1’620",
        "expectedTreatment": "yes",
        "expectedResidual": 80,
        "expectedEligibility": 100,
        "expectedCorrection": 1296
      },
      {
        "id": "saas",
        "label": "SaaS et hébergement consommés",
        "base": "Aucune avance pour 2027",
        "expectedTreatment": "no",
        "expectedResidual": 0,
        "expectedEligibility": 0,
        "expectedCorrection": 0
      },
      {
        "id": "services",
        "label": "Support, publicité et comptabilité achevés",
        "base": "Prestations consommées",
        "expectedTreatment": "no",
        "expectedResidual": 0,
        "expectedEligibility": 0,
        "expectedCorrection": 0
      }
    ]
  },
  "L5": {
    "destination": "Premier décompte selon la méthode effective · ch. 410",
    "direction": "La déduction est limitée à l’utilisation future ouvrant droit",
    "total": 4860,
    "showEligibility": true,
    "lines": [
      {
        "id": "mixed",
        "label": "Équipement à utilisation mixte",
        "base": "Impôt grevant documenté CHF 8’100",
        "expectedTreatment": "yes",
        "expectedResidual": 80,
        "expectedEligibility": 75,
        "expectedCorrection": 4860
      }
    ]
  },
  "L6": {
    "destination": "Premier décompte selon la méthode effective · ch. 410",
    "direction": "Dégrèvement sur la valeur résiduelle de l’immeuble",
    "total": 13770,
    "showEligibility": true,
    "documents": [
      "Factures de travaux et preuve de la TVA grevant les coûts",
      "Date de mise en service et registre de l’immeuble",
      "Séparation terrain, entretien courant et travaux augmentant la valeur",
      "Historique d’affectation, subventions et corrections antérieures"
    ],
    "lines": [
      {
        "id": "building",
        "label": "Travaux augmentant la valeur du bâtiment propre",
        "base": "Impôt grevant documenté CHF 16’200",
        "expectedTreatment": "yes",
        "expectedResidual": 85,
        "expectedEligibility": 100,
        "expectedCorrection": 13770
      }
    ]
  },
  "L7": {
    "destination": "Premier décompte selon la méthode effective · ch. 410",
    "direction": "Dégrèvement sur une prestation prépayée encore disponible",
    "total": 810,
    "showEligibility": true,
    "documents": [
      "Contrat et calendrier de prestation couvrant janvier à décembre 2027",
      "Facture suisse avec TVA de CHF 810",
      "Preuve de paiement et compte de charges payées d’avance",
      "Justification de l’affectation future à 100 % imposable"
    ],
    "lines": [
      {
        "id": "prepaid",
        "label": "Maintenance 2027 payée en décembre 2026",
        "base": "Impôt grevant documenté CHF 810",
        "expectedTreatment": "yes",
        "expectedResidual": 100,
        "expectedEligibility": 100,
        "expectedCorrection": 810
      }
    ]
  }
};
