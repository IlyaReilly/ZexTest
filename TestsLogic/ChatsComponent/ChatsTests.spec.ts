import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';

test.describe('Chats tests', async () => {
  let dateTimePrefix;
  let groupTitle;
  const firstParticipant = 'test10';
  const secondParticipant = 'test20';
  const thirdParticipant = 'test19@demo.zextras.io';
  const newGroupName = 'Zextras Company 321';
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
      return apiManager.chatsAPI.DeleteConversation(conversation.id);
    }));
    await Promise.all(conversations.map(async (conversation) => {
      const users = await apiManager.chatsAPI.GetUsers();
      return apiManager.chatsAPI.KickOffUser(conversation.id, users);
    }));
    await Promise.all(conversations.map(async (conversation) => {
      return apiManager.chatsAPI.DeleteGroup(conversation.id);
    }));
  };

  async function DeleteAllMembers({pageManager}) {
    const neededRemoveMember = pageManager.chatsInfo.Buttons.RemoveMember.locator('nth=0');
    await neededRemoveMember.click();
    await pageManager.chats.DeleteSpacePopup.RemoveButton.click();
    await pageManager.page.waitForLoadState();
    await expect(pageManager.chatsInfo.Items.Member).toHaveCount(2);
    await neededRemoveMember.click();
    await pageManager.chats.DeleteSpacePopup.RemoveButton.click();
    await pageManager.chatsInfo.Buttons.DeleteGroup.click();
    await pageManager.chats.DeleteSpacePopup.LeaveButton.click();
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
    await apiManager.chatsAPI.CreateGroup(groupTitle, [firstUserId, seconduserId]);
    await pageManager.page.waitForLoadState();
    await pageManager.sideSecondaryChatsMenu.Elements.ConversationsItem.locator('nth=0').click();
  };

  test('Create chat. Conversation should be in Chats Tab.', async ({pageManager}) => {
    await OpenChatsTabAndCreateConversation({pageManager}, pageManager.headerMenu.NewItemMenu.CreateChat);
    await pageManager.newChatsItemModal.CreatedConversations.CreateChat(firstParticipant);
    await expect(pageManager.sideSecondaryChatsMenu.Elements.ConversationsItem).toBeVisible();
  });

  test('Create group. Group should be in Chats Tab.', async ({pageManager, apiManager}) => {
    await CreateGroupAndOpenDetails({pageManager, apiManager});
    await expect(pageManager.sideSecondaryChatsMenu.Elements.ConversationsItem).toBeVisible();
  });

  test('Delete group. Group should be removed from Chats Tab.', async ({pageManager}) => {
    await OpenChatsTabAndCreateConversation({pageManager}, pageManager.headerMenu.NewItemMenu.CreateGroup);
    await pageManager.newChatsItemModal.CreatedConversations.CreateGroup(firstParticipant, secondParticipant, groupTitle);
    await DeleteAllMembers({pageManager});
    await expect(pageManager.sideSecondaryChatsMenu.Elements.ConversationsItem).not.toBeVisible();
  });

  test('Rename group. Group name should be changed in Chats Tab.', async ({pageManager, apiManager}) => {
    await CreateGroupAndOpenDetails({pageManager, apiManager});
    await pageManager.chatsInfo.RenameGroup(newGroupName);
    await expect(pageManager.sideSecondaryChatsMenu.ConversationItemDetails.Name).toHaveText(newGroupName);
  });

  test('Mute notifications in group. The group must to have a mute icon', async ({pageManager, apiManager}) => {
    await CreateGroupAndOpenDetails({pageManager, apiManager});
    await pageManager.chatsInfo.Buttons.MuteNotifications.click();
    await expect(pageManager.sideSecondaryChatsMenu.ConversationItemDetails.BellOffIcon).toBeVisible();
  });

  test('Activate notifications in group. The group must not have a mute icon ', async ({pageManager, apiManager}) => {
    await CreateGroupAndOpenDetails({pageManager, apiManager});
    await pageManager.chatsInfo.Buttons.MuteNotifications.click();
    await pageManager.chatsInfo.Buttons.ActivateNotifications.click();
    await expect(pageManager.sideSecondaryChatsMenu.ConversationItemDetails.BellOffIcon).not.toBeVisible();
  });

  test('Clear history for current user in group. Chat field must be empty', async ({pageManager, apiManager}) => {
    await CreateGroupAndOpenDetails({pageManager, apiManager});
    await pageManager.chatField.SendCurrentMessage(message);
    await expect(pageManager.chatField.TextBoxes.ChatsRaw).toContainText(message);
    await pageManager.chatsInfo.Buttons.ClearHistory.click();
    await pageManager.chats.DeleteSpacePopup.ClearHistoryButton.click();
    await pageManager.page.waitForLoadState();
    await expect(pageManager.chatField.TextBoxes.ChatsRaw).not.toBeVisible();
  });

  test('Add new member in group. New member must be visible in group info.', async ({pageManager, apiManager}) => {
    await CreateGroupAndOpenDetails({pageManager, apiManager});
    await pageManager.chatsInfo.Buttons.AddNewMembers.click();
    await pageManager.addNewMembersModal.AddNewMember(thirdParticipant);
    await expect(pageManager.chatsInfo.Items.Member).toHaveCount(4);
  });
});
