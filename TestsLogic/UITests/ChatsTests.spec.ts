import {expect} from '@playwright/test';
import {test, BaseTest} from './BaseTest';

test.describe('Chats tests', async () => {
  let dateTimePrefix;
  let spaceTitle;
  let spaceTopic;
  let user1;

  test.beforeEach(async ({}, workerInfo) => {
    user1 = BaseTest.GetUserFromPool(workerInfo.workerIndex + 1);
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    spaceTitle = dateTimePrefix + ' Autotest Space Title';
    spaceTopic = dateTimePrefix + ' Autotest Space Topic';
  });

  test.afterEach(async ({apiManager}) => {
    const conversations = await apiManager.chatsAPI.GetConversations();
    await Promise.all(conversations.map(async (conversation) => {
      return apiManager.chatsAPI.DeleteConversation(conversation.id);
    }));
  });

  test.afterEach(async ({page}) => {
    await page.close();
  });

  test('Create space. Space should appear in spaces list.', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Chats);
    await pageManager.headerMenu.OpenNewItemMenuSection(pageManager.headerMenu.NewItemMenu.CreateSpace);
    await pageManager.newChatsItem.CreateSpace(spaceTitle, spaceTopic, user1.login);
    await pageManager.sideSecondaryChatsMenu.OpenTab.Spaces();
    await expect(pageManager.sideSecondaryChatsMenu.Elements.ConversationsListItem.locator(`"${spaceTitle}"`)).toBeVisible();
  });
});
