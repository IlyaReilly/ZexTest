import {Page} from '@playwright/test';
import {ModalWindowBase} from '../../ModalWindows/ModalWindowBase';

export class NewChatsModal extends ModalWindowBase {
  constructor(page: Page) {
    super(page);
  };

  Buttons = {
    Create: this.Containers.MainContainer.locator('"Create"'),
  };

  NewChatDialog = {
    UserFilterTextBox: this.Containers.MainContainer.locator('[name="Type to filter the list"]'),
    UsersListItem: this.Containers.MainContainer.locator('.hrqJRI'),
    // UsersListItem: this.Containers.MainContainer.locator('.gpDdfj'),
    TopicTextbox: this.Containers.MainContainer.locator('[name="Topic"]'),
    TitleTextbox: this.Containers.MainContainer.locator('[name="Title"]'),
    UserFilterTextboxInGroup: this.Containers.MainContainer.locator('[name="Start typing to pick an address"]'),
  };

  Elements = {
    UserInFilterList: this.Containers.MainContainer.locator('.fXXPYY'),
    UserInGroupFilterList: this.page.locator('.gwYxjf'),
    CurrentUser: this.Containers.MainContainer.locator('.fWXgji'),
  };

  async CreateItem(participant, option, participant2?, title?) {
    if (option === this.NewChatDialog.UserFilterTextBox) {
      await option.fill(participant);
      await this.NewChatDialog.UsersListItem.locator('nth=-1').click();
      await this.Buttons.Create.click();
    } else if (option === this.NewChatDialog.UserFilterTextboxInGroup) {
      await this.NewChatDialog.TitleTextbox.fill(title);
      await this.NewChatDialog.UserFilterTextboxInGroup.type(participant);
      await this.Elements.UserInGroupFilterList.locator('nth=0').click();
      await this.Elements.CurrentUser.waitFor();
      await this.NewChatDialog.UserFilterTextboxInGroup.type(participant2);
      await this.Elements.UserInGroupFilterList.locator('nth=0').click();
      await this.Buttons.Create.click();
    } else {
      console.log('Incorrect option');
    };
  };

  CreatedConversations = {
    CreateChat: async (participant) => await this.CreateItem(participant, this.NewChatDialog.UserFilterTextBox),
    CreateGroup: async (participant, participant2, title) => await this.CreateItem(participant, this.NewChatDialog.UserFilterTextboxInGroup, participant2, title),
  };
}
