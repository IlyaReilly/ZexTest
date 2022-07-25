import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class NewMail extends BasePage {
    Containers = {
        MainContainer: this.page.locator(InheritedFields.NewItemDefaultContainerLocator),
    };

    bodyIframe = this.page.frameLocator(InheritedFields.NewItemBodyIframeLocator);

    Buttons = {
        Send: this.Containers.MainContainer.locator('"SEND"'),
        Save: this.Containers.MainContainer.locator('"SAVE"'),
        CloseCross: this.Containers.MainContainer.locator('.dkONEZ:has([data-testid*="CloseOutline"])')
    };

    TextBox = {
        To: this.Containers.MainContainer.locator('.jgQFDI'),
        Subject: this.Containers.MainContainer.locator('.ewHyMN'),
        Body: this.bodyIframe.locator(InheritedFields.NewItemBodyLocator),
    };

    constructor(page){
        super(page);
    }

    async SendMail(to, subject, body){
        await this.TextBox.To.click();
        await this.TextBox.To.type(to);
        await this.TextBox.To.locator(`"${to}"`).waitFor();
        await this.TextBox.Subject.click();
        await this.TextBox.Subject.type(subject);
        await this.Containers.MainContainer.locator(`"${subject}"`).waitFor();
        await this.TextBox.Body.click();
        await this.TextBox.Body.type(body);
        await this.TextBox.Body.locator(`"${body}"`).waitFor();
        await this.Buttons.Send.click();
    }
}