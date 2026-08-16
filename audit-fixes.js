// v16.3.0 — targeted fiscal audit patch · 16.08.2026
// Loaded BEFORE app.js. It amends only audited wording/logic in the existing data.js.
import { CASES, OFFICIAL_SOURCES, TRANSITION_WORKSHEETS } from './data.js';

const byId = id => CASES.find(c => c.id === id);
const sourceById = id => OFFICIAL_SOURCES.find(s => s.id === id);

function uniquePush(array, value) {
  if (Array.isArray(array) && !array.includes(value)) array.push(value);
}

function replaceStringsDeep(value, replacements) {
  if (typeof value === 'string') {
    return replacements.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value);
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) value[i] = replaceStringsDeep(value[i], replacements);
    return value;
  }
  if (value && typeof value === 'object') {
    for (const key of Object.keys(value)) value[key] = replaceStringsDeep(value[key], replacements);
  }
  return value;
}

// -----------------------------------------------------------------------------
// Source hierarchy
// Exact TDFN values are anchored to the binding AFC rate ordinance (Fedlex).
// The AFC 2025 overview remains useful to explain the reform, but not as the
// primary source for an exact sector rate.
// -----------------------------------------------------------------------------
const ratesSource = sourceById('rates');
if (ratesSource) {
  ratesSource.scope = 'Référence normative prioritaire pour le TDFN exact par branche et activité dès le 01.01.2025';
  ratesSource.status = 'Droit fédéral · référence pour la valeur exacte des TDFN';
}

const overview2025 = sourceById('tdfn-2025-additional-rates');
if (overview2025) {
  overview2025.scope = 'Vue d’ensemble de la réforme 2025 (plusieurs TDFN, règle des 10 %). Pour le taux exact d’une activité, contrôler l’ordonnance AFC RS 641.202.62.';
}

// -----------------------------------------------------------------------------
// D / D3 — sports
// The numerical rates already present in the CURRENT trainer are correct:
// sports goods excluding clothing 2.1%; clothing 3.0%; rental 3.7%;
// service/repair 4.5%. We only repair the SOURCE WORDING so it no longer
// attributes those exact values to the simplified AFC overview example.
// -----------------------------------------------------------------------------
const D = byId('D');
if (D) {
  D.afcNote = 'TDFN contrôlés dans l’ordonnance AFC RS 641.202.62 en vigueur dès 2025: commerce d’articles de sport hors vêtements 2,1 %, location 3,7 % et services/réparations sur articles de sport 4,5 %. La dette totale du cas est CHF 8’700; le taux moyen résultant de 2,90 % est un indicateur de synthèse, jamais un TDFN à appliquer.';
  D.legal = 'Ordonnance AFC sur la valeur des TDFN — RS 641.202.62 · art. 37 LTVA · art. 86 à 88 OTVA';
  D.sourceIds = ['rates', 'otva', 'ltva', 'prototype', 'tdfn-2025-additional-rates'];
}

const D3 = byId('D3');
if (D3) {
  D3.afcNote = 'Les TDFN exacts utilisés dans ce cas sont contrôlés dans l’ordonnance AFC RS 641.202.62: commerce d’articles de sport hors vêtements 2,1 %, vêtements de sport 3,0 %, location 3,7 % et services/réparations 4,5 %. Les exportations documentées restent hors des bases TDFN suisses.';
  D3.legal = 'Ordonnance AFC sur la valeur des TDFN — RS 641.202.62 · art. 23 et 37 LTVA · art. 86 à 88 OTVA';
  D3.sourceIds = ['rates', 'otva', 'ltva', 'prototype', 'tdfn-2025-additional-rates'];
}

// -----------------------------------------------------------------------------
// D4 — avoid the false inference "under 10% = ignored".
// Art. 88 OTVA determines which AUTHORIZED TDFN applies when the specific rate
// for an activity has not itself been authorized.
// -----------------------------------------------------------------------------
const D4 = byId('D4');
if (D4) {
  D4.mission = 'Calculez les deux pourcentages et identifiez l’activité qui franchit, dans ce calcul, le seuil strictement supérieur à 10 %. Ce cas ne décide pas à lui seul de l’autorisation effective d’un TDFN.';
  D4.legal = 'Art. 86 et 88 OTVA · art. 37 LTVA · règle des 10 %';
  uniquePush(D4.sourceIds, 'otva');
  if (Array.isArray(D4.questions)) {
    const q = D4.questions.find(item => /déclenche|10 %|10,0|10,1/i.test(String(item.q || item.question || '')));
    if (q) {
      if ('q' in q) q.q = 'Quelle activité franchit ici le seuil strictement supérieur à 10 % selon ce seul calcul?';
      if ('question' in q) q.question = 'Quelle activité franchit ici le seuil strictement supérieur à 10 % selon ce seul calcul?';
      q.why = 'La réparation atteint 10,1 % tandis que la location atteint exactement 10,0 %. Le seuil strict est donc franchi uniquement par la réparation dans ce calcul; l’autorisation effective s’apprécie ensuite selon les règles temporelles de l’art. 86 OTVA.';
    }
  }
  D4.lesson = 'Une différence de 0,1 point peut changer l’analyse du seuil. Attention: une activité qui ne franchit pas le seuil n’est pas ignorée. Si son TDFN propre n’a pas été autorisé, l’art. 88, al. 2, OTVA détermine quel TDFN autorisé doit être appliqué à son chiffre d’affaires.';
}

// -----------------------------------------------------------------------------
// E / F — clarify the CURRENT rule. F was NOT an error.
// -----------------------------------------------------------------------------
const E = byId('E');
if (E) {
  E.legal = 'Art. 86, al. 2, let. a, et al. 3 OTVA · art. 37 LTVA';
  uniquePush(E.sourceIds, 'otva');
  E.lesson = 'Pour un nouvel assujetti ou le début d’une nouvelle activité, le test des 10 % repose sur les chiffres d’affaires escomptés des douze premiers mois. Les activités soumises au même TDFN sont additionnées pour ce test.';
}

const F = byId('F');
if (F) {
  F.description = 'Pour un assujetti déjà établi, la limite de 10 % est appréciée sur les trois périodes fiscales précédentes. Elle est considérée comme dépassée lorsque la part de l’activité concernée est supérieure à 10 % au cours de chacune de ces trois périodes.';
  F.afcNote = 'Art. 86, al. 2, let. b, OTVA: pour les autres assujettis, la référence est constituée par les trois périodes fiscales précédentes. Le dépassement doit être supérieur à 10 % dans chacune d’elles; les activités soumises au même TDFN sont additionnées selon l’al. 3.';
  F.legal = 'Art. 86, al. 2, let. b, al. 3 et 4 OTVA · art. 37 LTVA · Info TVA 12';
  F.sourceIds = ['otva', 'info12-154', 'ltva'];
}

// -----------------------------------------------------------------------------
// K2–K5 and L2–L6 — residual value terminology.
// Art. 31(3) LTVA uses "année écoulée": 1/5 per elapsed year for movable
// goods/services and 1/20 per elapsed year for immovable goods.
// Arithmetic stays unchanged because the scenarios use full calendar years.
// -----------------------------------------------------------------------------
const residualIds = ['K2', 'K3', 'K4', 'K5', 'L2', 'L3', 'L4', 'L5', 'L6'];
const residualReplacements = [
  [/Périodes fiscales prises en compte/g, 'Années écoulées prises en compte'],
  [/périodes fiscales prises en compte/g, 'années écoulées prises en compte'],
  [/Périodes fiscales/g, 'Années écoulées'],
  [/périodes fiscales/g, 'années écoulées'],
  [/Période fiscale/g, 'Année écoulée'],
  [/période fiscale/g, 'année écoulée'],
  [/vingt périodes/g, 'vingt ans'],
  [/deux périodes à 20 %/g, 'deux années écoulées à 20 %'],
  [/Deux périodes à 20 %/g, 'Deux années écoulées à 20 %'],
  [/trois périodes à 5 %/g, 'trois années écoulées à 5 %'],
  [/Trois périodes à 5 %/g, 'Trois années écoulées à 5 %'],
  [/1\/5 par période\b/g, '1/5 par année écoulée'],
  [/1\/20 par période\b/g, '1/20 par année écoulée'],
  [/20 % par période\b/g, '20 % par année écoulée'],
  [/5 % par période\b/g, '5 % par année écoulée']
];

for (const id of residualIds) {
  const c = byId(id);
  if (c) {
    replaceStringsDeep(c, residualReplacements);
    if (id.startsWith('K')) {
      c.legal = 'Art. 31, al. 3, et art. 37 LTVA · art. 79 OTVA · pratique AFC applicable aux changements de méthode dès 2025 · ch. 415';
    } else {
      c.legal = 'Art. 32 et art. 31, al. 3, LTVA · art. 37 LTVA · art. 81 OTVA · pratique AFC applicable aux changements de méthode dès 2025 · ch. 410';
    }
    uniquePush(c.sourceIds, 'ltva');
    uniquePush(c.sourceIds, 'otva');
  }
}

for (const key of Object.keys(TRANSITION_WORKSHEETS || {})) {
  if (residualIds.includes(key)) replaceStringsDeep(TRANSITION_WORKSHEETS[key], residualReplacements);
}

// L6: explicit immovable rule.
const L6 = byId('L6');
if (L6) {
  L6.title = 'Immeuble propre — valeur résiduelle sur vingt ans';
  L6.description = 'Pour un bien immobilier, la valeur résiduelle TVA est réduite linéairement de 1/20 par année écoulée. Les hypothèses doivent être strictement encadrées.';
  L6.mission = 'Calculez la part résiduelle après trois années écoulées et le montant du ch. 410.';
  L6.afcNote = 'Trois années écoulées représentent 15 % de réduction; la part résiduelle est 85 %.';
  L6.checks = (L6.checks || []).map(s => s.replace('5 % par année écoulée fiscale', '5 % par année écoulée'));
}

// -----------------------------------------------------------------------------
// L — subsidy. Make the premise explicit instead of teaching "public payment =
// subsidy". Current LTVA art. 18(3) contains an explicit legal qualification rule.
// -----------------------------------------------------------------------------
const L = byId('L');
if (L) {
  L.description = 'Une subvention ou autre contribution de droit public, dûment qualifiée dans le dossier, est déclarée séparément et n’est pas ajoutée à la contre-prestation imposable.';
  L.clientNote = 'La décision cantonale désigne expressément le versement de CHF 20’000 comme subvention / contribution de droit public. Dans les hypothèses du cas, aucune contre-prestation individualisable n’est fournie au canton en échange de ce montant.';
  const subsidy = (L.given || []).find(x => String(x.label || '').toLowerCase().includes('subvention'));
  if (subsidy) subsidy.note = 'La décision de la collectivité publique qualifie expressément ce versement comme subvention / contribution de droit public dans les hypothèses du cas.';
  L.legal = 'Art. 18, al. 2, let. a, et al. 3 LTVA · prototype AFC, section III';
  uniquePush(L.sourceIds, 'ltva');
  L.lesson = 'Ne jamais déduire la qualification du seul nom du payeur. Le cas suppose une subvention / contribution de droit public qualifiée et documentée; une contre-prestation versée par une collectivité publique suivrait son propre traitement TVA.';
}

// -----------------------------------------------------------------------------
// N — REAL correction. Current art. 77(3) OTVA prohibits option under TDFN for
// art. 21(2) nos. 1–24 and 27–31. Therefore the TDFN-specific prohibition does
// not cover nos. 25 and 26. The case uses no. 26.
// -----------------------------------------------------------------------------
const N = byId('N');
if (N) {
  N.afcNote = 'Sous TDFN, l’art. 77, al. 3, OTVA interdit l’option pour les prestations visées à l’art. 21, al. 2, ch. 1 à 24 et 27 à 31 LTVA. Les ch. 25 et 26 ne sont donc pas visés par cette interdiction spécifique. Le présent cas porte uniquement sur le ch. 26 et suppose que les autres conditions de l’option sont remplies.';
  if (Array.isArray(N.checks) && N.checks.length > 1) {
    N.checks[1] = 'Ne pas transposer ce traitement à une autre prestation exclue: contrôler l’art. 22 LTVA et l’art. 77, al. 3, OTVA. Sous TDFN, l’interdiction spécifique vise les ch. 1 à 24 et 27 à 31 de l’art. 21, al. 2, LTVA.';
  }
  if (N.questions?.[0]) {
    N.questions[0].why = 'Non. Sous TDFN, l’art. 77, al. 3, OTVA interdit l’option pour les prestations de l’art. 21, al. 2, ch. 1 à 24 et 27 à 31 LTVA. Le cas utilise le ch. 26, qui n’est pas visé par cette interdiction spécifique.';
  }
  N.legal = 'Art. 22 LTVA · art. 77, al. 3, OTVA · prototype AFC, ch. 200, 205 et 230';
  N.sourceIds = ['ltva', 'otva', 'prototype', 'info12'];
  N.lesson = 'Sous TDFN, l’option est fortement restreinte. Le ch. 26 utilisé ici n’est pas visé par l’interdiction spécifique de l’art. 77, al. 3, OTVA; cela ne dispense jamais de vérifier les conditions générales de l’option.';
}

// -----------------------------------------------------------------------------
// P — keep the signed value but explain the arithmetic instead of relying on a
// vague "practice says negative" sentence.
// -----------------------------------------------------------------------------
const P = byId('P');
if (P) {
  P.mission = 'Calculez la dette TDFN sur CHF 20’000 TTC, puis reportez la charge fiscale documentée de CHF 2’000 au ch. 415 avec le signe qui permet au calcul du décompte d’augmenter correctement la dette.';
  P.afcNote = 'Dans ce cas, la correction constitue une charge fiscale de CHF 2’000. Le ch. 415 intervient dans la zone de crédits/corrections du décompte; la saisie de CHF −2’000 conduit donc à augmenter le montant final à payer de CHF 2’000.';
  if (P.explanations?.ch415) {
    P.explanations.ch415 = 'CHF −2’000 sont saisis au ch. 415 dans les hypothèses de ce dossier. Comme cette rubrique intervient dans le calcul des crédits/corrections, le signe négatif augmente ici la dette finale de CHF 2’000.';
  }
  P.lesson = 'Le signe découle du sens fiscal de la correction et du mécanisme de calcul du formulaire. Ne jamais choisir le signe en se fondant uniquement sur l’intitulé visuel d’une rubrique.';
}

// Version marker exposed for debugging.
globalThis.__TDFN_AUDIT_PATCH__ = {
  version: '16.3.0',
  date: '2026-08-16',
  corrected: ['source hierarchy', 'N option list', 'residual-value terminology', 'subsidy premise', 'exam gate/source explanations'],
  confirmed: ['sports TDFN values currently in trainer', 'F three-period rule']
};
