import {BasePage} from '../BasePage';

export class ShowOriginalPage extends BasePage {
  constructor(page) {
    super(page);
  };

  Element = {
    MailToShowOriginal: this.page.locator('.qPmzW'),
  };

  async OpenShowOriginalPage(mailSubject) {
    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup'),
      await this.Element.MailToShowOriginal.locator(`"${mailSubject}"`).click({button: 'right'}),
      await this.page.locator('"Show original"').click(),
    ]);
    await newPage.waitForLoadState();
    const originalContent = await newPage.locator('pre').textContent();
    return originalContent;
  };
}
