import {BasePage} from '../../Pages/BasePage';

export class MailsList extends BasePage {
    Containers = {
        MainContainer: this.page.locator('.kEvhgn'),
    };

    Elements = {
        Mail: this.Containers.MainContainer.locator('.bfkNFy')
    };

    constructor(page){
        super(page);
    }
}