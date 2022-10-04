import {ModalWindowBase} from './ModalWindowBase';

export class ShareModalWindow extends ModalWindowBase {
  constructor(page) {
    super(page);
  }

  Buttons = {
    ShareButton: this.Containers.MainContainer.locator('xpath=//button/*[contains(text(), "Share")]'),
  };

  ShareWithDropdown = {
    OpenClose: this.Containers.MainContainer.locator('"share with"'),
    UsersDropdown: this.page.locator('[data-testid="dropdown-popper-list"]'),
  };

  TextBoxes = {
    Recipients: this.Containers.MainContainer.locator('text=e-mail addresses'),
    // Recipients: this.Containers.MainContainer.locator('text=e-mail addresses >> xpath=preceding-sibling::*'),
    NoteMessage: this.Containers.MainContainer.locator('[name="Add a note to the standard message"]'),
    // NoteMessage: this.Containers.MainContainer.locator('[name="Add a note to standard message"]'),
  };

  CheckBoxes = {
    NotificationAboutShare: this.Containers.MainContainer.locator('"Send notification about this share"'),
  };
}
