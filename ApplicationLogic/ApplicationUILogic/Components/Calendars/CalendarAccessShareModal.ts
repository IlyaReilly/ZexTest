import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class CalendarAccessShareModal extends BasePage {
  Containers = {
    MainContainer: this.page.locator(InheritedFields.ModalWindowLocator),
  };

  Buttons = {
    IcsUrl: this.Containers.MainContainer.locator('"ICS URL"'),
    OutlookUrl: this.Containers.MainContainer.locator('"OUTLOOK URL"'),
    ViewUrl: this.Containers.MainContainer.locator('"VIEW URL"'),
  };
}
