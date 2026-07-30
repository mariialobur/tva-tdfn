import {DEDUCTIONS} from './data.js';

export const rateKey=(kind,index)=>`r${index}${kind}`;

export function parseAmount(value){
  if(value===null||value===undefined||String(value).trim()==='') return null;
  const normalized=String(value).trim().replace(/[’'\s]/g,'').replace(/,/g,'.');
  if(!/^-?\d+(?:\.\d+)?$/.test(normalized)) return Number.NaN;
  return Number(normalized);
}

export function amountFrom(source,key){
  const value=parseAmount(source?.[key]);
  return value===null||Number.isNaN(value)?0:value;
}

export function roundToCent(value){return Math.round((Number(value)+Number.EPSILON)*100)/100;}
export function roundToFranc(value){return Math.round(Number(value));}

export function expectedInputMap(c){
  const map={ch200:c.fields?.ch200??0,ch205:c.fields?.ch205??0};
  DEDUCTIONS.forEach(item=>{map[item.key]=c.deductions?.[item.key]??0;});
  (c.rates||[]).forEach((rate,index)=>{map[rateKey('base',index)]=rate.base??0;});
  map.acqBase=c.fields?.acqBase??0;
  map.acqTax=c.fields?.acqTax??0;
  map.ch415=c.fields?.ch415??0;
  map.ch900=c.fields?.ch900??0;
  map.ch910=c.fields?.ch910??0;
  return map;
}

export function expectedMap(c){return expectedInputMap(c);}

/**
 * The public AFC prototype exposes three rounding choices but does not publish
 * their production algorithm. The training engine therefore calculates and
 * validates only a transparent pedagogical path: no intermediate rounding
 * by activity. Raw line amounts are summed first; only the displayed total is
 * rounded to CHF 0.01.
 */
export function computeCalculator(c,source={}){
  const lines=(c.rates||[]).map((rate,index)=>{
    const base=amountFrom(source,rateKey('base',index));
    const rawTax=base*Number(rate.rate)/100;
    return {index,label:rate.label,rate:Number(rate.rate),base,rawTax,tax:rawTax,displayTax:roundToCent(rawTax)};
  });
  const base=roundToCent(lines.reduce((sum,line)=>sum+line.base,0));
  const rawTax=lines.reduce((sum,line)=>sum+line.rawTax,0);
  const tax=roundToCent(rawTax);
  const averageRate=base?rawTax/base*100:0;
  return {lines,base,tax,rawTax,averageRate,rounding:'no-intermediate-rounding'};
}

export function calculatorSignature(c,source={}){
  return JSON.stringify({
    activities:(c.rates||[]).map((rate,index)=>({label:rate.label,rate:Number(rate.rate),base:amountFrom(source,rateKey('base',index))}))
  });
}

export function computeDeclaration(c,source={},reported=null,finalRound=false){
  const ch200=amountFrom(source,'ch200');
  const ch205=amountFrom(source,'ch205');
  const deductionRows=DEDUCTIONS.map(item=>({key:item.key,code:item.code,value:amountFrom(source,item.key)}));
  const ch289=roundToCent(deductionRows.reduce((sum,row)=>sum+row.value,0));
  const ch299=roundToCent(ch200-ch289);
  const ch323Base=roundToCent(reported?.base??0);
  const ch323Tax=roundToCent(reported?.tax??0);
  const ch323Rate=Number(reported?.averageRate??0);
  const ch379=ch323Base;
  const acqBase=amountFrom(source,'acqBase');
  const acqTax=amountFrom(source,'acqTax');
  const ch399=roundToCent(ch323Tax+acqTax);
  const creditRows=[{key:'ch415',value:amountFrom(source,'ch415')}];
  const ch415=creditRows[0].value;
  const ch479=roundToCent(creditRows.reduce((sum,row)=>sum+row.value,0));
  const rawBalance=roundToCent(ch399-ch479);
  const ch500=rawBalance>0?(finalRound?roundToFranc(rawBalance):rawBalance):0;
  const ch510=rawBalance<0?Math.abs(rawBalance):0;
  const balance=ch500>0?ch500:ch510>0?-ch510:0;
  const ch900=amountFrom(source,'ch900');
  const ch910=amountFrom(source,'ch910');
  return {ch200,ch205,deductionRows,ch289,ch299,ch323Base,ch323Tax,ch323Rate,ch379,acqBase,acqTax,ch399,creditRows,ch415,ch479,ch500,ch510,ch900,ch910,balance,concordance:roundToCent(ch299-ch379)};
}

export function closeEnough(actual,expected){
  if(actual===null||Number.isNaN(actual)) return false;
  return Math.abs(actual-Number(expected))<=0.011;
}

export function validateCase(c,answers){
  const expected=expectedInputMap(c);
  const rows=[];
  let correct=0;
  for(const [key,target] of Object.entries(expected)){
    const actual=parseAmount(answers?.[key]);
    const blank=actual===null;
    const invalid=Number.isNaN(actual);
    const negative=!blank&&!invalid&&actual<0;
    const zeroExpected=Math.abs(Number(target))<0.000001;
    const unexpected=zeroExpected?(!blank&&(invalid||negative||Math.abs(actual)>0.005)):false;
    if(zeroExpected&&!unexpected) continue;
    const good=!blank&&!invalid&&!negative&&closeEnough(actual,target);
    if(good) correct++;
    rows.push({key,target,actual,blank,invalid,negative,good,zeroExpected,unexpected});
  }
  const total=rows.length;
  return {rows,correct,total,score:total?Math.round(correct/total*100):100};
}

export function allActivityBasesEntered(c,answers){
  return (c.rates||[]).length>0&&(c.rates||[]).every((_,index)=>{
    const amount=parseAmount(answers?.[rateKey('base',index)]);
    return amount!==null&&!Number.isNaN(amount)&&amount>=0;
  });
}

export function universalChecks(c,source={},reported=null,{reportCurrent=false,acquisitionRate=8.1}={}){
  const declaration=computeDeclaration(c,source,reported,false);
  const rows=[];
  const add=(id,good,title,text,kind='error')=>rows.push({id,good,title,text,kind});
  const numericKeys=['ch200','ch205',...DEDUCTIONS.map(item=>item.key),'acqBase','acqTax','ch415','ch900','ch910',...(c.rates||[]).map((_,i)=>rateKey('base',i))];
  const invalid=numericKeys.filter(key=>{
    const value=parseAmount(source?.[key]);
    return value!==null&&(Number.isNaN(value)||value<0);
  });
  add('numeric',invalid.length===0,'Formats et montants non négatifs',invalid.length?`À corriger: ${invalid.join(', ')}.`:'Tous les montants saisis sont numériques et non négatifs.');
  add('ch205',declaration.ch205<=declaration.ch200+0.011,'ch. 205 inclus dans le ch. 200',declaration.ch205<=declaration.ch200+0.011?'La rubrique informative ne dépasse pas le total déclaré.':`ch. 205 (${declaration.ch205.toFixed(2)}) dépasse ch. 200 (${declaration.ch200.toFixed(2)}).`);
  add('deductions',declaration.ch289<=declaration.ch200+0.011,'Déductions limitées au chiffre d’affaires',declaration.ch289<=declaration.ch200+0.011?'ch. 289 ne dépasse pas ch. 200.':`ch. 289 (${declaration.ch289.toFixed(2)}) dépasse ch. 200 (${declaration.ch200.toFixed(2)}).`);
  add('ch299',declaration.ch299>=-0.011,'Chiffre d’affaires imposable non négatif',declaration.ch299>=-0.011?`ch. 299 = ${declaration.ch299.toFixed(2)}.`:'Les déductions conduisent à un ch. 299 négatif.');
  add('report',Boolean(reported)&&reportCurrent,'Calcul TDFN reporté et actuel',!reported?'Aucun calcul n’a été reporté au ch. 323.':reportCurrent?'Le report correspond aux activités et bases actuelles.':'Le calcul a été modifié depuis le dernier report.');
  add('concordance',Boolean(reported)&&reportCurrent&&Math.abs(declaration.concordance)<=0.011,'Concordance ch. 299 / ch. 379',Boolean(reported)&&reportCurrent&&Math.abs(declaration.concordance)<=0.011?`ch. 299 et ch. 379 concordent à ${declaration.ch299.toFixed(2)}.`:`Écart: ${declaration.concordance.toFixed(2)}.`);
  const rate=Number(acquisitionRate||0);
  const expectedAcq=roundToCent(declaration.acqBase*rate/100);
  const acqUsed=Math.abs(declaration.acqBase)>0.005||Math.abs(declaration.acqTax)>0.005;
  add('acquisition',!acqUsed||Math.abs(declaration.acqTax-expectedAcq)<=0.011,'Cohérence du ch. 383',!acqUsed?'Aucun impôt sur les acquisitions saisi.':Math.abs(declaration.acqTax-expectedAcq)<=0.011?`CHF ${declaration.acqBase.toFixed(2)} × ${rate.toFixed(1)} % = CHF ${expectedAcq.toFixed(2)}.`:`Impôt attendu au taux sélectionné: CHF ${expectedAcq.toFixed(2)}.`,acqUsed?'error':'info');
  add('balance',!(declaration.ch500>0.005&&declaration.ch510>0.005),'Un seul solde final',declaration.ch500>0.005?`Montant à payer: CHF ${declaration.ch500.toFixed(2)}.`:declaration.ch510>0.005?`Solde en faveur de l’assujetti: CHF ${declaration.ch510.toFixed(2)}.`:'Solde nul.');
  return {rows,declaration,correct:rows.filter(row=>row.good).length,total:rows.length,allGood:rows.every(row=>row.good)};
}
