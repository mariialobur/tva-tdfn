import { CASES } from './data.js';
import { state, publicCaseId } from './store.js';

const EXAM_SIZE = 12;
const PASS_SCORE = 9;
const PROJECT_URL = 'https://mariialobur.github.io/tva-tdfn/';
const STORAGE_KEY = 'tva_tdfn_final_evaluation_v3_audited';

const COURSE_THEMES = [
  {
    title: "1. Fondamentaux de la méthode TDFN",
    items: [
      "Admissibilité à la méthode et contrôle des limites applicables",
      "Distinction entre taux légal facturé au client et TDFN utilisé dans le décompte",
      "Calcul sur les contre-prestations brutes, TVA comprise",
      "Traitement forfaitaire de l’impôt préalable dans la méthode TDFN"
    ]
  },
  {
    title: "2. Activités multiples et attribution des TDFN",
    items: [
      "Identification et ventilation de plusieurs activités au sein d’une même entreprise",
      "Application de plusieurs TDFN et contrôle de la règle des 10 %",
      "Choix du TDFN selon l’activité réellement exercée",
      "Réconciliation des comptes de produits avec les bases déclarées"
    ]
  },
  {
    title: "3. Construction et lecture du décompte TVA",
    items: [
      "Report du chiffre d’affaires et des contre-prestations dans les rubriques du décompte",
      "Ventilation des bases soumises aux différents TDFN",
      "Déductions et rubriques particulières du décompte",
      "Contrôles arithmétiques et contrôles de cohérence"
    ]
  },
  {
    title: "4. Opérations particulières et internationales",
    items: [
      "Prestations exonérées et prestations fournies à l’étranger",
      "Impôt sur les acquisitions et opérations avec des prestataires étrangers",
      "Qualification des flux avant leur traitement dans le décompte",
      "Distinction entre chiffre d’affaires, déductions et opérations à déclarer séparément"
    ]
  },
  {
    title: "5. Travail courant en fiduciaire",
    items: [
      "Contre-prestations convenues et contre-prestations reçues",
      "Périodes de décompte, délais et suivi administratif",
      "Acomptes, paiements et contrôles de dossier",
      "Lecture des informations du client et préparation du décompte"
    ]
  },
  {
    title: "6. Rectifications et concordance annuelle",
    items: [
      "Correction d’un décompte déjà remis",
      "Décompte de rectification et traitement des écarts",
      "Concordance annuelle et contrôle final de la période fiscale",
      "Identification des incohérences avant remise ou correction"
    ]
  },
  {
    title: "7. Changements de méthode",
    items: [
      "Passage de la méthode effective à la méthode TDFN",
      "Passage de la méthode TDFN à la méthode effective",
      "Corrections liées à la valeur résiduelle lors du changement",
      "Utilisation des rubriques 415 et 410 selon le sens du changement"
    ]
  },
  {
    title: "8. Mise en pratique sur des dossiers PME",
    items: [
      "Cas progressifs dans plusieurs secteurs d’activité",
      "Dossiers multi-activités avec plusieurs taux et plusieurs flux",
      "Dossier fiduciaire final combinant analyse, calcul et décompte",
      "Atelier libre pour tester un scénario de manière autonome"
    ]
  }
];


const QUESTION_BANK = [
  {
    id: 'gross-base',
    q: "Sur quelle base la dette fiscale TDFN est-elle calculée pour une prestation imposable?",
    options: ["Le chiffre d’affaires brut, TVA comprise", "Le chiffre d’affaires hors TVA", "Le bénéfice net", "L’impôt préalable"],
    answer: 0,
    why: "La méthode TDFN applique le taux autorisé aux contre-prestations brutes, TVA comprise.",
    sourceLabel: "AFC — TDFN et taux forfaitaires",
    sourceUrl: "https://www.estv.admin.ch/fr/tva-taux-de-la-dette-fiscale-nette-et-taux-forfaitaires"
  },
  {
    id: 'invoice-rate',
    q: "Une entreprise décompte au TDFN de 6,2 %. Quel taux indique-t-elle sur une facture suisse soumise au taux normal?",
    options: ["6,2 %", "8,1 %", "2,6 %", "Aucun taux"],
    answer: 1,
    why: "Le TDFN sert au calcul avec l’AFC; la facture au client reste soumise au taux légal applicable.",
    sourceLabel: "AFC — TDFN et taux forfaitaires",
    sourceUrl: "https://www.estv.admin.ch/fr/tva-taux-de-la-dette-fiscale-nette-et-taux-forfaitaires"
  },
  {
    id: 'input-tax',
    q: "Dans le calcul courant selon la méthode TDFN, comment l’impôt préalable est-il traité?",
    options: ["Il est pris en compte forfaitairement par le TDFN et n’est en principe pas déduit séparément", "Il est toujours déduit facture par facture", "Il est ajouté au chiffre d’affaires", "Il n’existe plus juridiquement"],
    answer: 0,
    why: "La simplification TDFN intègre forfaitairement l’impôt préalable dans la valeur du taux.",
    sourceLabel: "AFC — TDFN et taux forfaitaires",
    sourceUrl: "https://www.estv.admin.ch/fr/tva-taux-de-la-dette-fiscale-nette-et-taux-forfaitaires"
  },
  {
    id: 'limits',
    q: "Quelles sont les deux limites quantitatives générales de la méthode TDFN?",
    options: ["CA imposable annuel TTC ≤ CHF 5’024’000 et impôt calculé avec les TDFN ≤ CHF 108’000", "CA HT ≤ CHF 5’005’000 et impôt préalable ≤ CHF 108’000", "CA ≤ CHF 100’000 uniquement", "Aucune limite"],
    answer: 0,
    why: "Les deux limites doivent être respectées; elles ne remplacent pas les autres conditions d’admissibilité.",
    sourceLabel: "AFC — TDFN et taux forfaitaires",
    sourceUrl: "https://www.estv.admin.ch/fr/tva-taux-de-la-dette-fiscale-nette-et-taux-forfaitaires"
  },
  {
    id: 'exact-ten',
    q: "Une activité représente exactement 10,0 % du chiffre d’affaires total provenant de prestations imposables. Le seuil «supérieur à 10 %» est-il franchi?",
    options: ["Non", "Oui", "Oui seulement au taux normal", "Oui si l’entreprise est une SA"],
    answer: 0,
    why: "L’art. 86 OTVA exige une part supérieure à 10 %, pas égale à 10 %.",
    sourceLabel: "OTVA — art. 86",
    sourceUrl: "https://www.fedlex.admin.ch/eli/cc/2009/828/fr"
  },
  {
    id: 'new-activity',
    q: "Comment apprécie-t-on le seuil de 10 % pour un nouvel assujetti ou le début d’une nouvelle activité?",
    options: ["Sur les chiffres d’affaires escomptés des douze premiers mois", "Sur les trois années antérieures", "Sur un seul mois", "Sur le bénéfice prévu"],
    answer: 0,
    why: "Art. 86, al. 2, let. a, OTVA: l’appréciation est prospective sur les douze premiers mois.",
    sourceLabel: "OTVA — art. 86",
    sourceUrl: "https://www.fedlex.admin.ch/eli/cc/2009/828/fr"
  },
  {
    id: 'existing-three-periods',
    q: "Pour un assujetti déjà établi, quand la limite de 10 % est-elle considérée comme dépassée pour une activité selon l’art. 86 OTVA?",
    options: ["Si la part est >10 % dans chacune des trois périodes fiscales précédentes", "Dès qu’elle dépasse 10 % une seule fois", "Après deux mois consécutifs", "Uniquement si elle atteint 50 %"],
    answer: 0,
    why: "Pour les autres assujettis, l’art. 86, al. 2, let. b, OTVA se fonde sur les trois périodes fiscales précédentes et exige >10 % dans chacune.",
    sourceLabel: "OTVA — art. 86",
    sourceUrl: "https://www.fedlex.admin.ch/eli/cc/2009/828/fr"
  },
  {
    id: 'same-rate-group',
    q: "Deux activités distinctes relèvent du même TDFN. Comment sont-elles traitées pour vérifier le seuil de 10 %?",
    options: ["Leurs chiffres d’affaires sont additionnés", "Elles sont toujours testées séparément", "On retient uniquement la plus grande", "Elles sont exclues du calcul"],
    answer: 0,
    why: "Art. 86, al. 3, OTVA: les chiffres d’affaires des activités soumises au même TDFN sont additionnés.",
    sourceLabel: "OTVA — art. 86",
    sourceUrl: "https://www.fedlex.admin.ch/eli/cc/2009/828/fr"
  },
  {
    id: 'more-than-two',
    q: "Depuis 2025, plus de deux TDFN peuvent-ils être autorisés pour une même entreprise?",
    options: ["Oui, si les activités déterminantes remplissent les conditions", "Non, jamais plus de deux", "Seulement pour les collectivités publiques", "Seulement pendant un an"],
    answer: 0,
    why: "La limitation générale à deux TDFN a été supprimée avec la réforme entrée en vigueur en 2025.",
    sourceLabel: "AFC — modifications TDFN dès 2025",
    sourceUrl: "https://www.estv.admin.ch/fr/tva-methode-des-taux-de-la-dette-fiscale-nette-2025"
  },
  {
    id: 'unauthorized-activity-rate',
    q: "Une activité a son propre TDFN dans l’ordonnance, mais ce TDFN n’a pas été autorisé pour l’entreprise. Son chiffre d’affaires est-il ignoré?",
    options: ["Non; l’art. 88 OTVA détermine le TDFN autorisé à utiliser", "Oui, il est hors champ", "Oui, s’il reste sous 10 %", "Il est toujours imposé au taux légal de 8,1 % dans le calcul TDFN"],
    answer: 0,
    why: "Art. 88, al. 2, OTVA règle le traitement des activités dont le TDFN propre n’a pas été autorisé.",
    sourceLabel: "OTVA — art. 88",
    sourceUrl: "https://www.fedlex.admin.ch/eli/cc/2009/828/fr"
  },
  {
    id: 'art88-direction',
    q: "Selon l’art. 88, al. 2, OTVA, quel TDFN autorisé utilise-t-on en principe si le TDFN propre d’une activité n’a pas été autorisé?",
    options: ["Le taux autorisé immédiatement supérieur; s’il n’existe aucun taux supérieur autorisé, le taux immédiatement inférieur", "Toujours le taux le plus bas", "Toujours le taux légal de la facture", "Le taux moyen de l’entreprise"],
    answer: 0,
    why: "C’est la règle explicite de l’art. 88, al. 2, OTVA.",
    sourceLabel: "OTVA — art. 88",
    sourceUrl: "https://www.fedlex.admin.ch/eli/cc/2009/828/fr"
  },
  {
    id: 'rates-source',
    q: "Quelle source doit être contrôlée en priorité pour la valeur exacte d’un TDFN par branche ou activité dès 2025?",
    options: ["L’ordonnance AFC RS 641.202.62 publiée sur Fedlex", "Un taux moyen calculé dans la comptabilité", "Une ancienne brochure commerciale", "Le taux légal de 8,1 %"],
    answer: 0,
    why: "La valeur exacte des TDFN par activité est fixée dans l’ordonnance AFC RS 641.202.62.",
    sourceLabel: "Fedlex — RS 641.202.62",
    sourceUrl: "https://www.fedlex.admin.ch/eli/cc/2024/500/fr"
  },
  {
    id: 'sport-rental',
    q: "Dans l’ordonnance AFC RS 641.202.62, quel TDFN est indiqué pour la location d’articles de sport?",
    options: ["3,7 %", "3,0 %", "4,5 %", "5,3 %"],
    answer: 0,
    why: "La liste normative indique 3,7 % pour «Sport, articles de –: location».",
    sourceLabel: "Fedlex — RS 641.202.62",
    sourceUrl: "https://www.fedlex.admin.ch/eli/cc/2024/500/fr"
  },
  {
    id: 'sport-service',
    q: "Dans l’ordonnance AFC RS 641.202.62, quel TDFN est indiqué pour les travaux de réparation / service sur articles de sport, notamment skis et snowboards?",
    options: ["4,5 %", "5,3 %", "3,7 %", "2,1 %"],
    answer: 0,
    why: "La liste normative indique 4,5 % pour les travaux de réparation/service sur articles de sport et pour le service sur skis/snowboards.",
    sourceLabel: "Fedlex — RS 641.202.62",
    sourceUrl: "https://www.fedlex.admin.ch/eli/cc/2024/500/fr"
  },
  {
    id: 'effective-to-tdfn',
    q: "Lors d’un passage de la méthode effective aux TDFN dès 2025, où est déclarée la correction sur la valeur résiduelle concernée?",
    options: ["Au ch. 415 du dernier décompte selon la méthode effective", "Au ch. 410 du premier décompte TDFN", "Au ch. 200", "Nulle dans tous les cas"],
    answer: 0,
    why: "La correction est effectuée avant le changement et portée au ch. 415 du dernier décompte effectif.",
    sourceLabel: "AFC — changements de méthode TDFN",
    sourceUrl: "https://www.estv.admin.ch/fr/tva-taux-de-la-dette-fiscale-nette-et-taux-forfaitaires"
  },
  {
    id: 'tdfn-to-effective',
    q: "Lors d’un passage des TDFN à la méthode effective, où peut être revendiqué le dégrèvement sur la valeur résiduelle admissible?",
    options: ["Au ch. 410 du premier décompte selon la méthode effective", "Au ch. 415 du dernier décompte TDFN", "Au ch. 220", "Dans l’impôt direct"],
    answer: 0,
    why: "Le dégrèvement admissible est porté après le changement, au ch. 410 du premier décompte effectif.",
    sourceLabel: "AFC — changements de méthode TDFN",
    sourceUrl: "https://www.estv.admin.ch/fr/tva-taux-de-la-dette-fiscale-nette-et-taux-forfaitaires"
  },
  {
    id: 'residual-movable',
    q: "Pour calculer la valeur résiduelle TVA d’un bien mobilier, quelle réduction linéaire prévoit l’art. 31, al. 3, LTVA?",
    options: ["1/5 par année écoulée", "1/5 par semestre", "1/20 par année", "Aucune réduction"],
    answer: 0,
    why: "L’art. 31, al. 3, LTVA prévoit une réduction d’un cinquième par année écoulée pour les biens mobiliers et les prestations de services.",
    sourceLabel: "LTVA — art. 31",
    sourceUrl: "https://www.fedlex.admin.ch/eli/cc/2009/615/fr"
  },
  {
    id: 'residual-immovable',
    q: "Pour un bien immobilier, quelle réduction linéaire de la valeur résiduelle TVA est prévue?",
    options: ["1/20 par année écoulée", "1/5 par année écoulée", "1/20 par semestre", "10 % par trimestre"],
    answer: 0,
    why: "Pour les biens immobiliers, la réduction linéaire est d’un vingtième par année écoulée.",
    sourceLabel: "LTVA — art. 31",
    sourceUrl: "https://www.fedlex.admin.ch/eli/cc/2009/615/fr"
  },
  {
    id: 'option-tdfn',
    q: "Sous TDFN, quelles prestations sont visées par l’interdiction spécifique d’option de l’art. 77, al. 3, OTVA?",
    options: ["Art. 21, al. 2, ch. 1 à 24 et 27 à 31 LTVA", "Uniquement ch. 25 et 26", "Toutes les prestations sans exception", "Aucune"],
    answer: 0,
    why: "Le texte actuel de l’art. 77, al. 3, OTVA vise les ch. 1 à 24 et 27 à 31.",
    sourceLabel: "OTVA — art. 77",
    sourceUrl: "https://www.fedlex.admin.ch/eli/cc/2009/828/fr"
  },
  {
    id: 'subsidy',
    q: "Une collectivité publique indique expressément au bénéficiaire que les fonds versés constituent une subvention ou une autre contribution de droit public. Quelle règle la LTVA prévoit-elle?",
    options: ["Ces fonds sont réputés subvention / contribution de droit public au sens de l’art. 18 LTVA", "Ils sont automatiquement un chiffre d’affaires au taux normal", "Ils sont toujours un prêt", "Ils doivent toujours être ajoutés au ch. 200"],
    answer: 0,
    why: "L’art. 18, al. 3, LTVA prévoit expressément cette qualification lorsque la collectivité publique l’indique au destinataire.",
    sourceLabel: "LTVA — art. 18",
    sourceUrl: "https://www.fedlex.admin.ch/eli/cc/2009/615/fr"
  },
  {
    id: 'periodicity',
    q: "Quelle est la périodicité ordinaire du décompte lorsque la méthode TDFN est appliquée?",
    options: ["Semestrielle", "Trimestrielle", "Mensuelle", "Tous les deux ans"],
    answer: 0,
    why: "La LTVA prévoit le décompte semestriel pour la méthode TDFN.",
    sourceLabel: "LTVA — périodicité du décompte",
    sourceUrl: "https://www.fedlex.admin.ch/eli/cc/2009/615/fr"
  },
  {
    id: 'deadline',
    q: "Dans quel délai le décompte TVA doit-il en principe être remis et la créance fiscale payée après la fin de la période de décompte?",
    options: ["60 jours", "30 jours", "90 jours", "180 jours"],
    answer: 0,
    why: "L’AFC rappelle un délai ordinaire de 60 jours pour la remise et le paiement.",
    sourceLabel: "AFC — Payer la TVA",
    sourceUrl: "https://www.estv.admin.ch/fr/payer-la-tva"
  },
  {
    id: 'rectification',
    q: "Une erreur isolée est découverte après la remise d’un décompte semestriel. Quelle procédure correspond à la correction de cette période précise?",
    options: ["Le décompte rectificatif de la période concernée", "Ajouter silencieusement l’opération au semestre suivant", "Attendre obligatoirement cinq ans", "Modifier uniquement la comptabilité sans informer l’AFC"],
    answer: 0,
    why: "L’AFC distingue le rectificatif d’une période précise de la concordance annuelle.",
    sourceLabel: "AFC — Concordance annuelle / rectification",
    sourceUrl: "https://www.estv.admin.ch/fr/tva-concordance-annuelle"
  },
  {
    id: 'concordance',
    q: "Si aucun décompte rectificatif de concordance annuelle ne parvient à l’AFC dans les 240 jours suivant la fin de l’exercice, quelle présomption pratique l’AFC applique-t-elle?",
    options: ["Les décomptes remis sont considérés complets et corrects et la période fiscale est finalisée", "La société est automatiquement radiée", "Aucune conséquence", "Le TDFN est automatiquement révoqué"],
    answer: 0,
    why: "C’est la règle expliquée par l’AFC pour la concordance annuelle selon l’art. 72 LTVA.",
    sourceLabel: "AFC — Concordance annuelle TVA",
    sourceUrl: "https://www.estv.admin.ch/fr/tva-concordance-annuelle"
  },
  {
    id: 'calc-ttc',
    q: "CHF 50’000 TVA comprise sont soumis à un TDFN de 3,7 %. Quelle dette fiscale résulte du calcul?",
    options: ["CHF 1’850", "CHF 1’350", "CHF 3’700", "CHF 4’050"],
    answer: 0,
    why: "CHF 50’000 × 3,7 % = CHF 1’850.",
    sourceLabel: "AFC — principe de calcul TDFN sur le brut TTC",
    sourceUrl: "https://www.estv.admin.ch/fr/tva-taux-de-la-dette-fiscale-nette-et-taux-forfaitaires"
  }
];

let exam = null;
let lastResult = loadLastResult();

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function shuffle(items) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function loadLastResult() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch { return null; }
}

function saveLastResult(result) {
  const previous = loadLastResult();
  const keepPrevious = previous?.passed && (!result.passed || Number(previous.score) > Number(result.score));
  lastResult = keepPrevious ? previous : result;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(lastResult)); } catch {}
  return keepPrevious;
}

function scoredCases() {
  return CASES.filter(c => !c.excludeFromProgress);
}

function completedCaseCount() {
  return acquiredCaseCount();
}

function acquiredCaseCount() {
  return scoredCases().filter(c => state.scores?.[publicCaseId(c)] === 100 && !state.assisted?.[publicCaseId(c)]).length;
}

function buildExam() {
  const chosen = shuffle(QUESTION_BANK).slice(0, EXAM_SIZE).map(item => {
    const indexed = item.options.map((label, index) => ({ label, correct: index === item.answer }));
    return { ...item, shuffledOptions: shuffle(indexed) };
  });
  return { questions: chosen, answers: {}, submitted: false };
}

function injectLauncher() {
  if (document.querySelector('#tdfnFinalEvaluation')) return;
  const section = document.createElement('section');
  section.id = 'tdfnFinalEvaluation';
  section.className = 'tdfn-final-card';
  section.innerHTML = `
    <div class="tdfn-final-card__text">
      <p class="eyebrow">Fin du parcours</p>
      <h2>Évaluation finale TDFN</h2>
      <p>12 questions tirées aléatoirement · sans aide, mémo ni solution pendant l’épreuve.</p>
      <div class="tdfn-final-status" id="tdfnFinalStatus"></div>
    </div>
    <div class="tdfn-final-card__actions">
      <button class="btn primary" id="tdfnStartExam" type="button">Commencer l’évaluation</button>
      <button class="btn" id="tdfnOpenAttestation" type="button" hidden>Mon attestation</button>
    </div>`;

  const notice = document.querySelector('.submission-notice');
  if (notice) notice.before(section); else document.querySelector('footer')?.before(section);

  document.querySelector('#tdfnStartExam')?.addEventListener('click', startExam);
  document.querySelector('#tdfnOpenAttestation')?.addEventListener('click', openAttestationForm);
  updateLauncher();
}

function updateLauncher() {
  const status = document.querySelector('#tdfnFinalStatus');
  const start = document.querySelector('#tdfnStartExam');
  const attestation = document.querySelector('#tdfnOpenAttestation');
  if (!status || !start || !attestation) return;

  const completed = completedCaseCount();
  const total = scoredCases().length;
  const acquired = acquiredCaseCount();
  const unlocked = completed >= total;

  if (!unlocked) {
    status.innerHTML = `<strong>${completed} / ${total} étapes acquises sans consultation de la solution</strong><span>L’évaluation finale se débloque après validation des ${total} étapes sans assistance.</span>`;
    start.disabled = true;
    start.textContent = 'Évaluation verrouillée';
  } else {
    status.innerHTML = `<strong>Parcours validé: ${completed} / ${total} étapes acquises sans consultation de la solution</strong><span>Les ${acquired} étapes requises ont été validées sans consultation de la solution.</span>`;
    start.disabled = false;
    start.textContent = lastResult?.passed ? 'Refaire l’évaluation' : 'Commencer l’évaluation';
  }

  attestation.hidden = !(lastResult?.passed && unlocked);
}

function ensureExamLayer() {
  let layer = document.querySelector('#tdfnExamLayer');
  if (layer) return layer;
  layer = document.createElement('div');
  layer.id = 'tdfnExamLayer';
  layer.className = 'tdfn-exam-layer';
  layer.setAttribute('role', 'dialog');
  layer.setAttribute('aria-modal', 'true');
  layer.setAttribute('aria-label', 'Parcours final TDFN');
  layer.hidden = true;
  document.body.append(layer);
  return layer;
}

function setExamIsolation(active) {
  const layer = document.querySelector('#tdfnExamLayer');
  [...document.body.children].forEach(node => {
    if (node === layer) return;
    if (active) node.setAttribute('inert', '');
    else node.removeAttribute('inert');
  });
}

function focusExamContent() {
  const target = document.querySelector('#tdfnExamLayer h1, #tdfnExamLayer h2, #tdfnExamLayer input, #tdfnExamLayer button');
  if (!target) return;
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}

function startExam() {
  const total = scoredCases().length;
  if (completedCaseCount() < total) return;
  exam = buildExam();
  document.documentElement.classList.add('tdfn-exam-active');
  setExamIsolation(true);
  renderExam();
  focusExamContent();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function renderExam() {
  const layer = ensureExamLayer();
  layer.hidden = false;
  layer.innerHTML = `
    <main class="tdfn-exam-shell" aria-labelledby="tdfnExamTitle">
      <header class="tdfn-exam-head">
        <div>
          <p class="eyebrow">Mode évaluation</p>
          <h1 id="tdfnExamTitle">Évaluation finale TDFN</h1>
          <p>Répondez aux 12 questions sans aide. Les réponses et les sources ne sont affichées qu’après la remise.</p>
        </div>
        <div class="tdfn-exam-counter"><strong id="tdfnAnsweredCount">0 / ${EXAM_SIZE}</strong><span>répondues</span></div>
      </header>
      <form id="tdfnExamForm" class="tdfn-exam-form">
        ${exam.questions.map((item, qi) => `
          <fieldset class="tdfn-question" data-q="${qi}">
            <legend><span>${qi + 1}</span>${esc(item.q)}</legend>
            <div class="tdfn-options">
              ${item.shuffledOptions.map((option, oi) => `
                <label class="tdfn-option">
                  <input type="radio" name="q${qi}" value="${oi}">
                  <span>${esc(option.label)}</span>
                </label>`).join('')}
            </div>
          </fieldset>`).join('')}
        <div class="tdfn-exam-submit">
          <p id="tdfnExamWarning" role="alert"></p>
          <button class="btn primary" type="submit">Remettre l’évaluation</button>
          <button class="btn ghost" type="button" id="tdfnAbortExam">Quitter sans remettre</button>
        </div>
      </form>
    </main>`;

  const form = layer.querySelector('#tdfnExamForm');
  form.addEventListener('change', onExamChange);
  form.addEventListener('submit', submitExam);
  layer.querySelector('#tdfnAbortExam').addEventListener('click', abortExam);
}

function onExamChange(event) {
  if (!event.target.matches('input[type="radio"]')) return;
  const qi = Number(event.target.name.replace('q', ''));
  exam.answers[qi] = Number(event.target.value);
  const count = Object.keys(exam.answers).length;
  document.querySelector('#tdfnAnsweredCount').textContent = `${count} / ${EXAM_SIZE}`;
}

function abortExam() {
  if (!confirm("Quitter l’évaluation? Les réponses de cette tentative seront perdues.")) return;
  exam = null;
  closeExamLayer();
}

function closeExamLayer() {
  document.documentElement.classList.remove('tdfn-exam-active');
  setExamIsolation(false);
  const layer = document.querySelector('#tdfnExamLayer');
  if (layer) { layer.hidden = true; layer.innerHTML = ''; }
  updateLauncher();
}

function submitExam(event) {
  event.preventDefault();
  const warning = document.querySelector('#tdfnExamWarning');
  if (Object.keys(exam.answers).length !== EXAM_SIZE) {
    warning.textContent = `Répondez aux ${EXAM_SIZE} questions avant de remettre l’évaluation.`;
    return;
  }

  let score = 0;
  const detail = exam.questions.map((item, qi) => {
    const selected = item.shuffledOptions[exam.answers[qi]];
    const correct = Boolean(selected?.correct);
    if (correct) score += 1;
    const correctOption = item.shuffledOptions.find(option => option.correct);
    return { id: item.id, q: item.q, selected: selected?.label || '', correctAnswer: correctOption?.label || '', correct, why: item.why || '', sourceLabel: item.sourceLabel || '', sourceUrl: item.sourceUrl || '' };
  });

  const result = {
    score,
    total: EXAM_SIZE,
    passed: score >= PASS_SCORE,
    completedAt: new Date().toISOString(),
    evaluationVersion: '17.2.1-hardened',
    detail
  };
  result.bestResultPreserved = saveLastResult(result);
  exam.submitted = true;
  renderResult(result);
}

function renderResult(result) {
  const layer = ensureExamLayer();
  const percent = Math.round(result.score / result.total * 100);
  layer.innerHTML = `
    <main class="tdfn-exam-shell tdfn-result-shell">
      <section class="tdfn-result-hero ${result.passed ? 'passed' : 'retry'}">
        <p class="eyebrow">Résultat de l’auto-évaluation</p>
        <h1>${result.score} / ${result.total} · ${percent} %</h1>
        <p>${result.passed ? `Seuil atteint (${PASS_SCORE}/${EXAM_SIZE}). L’attestation de parcours est disponible.` : `Le seuil de ${PASS_SCORE}/${EXAM_SIZE} n’est pas encore atteint. Révisez les points ci-dessous puis tentez une nouvelle série.`}</p>
        ${result.bestResultPreserved ? `<p class="tdfn-best-result"><strong>Meilleur résultat conservé :</strong> ${lastResult.score} / ${lastResult.total}. L’attestation reste liée à ce meilleur résultat enregistré localement.</p>` : ''}
        <div class="tdfn-result-actions">
          ${lastResult?.passed ? '<button class="btn primary" id="tdfnResultAttestation" type="button">Générer mon attestation</button>' : ''}
          <button class="btn" id="tdfnRetryExam" type="button">Nouvelle tentative</button>
          <button class="btn ghost" id="tdfnCloseResult" type="button">Retour au parcours</button>
        </div>
      </section>
      <section class="tdfn-review">
        <h2>Correction</h2>
        <p class="tdfn-review-note">La correction et les références sont visibles seulement après la remise.</p>
        ${result.detail.map((item, index) => `
          <article class="tdfn-review-item ${item.correct ? 'is-correct' : 'is-wrong'}">
            <h3>${index + 1}. ${esc(item.q)}</h3>
            <p><strong>Votre réponse:</strong> ${esc(item.selected)}</p>
            ${item.correct ? '<p class="tdfn-review-ok">Réponse correcte.</p>' : `<p><strong>Réponse attendue:</strong> ${esc(item.correctAnswer)}</p>`}
            ${item.why ? `<p class="tdfn-review-why"><strong>Pourquoi:</strong> ${esc(item.why)}</p>` : ''}
            ${item.sourceUrl ? `<p class="tdfn-review-link"><a href="${esc(item.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(item.sourceLabel || 'Source officielle')}</a></p>` : ''}
          </article>`).join('')}
        <div class="tdfn-review-source">
          <strong>Références de contrôle</strong>
          <a href="https://www.estv.admin.ch/fr/tva-taux-de-la-dette-fiscale-nette-et-taux-forfaitaires" target="_blank" rel="noopener noreferrer">AFC — TDFN et taux forfaitaires</a>
          <a href="https://www.estv.admin.ch/fr/tva-methode-des-taux-de-la-dette-fiscale-nette-2025" target="_blank" rel="noopener noreferrer">AFC — modifications TDFN dès 2025</a>
        </div>
      </section>
    </main>`;

  layer.querySelector('#tdfnRetryExam')?.addEventListener('click', () => { exam = buildExam(); renderExam(); });
  layer.querySelector('#tdfnCloseResult')?.addEventListener('click', closeExamLayer);
  layer.querySelector('#tdfnResultAttestation')?.addEventListener('click', openAttestationForm);
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function openAttestationForm() {
  const total = scoredCases().length;
  if (!lastResult?.passed || acquiredCaseCount() < total) return;
  const layer = ensureExamLayer();
  document.documentElement.classList.add('tdfn-exam-active');
  layer.hidden = false;
  setExamIsolation(true);
  layer.innerHTML = `
    <main class="tdfn-exam-shell tdfn-name-shell">
      <section class="tdfn-name-card">
        <p class="eyebrow">Attestation de parcours</p>
        <h1>Quel nom doit apparaître sur l’attestation?</h1>
        <p>Le nom est utilisé uniquement dans votre navigateur pour préparer le document. Il n’est pas envoyé par ce site.</p>
        <form id="tdfnNameForm">
          <label for="tdfnParticipantName">Nom et prénom</label>
          <input id="tdfnParticipantName" name="participant" type="text" maxlength="80" autocomplete="name" required placeholder="Marie Dupont">
          <div class="tdfn-name-actions">
            <button class="btn primary" type="submit">Préparer l’attestation</button>
            <button class="btn ghost" id="tdfnCancelName" type="button">Annuler</button>
          </div>
        </form>
      </section>
    </main>`;

  layer.querySelector('#tdfnNameForm').addEventListener('submit', event => {
    event.preventDefault();
    const name = String(new FormData(event.currentTarget).get('participant') || '').trim();
    if (name.length < 2) return;
    renderAttestation(name);
  });
  layer.querySelector('#tdfnCancelName').addEventListener('click', closeExamLayer);
  setTimeout(() => layer.querySelector('#tdfnParticipantName')?.focus(), 0);
}

function renderAttestation(name) {
  const layer = ensureExamLayer();
  const date = new Intl.DateTimeFormat('fr-CH', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(lastResult.completedAt));
  const total = scoredCases().length;
  const percent = Math.round(lastResult.score / lastResult.total * 100);

  const compactThemes = [
    "Fondamentaux TDFN",
    "Activités multiples",
    "Décompte TVA",
    "Opérations internationales",
    "Travail fiduciaire",
    "Rectifications",
    "Changements de méthode",
    "Cas PME"
  ];

  const detailedThemes = COURSE_THEMES.map(group => `
    <section class="tdfn-record-group">
      <h3>${esc(group.title)}</h3>
      <ul>
        ${group.items.map(item => `<li>${esc(item)}</li>`).join('')}
      </ul>
    </section>`).join('');

  layer.innerHTML = `
    <main class="tdfn-attestation-screen">
      <div class="tdfn-attestation-toolbar no-print">
        <button class="btn primary" id="tdfnPrintAttestation" type="button">Imprimer / enregistrer les 2 pages en PDF</button>
        <button class="btn" id="tdfnBackFromAttestation" type="button">Retour</button>
      </div>

      <div class="tdfn-attestation-document" id="tdfnAttestation">
        <article class="tdfn-attestation-page tdfn-attestation-page--certificate">
          <div class="tdfn-attestation-topline"></div>
          <div class="tdfn-page-number">1 / 2</div>

          <header class="tdfn-attestation-header">
            <p class="tdfn-attestation-kicker">TVA suisse · entraînement pratique</p>
            <h1>ATTESTATION DE PARCOURS</h1>
            <p class="tdfn-attestation-subtitle">Méthode des taux de la dette fiscale nette (TDFN)</p>
          </header>

          <div class="tdfn-attestation-person">
            <span>Parcours complété sous le nom indiqué</span>
            <strong>${esc(name)}</strong>
            <span>a acquis les étapes évaluées du parcours sans consultation de la solution et a réussi l’auto-évaluation finale.</span>
          </div>

          <div class="tdfn-attestation-metrics">
            <div><strong>${total}</strong><span>étapes acquises sans consultation de la solution</span></div>
            <div><strong>${lastResult.score} / ${lastResult.total}</strong><span>évaluation finale · ${percent} %</span></div>
            <div><strong>${esc(date)}</strong><span>date de l’évaluation</span></div>
          </div>

          <section class="tdfn-attestation-themes">
            <p class="tdfn-section-label">Thèmes abordés</p>
            <div class="tdfn-theme-chips">
              ${compactThemes.map(theme => `<span>${esc(theme)}</span>`).join('')}
            </div>
            <p class="tdfn-attestation-follow">Le relevé détaillé du contenu du parcours figure en page 2.</p>
          </section>

          <div class="tdfn-attestation-project">
            <strong>TVA — Entraînement pratique</strong>
            <span>${esc(PROJECT_URL)}</span>
          </div>

          <p class="tdfn-attestation-disclaimer">
            Projet pédagogique indépendant. Cette attestation confirme uniquement la validation des étapes évaluées de ce parcours d’entraînement et la réussite de son auto-évaluation finale. Elle ne constitue ni un diplôme, ni un titre professionnel, ni une certification reconnue ou accréditée. Le projet est indépendant et sans affiliation avec l’AFC/ESTV. Le nom est saisi par le participant et son identité n’est pas vérifiée.
          </p>
        </article>

        <article class="tdfn-attestation-page tdfn-attestation-page--record">
          <div class="tdfn-attestation-topline"></div>
          <div class="tdfn-page-number">2 / 2</div>

          <header class="tdfn-record-header">
            <p class="tdfn-attestation-kicker">TVA suisse · méthode TDFN</p>
            <h2>RELEVÉ DU PARCOURS</h2>
            <p>Contenu et thèmes abordés au cours de l’entraînement pratique.</p>
          </header>

          <div class="tdfn-record-summary">
            <div>
              <span>Participant</span>
              <strong>${esc(name)}</strong>
            </div>
            <div>
              <span>Parcours</span>
              <strong>${total} étapes validées · atelier libre disponible</strong>
            </div>
            <div>
              <span>Évaluation finale</span>
              <strong>${lastResult.score} / ${lastResult.total} · ${percent} %</strong>
            </div>
          </div>

          <div class="tdfn-record-grid">
            ${detailedThemes}
          </div>

          <footer class="tdfn-record-footer">
            <div>
              <strong>Référentiel pédagogique</strong>
              <span>LTVA · OTVA · publications et informations pratiques de l’AFC utilisées dans les cas du parcours.</span>
            </div>
            <div>
              <strong>Projet</strong>
              <span>${esc(PROJECT_URL)}</span>
            </div>
          </footer>

          <p class="tdfn-attestation-disclaimer tdfn-record-disclaimer">
            Ce relevé décrit les thèmes couverts par le parcours. Il ne constitue pas une attestation de compétences professionnelles acquises, un diplôme ou une certification reconnue. L’attestation et le relevé sont générés localement à partir du résultat enregistré dans le navigateur.
          </p>
        </article>
      </div>
    </main>`;

  layer.querySelector('#tdfnPrintAttestation').addEventListener('click', () => window.print());
  layer.querySelector('#tdfnBackFromAttestation').addEventListener('click', closeExamLayer);
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function init() {
  injectLauncher();
  ensureExamLayer();
  setInterval(updateLauncher, 1500);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
else init();
