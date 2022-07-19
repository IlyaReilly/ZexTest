import {BasePage} from '../Pages/BasePage';

export class NewMail extends BasePage {
    Containers = {
        MailContainer: this.page.locator('.gOhlMI'),
    };

    Buttons = {
        //NewItemMenu: this.Containers.MainContainer.locator('..byOcMA'),
    };

    UserMenu = {
        // NewEmail: this.Containers.NewItemMenuContainer.locator('"New E-mail"'),
    };

    NewItemMenu = {
        // Feedback: this.Containers.UserMenuContainer.locator('"Feedback"'),
    };

    constructor(page){
        super(page);
    }
    
    async OpenUserMenuSection(section){
        await this.Buttons.UserMenu.click()
        await section.click();
    }
}