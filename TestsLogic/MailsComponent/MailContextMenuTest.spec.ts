import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';

test.describe('Mails context menu options tests', async () => {
  let mailSubject;
  let mailBody;

  test.beforeEach(async ({pageManager}) => {
    mailSubject = BaseTest.dateTimePrefix() + ' Autotest Mail Subject';
    mailBody = BaseTest.dateTimePrefix() + ' Autotest Mail Body';
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
  });

  test.afterEach(async ({page, apiManager}) => {
    const id = await apiManager.mailsAPI.MailSearchQuery(mailSubject, BaseTest.userForLogin.login);
    await apiManager.mailsAPI.ItemActionRequest(apiManager.mailsAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    await page.close();
  });

  // The logic of this test is broken by application changes
  test.skip('Mark mail as unread', async ({secondPageManager, apiManager}) => {
    await OpenInboxMailInAnotherUser({secondPageManager, apiManager});
    await secondPageManager.mailsList.OpenMail(mailSubject);
    await secondPageManager.mailsList.SelectMailContextMenuOption.MarkAsUnread(mailSubject);
    await expect(secondPageManager.mailsList.Elements.UnreadMessageIcon.first(), 'Unread message icon should be visible').toBeVisible();
  });
  // The logic of this test is broken by application changes
  test.skip('Mark mails as read', async ({pageManager, secondPageManager, apiManager}) => {
    await OpenInboxMailInAnotherUser({secondPageManager, apiManager});
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

  test('Print mail', async ({page, pageManager, apiManager}) => {
    await SendMailAndOpenSentFolder({pageManager, apiManager});
    const mailTitle = await getContentFromNewPage({page}, pageManager.mailsList.SelectMailContextMenuOption.Print, 'b >> nth=-1');
    await expect(mailTitle, 'Mail subject should be in header of printed document').toBe(mailSubject);
  });

  test('Show original mail', async ({page, pageManager, apiManager}) => {
    await SendMailAndOpenSentFolder({pageManager, apiManager});
    const mailContent = await getContentFromNewPage({page}, pageManager.mailsList.SelectMailContextMenuOption.ShowOriginal, 'pre');
    await expect(mailContent, 'Original document should contain mail body text').toContain(mailBody);
  });

  async function getContentFromNewPage({page}, option, locator) {
    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      option(mailSubject),
    ]);
    await newPage.waitForLoadState();
    const content = await newPage.innerText(locator);
    return content;
  }

  async function OpenInboxMailInAnotherUser({secondPageManager, apiManager}) {
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await secondPageManager.sideSecondaryMailMenu.OpenMailFolder.Inbox();
  };

  async function SendMailAndOpenSentFolder({pageManager, apiManager}) {
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent();
  };
});
