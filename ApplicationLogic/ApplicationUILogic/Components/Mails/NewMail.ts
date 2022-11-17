import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class NewMail extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator(InheritedFields.NewItemBoardLocator),
    BeforeYouLeaveContainer: this.page.locator('[data-testid="modal"]'),
  };

  bodyIframe = this.page.frameLocator(InheritedFields.NewItemBodyIframeLocator);

  Buttons = {
    Send: this.Containers.MainContainer.locator('"Send"'),
    Save: this.Containers.MainContainer.locator('"Save"'),
    CloseCross: this.Containers.MainContainer.locator('[data-testid*="CloseOutline"]'),
    DeleteDraft: this.Containers.BeforeYouLeaveContainer.locator('"Delete Draft"'),
  };

  TextBox = {
    To: this.Containers.MainContainer.locator('[name="To"]'),
    Subject: this.Containers.MainContainer.locator('[name="Subject"]'),
    Body: this.bodyIframe.locator(InheritedFields.NewItemBodyLocator),
  };

  Dropdowns = {
    Item: this.page.locator('[value="[object Object]"]'),
  };

  async CreateNewMail(to, subject, body) {
    await this.TextBox.To.click();
    await this.TextBox.To.fill(to);
    await this.Dropdowns.Item.click();
    await this.TextBox.Subject.click();
    await this.TextBox.Subject.fill(subject);
    await this.Containers.MainContainer.locator(`"${subject}"`).waitFor();
    await this.TextBox.Body.click();
    await this.TextBox.Body.fill(body);
  };

  async SendMail() {
    await this.Buttons.Send.click();
  };

  async SaveMail() {
    await this.Buttons.Save.click();
  };

  async CloseNewMail() {
    await this.Buttons.CloseCross.click();
  };
}
