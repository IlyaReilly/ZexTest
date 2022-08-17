import {Page} from '@playwright/test';
import {BasePage} from '../../Pages/BasePage';

export class Chats extends BasePage {
  Containers = {
    MainContainer: this.page.locator('.krpoNZ'),
    DeleteSpacePopupContainer: this.page.locator('.loeZsV'),
  };

  DeleteSpacePopup = {
    DeleteButton: this.Containers.DeleteSpacePopupContainer.locator('"DELETE"'),
  };

  constructor(page: Page) {
    super(page);
  }
}
