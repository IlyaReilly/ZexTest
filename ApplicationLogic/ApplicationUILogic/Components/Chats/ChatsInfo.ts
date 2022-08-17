import {Page} from '@playwright/test';
import {BasePage} from '../../Pages/BasePage';

export class ChatsInfo extends BasePage {
  Containers = {
    MainContainer: this.page.locator('.krpoNZ'),
  };

  Buttons = {
    DeleteSpace: this.Containers.MainContainer.locator('"Delete Space"'),
  };

  constructor(page: Page) {
    super(page);
  }
}
