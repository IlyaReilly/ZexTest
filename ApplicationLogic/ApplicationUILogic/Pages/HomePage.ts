import {BasePage} from './BasePage';

const pageLocator: string = '.header-watch-now';

export class HomePage extends BasePage {
    readonly searchTextBox;

    Buttons = {
        Login: this.page.locator('"Log in"'),
        Signup: this.page.locator('"Sign up"'),
        HeaderNavigationMenu: this.page.locator('.nm-nav_menu'),
    };

    Lable = {
        WelcomeHeading: this.page.locator('.welcome-heading'),
        NavigationMenuHeading: this.page.locator('.menu-item .slds-text-heading_medium'),
    }

    constructor(page, locator = pageLocator){
        super(page, locator);
    }    
}