import {expect, Page} from '@playwright/test';
import {test, BaseTest} from './BaseTest';


test.describe('Files tests', async () => {
  let page: Page;
  let loginPage;
  let userForLogin;

  // Components
  let headerMenu;
  let sideMenu;
  let filesList;
  let fileNameJpg;
  let fileNamePng;

  test.beforeAll(async ({browser}, workerInfo) => {
    page = await browser.newPage();
    await page.goto('/');
    headerMenu = await BaseTest.pageManager.getHeaderMenuComponent(page);
    sideMenu = await BaseTest.pageManager.getSideMenuComponent(page);
    filesList = await BaseTest.pageManager.getFilesList(page);
    fileNameJpg = 'testFile2';
    fileNamePng = 'testFile';
    userForLogin = BaseTest.GetUserFromPool(workerInfo.workerIndex);
    // Login
    loginPage = await BaseTest.pageManager.getLoginPage(page);
    await loginPage.Login(userForLogin.login, userForLogin.password);
    await page.waitForLoadState('networkidle');
  });

  test.beforeEach(async () => {
    await page.reload();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('File with JPG extension can be uploaded', async ({}) => {
    await headerMenu.UploadNewFile('./TestData/testFile2.jpg');
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Files);
    await expect((filesList.Elements.File.locator(`"${fileNameJpg}"`))).toContainText('testFile2');
  });
});

