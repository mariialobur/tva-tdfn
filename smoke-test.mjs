import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';

const required=['index.html','styles.css','evaluation.css','data.js','logic.js','store.js','app.js','evaluation.js','tdfn-plan.js','tdfn-plan.css','tdfn-final-v4.js','package.json','playwright.config.mjs','tests/unit.mjs','tests/e2e.spec.mjs','tests/accessibility.spec.mjs','tests/visual.spec.mjs','.github/workflows/quality.yml'];
for(const f of required) await access(new URL('./'+f,import.meta.url));
for(const f of ['app.js','store.js','transition.js','tdfn-plan.js','tdfn-final-v4.js','evaluation.js']) execFileSync(process.execPath,['--check',new URL('./'+f,import.meta.url).pathname],{stdio:'pipe'});

const [h,a,d,p,plan,finalV4]=await Promise.all(['index.html','app.js','data.js','package.json','tdfn-plan.js','tdfn-final-v4.js'].map(f=>readFile(new URL('./'+f,import.meta.url),'utf8')));
assert.match(h,/styles\.css\?v=16\.4\.1/);
assert.match(h,/app\.js\?v=16\.4\.1/);
assert.match(a,/douze premiers mois/);
assert.match(a,/trois périodes fiscales précédentes/);
assert.match(d,/déjà attribués à l’entreprise/);
assert.match(plan,/Plan de spécialisation TDFN/);
assert.match(plan,/tdfn-final-v4\.js/);
assert.match(finalV4,/const EXAM_SIZE=15/);
assert.match(finalV4,/const PASS_SCORE=12/);
assert.match(finalV4,/foreign-acquisition/);
assert.match(finalV4,/export-treatment/);
assert.equal(JSON.parse(p).version,'18.0.0');
console.log('Smoke test: OK — TDFN Plan + assessment v4 syntax checked');
