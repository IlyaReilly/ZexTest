import {BasePage} from '../../Pages/BasePage';

export class ContactDetails extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('_react=[path*="contactId"]'),
    EditContainer: this.page.locator('_react=[path*="editId"]'),
  };

  ContactOptions = {
    Edit: this.Containers.MainContainer.locator('"Edit"'),
  };

  EditContactView = {
    Save: this.Containers.EditContainer.locator('"Save"'),
    FirstName: this.Containers.EditContainer.locator('[name="firstName"]'),
  };
}

