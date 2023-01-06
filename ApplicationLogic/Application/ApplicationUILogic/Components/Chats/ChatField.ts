import {Page} from '@playwright/test';
import {BaseApplicationPage} from '../../Pages/BaseApplicationPage';

export class ChatField extends BaseApplicationPage {
  constructor(page: Page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('[class*="InnerConversation"]'),
    NewMessageContainer: this.page.locator('[class^="ConversationCompose"]'),
    HeaderContainer: this.page.locator('[class*="ConversationHeader"]'),
  };

  TextBoxes = {
    MessageInput: this.Containers.NewMessageContainer.locator('#team-conversation-input-text'),
  };

  Elements = {
    MessageBubble: this.Containers.MainContainer.locator('_react=MessageBubble'),
  };

  Buttons = {
    SendMessage: this.Containers.NewMessageContainer.locator('[data-testid*="Navigation2"]'),
  };

  async SendCurrentMessage(message) {
    await this.TextBoxes.MessageInput.fill(message);
    await this.Buttons.SendMessage.click();
  };
}
