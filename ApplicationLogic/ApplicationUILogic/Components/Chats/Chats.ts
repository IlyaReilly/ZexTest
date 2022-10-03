import {Page} from '@playwright/test';
import {BasePage} from '../../Pages/BasePage';

export class Chats extends BasePage {
  constructor(page: Page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('.krpoNZ'),
    DeleteSpacePopupContainer: this.page.locator('.jCXemQ'),
    // DeleteSpacePopupContainer: this.page.locator('.loeZsV'),
  };

  DeleteSpacePopup = {
    DeleteButton: this.Containers.DeleteSpacePopupContainer.locator('"Delete"'),
    RemoveButton: this.Containers.DeleteSpacePopupContainer.locator('"Remove"'),
    LeaveButton: this.Containers.DeleteSpacePopupContainer.locator('"Leave"'),
    ClearHistoryButton: this.Containers.DeleteSpacePopupContainer.locator('.fzlaBC'),
  };
}
