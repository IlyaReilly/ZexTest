import {BasePage} from '../../Pages/BasePage';

export class SearchResultsList extends BasePage {
  Containers = {
    MainContainerMail: this.page.locator('.gnWgSu'),
    MainContainerContacts: this.page.locator('.cMxeuw'),
  };

  Elements = {
    SearchResultMail: this.Containers.MainContainerMail.locator('.eVGFEb'),
    SearchResultContacts: this.Containers.MainContainerContacts.locator('.cfJAcc'),
  };

  constructor(page) {
    super(page);
  }
}
