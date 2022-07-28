import { chromium, FullConfig } from '@playwright/test';
import { pageManager } from './TestsLogic/UITests/BaseTest';

async function globalSetup(config: FullConfig) {
  // Ability to logine once for all tests
  const {baseURL, storageState, login, password } = config.projects[0].use;
  const browser = await chromium.launch({headless: false});
  const page = await browser.newPage({ignoreHTTPSErrors:true});
  await page.goto(baseURL!);
  var loginPage = await pageManager.getLoginPage(page);
  await loginPage.Login(login, password);
  var headerMenu = await pageManager.getHeaderMenuComponent(page);
  await headerMenu.Logos.MainLogo.waitFor();
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;