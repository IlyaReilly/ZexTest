import {expect, Page} from '@playwright/test';
import {test, BaseTest} from './BaseTest';

test.describe('Chats tests', async () => {
  let page: Page;
  let loginPage;
  let dateTimePrefix;
  let spaceTitle;
  let spaceTopic;
  let user1;
  let userForLogin;

  // Components
  let headerMenu;
  let sideMenu;
  let sideSecondaryChatsMenu;
  let newChatsItem;
  let chatsAPI;

  test.beforeAll(async ({browser}, workerInfo) => {
    page = await browser.newPage();
    await page.goto('/');
    user1 = BaseTest.GetUserFromPool(workerInfo.workerIndex + 1);
    chatsAPI = await BaseTest.apiManager.getChatsAPI(page);
    headerMenu = await BaseTest.pageManager.getHeaderMenuComponent(page);
    sideMenu = await BaseTest.pageManager.getSideMenuComponent(page);
    newChatsItem = await BaseTest.pageManager.getNewChatsItemComponent(page);
    sideSecondaryChatsMenu = await BaseTest.pageManager.getSideSecondaryChatsMenuComponent(page);
    userForLogin = BaseTest.GetUserFromPool(workerInfo.workerIndex);
    // Login
    loginPage = await BaseTest.pageManager.getLoginPage(page);
    await loginPage.Login(userForLogin.login, userForLogin.password);
    await page.waitForLoadState('networkidle');
  });

  test.beforeEach(async () => {
    await page.reload();
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    spaceTitle = dateTimePrefix + ' Autotest Space Title';
    spaceTopic = dateTimePrefix + ' Autotest Space Topic';
  });

  test.afterEach(async () => {
    const conversations = await chatsAPI.GetConversations();
    await conversations.forEach(async (conversation) => {
      await chatsAPI.DeleteConversation(conversation.id);
    });
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Create space. Space should appear in spaces list.', async ({}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Chats);
    await headerMenu.OpenNewItemMenuSection(headerMenu.NewItemMenu.CreateSpace);
    await newChatsItem.CreateSpace(spaceTitle, spaceTopic, user1.login);
    await sideSecondaryChatsMenu.OpenTab.Spaces();
    await expect(sideSecondaryChatsMenu.Elements.ConversationsListItem.locator(`"${spaceTitle}"`)).toBeVisible();
  });
});
