import {expect, Page} from '@playwright/test';
import {test, pageManager, playwrightProjectsData, apiManager} from './BaseTest';


test.describe('Files tests', async () => {
  let page: Page;

  // Components
  let headerMenu;
  let sideMenu;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
    await page.goto('/');
    headerMenu = await pageManager.getHeaderMenuComponent(page);
    sideMenu = await pageManager.getSideMenuComponent(page);
  });

  test.beforeEach(async () => {
    await page.reload();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('File with JPG extension can be uploaded', async ({}) => {
    await headerMenu.UploadNewFile('./TestData/testFile2.jpg');
  });

  test('File with PNG extension can be uploaded', async ({}) => {
    await headerMenu.UploadNewFile('./TestData/testFile.png');
  });
});

