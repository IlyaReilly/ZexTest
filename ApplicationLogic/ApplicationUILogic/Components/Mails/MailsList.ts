import {BasePage} from '../../Pages/BasePage';

export class MailsList extends BasePage {
    Containers = {
        MainContainer: this.page.locator('.kEvhgn'),
    };

    Elements = {
        Mail: this.Containers.MainContainer.locator('.bfkNFy'),
        Header: this.Containers.MainContainer.locator('.hsyKgr'),
        LetterSubject: this.page.locator('.jalknq '),
        NotificationBlock: this.page.locator('.bcBnwD '),
    };

    constructor(page){
        super(page);
    }
}