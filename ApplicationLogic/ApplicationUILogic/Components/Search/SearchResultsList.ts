import {BasePage} from '../../Pages/BasePage';

export class SearchResultsList extends BasePage {
  Containers = {
    MainContainerMail: this.page.locator('.bcMCff'),
    // MainContainerMail: this.page.locator('.gnWgSu'),
    MainContainerContacts: this.page.locator('.bcMCff'),
    // MainContainerContacts: this.page.locator('.cMxeuw'),
    MainContainerFiles: this.page.locator('.cdCZzg'),
    // MainContainerFiles: this.page.locator('.pTTry'),
    MainContainerAppointments: this.page.locator('.iJzCtl'),
    // MainContainerAppointments: this.page.locator('.gnWgSu'),
  };

  Elements = {
    SearchResultMail: this.Containers.MainContainerMail.locator('.leEMTE'),
    // SearchResultMail: this.Containers.MainContainerMail.locator('.kEfwUT'),
    SearchResultContacts: this.Containers.MainContainerContacts.locator('.jTMZGq'),
    // SearchResultContacts: this.Containers.MainContainerContacts.locator('.cfJAcc'),
    SearchResultFiles: this.Containers.MainContainerFiles.locator('.bbLqaW'),
    SearchResultAppointments: this.Containers.MainContainerAppointments.locator('.jTMZGq'),
    // SearchResultAppointments: this.Containers.MainContainerAppointments.locator('.bfkNFy'),
  };

  constructor(page) {
    super(page);
  }
}
