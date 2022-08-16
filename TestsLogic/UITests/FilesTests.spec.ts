import {expect} from '@playwright/test';
import {test} from './BaseTest';
import fs from "fs";


test.describe('Files tests', async () => {
  // Components
  const fileNameJpg= 'testFile2';
  const fileNameForApi= 'testAPI.png';

  test.beforeEach(async ({apiManager}) => {
    const activeFiles = await apiManager.filesAPI.GetActiveFiles();
    await Promise.all(activeFiles.map(async (file) => {
      return apiManager.filesAPI.MoveFileToTrashById(file.id);
    }));
  });

  test.afterEach(async ({apiManager}) => {
    const activeFiles = await apiManager.filesAPI.GetActiveFiles();
    await Promise.all(activeFiles.map(async (file) => {
      return apiManager.filesAPI.MoveFileToTrashById(file.id);
    }));
    const trashFiles = await apiManager.filesAPI.GetTrashFiles();
    await Promise.all(trashFiles.map(async (file) => {
      return apiManager.filesAPI.DeleteFilePermanentlyById(file.id);
    }));
  });

  test.afterAll(async ({page}) => {
    await page.close();
  });

  test('File with JPG extension can be uploaded', async ({pageManager}) => {
    await pageManager.headerMenu.UploadNewFile('./TestData/testFile2.jpg');
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await expect((pageManager.filesList.Elements.File.locator(`"${fileNameJpg}"`))).toContainText('testFile2');
  });

  test('File Preview is displayed by List File clicking', async ({pageManager, apiManager}) => {
    await apiManager.filesAPI.UploadFileViaAPI(fileNameForApi);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await pageManager.sideSecondaryFilesMenu.OpenSecondaryMenuTab(pageManager.sideSecondaryFilesMenu.Tabs.Home);
    await pageManager.filesList.OpenFileDetails(pageManager.filesList.Elements.File);
    await expect((pageManager.fileDetails.Elements.FilePreview)).toBeVisible();
  });

  test('File can be downloaded', async ({apiManager, pageManager}) => {
    await apiManager.filesAPI.UploadFileViaAPI(fileNameForApi);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await pageManager.sideSecondaryFilesMenu.OpenSecondaryMenuTab(pageManager.sideSecondaryFilesMenu.Tabs.Home);
    await pageManager.filesList.OpenFileDetails(pageManager.filesList.Elements.File);
    expect(fs.existsSync(await pageManager.fileDetails.DownloadFile())).toBeTruthy();
  });
});
