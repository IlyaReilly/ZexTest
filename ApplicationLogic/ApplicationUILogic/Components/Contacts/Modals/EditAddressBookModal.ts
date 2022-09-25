import {ModalWindowBase} from '../../ModalWindows/ModalWindowBase';

export class EditAddressBookModal extends ModalWindowBase {
  constructor(page) {
    super(page);
  }

  Buttons = {
    Edit: this.Containers.MainContainer.locator('"EDIT"'),
  };

  TextBoxes = {
    AddressBookName: this.Containers.MainContainer.locator('[placeholder="Address book name"]'),
  };
}
