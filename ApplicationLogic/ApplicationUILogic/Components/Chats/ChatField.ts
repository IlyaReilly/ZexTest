import {Page} from '@playwright/test';
import {BasePage} from '../../Pages/BasePage';

export class ChatField extends BasePage {
  constructor(page: Page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('.jnbwOR'),
    NewMessageContainer: this.page.locator('.fMMLSe'),
    HeaderContainer: this.page.locator('.kKIfqg'),
  };

  TextBoxes = {
    TextArea: this.Containers.NewMessageContainer.locator('#team-conversation-input-text'),
    ChatsRaw: this.Containers.MainContainer.locator('.cyNffs'),
  };

  Buttons = {
    SendMessage: this.Containers.NewMessageContainer.locator('[data-testid*="Navigation2"]'),
  };

  async SendCurrentMessage(message) {
    await this.TextBoxes.TextArea.fill(message);
    await this.Buttons.SendMessage.click();
  };
}
