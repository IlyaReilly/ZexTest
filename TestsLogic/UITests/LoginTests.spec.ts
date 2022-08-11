import {expect} from '@playwright/test';
import {test, BaseTest} from './BaseTest';
import {PageManager} from '../../ApplicationLogic/ApplicationUILogic/Pages/PageManager';

// test.use({storageState: {cookies: [], origins: []}});

// Don't work in the haedless mode
test.describe.skip('Login tests', async () => {
  let userForLogin;

  test.beforeAll(async ({}, workerInfo) => {
    userForLogin = BaseTest.GetUserFromPool(workerInfo.workerIndex);
  });

  test('Success login.', async ({browser}) => {
    const page = await browser.newPage();
    await page.goto('/');
    const pageManager = new PageManager(page);
    await pageManager.loginPage.Login(userForLogin.login, userForLogin.password);
    await expect(pageManager.headerMenu.Logos.MainLogo).toBeVisible();
  });

  test('Logout.', async ({browser}) => {
    const page = await browser.newPage();
    await page.goto('/');
    const pageManager = new PageManager(page);
    await pageManager.loginPage.Login(userForLogin.login, userForLogin.password);
    await pageManager.headerMenu.OpenUserMenuSection(pageManager.headerMenu.UserMenu.Logout);
    await expect(pageManager.loginPage.TextBox.Login).toBeVisible();
  });
});
