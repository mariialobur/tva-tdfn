import { test, expect } from '@playwright/test';

async function dismissOnboarding(page){
  const onboarding=page.locator('#onboardingDialog');
  if(await onboarding.isVisible()) await page.getByRole('button',{name:/Commencer par l’admissibilité/}).click();
}

test('capture workspace and plan visual references', async({page},testInfo)=>{
  await page.goto('/');
  await dismissOnboarding(page);
  await expect(page.locator('#workspace')).toBeVisible();
  await page.screenshot({path:testInfo.outputPath('tdfn-workspace.png'),fullPage:true});
  await page.locator('#tdfnOpenPlan').click();
  await expect(page.locator('#tdfnPlanDialog')).toBeVisible();
  await page.screenshot({path:testInfo.outputPath('tdfn-plan.png'),fullPage:true});
});
