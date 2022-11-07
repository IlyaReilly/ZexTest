import {BasePage} from '../../Pages/BasePage';

export class ContactDetails extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    ContactDetailsContainer: this.page.locator('.lggsZb'),
  };

  ContactOptions = {
    Edit: this.Containers.ContactDetailsContainer.locator('"Edit"'),
  };

  EditContactView = {
    Save: this.Containers.ContactDetailsContainer.locator('"Save"'),
    FirstName: this.Containers.ContactDetailsContainer.locator('[name="firstName"]'),
  };
}

