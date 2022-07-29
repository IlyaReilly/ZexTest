import {BasePage} from '../../Pages/BasePage';

export class MailsList extends BasePage {
    Containers = {
        MainContainer: this.page.locator('.kEvhgn'),
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
        DeleteMail: this.page.locator('.gbqcnY:has([data-testid="icon: Trash2Outline"])'),
        SpreadOptions: this.page.locator('.JzynG:has([data-testid="icon: MoreVertical"])'),
        MarkAsSpam: this.page.locator('"Mark as spam"'),
    }

    constructor(page){
        super(page);
    }

    async OpenLetter(letter) {
        await letter.click();
    }

    // async OpenDraftMail() {
    //     await this.CurrentMail.Draft.click();
    // }

    // async OpenTrashMail() {
    //     await this.CurrentMail.Trash.click();
    // }

    // async OpenInboxMail() {
    //     await this.CurrentMail.Inbox.click();
    // }

    // async OpenJunkMail() {
    //     await this.CurrentMail.Junk.click();
    // }

    async DeleteDraft() {
        await this.EditMail.DeleteMail.click();
    }

    async MarkAsSpam() {
        await this.EditMail.SpreadOptions.click();
        await this.EditMail.MarkAsSpam.click();
    }


}