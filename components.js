const registry = new Map();

export function defineComponent(name, renderer) {
  if (!name || typeof renderer !== 'function') throw new TypeError('Component name and renderer are required.');
  registry.set(name, renderer);
}

export function componentMarkup(name, props = {}) {
  const renderer = registry.get(name);
  if (!renderer) throw new Error(`Unknown component: ${name}`);
  return renderer(props);
}

export function mountComponent(name, root, props = {}) {
  if (!root) return;
  root.innerHTML = componentMarkup(name, props);
}

const h = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
}[char]));

export const PRECHECK_DETAILS = {
  authorization: {
    title: 'Méthode de décompte et date d’effet confirmées dans le dossier AFC',
    verify: 'Contrôler le profil AFC applicable à la période. Lors d’un changement de méthode, rapprocher la demande, la confirmation ou le statut du Portail AFC avec la date d’effet retenue dans le décompte.',
    documents: 'Profil de décompte dans le Portail AFC, demande de changement, confirmation AFC et correspondance relative à la date d’effet.',
    alert: 'Un calcul plus favorable ou une décision interne ne suffit pas: la méthode effectivement applicable à la période doit être établie.'
  },
  rates: {
    title: 'Activités et TDFN concordants avec le profil AFC ou documentés comme taux supplémentaire',
    verify: 'Comparer chaque activité réellement exercée avec les TDFN déjà attribués. Pour une nouvelle activité, documenter la classification et le taux supplémentaire déclaré, sous réserve du contrôle ultérieur de l’AFC.',
    documents: 'Profil AFC, ventilation des comptes de produits, contrats, factures, descriptifs de prestations et note de qualification.',
    alert: 'Un taux supplémentaire ne se choisit pas par simple ressemblance avec une profession voisine.'
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
    title: 'Exhaustivité du ch. 200 contrôlée',
    verify: 'Rapprocher le ch. 200 avec les comptes de produits et expliquer chaque différence.',
    documents: 'Balance générale, grand livre des produits, journaux de ventes et tableau de concordance.',
    alert: 'Une opération déduite plus bas dans le formulaire doit souvent être comprise d’abord au ch. 200.'
  },
  foreignPlace: {
    title: 'Prestations avec lieu à l’étranger analysées',
    verify: 'Déterminer le lieu de la prestation selon sa nature et distinguer le ch. 221 des exportations de biens au ch. 220.',
    documents: 'Contrats, factures, statut du client, preuve du lieu d’exécution et analyse de l’art. 8 LTVA.',
    alert: 'Un client étranger ne place pas automatiquement la prestation à l’étranger.'
  },
  evidence: {
    title: 'Exportations et autres déductions appuyées par des justificatifs',
    verify: 'Contrôler que chaque déduction possède une base juridique et une preuve conservée dans le dossier.',
    documents: 'Documents douaniers, preuves d’exportation, contrats, notes de crédit et pièces de la procédure de déclaration.',
    alert: 'Une déduction correcte arithmétiquement peut être refusée si la preuve est insuffisante.'
  },
  acquisitions: {
    title: 'Prestations acquises à l’étranger contrôlées',
    verify: 'Rechercher les services de fournisseurs étrangers sans TVA suisse et calculer séparément le ch. 383.',
    documents: 'Factures étrangères, contrats SaaS, relevés de cartes, comptes de charges et justificatif du taux légal.',
    alert: 'L’achat étranger n’entre pas au ch. 200, mais peut générer un impôt sur les acquisitions.'
  },
  concordance: {
    title: 'Concordance ch. 299 = ch. 379 vérifiée',
    verify: 'Après ventilation par activité, contrôler que la base totale du calcul TDFN correspond au chiffre d’affaires imposable.',
    documents: 'Tableau de ventilation, calcul TDFN et copie ou export du décompte.',
    alert: 'Un écart signale généralement une activité oubliée, une déduction mal reportée ou un calcul obsolète.'
  },
  special: {
    title: 'Opérations particulières et corrections examinées',
    verify: 'Passer en revue subventions, dividendes, procédure de déclaration, valeurs résiduelles, notes de crédit et erreurs antérieures.',
    documents: 'Décisions, procès-verbaux, contrats de transfert, inventaires, tableaux de valeurs résiduelles et rectificatifs.',
    alert: 'Ces opérations peuvent relever de rubriques ou procédures distinctes.'
  }
};

export const CASE_PRECHECK_PRIORITIES = {
  A: ['authorization', 'grossNet'], B: ['grossNet'], C: ['rates', 'grossNet'],
  D: ['rates', 'concordance'], D1: ['rates', 'concordance'], D2: ['rates', 'concordance'], D3: ['rates', 'turnover', 'evidence', 'concordance'], D4: ['rates'],
  E: ['rates'], F: ['rates'], G: ['turnover', 'evidence'], H: ['foreignPlace', 'turnover'], I: ['acquisitions'], J: ['authorization', 'rates'],
  K0: ['authorization', 'special'], K1: ['special'], K2: ['special'], K3: ['special', 'evidence'], K4: ['special'], K5: ['special'],
  L0: ['authorization', 'special'], L1: ['special'], L2: ['special'], L3: ['special', 'evidence'], L4: ['special'], L5: ['special'], L6: ['special', 'evidence'], L7: ['special', 'evidence'],
  L: ['special'], M: ['special'], N: ['authorization', 'turnover'], O: ['evidence', 'turnover'], P: ['special'], Q: [], R: ['special', 'turnover']
};

defineComponent('precheck', ({ checked = {}, priorities = [] }) => {
  const prioritySet = new Set(priorities);
  const checkedCount = Object.keys(PRECHECK_DETAILS).filter((key) => Boolean(checked[key])).length;
  const totalCount = Object.keys(PRECHECK_DETAILS).length;
  return `<div class="precheck-tools">
    <div><strong>Priorités de ce cas</strong><span>${priorities.length ? priorities.map((key) => h(PRECHECK_DETAILS[key]?.title)).join(' · ') : 'Contrôle général du dossier'}</span><small class="precheck-count" data-precheck-count>${checkedCount} / ${totalCount} contrôles marqués</small></div>
    <div><button class="btn small" type="button" data-action="precheck-open-all">Tout ouvrir</button><button class="btn small" type="button" data-action="precheck-close-all">Tout fermer</button></div>
  </div><div class="precheck-list">${Object.entries(PRECHECK_DETAILS).map(([key, detail]) => {
    const inputId = `precheck-${key}`;
    const panelId = `precheck-panel-${key}`;
    return `<article class="precheck-accordion ${prioritySet.has(key) ? 'precheck-accordion--priority' : ''}" data-precheck-panel="${key}">
      <div class="precheck-accordion__row">
        <label class="precheck-accordion__check" for="${inputId}"><input id="${inputId}" type="checkbox" data-precheck="${key}" ${checked[key] ? 'checked' : ''}><span>${h(detail.title)}</span>${prioritySet.has(key) ? '<em>Priorité</em>' : ''}</label>
        <button class="precheck-accordion__toggle" type="button" data-action="toggle-precheck-detail" data-key="${key}" aria-expanded="false" aria-controls="${panelId}">Détails</button>
      </div>
      <div class="precheck-accordion__body" id="${panelId}" role="region" aria-labelledby="${inputId}" hidden>
        <div class="precheck-detail-row"><strong>À vérifier</strong><p>${h(detail.verify)}</p></div>
        <div class="precheck-detail-row"><strong>Pièces utiles</strong><p>${h(detail.documents)}</p></div>
        <div class="precheck-detail-row precheck-detail-alert"><strong>Signal d’alerte</strong><p>${h(detail.alert)}</p></div>
      </div>
    </article>`;
  }).join('')}</div>`;
});

defineComponent('navigation', ({ modules = [], activeModule = 0, currentId = '', statuses = {} }) => {
  const currentModule = modules[activeModule] || modules[0] || { ids: [] };
  return `<section class="path-panel">
    <div class="path-panel__head"><div><span>Parcours TDFN</span><strong>${h(currentModule?.label || '')}</strong></div></div>
    <label class="module-picker"><span>Module</span><select data-module-select aria-label="Choisir un module">${modules.map((module, index) => `<option value="${index}" ${index === activeModule ? 'selected' : ''}>${h(module.label)}</option>`).join('')}</select></label>
    <div class="current-module" aria-label="Cas du module actuel">${(currentModule?.ids || []).map((id) => `<button type="button" class="case-link ${id === currentId ? 'active' : ''}" data-public-case="${h(id)}"><span>${h(id)}</span><b>${h(statuses[id]?.title || id)}</b>${statuses[id]?.status ? `<em>${h(statuses[id].status)}</em>` : ''}</button>`).join('')}</div>
    <div class="case-arrows"><button type="button" data-action="previous">← Précédent</button><button type="button" data-action="next">Suivant →</button></div>
  </section>`;
});

defineComponent('worksheet', ({ publicId = '', model, value = {}, feedback = {} }) => {
  if (!model) return '';
  const reverse = Boolean(model.showEligibility);
  const title = reverse ? 'Tableau de dégrèvement ultérieur' : 'Tableau de correction de la valeur résiduelle';
  const instruction = reverse ? 'Construisez la déduction avant de répondre' : 'Construisez la correction avant de répondre';
  const yesLabel = reverse ? 'À déduire' : 'À corriger';
  const noLabel = reverse ? 'Pas de déduction' : 'Pas de correction';
  const amountLabel = reverse ? 'Déduction CHF' : 'Correction CHF';
  const formula = reverse
    ? 'Impôt grevant documenté × part résiduelle × part ouvrant droit = déduction au ch. 410'
    : 'Impôt préalable admis × part résiduelle = correction au ch. 415';
  const colSpan = reverse ? 4 : 3;
  const documentChecklist = Array.isArray(model.documents) && model.documents.length
    ? `<details class="transition-documents"><summary>Pièces à réunir pour ce dossier</summary><ul>${model.documents.map((item) => `<li>${h(item)}</li>`).join('')}</ul></details>`
    : '';
  return `<section class="transition-worksheet ${reverse ? 'transition-worksheet--reverse' : ''}" aria-labelledby="transitionWorksheetTitle-${h(publicId)}">
    <div class="transition-worksheet__head"><div><p class="eyebrow">Tableau de transition</p><h3 id="transitionWorksheetTitle-${h(publicId)}">${h(title)}</h3><p>${h(model.destination)} · ${h(model.direction)}</p></div><button class="btn small" type="button" data-action="clear-worksheet">Effacer</button></div>
    <div class="transition-formula" role="note"><strong>${h(instruction)}</strong><span>${h(formula)}</span></div>
    <div class="transition-table-wrap"><table class="transition-table ${reverse ? 'has-eligibility' : ''}"><thead><tr><th>Élément</th><th>Traitement</th><th>Part résiduelle</th>${reverse ? '<th>Part ouvrant droit</th>' : ''}<th>${h(amountLabel)}</th></tr></thead><tbody>${model.lines.map((line) => {
      const row = value[line.id] || {};
      const status = feedback[line.id];
      return `<tr data-worksheet-row="${h(line.id)}" class="${status === true ? 'is-correct' : status === false ? 'is-error' : ''}">
        <td><strong>${h(line.label)}</strong><small>${h(line.base)}</small></td>
        <td><select data-worksheet-field="treatment" data-line-id="${h(line.id)}"><option value="">Choisir</option><option value="yes" ${row.treatment === 'yes' ? 'selected' : ''}>${h(yesLabel)}</option><option value="no" ${row.treatment === 'no' ? 'selected' : ''}>${h(noLabel)}</option></select></td>
        <td><label><span class="sr-only">Part résiduelle ${h(line.label)}</span><input type="text" inputmode="decimal" data-worksheet-field="residual" data-line-id="${h(line.id)}" value="${h(row.residual ?? '')}"><span>%</span></label></td>
        ${reverse ? `<td><label><span class="sr-only">Part ouvrant droit ${h(line.label)}</span><input type="text" inputmode="decimal" data-worksheet-field="eligibility" data-line-id="${h(line.id)}" value="${h(row.eligibility ?? '')}"><span>%</span></label></td>` : ''}
        <td><label><span class="sr-only">${h(amountLabel)} ${h(line.label)}</span><input type="text" inputmode="decimal" data-worksheet-field="correction" data-line-id="${h(line.id)}" value="${h(row.correction ?? '')}"></label></td>
      </tr>`;
    }).join('')}</tbody><tfoot><tr><th colspan="${colSpan}">Total attendu dans le dossier</th><td><strong>CHF ${new Intl.NumberFormat('fr-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(model.total)}</strong></td></tr></tfoot></table></div>
    ${documentChecklist}
    <p class="transition-worksheet__note">Le tableau fait partie de l’évaluation. Les réponses au quiz ne suffisent pas si le calcul préparatoire est incorrect.</p>
  </section>`;
});
