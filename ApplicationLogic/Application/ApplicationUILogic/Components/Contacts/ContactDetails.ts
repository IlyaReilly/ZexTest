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
    DetailsChevronUp: this.Containers.MainContainer.locator('_react=[data-testid="contact-preview-content-desktop"] >> _react=ArrowIosUpward'),
    DetailsChevronDown: this.Containers.MainContainer.locator('_react=[data-testid="contact-preview-content-desktop"] >> _react=ArrowIosDownward'),

  };

  ContactOptions = {
    Edit: this.Containers.MainContainer.locator('"Edit"'),
  };

  EditContactView = {
    Save: this.Containers.EditContainer.locator('"Save"'),
    FirstName: this.Containers.EditContainer.locator('[name="firstName"]'),
  };
}

