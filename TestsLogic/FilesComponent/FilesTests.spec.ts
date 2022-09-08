import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';
import fs from "fs";
import { PageManager } from '../../ApplicationLogic/ApplicationUILogic/Pages/PageManager';


test.describe('Files tests', async () => {
  // Components
  const fileNameJpg = 'testFile2';
  const fileNameForApi = 'testAPI.png';
  let unicFilePrefix;
  let unicFileName;

  test.beforeEach(async ({apiManager}) => {
    unicFilePrefix = BaseTest.dateTimePrefix();
    unicFileName = unicFilePrefix + 'testAPI';
    const activeFiles = await apiManager.filesAPI.GetActiveFiles();
    await Promise.all(activeFiles.map(async (file) => {
      return apiManager.filesAPI.MoveFileToTrashById(file.id);
    }));
  });

  test.afterEach(async ({apiManager, page}) => {
    const activeFiles = await apiManager.filesAPI.GetActiveFiles();
    await Promise.all(activeFiles.map(async (file) => {
      return apiManager.filesAPI.MoveFileToTrashById(file.id);
    }));
    const trashFiles = await apiManager.filesAPI.GetTrashFiles();
    await Promise.all(trashFiles.map(async (file) => {
      return apiManager.filesAPI.DeleteFilePermanentlyById(file.id);
    }));
    await page.close();
  });

 async function UploadFileAndOpenDetails({apiManager, pageManager}) {
  await apiManager.filesAPI.UploadFileViaAPI(fileNameForApi, unicFilePrefix);
  await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
  await pageManager.sideSecondaryFilesMenu.OpenSecondaryMenuTab(pageManager.sideSecondaryFilesMenu.Tabs.Home);
  await pageManager.filesList.OpenFileDetails(unicFileName);
  };

  async function UploadFileAndMoveToTrash({apiManager, pageManager}) {
    await UploadFileAndOpenDetails({apiManager, pageManager});
    await pageManager.fileDetails.ClickDropdownOption.MoveToTrash();
    await pageManager.sideSecondaryFilesMenu.SelectTrashSubfolder.TrashElements();
  }

  test('File with JPG extension can be uploaded', async ({pageManager}) => {
    await pageManager.headerMenu.UploadNewFile('./TestData/Files/testFile2.jpg');
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await expect((pageManager.filesList.Elements.File.locator(`"${fileNameJpg}"`))).toContainText('testFile2');
  });

  test('File Preview is displayed by List File clicking', async ({pageManager, apiManager, page}) => {
    await apiManager.filesAPI.UploadFileViaAPI(fileNameForApi, unicFilePrefix);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await pageManager.sideSecondaryFilesMenu.OpenSecondaryMenuTab(pageManager.sideSecondaryFilesMenu.Tabs.Home);
    await pageManager.filesList.OpenFileDetails(unicFileName);
    await expect((pageManager.fileDetails.Elements.FilePreview)).toBeVisible();
  });

  test('File can be downloaded', async ({apiManager, pageManager}) => {
    try {
      await apiManager.filesAPI.UploadFileViaAPI(fileNameForApi, unicFilePrefix);
      await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
      await pageManager.sideSecondaryFilesMenu.OpenSecondaryMenuTab(pageManager.sideSecondaryFilesMenu.Tabs.Home);
      await expect((pageManager.filesList.Elements.File.locator(`"${unicFileName}"`))).toBeVisible();
      await pageManager.filesList.OpenFileDetails(unicFileName);
      expect(fs.existsSync(await pageManager.fileDetails.DownloadFile())).toBeTruthy();
    } catch (e) {
      throw e;
    }
  });

  test('File must be moved to trash', async({apiManager, pageManager}) => {
    await UploadFileAndMoveToTrash({apiManager, pageManager});
    await expect(pageManager.filesList.Elements.File.locator(`"${unicFileName}"`)).toBeVisible();
  });

  test('File can be permanently removed', async ({apiManager, pageManager}) => {
    await UploadFileAndMoveToTrash({apiManager, pageManager});
    await pageManager.filesList.OpenFileDetails(unicFileName);
    await pageManager.fileDetails.FileOptions.DeletePermanentlyButton.click();
    await pageManager.fileDetails.CreateEntityPopup.DeleteButton.click();
    await expect(pageManager.filesList.Elements.File.locator(`"${unicFileName}"`)).not.toBeVisible(); 
    await pageManager.sideSecondaryFilesMenu.OpenSecondaryMenuTab(pageManager.sideSecondaryFilesMenu.Tabs.Home);
    await expect(pageManager.filesList.Elements.File.locator(`"${unicFileName}"`)).not.toBeVisible(); 
  });

  test('File can be restored from trash', async ({apiManager, pageManager}) => {
    await UploadFileAndMoveToTrash({apiManager, pageManager});
    await pageManager.filesList.OpenFileDetails(unicFileName);
    await pageManager.fileDetails.FileOptions.RestoreButton.click();
    await expect(pageManager.filesList.Elements.File.locator(`"${unicFileName}"`)).not.toBeVisible(); 
    await pageManager.sideSecondaryFilesMenu.OpenSecondaryMenuTab(pageManager.sideSecondaryFilesMenu.Tabs.Home);
    await expect(pageManager.filesList.Elements.File.locator(`"${unicFileName}"`)).toBeVisible(); 
  });

  test('File must be flagged and unflagged',async ({apiManager, pageManager}) => {
    await UploadFileAndOpenDetails({apiManager, pageManager});
    await pageManager.fileDetails.ClickDropdownOption.Flag();
    await expect(pageManager.filesList.Elements.FlagIcon).toBeVisible();
    await pageManager.sideSecondaryFilesMenu.SelectFilterSubfolder.FiltersFlagged();
    await pageManager.filesList.OpenFileDetails(unicFileName);
    await pageManager.fileDetails.ClickDropdownOption.UnFlag();
    await expect(pageManager.filesList.Elements.File.locator(`"${unicFileName}"`)).not.toBeVisible();
    await pageManager.sideSecondaryFilesMenu.OpenSecondaryMenuTab(pageManager.sideSecondaryFilesMenu.Tabs.Home);
    await expect(pageManager.filesList.Elements.File.locator(`"${unicFileName}"`)).toBeVisible();
    await expect(pageManager.filesList.Elements.FlagIcon).not.toBeVisible();
  });
});


