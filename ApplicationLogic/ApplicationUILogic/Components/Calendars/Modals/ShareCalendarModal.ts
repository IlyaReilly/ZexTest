import {ShareModalWindow} from '../../ModalWindows/ShareModalWindow';


export class ShareCalendarModal extends ShareModalWindow {
  constructor(page) {
    super(page);
    this.CheckBoxes.NotificationAboutShare = this.Containers.MainContainer.locator('"Allow user(s) to see my private appointments"');
  };

  Dropdowns = {
    OpenClose: this.Containers.MainContainer.locator('"share with"'),
  };

  async ShareCalendar(recipient) {
    await this.TextBoxes.Recipients.fill(recipient);
    await this.Dropdowns.OpenClose.click();
    await this.Buttons.ShareButton.click();
  };
}
