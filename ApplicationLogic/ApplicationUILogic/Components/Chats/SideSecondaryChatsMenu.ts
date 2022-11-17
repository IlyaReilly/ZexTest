import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class SideSecondaryChatsMenu extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('_react=[defaultTab]'),
    ListContainer: this.page.locator(InheritedFields.ListContainerLocator),
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
    ConversationItem: this.Containers.ListContainer.locator('_react=[conversationId]'),
    VirtualRoomItem: this.Containers.ListContainer.locator('[class*="MeetingListItem"]'),
  };

  ConversationItemDetails = {
    Name: this.Elements.ConversationItem.locator('[color="text"]'),
    BellOffIcon: this.Elements.ConversationItem.locator('[data-testid*="BellOff"]'),
  };

  OpenTab = {
    Chats: async () => await this.Tabs.Chats.click(),
    Spaces: async () => await this.Tabs.Spaces.click(),
    VirtualRooms: async () => await this.Tabs.VirtualRooms.click(),
  };

  async SelectConversationFromList(conversationTitle) {
    await this.Elements.ConversationItem.locator(`"${conversationTitle}"`).click();
  };
}
