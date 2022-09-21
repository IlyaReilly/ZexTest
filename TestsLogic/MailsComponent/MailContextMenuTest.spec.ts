import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';

test.describe('Mails tests', async () => {
  let mailSubject;
  let mailBody;

  test.beforeEach(async () => {
    mailSubject = BaseTest.dateTimePrefix() + ' Autotest Mail Subject';
    mailBody = BaseTest.dateTimePrefix() + ' Autotest Mail Body';
  });

  test.afterEach(async ({page, apiManager}) => {
    const id = await apiManager.mailsAPI.MailSearchQuery(mailSubject, BaseTest.userForLogin.login);
    await apiManager.mailsAPI.ItemActionRequest(apiManager.mailsAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    await page.close();
  });

  test('Mark mail as unread', async ({pageManager, apiManager}) => {
    await OpenInboxMailInAnotherUser({pageManager, apiManager});
    await pageManager.mailsList.OpenMail(mailSubject);
    await pageManager.mailsList.OpenMailContextMenu(mailSubject);
    await pageManager.mailsList.SelectMailContextMenuOption.MarkAsUnread();
    await expect(pageManager.mailsList.Elements.UnreadMessageIcon.first(), 'Unread message icon should be visible').toBeVisible();
  });

  test('Mark mails as read', async ({pageManager, apiManager}) => {
    await OpenInboxMailInAnotherUser({pageManager, apiManager});
    await pageManager.mailsList.OpenMailContextMenu(mailSubject);
    await pageManager.mailsList.SelectMailContextMenuOption.MarkAsRead();
    const unreadIcon = pageManager.mailsList.Elements.UnreadMessageIcon._selector;
    await expect(pageManager.mailsList.Elements.Letter.first(), 'Unread message icon should not be visible').not.toHaveClass(unreadIcon);
  });

  test('Flag and unflag mail', async ({pageManager, apiManager}) => {
    await OpenMailContextMenuOptions({pageManager, apiManager});
    await pageManager.mailsList.SelectMailContextMenuOption.AddFlag();
    await expect(pageManager.mailsList.Elements.FlagIcon, 'Added flag should be visible').toBeVisible();
    await pageManager.mailsList.OpenMailContextMenu(mailSubject);
    await pageManager.mailsList.SelectMailContextMenuOption.RemoveFlag();
    await expect(pageManager.mailsList.Elements.FlagIcon, 'Added flag should not be visible').not.toBeVisible();
  });

  test('Mark mail as spam', async ({pageManager, apiManager}) => {
    await OpenMailContextMenuOptions({pageManager, apiManager});
    await pageManager.mailsList.SelectMailContextMenuOption.MarkAsSpam();
    await expect(pageManager.mailDetails.Elements.ActionWithMailNotification, 'Mark as spam notification should be visible').toContainText('Spam');
  });

  async function OpenInboxMailInAnotherUser({pageManager, apiManager}) {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await apiManager.mailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await pageManager.loginPage.Relogin(BaseTest.secondUser.login, BaseTest.secondUser.password);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder(pageManager.sideSecondaryMailMenu.MailFolders.Inbox);
  };

  async function OpenMailContextMenuOptions({pageManager, apiManager}) {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await apiManager.mailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder(pageManager.sideSecondaryMailMenu.MailFolders.Sent);
    await pageManager.mailsList.OpenMailContextMenu(mailSubject);
  }
});
