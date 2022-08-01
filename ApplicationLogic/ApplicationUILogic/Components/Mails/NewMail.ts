import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class NewMail extends BasePage {
  Containers = {
    MainContainer: this.page.locator(InheritedFields.NewItemDefaultContainerLocator),
  };

  bodyIframe = this.page.frameLocator(InheritedFields.NewItemBodyIframeLocator);

  Buttons = {
    Send: this.Containers.MainContainer.locator('"SEND"'),
    Save: this.Containers.MainContainer.locator('"SAVE"'),
    CloseCross: this.Containers.MainContainer.locator('.dkONEZ:has([data-testid*="CloseOutline"])'),
    DeleteIcon: this.page.locator('.gbqcnY:has([data-testid="icon: Trash2Outline"])'),
    SpreadOptions: this.page.locator('.JzynG:has([data-testid="icon: MoreVertical"])'),
    Spam: this.page.locator('"Mark as spam"'),
  };

  TextBox = {
    To: this.Containers.MainContainer.locator('.jgQFDI'),
    Subject: this.Containers.MainContainer.locator('.ewHyMN'),
    Body: this.bodyIframe.locator(InheritedFields.NewItemBodyLocator),
  };

  Mail = {
    Inbox: this.page.locator('//div[@data-testid="conversation-list-2"]/div[@tabindex="0"]'),
    Junk: this.page.locator('//div[@data-testid="conversation-list-4"]/div[@tabindex="0"]'),
    Draft: this.page.locator('//div[@data-testid="message-list-6"]/div[@tabindex="0"]'),
    Trash: this.page.locator('//div[@data-testid="conversation-list-3"]/div[@tabindex="0"]'),
  };

  constructor(page) {
    super(page);
  }

  async CreateNewMail(to, subject, body) {
    await this.TextBox.To.click();
    await this.TextBox.To.type(to);
    await this.TextBox.To.locator(`"${to}"`).waitFor();
    await this.TextBox.Subject.click();
    await this.TextBox.Subject.type(subject);
    await this.Containers.MainContainer.locator(`"${subject}"`).waitFor();
    await this.TextBox.Body.click();
    await this.TextBox.Body.type(body);
    await this.TextBox.Body.locator(`"${body}"`).waitFor();
  }

  async SendMail() {
    await this.Buttons.Send.click();
  }

  async SaveMail() {
    await this.Buttons.Save.click();
  }

  async CloseNewMail() {
    await this.Buttons.CloseCross.click();
  }

  async OpenDraftMail() {
    await this.Mail.Draft.click();
  }

  async DeleteDraft() {
    await this.Buttons.DeleteIcon.click();
  }

  async OpenTrashMail() {
    await this.Mail.Trash.click();
  }

  async OpenInboxMail() {
    await this.Mail.Inbox.click();
  }

  async RefreshPage() {
    await this.page.reload({timeout: 3000});
  }

  async MarkAsSpam() {
    await this.Buttons.SpreadOptions.click();
    await this.Buttons.Spam.click();
  }

  async OpenJunkMail() {
    await this.Mail.Junk.click();
  }
}
