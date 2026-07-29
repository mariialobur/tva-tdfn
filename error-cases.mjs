import assert from 'node:assert/strict';
import {CASES} from '../data.js';
import {computeCalculator,calculatorSignature,universalChecks} from '../logic.js';

const c=CASES.find(c=>c.id==='A');
let a={ch200:'100',ch220:'150',r0base:'0'};
let calc=computeCalculator(c,a);let report={...calc,signature:calculatorSignature(c,a)};
let checks=universalChecks(c,a,report,{reportCurrent:true,acquisitionRate:8.1});
assert.equal(checks.rows.find(r=>r.id==='deductions').good,false);
assert.equal(checks.rows.find(r=>r.id==='ch299').good,false);

a={ch200:'1000',r0base:'1000',acqBase:'100',acqTax:'7'};
calc=computeCalculator(c,a);report={...calc,signature:calculatorSignature(c,a)};
checks=universalChecks(c,a,report,{reportCurrent:true,acquisitionRate:8.1});
assert.equal(checks.rows.find(r=>r.id==='acquisition').good,false);

a={ch200:'1000',r0base:'900'};
calc=computeCalculator(c,a);report={...calc,signature:calculatorSignature(c,a)};
checks=universalChecks(c,a,report,{reportCurrent:true,acquisitionRate:8.1});
assert.equal(checks.rows.find(r=>r.id==='concordance').good,false);

checks=universalChecks(c,{ch200:'-1',r0base:'0'},null,{reportCurrent:false,acquisitionRate:8.1});
assert.equal(checks.rows.find(r=>r.id==='numeric').good,false);
assert.equal(checks.rows.find(r=>r.id==='report').good,false);
console.log('OK — negative, excessive deductions, acquisition mismatch, missing report and concordance errors detected.');
