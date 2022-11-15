import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';

test.describe('Space tests', async () => {
  let dateTimePrefix;
  let spaceTitle;
  let spaceTopic;
  let channelTitle;
  let channelTopic;
  const newSpaceName = 'Zextras Company 321';
  const newSpaceTopic = 'Work with playwright';
  const message = 'Hello! We are great team!';
  const participant = 'test19@demo.zextras.io';
  const titleName = 'Zextras Channel';
  const topicName = 'QA Team';
  const newChannelName = 'New Zextras Channel';
  const newChannelTopic = "About Zextras Automation";

  test.beforeEach(async ({pageManager, apiManager}) => {
    await CleanConversationsPanel({apiManager});
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    spaceTitle = dateTimePrefix + ' Autotest Space Title';
    spaceTopic = dateTimePrefix + ' Autotest Space Topic';
    channelTitle = dateTimePrefix + ' Autotest Channel Title';
    channelTopic = dateTimePrefix + ' Autotest Channel Topic';
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Chats);
  });

  test.afterAll(async ({apiManager}) => {
    await CleanConversationsPanel({apiManager});
  });

  async function CleanConversationsPanel({apiManager}) {
    const conversations = await apiManager.chatsAPI.GetConversations();
    await Promise.all(conversations.map(async (conversation) => {
      return apiManager.deleteChatsAPI.DeleteConversation(conversation.id);
    }));
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

  async function CreateSpaceAndOpenSpaceDetails({pageManager, apiManager}) {
    const userId = await apiManager.usersAPI.GetUserId(BaseTest.secondUser.login);
    await apiManager.createChatsAPI.CreateConversations(spaceTitle, spaceTopic, userId);
    await pageManager.sideSecondaryChatsMenu.OpenTab.Spaces();
    await pageManager.sideSecondaryChatsMenu.Elements.ConversationItem.waitFor();
    await pageManager.sideSecondaryChatsMenu.Elements.ConversationItem.first().click();
  };

  async function CreateChannelAndOpenChannelDetails({pageManager, apiManager}) {
    const userId = await apiManager.usersAPI.GetUserId(BaseTest.secondUser.login);
    const spaceId = await apiManager.createChatsAPI.CreateConversations(spaceTitle, spaceTopic, userId);
    await apiManager.createChatsAPI.CreateChannel(spaceId, channelTitle, channelTopic);
    await pageManager.sideSecondaryChatsMenu.OpenTab.Spaces();
    await pageManager.sideSecondaryChatsMenu.Buttons.OpenDropdown.click();
    await pageManager.sideSecondaryChatsMenu.Elements.ConversationItem.locator(`"#${channelTitle}"`).click();
  };

  test('TC401. Create space. Space should appear in spaces list.', async ({pageManager, browserName}) => {
    test.slow(browserName === 'webkit', 'This feature is slow on Mac');
    await OpenChatsTabAndCreateConversation({pageManager}, pageManager.headerMenu.NewItemMenu.CreateSpace);
    await pageManager.newChatsModal.CreatedConversations.CreateSpace(BaseTest.secondUser.login, spaceTitle, spaceTopic);
    await pageManager.sideSecondaryChatsMenu.OpenTab.Spaces(newSpaceName);
    await expect(pageManager.sideSecondaryChatsMenu.Elements.ConversationItem.first()).toBeVisible();
  });

  test('TC402. Delete space. Space should be deleted.', async ({pageManager, apiManager}) => {
    test.slow();
    await CreateSpaceAndOpenSpaceDetails({pageManager, apiManager});
    await pageManager.sideSecondaryChatsMenu.SelectConversationFromList(spaceTitle);
    await pageManager.chatsInfo.Buttons.DeleteSpace.click();
    await pageManager.chatsActionsModal.Buttons.Delete.click();
    await expect(pageManager.sideSecondaryChatsMenu.Elements.ConversationItem).not.toBeVisible();
  });

  test('TC412. Rename space. Space should be renamed in spaces list.', async ({pageManager, apiManager}) => {
    test.slow();
    await CreateSpaceAndOpenSpaceDetails({pageManager, apiManager});
    await pageManager.chatsInfo.Rename(newSpaceName);
    await expect(pageManager.sideSecondaryChatsMenu.ConversationItemDetails.Name).toHaveText(newSpaceName);
  });

  test('TC413. Mute notifications in space. The space must to have a mute icon', async ({pageManager, apiManager}) => {
    await CreateSpaceAndOpenSpaceDetails({pageManager, apiManager}); ;
    await pageManager.chatsInfo.Buttons.MuteNotifications.click();
    await expect(pageManager.sideSecondaryChatsMenu.ConversationItemDetails.BellOffIcon).toBeVisible();
  });

  test('TC414. Activate notifications in space. The space must not have a mute icon ', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await CreateSpaceAndOpenSpaceDetails({pageManager, apiManager});
    await pageManager.chatsInfo.Buttons.MuteNotifications.click();
    await pageManager.sideSecondaryChatsMenu.ConversationItemDetails.BellOffIcon.waitFor();
    await pageManager.chatsInfo.Buttons.ActivateNotifications.click();
    await expect(pageManager.sideSecondaryChatsMenu.ConversationItemDetails.BellOffIcon).not.toBeVisible();
  });

  test('TC415. Clear history for current user in space. Chat field must be empty', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await CreateSpaceAndOpenSpaceDetails({pageManager, apiManager});
    await pageManager.chatField.SendCurrentMessage(message);
    await expect(pageManager.chatField.Elements.MessageBubble).toContainText(message);
    await pageManager.chatsInfo.Buttons.ClearHistory.click();
    await pageManager.chatsActionsModal.Buttons.ClearHistory.click();
    await pageManager.page.waitForLoadState();
    await expect(pageManager.chatField.Elements.MessageBubble).not.toBeVisible();
  });

  test('TC416. Add new member in space. New member must be visible in space info.', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await CreateSpaceAndOpenSpaceDetails({pageManager, apiManager});
    await pageManager.chatsInfo.Buttons.AddNewMembers.click();
    await pageManager.addNewMembersModal.AddNewMember(participant);
    await expect(pageManager.chatsInfo.Items.Member.locator(`"${participant}"`)).toHaveCount(1);
  });

  test('TC417. Change topic in space. Topic in space should be changed in spaces list.', async ({pageManager, apiManager}) => {
    await CreateSpaceAndOpenSpaceDetails({pageManager, apiManager});
    await pageManager.chatsInfo.ChangeTopic(newSpaceTopic);
    await expect(pageManager.chatsInfo.Items.TopicName.locator(`"${newSpaceTopic}"`).first()).toBeVisible();
  });

  test('TC418. Add channel in space.Channel should be visible in spaces list in space.', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await CreateSpaceAndOpenSpaceDetails({pageManager, apiManager});
    await pageManager.chatsInfo.Buttons.AddChannel.click();
    await pageManager.newChannelModal.CreateNewChannel(titleName, topicName);
    await pageManager.sideSecondaryChatsMenu.Buttons.OpenDropdown.click();
    await expect(pageManager.sideSecondaryChatsMenu.Elements.ConversationItem.locator(`"#${titleName}"`)).toBeVisible();
  });

  test('TC421. Mute notifications in channel. The channel must to have a mute icon', async ({pageManager, apiManager}) => {
    await CreateChannelAndOpenChannelDetails({pageManager, apiManager});
    await pageManager.chatsInfo.Buttons.MuteNotifications.click();
    await expect(pageManager.sideSecondaryChatsMenu.ConversationItemDetails.BellOffIcon).toBeVisible();
  });

  test('TC422. Activate notifications in channel. The channel must not have a mute icon', async ({pageManager, apiManager}) => {
    await CreateChannelAndOpenChannelDetails({pageManager, apiManager});
    await pageManager.chatsInfo.Buttons.MuteNotifications.click();
    await pageManager.sideSecondaryChatsMenu.ConversationItemDetails.BellOffIcon.waitFor();
    await pageManager.chatsInfo.Buttons.ActivateNotifications.click();
    await expect(pageManager.sideSecondaryChatsMenu.ConversationItemDetails.BellOffIcon).not.toBeVisible();
  });

  test('TC423. Change topic in channel.Topic in channel should be changed in spaces list.', async ({pageManager, apiManager}) => {
    await CreateChannelAndOpenChannelDetails({pageManager, apiManager});
    await pageManager.chatsInfo.ChangeTopic(newChannelTopic);
    await expect(pageManager.chatsInfo.Items.TopicName.locator(`"${newChannelTopic}"`).first()).toBeVisible();
  });

  test('TC424. Rename channel. Channel should be renamed in spaces list.', async ({pageManager, apiManager}) => {
    await CreateChannelAndOpenChannelDetails({pageManager, apiManager});
    await pageManager.chatsInfo.Rename(newChannelName);
    await expect(pageManager.sideSecondaryChatsMenu.Elements.ConversationItem.locator(`"#${newChannelName}"`)).toBeVisible();
  });

  test('TC425. Clear history for current user in channel. Chat field must be empty', async ({pageManager, apiManager}) => {
    await CreateChannelAndOpenChannelDetails({pageManager, apiManager});
    await pageManager.chatField.SendCurrentMessage(message);
    await expect(pageManager.chatField.Elements.MessageBubble).toContainText(message);
    await pageManager.chatsInfo.Buttons.ClearHistory.click();
    await pageManager.chatsActionsModal.Buttons.ClearHistory.click();
    await pageManager.page.waitForLoadState();
    await expect(pageManager.chatField.Elements.MessageBubble).not.toBeVisible();
  });

  test('TC426. Delete channel. Channel should be deleted from space tab.', async ({pageManager, apiManager}) => {
    await CreateChannelAndOpenChannelDetails({pageManager, apiManager});
    await pageManager.chatsInfo.Buttons.DeleteChannel.click();
    await pageManager.chatsActionsModal.Buttons.Delete.click();
    await expect(pageManager.sideSecondaryChatsMenu.Elements.ConversationItem.locator(`"#${newChannelName}"`)).not.toBeVisible();
  });
});
