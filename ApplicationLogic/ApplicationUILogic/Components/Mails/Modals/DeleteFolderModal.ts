import {ModalWindowBase} from '../../ModalWindows/ModalWindowBase';


export class DeleteFolderModal extends ModalWindowBase {
  constructor(page) {
    super(page);
  }

  Buttons = {
    Cancel: this.Containers.MainContainer.locator('"Cancel"'),
    // Cancel: this.Containers.MainContainer.locator('"CANCEL"'),
    Ok: this.Containers.MainContainer.locator('"Ok"'),
    // Ok: this.Containers.MainContainer.locator('"OK"'),
  };

  async DeleteFolder() {
    await this.Buttons.Ok.click();
  }
}
