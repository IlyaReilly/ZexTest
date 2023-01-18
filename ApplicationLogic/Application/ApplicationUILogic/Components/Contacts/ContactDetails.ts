import {BaseApplicationPage} from '../../Pages/BaseApplicationPage';

export class ContactDetails extends BaseApplicationPage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('_react=[path*="contactId"]'),
    EditContainer: this.page.locator('_react=[path*="editId"]'),
  };

  Fields = {
    FirstName: this.Containers.MainContainer.locator('_react=[label="First Name"]'),
  };

  Buttons = {
    DetailsChevronUp: this.Containers.MainContainer.locator('_react=[icon = "ArrowIosUpward"]').first(),
    DetailsChevronDown: this.Containers.MainContainer.locator('_react=[icon = "ArrowIosDownward"]').first(),

  };

  ContactOptions = {
    Edit: this.Containers.MainContainer.locator('"Edit"'),
  };

  EditContactView = {
    Save: this.Containers.EditContainer.locator('"Save"'),
    FirstName: this.Containers.EditContainer.locator('[name="firstName"]'),
  };
}

