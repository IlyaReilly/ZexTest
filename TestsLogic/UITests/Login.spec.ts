import { expect } from '@playwright/test';
import { test, pageManager } from './BaseTest';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login tests', async () => {
  test('Success login.', async ({page, login, password}) => {
    var loginPage = await pageManager.getLoginPage(page);
    await loginPage.Login(login, password);
    var headerMenu = await pageManager.getHeaderMenuComponent(page);
    await expect(headerMenu.Logos.MainLogo).toBeVisible();
  });

  test('Logout.', async ({page, login, password}) => {
    var loginPage = await pageManager.getLoginPage(page);
    await loginPage.Login(login, password);
    var headerMenu = await pageManager.getHeaderMenuComponent(page);
    await headerMenu.OpenUserMenuSection(headerMenu.UserMenu.Logout);
    await expect(loginPage.TextBox.Login).toBeVisible();
  });
});