import {expect} from '@playwright/test';
import {test, BaseTest} from '../../UITests/BaseTest';
import fs from "fs";
import {InheritedFields} from '../../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

test.describe('Files tests', async () => {
  // Components
  const pngFileName = 'testFile';
  const jpgFileName = 'testFile2';
  const pngFile = 'testFile.png';
  const jpgFile = 'testFile2.jpg';
  const pngFile2 = 'testAPI.png';
  const filePath = './TestData/Files/testFile2.jpg';
  let unicFilePrefix;
  let unicFileName;
  let subjectWithFile;
  let mailBody;

  test.beforeEach(async ({apiManager}) => {
    unicFilePrefix = BaseTest.dateTimePrefix();
    unicFileName = unicFilePrefix + 'testAPI';
    subjectWithFile = unicFilePrefix + 'File in this mail';
    mailBody = 'Autotest Mail Body';
    const activeFiles = await apiManager.filesAPI.GetActiveFiles();
    await Promise.all(activeFiles.map(async (file) => {
      return apiManager.deleteFilesAPI.MoveFileToTrashById(file.id);
    }));
  });

  test.afterEach(async ({apiManager, page}) => {
    const activeFiles = await apiManager.filesAPI.GetActiveFiles();
    await Promise.all(activeFiles.map(async (file) => {
      return apiManager.deleteFilesAPI.MoveFileToTrashById(file.id);
    }));
    const trashFiles = await apiManager.filesAPI.GetTrashFiles();
    await Promise.all(trashFiles.map(async (file) => {
      return apiManager.deleteFilesAPI.DeleteFilePermanentlyById(file.id);
    }));
    await page.close();
  });

  async function UploadFileAndOpenDetails({apiManager, pageManager}) {
    await apiManager.createFilesAPI.UploadFileViaAPI(pngFile2, unicFilePrefix);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await pageManager.sideSecondaryFilesMenu.OpenSecondaryMenuTab(pageManager.sideSecondaryFilesMenu.Tabs.Home);
    await pageManager.filesList.OpenFileDetails(unicFileName);
  };

  async function UploadFileAndMoveToTrash({apiManager, pageManager}) {
    await UploadFileAndOpenDetails({apiManager, pageManager});
    await pageManager.fileDetails.ClickDropdownOption.MoveToTrash();
    await pageManager.sideSecondaryFilesMenu.SelectTrashSubfolder.TrashElements();
  };

  async function UploadFilesAndSortList({pageManager, apiManager}, sort) {
    await apiManager.createFilesAPI.UploadFileViaAPI(pngFile);
    await apiManager.createFilesAPI.UploadFileViaAPI(jpgFile);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await sort();
  };

  async function UploadNewFileVersion({apiManager, pageManager}, filePath) {
    await UploadFileAndOpenDetails({apiManager, pageManager});
    await pageManager.fileDetails.Tabs.Versioning.click();
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      pageManager.fileDetails.Buttons.UploadVersion.click(),
    ]);
    await fileChooser.setFiles(filePath);
  };

  test('TC501. File with JPG extension can be uploaded', async ({pageManager}) => {
    await pageManager.headerMenu.UploadNewFile('./TestData/Files/testFile2.jpg');
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await expect(pageManager.filesList.Elements.File.locator(`"${jpgFileName}"`)).toBeVisible();
  });

  test('TC502. File Preview is displayed by List File clicking', async ({pageManager, apiManager}) => {
    await apiManager.createFilesAPI.UploadFileViaAPI(pngFile2, unicFilePrefix);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await pageManager.sideSecondaryFilesMenu.OpenSecondaryMenuTab(pageManager.sideSecondaryFilesMenu.Tabs.Home);
    await pageManager.filesList.OpenFileDetails(unicFileName);
    await expect((pageManager.fileDetails.Elements.FilePreview)).toBeVisible();
  });

  test('TC503. File can be downloaded', async ({apiManager, pageManager}) => {
    try {
      await apiManager.createFilesAPI.UploadFileViaAPI(pngFile2, unicFilePrefix);
      await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
      await pageManager.sideSecondaryFilesMenu.OpenSecondaryMenuTab(pageManager.sideSecondaryFilesMenu.Tabs.Home);
      await expect((pageManager.filesList.Elements.File.locator(`"${unicFileName}"`))).toBeVisible();
      await pageManager.filesList.OpenFileDetails(unicFileName);
      expect(fs.existsSync(await pageManager.fileDetails.DownloadFile())).toBeTruthy();
    } catch (e) {
      throw e;
    }
  });

  test('TC507. File must be moved to trash', async ({apiManager, pageManager}) => {
    await UploadFileAndMoveToTrash({apiManager, pageManager});
    await expect(pageManager.filesList.Elements.File.locator(`"${unicFileName}"`)).toBeVisible();
  });

  test('TC504. File can be permanently removed', async ({apiManager, pageManager}) => {
    BaseTest.doubleTimeout();
    await UploadFileAndMoveToTrash({apiManager, pageManager});
    await pageManager.filesList.OpenFileDetails(unicFileName);
    await pageManager.fileDetails.FileOptions.DeletePermanently.click();
    await pageManager.fileDetails.Modal.DeletePermanentlyButton.click();
    await pageManager.sideSecondaryFilesMenu.OpenSecondaryMenuTab(pageManager.sideSecondaryFilesMenu.Tabs.Home);
    await expect(pageManager.filesList.Elements.File.locator(`"${unicFileName}"`)).not.toBeVisible();
  });

  test('TC505. File can be restored from trash', async ({apiManager, pageManager}) => {
    await UploadFileAndMoveToTrash({apiManager, pageManager});
    await pageManager.filesList.OpenFileDetails(unicFileName);
    await pageManager.fileDetails.FileOptions.RestoreButton.click();
    await pageManager.sideSecondaryFilesMenu.OpenSecondaryMenuTab(pageManager.sideSecondaryFilesMenu.Tabs.Home);
    await expect(pageManager.filesList.Elements.File.locator(`"${unicFileName}"`)).toBeVisible();
  });

  test('TC506. File must be flagged and unflagged', async ({apiManager, pageManager}) => {
    BaseTest.doubleTimeout();
    await UploadFileAndOpenDetails({apiManager, pageManager});
    await pageManager.fileDetails.ClickDropdownOption.Flag();
    await expect(pageManager.filesList.Elements.FlagIcon).toBeVisible();
    await pageManager.sideSecondaryFilesMenu.SelectFilterSubfolder.FiltersFlagged();
    await pageManager.filesList.OpenFileDetails(unicFileName);
    await pageManager.fileDetails.ClickDropdownOption.UnFlag();
    await pageManager.sideSecondaryFilesMenu.OpenSecondaryMenuTab(pageManager.sideSecondaryFilesMenu.Tabs.Home);
    await expect(pageManager.filesList.Elements.File.locator(`"${unicFileName}"`)).toBeVisible();
    await expect(pageManager.filesList.Elements.FlagIcon).not.toBeVisible();
  });

  test('TC508. Share file', async ({apiManager, pageManager, secondPageManager}) => {
    BaseTest.doubleTimeout();
    await UploadFileAndOpenDetails({apiManager, pageManager});
    await pageManager.fileDetails.SharingFile(BaseTest.secondUser.login);
    await secondPageManager.sideMenu.SideMenuTabs.Files.click();
    await secondPageManager.sideSecondaryFilesMenu.OpenSecondaryMenuTab(secondPageManager.sideSecondaryFilesMenu.Tabs.SharedWithMe);
    await expect(secondPageManager.filesList.Elements.DefinedByNameFile(unicFileName)).toBeVisible();
  });

  test('TC509. Sort file list by last update. The last updated file should be first in the list', async ({pageManager, apiManager}) => {
    await UploadFilesAndSortList({pageManager, apiManager}, pageManager.filesList.SelectListOrder.LastUpdateDescending);
    await expect(pageManager.filesList.Elements.FileName.nth(0)).toHaveText(jpgFileName);
    await expect(pageManager.filesList.Elements.FileName.nth(1)).toHaveText(pngFileName);
  });

  test('TC510. Sort file list by size. The larger file should be first in the list', async ({pageManager, apiManager}) => {
    await UploadFilesAndSortList({pageManager, apiManager}, pageManager.filesList.SelectListOrder.SizeDescending);
    const firstFileSize = parseFloat(await pageManager.filesList.Elements.FileSize.nth(0).innerText());
    const secondFileSize = parseFloat(await pageManager.filesList.Elements.FileSize.nth(1).innerText());
    expect(firstFileSize).toBeGreaterThan(secondFileSize);
  });

  // Bug with copypaste in mail folder. Dropdown does not appear.
  test.skip('TS522. Send mail with attached file. The attached file must be in incoming mail.', async ({apiManager, pageManager, page}) => {
    test.slow();
    await UploadFileAndOpenDetails({apiManager, pageManager});
    await pageManager.fileDetails.FileOptions.SendViaMail.click();
    await pageManager.newMail.CreateNewMail(BaseTest.userForLogin.login, subjectWithFile, mailBody);
    await pageManager.newMail.SendMail();
    const elementHandle = await page.$(InheritedFields.NewItemBoardLocator);
    await elementHandle?.waitForElementState('hidden');
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await pageManager.mailsList.Elements.Letter.locator(`"${subjectWithFile}"`);
    await pageManager.mailsList.OpenMail(subjectWithFile);
    await expect(pageManager.mailDetails.Elements.AttachmentFile).toContainText(unicFileName);
  });

  test('TC526. Upload a new file version. The current file version should be changed to the uploaded one', async ({pageManager, apiManager}) => {
    test.slow();
    await UploadNewFileVersion({apiManager, pageManager}, filePath);
    // await UploadFileAndOpenDetails({apiManager, pageManager});
    // await pageManager.fileDetails.Tabs.Versioning.click();
    // await pageManager.fileDetails.UploadNewFileVersion('./TestData/Files/testFile2.jpg');
    await expect(pageManager.fileDetails.Elements.FileVersionNumber(2)).toBeVisible();
  });
});
