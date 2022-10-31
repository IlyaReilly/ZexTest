import {Page} from '@playwright/test';
import {BasePage} from '../../Pages/BasePage';

export class VirtualRoomField extends BasePage {
  constructor(page: Page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('.iXsBey'),
  };

  Buttons = {
    VirtualRoomLink: this.Containers.MainContainer.locator(`text=Virtual Room's link`),
    JoinVirtualRoom: this.Containers.MainContainer.locator('text=Join Virtual Room'),
  };
}
