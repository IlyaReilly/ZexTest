import {BasePage} from '../Pages/BasePage';

export class HeaderMenu extends BasePage {
    Containers = {
        MainContainer: this.page.locator('.colVne'),
        UserMenuContainer: this.page.locator('.ktmHhm'),
    };

    Buttons = {
        UserMenu: this.Containers.MainContainer.locator('.fxUdvh'),
    };

    UserMenu = {
        Feedback: this.Containers.UserMenuContainer.locator('"Feedback"'),
        UpdateView: this.Containers.UserMenuContainer.locator('"Update view"'),
        Documentation: this.Containers.UserMenuContainer.locator('"Documentation"'),
        Logout: this.Containers.UserMenuContainer.locator('"Logout"'),
    };

    Logos = {
        MainLogo: this.Containers.MainContainer.locator('.heVtQH')
    };

    constructor(page){
        super(page);
    }
    
    async OpenUserMenuSection(section){
        await this.Buttons.UserMenu.click()
        await section.click();
    }
}