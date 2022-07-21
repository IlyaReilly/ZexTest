import {BasePage} from '../../Pages/BasePage';

export class MailsList extends BasePage {
    Containers = {
        MainContainer: this.page.locator('.kEvhgn'),
    };

    Elements = {
        Mail: this.Containers.MainContainer.locator('.bfkNFy'),
        Header: this.Containers.MainContainer.locator('.hsyKgr'),
    };

    constructor(page){
        super(page);
    }
}