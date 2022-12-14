import {expect} from '@playwright/test';
import {test, BaseTest} from '../../UITests/BaseTest';

test.describe('Documents tests', async () => {
  const oldItemName = 'Test Item 123';
  const newItemName = 'Zextras Team';
  const firstName = 'abcd';
  const secondName = 'aavc';
  let unicFilePrefix;
  let unicFileName;

  test.beforeEach(async ({apiManager}) => {
    unicFilePrefix = BaseTest.dateTimePrefix();
    unicFileName = unicFilePrefix + ' Autotest DocumentsTests';
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

  test('TS512. Create document file. Document file should be in Home tab.', async ({pageManager}) => {
    BaseTest.doubleTimeout();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await CreateNewFileAndGiveName({pageManager}, pageManager.headerMenu.NewItemMenu.NewDocument, oldItemName);
    await expect(pageManager.filesList.Elements.File).toBeVisible();
  });

  test('TS513. Create spreadsheet file. Spreadsheet file should be in Home tab.', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await CreateNewFileAndGiveName({pageManager}, pageManager.headerMenu.NewItemMenu.NewSpreadsheet, oldItemName);
    await expect(pageManager.filesList.Elements.File).toBeVisible();
  });

  test('TS514. Create presentation file. Presentation file should be in Home tab.', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await CreateNewFileAndGiveName({pageManager}, pageManager.headerMenu.NewItemMenu.NewPresentation, oldItemName);
    await expect(pageManager.filesList.Elements.File).toBeVisible();
  });

  test('TS515. Change the name of a presentation. The presentation should be in a Home tab with a new name.', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await apiManager.createFilesAPI.CreatePresentation(oldItemName);
    await SaveOldNameRenameFileAndExpectFileRename({pageManager});
  });

  test('TS516. Change the name of a spreadsheet. The spreadsheet should be in a Home tab with a new name.', async ({pageManager, apiManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await apiManager.createFilesAPI.CreateSpreadsheet(oldItemName);
    await SaveOldNameRenameFileAndExpectFileRename({pageManager});
  });

  test('TS517. Change the name of a document. The document should be in a Home tab with a new name.', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await apiManager.createFilesAPI.CreateDocument(oldItemName);
    await SaveOldNameRenameFileAndExpectFileRename({pageManager});
  });

  test('TS518. Select file. File should be selected in Home tab.', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await apiManager.createFilesAPI.CreateDocument(oldItemName);
    await pageManager.filesList.Elements.FileIcon.click();
    await expect(pageManager.filesList.SelectionModeElements.CheckMark).toBeVisible();
  });

  test('TS519. Select all files. All files should be selected in Home tab.', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await apiManager.createFilesAPI.CreateSpreadsheet(secondName);
    await apiManager.createFilesAPI.CreateDocument(firstName);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await SelectUnselectAllFIles({pageManager});
    await expect(pageManager.filesList.Elements.UncheckMark).not.toBeTruthy();
  });

  test('TS520. Unselect all files. All files should be unselected in Home tab.', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await apiManager.createFilesAPI.CreateDocument(firstName);
    await apiManager.createFilesAPI.CreateSpreadsheet(secondName);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await SelectUnselectAllFIles({pageManager}, pageManager.filesList.SelectionModeElements.DeselectAllButton);
    await expect(pageManager.filesList.Elements.CheckMark).not.toBeTruthy();
  });

  test('TS521. Add a description to the file. The description should be in the Home tab of the file.', async ({pageManager, apiManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await apiManager.createFilesAPI.CreateDocument(oldItemName);
    await pageManager.filesList.Elements.File.click();
    await pageManager.fileDetails.WriteDescription(newItemName);
    await expect(pageManager.fileDetails.Elements.DescriptionText).toHaveText(newItemName);
  });

  test('TC523. Open Online Editor. Online Editor should be opened by clicking the “Edit” button.', async ({pageManager, apiManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await apiManager.createFilesAPI.CreateDocument(oldItemName);
    await pageManager.filesList.Elements.File.click();
    await pageManager.fileDetails.FileOptions.Edit.click();
    const editorPage = await pageManager.fileDetails.GetOnlineEditorPage();
    await expect(editorPage).toHaveTitle('Online Editor');
  });

  // Bug №139. Problem with opening a document via file versions. When you click "Open document version" an http error 500 is thrown
  test.skip('TC533. Upload and open a new document version. A document version should be opened', async ({pageManager, apiManager, page}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await apiManager.createFilesAPI.CreateDocument(oldItemName);
    await pageManager.filesList.Elements.File.click();
    await pageManager.fileDetails.Tabs.Versioning.click();
    await pageManager.fileDetails.ClickVersioningDropdownOption.OpenDocumentVersion(1);
    const [documentVersionPage] = await Promise.all([
      page.waitForEvent('popup'),
      pageManager.fileDetails.ClickVersioningDropdownOption.OpenDocumentVersion(1),
    ]);
    await expect(documentVersionPage).toHaveURL('https://2150.demo.zextras.io/services/docs/files/open/72620f9e-6e88-4e6d-bf20-abf7b62c9db8?version=1');
  });

  test('TC534. Create Microsoft Word file via header menu. File with docx extension should appear in Home folder.', async ({pageManager, page}) => {
    BaseTest.doubleTimeout();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await pageManager.headerMenu.SelectOptionInNewItemMenu.MicrosoftWordDocx();
    await pageManager.createNewItemModal.CreatedFilesName.CreateDocumentName(unicFileName);
    await expect(pageManager.filesList.Elements.FileExtensionFilteredByFileName(unicFileName)).toHaveText('docx');
  });

  test('TC535. Create Microsoft Excel file via header menu. File with xlsx extension should appear in Home folder.', async ({pageManager, page}) => {
    BaseTest.doubleTimeout();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await pageManager.headerMenu.SelectOptionInNewItemMenu.MicrosoftExcelXlsx();
    await pageManager.createNewItemModal.CreatedFilesName.CreateSpreadsheetName(unicFileName);
    await expect(pageManager.filesList.Elements.FileExtensionFilteredByFileName(unicFileName)).toHaveText('xlsx');
  });

  test('TC536. Create Microsoft PowerPoint file via header menu. File with pptx extension should appear in Home folder.', async ({pageManager, page}) => {
    BaseTest.doubleTimeout();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
    await pageManager.headerMenu.SelectOptionInNewItemMenu.MicrosoftPowerPointPptx();
    await pageManager.createNewItemModal.CreatedFilesName.CreatePresentationName(unicFileName);
    await expect(pageManager.filesList.Elements.FileExtensionFilteredByFileName(unicFileName)).toHaveText('pptx');
  });
});
