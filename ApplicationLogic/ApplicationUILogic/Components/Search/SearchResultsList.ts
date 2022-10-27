import {BasePage} from '../../Pages/BasePage';

export class SearchResultsList extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainerMail: this.page.locator('.ereURg'),
    // MainContainerMail: this.page.locator('.gnWgSu'),
    MainContainerContacts: this.page.locator('.dLDkZK'),
    // MainContainerContacts: this.page.locator('.cMxeuw'),
    MainContainerFiles: this.page.locator('.gcSrJU'),
    // MainContainerFiles: this.page.locator('.pTTry'),
    MainContainerAppointments: this.page.locator('.iJzCtl'),
    // MainContainerAppointments: this.page.locator('.gnWgSu'),
  };

  Elements = {
    SearchResultMail: this.Containers.MainContainerMail.locator('.fbCbGB'),
    // SearchResultMail: this.Containers.MainContainerMail.locator('.kEfwUT'),
    SearchResultContacts: this.Containers.MainContainerContacts.locator('.vEXXw'),
    // SearchResultContacts: this.Containers.MainContainerContacts.locator('.cfJAcc'),
    SearchResultFiles: this.Containers.MainContainerFiles.locator('.cNpbyA'),
    SearchResultAppointments: this.Containers.MainContainerAppointments.locator('.jTMZGq'),
    // SearchResultAppointments: this.Containers.MainContainerAppointments.locator('.bfkNFy'),
  };
}
