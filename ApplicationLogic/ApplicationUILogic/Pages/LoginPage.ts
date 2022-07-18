import {BasePage} from './BasePage';
import { pageManager } from '../../../TestsLogic/UITests/BaseTest';

const pageLocator: string = 'c-digital-boost-login';

export class LoginPage extends BasePage {
    readonly searchTextBox;

    TextBox = {
        Login: this.page.locator('#input-6'),
        Password: this.page.locator('#input-8')
    };

    Buttons = {
        Login: this.page.locator('"Login"'),
    };
    
    constructor(page, locator = pageLocator){
        super(page, locator);
    }

    async Login(login, password){
        var homePage = await pageManager.getHomePage(this.page);
        await homePage.Buttons.Login.click();
        await this.TextBox.Login.fill(login);
        await this.TextBox.Password.fill(password);
        await this.Buttons.Login.click();
    }
}