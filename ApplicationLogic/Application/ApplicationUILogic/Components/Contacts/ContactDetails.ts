import {BaseApplicationPage} from '../../Pages/BaseApplicationPage';

export class ContactDetails extends BaseApplicationPage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('_react=[path*="contactId"]'),
    EditContainer: this.page.locator('_react=[path*="editId"]'),
  };

  Dropdown = {
    DropdownList: this.page.locator(this.InheritedFields.DropdownListLocator),
  };

  TypeIcons = {
    Mobile: ('_react=[icon="SmartphoneOutline"]'),
    Work: ('_react=[icon="BriefcaseOutline"]'),
    Home: ('_react=[icon="HomeOutline"]'),
    Other: ('_react=[icon="PersonOutline"]'),
  };

  Fields = {
    FirstName: this.Containers.MainContainer.locator('_react=[label="First Name"]'),
  };

  Chevrons = {
    DetailsChevronUp: this.Containers.MainContainer.locator('_react=[data-testid="contact-preview-content-desktop"] >> _react=ArrowIosUpward'),
    DetailsChevronDown: this.Containers.MainContainer.locator('_react=[data-testid="contact-preview-content-desktop"] >> _react=ArrowIosDownward'),
    EmailChevronDown: this.Containers.MainContainer.locator('_react=[label="E-mail address"] >> _react=ArrowIosDownward'),
    PhoneNumberChevronDown: this.Containers.MainContainer.locator('_react=[label="Phone contact"] >> _react=ArrowIosDownward'),
    WebsiteChevronDown: this.Containers.MainContainer.locator('_react=[label="Website"] >> _react=ArrowIosDownward'),
    AddressChevronDown: this.Containers.MainContainer.locator('_react=[label="Address"] >> _react=ArrowIosDownward'),
  };

  ContactOptions = {
    Edit: this.Containers.MainContainer.locator('"Edit"'),
  };

  EditContactView = {
    Save: this.Containers.EditContainer.locator('"Save"'),
    FirstName: this.Containers.EditContainer.locator('[name="firstName"]'),
  };
}

