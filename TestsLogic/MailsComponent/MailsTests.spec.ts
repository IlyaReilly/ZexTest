import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';
import {InheritedFields} from '../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

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

  test('Open Mail tab. User login is presented in the secondary side bar.', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await expect(pageManager.sideSecondaryMailMenu.Containers.MainContainer.locator(`"${BaseTest.userForLogin.login}"`), 'User`s login is visible').toBeVisible();
  });
  // Contacts Dropdown does not appear
  test.skip('Get mail. Mail appears in the Inbox folder', async ({page, pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newMail.CreateNewMail(BaseTest.userForLogin.login, mailSubject, mailBody);
    await pageManager.newMail.SendMail();
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState('hidden');
    await pageManager.sideSecondaryMailMenu.OpenMailFolder(pageManager.sideSecondaryMailMenu.MailFolders.Inbox);
    await page.reload();
    await pageManager.mailsList.OpenMail(mailSubject);
    await expect(pageManager.mailDetails.Elements.LetterSubject.locator(`"${mailSubject}"`), 'New mail subject is visible in Inbox folder mails list').toBeVisible();
  });

  test('Mark mail as spam. Mail appears in the Junk folder', async ({page, pageManager, apiManager}) => {
    test.fail(true, 'Unexpected Sent folder opening');
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder(pageManager.sideSecondaryMailMenu.MailFolders.Sent);
    await pageManager.mailsList.OpenMail(mailSubject);
    await pageManager.mailDetails.SelectMailOption.MarkAsSpam();
    await pageManager.mailDetails.Elements.ActionWithMailNotification.waitFor();
    const elementHandle = await page.$(pageManager.mailDetails.Elements.ActionWithMailNotification._selector);
    await elementHandle?.waitForElementState('hidden');
    await pageManager.sideSecondaryMailMenu.OpenMailFolder(pageManager.sideSecondaryMailMenu.MailFolders.Junk);
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`), 'New mail subject is visible in Junk folder mails list').toBeVisible();
  });

  test('Send mail. Mail appears in the Sent folder.', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder(pageManager.sideSecondaryMailMenu.MailFolders.Sent);
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`), 'New mail subject is visible in Sent folder mails list').toBeVisible();
  });

  // This test will not work because doesn't work SAVE button
  test.skip('Save mail draft. Mail appears in the Drafts folder.', async ({page, pageManager}) => {
    BaseTest.doubleTimeout();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newMail.CreateNewMail(BaseTest.secondUser.login, mailSubject, mailBody);
    await pageManager.newMail.SaveMail();
    await pageManager.newMail.CloseNewMail();
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState('hidden');
    await pageManager.sideSecondaryMailMenu.OpenMailFolder(pageManager.sideSecondaryMailMenu.MailFolders.Drafts);
    await pageManager.mailsList.OpenMail(mailSubject);
    await expect(pageManager.mailDetails.Elements.LetterSubject.locator(`"${mailSubject}"`), 'New mail subject is visible in Draft folder mails list').toBeVisible();
  });

  test('Move mail to trash. Mail appears in the Trash folder', async ({pageManager, apiManager}) => {
    test.fail(true, 'Unexpected Drafts folder opening');
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await apiManager.createMailsAPI.SaveDraftRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder(pageManager.sideSecondaryMailMenu.MailFolders.Drafts);
    await pageManager.mailsList.OpenMail(mailSubject);
    await pageManager.mailDetails.SelectMailOption.Delete();
    await pageManager.sideSecondaryMailMenu.OpenMailFolder(pageManager.sideSecondaryMailMenu.MailFolders.Trash);
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`), 'New mail subject is visible in Trash folder mails list').toBeVisible();
  });

  test('Delete mail permanently. Mail disappears from the Trash folder', async ({pageManager, apiManager}) => {
    const id = await apiManager.createMailsAPI.SaveDraftRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await apiManager.deleteMailsAPI.MoveToTrash(id);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder(pageManager.sideSecondaryMailMenu.MailFolders.Trash);
    await pageManager.mailsList.OpenMail(mailSubject);
    await pageManager.mailDetails.SelectMailOption.DeletePermanently();
    await pageManager.deleteMailModal.DeletePermanently();
    await expect(pageManager.mailDetails.Elements.LetterSubject.locator(`"${mailSubject}"`), 'New mail subject should not be visible in Trash folder mails list').not.toBeVisible();
  });
});
