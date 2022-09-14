import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';
import fs from "fs";
import { PageManager } from '../../ApplicationLogic/ApplicationUILogic/Pages/PageManager';

test.describe('Files tests', async () => {
  const oldItemName = 'Test Item 123';
  const newItemName = 'Zextras Team';
    
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

      async function SaveOldNameRenameFileAndExpectFileRename ({pageManager}) {
        const oldName = await pageManager.filesList.Elements.File.textContent();
        await pageManager.fileDetails.ClickDropdownOption.Rename();
        await pageManager.createNewItemModal.NewItemName.RenameFile(newItemName);
        await expect(pageManager.filesList.Elements.File).not.toHaveText(oldName);
      };

      test('Create document file. Document file should be in Home tab.', async ({pageManager}) => {
        await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
        await pageManager.headerMenu.SelectOptionInNewItemMenu.NewDocument();
        await pageManager.createNewItemModal.NewItemName.CreateDocumentName(oldItemName);
        await expect(pageManager.filesList.Elements.File).toBeVisible();
      });

      test('Create spreadsheet file. Spreadsheet file should be in Home tab.', async ({pageManager}) => {
        await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
        await pageManager.headerMenu.SelectOptionInNewItemMenu.NewSpreadsheet();
        await pageManager.createNewItemModal.NewItemName.CreateSpreadsheetName(oldItemName);
        await expect(pageManager.filesList.Elements.File).toBeVisible();
      });

      test('Create presentation file. Presentation file should be in Home tab.', async ({pageManager}) => {
        await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
        await pageManager.headerMenu.SelectOptionInNewItemMenu.NewPresentation();
        await pageManager.createNewItemModal.NewItemName.CreatePresentationName(oldItemName);
        await expect(pageManager.filesList.Elements.File).toBeVisible();
      });

      test('Change the name of a presentation. The presentation should be in a Home tab with a new name.', async ({pageManager}) => {
        await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
        await pageManager.headerMenu.SelectOptionInNewItemMenu.NewPresentation();
        await pageManager.createNewItemModal.NewItemName.CreatePresentationName(oldItemName);
        await SaveOldNameRenameFileAndExpectFileRename({pageManager});
      });

      test('Change the name of a spreadsheet. The spreadsheet should be in a Home tab with a new name.', async ({pageManager}) => {
        await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
        await pageManager.headerMenu.SelectOptionInNewItemMenu.NewSpreadsheet();
        await pageManager.createNewItemModal.NewItemName.CreateSpreadsheetName(oldItemName);
        await SaveOldNameRenameFileAndExpectFileRename({pageManager});
      });

      test('Change the name of a document. The document should be in a Home tab with a new name.', async ({pageManager}) => {
        await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
        await pageManager.headerMenu.SelectOptionInNewItemMenu.NewDocument();
        await pageManager.createNewItemModal.NewItemName.CreateDocumentName(oldItemName);
        await SaveOldNameRenameFileAndExpectFileRename({pageManager});
      });
});