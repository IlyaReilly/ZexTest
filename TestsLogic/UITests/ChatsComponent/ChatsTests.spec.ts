import {expect} from '@playwright/test';
import {test, BaseTest} from '../../UITests/BaseTest';

test.describe('Chats tests', async () => {
  let dateTimePrefix;
  let groupTitle;
  const firstParticipant = 'test10@demo.zextras.io';
  const secondParticipant = 'test20@demo.zextras.io';
  const thirdParticipant = 'test19@demo.zextras.io';
  const newGroupTitle = 'Zextras Company 321';
  const message = 'Hello! We are great team!';

  test.beforeEach(async ({pageManager, apiManager}) => {
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    groupTitle = dateTimePrefix + ' Autotest Group Topic';
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Chats);
    await CleanConversationsPanel({apiManager});
  });

  test.afterAll(async ({apiManager}) => {
    await CleanConversationsPanel({apiManager});
  });

  async function CleanConversationsPanel({apiManager}) {
    const conversations = await apiManager.chatsAPI.GetConversations();
    await Promise.all(conversations.map(async (conversation) => {
      return apiManager.deleteChatsAPI.DeleteConversation(conversation.id);
    }));
    await Promise.all(conversations.map(async (conversation) => {
      const users = await apiManager.chatsAPI.GetUsers();
      return apiManager.deleteChatsAPI.KickOffUser(conversation.id, users);
    }));
    await Promise.all(conversations.map(async (conversation) => {
      return apiManager.deleteChatsAPI.DeleteGroup(conversation.id);
    }));
  };

  async function DeleteAllMembers({pageManager}) {
    const neededRemoveMember = pageManager.chatsInfo.Buttons.RemoveMember.locator('nth=0');
    await neededRemoveMember.click();
    await pageManager.chatsActionsModal.Buttons.Remove.click();
    await pageManager.page.waitForLoadState();
    await expect(pageManager.chatsInfo.Items.Member).toHaveCount(2);
    await neededRemoveMember.click();
    await pageManager.chatsActionsModal.Buttons.Remove.click();
    await pageManager.chatsInfo.Buttons.DeleteGroup.click();
    await pageManager.chatsActionsModal.Buttons.Leave.click();
  };

  async function OpenChatsTabAndCreateConversation({pageManager}, option) {
    if (option === pageManager.headerMenu.NewItemMenu.CreateChat) {
      await pageManager.headerMenu.SelectOptionInNewItemMenu.CreateNewChat();
    } else if (option === pageManager.headerMenu.NewItemMenu.CreateGroup) {
      await pageManager.headerMenu.SelectOptionInNewItemMenu.CreateNewGroup();
    } else if (option === pageManager.headerMenu.NewItemMenu.CreateSpace) {
      await pageManager.headerMenu.SelectOptionInNewItemMenu.CreateNewSpace();
    };
  };

  async function CreateGroupAndOpenDetails({pageManager, apiManager}) {
    const firstUserId = await apiManager.usersAPI.GetUserId(BaseTest.secondUser.login);
    const seconduserId = await apiManager.usersAPI.GetUserId(BaseTest.thirdUser.login);
    await apiManager.createChatsAPI.CreateGroup(groupTitle, [firstUserId, seconduserId]);
    await pageManager.page.waitForLoadState();
    await pageManager.sideSecondaryChatsMenu.Elements.ConversationItem.locator('nth=0').click();
  };

  async function CreateChats({pageManager}, participants) {
    for (const participant of participants) {
      await pageManager.headerMenu.SelectOptionInNewItemMenu.CreateNewChat();
      await pageManager.newChatsModal.CreatedConversations.CreateChat(participant);
      await pageManager.sideSecondaryChatsMenu.Elements.ConversationItem.locator(`"${participant}"`).waitFor();
    }
  };

  test('TC403. Create chat. Conversation should be in Chats Tab.', async ({pageManager}) => {
    BaseTest.doubleTimeout();
    await OpenChatsTabAndCreateConversation({pageManager}, pageManager.headerMenu.NewItemMenu.CreateChat);
    await pageManager.newChatsModal.CreatedConversations.CreateChat(firstParticipant);
    await expect(pageManager.sideSecondaryChatsMenu.ConversationItemDetails.Name.locator(`"${firstParticipant}"`)).toBeVisible();
  });

  test('TC404. Create group. Group should be in Chats Tab.', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await CreateGroupAndOpenDetails({pageManager, apiManager});
    await expect(pageManager.sideSecondaryChatsMenu.ConversationItemDetails.Name.locator(`"${groupTitle}"`)).toBeVisible();
  });

  test('TC405. Delete group. Group should be removed from Chats Tab.', async ({pageManager}) => {
    test.slow();
    await OpenChatsTabAndCreateConversation({pageManager}, pageManager.headerMenu.NewItemMenu.CreateGroup);
    await pageManager.newChatsModal.CreatedConversations.CreateGroup(firstParticipant, secondParticipant, groupTitle);
    await DeleteAllMembers({pageManager});
    await expect(pageManager.sideSecondaryChatsMenu.ConversationItemDetails.Name.locator(`"${groupTitle}"`)).not.toBeVisible();
  });

  test('TC406. Change group topic. Group topic should be changed in Chats Tab.', async ({pageManager, apiManager}) => {
    await CreateGroupAndOpenDetails({pageManager, apiManager});
    await pageManager.chatsInfo.ChangeTopic(newGroupTitle);
    await expect(pageManager.sideSecondaryChatsMenu.ConversationItemDetails.Name.locator(`"${newGroupTitle}"`)).toBeVisible;
  });

  test('TC407. Mute notifications in group. The group must to have a mute icon', async ({pageManager, apiManager}) => {
    await CreateGroupAndOpenDetails({pageManager, apiManager});
    await pageManager.chatsInfo.Buttons.MuteNotifications.click();
    await expect(pageManager.sideSecondaryChatsMenu.ConversationItemDetails.BellOffIcon).toBeVisible();
  });

  test('TC408. Activate notifications in group. The group must not have a mute icon ', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await CreateGroupAndOpenDetails({pageManager, apiManager});
    await pageManager.chatsInfo.Buttons.MuteNotifications.click();
    await pageManager.chatsInfo.Buttons.ActivateNotifications.click();
    await expect(pageManager.sideSecondaryChatsMenu.ConversationItemDetails.BellOffIcon).not.toBeVisible();
  });

  test('TC409. Clear history for current user in group. Chat field must be empty', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await CreateGroupAndOpenDetails({pageManager, apiManager});
    await pageManager.chatField.SendCurrentMessage(message);
    await expect(pageManager.chatField.Elements.MessageBubble).toContainText(message);
    await pageManager.chatsInfo.Buttons.ClearHistory.click();
    await pageManager.chatsActionsModal.Buttons.ClearHistory.click();
    await pageManager.page.waitForLoadState();
    await expect(pageManager.chatField.Elements.MessageBubble).not.toBeVisible();
  });

  test('TC410. Add new member in group. New member must be visible in group info.', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await CreateGroupAndOpenDetails({pageManager, apiManager});
    await pageManager.chatsInfo.Buttons.AddNewMembers.click();
    await pageManager.addNewMembersModal.AddNewMember(thirdParticipant);
    await expect(pageManager.chatsInfo.Items.Member.locator(`"${thirdParticipant}"`)).toHaveCount(1);
  });

  test('TC411. Filter chats list. Only needed chat should be visible in Chats Tab.', async ({pageManager}) => {
    await CreateChats({pageManager}, [secondParticipant, thirdParticipant]);
    await pageManager.sideSecondaryChatsMenu.Textboxes.FilterChatsList.fill(thirdParticipant);
    await expect(pageManager.sideSecondaryChatsMenu.ConversationItemDetails.Name).toHaveText(thirdParticipant);
    await expect(pageManager.sideSecondaryChatsMenu.Elements.ConversationItem.locator(`"${secondParticipant}"`)).toHaveCount(0);
  });
});