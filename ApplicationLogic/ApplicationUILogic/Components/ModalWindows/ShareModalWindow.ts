import {ModalWindowBase} from './ModalWindowBase';

export class ShareModalWindow extends ModalWindowBase {
  constructor(page) {
    super(page);
  }

  Buttons = {
    ShareCalendar: this.Containers.MainContainer.locator('"SHARE CALENDAR"'),
  };

  ShareWithDropdown = {
    OpenClose: this.Containers.MainContainer.locator('"share with"'),
  };

  TextBoxes = {
    Recipients: this.Containers.MainContainer.locator('"Recipients e-mail addresses" >> xpath=preceding-sibling::*'),
    NoteMessage: this.Containers.MainContainer.locator('[name="Add a note to standard message"]'),
  };

  CheckBoxes = {
    NotificationAboutShare: this.Containers.MainContainer.locator('"Send notification about this share"'),
  };
}
