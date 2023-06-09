import {expect} from '@playwright/test';
import {test, BaseTest} from '../../BaseTest';

test.describe('Virtual Rooms tests', async () => {
  let dateTimePrefix;
  let virtualRoomTitle;

  test.beforeEach(async ({pageManager, apiManager}) => {
    BaseTest.setFeatureSuite.chats();
    await CleanConversationsPanel({apiManager});
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    virtualRoomTitle = dateTimePrefix + ' Autotest Group Topic';
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Chats);
  });

  test.afterEach(async ({apiManager, page}) => {
    await CleanConversationsPanel({apiManager});
    await page.close();
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
  };

  async function CreateVirtualRoomAndOpenDetails({apiManager, pageManager}) {
    await apiManager.createChatsAPI.CreateVirtualRoom(virtualRoomTitle);
    await pageManager.sideSecondaryChatsMenu.OpenTab.VirtualRooms();
    await pageManager.sideSecondaryChatsMenu.Elements.VirtualRoomItem.click();
  };
  // Virtual room does not appear in Virtual Rooms Tab,  Virtual room tab does not appear
  test('TC419. Create virtual room. Virtual room should be visible in Virtual Rooms Tab. @smoke', async ({pageManager}) => {
    BaseTest.setSuite.smoke();
    test.fail(true, 'Virtual room does not appear in Virtual Rooms Tab,  Virtual room tab does not appear');
    await CreateVirtualRoom({pageManager}, virtualRoomTitle);
    await pageManager.sideSecondaryChatsMenu.OpenTab.VirtualRooms();
    await expect(pageManager.sideSecondaryChatsMenu.Elements.ConversationsItem.locator(`"${virtualRoomTitle}"`)).toBeVisible();
  });

  test('TC420. Copy Virtual room link. Virtual room link should be in clipboard.', async ({page, pageManager, apiManager, browserName}) => {
    test.skip(browserName === 'webkit' || browserName === 'firefox', 'A bug related to permissions.');
    await CreateVirtualRoomAndOpenDetails({apiManager, pageManager});
    await pageManager.virtualRoomField.Buttons.VirtualRoomLink.click();
    const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());
    const [meetingPage] = await Promise.all([
      page.context().waitForEvent('page'),
      pageManager.virtualRoomField.Buttons.JoinVirtualRoom.click(),
    ]);
    expect(clipboardContent).toBe(meetingPage.url());
  });

  test('TC427. Delete Virtual room. Virtual room should not be visible in Virtual Rooms Tab.', async ({pageManager, apiManager}) => {
    await CreateVirtualRoomAndOpenDetails({apiManager, pageManager});
    await pageManager.virtualRoomField.Buttons.DeleteVirtualRoom.click();
    await pageManager.chatsActionsModal.Buttons.Delete.click();
    await expect(pageManager.sideSecondaryChatsMenu.Elements.VirtualRoomItem.locator(`"${virtualRoomTitle}"`)).not.toBeVisible();
  });
});
