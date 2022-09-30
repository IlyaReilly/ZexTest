import {Page} from '@playwright/test';
import {BasePage} from '../../Pages/BasePage';

export class ChatField extends BasePage {
  constructor(page: Page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('.kBfhNY'),
    SendMessageMenuContainer: this.page.locator('.fdUDLn'),
    HeaderContainer: this.page.locator('.gdfwgB'),
  };

  Fields = {
    TextArea: this.Containers.SendMessageMenuContainer.locator('#team-conversation-input-text'),
  };

  Buttons = {
    SendMessage: this.Containers.SendMessageMenuContainer.locator('[data-testid*="Navigation2"]'),
  };

  async SendCurrentMessage(message) {
    await this.Fields.TextArea.fill(message);
    await this.Buttons.SendMessage.click();
  };
}
