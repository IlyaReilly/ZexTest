import {BasePage} from '../../Pages/BasePage';

export class MailsList extends BasePage {
  Containers = {
    MainContainer: this.page.locator('.kEvhgn'),
    LettersContainer: this.page.locator('.knclQe'),
  };

  Elements = {
    Header: this.Containers.MainContainer.locator('.hsyKgr'),
    Letter: this.Containers.MainContainer.locator('.qPmzW '),
  };

  constructor(page) {
    super(page);
  }

  async OpenMail(mailSubject) {
    await this.Elements.Letter.locator(`"${mailSubject}"`).click();
  }
}
