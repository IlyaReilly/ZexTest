import {ModalWindowBase} from '../ModalWindows/ModalWindowBase';

export class NewCalendarModal extends ModalWindowBase {
  constructor(page) {
    super(page);
  }

  Buttons = {
    Create: this.Containers.MainContainer.locator('"CREATE"'),
  };

  TextBoxes = {
    CalendarName: this.Containers.MainContainer.locator('[name="Calendar name"]'),
  };
}
