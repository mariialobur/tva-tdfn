import { CASES, OFFICIAL_SOURCES } from './data.js?v=6.3.0';

/*
 * Compléments pédagogiques et UX — correctif 7.2 du 03.08.2026.
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
  limitsCase.description = 'Les deux limites quantitatives doivent être respectées simultanément; en cas de dépassement, il faut distinguer l’admissibilité initiale du maintien d’une méthode déjà autorisée.';
  limitsCase.checks = [
    'CA imposable annuel TVA comprise ≤ CHF 5’024’000.',
    'Impôt annuel calculé avec les TDFN ≤ CHF 108’000.',
    'Identifier s’il s’agit de la première, de la deuxième ou de la troisième période fiscale consécutive de dépassement.',
    'Contrôler aussi les exclusions de l’art. 77 OTVA.'
  ];
  const extraQuestions = [
    {
      q: 'Une entreprise déjà autorisée dépasse l’une des limites pendant une seule période fiscale. Quelle conclusion est correcte?',
      options: [
        'Le passage immédiat à la méthode effective est toujours obligatoire',
        'Le dépassement doit être documenté et suivi; une seule période isolée ne déclenche pas à elle seule le passage obligatoire prévu à l’art. 81, al. 3, OTVA',
        'Le dépassement n’a jamais de conséquence et ne doit pas être conservé au dossier'
      ],
      answer: 1,
      why: 'Depuis le 1er janvier 2025, l’art. 81, al. 3, OTVA prévoit le passage obligatoire lorsque l’une ou les deux limites ont été dépassées durant trois périodes fiscales consécutives.'
    },
    {
      q: 'L’une des limites est dépassée pour la troisième période fiscale consécutive. Quelle est la conséquence?',
      options: [
        'Passage obligatoire à la méthode effective au début de la période fiscale suivante',
        'Attendre encore une quatrième période de dépassement avant d’agir',
        'Réduire le taux légal indiqué sur les factures clients'
      ],
      answer: 0,
      why: 'L’art. 81, al. 3, OTVA impose le passage à la méthode effective au début de la période fiscale qui suit les trois périodes fiscales consécutives de dépassement.'
    }
  ];
  for (const question of extraQuestions) {
    if (!limitsCase.questions.some((item) => item.q === question.q)) limitsCase.questions.push(question);
  }
  limitsCase.lesson = 'Contrôler les deux limites chaque année, documenter tout dépassement et compter les périodes fiscales consécutives; après la troisième, le passage à la méthode effective intervient au début de la période suivante.';
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
    'Contrôler le paiement complémentaire, l’intérêt moratoire éventuel et la piste d’audit.'
  ],
  legal: 'Art. 72 LTVA · décompte rectificatif de la période concernée · concordance annuelle TVA',
  sourceIds: ['rectification', 'annual-concordance', 'online', 'ltva'],
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
        'Vérifier un éventuel intérêt moratoire calculé depuis l’échéance concernée',
        'Appliquer soi-même une pénalité forfaitaire de 10 %'
      ],
      answer: 1,
      why: 'Un intérêt moratoire peut être dû. L’AFC indique qu’il n’est en principe pas perçu lorsque son montant reste inférieur à CHF 100.'
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
    title: 'Activités et TDFN concordants avec la confirmation ou le profil AFC',
    verify: 'Comparer chaque activité réellement exercée avec les libellés et TDFN confirmés. Regrouper les activités au même TDFN et analyser toute nouvelle activité.',
    documents: 'Confirmation AFC, ventilation des comptes de produits, contrats, factures et descriptifs de prestations.',
    alert: 'Le taux ne se choisit pas par simple ressemblance avec une profession voisine.'
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

const openPrechecks = new Set();
let pendingPrecheckFocusKey = null;
let enhancementQueued = false;

function enhancePrecheck() {
  const content = document.querySelector('#precheckContent');
  const list = content?.querySelector('.precheck-list');
  if (!list || list.dataset.v72Enhanced === 'true') return;

  list.dataset.v72Enhanced = 'true';
  const originalItems = [...list.querySelectorAll('.precheck-item')];

  for (const original of originalItems) {
    const input = original.querySelector('[data-precheck]');
    if (!input) continue;
    const key = input.dataset.precheck;
    const detail = PRECHECK_DETAILS[key];
    if (!detail) continue;

    const number = original.querySelector('b')?.textContent?.trim() || '';
    const inputId = `precheck-${key}`;
    const panelId = `precheck-panel-${key}`;
    input.id = inputId;

    const wrapper = document.createElement('div');
    wrapper.className = 'precheck-accordion';
    wrapper.dataset.precheckPanel = key;

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
    label.append(title);

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'precheck-accordion__toggle';
    toggle.dataset.v72PrecheckToggle = key;
    toggle.setAttribute('aria-controls', panelId);
    toggle.setAttribute('aria-expanded', String(openPrechecks.has(key)));
    toggle.textContent = openPrechecks.has(key) ? 'Masquer' : 'Détails';

    const body = document.createElement('div');
    body.className = 'precheck-accordion__body';
    body.id = panelId;
    body.hidden = !openPrechecks.has(key);
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

function togglePrecheckPanel(key) {
  const panel = document.querySelector(`[data-precheck-panel="${key}"]`);
  const body = panel?.querySelector('.precheck-accordion__body');
  const button = panel?.querySelector('[data-v72-precheck-toggle]');
  if (!panel || !body || !button) return;

  const willOpen = body.hidden;
  body.hidden = !willOpen;
  button.setAttribute('aria-expanded', String(willOpen));
  button.textContent = willOpen ? 'Masquer' : 'Détails';
  if (willOpen) openPrechecks.add(key);
  else openPrechecks.delete(key);
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
        button.textContent = id === 'mobileActionBar' ? 'Vue AFC' : 'Voir la vue pédagogique AFC';
        button.setAttribute('aria-label', 'Voir la vue pédagogique non officielle inspirée du prototype AFC');
        bar.insertBefore(button, bar.firstElementChild);
      }
      button.hidden = false;
    } else if (button) {
      button.hidden = true;
    }
  }
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
  enhanceResultArea();
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

  const toggle = event.target.closest?.('[data-v72-precheck-toggle]');
  if (toggle) {
    event.preventDefault();
    togglePrecheckPanel(toggle.dataset.v72PrecheckToggle);
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
});
