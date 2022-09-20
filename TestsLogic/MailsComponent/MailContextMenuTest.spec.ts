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

  test('Mark mail as unread', async ({page, pageManager, apiManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await apiManager.mailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await pageManager.loginPage.Relogin(BaseTest.secondUser.login, BaseTest.secondUser.password);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder(pageManager.sideSecondaryMailMenu.MailFolders.Inbox);
    await pageManager.mailsList.OpenMail(mailSubject);
    await pageManager.mailsList.OpenMailContextMenu(mailSubject);
    await pageManager.mailsList.SelectMailContextMenuOption.MarkAsUnread();
    await expect(pageManager.mailsList.Elements.UnreadMessageIcon).toBeVisible();
  });
});
