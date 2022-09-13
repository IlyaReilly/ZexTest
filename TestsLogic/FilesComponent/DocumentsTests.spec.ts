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

      test('Create document file. Document file should be created.', async ({pageManager}) => {
        await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
        await pageManager.headerMenu.SelectItemInNewItemMenu.NewDocument();
        await pageManager.createNewItemModal.NewItemName.CreateDocumentName(oldItemName);
      });

      test('Create spreadsheet file. Presentation file should be created.', async ({pageManager}) => {
        await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
        await pageManager.headerMenu.SelectItemInNewItemMenu.NewSpreadsheet();
        await pageManager.createNewItemModal.NewItemName.CreateSpreadsheetName(oldItemName);
      });

      test('Create presentation file. Presentation file should be created.', async ({pageManager}) => {
        await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
        await pageManager.headerMenu.SelectItemInNewItemMenu.NewPresentation();
        await pageManager.createNewItemModal.NewItemName.CreatePresentationName(oldItemName);
      });

      test('Create presentation file and change his name. Presentation file should be renamed.', async ({pageManager}) => {
        await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
        await pageManager.headerMenu.SelectItemInNewItemMenu.NewPresentation();
        await pageManager.createNewItemModal.NewItemName.CreatePresentationName(oldItemName);
        await SaveOldNameRenameFileAndExpectFileRename({pageManager});
      });

      test('Create spreadsheet file and change his name. Spreadsheet file should be renamed.', async ({pageManager}) => {
        await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
        await pageManager.headerMenu.SelectItemInNewItemMenu.NewSpreadsheet();
        await pageManager.createNewItemModal.NewItemName.CreateSpreadsheetName(oldItemName);
        await SaveOldNameRenameFileAndExpectFileRename({pageManager});
      });

      test('Create document file and change his name. Document file should be renamed.', async ({pageManager}) => {
        await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
        await pageManager.headerMenu.SelectItemInNewItemMenu.NewDocument();
        await pageManager.createNewItemModal.NewItemName.CreateDocumentName(oldItemName);
        await SaveOldNameRenameFileAndExpectFileRename({pageManager});
      });
});