import {BasePage} from '../BasePage';

export class ShowOriginalPage extends BasePage {
  constructor(page) {
    super(page);
  };

  Element = {
    MailToShowOriginal: this.page.locator('.jTMZGq'),
    // MailToShowOriginal: this.page.locator('.qPmzW'),
  };

  PassToPageOption = {
    ShowOriginal: this.page.locator('"Show original"'),
  };

  async OpenShowOriginalPage(mailSubject) {
    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup'),
      await this.Element.MailToShowOriginal.locator(`"${mailSubject}"`).click({button: 'right'}),
      await this.PassToPageOption.ShowOriginal.click(),
    ]);
    await newPage.waitForLoadState();
    const originalContent = await newPage.locator('pre').textContent();
    return originalContent;
  };
}
