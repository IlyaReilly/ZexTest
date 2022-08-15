import {BasePage} from '../../Pages/BasePage';

export class SearchResultsList extends BasePage {
  Containers = {
    MainContainerMail: this.page.locator('.gnWgSu'),
    MainContainerContacts: this.page.locator('.cMxeuw'),
    MainContainerFiles: this.page.locator('.pTTry'),
  };

  Elements = {
    SearchResultMail: this.Containers.MainContainerMail.locator('.eVGFEb'),
    SearchResultContacts: this.Containers.MainContainerContacts.locator('.cfJAcc'),
    SearchResultFiles: this.Containers.MainContainerFiles.locator('.bbLqaW'),
  };

  constructor(page) {
    super(page);
  }
}
