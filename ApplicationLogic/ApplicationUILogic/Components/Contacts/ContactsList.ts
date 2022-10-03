import {BasePage} from '../../Pages/BasePage';

export class ContactsList extends BasePage {
  Containers = {
    ContactsListContainer: this.page.locator('.fkdseM'),
    // ContactsListContainer: this.page.locator('.kEvhgn'),
    ContactsListToScrollContainer: this.page.locator('.iyNrSn '),
    // ContactsListToScrollContainer: this.page.locator('.knclQe'),
    ContactDetailsContainer: this.page.locator('.efHxzb'),
    // ContactDetailsContainer: this.page.locator('.jbJu'),
  };

  EditContact = {
    DeleteContact: this.Containers.ContactDetailsContainer.locator('.iMKrCg .gwJuBI:has([data-testid*="Trash2Outline"])'),
    // DeleteContact: this.Containers.ContactDetailsContainer.locator('.fHbZO .bOlfsx:has([data-testid*="Trash2Outline"])'),
  };

  constructor(page) {
    super(page);
  }

  async DeleteContact() {
    await this.EditContact.DeleteContact.click();
  }
}
