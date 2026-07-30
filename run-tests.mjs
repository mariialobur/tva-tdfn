import assert from 'node:assert/strict';
import {CASES,DEDUCTIONS,OFFICIAL_SOURCES} from './data.js';
import {parseAmount,expectedInputMap,computeCalculator,calculatorSignature,computeDeclaration,validateCase,rateKey,universalChecks} from './logic.js';

assert.equal(parseAmount('108’100,50'),108100.5);
assert.equal(parseAmount(' 10 000 '),10000);
assert(Number.isNaN(parseAmount('abc')));
assert.equal(DEDUCTIONS.length,6);

const roundingProbe={rates:[{label:'A',rate:6.2},{label:'B',rate:6.2}]};
const roundingCalc=computeCalculator(roundingProbe,{r0base:'0.09',r1base:'0.09'});
assert(Math.abs(roundingCalc.rawTax-0.01116)<1e-12);
assert.equal(roundingCalc.tax,0.01,'Total must be rounded only after raw line taxes are summed');
assert.equal(roundingCalc.rounding,'no-intermediate-rounding');

assert.equal(CASES.length,17);
assert.equal(CASES.filter(c=>!c.excludeFromProgress).length,16);

const sourceIds=new Set(OFFICIAL_SOURCES.map(source=>source.id));
const ids=new Set();
for(const c of CASES){
  assert(!ids.has(c.id),`Duplicate case id ${c.id}`);ids.add(c.id);
  assert(c.sourceIds?.length>0,`Missing sources for ${c.id}`);
  c.sourceIds.forEach(id=>assert(sourceIds.has(id),`Unknown source ${id} in ${c.id}`));
  if(c.type==='quiz'){
    assert(c.questions.length>=3,`Quiz ${c.id} too short`);
    c.questions.forEach(q=>assert(q.answer>=0&&q.answer<q.options.length,`Invalid quiz answer ${c.id}`));
    continue;
  }
  if(c.type==='free'){
    assert.equal(c.excludeFromProgress,true);
    continue;
  }
  const expected=expectedInputMap(c);
  const filled={};
  for(const [key,value] of Object.entries(expected)) if(Math.abs(value)>0.000001) filled[key]=String(value);
  const validation=validateCase(c,filled);
  assert.equal(validation.score,100,`Expected inputs fail ${c.id}`);
  const calc=computeCalculator(c,filled);
  assert(Math.abs(calc.base-(c.rates||[]).reduce((sum,r)=>sum+r.base,0))<0.01,`Calculator base fails ${c.id}`);
  const reported={...calc,signature:calculatorSignature(c,filled)};
  const declaration=computeDeclaration(c,filled,reported,false);
  assert(Math.abs(declaration.ch299-declaration.ch379)<0.01,`Concordance fails ${c.id}`);
  const expectedTax=(c.rates||[]).reduce((sum,r)=>sum+r.tax,0)+(c.fields?.acqTax||0);
  assert(Math.abs(declaration.ch399-expectedTax)<0.02,`Tax total fails ${c.id}`);
  assert.equal(reported.signature,calculatorSignature(c,filled));
  const structure=universalChecks(c,filled,reported,{reportCurrent:true,acquisitionRate:c.fields?.acqRate||8.1});
  assert.equal(structure.allGood,true,`Universal checks fail ${c.id}: ${structure.rows.filter(r=>!r.good).map(r=>r.id).join(',')}`);
  (c.rates||[]).forEach((_,index)=>assert(parseAmount(filled[rateKey('base',index)])!==null));
}
const sport=CASES.find(c=>c.id==='D');
assert.deepEqual(sport.rates.map(r=>r.rate),[2.1,3.0,3.7,4.5]);
const change=CASES.find(c=>c.id==='K');assert.match(change.conceptualNote,/ch\. 410.*méthode effective/i);
const free=CASES.find(c=>c.id==='Q');assert.match(free.description,/confirmation écrite|profil AFC/i);
const established=CASES.find(c=>c.id==='F');
assert.match(established.period,/2025–2027/);assert.match(established.period,/2028/);
const funds=CASES.find(c=>c.id==='L');
const fundsInputs=Object.fromEntries(Object.entries(expectedInputMap(funds)).filter(([,v])=>v).map(([k,v])=>[k,String(v)]));
const fundsCalc=computeCalculator(funds,fundsInputs);
const fundsDecl=computeDeclaration(funds,fundsInputs,{...fundsCalc,signature:calculatorSignature(funds,fundsInputs)},false);
assert.equal(fundsDecl.ch900,20000);assert.equal(fundsDecl.ch910,5000);assert.equal(fundsDecl.ch299,100000);
const credit=CASES.find(c=>c.id==='M');
const creditInputs=Object.fromEntries(Object.entries(expectedInputMap(credit)).filter(([,v])=>v).map(([k,v])=>[k,String(v)]));
const creditCalc=computeCalculator(credit,creditInputs);
const creditDecl=computeDeclaration(credit,creditInputs,{...creditCalc,signature:calculatorSignature(credit,creditInputs)},false);
assert.equal(creditDecl.ch399,6200);assert.equal(creditDecl.ch479,1500);assert.equal(creditDecl.ch500,4700);assert.equal(creditDecl.ch510,0);
const optionCase=CASES.find(c=>c.id==='N');
assert.equal(optionCase.type,'quiz');
assert.match(optionCase.lesson,/ch\. 205/i);
const optionProbe=computeDeclaration({rates:[]},{ch200:'30000',ch205:'30000'},null,false);
assert.equal(optionProbe.ch205,30000);assert.equal(optionProbe.ch299,30000,'ch. 205 is informative and must not reduce ch. 299');
const reduction=CASES.find(c=>c.id==='O');
const reductionInputs=Object.fromEntries(Object.entries(expectedInputMap(reduction)).filter(([,v])=>v).map(([k,v])=>[k,String(v)]));
const reductionCalc=computeCalculator(reduction,reductionInputs);
const reductionDecl=computeDeclaration(reduction,reductionInputs,{...reductionCalc,signature:calculatorSignature(reduction,reductionInputs)},false);
assert.equal(reductionDecl.ch200,108100);assert.equal(reductionDecl.ch289,8100);assert.equal(reductionDecl.ch299,100000);assert.equal(reductionDecl.ch379,100000);assert.equal(reductionDecl.ch399,6200);
const favourable=CASES.find(c=>c.id==='P');
const favourableInputs=Object.fromEntries(Object.entries(expectedInputMap(favourable)).filter(([,v])=>v).map(([k,v])=>[k,String(v)]));
const favourableCalc=computeCalculator(favourable,favourableInputs);
const favourableDecl=computeDeclaration(favourable,favourableInputs,{...favourableCalc,signature:calculatorSignature(favourable,favourableInputs)},false);
assert.equal(favourableDecl.ch399,1240);assert.equal(favourableDecl.ch479,2000);assert.equal(favourableDecl.ch500,0);assert.equal(favourableDecl.ch510,760);
const favourableRounded=computeDeclaration(favourable,favourableInputs,{...favourableCalc,signature:calculatorSignature(favourable,favourableInputs)},true);
assert.equal(favourableRounded.ch510,760,'Final-round option must not alter a negative raw balance displayed at ch. 510');
const positiveRounding=computeDeclaration({rates:[]},{ch415:'0'},{base:0,tax:100.5,averageRate:0},true);
assert.equal(positiveRounding.ch500,101,'Positive ch. 500 may be rounded to francs when selected');
console.log(`OK — v6.3: 16 guided/quiz cases + 1 free workshop; ch. 205, 235, 510, calculator and concordance verified.`);
