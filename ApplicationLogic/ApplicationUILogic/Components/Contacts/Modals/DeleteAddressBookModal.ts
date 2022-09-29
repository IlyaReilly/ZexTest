import {ModalWindowBase} from '../../ModalWindows/ModalWindowBase';

export class DeleteAddressBookModal extends ModalWindowBase {
  constructor(page) {
    super(page);
  };

  Buttons = {
    Delete: this.Containers.MainContainer.locator('"DELETE"'),
  };

  async DeleteAddressBookModal() {
    await this.Buttons.Delete.click();
  }
}
