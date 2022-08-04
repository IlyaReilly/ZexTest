import {expect} from '@playwright/test';
import {test, BaseTest} from './BaseTest';

// test.use({storageState: {cookies: [], origins: []}});

test.describe('Login tests', async () => {
  let userForLogin;

  test.beforeAll(async ({}, workerInfo) => {
    userForLogin = BaseTest.GetUserFromPool(workerInfo.workerIndex);
  });

  test('Success login.', async ({page}) => {
    const loginPage = await BaseTest.pageManager.getLoginPage(page);
    await loginPage.Login(userForLogin.login, userForLogin.password);
    const headerMenu = await BaseTest.pageManager.getHeaderMenuComponent(page);
    await expect(headerMenu.Logos.MainLogo).toBeVisible();
  });

  test('Logout.', async ({page}) => {
    const loginPage = await BaseTest.pageManager.getLoginPage(page);
    await loginPage.Login(userForLogin.login, userForLogin.password);
    const headerMenu = await BaseTest.pageManager.getHeaderMenuComponent(page);
    await headerMenu.OpenUserMenuSection(headerMenu.UserMenu.Logout);
    await expect(loginPage.TextBox.Login).toBeVisible();
  });
});
