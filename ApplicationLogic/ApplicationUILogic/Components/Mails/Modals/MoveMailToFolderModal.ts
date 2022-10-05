import {ModalWindowBase} from '../../ModalWindows/ModalWindowBase';
import {InheritedFields} from '../../../Pages/BasePage';


export class MoveMailToFolderModal extends ModalWindowBase {
  constructor(page) {
    super(page);
  };

  Folders = {
    FoldersListItem: this.Containers.MainContainer.locator('.kcyMzv'),
    // FoldersListItem: this.Containers.MoveConversationContainer.locator('.kWgjwg'),
  };

  Buttons = {
    SpreadFoldersListButton: this.Containers.MainContainer.locator(InheritedFields.SpreadHidenFolders),
    NewFolderButton: this.Containers.MainContainer.locator('"New Folder"'),
    MoveButton: this.Containers.MainContainer.locator('"Move"'),
    CancelButton: this.Containers.MainContainer.locator('"Cancel"'),
  };

  async MoveMailToFolder(folderName) {
    await this.Folders.FoldersListItem.locator(`"${folderName}"`).click();
    await this.Buttons.MoveButton.click();
  }
}