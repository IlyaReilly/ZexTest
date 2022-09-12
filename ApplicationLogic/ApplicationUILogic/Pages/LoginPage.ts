import {BasePage} from './BasePage';
import {PageManager} from '../../ApplicationUILogic/Pages/PageManager';

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
    const pageManager = new PageManager(this.page);
    await this.TextBox.Login.fill(login);
    await this.TextBox.Password.fill(password);
    await this.Buttons.Login.click();
    await pageManager.headerMenu.Logos.MainLogo.waitFor();
  }

  async Logout() {
    const pageManager = new PageManager(this.page);
    await pageManager.headerMenu.OpenUserMenuSection(pageManager.headerMenu.UserMenu.Logout);
  }

  async Relogin(login, password) {
    await this.Logout();
    await this.Login(login, password);
  }
}
