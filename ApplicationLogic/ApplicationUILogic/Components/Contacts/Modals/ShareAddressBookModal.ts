import {ShareModalWindow} from '../../ModalWindows/ShareModalWindow';

export class ShareAddressBookModal extends ShareModalWindow {
  constructor(page) {
    super(page);
  };

  ExtraButtons = {
    GoBack: this.Containers.MainContainer.locator('"GO BACK"'),
  };

  async ShareAddressBook(recipient) {
    await this.TextBoxes.Recipients.fill(recipient);
    await this.TextBoxes.Recipients.press('Enter');
    await this.Buttons.ShareButton.click();
  };
};
