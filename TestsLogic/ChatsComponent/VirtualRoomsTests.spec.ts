import {expect} from '@playwright/test';
import {test} from '../UITests/BaseTest';

test.describe('Virtual Rooms tests', async () => {
  let dateTimePrefix;
  let virtualRoomTitle;

  test.beforeEach(async ({pageManager, apiManager}) => {
    await CleanConversationsPanel({apiManager});
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    virtualRoomTitle = dateTimePrefix + ' Autotest Group Topic';
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Chats);
  });

  test.afterAll(async ({apiManager}) => {
    await CleanConversationsPanel({apiManager});
  });

  async function CleanConversationsPanel({apiManager}) {
    const conversations = await apiManager.chatsAPI.GetConversations();
    await Promise.all(conversations.map(async (conversation) => {
      return apiManager.deleteChatsAPI.DeleteGroup(conversation.id);
    }));
  };

  async function CreateVirtualRoom({pageManager}, title) {
    await pageManager.sideSecondaryChatsMenu.Buttons.CreateVirtualRoom.click();
    await pageManager.newVirtualRoomsModal.CreateVirtualRoom(title);
  }
  // Virtual room does not appear in Virtual Rooms Tab
  test('Create virtual room. Virtual room should be visible in Virtual Rooms Tab.', async ({pageManager}) => {
    test.fail();
    await CreateVirtualRoom({pageManager}, virtualRoomTitle);
    await pageManager.sideSecondaryChatsMenu.OpenTab.VirtualRooms();
    await expect(pageManager.sideSecondaryChatsMenu.Elements.ConversationsItem.locator(`"${virtualRoomTitle}"`)).toBeVisible();
  });

  test('Copy Virtual room link. Virtual room link should be in clipboard.', async ({page, pageManager, apiManager}) => {
    await apiManager.createChatsAPI.CreateVirtualRoom(virtualRoomTitle);
    await pageManager.sideSecondaryChatsMenu.OpenTab.VirtualRooms();
    await pageManager.sideSecondaryChatsMenu.Elements.ConversationsItem.click();
    await pageManager.virtualRoomField.Buttons.VirtualRoomLink.click();
    const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());
    const [meetingPage] = await Promise.all([
      page.context().waitForEvent('page'),
      pageManager.virtualRoomField.Buttons.JoinVirtualRoom.click(),
    ]);
    expect(clipboardContent).toBe(meetingPage.url());
  });
});
