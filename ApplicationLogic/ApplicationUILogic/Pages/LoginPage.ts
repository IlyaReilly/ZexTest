import {BasePage} from './BasePage';
import {pageManager} from '../../../TestsLogic/UITests/BaseTest';

const pageLocator: string = '.jmIrib';

export class LoginPage extends BasePage {
  readonly searchTextBox;

  TextBox = {
    Login: this.page.locator('#input-0'),
    Password: this.page.locator('#password-0'),
  };

  Buttons = {
    Login: this.page.locator('[role="button"]'),
  };

  constructor(page, locator = pageLocator) {
    super(page, locator);
  }

  async Login(login, password) {
    await this.TextBox.Login.fill(login);
    await this.TextBox.Password.fill(password);
    await this.Buttons.Login.click();
  }
}
