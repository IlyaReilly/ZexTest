import { expect } from '@playwright/test';
import { test, pageManager } from './BaseTest';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login tests', async () => {
  test('Success login.', async ({page, login, password, loginWelcomMessage}) => {
    var homePage = await pageManager.getHomePage(page);
    var loginPage = await pageManager.getLoginPage(page);
    await loginPage.Login(login, password);
    await expect(homePage.Lable.NavigationMenuHeading).toContainText(loginWelcomMessage, {timeout: 20000});
  });

  test('Logout.', async ({page, login, password}) => {
    var loginPage = await pageManager.getLoginPage(page);
    var homePage = await pageManager.getHomePage(page);
    await loginPage.Login(login, password);
    var mainMenu = await pageManager.getMainMenuComponent(page);
    await mainMenu.OpenMenuSection(mainMenu.MenuSections.Logout);
    await expect(homePage.Buttons.Login).toBeVisible();
  });
});
// test push
