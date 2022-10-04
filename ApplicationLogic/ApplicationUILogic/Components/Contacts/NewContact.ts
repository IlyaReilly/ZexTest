import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class NewContact extends BasePage {
  Containers = {
    MainContainer: this.page.locator(InheritedFields.NewItemDefaultContainerLocator),
  };

  Buttons = {
    Save: this.Containers.MainContainer.locator('"Save"'),
  };

  Inputs = {
    FirstName: this.Containers.MainContainer.locator('[placeholder="First Name*"]'),
    LastName: this.Containers.MainContainer.locator('[placeholder="Last Name*"]'),
    Email: this.Containers.MainContainer.locator('[placeholder="E-mail"]'),
  };

  constructor(page) {
    super(page);
  }

  async CreateNewContact(firstName, lastName, email) {
    await this.Inputs.FirstName.click();
    await this.Inputs.FirstName.fill(firstName);
    await this.Inputs.LastName.click();
    await this.Inputs.LastName.fill(lastName);
    await this.Inputs.Email.click();
    await this.Inputs.Email.fill(email);
    await this.Buttons.Save.click();
  }
}
