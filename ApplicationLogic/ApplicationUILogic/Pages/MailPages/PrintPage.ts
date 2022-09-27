import {BasePage} from '../BasePage';

export class PrintPage extends BasePage {
  constructor(page) {
    super(page);
  };

  Element = {
    MailToPrint: this.page.locator('.qPmzW'),
  };

  async OpenPrintMailPage(mailSubject) {
    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup'),
      await this.Element.MailToPrint.locator(`"${mailSubject}"`).click({button: 'right'}),
      await this.page.locator('"Print"').click(),
    ]);
    await newPage.waitForLoadState();
    const mailTitle = await newPage.locator('b').last().textContent();
    return mailTitle;
  };
}
