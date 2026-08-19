import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const serious = results => results.violations.filter(v=>['serious','critical'].includes(v.impact));

async function dismissOnboarding(page){
  const onboarding=page.locator('#onboardingDialog');
  if(await onboarding.isVisible()) await page.getByRole('button',{name:/Commencer par l’admissibilité/}).click();
}

async function unlockFinal(page){
  await page.goto('/');
  await dismissOnboarding(page);
  await page.evaluate(async()=>{
    const {CASES}=await import('/data.js');
    const scores={};for(const c of CASES)if(!c.excludeFromProgress)scores[c.id]=100;
    localStorage.setItem('tva_tdfn_v150_state',JSON.stringify({version:150,currentId:'A',current:0,mode:'guided',scores,assisted:{},attempts:{},mastered:{},ui:{onboardingSeen:true}}));
  });
  await page.reload();
  await expect(page.locator('#tdfnV4Start')).toBeEnabled();
}

test('main TDFN workspace has no serious or critical axe violations', async({page})=>{
  await page.goto('/');
  await dismissOnboarding(page);
  const results=await new AxeBuilder({page}).analyze();
  expect(serious(results),JSON.stringify(serious(results),null,2)).toEqual([]);
});

test('specialization plan dialog passes serious/critical axe checks', async({page})=>{
  await page.goto('/');
  await dismissOnboarding(page);
  await page.locator('#tdfnOpenPlan').click();
  await expect(page.locator('#tdfnPlanDialog')).toBeVisible();
  const results=await new AxeBuilder({page}).include('#tdfnPlanDialog').analyze();
  expect(serious(results),JSON.stringify(serious(results),null,2)).toEqual([]);
});

test('professional memo dialog passes serious/critical axe checks', async({page})=>{
  await page.goto('/');
  await dismissOnboarding(page);
  await page.getByRole('button',{name:'Aide'}).click();
  const results=await new AxeBuilder({page}).include('#memoDialog').analyze();
  expect(serious(results),JSON.stringify(serious(results),null,2)).toEqual([]);
});

test('balanced final exam passes serious/critical axe checks', async({page})=>{
  await unlockFinal(page);
  await page.locator('#tdfnV4Start').click();
  await expect(page.locator('#tdfnExamLayerV4')).toBeVisible();
  const results=await new AxeBuilder({page}).include('#tdfnExamLayerV4').analyze();
  expect(serious(results),JSON.stringify(serious(results),null,2)).toEqual([]);
});
