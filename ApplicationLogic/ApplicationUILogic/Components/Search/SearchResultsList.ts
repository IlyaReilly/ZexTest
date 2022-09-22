import {BasePage} from '../../Pages/BasePage';

export class SearchResultsList extends BasePage {
  Containers = {
    MainContainerMail: this.page.locator('.gnWgSu'),
    MainContainerContacts: this.page.locator('.cMxeuw'),
    MainContainerFiles: this.page.locator('.pTTry'),
    MainContainerAppointments: this.page.locator('.gnWgSu'),
  };

  Elements = {
    SearchResultMail: this.Containers.MainContainerMail.locator('.kEfwUT'),
    SearchResultContacts: this.Containers.MainContainerContacts.locator('.cfJAcc'),
    SearchResultFiles: this.Containers.MainContainerFiles.locator('.bbLqaW'),
    SearchResultAppointments: this.Containers.MainContainerAppointments.locator('.bfkNFy'),
  };

  constructor(page) {
    super(page);
  }
}
