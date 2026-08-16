import fs from 'node:fs';

const read = path => fs.readFileSync(path, 'utf8');
const write = (path, text) => { fs.mkdirSync(path.split('/').slice(0,-1).join('/') || '.', { recursive: true }); fs.writeFileSync(path, text, 'utf8'); };
const replaceOrFail = (text, from, to, label) => {
  if (!text.includes(from)) throw new Error(`Missing replacement anchor: ${label}`);
  return text.replace(from, to);
};

let evaluation = read('evaluation.js');
evaluation = replaceOrFail(evaluation,
`function saveLastResult(result) {
  const previous = loadLastResult();
  const keepPrevious = previous?.passed && (!result.passed || Number(previous.score) > Number(result.score));
  lastResult = keepPrevious ? previous : result;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(lastResult)); } catch {}
}`,
`function saveLastResult(result) {
  const previous = loadLastResult();
  const keepPrevious = previous?.passed && (!result.passed || Number(previous.score) > Number(result.score));
  lastResult = keepPrevious ? previous : result;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(lastResult)); } catch {}
  return keepPrevious;
}`,'saveLastResult');
evaluation = evaluation
  .replaceAll('étapes validées sans assistance','étapes acquises sans consultation de la solution')
  .replaceAll('étapes acquises sans assistance','étapes acquises sans consultation de la solution')
  .replaceAll('validé les étapes évaluées du parcours sans assistance','acquis les étapes évaluées du parcours sans consultation de la solution');
evaluation = replaceOrFail(evaluation,
`  layer = document.createElement('div');
  layer.id = 'tdfnExamLayer';
  layer.className = 'tdfn-exam-layer';
  layer.hidden = true;
  document.body.append(layer);`,
`  layer = document.createElement('div');
  layer.id = 'tdfnExamLayer';
  layer.className = 'tdfn-exam-layer';
  layer.setAttribute('role', 'dialog');
  layer.setAttribute('aria-modal', 'true');
  layer.setAttribute('aria-label', 'Parcours final TDFN');
  layer.hidden = true;
  document.body.append(layer);`,'exam layer semantics');
evaluation = replaceOrFail(evaluation,
`function startExam() {
  const total = scoredCases().length;
  if (completedCaseCount() < total) return;
  exam = buildExam();
  document.documentElement.classList.add('tdfn-exam-active');
  renderExam();
  window.scrollTo({ top: 0, behavior: 'auto' });
}`,
`function setExamIsolation(active) {
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
}`,'exam isolation');
evaluation = replaceOrFail(evaluation,
`function closeExamLayer() {
  document.documentElement.classList.remove('tdfn-exam-active');
  const layer = document.querySelector('#tdfnExamLayer');
  if (layer) { layer.hidden = true; layer.innerHTML = ''; }
  updateLauncher();
}`,
`function closeExamLayer() {
  document.documentElement.classList.remove('tdfn-exam-active');
  setExamIsolation(false);
  const layer = document.querySelector('#tdfnExamLayer');
  if (layer) { layer.hidden = true; layer.innerHTML = ''; }
  updateLauncher();
}`,'close isolation');
evaluation = replaceOrFail(evaluation,
`  saveLastResult(result);
  exam.submitted = true;
  renderResult(result);`,
`  result.bestResultPreserved = saveLastResult(result);
  exam.submitted = true;
  renderResult(result);`,'best result flag');
evaluation = replaceOrFail(evaluation,
`        <p>${result.passed ? `Seuil atteint (${PASS_SCORE}/${EXAM_SIZE}). L’attestation de parcours est disponible.` : `Le seuil de ${PASS_SCORE}/${EXAM_SIZE} n’est pas encore atteint. Révisez les points ci-dessous puis tentez une nouvelle série.`}</p>
        <div class="tdfn-result-actions">
          ${result.passed ? '<button class="btn primary" id="tdfnResultAttestation" type="button">Générer mon attestation</button>' : ''}`,
`        <p>${result.passed ? `Seuil atteint (${PASS_SCORE}/${EXAM_SIZE}). L’attestation de parcours est disponible.` : `Le seuil de ${PASS_SCORE}/${EXAM_SIZE} n’est pas encore atteint. Révisez les points ci-dessous puis tentez une nouvelle série.`}</p>
        ${result.bestResultPreserved ? `<p class="tdfn-best-result"><strong>Meilleur résultat conservé :</strong> ${lastResult.score} / ${lastResult.total}. L’attestation reste liée à ce meilleur résultat enregistré localement.</p>` : ''}
        <div class="tdfn-result-actions">
          ${lastResult?.passed ? '<button class="btn primary" id="tdfnResultAttestation" type="button">Générer mon attestation</button>' : ''}`,'best result message');
evaluation = replaceOrFail(evaluation,
`  layer.hidden = false;
  layer.innerHTML = ` + '`' + `
    <main class="tdfn-exam-shell tdfn-name-shell">`,
`  layer.hidden = false;
  setExamIsolation(true);
  layer.innerHTML = ` + '`' + `
    <main class="tdfn-exam-shell tdfn-name-shell">`,'attestation isolation');
evaluation = evaluation.replace("evaluationVersion: '17.2.0-audited'", "evaluationVersion: '17.2.1-hardened'");
write('evaluation.js', evaluation);

let app = read('app.js');
app = replaceOrFail(app,
`    text: 'Plus de deux TDFN peuvent désormais être appliqués. Pour une activité concernée, le seuil déterminant est strictement supérieur à 10 % du chiffre d’affaires total imposable; l’ancienne règle spéciale à 50 % des branches mixtes a été supprimée.',`,
`    text: 'Plus de deux TDFN peuvent désormais être appliqués. La règle des 10 % reste déterminante, mais son appréciation dépend de la situation de l’assujetti selon l’art. 86 OTVA: chiffres d’affaires escomptés des douze premiers mois pour un nouvel assujetti ou une nouvelle activité, et trois périodes fiscales précédentes pour un assujetti déjà établi. Le module suivant traite ces conditions en détail.',`,'10 percent intro');
write('app.js', app);

let data = read('data.js');
data = replaceOrFail(data,
`    "afcNote": "TDFN contrôlés dans l’ordonnance AFC RS 641.202.62 en vigueur dès 2025: commerce d’articles de sport hors vêtements 2,1 %, location 3,7 % et services/réparations sur articles de sport 4,5 %. La dette totale du cas est CHF 8’700; le taux moyen résultant de 2,90 % est un indicateur de synthèse, jamais un TDFN à appliquer.",`,
`    "afcNote": "Dans les hypothèses du cas, les trois TDFN indiqués sont déjà attribués à l’entreprise. Valeurs contrôlées dans l’ordonnance AFC RS 641.202.62 en vigueur dès 2025: commerce d’articles de sport hors vêtements 2,1 %, location 3,7 % et services/réparations sur articles de sport 4,5 %. La dette totale du cas est CHF 8’700; le taux moyen résultant de 2,90 % est un indicateur de synthèse, jamais un TDFN à appliquer.",`,'D authorization');
data = replaceOrFail(data,
`    "afcNote": "Les TDFN utilisés correspondent aux activités 2025 de la liste AFC: véhicules neufs 0,6 %, pneus 1,3 %, réparations/électricité 3,7 %, carrosserie/peinture 4,5 %.",`,
`    "afcNote": "Dans les hypothèses du cas, ces quatre TDFN sont déjà attribués à l’entreprise. Les valeurs correspondent aux activités 2025 de la liste normative AFC: véhicules neufs 0,6 %, pneus 1,3 %, réparations/électricité 3,7 %, carrosserie/peinture 4,5 %.",`,'D1 authorization');
data = data.replaceAll('"tag": "1 période"','"tag": "1 année"').replaceAll('une année écoulée écoulée','une année écoulée');
write('data.js', data);

let html = read('index.html');
const ratesWarning = `<p class="memo-warning"><strong>À ne pas confondre:</strong> ces montants sont des repères d’entrée liés à la limite d’impôt de CHF 108’000. Pour la valeur exacte d’un TDFN par branche ou activité, la référence normative est l’ordonnance AFC RS 641.202.62.</p>`;
html = replaceOrFail(html, ratesWarning, `${ratesWarning}\n      <p class="memo-source-caution"><strong>Contrôle de source:</strong> lorsqu’un exemple récapitulatif AFC et la liste normative détaillée ne présentent pas la même valeur pour une activité, ce mémo retient la valeur de l’ordonnance AFC RS 641.202.62 et invite à contrôler la pratique officielle en vigueur. C’est notamment important pour certains exemples «articles de sport» publiés autour de la réforme 2025.</p>`, 'sports source conflict');
html = html.replace('styles.css?v=16.4.0','styles.css?v=16.4.1').replace('app.js?v=16.3.0','app.js?v=16.4.1').replace('evaluation.js?v=17.2.0','evaluation.js?v=17.2.1');
html = html.replace('Mise à jour : 16.08.2026 · mémo professionnel enrichi et contenu fiscal contrôlé sur les sources principales.','Mise à jour : 16.08.2026 · v16.4.1 hardening · sources principales revues le 16.08.2026.');
write('index.html', html);

let store = read('store.js');
store = replaceOrFail(store,
`    localStorage.removeItem(STORAGE_KEY);
    for (const key of LEGACY_WORKSHEET_KEYS) localStorage.removeItem(key);`,
`    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('tva_tdfn_final_evaluation_v3_audited');
    for (const key of LEGACY_WORKSHEET_KEYS) localStorage.removeItem(key);`,'reset final evaluation');
write('store.js', store);

let readme = read('README.md');
readme = readme.replace('**12 questions** tirées aléatoirement d’une banque de 18 ;','**12 questions** tirées aléatoirement d’une banque de questions auditée ;');
readme = readme.replace('validé les 43 étapes évaluées sans assistance','acquis les 43 étapes évaluées sans consultation de la solution');
readme = readme.replace('**Revue des sources principales : 12.08.2026**','**Revue des sources principales : 16.08.2026**');
readme = readme.replace('Le nom utilisé pour préparer l’attestation reste local au module de génération du document.','Le nom utilisé pour préparer l’attestation reste local au module de génération du document. Le résultat et l’identité ne sont pas vérifiables par un tiers auprès du site: aucun registre serveur des attestations n’est tenu.');
write('README.md', readme);

let evalCss = read('evaluation.css');
if (!evalCss.includes('.tdfn-best-result{')) evalCss += '\n.tdfn-best-result{margin:12px 0 0;padding:10px 12px;border:1px solid #cbdde3;border-radius:10px;background:#f3f8f9;color:#385762;font-size:.9rem}\n';
write('evaluation.css', evalCss);

const pkg = JSON.parse(read('package.json'));
pkg.version = '16.4.1';
write('package.json', JSON.stringify(pkg, null, 2) + '\n');

write('tests/unit.mjs', `import assert from 'node:assert/strict';
import { CASES, OFFICIAL_SOURCES } from '../data.js';
import { computeCalculator, computeDeclaration, closeEnough } from '../logic.js';
import fs from 'node:fs';
const scored=CASES.filter(c=>!c.excludeFromProgress);
assert.equal(CASES.length,44); assert.equal(scored.length,43); assert.equal(new Set(CASES.map(c=>c.id)).size,CASES.length);
const sourceIds=new Set(OFFICIAL_SOURCES.map(s=>s.id)); for(const c of CASES) for(const id of c.sourceIds||[]) assert.ok(sourceIds.has(id),c.id+': '+id);
const d4=CASES.find(c=>c.id==='D4'); assert.match(d4.lesson,/n’est pas ignorée/i); assert.match(d4.lesson,/art\\. 88/i);
const f=CASES.find(c=>c.id==='F'); assert.match(f.description,/trois périodes fiscales précédentes/i);
const n=CASES.find(c=>c.id==='N'); assert.match(n.questions[0].why,/ch\\. 1 à 24 et 27 à 31/i); assert.match(n.questions[1].why,/ch\\. 26/i);
const d=CASES.find(c=>c.id==='D'); assert.deepEqual(d.rates.map(r=>r.rate),[2.1,3.7,4.5]); assert.match(d.afcNote,/déjà attribués/i);
const d1=CASES.find(c=>c.id==='D1'); assert.deepEqual(d1.rates.map(r=>r.rate),[0.6,1.3,3.7,4.5]); assert.match(d1.afcNote,/déjà attribués/i);
const calcCase={rates:[{label:'A',rate:3.7},{label:'B',rate:4.5}]}; const calc=computeCalculator(calcCase,{r0base:'50000',r1base:'10000'}); assert.equal(calc.base,60000); assert.equal(calc.tax,2300);
const dec=computeDeclaration(calcCase,{ch200:'60000'},calc,false); assert.ok(closeEnough(dec.ch299,60000)); assert.ok(closeEnough(dec.ch379,60000)); assert.ok(closeEnough(dec.ch399,2300));
const e=fs.readFileSync(new URL('../evaluation.js',import.meta.url),'utf8'); assert.match(e,/const EXAM_SIZE = 12/); assert.match(e,/const PASS_SCORE = 9/); assert.match(e,/sans consultation de la solution/); assert.doesNotMatch(e,/étapes validées sans assistance/); const q=[...e.matchAll(/\\n\\s+id: '([^']+)'/g)].map(m=>m[1]); assert.ok(q.length>=20); assert.equal(new Set(q).size,q.length);
const s=fs.readFileSync(new URL('../store.js',import.meta.url),'utf8'); assert.match(s,/removeItem\\('tva_tdfn_final_evaluation_v3_audited'\\)/);
console.log('Unit tests: OK');
`);

write('tests/e2e.spec.mjs', `import { test, expect } from '@playwright/test';
test('trainer and memo', async({page})=>{await page.goto('/'); await expect(page).toHaveTitle(/TDFN/); const onboarding=page.locator('#onboardingDialog'); if(await onboarding.isVisible()) await page.getByRole('button',{name:/Commencer par l’admissibilité/}).click(); await page.getByRole('button',{name:'Aide'}).click(); await expect(page.getByRole('heading',{name:'Mémo professionnel TDFN'})).toBeVisible(); await expect(page.getByText('Pièges fréquents')).toBeVisible();});
test('final launcher honest gate', async({page})=>{await page.goto('/'); const l=page.locator('#tdfnFinalEvaluation'); await expect(l).toBeVisible(); await expect(l).toContainText('sans consultation de la solution'); await expect(page.locator('#tdfnStartExam')).toBeDisabled();});
test('no duplicate ids', async({page})=>{await page.goto('/'); const d=await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(e=>e.id); return ids.filter((id,i)=>ids.indexOf(id)!==i)}); expect(d).toEqual([]);});
`);

write('smoke-test.mjs', `import assert from 'node:assert/strict'; import {readFile,access} from 'node:fs/promises';
for(const f of ['index.html','styles.css','evaluation.css','data.js','logic.js','store.js','app.js','evaluation.js','package.json','playwright.config.mjs','tests/unit.mjs','tests/e2e.spec.mjs','.github/workflows/quality.yml']) await access(new URL('./'+f,import.meta.url));
const [h,a,e,d,r,p]=await Promise.all(['index.html','app.js','evaluation.js','data.js','README.md','package.json'].map(f=>readFile(new URL('./'+f,import.meta.url),'utf8'))); assert.match(h,/styles\\.css\\?v=16\\.4\\.1/); assert.match(h,/app\\.js\\?v=16\\.4\\.1/); assert.match(h,/evaluation\\.js\\?v=17\\.2\\.1/); assert.match(h,/sources principales revues le 16\\.08\\.2026/); assert.match(h,/Contrôle de source:/); assert.doesNotMatch(h,/audit-fixes\\.js/); assert.match(a,/douze premiers mois/); assert.match(a,/trois périodes fiscales précédentes/); assert.match(e,/aria-modal/); assert.match(e,/setExamIsolation/); assert.match(e,/Meilleur résultat conservé/); assert.match(d,/déjà attribués à l’entreprise/); assert.doesNotMatch(d,/année écoulée écoulée/); assert.match(r,/banque de questions auditée/); assert.match(r,/Revue des sources principales : 16\\.08\\.2026/); assert.equal(JSON.parse(p).version,'16.4.1'); console.log('Smoke test: OK');
`);

write('.github/workflows/quality.yml', `name: Quality
on:
  pull_request:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: npm install
      - run: npx playwright install --with-deps chromium
      - run: npm test
`);

console.log('Hardening script applied.');
