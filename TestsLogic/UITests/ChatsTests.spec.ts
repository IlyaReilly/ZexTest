import {expect} from '@playwright/test';
import {test, BaseTest} from './BaseTest';

test.describe('Chats tests', async () => {
  let dateTimePrefix;
  let spaceTitle;
  let spaceTopic;

  test.beforeEach(async ({}, workerInfo) => {
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    spaceTitle = dateTimePrefix + ' Autotest Space Title';
    spaceTopic = dateTimePrefix + ' Autotest Space Topic';
  });

  test.afterAll(async ({apiManager}) => {
    const conversations = await apiManager.chatsAPI.GetConversations();
    await Promise.all(conversations.map(async (conversation) => {
      return apiManager.chatsAPI.DeleteConversation(conversation.id);
    }));
  });

  test('Create space. Space should appear in spaces list.', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Chats);
    await pageManager.headerMenu.OpenNewItemMenuSection(pageManager.headerMenu.NewItemMenu.CreateSpace);
    await pageManager.newChatsItem.CreateSpace(spaceTitle, spaceTopic, BaseTest.secondUser.login);
    await pageManager.sideSecondaryChatsMenu.OpenTab.Spaces();
    await expect(pageManager.sideSecondaryChatsMenu.Elements.ConversationsListItem.locator(`"${spaceTitle}"`)).toBeVisible();
  });

  test('Delete space. Space should be deleted.', async ({pageManager, apiManager}, workerInfo) => {
    const userId = await apiManager.usersAPI.GetUserId(BaseTest.secondUser.login);
    await apiManager.chatsAPI.CreateConversations(spaceTitle, spaceTopic, userId);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Chats);
    await pageManager.sideSecondaryChatsMenu.OpenTab.Spaces();
    await pageManager.sideSecondaryChatsMenu.SelectConversationFromList(spaceTitle);
    await pageManager.chatsInfo.Buttons.DeleteSpace.click();
    await pageManager.chats.DeleteSpacePopup.DeleteButton.click();
    await expect(pageManager.sideSecondaryChatsMenu.Elements.ConversationsListItem.locator(`"${spaceTitle}"`)).toHaveCount(0);
  });
});
