import {expect, Page} from '@playwright/test';
import {test, pageManager, playwrightProjectsData, apiManager} from './BaseTest';


test.describe('Files tests', async () => {
  let page: Page;

  // Components
  let headerMenu;
  let sideMenu;
  let filesList;
  let fileNameJpg;
  let fileNamePng;
  let filesAPI;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
    await page.goto('/');
    headerMenu = await pageManager.getHeaderMenuComponent(page);
    sideMenu = await pageManager.getSideMenuComponent(page);
    filesList = await pageManager.getFilesList(page);
    fileNameJpg = 'testFile2';
    fileNamePng = 'testFile';
    filesAPI = await apiManager.getFilesAPI(page);
  });

  test.beforeEach(async () => {
    await page.reload();
  });

  test.afterEach(async () => {
    let files = await filesAPI.GetFiles();
    await files.forEach(async (file) => {
      await filesAPI.DeleteFilePermanently(file.id);
    });
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

