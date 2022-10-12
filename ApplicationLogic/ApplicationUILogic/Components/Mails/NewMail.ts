import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class NewMail extends BasePage {
  Containers = {
    MainContainer: this.page.locator(InheritedFields.NewItemDefaultContainerLocator),
    BeforeYouLeaveContainer: this.page.locator('[data-testid="modal"]'),
  };

  bodyIframe = this.page.frameLocator(InheritedFields.NewItemBodyIframeLocator);

  Buttons = {
    Send: this.Containers.MainContainer.locator('.zZiJb :text("Send")'),
    Save: this.Containers.MainContainer.locator('"Save"'),
    CloseCross: this.Containers.MainContainer.locator('[data-testid*="CloseOutline"]'),
    // CloseCross: this.Containers.MainContainer.locator('.dkONEZ:has([data-testid*="CloseOutline"])'),
    DeleteDraft: this.Containers.BeforeYouLeaveContainer.locator('"Delete Draft"'),
  };

  TextBox = {
    To: this.Containers.MainContainer.locator('.iuroJp'),
    // To: this.Containers.MainContainer.locator('.jgQFDI'),
    Subject: this.Containers.MainContainer.locator('.YUku'),
    // Subject: this.Containers.MainContainer.locator('.ewHyMN'),
    Body: this.bodyIframe.locator(InheritedFields.NewItemBodyLocator),
  };

  constructor(page) {
    super(page);
  }

  async CreateNewMail(to, subject, body) {
    await this.TextBox.To.click();
    await this.TextBox.To.type(to);
    await this.page.keyboard.press('Enter');
    await this.TextBox.Subject.click();
    await this.TextBox.Subject.type(subject);
    await this.Containers.MainContainer.locator(`"${subject}"`).waitFor();
    await this.TextBox.Body.click();
    await this.TextBox.Body.type(body);
    await this.TextBox.Body.locator(`"${body}"`).waitFor();
  }

  async SendMail() {
    await this.Buttons.Send.click();
    await this.Buttons.DeleteDraft.waitFor();
    await this.Buttons.DeleteDraft.click();
  }

  async SaveMail() {
    await this.Buttons.Save.click();
  }

  async CloseNewMail() {
    await this.Buttons.CloseCross.click();
  }
}
