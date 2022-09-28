import {BasePage} from '../../Pages/BasePage';

export class SideSecondaryChatsMenu extends BasePage {
  Containers = {
    MainContainer: this.page.locator('.cpSZnV'),
  };

  Buttons = {
    CreateVirtualRoom: this.Containers.MainContainer.locator('"CREATE VIRTUAL ROOM"'),
    PersonalVirtualRoom: this.Containers.MainContainer.locator('"PERSONAL VIRTUAL ROOM"'),
    CopyLink: this.Containers.MainContainer.locator('"COPY LINK"'),
  };

  Tabs = {
    Chats: this.Containers.MainContainer.locator('"Chats"'),
    Spaces: this.Containers.MainContainer.locator('"Spaces"'),
    VirtualRooms: this.Containers.MainContainer.locator('"Virtual Rooms"'),
  };

  Textboxes = {
    FilterChatsList: this.Containers.MainContainer.locator('[name="Filter chats list"]'),
  };

  Elements = {
    ConversationsListItem: this.Containers.MainContainer.locator('.beJmAt'),
    ConversationsItem: this.Containers.MainContainer.locator('.ihXgoY'),
  };

  constructor(page) {
    super(page);
  }

  OpenTab = {
    Chats: async () => await this.Tabs.Chats.click(),
    Spaces: async () => await this.Tabs.Spaces.click(),
    VirtualRooms: async () => await this.Tabs.VirtualRooms.click(),
  };

  async SelectConversationFromList(conversationTitle) {
    await this.Elements.ConversationsListItem.locator(`"${conversationTitle}"`).click();
  }
}
