import {ShareModalWindow} from '../../ModalWindows/ShareModalWindow';

export class ShareFolderModal extends ShareModalWindow {
  constructor(page) {
    super(page);
  }

  ExtraButtons = {
    GoBack: this.Containers.MainContainer.locator('"GO BACK"'),
  };

  async ShareFolder(recipient) {
    await this.TextBoxes.Recipients.fill(recipient);
    await this.page.keyboard.press('Enter');
    await this.Buttons.ShareButton.click();
  }
}
