import {BasePage} from '../../Pages/BasePage';

export class MailsList extends BasePage {
  Containers = {
    MailsListContainer: this.page.locator('.kEvhgn'),
  };

  Elements = {
    Letter: this.Containers.MailsListContainer.locator('.qPmzW '),
  };

  constructor(page) {
    super(page);
  }

  async OpenMail(mailSubject) {
    await this.Elements.Letter.locator(`"${mailSubject}"`).first().click();
  }
}
