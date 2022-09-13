import { Locator } from '@playwright/test';
import {ModalWindowBase} from './ModalWindowBase';

export class CreateNewItemModal extends ModalWindowBase {
    constructor(page) {
        super(page);
      };

      Fields = {
        DocumentName: this.Containers.MainContainer.locator('"Document name"'),
        SpreadsheetName: this.Containers.MainContainer.locator('"Spreadsheet name"'),
        PresentationName: this.Containers.MainContainer.locator('"Presentation name"'),
        Rename: this.Containers.MainContainer.locator('"Item Name"'),
      };

      Buttons = {
        CreateButton: this.Containers.MainContainer.locator('.fzGsKw')
      };

      async CreateItemName (option, name) {
        await option.selectText();
        await option.fill(name);
        await this.Buttons.CreateButton.click();
      };

      NewItemName = {
        CreateDocumentName: async (name) => await this.CreateItemName(this.Fields.DocumentName, name),
        CreateSpreadsheetName: async (name) => await this.CreateItemName(this.Fields.SpreadsheetName, name),
        CreatePresentationName: async (name) => await this.CreateItemName(this.Fields.PresentationName, name),
        RenameFile: async (name) => await this.CreateItemName(this.Fields.Rename, name),
      };
};