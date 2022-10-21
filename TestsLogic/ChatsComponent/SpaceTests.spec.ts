import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';

test.describe('Space tests', async () => {
  let dateTimePrefix;
  let spaceTitle;
  let spaceTopic;
  const newSpaceName = 'Zextras Company 321';
  const newSpaceTopic = 'Work with playwright';
  const message = 'Hello! We are great team!';
  const participant = 'test19@demo.zextras.io';
  const titleName = 'Zextras Channel';
  const topicName = 'QA Team';

  test.beforeEach(async ({pageManager, apiManager}) => {
    await CleanConversationsPanel({apiManager});
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    spaceTitle = dateTimePrefix + ' Autotest Space Title';
    spaceTopic = dateTimePrefix + ' Autotest Space Topic';
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
    await pageManager.sideSecondaryChatsMenu.Elements.ConversationsItem.waitFor();
    await pageManager.sideSecondaryChatsMenu.Elements.ConversationsItem.first().click();
  };

  test('Create space. Space should appear in spaces list.', async ({pageManager, browserName}) => {
    test.slow(browserName === 'webkit', 'This feature is slow on Mac');
    await OpenChatsTabAndCreateConversation({pageManager}, pageManager.headerMenu.NewItemMenu.CreateSpace);
    await pageManager.newSpaceModal.CreateSpace(spaceTitle, spaceTopic, BaseTest.secondUser.login);
    await pageManager.sideSecondaryChatsMenu.OpenTab.Spaces(newSpaceName);
    await expect(pageManager.sideSecondaryChatsMenu.Elements.ConversationsItem.first()).toBeVisible();
  });

  test('Delete space. Space should be deleted.', async ({pageManager, apiManager}) => {
    test.slow();
    await CreateSpaceAndOpenSpaceDetails({pageManager, apiManager});
    await pageManager.sideSecondaryChatsMenu.SelectConversationFromList(spaceTitle);
    await pageManager.chatsInfo.Buttons.DeleteSpace.click();
    await pageManager.chats.DeleteSpacePopup.DeleteButton.click();
    await expect(pageManager.sideSecondaryChatsMenu.Elements.ConversationsItem).not.toBeVisible();
  });

  test('Rename space. Space should be renamed in spaces list.', async ({pageManager, apiManager}) => {
    test.slow();
    await CreateSpaceAndOpenSpaceDetails({pageManager, apiManager});
    await pageManager.spaceInfo.RenameSpace(newSpaceName);
    await expect(pageManager.sideSecondaryChatsMenu.ConversationItemDetails.Name).toHaveText(newSpaceName);
  });

  test('Mute notifications in space. The space must to have a mute icon', async ({pageManager, apiManager}) => {
    await CreateSpaceAndOpenSpaceDetails({pageManager, apiManager}); ;
    await pageManager.spaceInfo.Buttons.MuteNotifications.click();
    await expect(pageManager.sideSecondaryChatsMenu.ConversationItemDetails.BellOffIcon).toBeVisible();
  });

  test('Activate notifications in space. The space must not have a mute icon ', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await CreateSpaceAndOpenSpaceDetails({pageManager, apiManager});
    await pageManager.spaceInfo.Buttons.MuteNotifications.click();
    await pageManager.sideSecondaryChatsMenu.ConversationItemDetails.BellOffIcon.waitFor();
    await pageManager.spaceInfo.Buttons.ActivateNotifications.click();
    await expect(pageManager.sideSecondaryChatsMenu.ConversationItemDetails.BellOffIcon).not.toBeVisible();
  });

  test('Clear history for current user in space. Chat field must be empty', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await CreateSpaceAndOpenSpaceDetails({pageManager, apiManager});
    await pageManager.chatField.SendCurrentMessage(message);
    await expect(pageManager.chatField.TextBoxes.ChatsRaw).toContainText(message);
    await pageManager.spaceInfo.Buttons.ClearHistory.click();
    await pageManager.chats.DeleteSpacePopup.ClearHistoryButton.click();
    await pageManager.page.waitForLoadState();
    await expect(pageManager.chatField.TextBoxes.ChatsRaw).not.toBeVisible();
  });

  test('Add new member in space. New member must be visible in space info.', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await CreateSpaceAndOpenSpaceDetails({pageManager, apiManager});
    await pageManager.spaceInfo.Buttons.AddNewMembers.click();
    await pageManager.addNewMembersModal.AddNewMember(participant);
    await expect(pageManager.spaceInfo.Items.Member.locator(`"${participant}"`)).toHaveCount(1);
  });

  test('Rename topic in space.Topic in space should be renamed in spaces list.', async ({pageManager, apiManager}) => {
    await CreateSpaceAndOpenSpaceDetails({pageManager, apiManager});
    await pageManager.spaceInfo.RenameTopicSpace(newSpaceTopic);
    await expect(pageManager.spaceInfo.Items.TopicName.locator(`"${newSpaceTopic}"`).first()).toBeVisible();
  });

  test('Add channel in space.Channel should be visible in spaces list in space.', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await CreateSpaceAndOpenSpaceDetails({pageManager, apiManager});
    await pageManager.spaceInfo.Buttons.AddChannel.click();
    await pageManager.newChannelModal.CreateNewChannel(titleName, topicName);
    await pageManager.sideSecondaryChatsMenu.Buttons.OpenDropdown.click();
    await expect(pageManager.sideSecondaryChatsMenu.Elements.ConversationsListItem.locator(`"#${titleName}"`)).toBeVisible();
  });
});
