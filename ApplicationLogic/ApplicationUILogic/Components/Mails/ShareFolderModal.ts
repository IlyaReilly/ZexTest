import {ShareModalWindow} from '../ModalWindows/ShareModalWindow';

export class ShareFolderModal extends ShareModalWindow {
  constructor(page) {
    super(page);
    this.TextBoxes.Recipients = this.Containers.MainContainer.locator('"Recipients’ e-mail addresses" >> xpath=preceding-sibling::*');
  }

  ExtraButtons = {
    GoBack: this.Containers.MainContainer.locator('"GO BACK"'),
  };
}
