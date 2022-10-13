import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class NewAppointment extends BasePage {
  Containers = {
    MainContainer: this.page.locator(InheritedFields.NewItemDefaultContainerLocator),
    AttendeesDropdown: this.page.locator('.fStkje'),
  };

  bodyIframe = this.page.frameLocator(InheritedFields.NewItemBodyIframeLocator);

  Buttons = {
    Send: this.Containers.MainContainer.locator('"Send"'),
    Save: this.Containers.MainContainer.locator('"Save"'),
  };

  Dropdowns = {
    Attendee: this.Containers.AttendeesDropdown.locator('.ipOeIU'),
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

  constructor(page) {
    super(page);
  }

  async SendAppointment(title, body, attendees = 'test1@demo.zextras.io', privateApp = false) {
    await this.TextBox.EventTitle.fill(title);
    await this.TextBox.Attendees.click();
    await this.TextBox.Attendees.type(attendees);
    await this.Dropdowns.Item.waitFor();
    await this.Dropdowns.Item.click();
    if (privateApp) {
      await this.CheckBoxes.Private.click();
    }
    await this.TextBox.Body.type(body);
    await this.TextBox.Body.locator(`"${body}"`).waitFor();
    await this.Buttons.Send.click();
  };
}
