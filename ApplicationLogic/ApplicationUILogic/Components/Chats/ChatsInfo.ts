import {Page} from '@playwright/test';
import {BasePage} from '../../Pages/BasePage';

export class ChatsInfo extends BasePage {
  constructor(page: Page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('.bKwrsc'),
    GroupContainer: this.page.locator('.iPnaaZ'),
    GroupMembersContainer: this.page.locator('.ljjqPP'),
  };

  Buttons = {
    DeleteSpace: this.Containers.MainContainer.locator('"Delete Space"'),
    DeleteChannel: this.Containers.MainContainer.locator('"Delete Channel"'),
    RemoveMember: this.Containers.GroupContainer.locator('[data-testid*="Trash2Outline"]'),
    DeleteGroup: this.Containers.GroupContainer.locator('"Delete Group"'),
    EditButton: this.Containers.GroupContainer.locator('[data-testid*="Edit2Outline"]'),
    AddNewMembers: this.Containers.GroupContainer.locator('"Add new members"'),
    MuteNotifications: this.Containers.GroupContainer.locator('"Mute notifications"'),
    ActivateNotifications: this.Containers.GroupContainer.locator('"Activate notifications"'),
    ClearHistory: this.Containers.GroupContainer.locator('"Clear History"'),
    LeaveGroup: this.Containers.GroupContainer.locator('"Leave Group"'),
    SaveNewName: this.Containers.GroupContainer.locator('[data-testid*="SaveOutline"]'),
  };

  TextBoxes = {
    EditNameField: this.Containers.GroupContainer.locator('[name="Topic"]'),
  };

  Items = {
    Member: this.Containers.GroupMembersContainer.locator('.dBFnCo'),
  };

  async RenameGroup(newName) {
    await this.Buttons.EditButton.click();
    await this.TextBoxes.EditNameField.waitFor();
    await this.TextBoxes.EditNameField.fill(newName);
    await this.Containers.GroupContainer.locator(`[value="${newName}"]`).waitFor();
    await this.Buttons.SaveNewName.click();
  };
}
