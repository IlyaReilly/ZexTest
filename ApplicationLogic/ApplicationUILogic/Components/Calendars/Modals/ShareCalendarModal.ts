import {ShareModalWindow} from '../../ModalWindows/ShareModalWindow';


export class ShareCalendarModal extends ShareModalWindow {
  constructor(page) {
    super(page);
    this.CheckBoxes.NotificationAboutShare = this.Containers.MainContainer.locator('"Allow user(s) to see my private appointments"');
  }
}
