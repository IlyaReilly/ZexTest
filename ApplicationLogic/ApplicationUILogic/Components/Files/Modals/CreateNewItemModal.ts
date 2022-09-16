import {ModalWindowBase} from '../../ModalWindows/ModalWindowBase';

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
    CreateButton: this.Containers.MainContainer.locator('.fzGsKw'),
  };

  async CreateItem(option, name) {
    await option.selectText();
    await option.fill(name);
    await this.Buttons.CreateButton.click();
  };

  CreatedFilesName = {
    CreateDocumentName: async (name) => await this.CreateItem(this.Fields.DocumentName, name),
    CreateSpreadsheetName: async (name) => await this.CreateItem(this.Fields.SpreadsheetName, name),
    CreatePresentationName: async (name) => await this.CreateItem(this.Fields.PresentationName, name),
    RenameFile: async (name) => await this.CreateItem(this.Fields.Rename, name),
  };
};
