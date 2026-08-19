import { test, expect } from '@playwright/test';

async function dismissOnboarding(page){
  const onboarding=page.locator('#onboardingDialog');
  if(await onboarding.isVisible()) await page.getByRole('button',{name:/Commencer par l’admissibilité/}).click();
}

async function openVisibleMoreMenu(page){
  const summary=page.locator('details.more-actions:visible > summary').first();
  await summary.click();
}

test('trainer, memo and 44-case specialization plan', async({page})=>{
  await page.goto('/');
  await dismissOnboarding(page);
  await expect(page).toHaveTitle(/TDFN/);
  await expect(page.locator('#tdfnOpenPlan')).toBeVisible();
  await page.locator('#tdfnOpenPlan').click();
  const dialog=page.locator('#tdfnPlanDialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading',{name:'Plan de spécialisation TDFN'})).toBeVisible();
  await expect(dialog.locator('[data-plan-case]')).toHaveCount(44);
  await expect(dialog.locator('[data-plan-summary]')).toContainText('0 / 43 acquis');
  const before=await page.locator('#caseTitle').textContent();
  await dialog.locator('[data-plan-case="T2"]').click();
  await expect(dialog).toBeHidden();
  await expect(page.locator('#caseTitle')).not.toHaveText(before||'');
  await page.getByRole('button',{name:'Aide'}).click();
  await expect(page.getByRole('heading',{name:'Mémo professionnel TDFN'})).toBeVisible();
  await expect(page.getByText('Pièges fréquents')).toBeVisible();
});

test('plan reflects local progress states', async({page})=>{
  await page.addInitScript(()=>{
    localStorage.setItem('tva_tdfn_v150_state',JSON.stringify({version:150,currentId:'J1',current:0,scores:{A:100,B:55},assisted:{},attempts:{B:1},mastered:{A:true},ui:{onboardingSeen:true}}));
  });
  await page.goto('/');
  await page.locator('#tdfnOpenPlan').click();
  await expect(page.locator('[data-plan-case="A"] .tdfn-plan-status')).toHaveText('Maîtrisé ✓');
  await expect(page.locator('[data-plan-case="B"] .tdfn-plan-status')).toHaveText('En cours');
  await expect(page.locator('[data-plan-case="C"] .tdfn-plan-status')).toHaveText('À faire');
});

test('final launcher keeps the honest gate', async({page})=>{
  await page.goto('/');
  await dismissOnboarding(page);
  const launcher=page.locator('#tdfnFinalEvaluation');
  await expect(launcher).toBeVisible();
  await expect(launcher).toContainText('sans consultation de la solution');
  await expect(page.locator('#tdfnStartExam')).toBeDisabled();
});

test('progress export downloads a JSON snapshot', async({page})=>{
  await page.goto('/');
  await dismissOnboarding(page);
  await openVisibleMoreMenu(page);
  const downloadPromise=page.waitForEvent('download');
  await page.locator('button[data-action="export-progress"]:visible').click();
  const download=await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/tdfn.*\.json/i);
});

test('valid progress snapshot can be imported', async({page})=>{
  await page.goto('/');
  await dismissOnboarding(page);
  page.once('dialog',dialog=>dialog.accept());
  const snapshot={schema:'tva-tdfn-progress',version:150,exportedAt:new Date().toISOString(),state:{version:150,currentId:'A',current:0,mode:'guided',scores:{A:100},assisted:{},attempts:{},mastered:{},ui:{onboardingSeen:true}}};
  await page.locator('#progressImportInput').setInputFiles({name:'progress.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(snapshot))});
  await expect(page.locator('#caseTitle')).toContainText('Architecte');
  await expect(page.locator('#progressText')).toContainText('1 / 43 acquis');
});

test('no duplicate ids', async({page})=>{
  await page.goto('/');
  const duplicates=await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);return ids.filter((id,i)=>ids.indexOf(id)!==i)});
  expect(duplicates).toEqual([]);
});
