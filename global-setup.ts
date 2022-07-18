import { chromium, FullConfig, expect } from '@playwright/test';
import {HomePage} from './ApplicationLogic/ApplicationUILogic/Pages/HomePage'
import {LoginPage} from './ApplicationLogic/ApplicationUILogic/Pages/LoginPage'

async function globalSetup(config: FullConfig) {
  // Ability to logine once for all tests
  const {baseURL, storageState, login, password, loginWelcomMessage } = config.projects[0].use;
  const browser = await chromium.launch({headless: true});
  const page = await browser.newPage();
  await page.goto(baseURL!);
  var homePage = await new HomePage(page);
  var loginPage = await new LoginPage(page);
  await loginPage.Login(login, password);
  await expect(homePage.Lable.NavigationMenuHeading).toContainText(loginWelcomMessage, {timeout: 20000});
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;