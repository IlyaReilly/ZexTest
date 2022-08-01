import {BasePage} from '../../Pages/BasePage';

export class MailsList extends BasePage {
    Containers = {
        MainContainer: this.page.locator('.kEvhgn'),
        LettersContainer: this.page.locator('.knclQe'),
        MailDetailsContainer: this.page.locator('.dMQfkZ'),
    };

    Elements = {
        Mail: this.Containers.MainContainer.locator('.bfkNFy'),
        Header: this.Containers.MainContainer.locator('.hsyKgr'),
        LetterSubject: this.page.locator('.jalknq '),
        NotificationBlock: this.page.locator('.bcBnwD '),
    };

    CurrentMail = {
        Inbox: this.Containers.MainContainer.locator('[data-testid="conversation-list-2"] > [tabindex="0"]'),
        Junk: this.Containers.MainContainer.locator('[data-testid="conversation-list-4"] > [tabindex="0"]'),
        Draft: this.Containers.MainContainer.locator('[data-testid="message-list-6"] > [tabindex="0"]'),
        Trash: this.Containers.MainContainer.locator('[data-testid="conversation-list-3"] > [tabindex="0"]'),
    }

    EditMail = {
        DeleteMail: this.page.locator('.gbqcnY:has([data-testid*="Trash2Outline"])'),
        SpreadOptions: this.page.locator('.JzynG:has([data-testid*="MoreVertical"])'),
        MarkAsSpam: this.page.locator('"Mark as spam"'),
    }

    constructor(page){
        super(page);
    }

    async OpenLetter(letter) {
        await letter.click();
    }

    async DeleteDraft() {
        await this.EditMail.DeleteMail.click();
    }

    async MarkAsSpam() {
        await this.EditMail.SpreadOptions.click();
        await this.EditMail.MarkAsSpam.click();
    }

}