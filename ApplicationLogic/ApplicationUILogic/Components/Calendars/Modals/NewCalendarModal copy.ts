import {ModalWindowBase} from '../../ModalWindows/ModalWindowBase';

export class NewCalendarModalCopy extends ModalWindowBase {
  letteral;


  constructor(page) {
    super(page);
    this.letteral = 1111;
  }
  
  Locators = {
    var1: this.letteral.field1.locator('111'),
  };

  Buttons = {
    Create: this.Containers.MainContainer.locator('"Create"'),
  };

  TextBoxes = {
    CalendarName: this.Containers.MainContainer.locator('[name="Calendar name"]'),
  };
}
