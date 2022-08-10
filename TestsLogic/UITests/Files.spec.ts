import {expect, Page} from '@playwright/test';
import {test, BaseTest} from './BaseTest';

test.describe('Files tests', async () => {
  let page: Page;
  let storagesPath;
  let userForLogin;

  // Components
  let headerMenu;
  let sideMenu;
  let filesList;
  let fileNameJpg;
  let filesAPI;
  let fileDetails;
  let sideSecondaryMenu;

  test.beforeEach(async ({browser}, workerInfo) => {
    userForLogin = BaseTest.GetUserFromPool(workerInfo.workerIndex);
    storagesPath = await BaseTest.ApiLogin(userForLogin);
    // user1 = BaseTest.GetUserFromPool(workerInfo.workerIndex + 1);
    page = await browser.newPage({storageState: storagesPath});
    await page.goto('/');

    headerMenu = await BaseTest.pageManager.getHeaderMenuComponent(page);
    sideMenu = await BaseTest.pageManager.getSideMenuComponent(page);
    sideSecondaryMenu = await BaseTest.pageManager.getSideSecondaryFilesMenuComponent(page);
    filesList = await BaseTest.pageManager.getFilesList(page);
    fileDetails = await BaseTest.pageManager.getFileDetails(page);
    filesAPI = await BaseTest.apiManager.getFilesAPI(page);
    fileNameJpg = 'testFile2';
  });

  test.beforeEach(async () => {
    await page.goto('/');
    const activeFiles = await filesAPI.GetActiveFiles();
    await Promise.all(activeFiles.map(async (file) => {
      return filesAPI.MoveFileToTrashById(file.id);
    }));
  });

  test.afterEach(async () => {
    const activeFiles = await filesAPI.GetActiveFiles();
    await Promise.all(activeFiles.map(async (file) => {
      return filesAPI.MoveFileToTrashById(file.id);
    }));
    const trashFiles = await filesAPI.GetTrashFiles();
    await Promise.all(trashFiles.map(async (file) => {
      return filesAPI.DeleteFilePermanentlyById(file.id);
    }));
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('File with JPG extension can be uploaded', async ({}) => {
    await headerMenu.UploadNewFile('./TestData/testFile2.jpg');
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Files);
    await expect((filesList.Elements.File.locator(`"${fileNameJpg}"`))).toContainText('testFile2');
  });

  test('File Preview is displayed by List File clicking', async ({}) => {
    await filesAPI.UploadFileViaAPI();
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Files);
    await sideSecondaryMenu.OpenSecondaryMenuTab(sideSecondaryMenu.Tabs.Home);
    await filesList.OpenFileDetails(filesList.Elements.File);
    await expect((fileDetails.Elements.FilePreview)).toBeVisible();
  });
});
