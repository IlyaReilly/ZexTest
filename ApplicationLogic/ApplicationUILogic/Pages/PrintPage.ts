import {BasePage} from './BasePage';
// import {PageManager} from './PageManager';


export class PrintPage extends BasePage {
  constructor(page) {
    super(page);
  };

  Elements = {
    MailSubject: this.page.locator('[classname="ZhPrintSubject"]'),
    MailBody: this.page.locator('.MsgBody-html'),
  };
}
