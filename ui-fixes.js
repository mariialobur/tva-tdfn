(() => {
  'use strict';

  let scheduled = false;

  function isQuizCase() {
    return document.querySelector('#modeSwitch')?.classList.contains('hidden') === true;
  }

  function addQuizFormatNote() {
    if (!isQuizCase()) return;

    const workArea = document.querySelector('#workArea');
    const quiz = workArea?.querySelector('.quiz-card');
    if (!quiz || workArea.querySelector('.quiz-format-note')) return;

    const note = document.createElement('div');
    note.className = 'quiz-format-note';
    note.innerHTML = '<strong>Format de ce cas:</strong> quiz de qualification. Aucun décompte n’est à compléter; l’objectif est d’appliquer correctement la règle des 10&nbsp;%.';
    quiz.before(note);
  }

  function addQuizNextButton() {
    if (!isQuizCase()) return;

    const resultArea = document.querySelector('#resultArea');
    const card = resultArea?.querySelector('.result-card');
    if (!card || card.querySelector('[data-action="next"]') || !card.querySelector('.lesson')) return;

    const actions = document.createElement('div');
    actions.className = 'form-actions quiz-result-actions';
    actions.innerHTML = '<button class="btn primary" type="button" data-action="next">Cas suivant →</button>';
    card.append(actions);

    if (!card.dataset.autoScrolled) {
      card.dataset.autoScrolled = 'true';
      requestAnimationFrame(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  }

  function addDeclarationReminder() {
    const workArea = document.querySelector('#workArea');
    const declaration = workArea?.querySelector('.compact-declaration');
    if (!declaration || workArea.querySelector('.declaration-case-reminder')) return;

    const sourceData = document.querySelector('#sidebar .dossier-data .data-list');
    if (!sourceData || !sourceData.children.length) return;

    const reminder = document.createElement('section');
    reminder.className = 'declaration-case-reminder';
    reminder.setAttribute('aria-label', 'Rappel des données du dossier');

    const heading = document.createElement('div');
    heading.className = 'declaration-case-reminder__head';
    heading.innerHTML = '<div><p class="eyebrow">Rappel du dossier</p><h3>Données utiles pour compléter le décompte</h3></div><span>Étape 3</span>';

    const data = sourceData.cloneNode(true);
    data.classList.add('declaration-case-reminder__data');

    const note = document.createElement('p');
    note.className = 'declaration-case-reminder__note';
    note.textContent = 'Les montants du cas restent visibles ici: aucun retour à l’étape précédente et aucune mémorisation ne sont nécessaires.';

    reminder.append(heading, data, note);
    declaration.before(reminder);
  }

  function enhanceCalculatorAverageRate() {
    document.querySelectorAll('.calculator-summary [data-calc-average]').forEach((value) => {
      if (value.closest('.average-rate-details')) return;

      const originalBlock = value.parentElement;
      if (!originalBlock) return;

      const details = document.createElement('details');
      details.className = 'average-rate-details';

      const summary = document.createElement('summary');
      summary.textContent = 'Comprendre le taux moyen calculé';

      const body = document.createElement('div');
      body.className = 'average-rate-details__body';

      const line = document.createElement('div');
      line.className = 'average-rate-details__value';
      line.innerHTML = '<span>Taux moyen calculé automatiquement</span>';
      line.append(value);

      const explanation = document.createElement('p');
      explanation.textContent = 'Résultat pondéré des TDFN et des contre-prestations saisis. Il ne constitue pas un TDFN supplémentaire et ne doit pas être choisi manuellement.';

      const official = document.createElement('p');
      official.textContent = 'L’impôt reste calculé séparément pour chaque activité selon son TDFN; le taux moyen sert uniquement à présenter le résultat agrégé au ch. 323.';

      body.append(line, explanation, official);
      details.append(summary, body);
      originalBlock.replaceWith(details);
    });
  }

  function enhanceCompactAverageRate() {
    document.querySelectorAll('.compact-tax-summary').forEach((summaryBlock) => {
      if (summaryBlock.nextElementSibling?.classList.contains('average-rate-details')) return;

      const value = summaryBlock.querySelector('[data-computed-rate]');
      if (!value) return;

      const label = value.previousElementSibling;
      if (label?.textContent?.trim().toLowerCase().startsWith('taux moyen')) label.remove();
      value.remove();

      const details = document.createElement('details');
      details.className = 'average-rate-details compact-average-rate-details';

      const summary = document.createElement('summary');
      summary.textContent = 'Comprendre le taux moyen calculé';

      const body = document.createElement('div');
      body.className = 'average-rate-details__body';

      const line = document.createElement('div');
      line.className = 'average-rate-details__value';
      line.innerHTML = '<span>Taux moyen calculé automatiquement</span>';
      line.append(value);

      const explanation = document.createElement('p');
      explanation.textContent = 'Cet indicateur présente le résultat agrégé au ch. 323. Il ne remplace pas les TDFN confirmés pour chaque activité.';

      body.append(line, explanation);
      details.append(summary, body);
      summaryBlock.after(details);
    });

    document.querySelectorAll('.rate-cell [data-computed-rate]').forEach((value) => {
      value.title = 'Taux moyen calculé automatiquement pour présenter le résultat agrégé au ch. 323; il ne constitue pas un TDFN supplémentaire.';
      value.setAttribute('aria-label', `${value.textContent.trim()} — taux moyen calculé automatiquement, non sélectionné manuellement`);
    });
  }

  function applyFixes() {
    addQuizFormatNote();
    addQuizNextButton();
    addDeclarationReminder();
    enhanceCalculatorAverageRate();
    enhanceCompactAverageRate();
  }

  function scheduleFixes() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyFixes();
    });
  }

  const observer = new MutationObserver(scheduleFixes);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleFixes, { once: true });
  } else {
    scheduleFixes();
  }
})();
