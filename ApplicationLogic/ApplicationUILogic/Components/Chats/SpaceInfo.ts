import {Page} from '@playwright/test';
import {BasePage} from '../../Pages/BasePage';

export class SpaceInfo extends BasePage {
  constructor(page: Page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('.krpoNZ'),
    SpaceMembersContainer: this.page.locator('.djcAQq'),
  };

  Buttons = {
    DeleteSpace: this.Containers.MainContainer.locator('"Delete Space"'),
    RemoveMember: this.Containers.MainContainer.locator('[data-testid*="Trash2Outline"]'),
    EditButton: this.Containers.MainContainer.locator('[data-testid*="Edit2Outline"]'),
    AddNewMembers: this.Containers.MainContainer.locator('"Add new members"'),
    MuteNotifications: this.Containers.MainContainer.locator('"Mute notifications"'),
    ActivateNotifications: this.Containers.MainContainer.locator('"Activate notifications"'),
    ClearHistory: this.Containers.MainContainer.locator('"Clear History"'),
    SaveNewName: this.Containers.MainContainer.locator('[data-testid*="SaveOutline"]'),
    AddChannel: this.Containers.MainContainer.locator('"Add Channel"'),
  };

  TextBoxes = {
    EditNameField: this.Containers.MainContainer.locator('[name="Name"]'),
    EditTopicField: this.Containers.MainContainer.locator('[name="Topic"]'),
  };

  Items = {
    Member: this.Containers.SpaceMembersContainer.locator('.jwUaOR'),
    TopicName: this.page.locator('.dRegei'),
  };

  async RenameSpace(newName) {
    await this.Buttons.EditButton.click();
    await this.TextBoxes.EditNameField.fill(newName);
    await this.Buttons.SaveNewName.click();
  };

  async RenameTopicSpace(newName) {
    await this.Buttons.EditButton.click();
    await this.TextBoxes.EditTopicField.fill(newName);
    await this.Buttons.SaveNewName.click();
  };
}
