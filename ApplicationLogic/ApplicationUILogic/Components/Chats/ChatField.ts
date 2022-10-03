import {Page} from '@playwright/test';
import {BasePage} from '../../Pages/BasePage';

export class ChatField extends BasePage {
  constructor(page: Page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('.kBfhNY'),
    NewMessageContainer: this.page.locator('.fdUDLn'),
    HeaderContainer: this.page.locator('.gdfwgB'),
  };

  TextBoxes = {
    TextArea: this.Containers.NewMessageContainer.locator('#team-conversation-input-text'),
    ChatsRaw: this.Containers.MainContainer.locator('.cAwAqd'),
  };

  Buttons = {
    SendMessage: this.Containers.NewMessageContainer.locator('[data-testid*="Navigation2"]'),
  };

  async SendCurrentMessage(message) {
    await this.TextBoxes.TextArea.fill(message);
    await this.Buttons.SendMessage.click();
  };
}
