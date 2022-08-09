import {BasePage} from '../../Pages/BasePage';

export class MailDetails extends BasePage {
  Containers = {
    MailDetailsContainer: this.page.locator('.jbyjRV'),
    MailOptionsContainer: this.page.locator('.izBNKP'),
  };

  Elements = {
    LetterSubject: this.Containers.MailDetailsContainer.locator('.jalknq'),
  };

  EditMail = {
    DeleteMail: this.Containers.MailDetailsContainer.locator('.gbqcnY:has([data-testid*="Trash2Outline"])'),
    SpreadOptions: this.Containers.MailDetailsContainer.locator('.JzynG:has([data-testid*="MoreVertical"])'),
  };

  MailOptions = {
    Move: this.Containers.MailOptionsContainer.locator('"Move"'),
    Tags: this.Containers.MailOptionsContainer.locator('"Tags"'),
    Print: this.Containers.MailOptionsContainer.locator('"Print"'),
    AddFlag: this.Containers.MailOptionsContainer.locator('"Add flag"'),
    Redirect: this.Containers.MailOptionsContainer.locator('"Redirect"'),
    EditAsNew: this.Containers.MailOptionsContainer.locator('"Edit as new"'),
    MarkAsSpam: this.Containers.MailOptionsContainer.locator('"Mark as spam"'),
    ShowOriginal: this.Containers.MailOptionsContainer.locator('"Show original"'),

  };

  constructor(page) {
    super(page);
  }

  async DeleteDraft() {
    await this.EditMail.DeleteMail.click();
  }

  async MarkAsSpam() {
    await this.EditMail.SpreadOptions.click();
    await this.MailOptions.MarkAsSpam.click();
  }
}
