import {BasePage} from '../../Pages/BasePage';

export class ContactDetails extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    ContactDetailsContainer: this.page.locator('_react=[path*="contactId"]'),
    ContactEditContainer: this.page.locator('_react=[path*="editId"]'),
  };

  ContactOptions = {
    Edit: this.Containers.ContactDetailsContainer.locator('"Edit"'),
  };

  EditContactView = {
    Save: this.Containers.ContactEditContainer.locator('"Save"'),
    FirstName: this.Containers.ContactEditContainer.locator('[name="firstName"]'),
  };
}

