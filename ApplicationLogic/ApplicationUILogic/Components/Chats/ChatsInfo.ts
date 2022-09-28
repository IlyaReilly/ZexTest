import {Page} from '@playwright/test';
import {BasePage} from '../../Pages/BasePage';

export class ChatsInfo extends BasePage {
  constructor(page: Page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('.krpoNZ'),
    GroupContainer: this.page.locator('.dvaEfe'),
  };

  Buttons = {
    DeleteSpace: this.Containers.MainContainer.locator('"Delete Space"'),
    RemoveMember: this.Containers.GroupContainer.locator('[data-testid*="Trash2Outline"]'),
    DeleteGroup: this.Containers.GroupContainer.locator('"Delete Group"'),
  };
}
