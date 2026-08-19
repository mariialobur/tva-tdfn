import assert from 'node:assert/strict';
import { CASES, OFFICIAL_SOURCES } from '../data.js';
import { computeCalculator, computeDeclaration, closeEnough } from '../logic.js';
import fs from 'node:fs';

const scored=CASES.filter(c=>!c.excludeFromProgress);
assert.equal(CASES.length,44);
assert.equal(scored.length,43);
assert.equal(new Set(CASES.map(c=>c.id)).size,CASES.length);
const sourceIds=new Set(OFFICIAL_SOURCES.map(s=>s.id));
for(const c of CASES) for(const id of c.sourceIds||[]) assert.ok(sourceIds.has(id),c.id+': '+id);

const d4=CASES.find(c=>c.id==='D4'); assert.match(d4.lesson,/n’est pas ignorée/i); assert.match(d4.lesson,/art\. 88/i);
const f=CASES.find(c=>c.id==='F'); assert.match(f.description,/trois périodes fiscales précédentes/i);
const n=CASES.find(c=>c.id==='N'); assert.match(n.questions[0].why,/ch\. 1 à 24 et 27 à 31/i); assert.match(n.questions[1].why,/ch\. 26/i);
const d=CASES.find(c=>c.id==='D'); assert.deepEqual(d.rates.map(r=>r.rate),[2.1,3.7,4.5]); assert.match(d.afcNote,/déjà attribués/i);
const d1=CASES.find(c=>c.id==='D1'); assert.deepEqual(d1.rates.map(r=>r.rate),[0.6,1.3,3.7,4.5]); assert.match(d1.afcNote,/déjà attribués/i);

const calcCase={rates:[{label:'A',rate:3.7},{label:'B',rate:4.5}]};
const calc=computeCalculator(calcCase,{r0base:'50000',r1base:'10000'});
assert.equal(calc.base,60000); assert.equal(calc.tax,2300);
const dec=computeDeclaration(calcCase,{ch200:'60000'},calc,false);
assert.ok(closeEnough(dec.ch299,60000)); assert.ok(closeEnough(dec.ch379,60000)); assert.ok(closeEnough(dec.ch399,2300));

const finalV4=fs.readFileSync(new URL('../tdfn-final-v4.js',import.meta.url),'utf8');
assert.match(finalV4,/const EXAM_SIZE=15/);
assert.match(finalV4,/const PASS_SCORE=12/);
assert.match(finalV4,/tva_tdfn_final_evaluation_v4_blueprint/);
assert.match(finalV4,/International & opérations particulières/);
assert.match(finalV4,/foreign-acquisition/);
assert.match(finalV4,/export-treatment/);
const q=[...finalV4.matchAll(/\{id:'([^']+)'/g)].map(m=>m[1]);
assert.ok(q.length>=28,`Banque v4 insuffisante: ${q.length}`);
assert.equal(new Set(q).size,q.length,'IDs de questions v4 uniques.');
const blueprintCounts=[...finalV4.matchAll(/count:(\d+)/g)].map(m=>Number(m[1]));
assert.equal(blueprintCounts.reduce((a,b)=>a+b,0),15,'Le blueprint doit tirer exactement 15 questions.');

const plan=fs.readFileSync(new URL('../tdfn-plan.js',import.meta.url),'utf8');
assert.match(plan,/Plan de spécialisation TDFN/);
assert.match(plan,/44 cas · 43 étapes évaluées \+ 1 atelier libre/);
assert.match(plan,/tdfn-final-v4\.js/);

const store=fs.readFileSync(new URL('../store.js',import.meta.url),'utf8');
assert.match(store,/removeItem\('tva_tdfn_final_evaluation_v4_blueprint'\)/);
console.log('Unit tests: OK — TDFN 44 cas, Plan, examen v4 15 questions / seuil 12.');
