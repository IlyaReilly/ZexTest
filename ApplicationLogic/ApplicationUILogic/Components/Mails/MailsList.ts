import { BasePage } from '../../Pages/BasePage';

export class MailsList extends BasePage {
  Containers = {
    MainContainer: this.page.locator('.kEvhgn'),
    LettersContainer: this.page.locator('.knclQe'),
    MailDetailsContainer: this.page.locator('.dMQfkZ'),
  };

  Elements = {
    Mail: this.Containers.MainContainer.locator('.bfkNFy'),
    Header: this.Containers.MainContainer.locator('.hsyKgr'),
    LetterSubject: this.page.locator('.jalknq '),
  };

  EditMail = {
    DeleteMail: this.page.locator('.gbqcnY:has([data-testid*="Trash2Outline"])'),
    SpreadOptions: this.page.locator('.JzynG:has([data-testid*="MoreVertical"])'),
    MarkAsSpam: this.page.locator('"Mark as spam"'),
  };

  constructor(page) {
    super(page);
  }

  async OpenLetter(letter) {
    await letter.click();
  }

  async DeleteDraft() {
    await this.EditMail.DeleteMail.click();
  }

  async MarkAsSpam() {
    await this.EditMail.SpreadOptions.click();
    await this.EditMail.MarkAsSpam.click();
  }
}
