import { CASES } from './data.js';
import { state, publicCaseId } from './store.js';

const EXAM_SIZE = 12;
const PASS_SCORE = 9;
const PROJECT_URL = 'https://mariialobur.github.io/tva-tdfn/';
const STORAGE_KEY = 'tva_tdfn_final_evaluation_v2';

const QUESTION_BANK = [
  {
    id: 'limits',
    q: "Une entreprise souhaite utiliser les TDFN. Quelles sont les deux limites quantitatives générales à respecter?",
    options: [
      "CA imposable annuel TTC ≤ CHF 5’024’000 et impôt dû selon TDFN ≤ CHF 108’000",
      "CA annuel HT ≤ CHF 5’005’000 et impôt préalable ≤ CHF 108’000",
      "CA imposable annuel TTC ≤ CHF 100’000 et impôt dû ≤ CHF 5’024’000",
      "Seule la limite d’impôt de CHF 108’000 est déterminante"
    ],
    answer: 0
  },
  {
    id: 'invoice-rate',
    q: "Une entreprise décompte au TDFN de 6,2 %. Quel taux doit-elle indiquer sur une facture suisse soumise au taux normal?",
    options: ["6,2 %", "8,1 %", "2,6 %", "Aucun taux ne doit être indiqué"],
    answer: 1
  },
  {
    id: 'gross-base',
    q: "Sur quelle base la dette fiscale TDFN est-elle calculée pour une prestation imposable?",
    options: [
      "Le chiffre d’affaires brut, TVA comprise",
      "Le chiffre d’affaires hors TVA uniquement",
      "Le bénéfice net après charges",
      "Le montant de l’impôt préalable"
    ],
    answer: 0
  },
  {
    id: 'calc-400k',
    q: "Un architecte encaisse CHF 400’000 TVA comprise et dispose d’un TDFN de 6,2 %. Quelle dette fiscale TDFN en résulte?",
    options: ["CHF 24’800", "CHF 32’400", "CHF 22’940", "CHF 6’200"],
    answer: 0
  },
  {
    id: 'input-tax',
    q: "Dans le calcul courant selon la méthode TDFN, comment l’impôt préalable est-il traité?",
    options: [
      "Il n’est en principe pas déterminé et déduit séparément; il est pris en compte forfaitairement dans le TDFN",
      "Il est toujours déduit facture par facture comme à la méthode effective",
      "Il est ajouté au chiffre d’affaires brut",
      "Il est déduit uniquement lorsque le TDFN dépasse 5 %"
    ],
    answer: 0
  },
  {
    id: 'ten-percent',
    q: "Depuis 2025, une activité représente exactement 10,0 % du chiffre d’affaires total imposable. La règle générale «plus de 10 %» est-elle franchie par ce seul fait?",
    options: ["Non", "Oui", "Oui, mais seulement au taux normal", "Uniquement si le CA dépasse CHF 5’005’000"],
    answer: 0
  },
  {
    id: 'multiple-rates',
    q: "Depuis le 1er janvier 2025, combien de TDFN une entreprise peut-elle en principe appliquer lorsque plusieurs activités déterminantes remplissent les conditions?",
    options: ["Au maximum un", "Au maximum deux", "Plus de deux sont possibles", "Toujours exactement trois"],
    answer: 2
  },
  {
    id: 'change-effective-to-tdfn',
    q: "Lors d’un passage de la méthode effective aux TDFN, où est portée la correction liée aux impôts préalables sur la valeur résiduelle?",
    options: ["Au chiffre 415 du dernier décompte avant le changement", "Au chiffre 410 du premier décompte TDFN", "Au chiffre 200", "Aucune correction n’est possible"],
    answer: 0
  },
  {
    id: 'change-tdfn-to-effective',
    q: "Lors d’un passage des TDFN à la méthode effective, où peut être porté l’impôt préalable sur la valeur résiduelle qui devient déductible?",
    options: ["Au chiffre 410 du premier décompte après le changement", "Au chiffre 415 du dernier décompte TDFN", "Au chiffre 200", "Uniquement dans la déclaration d’impôt direct"],
    answer: 0
  },
  {
    id: 'periodicity',
    q: "Selon l’AFC, à quelle fréquence le décompte TDFN est-il établi en règle générale?",
    options: ["Mensuellement", "Trimestriellement", "Semestriellement", "Tous les deux ans"],
    answer: 2
  },
  {
    id: 'eligibility-exclusions',
    q: "Une entreprise respecte les deux limites quantitatives TDFN. Cela suffit-il toujours pour avoir droit à la méthode?",
    options: [
      "Non, les exclusions prévues par les règles TDFN doivent encore être contrôlées",
      "Oui, les deux limites suffisent dans tous les cas",
      "Oui, si elle facture au taux normal de 8,1 %",
      "Non, car les TDFN sont réservés aux collectivités publiques"
    ],
    answer: 0
  },
  {
    id: 'entry-62',
    q: "Pour l’année précédant un passage de la méthode effective aux TDFN, quel repère maximal de chiffre d’affaires l’AFC indique-t-elle pour un TDFN de 6,2 %?",
    options: ["CHF 1,74 mio", "CHF 2,04 mio", "CHF 2,40 mio", "CHF 5,024 mio"],
    answer: 0
  },
  {
    id: 'entry-53',
    q: "Pour l’année précédant un passage de la méthode effective aux TDFN, quel repère maximal de chiffre d’affaires l’AFC indique-t-elle pour un TDFN de 5,3 %?",
    options: ["CHF 1,59 mio", "CHF 1,74 mio", "CHF 2,04 mio", "CHF 3,60 mio"],
    answer: 2
  },
  {
    id: 'entry-45',
    q: "Pour l’année précédant un passage de la méthode effective aux TDFN, quel repère maximal de chiffre d’affaires l’AFC indique-t-elle pour un TDFN de 4,5 %?",
    options: ["CHF 2,04 mio", "CHF 2,40 mio", "CHF 2,92 mio", "CHF 3,60 mio"],
    answer: 1
  },
  {
    id: 'calc-50k',
    q: "Un chiffre d’affaires de CHF 50’000 TVA comprise est soumis à un TDFN de 3,7 %. Quelle est la dette fiscale?",
    options: ["CHF 1’850", "CHF 1’350", "CHF 3’700", "CHF 4’050"],
    answer: 0
  },
  {
    id: 'calc-ht',
    q: "Une prestation est comptabilisée CHF 20’000 hors TVA au taux légal de 8,1 %. Avec un TDFN de 6,2 %, quel montant de dette TDFN obtient-on après conversion correcte en TTC?",
    options: ["CHF 1’240,00", "CHF 1’340,44", "CHF 1’620,00", "CHF 1’752,22"],
    answer: 1
  },
  {
    id: 'calc-multi',
    q: "Deux activités produisent respectivement CHF 80’000 TTC au TDFN de 2,1 % et CHF 20’000 TTC au TDFN de 5,3 %. Quelle est la dette totale?",
    options: ["CHF 2’740", "CHF 3’700", "CHF 2’100", "CHF 5’300"],
    answer: 0
  },
  {
    id: 'reform-2025',
    q: "Quelle modification générale est entrée en vigueur pour les TDFN au 1er janvier 2025?",
    options: [
      "La limitation générale à deux TDFN a été supprimée et les activités représentant plus de 10 % doivent être examinées selon leur TDFN correspondant",
      "Les TDFN ont été supprimés pour toutes les PME",
      "Le taux normal de TVA est passé de 8,1 % à 6,2 %",
      "Tous les décomptes TDFN sont devenus mensuels"
    ],
    answer: 0
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
}

function scoredCases() {
  return CASES.filter(c => !c.excludeFromProgress);
}

function completedCaseCount() {
  return scoredCases().filter(c => {
    const id = publicCaseId(c);
    return Number.isFinite(state.scores?.[id]) || Boolean(state.assisted?.[id]) || Number(state.attempts?.[id] || 0) > 0;
  }).length;
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
    status.innerHTML = `<strong>${completed} / ${total} étapes évaluées</strong><span>L’évaluation finale se débloque après avoir travaillé les ${total} étapes évaluées.</span>`;
    start.disabled = true;
    start.textContent = 'Évaluation verrouillée';
  } else {
    status.innerHTML = `<strong>Parcours complet: ${completed} / ${total} étapes évaluées</strong><span>${acquired} étapes acquises sans consultation de la solution.</span>`;
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
  layer.hidden = true;
  document.body.append(layer);
  return layer;
}

function startExam() {
  const total = scoredCases().length;
  if (completedCaseCount() < total) return;
  exam = buildExam();
  document.documentElement.classList.add('tdfn-exam-active');
  renderExam();
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
    return { id: item.id, q: item.q, selected: selected?.label || '', correctAnswer: correctOption?.label || '', correct };
  });

  const result = {
    score,
    total: EXAM_SIZE,
    passed: score >= PASS_SCORE,
    completedAt: new Date().toISOString(),
    evaluationVersion: '17.0.0',
    detail
  };
  saveLastResult(result);
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
        <div class="tdfn-result-actions">
          ${result.passed ? '<button class="btn primary" id="tdfnResultAttestation" type="button">Générer mon attestation</button>' : ''}
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
  if (!lastResult?.passed) return;
  const layer = ensureExamLayer();
  document.documentElement.classList.add('tdfn-exam-active');
  layer.hidden = false;
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
  layer.innerHTML = `
    <main class="tdfn-attestation-screen">
      <div class="tdfn-attestation-toolbar no-print">
        <button class="btn primary" id="tdfnPrintAttestation" type="button">Imprimer / enregistrer en PDF</button>
        <button class="btn" id="tdfnBackFromAttestation" type="button">Retour</button>
      </div>
      <article class="tdfn-attestation" id="tdfnAttestation">
        <div class="tdfn-attestation-topline"></div>
        <p class="tdfn-attestation-kicker">TVA suisse · entraînement pratique</p>
        <h1>ATTESTATION DE PARCOURS</h1>
        <p class="tdfn-attestation-subtitle">Méthode des taux de la dette fiscale nette (TDFN)</p>
        <div class="tdfn-attestation-person">
          <span>Parcours complété sous le nom indiqué</span>
          <strong>${esc(name)}</strong>
          <span>43 étapes d’entraînement travaillées et auto-évaluation finale réussie.</span>
        </div>
        <div class="tdfn-attestation-metrics">
          <div><strong>${total}</strong><span>étapes du parcours évaluées</span></div>
          <div><strong>${lastResult.score} / ${lastResult.total}</strong><span>évaluation finale</span></div>
          <div><strong>${esc(date)}</strong><span>date de l’évaluation</span></div>
        </div>
        <div class="tdfn-attestation-project">
          <strong>TVA — Entraînement pratique</strong>
          <span>${esc(PROJECT_URL)}</span>
        </div>
        <p class="tdfn-attestation-disclaimer">Projet pédagogique indépendant. Cette attestation atteste uniquement l’achèvement de ce parcours d’entraînement et la réussite de son auto-évaluation finale. Elle ne constitue ni un diplôme, ni un titre professionnel, ni une certification reconnue ou accréditée. Le projet est indépendant et sans affiliation avec l’AFC/ESTV. Le nom est saisi par le participant et son identité n’est pas vérifiée.</p>
      </article>
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
