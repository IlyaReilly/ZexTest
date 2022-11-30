import {Page} from '@playwright/test';
import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class ChatsInfo extends BasePage {
  constructor(page: Page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator(InheritedFields.ChatInfoContainerLocator),
    MembersContainer: this.page.locator(InheritedFields.ChatMembersContainerLocator),
  };

  Buttons = {
    DeleteSpace: this.Containers.MainContainer.locator('"Delete Space"'),
    DeleteChannel: this.Containers.MainContainer.locator('"Delete Channel"'),
    RemoveMember: this.Containers.MainContainer.locator('[data-testid*="Trash2Outline"]'),
    DeleteGroup: this.Containers.MainContainer.locator('"Delete Group"'),
    EditButton: this.Containers.MainContainer.locator('[title="Edit info"]'),
    AddNewMembers: this.Containers.MainContainer.locator('"Add new members"'),
    MuteNotifications: this.Containers.MainContainer.locator('"Mute notifications"'),
    ActivateNotifications: this.Containers.MainContainer.locator('"Activate notifications"'),
    ClearHistory: this.Containers.MainContainer.locator('"Clear History"'),
    LeaveGroup: this.Containers.MainContainer.locator('"Leave Group"'),
    SaveNewName: this.Containers.MainContainer.locator('[data-testid*="SaveOutline"]'),
    AddChannel: this.Containers.MainContainer.locator('"Add Channel"'),
  };

  TextBoxes = {
    EditNameField: this.Containers.MainContainer.locator('[name="Name"]'),
    EditTopicField: this.Containers.MainContainer.locator('[name="Topic"]'),
  };

  Items = {
    Member: this.Containers.MembersContainer.locator('_react=[key^="participantListCardItem"]'),
    TopicName: this.page.locator('[overflow="ellipsis"]+[overflow="break-word"]'),
  };

  async Rename(newName) {
    await this.Buttons.EditButton.click();
    await this.TextBoxes.EditNameField.fill(newName);
    await this.Buttons.SaveNewName.click();
  };

  async ChangeTopic(newName) {
    await this.Buttons.EditButton.click();
    await this.TextBoxes.EditTopicField.fill(newName);
    await this.Buttons.SaveNewName.click();
  };
}
