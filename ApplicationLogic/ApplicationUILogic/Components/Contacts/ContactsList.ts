import {BasePage} from '../../Pages/BasePage';

export class ContactsList extends BasePage {
  Containers = {
    ContactsListContainer: this.page.locator('.gXjrJH'),
    // ContactsListContainer: this.page.locator('.fkdseM'),
    // ContactsListContainer: this.page.locator('.kEvhgn'),
    ContactsLisntToScrollCotainer: this.page.locator('.iyNrSn '),
    // ContactsListToScrollContainer: this.page.locator('.knclQe'),
    ContactDetailsContainer: this.page.locator('.eskUBc'),
    // ContactDetailsContainer: this.page.locator('.efHxzb'),
    // ContactDetailsContainer: this.page.locator('.jbJu'),
  };

  EditContact = {
    DeleteContact: this.Containers.ContactDetailsContainer.locator('[data-testid*="Trash2Outline"]'),
  };

  constructor(page) {
    super(page);
  }

  async DeleteContact() {
    await this.EditContact.DeleteContact.click();
  }
}
