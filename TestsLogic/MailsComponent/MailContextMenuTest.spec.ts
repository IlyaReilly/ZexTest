import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';

test.describe('Mails context menu options tests', async () => {
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

  // The logic of this test is broken by application changes
  test.skip('Mark mail as unread', async ({pageManager, secondPageManager, apiManager}) => {
    await OpenInboxMailInAnotherUser({pageManager, secondPageManager, apiManager});
    await secondPageManager.mailsList.OpenMail(mailSubject);
    await secondPageManager.mailsList.SelectMailContextMenuOption.MarkAsUnread(mailSubject);
    await expect(secondPageManager.mailsList.Elements.UnreadMessageIcon.first(), 'Unread message icon should be visible').toBeVisible();
  });
  // The logic of this test is broken by application changes
  test.skip('Mark mails as read', async ({pageManager, secondPageManager, apiManager}) => {
    await OpenInboxMailInAnotherUser({pageManager, secondPageManager, apiManager});
    await secondPageManager.mailsList.SelectMailContextMenuOption.MarkAsRead(mailSubject);
    const unreadIcon = secondPageManager.mailsList.Elements.UnreadMessageIcon._selector;
    await expect(secondPageManager.mailsList.Elements.Letter.first(), 'Unread message icon should not be visible').not.toHaveClass(unreadIcon);
  });

  test('Flag mail', async ({pageManager, apiManager}) => {
    await SendMailAndOpenSentFolder({pageManager, apiManager});
    await pageManager.mailsList.SelectMailContextMenuOption.AddFlag(mailSubject);
    await pageManager.mailsList.OpenMail(mailSubject);
    await expect(pageManager.mailDetails.Elements.FlagIcon, 'Added flag should be visible').toBeVisible();
  });

  test('Mark mail as spam', async ({pageManager, apiManager}) => {
    await SendMailAndOpenSentFolder({pageManager, apiManager});
    await pageManager.mailsList.SelectMailContextMenuOption.MarkAsSpam(mailSubject);
    await expect(pageManager.mailDetails.Elements.ActionWithMailNotification, 'Mark as spam notification should be visible').toContainText('Spam');
  });

  test('Print mail', async ({pageManager, apiManager}) => {
    await SendMailAndOpenSentFolder({pageManager, apiManager});
    const mailTitle = await pageManager.printPage.OpenPrintMailPage(mailSubject);
    await expect(mailTitle, 'Mail subject should in header of printed document').toBe(mailSubject);
  });

  test('Show original mail', async ({pageManager, apiManager}) => {
    await SendMailAndOpenSentFolder({pageManager, apiManager});
    const mailContent = await pageManager.showOriginalPage.OpenShowOriginalPage(mailSubject);
    await expect(mailContent, 'Original document should contain mail body text').toContain(mailBody);
  });

  async function OpenInboxMailInAnotherUser({pageManager, secondPageManager, apiManager}) {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await apiManager.mailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await secondPageManager.sideSecondaryMailMenu.OpenMailFolder(secondPageManager.sideSecondaryMailMenu.MailFolders.Inbox);
  };

  async function SendMailAndOpenSentFolder({pageManager, apiManager}) {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await apiManager.mailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder(pageManager.sideSecondaryMailMenu.MailFolders.Sent);
  };
});