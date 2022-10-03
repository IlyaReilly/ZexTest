import {Page} from '@playwright/test';
import {BasePage} from '../../../Pages/BasePage';

export class NewChatsItemModal extends BasePage {
  constructor(page: Page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('.jCXemQ'),
    GroupContainer: this.page.locator('.jNxpYb'),
  };

  Buttons = {
    Create: this.Containers.MainContainer.locator('"Create"'),
  };

  NewChatDialog = {
    UserFilterTextBox: this.Containers.MainContainer.locator('[name="Type to filter the list"]'),
    UsersListItem: this.Containers.MainContainer.locator('.hrqJRI'),
  };

  NewSpaceDialog = {
    TopicTextbox: this.Containers.MainContainer.locator('[name="Topic"]'),
    TitleTextbox: this.Containers.MainContainer.locator('[name="Title"]'),
    UserFilterTextbox: this.Containers.MainContainer.locator('[name="Start typing to pick an address"]'),
  };

  Elements = {
    UserInFilterList: this.Containers.MainContainer.locator('.fXXPYY'),
    UserInGroupFilterList: this.page.locator('.gwYxjf'),
  };

  async CreateItem(option, participant, participant2?, title?) {
    if (option === this.NewChatDialog.UserFilterTextBox) {
      await option.fill(participant);
      await this.NewChatDialog.UsersListItem.locator('nth=-1').click();
      await this.Buttons.Create.click();
    } else if (option === this.Containers.GroupContainer) {
      await this.NewSpaceDialog.TitleTextbox.fill(title);
      await this.NewSpaceDialog.UserFilterTextbox.type(participant);
      await this.Elements.UserInGroupFilterList.locator('nth=0').click();
      await this.NewSpaceDialog.UserFilterTextbox.type(participant2);
      await this.Elements.UserInGroupFilterList.locator('nth=0').click();
      await this.Buttons.Create.click();
    };
  };

  async CreateSpace(title: string, topic: string, user: string) {
    await this.NewSpaceDialog.TitleTextbox.fill(title);
    await this.NewSpaceDialog.TopicTextbox.fill(topic);
    await this.NewSpaceDialog.UserFilterTextbox.fill(user);
    await this.Buttons.Create.click();
  };

  CreatedConversations = {
    CreateChat: async (participant) => await this.CreateItem(this.NewChatDialog.UserFilterTextBox, participant),
    CreateGroup: async (participant, participant2, title) => await this.CreateItem(this.Containers.GroupContainer, participant, participant2, title),
  };
}
