import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class NewAppointment extends BasePage {
  Containers = {
    MainContainer: this.page.locator(InheritedFields.NewItemDefaultContainerLocator),
    AttendeesDropdown: this.page.locator('.fStkje'),
  };

  bodyIframe = this.page.frameLocator(InheritedFields.NewItemBodyIframeLocator);

  Buttons = {
    Send: this.Containers.MainContainer.locator('"SEND"'),
    Save: this.Containers.MainContainer.locator('"SAVE"'),
  };

  Dropdowns = {
    Attendee: this.Containers.AttendeesDropdown.locator('.ipOeIU'),
  };

  TextBox = {
    EventTitle: this.Containers.MainContainer.locator('[name="Event title"]'),
    Location: this.Containers.MainContainer.locator('[name="Location"]'),
    Attendees: this.Containers.MainContainer.locator('div:text("Attendees")'),
    Body: this.bodyIframe.locator(InheritedFields.NewItemBodyLocator),
  };

  constructor(page) {
    super(page);
  }

  async SendAppointment(title, body) {
    await this.TextBox.EventTitle.fill(title);
    await this.TextBox.Attendees.click();
    await this.TextBox.Attendees.type('2');
    await this.page.keyboard.press('Enter');
    await this.TextBox.Body.type(body);
    await this.TextBox.Body.locator(`"${body}"`).waitFor();
    const elementHandle = await this.page.$(this.Buttons.Send._selector);
    await elementHandle?.waitForElementState('enabled');
    await this.Buttons.Send.click();
  }
}
