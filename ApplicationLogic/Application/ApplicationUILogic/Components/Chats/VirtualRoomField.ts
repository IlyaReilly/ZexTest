import {Page} from '@playwright/test';
import {BaseApplicationPage} from '../../Pages/BaseApplicationPage';

export class VirtualRoomField extends BaseApplicationPage {
  constructor(page: Page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('[class*="PageContainer"]'),
  };

  Buttons = {
    VirtualRoomLink: this.Containers.MainContainer.locator(`text=Virtual Room's link`),
    JoinVirtualRoom: this.Containers.MainContainer.locator('"Join Virtual Room"'),
    DeleteVirtualRoom: this.Containers.MainContainer.locator('"Delete Virtual Room"'),
  };
}
