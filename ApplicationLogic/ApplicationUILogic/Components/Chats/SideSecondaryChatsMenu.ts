import {BasePage} from '../../Pages/BasePage';

export class SideSecondaryChatsMenu extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('.gYbcBj'),
  };

  Buttons = {
    CreateVirtualRoom: this.Containers.MainContainer.locator('"Create Virtual Room"'),
    PersonalVirtualRoom: this.Containers.MainContainer.locator('"PERSONAL VIRTUAL ROOM"'),
    CopyLink: this.Containers.MainContainer.locator('"COPY LINK"'),
    OpenDropdown: this.Containers.MainContainer.locator('[data-testid*="ArrowIosDownward"]'),
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
    ConversationsListItem: this.Containers.MainContainer.locator('.beVSSX'),
    ConversationsItem: this.Containers.MainContainer.locator('.hXnMHQ'),
<<<<<<< HEAD
    VirtualRoomItem: this.Containers.MainContainer.locator('.hPoTzp'),
    //  ConversationsItem: this.Containers.MainContainer.locator('.ihXgoY'),
=======
>>>>>>> main
  };

  ConversationItemDetails = {
    Name: this.Elements.ConversationsItem.locator('.fCABYp'),
    BellOffIcon: this.Elements.ConversationsListItem.locator('[data-testid*="BellOff"]'),
  };

  OpenTab = {
    Chats: async () => await this.Tabs.Chats.click(),
    Spaces: async () => await this.Tabs.Spaces.click(),
    VirtualRooms: async () => await this.Tabs.VirtualRooms.click(),
  };

  async SelectConversationFromList(conversationTitle) {
    await this.Elements.ConversationsListItem.locator(`"${conversationTitle}"`).click();
  };
}
