import {BaseTest} from '../../../../../TestsLogic/BaseTest';
import {BaseApplicationPage} from '../../Pages/BaseApplicationPage';

export class NewAppointment extends BaseApplicationPage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator(this.InheritedFields.NewItemBoardLocator),
    AttendeesDropdown: this.page.locator(this.InheritedFields.DropdownListLocator),
  };

  bodyIframe = this.page.frameLocator(this.InheritedFields.NewItemBodyIframeLocator);

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
    Body: this.bodyIframe.locator(this.InheritedFields.NewItemBodyLocator),
  };

  Elements = {
    DateWithTimeInervalInHeader: this.Containers.MainContainer.locator('[class^="Text__Comp"]').locator('text=/\\d{4}\\s\\d{2}:\\d{2}\\s-\\s*\\d{2}:\\d{2}/'),
    TimeZoneInHeader: this.Containers.MainContainer.locator('[class^="Text__Comp"]').locator('text=/GMT\\s\\+\\d{2}:\\d{2}/'),
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
