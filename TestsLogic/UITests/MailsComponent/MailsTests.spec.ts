import {expect} from '@playwright/test';
import {test, BaseTest} from '../../UITests/BaseTest';
import {InheritedFields} from '../../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

test.describe('Mails tests', async () => {
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

  test('TC201. Open Mail tab. User login is presented in the secondary side bar.', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await expect(pageManager.sideSecondaryMailMenu.Containers.MainContainer.locator(`"${BaseTest.userForLogin.login}"`), 'User`s login is visible').toBeVisible();
  });
  // Contacts Dropdown does not appear
  test.skip('TC202. Get mail. Mail appears in the Inbox folder', async ({page, pageManager}) => {
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newMail.CreateNewMail(BaseTest.userForLogin.login, mailSubject, mailBody);
    await pageManager.newMail.SendMail();
    const elementHandle = await page.$(InheritedFields.NewItemBoardLocator);
    await elementHandle?.waitForElementState('hidden');
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Inbox();
    await page.reload();
    await pageManager.mailsList.OpenMail(mailSubject);
    await expect(pageManager.mailDetails.Elements.LetterSubject.locator(`"${mailSubject}"`), 'New mail subject is visible in Inbox folder mails list').toBeVisible();
  });

  // 137 'Unexpected Sent folder opening'
  test.skip('TC203. Mark mail as spam. Mail appears in the Junk folder', async ({page, pageManager, apiManager}) => {
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await OpenMailFolderAndOpenMail({pageManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent, mailSubject);
    await pageManager.mailDetails.SelectMailOption.MarkAsSpam();
    await pageManager.mailDetails.Elements.ActionWithMailNotification.waitFor();
    const elementHandle = await page.$(pageManager.mailDetails.Elements.ActionWithMailNotification._selector);
    await elementHandle?.waitForElementState('hidden');
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Junk();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`), 'New mail subject is visible in Junk folder mails list').toBeVisible();
  });

  test('TC204. Send mail. Mail appears in the Sent folder.', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`), 'New mail subject is visible in Sent folder mails list').toBeVisible();
  });

  // This test will not work because doesn't work SAVE button
  test.skip('TC205. Save mail draft. Mail appears in the Drafts folder.', async ({page, pageManager}) => {
    BaseTest.doubleTimeout();
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newMail.CreateNewMail(BaseTest.secondUser.login, mailSubject, mailBody);
    await pageManager.newMail.SaveMail();
    await pageManager.newMail.CloseNewMail();
    const elementHandle = await page.$(InheritedFields.NewItemBoardLocator);
    await elementHandle?.waitForElementState('hidden');
    await OpenMailFolderAndOpenMail({pageManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Drafts, mailSubject);
    await expect(pageManager.mailDetails.Elements.LetterSubject.locator(`"${mailSubject}"`), 'New mail subject is visible in Draft folder mails list').toBeVisible();
  });
  // Contacts Dropdown does not appear
  test.skip('TC206. Move mail to trash. Mail appears in the Trash folder', async ({pageManager, apiManager}) => {
    await apiManager.createMailsAPI.SaveDraftRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await OpenMailFolderAndOpenMail({pageManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Drafts, mailSubject);
    await pageManager.mailDetails.SelectMailOption.Delete();
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Trash();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`), 'New mail subject is visible in Trash folder mails list').toBeVisible();
  });

  test('TC213. Delete mail permanently. Mail disappears from the Trash folder', async ({pageManager, apiManager}) => {
    const id = await apiManager.createMailsAPI.SaveDraftRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await apiManager.deleteMailsAPI.MoveToTrash(id);
    await OpenMailFolderAndOpenMail({pageManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Trash, mailSubject);
    await pageManager.mailDetails.SelectMailOption.DeletePermanently();
    await pageManager.deleteMailModal.DeletePermanently();
    await expect(pageManager.mailDetails.Elements.LetterSubject.locator(`"${mailSubject}"`), 'New mail subject should not be visible in Trash folder mails list').not.toBeVisible();
  });

  async function OpenMailFolderAndOpenMail({pageManager}, openFolder, mail) {
    await openFolder();
    await pageManager.mailsList.OpenMail(mail);
  }
});
