import {chromium, FullConfig} from '@playwright/test';
import {PageManager} from './ApplicationLogic/ApplicationUILogic/Pages/PageManager';


async function globalSetup(config: FullConfig) {
  // Ability to logine once for all tests
  // const {baseURL} = config.projects[0].use;
  const browser = await chromium.launch({headless: false});
  const page = await browser.newPage({ignoreHTTPSErrors: true});
  await page.goto("https://2150.demo.zextras.io/");
  await page.locator('#input-0').fill("test0@demo.zextras.io");
  await page.locator('#password-0').fill("assext0");
  await page.locator('[role="button"]').click();
  await page.waitForLoadState('networkidle');
  await page.context().storageState({path: "./storageState.json" as string});
  await browser.close();
}

export default globalSetup;
