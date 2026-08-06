import { CASES } from './data.js';

export const STORAGE_KEY = 'tva_tdfn_v100_state';
export const STATE_VERSION = 100;

const LEGACY_KEYED_STATES = [
  { key: 'tva_tdfn_v90_state', version: 90 }
];
const LEGACY_INDEXED_STATES = [
  { key: 'tva_tdfn_v63_state', version: 63, ids: 'ABCDEFGHIJKLMNOPQ'.split('') },
  { key: 'tva_tdfn_v61_state', version: 61, ids: 'ABCDEFGHIJKLMN'.split('') },
  { key: 'tva_tdfn_v6_state', version: 6, ids: 'ABCDEFGHIJKLMN'.split('') }
];
const V84_INDEX_IDS = ['A','B','C','D','E','F','G','H','I','J','K0','L','M','Q','R','D1','D2','D3','D4','K1','K2','K3','K4','K5','L0','L1','L2','L3','L4','L5','L6','L7'];
const LEGACY_WORKSHEET_KEYS = ['tva_tdfn_v84_transition_worksheets', 'tva_tdfn_v81_transition_worksheets'];
const STATE_GROUPS = ['steps','answers','quiz','scores','assisted','attempts','reported','finalRound','acquisitionRate','dossierOpen'];

export const publicCaseId = (caseItem) => String(caseItem?.id || caseItem?.publicId || '');
const validIds = new Set(CASES.map(publicCaseId));
const caseIndexByPublicId = (id) => CASES.findIndex((item) => publicCaseId(item) === id);
const caseIdAtIndex = (index) => publicCaseId(CASES[Number(index)]) || 'A';

export function createDefaultState() {
  return {
    version: STATE_VERSION,
    current: 0,
    currentId: publicCaseId(CASES[0]) || 'A',
    mode: 'guided',
    steps: {}, answers: {}, quiz: {}, scores: {}, assisted: {}, attempts: {}, reported: {},
    finalRound: {}, acquisitionRate: {}, dossierOpen: {}, worksheets: {}, precheck: {},
    ui: { activeModule: null }, migrations: {},
    free: { activities: [{ label: 'Activité 1', rate: 6.2 }] }
  };
}

function safeJson(raw, fallback = null) {
  try { return JSON.parse(raw); } catch { return fallback; }
}

function normalizeId(id) {
  const value = String(id || '').toUpperCase();
  if (value === 'K') return 'K0';
  return validIds.has(value) ? value : '';
}

function normalizeIdGroup(source = {}) {
  const target = {};
  for (const [key, value] of Object.entries(source || {})) {
    const direct = normalizeId(key);
    const id = direct || normalizeId(caseIdAtIndex(key));
    if (id) target[id] = value;
  }
  return target;
}

function normalizeWorksheetGroup(source = {}) {
  const target = {};
  for (const [key, value] of Object.entries(source || {})) {
    const id = normalizeId(key);
    if (id && /^K[1-5]$|^L[1-7]$/.test(id)) target[id] = value;
  }
  return target;
}

function mergeCurrentState(raw) {
  const base = createDefaultState();
  if (!raw || Number(raw.version) !== STATE_VERSION) return base;
  const requestedId = normalizeId(raw.currentId) || normalizeId(caseIdAtIndex(raw.current)) || base.currentId;
  const current = caseIndexByPublicId(requestedId);
  const merged = {
    ...base, ...raw,
    version: STATE_VERSION,
    current: current >= 0 ? current : 0,
    currentId: current >= 0 ? requestedId : base.currentId,
    worksheets: { ...base.worksheets, ...normalizeWorksheetGroup(raw.worksheets) },
    precheck: { ...base.precheck, ...(raw.precheck || {}) },
    ui: { ...base.ui, ...(raw.ui || {}) },
    migrations: { ...base.migrations, ...(raw.migrations || {}) },
    free: { ...base.free, ...(raw.free || {}) }
  };
  for (const group of STATE_GROUPS) merged[group] = normalizeIdGroup(raw[group]);
  return merged;
}

function migrateKeyedState(raw, sourceKey) {
  const migrated = createDefaultState();
  const requestedId = normalizeId(raw.currentId) || normalizeId(caseIdAtIndex(raw.current));
  const index = caseIndexByPublicId(requestedId);
  migrated.current = index >= 0 ? index : 0;
  migrated.currentId = index >= 0 ? requestedId : migrated.currentId;
  migrated.mode = raw.mode === 'portal' ? 'portal' : 'guided';
  for (const group of STATE_GROUPS) migrated[group] = normalizeIdGroup(raw[group]);
  migrated.worksheets = normalizeWorksheetGroup(raw.worksheets);
  migrated.precheck = raw.precheck && typeof raw.precheck === 'object' ? raw.precheck : {};
  migrated.ui = { ...migrated.ui, ...(raw.ui || {}) };
  migrated.free = { ...migrated.free, ...(raw.free || {}) };
  migrated.migrations[sourceKey] = new Date().toISOString();
  return migrated;
}

function mapIndexedGroup(source = {}, ids = []) {
  const target = {};
  for (const [legacyIndex, value] of Object.entries(source || {})) {
    const id = normalizeId(ids[Number(legacyIndex)]);
    if (id) target[id] = value;
  }
  return target;
}

function looksLikeV84(raw) {
  if (raw?.v8TransitionMigrated) return true;
  const groups = ['answers','quiz','scores','steps'];
  return groups.some((group) => Object.keys(raw?.[group] || {}).some((key) => Number(key) >= 14));
}

function migrateIndexedState(raw, legacy) {
  const ids = legacy.key === 'tva_tdfn_v61_state' && looksLikeV84(raw) ? V84_INDEX_IDS : legacy.ids;
  const migrated = createDefaultState();
  const requestedId = normalizeId(ids[Number(raw.current)] || 'A');
  const current = caseIndexByPublicId(requestedId);
  migrated.current = current >= 0 ? current : 0;
  migrated.currentId = current >= 0 ? requestedId : migrated.currentId;
  migrated.mode = raw.mode === 'portal' ? 'portal' : 'guided';
  for (const group of STATE_GROUPS) migrated[group] = mapIndexedGroup(raw[group], ids);
  // L’ancien cas K ne valide jamais le nouveau module K0.
  delete migrated.scores.K0; delete migrated.answers.K0; delete migrated.quiz.K0; delete migrated.assisted.K0;
  migrated.free = { ...migrated.free, ...(raw.free || {}) };
  migrated.migrations[legacy.key] = new Date().toISOString();
  return migrated;
}

function mergeLegacyWorksheets(target) {
  for (const key of LEGACY_WORKSHEET_KEYS) {
    const raw = safeJson(localStorage.getItem(key) || '{}', {});
    const normalized = normalizeWorksheetGroup(raw);
    if (Object.keys(normalized).length) {
      target.worksheets = { ...normalized, ...(target.worksheets || {}) };
      target.migrations[key] = new Date().toISOString();
    }
  }
  return target;
}

function loadInitialState() {
  const current = safeJson(localStorage.getItem(STORAGE_KEY) || 'null');
  if (current?.version === STATE_VERSION) return mergeCurrentState(current);

  for (const legacy of LEGACY_KEYED_STATES) {
    const raw = safeJson(localStorage.getItem(legacy.key) || 'null');
    if (raw?.version === legacy.version) return mergeLegacyWorksheets(migrateKeyedState(raw, legacy.key));
  }
  for (const legacy of LEGACY_INDEXED_STATES) {
    const raw = safeJson(localStorage.getItem(legacy.key) || 'null');
    if (raw?.version === legacy.version) return mergeLegacyWorksheets(migrateIndexedState(raw, legacy));
  }
  return mergeLegacyWorksheets(createDefaultState());
}

export const state = loadInitialState();

export function saveState() {
  state.version = STATE_VERSION;
  state.currentId = publicCaseId(CASES[state.current]) || state.currentId || 'A';
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

export function replaceState(nextState) {
  const replacement = mergeCurrentState(nextState);
  for (const key of Object.keys(state)) delete state[key];
  Object.assign(state, replacement);
  saveState();
  return state;
}

export function resetAllState() {
  const fresh = createDefaultState();
  for (const key of Object.keys(state)) delete state[key];
  Object.assign(state, fresh);
  try {
    localStorage.removeItem(STORAGE_KEY);
    for (const key of LEGACY_WORKSHEET_KEYS) localStorage.removeItem(key);
  } catch {}
  saveState();
  return state;
}

export function clearCaseState(index) {
  const id = publicCaseId(CASES[index]);
  for (const group of STATE_GROUPS) delete state[group][id];
  delete state.worksheets[id];
  delete state.precheck[id];
  if (CASES[index]?.type === 'free') state.free = createDefaultState().free;
  saveState();
}

// Persiste immédiatement le schéma intégré, y compris après migration.
saveState();
