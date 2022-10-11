import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';

test.describe('Files tests', async () => {
  const oldItemName = 'Test Item 123';
  const newItemName = 'Zextras Team';
  const firstName = 'abcd';
  const secondName = 'aavc';

  test.beforeEach(async ({apiManager}) => {
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

  async function SaveOldNameRenameFileAndExpectFileRename({pageManager}) {
    await pageManager.filesList.Elements.File.click();
    const oldName = await pageManager.filesList.Elements.File.textContent();
    await pageManager.fileDetails.ClickDropdownOption.Rename();
    await pageManager.createNewItemModal.RenameItem(newItemName);
    await expect(pageManager.filesList.Elements.File).not.toHaveText(oldName);
  };

  async function CreateNewFileAndGiveName({pageManager}, newItem, name) {
    if (newItem === pageManager.headerMenu.NewItemMenu.NewDocument) {
      await pageManager.headerMenu.SelectOptionInNewItemMenu.NewDocument();
      await pageManager.createNewItemModal.CreatedFilesName.CreateDocumentName(name);
    } else if (newItem === pageManager.headerMenu.NewItemMenu.NewPresentation) {
      await pageManager.headerMenu.SelectOptionInNewItemMenu.NewPresentation();
      await pageManager.createNewItemModal.CreatedFilesName.CreatePresentationName(name);
    } else if (newItem === pageManager.headerMenu.NewItemMenu.NewSpreadsheet) {
      await pageManager.headerMenu.SelectOptionInNewItemMenu.NewSpreadsheet();
      await pageManager.createNewItemModal.CreatedFilesName.CreateSpreadsheetName(name);
    };
  };

  async function SelectUnselectAllFIles({pageManager}, unselect?) {
    await pageManager.filesList.Elements.FileIcon.first().click();
    await pageManager.filesList.SelectionModeElements.SelectAllButton.waitFor();
    await pageManager.filesList.SelectionModeElements.SelectAllButton.click();
    if (unselect === pageManager.filesList.SelectionModeElements.DeselectAllButton) {
      await pageManager.filesList.SelectionModeElements.DeselectAllButton.click();
    };
  };

  test('Create document file. Document file should be in Home tab.', async ({pageManager}) => {
    BaseTest.doubleTimeout();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await CreateNewFileAndGiveName({pageManager}, pageManager.headerMenu.NewItemMenu.NewDocument, oldItemName);
    await expect(pageManager.filesList.Elements.File).toBeVisible();
  });

  test('Create spreadsheet file. Spreadsheet file should be in Home tab.', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await CreateNewFileAndGiveName({pageManager}, pageManager.headerMenu.NewItemMenu.NewSpreadsheet, oldItemName);
    await expect(pageManager.filesList.Elements.File).toBeVisible();
  });

  test('Create presentation file. Presentation file should be in Home tab.', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await CreateNewFileAndGiveName({pageManager}, pageManager.headerMenu.NewItemMenu.NewPresentation, oldItemName);
    await expect(pageManager.filesList.Elements.File).toBeVisible();
  });

  test('Change the name of a presentation. The presentation should be in a Home tab with a new name.', async ({pageManager, apiManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await apiManager.filesAPI.CreatePresentation(oldItemName);
    await SaveOldNameRenameFileAndExpectFileRename({pageManager});
  });

  test('Change the name of a spreadsheet. The spreadsheet should be in a Home tab with a new name.', async ({pageManager, apiManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await apiManager.filesAPI.CreateSpreadsheet(oldItemName);
    await SaveOldNameRenameFileAndExpectFileRename({pageManager});
  });

  test('Change the name of a document. The document should be in a Home tab with a new name.', async ({pageManager, apiManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await apiManager.filesAPI.CreateDocument(oldItemName);
    await SaveOldNameRenameFileAndExpectFileRename({pageManager});
  });

  test('Select file. File should be selected in Home tab.', async ({pageManager, apiManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await apiManager.filesAPI.CreateDocument(oldItemName);
    await pageManager.filesList.Elements.FileIcon.click();
    await expect(pageManager.filesList.SelectionModeElements.CheckMark).toBeVisible();
  });

  test('Select all files. All files should be selected in Home tab.', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await apiManager.filesAPI.CreateSpreadsheet(secondName);
    await apiManager.filesAPI.CreateDocument(firstName);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await SelectUnselectAllFIles({pageManager});
    await expect(pageManager.filesList.Elements.UncheckMark).not.toBeTruthy();
  });

  test('Unselect all files. All files should be unselected in Home tab.', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await apiManager.filesAPI.CreateDocument(firstName);
    await apiManager.filesAPI.CreateSpreadsheet(secondName);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await SelectUnselectAllFIles({pageManager}, pageManager.filesList.SelectionModeElements.DeselectAllButton);
    await expect(pageManager.filesList.Elements.CheckMark).not.toBeTruthy();
  });

  test('Add a description to the file. The description should be in the Home tab of the file.', async ({pageManager, apiManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await apiManager.filesAPI.CreateDocument(oldItemName);
    await pageManager.filesList.Elements.File.click();
    await pageManager.fileDetails.WriteDescription(newItemName);
    await expect(pageManager.fileDetails.Elements.DescriptionText).toHaveText(newItemName);
  });
});
