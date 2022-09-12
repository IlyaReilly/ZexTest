import {ModalWindowBase} from '../ModalWindows/ModalWindowBase';


export class MoveFolderModal extends ModalWindowBase {
  constructor(page) {
    super(page);
  }

  TextBoxes = {
    FilterFolders: this.Containers.MainContainer.locator('[placeholder="Filter folders"]'),
  };

  Folders = {
    Inbox: this.Containers.MainContainer.locator('"Inbox"'),
  };

  Buttons = {
    Cancel: this.Containers.MainContainer.locator('"CANCEL"'),
    Move: this.Containers.MainContainer.locator('"MOVE"'),
  };

  async MoveNewFolderToInbox() {
    await this.Folders.Inbox.click();
    await this.Buttons.Move.click();
  }
}
