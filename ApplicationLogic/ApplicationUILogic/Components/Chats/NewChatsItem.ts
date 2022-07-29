import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class NewChatsItem extends BasePage {
    Containers = {
        MainContainer: this.page.locator('.loeZsV'),
    };

    Buttons = {
        Create: this.Containers.MainContainer.locator('"CREATE"'),
    };

    NewChatDialog = {
        FilterTextBox :this.Containers.MainContainer.locator('[name="Type to filter the list"]'),
    }

    constructor(page){
        super(page);
    }

}