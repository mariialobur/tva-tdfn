import { CASES, OFFICIAL_SOURCES } from './data.js?v=6.3.0';

/*
 * Compléments pédagogiques et UX — correctif 7.4 du 03.08.2026.
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
   * L’interface et l’URL présentent ce nouveau cas comme le cas R. */
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

const PRECHECK_DETAILS = {
  authorization: {
    title: 'Méthode TDFN autorisée par l’AFC pour la période concernée',
    verify: 'Contrôler que l’entreprise dispose d’une confirmation écrite ou d’un profil AFC indiquant la méthode TDFN et sa date d’effet.',
    documents: 'Confirmation AFC, profil de décompte dans le Portail AFC et correspondance relative à un changement de méthode.',
    alert: 'Une préférence interne ou un calcul plus favorable ne remplace jamais l’autorisation de l’AFC.'
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
  K: ['special'],
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
      <div><small>ch. 323 et 399</small><strong>+ CHF 670.22</strong><span>Dette TDFN supplémentaire</span></div>
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

function normalizeRectificationHash() {
  const select = document.querySelector('#caseSelect');
  const rectIndex = CASES.findIndex((item) => item.publicId === 'R');
  if (!select || rectIndex < 0) return;
  if (Number(select.value) === rectIndex && location.hash !== '#cas-R') {
    history.replaceState(null, '', '#cas-R');
  }
}

function restoreRectificationDeepLink() {
  if (!/^#cas-(?:R|OP)$/i.test(location.hash)) return;
  const select = document.querySelector('#caseSelect');
  const rectIndex = CASES.findIndex((item) => item.publicId === 'R');
  if (!select || rectIndex < 0 || Number(select.value) === rectIndex) {
    normalizeRectificationHash();
    return;
  }
  select.value = String(rectIndex);
  select.dispatchEvent(new Event('change', { bubbles: true }));
  queueMicrotask(normalizeRectificationHash);
}

function visualCaseOrder() {
  const rectIndex = CASES.findIndex((item) => item.publicId === 'R');
  const freeIndex = CASES.findIndex((item) => item.type === 'free');
  const order = CASES.map((_, index) => index).filter((index) => index !== rectIndex && index !== freeIndex);
  if (rectIndex >= 0) order.push(rectIndex);
  if (freeIndex >= 0) order.push(freeIndex);
  return order;
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
  queueMicrotask(normalizeRectificationHash);
}

function applyEnhancements() {
  enhancementQueued = false;
  enhancePrecheck();
  enhanceModeSwitch();
  enhanceAfcTerminology();
  normalizeAggregateRateTerminology();
  enhanceResultArea();
  enhanceRectificationResult();
  enhanceActionBars();
  normalizeRectificationHash();
}

function queueEnhancements() {
  if (enhancementQueued) return;
  enhancementQueued = true;
  requestAnimationFrame(applyEnhancements);
}

document.addEventListener('click', (event) => {
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

document.addEventListener('change', (event) => {
  const checkbox = event.target.closest?.('[data-precheck]');
  if (checkbox) pendingPrecheckFocusKey = checkbox.dataset.precheck;
  if (event.target.matches?.('#caseSelect')) queueMicrotask(normalizeRectificationHash);
  queueEnhancements();
}, true);

document.addEventListener('DOMContentLoaded', () => {
  applyEnhancements();
  restoreRectificationDeepLink();

  const precheckTarget = document.querySelector('#precheckContent');
  if (precheckTarget) {
    new MutationObserver(queueEnhancements).observe(precheckTarget, { childList: true, subtree: true });
  }

  const resultArea = document.querySelector('#resultArea');
  if (resultArea) {
    new MutationObserver(queueEnhancements).observe(resultArea, { childList: true, subtree: true });
  }

  const stepperSlot = document.querySelector('#stepperSlot');
  if (stepperSlot) {
    new MutationObserver(queueEnhancements).observe(stepperSlot, { childList: true, subtree: true });
  }

  const workArea = document.querySelector('#workArea');
  if (workArea) {
    new MutationObserver(queueEnhancements).observe(workArea, { childList: true, subtree: true });
  }
});
