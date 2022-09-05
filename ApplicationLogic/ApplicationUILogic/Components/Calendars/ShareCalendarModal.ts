import {BasePage} from '../../Pages/BasePage';

export class ShareCalendarModal extends BasePage {
  Containers = {
    MainContainer: this.page.locator('[data-testid="modal"]'),
  };

  ShareWithDropdown = {
    OpenClose: this.Containers.MainContainer.locator('"share with"'),
  };

  TextBoxes = {
    Recipients: this.Containers.MainContainer.locator("Recipients e-mail addresses"),
  };
}
