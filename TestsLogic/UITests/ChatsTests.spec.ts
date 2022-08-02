import { expect, Page } from '@playwright/test';
import { test, pageManager, playwrightProjectsData, apiManager } from './BaseTest';

test.describe('Chats tests', async () => {

  let page: Page;
  let dateTimePrefix;
  let spaceTitle;
  let spaceTopic;
  let user1
  let runtimeAppoinmentId = '';

  // Components
  let headerMenu;
  let sideMenu;
  let sideSecondaryChatsMenu;
  let newChatsItem;
  let calendar;
  let chatsAPI;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/');
    user1 = playwrightProjectsData.users.test1.login;
    chatsAPI = await apiManager.getChatsAPI(page);
    headerMenu = await pageManager.getHeaderMenuComponent(page);
    sideMenu = await pageManager.getSideMenuComponent(page);
    newChatsItem = await pageManager.getNewChatsItemComponent(page);
    calendar = await pageManager.getCalendarComponent(page);
    sideSecondaryChatsMenu = await pageManager.getSideSecondaryChatsMenuComponent(page);
  });

  test.beforeEach(async () => {
    await page.reload();
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    spaceTitle = dateTimePrefix + ' Autotest Space Title';
    spaceTopic = dateTimePrefix + ' Autotest Space Topic';
  });

  test.afterEach(async() => {
     var conversations = await chatsAPI.GetConversations();
     await conversations.forEach(async conversation => {
      await chatsAPI.DeleteConversation(conversation.id)
     }); 
  });
  
  test.afterAll(async () => {
    await page.close();
  });

  test('Create space. Space should appear in spaces list.', async ({}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Chats);
    await headerMenu.OpenNewItemMenuSection(headerMenu.NewItemMenu.CreateSpace);
    await newChatsItem.CreateSpace(spaceTitle, spaceTopic, user1);
    await sideSecondaryChatsMenu.OpenTab.Spaces();
    await expect(sideSecondaryChatsMenu.Elements.ConversationsListItem.locator(`"${spaceTitle}"`)).toBeVisible();
  });
});