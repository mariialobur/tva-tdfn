import { CASES, OFFICIAL_SOURCES } from './data.js?v=6.3.0';

/*
 * Parcours pédagogique et interface simplifiée — version 8.1 du 06.08.2026.
 * Chargé avant app.js pour rendre les sources et le cas de rectification
 * disponibles dès le premier rendu, sans déplacer les cas existants.
 */

const SOURCE_ADDITIONS = [
  {
    id: 'rectification',
    title: 'AFC — Décompte de rectification TVA',
    scope: 'Correction en ligne d’un décompte mensuel, trimestriel ou semestriel pour la période concernée',
    url: 'https://www.estv.admin.ch/fr/tva-decompte-de-rectification',
    status: 'Source administrative actuelle'
  },
  {
    id: 'annual-concordance',
    title: 'AFC — Concordance annuelle TVA',
    scope: 'Art. 72 LTVA, différences à déclarer, délai de finalisation et intérêt moratoire',
    url: 'https://www.estv.admin.ch/fr/tva-concordance-annuelle',
    status: 'Source administrative actuelle'
  },
  {
    id: 'payment-interest',
    title: 'AFC — Payer la TVA et intérêt moratoire',
    scope: 'Échéance, retard de paiement, calcul de l’intérêt moratoire et seuil administratif de CHF 100',
    url: 'https://www.estv.admin.ch/fr/payer-la-tva',
    status: 'Source administrative actuelle'
  },
  {
    id: 'tdfn-2025-additional-rates',
    title: 'AFC — TDFN dès 2025: activités et taux supplémentaires',
    scope: 'Plus de deux TDFN, règle des 10 % et déclaration directe d’un taux supplémentaire avec contrôle ultérieur de l’AFC',
    url: 'https://www.estv.admin.ch/fr/tva-methode-des-taux-de-la-dette-fiscale-nette-2025',
    status: 'Source administrative actuelle'
  },
  {
    id: 'info12-limits',
    title: 'Info TVA 12 — dépassement des limites et passage à la méthode effective',
    scope: 'Dépassement d’une ou des deux limites durant trois périodes fiscales consécutives; passage à la méthode effective; changement de méthode',
    url: 'https://www.gate.estv.admin.ch/mwst-webpublikationen/public/pages/taxInfos/cipherDisplay.xhtml?componentId=1005232&publicationId=1004992',
    status: 'Pratique AFC fondée notamment sur l’art. 81 OTVA'
  },
  {
    id: 'tdfn-transition-2025',
    title: 'AFC — TDFN dès 2025: changements de méthode',
    scope: 'Corrections sur la valeur résiduelle lors du passage entre méthode effective et TDFN; ch. 415 et ch. 410',
    url: 'https://www.estv.admin.ch/fr/tva-methode-des-taux-de-la-dette-fiscale-nette-2025',
    status: 'Source administrative actuelle'
  }

];

for (const source of SOURCE_ADDITIONS) {
  if (!OFFICIAL_SOURCES.some((item) => item.id === source.id)) {
    OFFICIAL_SOURCES.push(source);
  }
}

/* Enrichit le cas J: l’admissibilité initiale et le maintien de la méthode
 * ne répondent pas aux mêmes conséquences temporelles. */
const limitsCase = CASES.find((item) => item.id === 'J');
if (limitsCase) {
  if (!limitsCase.sourceIds.includes('info12-limits')) limitsCase.sourceIds.push('info12-limits');
  limitsCase.description = 'Deux analyses distinctes sont réunies dans ce cas: d’abord l’admissibilité initiale au vu des montants prévus, puis le suivi d’une entreprise qui applique déjà la méthode TDFN.';
  limitsCase.conceptualNote = 'Ne transposez pas la règle des trois périodes fiscales à une demande initiale: elle concerne le maintien d’une méthode déjà autorisée.';
  limitsCase.mission = 'Testez les deux limites, concluez sur l’admissibilité initiale, puis appliquez séparément la règle de suivi prévue pour une entreprise déjà autorisée.';
  limitsCase.checks = [
    'Admissibilité initiale: CA imposable annuel TVA comprise ≤ CHF 5’024’000.',
    'Admissibilité initiale: impôt annuel calculé avec les TDFN ≤ CHF 108’000.',
    'Situation distincte — méthode déjà autorisée: documenter chaque dépassement et compter les périodes fiscales consécutives.',
    'Contrôler aussi les exclusions de l’art. 77 OTVA.'
  ];
  const extraQuestions = [
    {
      q: 'Situation distincte — une entreprise déjà autorisée dépasse l’une des limites pendant une seule période fiscale. Quelle conclusion est correcte?',
      options: [
        'Le passage immédiat à la méthode effective est toujours obligatoire',
        'Le dépassement doit être documenté et suivi; une seule période isolée ne déclenche pas à elle seule le passage obligatoire prévu à l’art. 81, al. 3, OTVA',
        'Le dépassement n’a jamais de conséquence et ne doit pas être conservé au dossier'
      ],
      answer: 1,
      why: 'Cette question porte sur une entreprise qui applique déjà la méthode. L’art. 81, al. 3, OTVA prévoit le passage obligatoire lorsque l’une ou les deux limites ont été dépassées durant trois périodes fiscales consécutives.'
    },
    {
      q: 'Situation distincte — l’une des limites est dépassée pour la troisième période fiscale consécutive. Quelle est la conséquence?',
      options: [
        'Passage obligatoire à la méthode effective au début de la période fiscale suivante',
        'Attendre encore une quatrième période de dépassement avant d’agir',
        'Réduire le taux légal indiqué sur les factures clients'
      ],
      answer: 0,
      why: 'Pour une méthode déjà autorisée, l’art. 81, al. 3, OTVA impose le passage à la méthode effective au début de la période fiscale qui suit les trois périodes fiscales consécutives de dépassement.'
    }
  ];
  for (const question of extraQuestions) {
    if (!limitsCase.questions.some((item) => item.q === question.q)) limitsCase.questions.push(question);
  }
  limitsCase.lesson = 'Première étape: vérifier immédiatement l’admissibilité au moyen des deux limites. Deuxième situation, distincte: pour une méthode déjà autorisée, documenter les dépassements et passer à la méthode effective au début de la période qui suit trois périodes fiscales consécutives de dépassement.';
}

const rectificationCase = {
  /* OP conserve le classement dans le module 5 de la version 6.3.
   * L’interface et l’URL présentent ce nouveau cas comme le cas R, sans modifier les lettres historiques des autres cas. */
  id: 'OP',
  publicId: 'R',
  tab: 'R · Rectification',
  title: 'Erreur dans un décompte déjà remis — corriger la bonne période',
  entity: 'Fiduciaire Léman Sàrl',
  sector: 'Services fiduciaires',
  location: 'Vaud',
  period: 'Décompte S1 2026 déjà remis',
  level: 'Déclaration pratique',
  risk: 'high',
  type: 'quiz',
  description: 'Une omission découverte après la remise ne se compense pas silencieusement dans le décompte courant.',
  conceptualNote: 'Distinguez une correction isolée de la période concernée de la concordance annuelle prévue à l’art. 72 LTVA.',
  mission: 'Choisissez la procédure correcte, rattachez l’erreur à la bonne période et constituez une piste d’audit complète.',
  clientNote: 'Après la remise du S1 2026, une facture d’honoraires de CHF 10’810 TTC a été retrouvée. Elle avait été omise du chiffre d’affaires.',
  afcNote: 'La correction isolée vise la période concernée. Lors de la concordance annuelle, seules les différences par rapport aux décomptes déjà remis sont déclarées.',
  given: [
    {
      label: 'Décompte concerné',
      note: 'S1 2026 déjà transmis dans le Portail AFC.',
      tag: 'Remis'
    },
    {
      label: 'Honoraires omis, TVA comprise',
      amount: 10810,
      note: 'Contre-prestation qui aurait dû être comprise dans le décompte du S1 2026.',
      tag: 'TTC'
    },
    {
      label: 'TDFN confirmé dans le cas',
      note: 'Taux utilisé uniquement pour mesurer l’impact fiscal de l’omission.',
      tag: '6,2 %'
    },
    {
      label: 'Dette fiscale supplémentaire',
      note: 'CHF 10’810 × 6,2 % = CHF 670.22.',
      tag: 'CHF 670.22'
    },
    {
      label: 'Piste d’audit à conserver',
      note: 'Cause, période, rubriques touchées, calcul du delta, paiement, intérêt éventuel et pièces justificatives.',
      tag: 'Dossier'
    }
  ],
  checks: [
    'Identifier la période exacte et les rubriques affectées par l’omission.',
    'Ne pas ajouter l’opération au prochain décompte ordinaire pour compenser.',
    'Utiliser le décompte rectificatif de la période concernée dans le Portail AFC.',
    'Distinguer ce rectificatif de la concordance annuelle au sens de l’art. 72 LTVA.',
    'Contrôler le paiement complémentaire et, s’il intervient après l’échéance, l’intérêt moratoire dû ainsi que la piste d’audit.'
  ],
  legal: 'Art. 72 LTVA · décompte rectificatif de la période concernée · concordance annuelle TVA',
  sourceIds: ['rectification', 'annual-concordance', 'payment-interest', 'online', 'ltva'],
  questions: [
    {
      q: 'L’erreur isolée du S1 2026 est découverte avant la concordance annuelle. Quelle démarche est correcte?',
      options: [
        'Ajouter CHF 10’810 au prochain décompte ordinaire',
        'Déposer en ligne un décompte rectificatif pour le S1 2026',
        'Attendre obligatoirement la fin du délai de 240 jours'
      ],
      answer: 1,
      why: 'Pour la correction isolée d’un décompte semestriel, il faut utiliser le décompte rectificatif de la période concernée dans le Portail AFC.'
    },
    {
      q: 'À quelle période l’omission doit-elle rester rattachée?',
      options: [
        'Au S1 2026, période dans laquelle elle aurait dû être déclarée',
        'Au semestre pendant lequel elle est découverte',
        'À la prochaine période encore ouverte, au choix'
      ],
      answer: 0,
      why: 'La correction fiscale reste liée à la période erronée et ne doit pas fausser le chiffre d’affaires d’une période ultérieure.'
    },
    {
      q: 'Quel impact fiscal minimal doit être documenté pour ce cas?',
      options: [
        'Une base supplémentaire de CHF 10’810 et une dette TDFN supplémentaire de CHF 670.22 pour la période concernée',
        'Uniquement CHF 670.22 dans la comptabilité, sans corriger les bases déclarées',
        'Aucun impact puisque la facture a été retrouvée après la remise'
      ],
      answer: 0,
      why: 'La piste d’audit doit relier la contre-prestation omise au calcul de CHF 10’810 × 6,2 % = CHF 670.22 et aux rubriques affectées de la période.'
    },
    {
      q: 'L’erreur est découverte lors de la concordance avec les comptes annuels. Que faut-il déclarer dans la concordance annuelle rectificative?',
      options: [
        'Tous les chiffres de l’année depuis zéro',
        'Uniquement les différences par rapport aux décomptes déjà remis',
        'Uniquement le montant de TVA, sans documenter les bases concernées'
      ],
      answer: 1,
      why: 'La concordance annuelle complète les décomptes déjà remis; l’AFC demande d’y déclarer les différences constatées.'
    },
    {
      q: 'Une dette fiscale supplémentaire est payée après l’échéance initiale. Quel contrôle faut-il encore effectuer?',
      options: [
        'Aucun, une rectification supprime automatiquement tout intérêt',
        'Vérifier l’intérêt moratoire dû entre l’échéance et la réception du paiement tardif',
        'Appliquer soi-même une pénalité forfaitaire de 10 %'
      ],
      answer: 1,
      why: 'En cas de paiement tardif, l’intérêt moratoire est dû entre l’échéance et la réception du paiement. L’AFC indique qu’il n’est en principe pas prélevé lorsque son montant reste inférieur à CHF 100.'
    },
    {
      q: 'Quelle piste d’audit est la plus professionnelle?',
      options: [
        'Une note indiquant seulement «erreur corrigée»',
        'Cause, période, rubriques touchées, calcul du delta, preuve de remise et suivi du paiement',
        'La facture retrouvée sans rapprochement avec le rectificatif'
      ],
      answer: 1,
      why: 'Le dossier doit permettre de reconstituer l’erreur, la correction fiscale et son règlement sans dépendre de la mémoire du préparateur.'
    }
  ],
  lesson: 'Corriger la période erronée, distinguer rectificatif et concordance annuelle, puis conserver une piste d’audit complète.'
};

if (!CASES.some((item) => item.publicId === 'R' || item.id === rectificationCase.id)) {
  CASES.push(rectificationCase);
}


/* --------------------------------------------------------------------------
 * Module K — passage de la méthode effective aux TDFN (ch. 415)
 * Module L — retour des TDFN à la méthode effective (ch. 410)
 *
 * Les nouveaux cas sont ajoutés à la fin du tableau afin de ne pas déplacer
 * les index historiques utilisés par le localStorage de la version 6.3.
 * L’ordre pédagogique est reconstruit dans la navigation de la version 8.0.
 * -------------------------------------------------------------------------- */

const transitionOverview = CASES.find((item) => item.id === 'K');
if (transitionOverview) {
  Object.assign(transitionOverview, {
    publicId: 'K0',
    tab: 'K0 · Admissibilité',
    title: 'Avant le ch. 415 — le passage aux TDFN est-il possible?',
    entity: 'Transition Conseil SA',
    sector: 'Conseil aux entreprises',
    location: 'Vaud',
    period: 'Passage souhaité au 01.01.2027',
    level: 'Transition · étape 1',
    risk: 'high',
    type: 'quiz',
    description: 'Avant de calculer une correction, il faut vérifier le délai de maintien de la méthode effective, les deux limites TDFN et la date d’effet du changement.',
    conceptualNote: 'Le calcul du ch. 415 ne rend pas le changement admissible à lui seul. L’autorisation et les conditions d’accès à la méthode doivent être contrôlées séparément.',
    mission: 'Décidez si le passage peut prendre effet au 01.01.2027, puis identifiez le travail préparatoire à effectuer avant le dernier décompte selon la méthode effective.',
    clientNote: 'L’entreprise applique la méthode effective depuis le 01.01.2024 et souhaite passer aux TDFN au 01.01.2027.',
    afcNote: 'La demande est effectuée dans le Portail AFC. La période fiscale 2026 respecte les limites et une correction éventuelle des valeurs résiduelles doit être portée au ch. 415 du dernier décompte selon la méthode effective.',
    given: [
      { label: 'Méthode effective appliquée', note: 'Périodes fiscales 2024, 2025 et 2026 entièrement écoulées avant le changement.', tag: '3 périodes' },
      { label: 'CA imposable 2026, TVA comprise', amount: 1200000, note: 'Montant inférieur aux limites du scénario.', tag: 'TTC' },
      { label: 'TDFN prévu pour le test', note: '6,2 %; dette fiscale théorique CHF 74’400.', tag: '6,2 %' },
      { label: 'Date d’effet souhaitée', note: 'Début d’une nouvelle période fiscale.', tag: '01.01.2027' },
      { label: 'Mode de décompte', note: 'Le mode «convenues» ou «reçues» reste inchangé dans ce module.', tag: 'Hypothèse' }
    ],
    checks: [
      'La méthode effective a été appliquée pendant au moins trois périodes fiscales.',
      'La période fiscale précédant le passage respecte les limites de chiffre d’affaires et d’impôt dû.',
      'La demande est effectuée dans le Portail AFC dans le délai applicable.',
      'Un inventaire des biens et prestations encore disponibles est préparé avant le ch. 415.',
      'Le mode «convenues» ou «reçues» reste inchangé; les corrections de débiteurs et créanciers ne sont pas traitées ici.'
    ],
    legal: 'Art. 37, al. 4, LTVA · art. 79 OTVA · Info TVA 12, ch. 2.2.2 · pratique AFC dès 2025',
    sourceIds: ['afc-main', 'tdfn-transition-2025', 'info12', 'ltva', 'otva'],
    questions: [
      {
        q: 'La durée minimale de la méthode effective est-elle remplie pour un passage au 01.01.2027?',
        options: ['Oui, trois périodes fiscales entières se sont écoulées', 'Non, cinq années sont toujours nécessaires', 'La durée ne joue aucun rôle'],
        answer: 0,
        why: 'L’entreprise a appliqué la méthode effective durant les périodes fiscales 2024, 2025 et 2026. Le passage peut donc être examiné pour le début de 2027, sous réserve des autres conditions.'
      },
      {
        q: 'Quel est l’impôt annuel théorique avec un TDFN de 6,2 % sur CHF 1’200’000 TTC?',
        options: ['CHF 62’000', 'CHF 74’400', 'CHF 97’200'],
        answer: 1,
        why: 'CHF 1’200’000 × 6,2 % = CHF 74’400. Le chiffre d’affaires et l’impôt restent sous les limites du scénario.'
      },
      {
        q: 'Quelle vérification vient avant la saisie du ch. 415?',
        options: ['Inventorier les biens et prestations encore disponibles et rapprocher l’impôt préalable effectivement déduit', 'Multiplier la valeur comptable nette par 8,1 %', 'Rembourser toute la TVA déduite depuis la création de l’entreprise'],
        answer: 0,
        why: 'La correction porte sur l’impôt préalable antérieurement déduit à concurrence de la valeur résiduelle au moment du changement.'
      },
      {
        q: 'Dans quel décompte une correction méthode effective → TDFN est-elle portée?',
        options: ['Dans le premier décompte TDFN, au ch. 410', 'Dans le dernier décompte selon la méthode effective, au ch. 415', 'Dans une annexe sans report dans le décompte'],
        answer: 1,
        why: 'L’AFC prévoit le remboursement de l’impôt préalable sur les valeurs résiduelles au ch. 415 du dernier décompte avant le passage aux TDFN.'
      }
    ],
    lesson: 'Commencez par l’admissibilité, puis établissez l’inventaire fiscal. Le ch. 415 est la dernière étape du calcul, pas le point de départ.'
  });
}

const transitionCases = [
  {
    id: 'K1', publicId: 'K1', tab: 'K1 · Aucun résiduel',
    title: 'Aucune valeur résiduelle — la correction peut être nulle',
    entity: 'Bureau Clair Sàrl', sector: 'Conseil', location: 'Lausanne', period: 'Passage au 01.01.2027',
    level: 'Transition · débutant', risk: 'medium', type: 'quiz',
    description: 'Le changement de méthode ne signifie pas que toute la TVA déduite dans le passé doit être remboursée.',
    conceptualNote: 'Une correction n’existe que pour les biens et prestations encore disponibles ayant une valeur résiduelle et ayant donné lieu à une déduction de l’impôt préalable.',
    mission: 'Déterminez si une correction est nécessaire et identifiez la preuve à conserver lorsque le ch. 415 est nul.',
    clientNote: 'Le bureau ne détient ni stock, ni immobilisation, ni prestation acquise encore disponible, ni avance payée couvrant une période postérieure au changement.',
    afcNote: 'Les loyers, télécommunications, honoraires comptables et campagnes publicitaires des périodes écoulées ont été entièrement consommés.',
    given: [
      { label: 'Stocks au 31.12.2026', amount: 0, note: 'Aucune marchandise encore disponible.', tag: 'Inventaire' },
      { label: 'Immobilisations ayant donné droit à déduction', amount: 0, note: 'Aucun actif détenu au moment du changement.', tag: 'Registre' },
      { label: 'Prestations encore disponibles', amount: 0, note: 'Aucun droit, développement ou avance présentant une valeur résiduelle.', tag: 'Services' }
    ],
    checks: ['Inventaire signé au 31.12.2026.', 'Rapprochement avec le registre des immobilisations.', 'Analyse des charges payées d’avance, des droits acquis et des prestations encore disponibles.'],
    legal: 'Pratique AFC dès 2025 · valeur résiduelle au moment du changement · dernier décompte selon la méthode effective, ch. 415',
    sourceIds: ['tdfn-transition-2025', 'afc-main', 'info12'],
    questions: [
      { q: 'Le seul fait de changer de méthode entraîne-t-il automatiquement un remboursement de toute la TVA déduite antérieurement?', options: ['Oui', 'Non'], answer: 1, why: 'Seul l’impôt préalable lié aux biens et prestations encore disponibles à concurrence de leur valeur résiduelle est concerné.' },
      { q: 'Quel montant doit être porté au ch. 415 selon les données complètes de ce cas?', options: ['CHF 0', 'La totalité de l’impôt préalable 2026', 'Un forfait de 20 % du chiffre d’affaires'], answer: 0, why: 'Aucune position ayant une valeur résiduelle n’a été identifiée. La correction est donc nulle dans ce scénario.' },
      { q: 'Que faut-il conserver même si la correction est nulle?', options: ['Aucun document', 'Une note de rapprochement avec inventaire, immobilisations et prestations encore disponibles', 'Uniquement une capture d’écran du Portail AFC'], answer: 1, why: 'Le dossier doit montrer pourquoi aucune valeur résiduelle n’a été retenue.' }
    ],
    lesson: 'Un ch. 415 nul doit résulter d’un contrôle documenté, et non de l’absence de calcul.'
  },
  {
    id: 'K2', publicId: 'K2', tab: 'K2 · Ordinateur',
    title: 'Un ordinateur — calculer la part résiduelle selon les périodes fiscales',
    entity: 'Digital Comptabilité Sàrl', sector: 'Services', location: 'Renens', period: 'Passage au 01.01.2027',
    level: 'Transition · calcul simple', risk: 'medium', type: 'quiz',
    description: 'La valeur résiduelle TVA ne suit pas l’amortissement comptable. Le calcul part de l’impôt préalable effectivement déduit.',
    conceptualNote: 'Pour ce cas pédagogique, deux périodes fiscales sont prises en compte pour la dépréciation à raison de 1/5 par période.',
    mission: 'Calculez la part résiduelle, la correction et la rubrique du dernier décompte selon la méthode effective.',
    clientNote: 'L’ordinateur est affecté exclusivement à l’activité imposable et aucun changement d’utilisation n’est intervenu.',
    afcNote: 'L’impôt préalable de CHF 810 a été entièrement admis lors de l’acquisition. Mise en service le 01.01.2025.',
    given: [
      { label: 'Impôt préalable effectivement déduit', amount: 810, note: 'Montant admis après contrôle de la facture.', tag: 'IP' },
      { label: 'Mise en service', note: '01.01.2025.', tag: 'Départ' },
      { label: 'Périodes fiscales prises en compte', amount: 2, note: '2025 et 2026.', tag: '2 × 20 %' },
      { label: 'Passage aux TDFN', note: '01.01.2027.', tag: 'Changement' }
    ],
    checks: ['Utiliser l’impôt préalable admis, pas la valeur comptable nette.', 'Déterminer les périodes fiscales selon les règles TVA.', 'Reporter le résultat au ch. 415 du dernier décompte selon la méthode effective.'],
    legal: 'Art. 31 LTVA · art. 70 OTVA · Info TVA 12 · pratique AFC dès 2025',
    sourceIds: ['tdfn-transition-2025', 'info12', 'ltva', 'otva'],
    questions: [
      { q: 'Quelle part résiduelle reste après deux périodes fiscales à 20 % chacune?', options: ['40 %', '60 %', '80 %'], answer: 1, why: 'Deux périodes représentent 40 % de dépréciation; la part résiduelle est donc de 60 %.' },
      { q: 'Quelle correction doit être calculée?', options: ['CHF 324', 'CHF 486', 'CHF 810'], answer: 1, why: 'CHF 810 × 60 % = CHF 486.' },
      { q: 'L’ordinateur est totalement amorti dans la comptabilité commerciale. Le ch. 415 devient-il automatiquement nul?', options: ['Oui', 'Non'], answer: 1, why: 'La valeur comptable et le plan d’amortissement commercial ne déterminent pas la valeur résiduelle TVA.' },
      { q: 'Où reporter CHF 486?', options: ['Ch. 415 du dernier décompte selon la méthode effective', 'Ch. 410 du premier décompte TDFN', 'Ch. 220'], answer: 0, why: 'Le passage méthode effective → TDFN est corrigé au ch. 415 avant le changement.' }
    ],
    lesson: 'Base de calcul: impôt préalable effectivement admis × part résiduelle TVA.'
  },
  {
    id: 'K3', publicId: 'K3', tab: 'K3 · Stock et machine',
    title: 'Stock non utilisé et machine — deux règles dans un même dossier',
    entity: 'Atelier Commerce Sàrl', sector: 'Commerce et production', location: 'Morges', period: 'Passage au 01.01.2027',
    level: 'Transition · application', risk: 'high', type: 'quiz',
    description: 'Un stock encore disponible conserve ici 100 % de l’impôt préalable admis, tandis qu’une machine utilisée perd 1/5 par période fiscale.',
    conceptualNote: 'Le montant du stock est déjà rapproché avec les factures et représente l’impôt préalable effectivement déduit; il ne provient pas d’un taux appliqué globalement à la valeur comptable.',
    mission: 'Calculez séparément la correction du stock et celle de la machine, puis totalisez le ch. 415.',
    clientNote: 'Le stock est composé uniquement de marchandises achetées en Suisse, encore non vendues et non utilisées au 31.12.2026.',
    afcNote: 'La machine a été mise en service le 01.01.2026 et une période fiscale est prise en compte.',
    given: [
      { label: 'IP admis sur le stock encore disponible', amount: 3240, note: 'Montant concilié avec l’inventaire et les pièces fournisseurs.', tag: '100 % résiduel' },
      { label: 'IP admis sur la machine', amount: 4050, note: 'Mise en service le 01.01.2026.', tag: '1 période' },
      { label: 'Part résiduelle de la machine', note: '80 % après une période fiscale.', tag: '4/5' }
    ],
    checks: ['Rapprocher le stock avec les factures et notes de crédit.', 'Ne pas appliquer automatiquement 8,1 % à la valeur comptable du stock.', 'Séparer les biens non utilisés des immobilisations déjà utilisées.'],
    legal: 'Art. 31 LTVA · art. 70 OTVA · pratique AFC dès 2025 · dernier décompte selon la méthode effective, ch. 415',
    sourceIds: ['tdfn-transition-2025', 'info12', 'ltva', 'otva'],
    questions: [
      { q: 'Quelle correction concerne le stock encore non utilisé?', options: ['CHF 0', 'CHF 648', 'CHF 3’240'], answer: 2, why: 'Dans ce cas, le stock est encore entièrement disponible; l’impôt préalable admis de CHF 3’240 est retenu à 100 %.' },
      { q: 'Quelle correction concerne la machine?', options: ['CHF 810', 'CHF 3’240', 'CHF 4’050'], answer: 1, why: 'CHF 4’050 × 80 % = CHF 3’240.' },
      { q: 'Quel total doit être porté au ch. 415?', options: ['CHF 3’240', 'CHF 6’480', 'CHF 7’290'], answer: 1, why: 'CHF 3’240 de stock + CHF 3’240 de machine = CHF 6’480.' },
      { q: 'Pourquoi ne faut-il pas multiplier toute la valeur comptable du stock par 8,1 %?', options: ['Parce que la correction se fonde sur l’impôt préalable effectivement déduit et documenté', 'Parce que les stocks ne sont jamais corrigés', 'Parce que le TDFN remplace les factures fournisseurs'], answer: 0, why: 'Les taux d’achat, importations, acquisitions sans TVA, notes de crédit et restrictions de déduction peuvent différer.' }
    ],
    lesson: 'Traitez chaque catégorie séparément et partez toujours de l’impôt préalable réellement admis.'
  },
  {
    id: 'K4', publicId: 'K4', tab: 'K4 · Services',
    title: 'ERP, SaaS et honoraires — quelles prestations ont encore une valeur?',
    entity: 'Processus PME SA', sector: 'Services numériques', location: 'Genève', period: 'Passage au 01.01.2027',
    level: 'Transition · qualification', risk: 'high', type: 'quiz',
    description: 'Toutes les prestations de services ne conservent pas une valeur résiduelle. La qualification précède le calcul.',
    conceptualNote: 'Le cas suppose qu’une licence ERP perpétuelle et un développement individualisé constituent un résultat encore disponible. Les abonnements et prestations courantes des périodes écoulées sont consommés; aucune charge payée d’avance ne couvre une période postérieure au changement.',
    mission: 'Séparez les prestations encore disponibles des charges déjà consommées, puis calculez la correction ERP.',
    clientNote: 'L’ERP continue d’être exploité après le passage. Les frais annuels de support, de SaaS et d’hébergement prennent fin au 31.12.2026 et ne comprennent aucune avance pour 2027.',
    afcNote: 'L’impôt préalable admis sur la licence perpétuelle et le développement durable est de CHF 1’620; une période fiscale est prise en compte.',
    given: [
      { label: 'Licence ERP perpétuelle et développement individualisé', amount: 1620, note: 'Impôt préalable admis; résultat encore disponible.', tag: 'Valeur résiduelle' },
      { label: 'SaaS mensuel et hébergement 2026', note: 'Prestations courantes consommées.', tag: 'Pas de résiduel' },
      { label: 'Support, publicité et comptabilité 2026', note: 'Prestations achevées dans le cas.', tag: 'Consommées' },
      { label: 'Part résiduelle ERP', note: '80 % après une période fiscale.', tag: '4/5' }
    ],
    checks: ['Documenter la nature et la durée du droit acquis.', 'Exclure maintenance et exploitation courantes du calcul.', 'Éviter de reprendre automatiquement toutes les factures de services des cinq dernières années.'],
    legal: 'Art. 31 LTVA · art. 70 OTVA · Info TVA 12 · analyse de la disponibilité au moment du changement',
    sourceIds: ['tdfn-transition-2025', 'info12', 'ltva', 'otva'],
    questions: [
      { q: 'Quelle position présente une valeur résiduelle selon les hypothèses du cas?', options: ['La licence ERP perpétuelle et le développement individualisé', 'La campagne publicitaire achevée', 'Les honoraires comptables mensuels'], answer: 0, why: 'Le résultat ERP continue d’être disponible; les autres prestations indiquées sont déjà consommées.' },
      { q: 'Quelle correction est calculée sur l’ERP?', options: ['CHF 324', 'CHF 1’296', 'CHF 1’620'], answer: 1, why: 'CHF 1’620 × 80 % = CHF 1’296.' },
      { q: 'Quelle méthode de travail est correcte?', options: ['Reprendre toutes les factures de services des cinq dernières années', 'Analyser si le résultat de la prestation est encore disponible au moment du changement', 'Exclure toutes les prestations immatérielles sans analyse'], answer: 1, why: 'La présence d’une valeur résiduelle dépend de la prestation et de sa disponibilité, pas seulement de son caractère matériel ou immatériel.' }
    ],
    lesson: 'Pour les services, la qualification de la valeur encore disponible est aussi importante que l’arithmétique.'
  },
  {
    id: 'K5', publicId: 'K5', tab: 'K5 · Déduction partielle',
    title: 'Droit partiel à l’impôt préalable — corriger uniquement le montant admis',
    entity: 'Formation Mixte SA', sector: 'Activités imposables et exclues', location: 'Fribourg', period: 'Passage au 01.01.2027',
    level: 'Transition · avancé', risk: 'high', type: 'quiz',
    description: 'La TVA figurant sur la facture n’est pas toujours la base de la correction. Il faut partir du montant définitivement admis après les corrections antérieures.',
    conceptualNote: 'Le cas fournit directement l’impôt préalable définitivement admis afin de concentrer l’exercice sur la transition de méthode.',
    mission: 'Identifiez la bonne base, appliquez la part résiduelle et documentez le ch. 415.',
    clientNote: 'L’équipement sert à des activités imposables et exclues. La clé d’utilisation a déjà été contrôlée dans les périodes antérieures.',
    afcNote: 'TVA de la facture CHF 8’100; impôt préalable définitivement admis après corrections CHF 6’075; une période fiscale écoulée.',
    given: [
      { label: 'TVA figurant sur la facture', amount: 8100, note: 'Montant brut, non entièrement déductible.', tag: 'Facture' },
      { label: 'Impôt préalable définitivement admis', amount: 6075, note: '75 % après les corrections antérieures.', tag: 'Base correcte' },
      { label: 'Part résiduelle', note: '80 % après une période fiscale.', tag: '4/5' }
    ],
    checks: ['Reprendre le montant admis après les corrections antérieures.', 'Conserver la clé d’affectation et son rapprochement.', 'Ne pas recalculer rétroactivement une déduction fictive de 100 %.'],
    legal: 'Art. 30 et 31 LTVA · art. 70 OTVA · pratique AFC dès 2025',
    sourceIds: ['tdfn-transition-2025', 'info12', 'ltva', 'otva'],
    questions: [
      { q: 'Quelle base faut-il utiliser pour la correction?', options: ['CHF 8’100, soit toute la TVA de la facture', 'CHF 6’075, soit l’impôt préalable définitivement admis', 'La valeur comptable nette de l’équipement'], answer: 1, why: 'La correction porte sur l’impôt préalable réellement déduit après les restrictions et corrections antérieures.' },
      { q: 'Quelle correction résulte du cas?', options: ['CHF 1’215', 'CHF 4’860', 'CHF 6’480'], answer: 1, why: 'CHF 6’075 × 80 % = CHF 4’860.' },
      { q: 'Quel document est essentiel?', options: ['La clé d’affectation et le rapprochement de l’impôt préalable admis', 'Une estimation orale du client', 'Uniquement le tableau d’amortissement commercial'], answer: 0, why: 'Le dossier doit permettre de reconstituer le droit partiel et les corrections déjà opérées.' }
    ],
    lesson: 'Ne corrigez jamais plus d’impôt préalable que celui qui a effectivement été admis.'
  },
  {
    id: 'L0', publicId: 'L0', tab: 'L0 · Retour à la méthode effective',
    title: 'Passage des TDFN à la méthode effective — le ch. 410 est un autre dossier',
    entity: 'Retour Effective Sàrl', sector: 'Services', location: 'Neuchâtel', period: 'Passage au 01.01.2027',
    level: 'Transition inverse', risk: 'high', type: 'quiz',
    description: 'Le sens de la correction s’inverse: l’impôt préalable admissible sur la valeur résiduelle peut être revendiqué dans le premier décompte selon la méthode effective.',
    conceptualNote: 'Ce module est séparé du ch. 415 afin de ne pas mélanger deux déclarations, deux moments et deux directions fiscales.',
    mission: 'Identifiez le formulaire, le chiffre et le sens de la correction lors du retour à la méthode effective.',
    clientNote: 'L’entreprise a appliqué les TDFN pendant la durée minimale et passe à la méthode effective au début de 2027.',
    afcNote: 'Une valeur résiduelle documentée correspond à un impôt préalable admissible de CHF 486.',
    given: [
      { label: 'Méthode avant le changement', note: 'TDFN.', tag: 'Sortie' },
      { label: 'Méthode dès le 01.01.2027', note: 'Méthode effective.', tag: 'Entrée' },
      { label: 'Impôt préalable admissible sur la valeur résiduelle', amount: 486, note: 'Montant documenté dans le cas.', tag: 'Déduction' }
    ],
    checks: ['Utiliser le premier décompte selon la méthode effective.', 'Reporter la déduction au ch. 410.', 'Ne pas chercher le ch. 410 dans la vue TDFN.'],
    legal: 'Art. 37 LTVA · Info TVA 12, ch. 3.2.2 · pratique AFC dès 2025',
    sourceIds: ['afc-main', 'tdfn-transition-2025', 'info12', 'ltva'],
    questions: [
      { q: 'Dans quel décompte la déduction est-elle revendiquée?', options: ['Dernier décompte TDFN', 'Premier décompte selon la méthode effective', 'Concordance annuelle uniquement'], answer: 1, why: 'Le ch. 410 est utilisé dans le premier décompte après le passage à la méthode effective.' },
      { q: 'Quelle rubrique reçoit CHF 486?', options: ['Ch. 410', 'Ch. 415', 'Ch. 323'], answer: 0, why: 'Le retour TDFN → effective permet de faire valoir l’impôt préalable admissible sur la valeur résiduelle au ch. 410.' },
      { q: 'Pourquoi le ch. 410 n’apparaît-il pas dans la vue TDFN du simulateur?', options: ['Parce qu’il appartient au décompte selon la méthode effective', 'Parce qu’il a été supprimé en 2025', 'Parce que la déduction est interdite'], answer: 0, why: 'La rubrique concerne le premier décompte de la nouvelle méthode effective.' }
    ],
    lesson: 'Ch. 415: sortie de l’effective vers les TDFN. Ch. 410: entrée dans l’effective depuis les TDFN.'
  }
];

for (const transitionCase of transitionCases) {
  if (!CASES.some((item) => item.id === transitionCase.id)) CASES.push(transitionCase);
}

/* Les lettres publiques historiques A à Q restent stables. Les sous-cas K0 à K5 et L0 s’ajoutent sans déplacer les liens existants. */

/* Le contenu du cas K a profondément changé; son ancien score ne doit pas être
 * présenté comme une validation du nouveau module K0. */
try {
  const storageKey = 'tva_tdfn_v63_state';
  const raw = JSON.parse(localStorage.getItem(storageKey) || 'null');
  const kIndex = CASES.findIndex((item) => item.id === 'K');
  if (raw && raw.version === 63 && kIndex >= 0 && !raw.v8TransitionMigrated) {
    for (const group of ['answers', 'quiz', 'scores', 'assisted', 'attempts', 'steps', 'reported', 'finalRound', 'acquisitionRate']) {
      if (raw[group]) delete raw[group][kIndex];
    }
    raw.v8TransitionMigrated = true;
    localStorage.setItem(storageKey, JSON.stringify(raw));
  }
} catch {}


const TRANSITION_WORKSHEET_KEY = 'tva_tdfn_v81_transition_worksheets';
const TRANSITION_WORKSHEETS = {
  K1: {
    destination: 'Dernier décompte selon la méthode effective · ch. 415',
    direction: 'Aucune dette supplémentaire dans les hypothèses du cas',
    total: 0,
    lines: [
      { id: 'absence', label: 'Biens et prestations encore disponibles', base: 'Aucun montant identifié', expectedTreatment: 'no', expectedResidual: 0, expectedCorrection: 0 }
    ]
  },
  K2: {
    destination: 'Dernier décompte selon la méthode effective · ch. 415',
    direction: 'La correction augmente la dette envers l’AFC',
    total: 486,
    lines: [
      { id: 'computer', label: 'Ordinateur', base: 'Impôt préalable admis CHF 810', expectedTreatment: 'yes', expectedResidual: 60, expectedCorrection: 486 }
    ]
  },
  K3: {
    destination: 'Dernier décompte selon la méthode effective · ch. 415',
    direction: 'La correction augmente la dette envers l’AFC',
    total: 6480,
    lines: [
      { id: 'stock', label: 'Stock non utilisé', base: 'Impôt préalable admis CHF 3’240', expectedTreatment: 'yes', expectedResidual: 100, expectedCorrection: 3240 },
      { id: 'machine', label: 'Machine · une période fiscale prise en compte', base: 'Impôt préalable admis CHF 4’050', expectedTreatment: 'yes', expectedResidual: 80, expectedCorrection: 3240 }
    ]
  },
  K4: {
    destination: 'Dernier décompte selon la méthode effective · ch. 415',
    direction: 'Seul le résultat encore disponible entre dans la correction',
    total: 1296,
    lines: [
      { id: 'erp', label: 'Licence ERP perpétuelle + développement individualisé', base: 'Impôt préalable admis CHF 1’620', expectedTreatment: 'yes', expectedResidual: 80, expectedCorrection: 1296 },
      { id: 'saas', label: 'SaaS et hébergement consommés jusqu’au 31.12.2026', base: 'Aucune avance pour 2027', expectedTreatment: 'no', expectedResidual: 0, expectedCorrection: 0 },
      { id: 'services', label: 'Support, publicité et comptabilité achevés', base: 'Prestations consommées', expectedTreatment: 'no', expectedResidual: 0, expectedCorrection: 0 }
    ]
  },
  K5: {
    destination: 'Dernier décompte selon la méthode effective · ch. 415',
    direction: 'La correction part de l’impôt préalable définitivement admis',
    total: 4860,
    lines: [
      { id: 'mixed', label: 'Équipement à double affectation', base: 'Impôt préalable définitivement admis CHF 6’075', expectedTreatment: 'yes', expectedResidual: 80, expectedCorrection: 4860 }
    ]
  },
  L0: {
    destination: 'Premier décompte selon la méthode effective · ch. 410',
    direction: 'La correction constitue une déduction en faveur de l’entreprise',
    total: 486,
    lines: [
      { id: 'reverse', label: 'Impôt préalable admissible sur la valeur résiduelle', base: 'Montant documenté CHF 486', expectedTreatment: 'yes', expectedResidual: 100, expectedCorrection: 486 }
    ]
  }
};

function readTransitionWorksheets() {
  try {
    const value = JSON.parse(localStorage.getItem(TRANSITION_WORKSHEET_KEY) || '{}');
    return value && typeof value === 'object' ? value : {};
  } catch {
    return {};
  }
}

function writeTransitionWorksheets(value) {
  try { localStorage.setItem(TRANSITION_WORKSHEET_KEY, JSON.stringify(value)); } catch {}
}

function transitionWorksheetState(publicId = getPublicCaseId()) {
  const all = readTransitionWorksheets();
  return all[publicId] || { lines: {}, validated: false, assisted: false };
}

function saveTransitionWorksheetState(publicId, next) {
  const all = readTransitionWorksheets();
  all[publicId] = next;
  writeTransitionWorksheets(all);
}

function parseWorksheetNumber(value) {
  const normalized = String(value ?? '').trim().replace(/[’'\s]/g, '').replace(',', '.');
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function worksheetNumber(value) {
  if (value === null || value === undefined || value === '') return '';
  return new Intl.NumberFormat('fr-CH', { maximumFractionDigits: 2 }).format(Number(value));
}

function transitionWorksheetMarkup(publicId, model) {
  const state = transitionWorksheetState(publicId);
  const rows = model.lines.map((line) => {
    const values = state.lines?.[line.id] || {};
    const status = state.validated ? (values.correct ? 'is-correct' : 'is-wrong') : '';
    return `<div class="v81-transition-row ${status}" data-v81-row="${line.id}">
      <div class="v81-transition-row__subject"><strong>${line.label}</strong><small>${line.base}</small></div>
      <label><span>Traitement</span><select data-v81-field="treatment" data-v81-line="${line.id}">
        <option value="">Choisir</option>
        <option value="yes" ${values.treatment === 'yes' ? 'selected' : ''}>À corriger</option>
        <option value="no" ${values.treatment === 'no' ? 'selected' : ''}>Pas de correction</option>
      </select></label>
      <label><span>Part résiduelle</span><div class="v81-number-field"><input inputmode="decimal" data-v81-field="residual" data-v81-line="${line.id}" value="${worksheetNumber(values.residual)}" aria-label="Part résiduelle en pour cent pour ${line.label}"><b>%</b></div></label>
      <label><span>Correction</span><div class="v81-number-field"><b>CHF</b><input inputmode="decimal" data-v81-field="correction" data-v81-line="${line.id}" value="${worksheetNumber(values.correction)}" aria-label="Correction en francs pour ${line.label}"></div></label>
      <span class="v81-row-status" aria-live="polite">${state.validated ? (values.correct ? 'Correct' : 'À revoir') : ''}</span>
    </div>`;
  }).join('');
  const feedbackClass = state.validated ? (state.correct ? 'is-correct' : 'is-wrong') : '';
  const feedbackText = state.validated
    ? (state.correct
      ? `Tableau correct · total CHF ${worksheetNumber(model.total)} · ${model.destination}`
      : 'Certaines lignes sont à revoir. Contrôlez la qualification, la part résiduelle et le montant.')
    : 'Ce tableau est contrôlé avec le bouton principal «Vérifier les réponses».';
  return `<section class="workspace-card v81-transition-sheet" data-v81-transition-sheet="${publicId}">
    <div class="v81-transition-sheet__head">
      <div><p class="eyebrow">Préparation du changement de méthode</p><h3>Tableau de correction de la valeur résiduelle</h3></div>
      <span>${publicId.startsWith('K') ? 'ch. 415' : 'ch. 410'}</span>
    </div>
    <p class="v81-transition-intro">Qualifiez chaque position avant de répondre au quiz. La valeur comptable ne remplace ni l’impôt préalable admis ni les règles de valeur résiduelle TVA. Le mode «convenues» ou «reçues» reste inchangé; les débiteurs et créanciers ne sont pas corrigés dans ces sous-cas.</p>
    <div class="v81-transition-destination"><strong>${model.destination}</strong><span>${model.direction}</span></div>
    <div class="v81-transition-grid">${rows}</div>
    <div class="v81-transition-feedback ${feedbackClass}" data-v81-feedback role="status">${feedbackText}</div>
  </section>`;
}

function enhanceTransitionWorksheet() {
  const publicId = getPublicCaseId();
  const model = TRANSITION_WORKSHEETS[publicId];
  const workArea = document.querySelector('#workArea');
  if (!workArea) return;
  workArea.querySelectorAll('[data-v81-transition-sheet]').forEach((node) => {
    if (node.dataset.v81TransitionSheet !== publicId) node.remove();
  });
  if (!model || workArea.querySelector(`[data-v81-transition-sheet="${publicId}"]`)) return;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = transitionWorksheetMarkup(publicId, model);
  const sheet = wrapper.firstElementChild;
  const quiz = workArea.querySelector('.quiz-card, .quiz-shell, form');
  if (quiz) quiz.before(sheet); else workArea.prepend(sheet);
}

function collectTransitionWorksheet(publicId) {
  const model = TRANSITION_WORKSHEETS[publicId];
  const sheet = document.querySelector(`[data-v81-transition-sheet="${publicId}"]`);
  if (!model || !sheet) return null;
  const previous = transitionWorksheetState(publicId);
  const next = { ...previous, lines: {}, validated: false, correct: false };
  for (const line of model.lines) {
    const treatment = sheet.querySelector(`[data-v81-field="treatment"][data-v81-line="${line.id}"]`)?.value || '';
    const residual = parseWorksheetNumber(sheet.querySelector(`[data-v81-field="residual"][data-v81-line="${line.id}"]`)?.value);
    const correction = parseWorksheetNumber(sheet.querySelector(`[data-v81-field="correction"][data-v81-line="${line.id}"]`)?.value);
    next.lines[line.id] = { treatment, residual, correction };
  }
  saveTransitionWorksheetState(publicId, next);
  return next;
}

function validateTransitionWorksheet(publicId = getPublicCaseId(), { assisted = false } = {}) {
  const model = TRANSITION_WORKSHEETS[publicId];
  if (!model) return true;
  const captured = collectTransitionWorksheet(publicId) || transitionWorksheetState(publicId);
  let complete = true;
  let correct = true;
  const next = { ...captured, lines: {}, validated: true, assisted: Boolean(captured.assisted || assisted) };
  for (const line of model.lines) {
    const values = captured.lines?.[line.id] || {};
    const lineComplete = Boolean(values.treatment) && values.residual !== null && values.correction !== null;
    const lineCorrect = lineComplete
      && values.treatment === line.expectedTreatment
      && Math.abs(Number(values.residual) - line.expectedResidual) < 0.01
      && Math.abs(Number(values.correction) - line.expectedCorrection) < 0.011;
    complete = complete && lineComplete;
    correct = correct && lineCorrect;
    next.lines[line.id] = { ...values, correct: lineCorrect };
  }
  next.complete = complete;
  next.correct = complete && correct;
  saveTransitionWorksheetState(publicId, next);
  const old = document.querySelector(`[data-v81-transition-sheet="${publicId}"]`);
  if (old) old.outerHTML = transitionWorksheetMarkup(publicId, model);
  return next.correct;
}

function fillTransitionWorksheetSolution(publicId = getPublicCaseId()) {
  const model = TRANSITION_WORKSHEETS[publicId];
  if (!model) return;
  const lines = {};
  for (const line of model.lines) {
    lines[line.id] = {
      treatment: line.expectedTreatment,
      residual: line.expectedResidual,
      correction: line.expectedCorrection,
      correct: true
    };
  }
  saveTransitionWorksheetState(publicId, { lines, validated: true, complete: true, correct: true, assisted: true });
  const old = document.querySelector(`[data-v81-transition-sheet="${publicId}"]`);
  if (old) old.outerHTML = transitionWorksheetMarkup(publicId, model);
}

function clearTransitionWorksheet(publicId = getPublicCaseId()) {
  const all = readTransitionWorksheets();
  if (all[publicId]) {
    delete all[publicId];
    writeTransitionWorksheets(all);
  }
}

function enhanceTransitionResult() {
  const publicId = getPublicCaseId();
  const model = TRANSITION_WORKSHEETS[publicId];
  const resultCard = document.querySelector('#resultArea .result-card, #resultArea .result');
  if (!model || !resultCard || resultCard.querySelector('[data-v81-transition-result]')) return;
  const state = transitionWorksheetState(publicId);
  if (!state.validated) return;
  const note = document.createElement('div');
  note.dataset.v81TransitionResult = 'true';
  note.className = `v81-transition-result ${state.correct ? 'is-correct' : 'is-wrong'}`;
  note.innerHTML = state.correct
    ? `<strong>Tableau de transition validé</strong><span>Total: CHF ${worksheetNumber(model.total)} · ${model.destination}</span>`
    : '<strong>Tableau de transition incomplet</strong><span>Le score du quiz ne suffit pas: la préparation du ch. 415 ou 410 doit aussi être correcte.</span>';
  resultCard.prepend(note);
}


const PRECHECK_DETAILS = {
  authorization: {
    title: 'Méthode de décompte et date d’effet confirmées dans le dossier AFC',
    verify: 'Contrôler le profil AFC applicable à la période. Lors d’un changement de méthode, rapprocher la demande, la confirmation ou le statut du Portail AFC avec la date d’effet retenue dans le décompte.',
    documents: 'Profil de décompte dans le Portail AFC, demande de changement, confirmation AFC et correspondance relative à la date d’effet.',
    alert: 'Un calcul plus favorable ou une décision interne ne suffit pas: la méthode effectivement applicable à la période doit être établie.'
  },
  rates: {
    title: 'Activités et TDFN concordants avec le profil AFC ou documentés comme taux supplémentaire',
    verify: 'Comparer chaque activité réellement exercée avec les TDFN déjà attribués. Pour une nouvelle activité dépassant le seuil pertinent, documenter la classification et le taux supplémentaire déclaré directement dans le décompte, sous réserve du contrôle ultérieur de l’AFC.',
    documents: 'Profil AFC, ventilation des comptes de produits, contrats, factures, descriptifs de prestations et note de qualification d’un taux supplémentaire.',
    alert: 'La déclaration directe d’un taux supplémentaire ne permet pas de le choisir par simple ressemblance avec une profession voisine; l’AFC peut contrôler et corriger la qualification.'
  },
  basis: {
    title: 'Mode de décompte «convenues» ou «reçues» identifié',
    verify: 'Déterminer si les contre-prestations sont déclarées selon les factures émises ou les encaissements, puis contrôler la période et le cut-off.',
    documents: 'Profil AFC, journaux de ventes, liste des débiteurs, relevés bancaires et rapprochement de cut-off.',
    alert: 'Mélanger facturation et encaissement peut doubler ou omettre un chiffre d’affaires.'
  },
  grossNet: {
    title: 'Montants sources identifiés comme HT ou TTC',
    verify: 'Qualifier chaque montant avant le calcul. La base TDFN est constituée des contre-prestations brutes, TVA comprise.',
    documents: 'Factures, export comptable, paramétrage des codes TVA et tableau de conversion HT vers TTC.',
    alert: 'Appliquer un TDFN à une base HT sous-estime la dette fiscale.'
  },
  turnover: {
    title: 'Exhaustivité du ch. 200 contrôlée, y compris les opérations à y déclarer',
    verify: 'Rapprocher le ch. 200 avec les comptes de produits et expliquer chaque différence: exportations, prestations à l’étranger, options, procédure de déclaration ou diminutions de contre-prestation.',
    documents: 'Balance générale, grand livre des produits, journaux de ventes et tableau de concordance du chiffre d’affaires.',
    alert: 'Une opération déduite plus bas dans le formulaire doit souvent être comprise d’abord au ch. 200.'
  },
  foreignPlace: {
    title: 'Prestations avec lieu à l’étranger analysées',
    verify: 'Déterminer le lieu de la prestation selon sa nature et distinguer le ch. 221 des exportations de biens au ch. 220.',
    documents: 'Contrats, factures, adresse et statut du client, preuve du lieu d’exécution et analyse de l’art. 8 LTVA.',
    alert: 'Le seul fait que le client soit étranger ne place pas automatiquement la prestation à l’étranger.'
  },
  evidence: {
    title: 'Exportations et autres déductions appuyées par des justificatifs',
    verify: 'Contrôler que chaque déduction possède une base juridique et une preuve conservée dans le dossier.',
    documents: 'Documents douaniers, preuves d’exportation, contrats, notes de crédit et pièces de la procédure de déclaration.',
    alert: 'Une déduction arithmétiquement correcte peut être refusée si la preuve est insuffisante.'
  },
  acquisitions: {
    title: 'Prestations acquises à l’étranger contrôlées pour l’impôt sur les acquisitions',
    verify: 'Rechercher les services de fournisseurs étrangers sans TVA suisse, déterminer le lieu de la prestation et calculer séparément le ch. 383.',
    documents: 'Factures étrangères, contrats SaaS ou licences, relevés de cartes, comptes de charges et justificatif du taux légal.',
    alert: 'L’achat étranger est une charge: il n’entre pas au ch. 200, mais peut générer un impôt sur les acquisitions.'
  },
  concordance: {
    title: 'Concordance ch. 299 = ch. 379 vérifiée après le report du calcul',
    verify: 'Après ventilation par activité, contrôler que la base totale du calcul TDFN correspond au chiffre d’affaires imposable du ch. 299.',
    documents: 'Tableau de ventilation des activités, calcul TDFN et copie ou export du décompte.',
    alert: 'Un écart signale généralement une activité oubliée, une déduction mal reportée ou un calcul devenu obsolète.'
  },
  special: {
    title: 'Subventions, dividendes, procédure de déclaration et corrections examinés',
    verify: 'Passer en revue les opérations non ordinaires, mouvements de fonds, valeurs résiduelles, notes de crédit et erreurs de périodes antérieures.',
    documents: 'Décisions de subvention, procès-verbaux de dividendes, contrats de transfert, tableaux de valeurs résiduelles et décomptes rectificatifs.',
    alert: 'Ces opérations peuvent relever de rubriques ou de procédures distinctes et ne se compensent pas automatiquement.'
  }
};

const CASE_PRECHECK_PRIORITIES = {
  A: ['authorization', 'grossNet'],
  B: ['grossNet'],
  C: ['rates', 'grossNet'],
  D: ['rates'],
  E: ['rates'],
  F: ['rates'],
  G: ['turnover', 'evidence'],
  H: ['foreignPlace', 'turnover'],
  I: ['acquisitions'],
  J: ['authorization', 'rates'],
  K: ['authorization', 'special'],
  K0: ['authorization', 'special'],
  K1: ['special'],
  K2: ['special'],
  K3: ['special', 'evidence'],
  K4: ['special'],
  K5: ['special'],
  L0: ['authorization', 'special'],
  L: ['special'],
  M: ['special'],
  N: ['special', 'turnover'],
  O: ['evidence', 'turnover'],
  P: ['special'],
  OP: ['special', 'turnover'],
  Q: []
};

const openPrechecks = new Set();
let pendingPrecheckFocusKey = null;
let enhancementQueued = false;

function getCurrentCase() {
  const select = document.querySelector('#caseSelect');
  const index = Number(select?.value);
  return Number.isInteger(index) ? CASES[index] : null;
}

function getPublicCaseId(caseItem = getCurrentCase()) {
  return caseItem?.publicId || caseItem?.id || '';
}

function currentPriorityKeys() {
  const current = getCurrentCase();
  return new Set(CASE_PRECHECK_PRIORITIES[current?.id] || CASE_PRECHECK_PRIORITIES[getPublicCaseId(current)] || []);
}

function ensurePrecheckTools(content, list) {
  if (content.querySelector('.v73-precheck-tools')) return;
  const priorities = [...currentPriorityKeys()];
  const tools = document.createElement('div');
  tools.className = 'v73-precheck-tools';
  tools.innerHTML = `
    <div class="v73-precheck-priority" aria-live="polite">
      <strong>Priorités de ce cas</strong>
      <span></span>
    </div>
    <div class="v73-precheck-tools__actions" aria-label="Commandes des détails">
      <button class="btn small" type="button" data-v73-precheck-all="open">Tout ouvrir</button>
      <button class="btn small" type="button" data-v73-precheck-all="close">Tout fermer</button>
    </div>
  `;
  const priorityLabel = tools.querySelector('.v73-precheck-priority span');
  priorityLabel.textContent = priorities.length
    ? priorities.map((key) => PRECHECK_DETAILS[key]?.title).filter(Boolean).join(' · ')
    : 'Contrôle transversal de l’ensemble du décompte.';
  list.before(tools);
}

function enhancePrecheck() {
  const content = document.querySelector('#precheckContent');
  const list = content?.querySelector('.precheck-list');
  if (!list) return;

  ensurePrecheckTools(content, list);
  if (list.dataset.v73Enhanced === 'true') return;

  list.dataset.v73Enhanced = 'true';
  const priorities = currentPriorityKeys();
  const originalItems = [...list.querySelectorAll('.precheck-item')];

  for (const original of originalItems) {
    const input = original.querySelector('[data-precheck]');
    if (!input) continue;
    const key = input.dataset.precheck;
    const detail = PRECHECK_DETAILS[key];
    if (!detail) continue;

    const number = original.querySelector('b')?.textContent?.trim() || '';
    const inputId = `precheck-${key}`;
    const toggleId = `precheck-toggle-${key}`;
    const panelId = `precheck-panel-${key}`;
    input.id = inputId;

    const wrapper = document.createElement('div');
    wrapper.className = 'precheck-accordion';
    wrapper.dataset.precheckPanel = key;
    if (priorities.has(key)) wrapper.classList.add('precheck-accordion--priority');

    const row = document.createElement('div');
    row.className = 'precheck-accordion__row';

    const label = document.createElement('label');
    label.className = 'precheck-accordion__check';
    label.htmlFor = inputId;
    label.append(input);

    const title = document.createElement('span');
    title.className = 'precheck-accordion__title';
    title.innerHTML = `<b>${number}</b><span></span>`;
    title.querySelector('span').textContent = detail.title;
    if (priorities.has(key)) {
      const badge = document.createElement('small');
      badge.className = 'precheck-priority-badge';
      badge.textContent = 'Priorité du cas';
      title.append(badge);
    }
    label.append(title);

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.id = toggleId;
    toggle.className = 'precheck-accordion__toggle';
    toggle.dataset.v73PrecheckToggle = key;
    toggle.setAttribute('aria-controls', panelId);
    toggle.setAttribute('aria-expanded', String(openPrechecks.has(key)));
    toggle.textContent = openPrechecks.has(key) ? 'Masquer' : 'Détails';

    const body = document.createElement('div');
    body.className = 'precheck-accordion__body';
    body.id = panelId;
    body.hidden = !openPrechecks.has(key);
    body.setAttribute('role', 'region');
    body.setAttribute('aria-labelledby', toggleId);
    body.innerHTML = `
      <div class="precheck-detail-row"><strong>À vérifier</strong><p></p></div>
      <div class="precheck-detail-row"><strong>Pièces utiles</strong><p></p></div>
      <div class="precheck-detail-row precheck-detail-alert"><strong>Signal d’alerte</strong><p></p></div>
    `;
    const paragraphs = body.querySelectorAll('p');
    paragraphs[0].textContent = detail.verify;
    paragraphs[1].textContent = detail.documents;
    paragraphs[2].textContent = detail.alert;

    row.append(label, toggle);
    wrapper.append(row, body);
    original.replaceWith(wrapper);
  }

  if (pendingPrecheckFocusKey) {
    const focusKey = pendingPrecheckFocusKey;
    pendingPrecheckFocusKey = null;
    requestAnimationFrame(() => document.querySelector(`[data-precheck="${focusKey}"]`)?.focus());
  }
}

function setPrecheckPanelState(key, open) {
  const panel = document.querySelector(`[data-precheck-panel="${key}"]`);
  const body = panel?.querySelector('.precheck-accordion__body');
  const button = panel?.querySelector('[data-v73-precheck-toggle]');
  if (!panel || !body || !button) return;

  body.hidden = !open;
  button.setAttribute('aria-expanded', String(open));
  button.textContent = open ? 'Masquer' : 'Détails';
  if (open) openPrechecks.add(key);
  else openPrechecks.delete(key);
}

function togglePrecheckPanel(key) {
  const body = document.querySelector(`[data-precheck-panel="${key}"] .precheck-accordion__body`);
  if (!body) return;
  setPrecheckPanelState(key, body.hidden);
}

function toggleAllPrechecks(open) {
  document.querySelectorAll('[data-precheck-panel]').forEach((panel) => {
    setPrecheckPanelState(panel.dataset.precheckPanel, open);
  });
}

function switchToPortalView() {
  const portalButton = document.querySelector('#modeSwitch [data-mode="portal"]');
  if (!portalButton || document.querySelector('#modeSwitch')?.classList.contains('hidden')) return;
  portalButton.click();
  requestAnimationFrame(() => document.querySelector('#workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
}

function enhanceModeSwitch() {
  const portalButton = document.querySelector('#modeSwitch [data-mode="portal"]');
  if (!portalButton) return;
  portalButton.textContent = 'Vue pédagogique AFC';
  portalButton.classList.add('v72-portal-mode-button');
  portalButton.setAttribute('aria-label', 'Afficher la vue pédagogique non officielle inspirée du prototype AFC');
}

function enhanceResultArea() {
  const resultArea = document.querySelector('#resultArea');
  const modeSwitch = document.querySelector('#modeSwitch');
  if (!resultArea || modeSwitch?.classList.contains('hidden')) return;
  if (!resultArea.querySelector('.result-card') || resultArea.querySelector('.v72-afc-review')) return;

  const resultCard = resultArea.querySelector('.result-card');
  const actions = resultCard.querySelector('.form-actions');
  const review = document.createElement('div');
  review.className = 'v72-afc-review';
  review.innerHTML = `
    <div>
      <span class="v72-afc-review__eyebrow">Étape de relecture</span>
      <strong>Vérifiez où chaque montant apparaît dans la structure du décompte</strong>
      <p>Vue pédagogique inspirée du prototype AFC — non officielle et sans transmission de données.</p>
    </div>
    <button class="btn v72-afc-review__button" type="button" data-v72-open-portal>
      Voir la vue pédagogique AFC →
    </button>
  `;

  if (actions) resultCard.insertBefore(review, actions);
  else resultCard.append(review);
}

function enhanceActionBars() {
  const switcher = document.querySelector('#modeSwitch');
  if (!switcher || switcher.classList.contains('hidden')) return;
  const inPortal = switcher.querySelector('[data-mode="portal"]')?.classList.contains('active');
  const stepThree = document.querySelector('.step-button.active span')?.textContent?.trim() === '3';

  for (const id of ['desktopActionBar', 'mobileActionBar']) {
    const bar = document.querySelector(`#${id}`);
    if (!bar) continue;
    let button = bar.querySelector('[data-v72-open-portal]');

    if (stepThree && !inPortal) {
      if (!button) {
        button = document.createElement('button');
        button.type = 'button';
        button.className = `btn v72-actionbar-afc ${id === 'mobileActionBar' ? 'v72-actionbar-afc--mobile' : ''}`;
        button.dataset.v72OpenPortal = '';
        button.textContent = id === 'mobileActionBar' ? 'Vue pédagogique' : 'Voir la vue pédagogique AFC';
        button.setAttribute('aria-label', 'Voir la vue pédagogique non officielle inspirée du prototype AFC');
        bar.insertBefore(button, bar.firstElementChild);
      }
      button.hidden = false;
    } else if (button) {
      button.hidden = true;
    }
  }
}


function enhanceAfcTerminology() {
  document.querySelectorAll('#workArea .contrast .afc h3').forEach((heading) => {
    if (heading.textContent.trim() === 'Décompte AFC') heading.textContent = 'Traitement dans le décompte';
  });

  document.querySelectorAll('#workArea p').forEach((paragraph) => {
    if (paragraph.textContent.includes('La vue complète du prototype reste disponible séparément.')) {
      paragraph.textContent = paragraph.textContent.replace(
        'La vue complète du prototype reste disponible séparément.',
        'La vue pédagogique complète reste disponible séparément.'
      );
    }
  });
}

function normalizeAggregateRateTerminology() {
  const pedagogicalNote = 'Rapport entre l’impôt total calculé et la base totale. Indicateur pédagogique uniquement: il ne constitue ni un TDFN autorisé ni un taux à appliquer à une activité.';

  document.querySelectorAll('#workArea .calculator-summary > div').forEach((block) => {
    const label = block.querySelector('span');
    if (!label || !/^Taux moyen$/i.test(label.textContent.trim())) return;
    label.textContent = 'Indicateur agrégé';
    block.title = pedagogicalNote;
    block.dataset.v74RateNormalized = 'true';
  });

  document.querySelectorAll('#workArea .average-rate-details').forEach((details) => {
    const summary = details.querySelector(':scope > summary');
    if (summary && /taux moyen/i.test(summary.textContent)) {
      summary.textContent = 'Comprendre l’indicateur agrégé';
    }

    const valueLabel = details.querySelector('.average-rate-details__value span');
    if (valueLabel && /taux moyen/i.test(valueLabel.textContent)) {
      valueLabel.textContent = 'Taux effectif résultant — indicateur pédagogique';
    }

    const paragraphs = details.querySelectorAll('.average-rate-details__body p');
    if (paragraphs[0]) paragraphs[0].textContent = pedagogicalNote;
    if (paragraphs[1]) {
      paragraphs[1].textContent = 'L’impôt reste calculé séparément pour chaque activité avec son TDFN. Ce rapport agrégé sert uniquement à relire le résultat global du ch. 323.';
    }
    details.dataset.v74RateNormalized = 'true';
  });

  document.querySelectorAll('#workArea .compact-tax-summary > span').forEach((label) => {
    if (/^Taux moyen$/i.test(label.textContent.trim())) label.textContent = 'Indicateur agrégé';
  });

  document.querySelectorAll('#workArea .rate-cell [data-computed-rate], #workArea .compact-tax-summary [data-computed-rate]').forEach((value) => {
    value.title = pedagogicalNote;
    value.setAttribute('aria-label', `${value.textContent.trim()} — taux effectif résultant, indicateur pédagogique non autorisé comme TDFN`);
    value.dataset.v74RateNormalized = 'true';
  });
}

function enhanceRectificationResult() {
  if (getPublicCaseId() !== 'R') return;
  const resultArea = document.querySelector('#resultArea');
  const resultCard = resultArea?.querySelector('.result-card');
  if (!resultCard || resultCard.querySelector('.v73-rectification-workflow')) return;

  const actions = resultCard.querySelector('.form-actions');
  const workflow = document.createElement('section');
  workflow.className = 'v73-rectification-workflow';
  workflow.setAttribute('aria-labelledby', 'v73RectificationTitle');
  workflow.innerHTML = `
    <div class="v73-rectification-workflow__head">
      <span>Application pratique</span>
      <h3 id="v73RectificationTitle">Plan d’action pour corriger le S1 2026</h3>
      <p>Lecture pédagogique du cas simplifié, sans autre correction dans la période. Les montants ci-dessous représentent les écarts à réconcilier, pas une reproduction de l’écran de saisie de Décompte TVA pro.</p>
    </div>
    <div class="v73-rectification-values" aria-label="Rubriques affectées dans le cas simplifié">
      <div><small>ch. 200</small><strong>+ CHF 10’810</strong><span>Contre-prestation omise</span></div>
      <div><small>ch. 299 et 379</small><strong>+ CHF 10’810</strong><span>Base imposable et base TDFN</span></div>
      <div class="v75-rectification-value--split"><small>ch. 323</small><strong>Prestations: + CHF 10’810</strong><strong>Impôt: + CHF 670.22</strong><span>Base et dette calculées au TDFN</span></div>
      <div><small>ch. 399</small><strong>+ CHF 670.22</strong><span>Total de l’impôt dû</span></div>
      <div><small>ch. 500</small><strong>+ CHF 670.22</strong><span>Solde supplémentaire, dans ce cas isolé</span></div>
    </div>
    <ol class="v73-rectification-steps">
      <li><strong>Rouvrir la période concernée:</strong> établir le décompte rectificatif du S1 2026 dans le Portail AFC, et non majorer silencieusement le décompte suivant.</li>
      <li><strong>Documenter le delta:</strong> conserver la facture, la cause de l’omission, le rapprochement des rubriques et la preuve de transmission.</li>
      <li><strong>Régler et contrôler les intérêts:</strong> si le paiement intervient après l’échéance, l’intérêt moratoire court jusqu’à la réception du paiement; il n’est en principe pas prélevé lorsque son montant reste inférieur à CHF 100.</li>
      <li><strong>Ne pas confondre les procédures:</strong> la concordance annuelle sert aux erreurs constatées lors de la clôture et ne reprend que les différences par rapport aux décomptes déjà remis.</li>
    </ol>
    <div class="v73-rectification-sources">
      <strong>Vérification officielle</strong>
      <a href="https://www.estv.admin.ch/fr/tva-decompte-de-rectification" target="_blank" rel="noopener noreferrer">Décompte rectificatif</a>
      <a href="https://www.estv.admin.ch/fr/tva-concordance-annuelle" target="_blank" rel="noopener noreferrer">Concordance annuelle</a>
      <a href="https://www.estv.admin.ch/fr/payer-la-tva" target="_blank" rel="noopener noreferrer">Paiement et intérêt moratoire</a>
    </div>
  `;

  if (actions) resultCard.insertBefore(workflow, actions);
  else resultCard.append(workflow);
}

const V8_MODULES = [
  { label: '1 · Fondamentaux TDFN', ids: ['A', 'B', 'C'] },
  { label: '2 · Activités et taux', ids: ['D', 'E', 'F'] },
  { label: '3 · Opérations internationales', ids: ['G', 'H', 'I'] },
  { label: '4 · Admissibilité', ids: ['J'] },
  { label: '5 · Méthode effective → TDFN · ch. 415', ids: ['K0', 'K1', 'K2', 'K3', 'K4', 'K5'] },
  { label: '6 · TDFN → méthode effective · ch. 410', ids: ['L0'] },
  { label: '7 · Rubriques particulières', ids: ['L', 'M', 'N', 'O', 'P', 'R'] },
  { label: '8 · Atelier libre', ids: ['Q'] }
];

function publicIndex(publicId) {
  return CASES.findIndex((item) => getPublicCaseId(item) === publicId);
}

function normalizePublicHash() {
  const publicId = getPublicCaseId();
  if (!publicId) return;
  const expected = `#cas-${publicId}`;
  if (location.hash !== expected) history.replaceState(null, '', expected);
}

const LEGACY_PUBLIC_HASHES = {
  K: 'K0'
};

function restorePublicDeepLink() {
  const match = location.hash.match(/^#cas-([A-Z]+\d*)$/i);
  if (!match) return;
  const requestedId = match[1].toUpperCase();
  const publicId = LEGACY_PUBLIC_HASHES[requestedId] || requestedId;
  const index = publicIndex(publicId);
  const select = document.querySelector('#caseSelect');
  if (!select || index < 0 || Number(select.value) === index) {
    normalizePublicHash();
    return;
  }
  select.value = String(index);
  select.dispatchEvent(new Event('change', { bubbles: true }));
  queueMicrotask(normalizePublicHash);
}

function visualCaseOrder() {
  const ordered = V8_MODULES.flatMap((module) => module.ids.map(publicIndex).filter((index) => index >= 0));
  const extras = CASES.map((_, index) => index).filter((index) => !ordered.includes(index));
  return [...ordered, ...extras];
}

function navigateInVisualOrder(direction) {
  const select = document.querySelector('#caseSelect');
  if (!select) return;
  const order = visualCaseOrder();
  const currentIndex = Number(select.value);
  const position = Math.max(0, order.indexOf(currentIndex));
  const targetPosition = (position + direction + order.length) % order.length;
  select.value = String(order[targetPosition]);
  select.dispatchEvent(new Event('change', { bubbles: true }));
  queueMicrotask(normalizePublicHash);
}



function readStoredProgress() {
  try {
    const raw = JSON.parse(localStorage.getItem('tva_tdfn_v63_state') || 'null');
    return raw && raw.version === 63 ? raw : {};
  } catch {
    return {};
  }
}

function caseStatusLabel(index, stored = readStoredProgress()) {
  if (CASES[index]?.excludeFromProgress) return 'libre';
  if (stored.assisted?.[index]) return 'assisté';
  if (stored.scores?.[index] === 100) return 'maîtrisé';
  if (Number.isFinite(stored.scores?.[index])) return `${stored.scores[index]} %`;
  return '';
}

function currentV8Module() {
  const id = getPublicCaseId();
  return V8_MODULES.find((module) => module.ids.includes(id)) || V8_MODULES.at(-1);
}

function buildSidebarShell() {
  const sidebar = document.querySelector('#sidebar');
  if (!sidebar || sidebar.closest('.v8-navigation-sidebar')) return;

  const wrapper = document.createElement('aside');
  wrapper.className = 'v8-navigation-sidebar';
  wrapper.setAttribute('aria-label', 'Navigation et dossier du parcours');

  const shell = document.createElement('section');
  shell.className = 'v8-path-panel';
  shell.innerHTML = `
    <div class="v8-path-panel__head">
      <div><span>Parcours TDFN</span><strong data-v8-module-label></strong></div>
      <div class="v8-path-progress" aria-label="Progression du module"><span data-v8-progress-text></span><i><b data-v8-progress-bar></b></i></div>
    </div>
    <label class="v81-module-picker" for="v81ModuleSelect"><span>Module</span><select id="v81ModuleSelect" aria-label="Choisir un module"></select></label>
    <div class="v81-current-module" aria-label="Cas du module actuel" data-v81-case-list></div>
    <div class="v8-case-arrows" aria-label="Navigation entre les cas">
      <button type="button" data-v8-previous aria-label="Cas précédent">←</button>
      <span data-v8-position></span>
      <button type="button" data-v8-next aria-label="Cas suivant">→</button>
    </div>
    <button class="v8-view-toggle" type="button" data-v8-mode-toggle hidden></button>
    <details class="v8-tools">
      <summary>Contrôles et sources</summary>
      <div>
        <button type="button" data-v8-open-precheck>Contrôle préalable</button>
        <button type="button" data-v8-open-sources>Sources officielles</button>
        <button type="button" data-action="summary">Bilan du parcours</button>
      </div>
    </details>
  `;

  const actionPanel = document.createElement('section');
  actionPanel.className = 'v8-sidebar-actions';
  actionPanel.innerHTML = `
    <button class="btn primary" type="button" data-v8-primary>Continuer</button>
    <details class="v8-secondary-actions">
      <summary>Autres actions</summary>
      <div>
        <button type="button" data-action="solution">Afficher la solution</button>
        <button type="button" data-action="summary">Bilan du parcours</button>
        <button type="button" class="danger" data-action="reset-case">Réinitialiser ce cas</button>
      </div>
    </details>
  `;

  sidebar.before(wrapper);
  wrapper.append(shell, sidebar, actionPanel);
}

function rebuildV8CasePicker() {
  const actual = document.querySelector('#caseSelect');
  const moduleSelect = document.querySelector('#v81ModuleSelect');
  const caseList = document.querySelector('[data-v81-case-list]');
  if (!actual || !moduleSelect || !caseList) return;
  const currentIndex = Number(actual.value);
  const currentId = getPublicCaseId(CASES[currentIndex]);
  const currentModuleIndex = Math.max(0, V8_MODULES.findIndex((module) => module.ids.includes(currentId)));
  const stored = readStoredProgress();

  moduleSelect.innerHTML = V8_MODULES.map((module, index) => `<option value="${index}" ${index === currentModuleIndex ? 'selected' : ''}>${module.label}</option>`).join('');

  const module = V8_MODULES[currentModuleIndex];
  caseList.innerHTML = module.ids.map((publicId) => {
    const index = publicIndex(publicId);
    if (index < 0) return '';
    const item = CASES[index];
    const status = caseStatusLabel(index, stored);
    const current = index === currentIndex;
    return `<button type="button" class="v81-case-link ${current ? 'is-current' : ''}" data-v81-case-index="${index}" aria-current="${current ? 'step' : 'false'}">
      <span>${item.tab}</span>${status ? `<small>${status}</small>` : ''}
    </button>`;
  }).join('');

  const groups = V8_MODULES.map((group) => {
    const options = group.ids.map((publicId) => {
      const index = publicIndex(publicId);
      if (index < 0) return '';
      const item = CASES[index];
      return `<option value="${index}" ${index === currentIndex ? 'selected' : ''}>${item.tab} — ${item.title}</option>`;
    }).join('');
    return options ? `<optgroup label="${group.label}">${options}</optgroup>` : '';
  }).join('');
  actual.innerHTML = groups;
  actual.value = String(currentIndex);
}

function updateV8Sidebar() {
  buildSidebarShell();
  rebuildV8CasePicker();

  const actual = document.querySelector('#caseSelect');
  const currentIndex = Number(actual?.value);
  const currentCase = Number.isInteger(currentIndex) ? CASES[currentIndex] : null;
  if (!currentCase) return;

  const module = currentV8Module();
  const stored = readStoredProgress();
  const scoredIndexes = module.ids.map(publicIndex).filter((index) => index >= 0 && !CASES[index].excludeFromProgress);
  const mastered = scoredIndexes.filter((index) => stored.scores?.[index] === 100 && !stored.assisted?.[index]).length;
  const total = scoredIndexes.length;

  const moduleLabel = document.querySelector('[data-v8-module-label]');
  const progressText = document.querySelector('[data-v8-progress-text]');
  const progressBar = document.querySelector('[data-v8-progress-bar]');
  const position = document.querySelector('[data-v8-position]');
  if (moduleLabel) moduleLabel.textContent = module.label.replace(/^\d+ · /, '');
  if (progressText) progressText.textContent = total ? `${mastered} / ${total}` : 'atelier';
  if (progressBar) progressBar.style.width = total ? `${mastered / total * 100}%` : '0%';
  if (position) {
    const order = visualCaseOrder();
    position.textContent = `${Math.max(1, order.indexOf(currentIndex) + 1)} / ${order.length}`;
  }

  const modeToggle = document.querySelector('[data-v8-mode-toggle]');
  const switcher = document.querySelector('#modeSwitch');
  const isQuiz = switcher?.classList.contains('hidden');
  const inPortal = switcher?.querySelector('[data-mode="portal"]')?.classList.contains('active');
  if (modeToggle) {
    modeToggle.hidden = Boolean(isQuiz);
    modeToggle.textContent = inPortal ? '← Retour au parcours guidé' : 'Voir le décompte pédagogique';
  }

  const originalPrimary = document.querySelector('#desktopActionBar [data-context-primary]');
  const proxyPrimary = document.querySelector('[data-v8-primary]');
  if (originalPrimary && proxyPrimary) {
    proxyPrimary.textContent = originalPrimary.textContent;
    proxyPrimary.disabled = originalPrimary.disabled;
  }

  const solutionProxy = document.querySelector('.v8-sidebar-actions [data-action="solution"]');
  if (solutionProxy) solutionProxy.hidden = currentCase.type === 'free';
}

function simplifyDossierSidebar() {
  const sidebar = document.querySelector('#sidebar');
  if (!sidebar) return;

  const dataPanel = sidebar.querySelector('.dossier-data');
  if (dataPanel && !dataPanel.dataset.v8Collapsed) {
    const details = document.createElement('details');
    details.className = 'panel v8-dossier-data';
    details.dataset.v8Collapsed = 'true';
    const summary = document.createElement('summary');
    summary.textContent = 'Données du dossier';
    const body = document.createElement('div');
    body.className = 'v8-dossier-data__body';
    const list = dataPanel.querySelector('.data-list');
    if (list) body.append(list);
    details.append(summary, body);
    dataPanel.replaceWith(details);
  }

  const refs = sidebar.querySelector('.dossier-details > summary');
  if (refs) refs.textContent = 'Contrôles et références';
}

function triggerActualCase(index) {
  const actual = document.querySelector('#caseSelect');
  if (!actual || index < 0) return;
  actual.value = String(index);
  actual.dispatchEvent(new Event('change', { bubbles: true }));
  queueMicrotask(normalizePublicHash);
}



function enhanceSummaryOrder() {
  const list = document.querySelector('#resultArea .summary-list');
  if (!list || list.dataset.v81Ordered) return;
  const items = [...list.children];
  const byTab = new Map();
  for (const item of items) {
    const text = item.querySelector('b')?.textContent || '';
    const match = CASES.find((caseItem) => text.startsWith(`${caseItem.tab} —`));
    if (match) byTab.set(getPublicCaseId(match), item);
  }
  for (const index of visualCaseOrder()) {
    const item = byTab.get(getPublicCaseId(CASES[index]));
    if (item) list.append(item);
  }
  list.dataset.v81Ordered = 'true';
}

function updateMethodLimitsContext() {
  const section = document.querySelector('.method-limits');
  if (!section) return;

  const publicId = getPublicCaseId();
  const isFocusCase = publicId === 'J' || publicId === 'K0';
  section.classList.toggle('is-focus', isFocusCase);
  section.classList.toggle('is-compact', !isFocusCase);

  const title = section.querySelector('#methodLimitsTitle');
  if (title) {
    title.dataset.fullTitle ||= title.textContent.trim();
    title.textContent = isFocusCase
      ? title.dataset.fullTitle
      : 'Repères TDFN — deux limites cumulatives';
  }

  const summaryLabel = section.querySelector('.method-limits__details > summary > span:first-child');
  if (summaryLabel) {
    summaryLabel.dataset.fullLabel ||= summaryLabel.textContent.trim();
    summaryLabel.textContent = isFocusCase
      ? summaryLabel.dataset.fullLabel
      : 'Voir les limites, les seuils par taux et les actions à prévoir';
  }

  if (!isFocusCase) {
    const details = section.querySelector('.method-limits__details');
    if (details) details.open = false;
  }
}

function applyEnhancements() {
  enhancementQueued = false;
  updateV8Sidebar();
  updateMethodLimitsContext();
  simplifyDossierSidebar();
  enhancePrecheck();
  enhanceModeSwitch();
  enhanceAfcTerminology();
  normalizeAggregateRateTerminology();
  enhanceResultArea();
  enhanceRectificationResult();
  enhanceTransitionWorksheet();
  enhanceTransitionResult();
  enhanceSummaryOrder();
  enhanceActionBars();
  normalizePublicHash();
}

function queueEnhancements() {
  if (enhancementQueued) return;
  enhancementQueued = true;
  requestAnimationFrame(applyEnhancements);
}

document.addEventListener('click', (event) => {
  const directCase = event.target.closest?.('[data-v81-case-index]');
  if (directCase) {
    event.preventDefault();
    triggerActualCase(Number(directCase.dataset.v81CaseIndex));
    return;
  }

  const actionTarget = event.target.closest?.('[data-action]');
  if (actionTarget?.dataset.action === 'validate' && TRANSITION_WORKSHEETS[getPublicCaseId()]) {
    const valid = validateTransitionWorksheet();
    if (!valid) {
      event.preventDefault();
      event.stopImmediatePropagation();
      document.querySelector('[data-v81-transition-sheet]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
  }
  if (actionTarget?.dataset.action === 'solution' && TRANSITION_WORKSHEETS[getPublicCaseId()]) {
    fillTransitionWorksheetSolution();
  }
  const resetBypass = actionTarget?.dataset.v81ResetBypass === 'true';
  if (resetBypass) {
    delete actionTarget.dataset.v81ResetBypass;
  } else if (actionTarget?.dataset.action === 'reset-case' && TRANSITION_WORKSHEETS[getPublicCaseId()]) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (!window.confirm('Réinitialiser les réponses, le tableau de transition et le statut de ce cas?')) return;
    clearTransitionWorksheet();
    const originalConfirm = window.confirm;
    actionTarget.dataset.v81ResetBypass = 'true';
    window.confirm = () => true;
    try { actionTarget.click(); } finally { window.confirm = originalConfirm; }
    return;
  }
  if (actionTarget?.dataset.action === 'restart-no-help' && TRANSITION_WORKSHEETS[getPublicCaseId()]) {
    clearTransitionWorksheet();
  }
  if (!resetBypass && actionTarget?.dataset.action === 'reset-all') {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (!window.confirm('Effacer toute la progression, y compris les tableaux de transition?')) return;
    localStorage.removeItem(TRANSITION_WORKSHEET_KEY);
    const originalConfirm = window.confirm;
    actionTarget.dataset.v81ResetBypass = 'true';
    window.confirm = () => true;
    try { actionTarget.click(); } finally { window.confirm = originalConfirm; }
    return;
  }
  const v8Previous = event.target.closest?.('[data-v8-previous]');
  const v8Next = event.target.closest?.('[data-v8-next]');
  if (v8Previous || v8Next) {
    event.preventDefault();
    navigateInVisualOrder(v8Next ? 1 : -1);
    return;
  }

  const v8Primary = event.target.closest?.('[data-v8-primary]');
  if (v8Primary) {
    event.preventDefault();
    document.querySelector('#desktopActionBar [data-context-primary]')?.click();
    return;
  }

  const v8Mode = event.target.closest?.('[data-v8-mode-toggle]');
  if (v8Mode) {
    event.preventDefault();
    const switcher = document.querySelector('#modeSwitch');
    const inPortal = switcher?.querySelector('[data-mode="portal"]')?.classList.contains('active');
    switcher?.querySelector(`[data-mode="${inPortal ? 'guided' : 'portal'}"]`)?.click();
    return;
  }

  if (event.target.closest?.('[data-v8-open-precheck]')) {
    event.preventDefault();
    document.querySelector('[data-action="open-precheck"]')?.click();
    return;
  }

  if (event.target.closest?.('[data-v8-open-sources]')) {
    event.preventDefault();
    document.querySelector('#openSources')?.click();
    return;
  }

  const navigationButton = event.target.closest?.('button[data-action="next"], button[data-action="previous"]');
  if (navigationButton) {
    event.preventDefault();
    event.stopImmediatePropagation();
    navigateInVisualOrder(navigationButton.dataset.action === 'next' ? 1 : -1);
    return;
  }

  const bulkToggle = event.target.closest?.('[data-v73-precheck-all]');
  if (bulkToggle) {
    event.preventDefault();
    toggleAllPrechecks(bulkToggle.dataset.v73PrecheckAll === 'open');
    return;
  }

  const toggle = event.target.closest?.('[data-v73-precheck-toggle]');
  if (toggle) {
    event.preventDefault();
    togglePrecheckPanel(toggle.dataset.v73PrecheckToggle);
    return;
  }

  const portalTrigger = event.target.closest?.('[data-v72-open-portal]');
  if (portalTrigger) {
    event.preventDefault();
    switchToPortalView();
    return;
  }

  queueEnhancements();
}, true);

document.addEventListener('input', (event) => {
  const field = event.target.closest?.('[data-v81-field]');
  if (!field) return;
  const publicId = getPublicCaseId();
  const current = collectTransitionWorksheet(publicId);
  if (current) {
    current.validated = false;
    current.correct = false;
    saveTransitionWorksheetState(publicId, current);
    document.querySelector('[data-v81-feedback]')?.classList.remove('is-correct', 'is-wrong');
    const feedback = document.querySelector('[data-v81-feedback]');
    if (feedback) feedback.textContent = 'Modifications non contrôlées · utilisez le bouton principal pour vérifier.';
  }
}, true);

document.addEventListener('change', (event) => {
  const worksheetField = event.target.closest?.('[data-v81-field]');
  if (worksheetField) {
    const publicId = getPublicCaseId();
    const current = collectTransitionWorksheet(publicId);
    if (current) {
      current.validated = false;
      current.correct = false;
      saveTransitionWorksheetState(publicId, current);
      const feedback = document.querySelector('[data-v81-feedback]');
      feedback?.classList.remove('is-correct', 'is-wrong');
      if (feedback) feedback.textContent = 'Modifications non contrôlées · utilisez le bouton principal pour vérifier.';
    }
  }
  if (event.target.matches?.('#v81ModuleSelect')) {
    const module = V8_MODULES[Number(event.target.value)];
    const index = module?.ids.map(publicIndex).find((value) => value >= 0);
    if (Number.isInteger(index)) triggerActualCase(index);
    return;
  }
  const checkbox = event.target.closest?.('[data-precheck]');
  if (checkbox) pendingPrecheckFocusKey = checkbox.dataset.precheck;
  if (event.target.matches?.('#caseSelect')) queueMicrotask(normalizePublicHash);
  queueEnhancements();
}, true);

document.addEventListener('DOMContentLoaded', () => {
  restorePublicDeepLink();
  applyEnhancements();
});
