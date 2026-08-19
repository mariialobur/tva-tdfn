import './tdfn-plan.js';
import { TRANSITION_WORKSHEETS } from './data.js';
import { state, saveState } from './store.js';
import { componentMarkup } from './components.js';

const parse = (value) => {
  if (value === null || value === undefined || String(value).trim() === '') return null;
  const normalized = String(value).trim().replace(/CHF|%/gi, '').replace(/[’'\s\u00a0\u202f]/g, '').replace(',', '.');
  const number = Number(normalized);
  return Number.isFinite(number) ? number : NaN;
};
const close = (a, b) => Number.isFinite(a) && Math.abs(a - b) <= 0.011;

export function worksheetModel(publicId) {
  return TRANSITION_WORKSHEETS[publicId] || null;
}

export function worksheetState(publicId) {
  return state.worksheets[publicId] || (state.worksheets[publicId] = {});
}

export function worksheetMarkup(publicId, feedback = {}) {
  const model = worksheetModel(publicId);
  return componentMarkup('worksheet', { publicId, model, value: worksheetState(publicId), feedback });
}

export function updateWorksheetField(publicId, lineId, field, value) {
  if (!worksheetModel(publicId)) return;
  const worksheet = worksheetState(publicId);
  const row = worksheet[lineId] || (worksheet[lineId] = {});
  row[field] = value;
  saveState();
}

export function validateWorksheet(publicId) {
  const model = worksheetModel(publicId);
  if (!model) return { applicable: false, correct: 0, total: 0, allGood: true, rows: [], feedback: {} };
  const value = worksheetState(publicId);
  const rows = model.lines.map((line) => {
    const row = value[line.id] || {};
    const treatmentGood = row.treatment === line.expectedTreatment;
    const residual = parse(row.residual);
    const eligibility = model.showEligibility ? parse(row.eligibility) : 100;
    const correction = parse(row.correction);
    const residualGood = close(residual, line.expectedResidual);
    const eligibilityGood = !model.showEligibility || close(eligibility, line.expectedEligibility);
    const correctionGood = close(correction, line.expectedCorrection);
    const checks = [treatmentGood, residualGood, correctionGood, ...(model.showEligibility ? [eligibilityGood] : [])];
    const correctFields = checks.filter(Boolean).length;
    const totalFields = checks.length;
    const good = correctFields === totalFields;
    return {
      line, treatmentGood, residualGood, eligibilityGood, correctionGood, good, correctFields, totalFields,
      actual: { treatment: row.treatment, residual, eligibility, correction }
    };
  });
  const feedback = Object.fromEntries(rows.map((row) => [row.line.id, row.good]));
  const correct = rows.reduce((sum, row) => sum + row.correctFields, 0);
  const total = rows.reduce((sum, row) => sum + row.totalFields, 0);
  return {
    applicable: true, correct, total,
    allGood: rows.every((row) => row.good),
    rows, feedback, model
  };
}

export function worksheetFeedbackMarkup(result, escapeHtml, formatChf) {
  if (!result.applicable) return '';
  const reverse = Boolean(result.model?.showEligibility);
  return `<div class="feedback transition-feedback">${result.rows.map((row) => {
    const treatment = row.line.expectedTreatment === 'yes'
      ? (reverse ? 'à déduire' : 'à corriger')
      : (reverse ? 'pas de déduction' : 'pas de correction');
    const eligibility = reverse ? ` · droit ${row.line.expectedEligibility}%` : '';
    const expected = `${treatment} · résiduel ${row.line.expectedResidual}%${eligibility} · ${formatChf(row.line.expectedCorrection, 2)}`;
    const missing = [
      !row.treatmentGood ? 'traitement' : '',
      !row.residualGood ? 'part résiduelle' : '',
      reverse && !row.eligibilityGood ? 'part ouvrant droit' : '',
      !row.correctionGood ? 'montant' : ''
    ].filter(Boolean).join(', ');
    return `<div class="feedback-row"><div class="feedback-name">${row.good ? '✓' : '✕'} ${escapeHtml(row.line.label)}</div><div class="feedback-explain">Attendu: ${escapeHtml(expected)}.${missing ? ` À revoir: ${escapeHtml(missing)}.` : ''}</div></div>`;
  }).join('')}</div>`;
}

export function fillWorksheetSolution(publicId) {
  const model = worksheetModel(publicId);
  if (!model) return;
  state.worksheets[publicId] = Object.fromEntries(model.lines.map((line) => [line.id, {
    treatment: line.expectedTreatment,
    residual: String(line.expectedResidual),
    ...(model.showEligibility ? { eligibility: String(line.expectedEligibility) } : {}),
    correction: String(line.expectedCorrection)
  }]));
  saveState();
}

export function clearWorksheet(publicId) {
  delete state.worksheets[publicId];
  saveState();
}
