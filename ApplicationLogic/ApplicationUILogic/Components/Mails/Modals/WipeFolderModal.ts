import {ModalWindowBase} from '../../ModalWindows/ModalWindowBase';


export class WipeFolderModal extends ModalWindowBase {
  constructor(page) {
    super(page);
  }

  Buttons = {
    Wipe: this.Containers.MainContainer.locator('"WIPE"'),
  };

  async WipeNewFolder() {
    await this.Buttons.Wipe.click();
  }
}
