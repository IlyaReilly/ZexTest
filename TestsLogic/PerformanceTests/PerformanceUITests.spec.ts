import { Page, chromium, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';
import { test, pageManager } from '../UITests/BaseTest';
import lighthouseDesktopConfig from 'lighthouse/lighthouse-core/config/lr-desktop-config';


let page: Page;
let mainMenu;
let homePage;
let checkableResultsPage;
let dapPage;
const port = 9222;
const thresholdsConfig = {
  performance: 50,
  accessibility: 50,
  'best-practices': 50,
  seo: 50,
};
const lighthouseOptions = {
  disableStorageReset: true
};

async function LighthouseAudit(page, pageName){
  await playAudit({
    page: page,
    opts: lighthouseOptions,
    config: lighthouseDesktopConfig,
    thresholds: thresholdsConfig,
    port: port,
    reports: {
      formats: {
        html: true,
      },
      name: 'lighthouseReport' + pageName
    }
  });
}
  
test.beforeAll(async ({}) => {
  const browser = await chromium.launchPersistentContext('.',{
    args: ['--remote-debugging-port=' + port],
  });
  const cookies = require('fs').readFileSync('storageState.json', 'utf8')
  const deserializedCookies = JSON.parse(cookies)
  browser.addCookies(deserializedCookies.cookies);
  page = await browser.newPage();
});

test.beforeEach(async () => {
  await page.goto('/');
});
  
test.afterAll(async () => {
  await page.close();
});
  
test.describe('Run Lighthouse in Main Pages', async () => {
  
  test('Lighthouse Home Page', async ({loginWelcomMessage}) => {
    homePage = await pageManager.getHomePage(page);
    await expect(homePage.Lable.NavigationMenuHeading).toContainText(loginWelcomMessage, {timeout: 20000});
    await LighthouseAudit(page, 'HomePage');
  });
  
  test('Lighthouse chekable result Page', async ({ }) => {
    mainMenu = await pageManager.getMainMenuComponent(page);
    await mainMenu.OpenMenuSection(mainMenu.MenuSections.MyCheckableResults);
    checkableResultsPage = await pageManager.getCheckableResultsPage(page);
    await expect(checkableResultsPage.CheckableResultsWidgets.Compliance, 
      'Compliance result should be visible').toBeVisible({timeout: 30000});
    
    await LighthouseAudit(page, 'CheckableResultsPage');
  });

  test('Lighthouse Digital Action Plan Page', async ({ }) => {
    mainMenu = await pageManager.getMainMenuComponent(page);
    await mainMenu.OpenMenuSection(mainMenu.MenuSections.DigitalActionPlan);
    dapPage = await pageManager.getDAPPage(page);
    await expect(dapPage.CompletedWidget.DownloadCompletedReport, 
      '"Download completed report" button should be visible').toBeVisible({timeout: 40000});
      await LighthouseAudit(page, 'DigitalActionPlanPage');
  });
});
