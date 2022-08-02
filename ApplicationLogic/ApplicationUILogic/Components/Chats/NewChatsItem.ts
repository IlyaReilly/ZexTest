import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class NewChatsItem extends BasePage {
    Containers = {
        MainContainer: this.page.locator('.loeZsV'),
    };

    Buttons = {
        Create: this.Containers.MainContainer.locator('"CREATE"'),
    };

    NewChatDialog = {
        UserFilterTextBox :this.Containers.MainContainer.locator('[name="Type to filter the list"]'),
        UsersListItem: this.Containers.MainContainer.locator('.gpDdfj'),
    }

    NewSpaceDialog = {
        TopicTextbox :this.Containers.MainContainer.locator('[name="Topic"]'),
        TitleTextbox :this.Containers.MainContainer.locator('[name="Title"]'),
        UserFilterTextbox :this.Containers.MainContainer.locator('[name="Start typing to pick an address"]'),
    }

    Elements = {
        UserInFilterList: this.Containers.MainContainer.locator('.fXXPYY ')
    }

    constructor(page){
        super(page);
    }

    async CreateSpace(title, topic, user){
        await this.NewSpaceDialog.TitleTextbox.fill(title);
        await this.NewSpaceDialog.TopicTextbox.fill(topic);
        await this.NewSpaceDialog.UserFilterTextbox.fill(user);
        await this.Buttons.Create.click();
    }

}