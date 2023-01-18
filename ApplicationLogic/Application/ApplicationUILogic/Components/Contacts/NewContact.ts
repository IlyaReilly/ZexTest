import {BaseApplicationPage} from '../../Pages/BaseApplicationPage';

export class NewContact extends BaseApplicationPage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator(this.InheritedFields.NewItemBoardLocator),
  };

  Buttons = {
    Save: this.Containers.MainContainer.locator('"Save"'),
    PlusEmail: this.Containers.MainContainer.locator('_react=I[name = "email"] >> [data-testid = "icon: Plus"]'),
    PlusPhone: this.Containers.MainContainer.locator('_react=I[name = "phone"] >> [data-testid = "icon: Plus"]'),
    PlusWebsite: this.Containers.MainContainer.locator('_react=I[name = "URL"] >> [data-testid = "icon: Plus"]'),
    PlusAddress: this.Containers.MainContainer.locator('_react=I[name = "address"] >> [data-testid = "icon: Plus"]'),
    MinusEmail: this.Containers.MainContainer.locator('_react=I[name = "email"] >> [data-testid = "icon: Minus"]').first(),
    MinusPhone: this.Containers.MainContainer.locator('_react=I[name = "phone"] >> [data-testid = "icon: Minus"]').first(),
    MinusWebsite: this.Containers.MainContainer.locator('_react=I[name = "URL"] >> [data-testid = "icon: Minus"]').first(),
    MinusAddress: this.Containers.MainContainer.locator('_react=I[name = "address"] >> [data-testid = "icon: Minus"]').first(),
  };

  Inputs = {
    FirstName: this.Containers.MainContainer.locator('[placeholder="First Name*"]'),
    LastName: this.Containers.MainContainer.locator('[placeholder="Last Name*"]'),
    Email: this.Containers.MainContainer.locator('[placeholder="E-mail"]'),
    PhoneNumber: this.Containers.MainContainer.locator('[placeholder="Number"]'),
    Website: this.Containers.MainContainer.locator('[placeholder="Website"]'),
    Address: this.Containers.MainContainer.locator('[placeholder="Street"]'),
  };

  async CreateNewContact(firstName, lastName, email) {
    await this.Inputs.FirstName.click();
    await this.Inputs.FirstName.fill(firstName);
    await this.Inputs.LastName.click();
    await this.Inputs.LastName.fill(lastName);
    await this.Inputs.Email.click();
    await this.Inputs.Email.fill(email);
    await this.Buttons.Save.click();
  }

  //   async CreateNewContactWithDoubleEMail() {
  //     // ввести в поле одно значение
  //     // нажать на кнопку плюс
  //     // ввести в поле второе значение
  //  };

//  async CreateNewContactWithDoubleNumber() {
//   // ввести в поле одно значение
//   // нажать на кнопку плюс
//   // ввести в поле второе значение
// };
}
