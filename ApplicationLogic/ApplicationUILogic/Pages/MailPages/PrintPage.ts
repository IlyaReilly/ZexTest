import {BasePage} from '../BasePage';

export class PrintPage extends BasePage {
  constructor(page) {
    super(page);
  };

  Element = {
    MailToPrint: this.page.locator('.qPmzW'),
  };

  PassToPageButton = {
    Print: this.page.locator('"Print"'),
  };

  async OpenPrintMailPage(mailSubject) {
    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup'),
      await this.Element.MailToPrint.locator(`"${mailSubject}"`).click({button: 'right'}),
      await this.PassToPageButton.Print.click(),
    ]);
    await newPage.waitForLoadState();
    const mailTitle = await newPage.locator('b').last().textContent();
    return mailTitle;
  };
}
