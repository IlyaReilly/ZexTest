import { BasePage, InheritedFields } from '../../Pages/BasePage';

export class Contacts extends BasePage {
  Containers = {
    MainContainer: this.page.locator('.cPoMlt'),
    ContactsContainer: this.page.locator('.knclQe'),
  };

  EditContact = {
    DeleteContact: this.page.locator('.fHbZO:has([data-testid*="Trash2Outline"])'),
  };

  constructor(page) {
    super(page);
  }

  async DeleteContact() {
    await this.EditContact.DeleteContact.click();
  }
}
