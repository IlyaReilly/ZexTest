import {BasePage} from '../../Pages/BasePage';

export class ContactsList extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    ContactsListContainer: this.page.locator('.gXjrJH'),
    ContactsLisntToScrollCotainer: this.page.locator('.iyNrSn '),
    ContactDetailsContainer: this.page.locator('.eskUBc'),
  };

  EditContact = {
    DeleteContact: this.Containers.ContactDetailsContainer.locator('[data-testid*="Trash2Outline"]'),
  };

  async DeleteContact() {
    await this.EditContact.DeleteContact.click();
  };
}
