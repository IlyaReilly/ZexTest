import {BasePage} from '../../Pages/BasePage';

export class NewMail extends BasePage {
    Containers = {
        MainContainer: this.page.locator('.gOhlMI'),
    };

    mailBodyIframe = this.page.frameLocator('.tox-edit-area__iframe');

    Buttons = {
        Send: this.Containers.MainContainer.locator('"SEND"'),
        Save: this.Containers.MainContainer.locator('"SAVE"'),
    };

    TextBox = {
        To: this.Containers.MainContainer.locator('.jgQFDI'),
        Subject: this.Containers.MainContainer.locator('.ewHyMN'),
        Body: this.mailBodyIframe.locator('.mce-content-body'),
    };

    constructor(page){
        super(page);
    }

    async SendMail(to, subject, body){
        await this.TextBox.To.type(to);
        await this.TextBox.Subject.click();
        await this.TextBox.Subject.type(subject);
        await this.TextBox.Body.click();
        await this.TextBox.Body.type(body);
        await this.Buttons.Send.click();
    }
}