import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const serious = results => results.violations.filter(v=>['serious','critical'].includes(v.impact));

async function dismissOnboarding(page){
  const onboarding=page.locator('#onboardingDialog');
  if(await onboarding.isVisible()) await page.getByRole('button',{name:/Commencer par l’admissibilité/}).click();
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
