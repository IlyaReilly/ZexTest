import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class ShareCalendarModal extends BasePage {
  Containers = {
    MainContainer: this.page.locator(InheritedFields.ModalWindowLocator),
  };

  Buttons = {
    ShareCalendar: this.Containers.MainContainer.locator('"SHARE CALENDAR"'),
  };

  ShareWithDropdown = {
    OpenClose: this.Containers.MainContainer.locator('"share with"'),
  };

  TextBoxes = {
    Recipients: this.Containers.MainContainer.locator('"Recipients e-mail addresses" >> xpath=preceding-sibling::*'),
  };
}
