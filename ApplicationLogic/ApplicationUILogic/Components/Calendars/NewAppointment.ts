import {BaseTest} from '../../../../TestsLogic/UITests/BaseTest';
import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class NewAppointment extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator(InheritedFields.NewItemBoardLocator),
    AttendeesDropdown: this.page.locator(InheritedFields.DropdownListLocator),
  };

  bodyIframe = this.page.frameLocator(InheritedFields.NewItemBodyIframeLocator);

  Buttons = {
    Send: this.Containers.MainContainer.locator('"Send"'),
    Save: this.Containers.MainContainer.locator('"Save"'),
  };

  Dropdowns = {
    Item: this.page.locator('[value="[object Object]"]'),
  };

  TextBox = {
    EventTitle: this.Containers.MainContainer.locator('[name="Event title"]'),
    Location: this.Containers.MainContainer.locator('[name="Location"]'),
    Attendees: this.Containers.MainContainer.locator('[name="Attendees"]'),
    Body: this.bodyIframe.locator(InheritedFields.NewItemBodyLocator),
  };

  CheckBoxes = {
    Private: this.Containers.MainContainer.locator('"Private"'),
  };

  async SendAppointment(title, body, attendees = BaseTest.secondUser.login, privateApp = false, location = '') {
    await this.TextBox.EventTitle.fill(title);
    await this.TextBox.Attendees.click();
    await this.TextBox.Attendees.fill(attendees);
    if (privateApp) {
      await this.CheckBoxes.Private.click();
    }
    if (location) {
      await this.TextBox.Location.fill(location);
    }
    await this.TextBox.Body.type(body);
    await this.Buttons.Send.click();
  };
}
