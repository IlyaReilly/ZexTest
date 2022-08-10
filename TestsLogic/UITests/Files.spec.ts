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
  let filesAPI;
  let fileDetails;
  let sideSecondaryMenu;

  test.beforeAll(async ({browser}, workerInfo) => {
    page = await browser.newPage();
    await page.goto('/');
    userForLogin = BaseTest.GetUserFromPool(workerInfo.workerIndex);
    filesAPI = await BaseTest.apiManager.getFilesAPI(page);
    headerMenu = await BaseTest.pageManager.getHeaderMenuComponent(page);
    sideMenu = await BaseTest.pageManager.getSideMenuComponent(page);
    sideSecondaryMenu = await BaseTest.pageManager.getSideSecondaryFilesMenuComponent(page) //
    filesList = await BaseTest.pageManager.getFilesList(page);
    fileDetails = await BaseTest.pageManager.getFileDetails(page);
    fileNameJpg = 'testFile2';
    fileNamePng = 'testFile';

    // Login
    loginPage = await BaseTest.pageManager.getLoginPage(page);
    await loginPage.Login(userForLogin.login, userForLogin.password);
  });

  test.beforeEach(async () => {
    await page.reload();
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
