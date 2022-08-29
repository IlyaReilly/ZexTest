import {expect} from '@playwright/test';
import {test, BaseTest} from './BaseTest';
import {InheritedFields} from '../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

test.describe('Mails tests', async () => {
  let mailSubject;
  let mailBody;
  let user1;

  test.beforeEach(async ({}, workerInfo) => {
    user1 = BaseTest.secondUser;
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
    await expect(pageManager.sideSecondaryMailMenu.Containers.MainContainer.locator(`"${BaseTest.userForLogin.login}"`)).toBeVisible();
  });

  test('Inbox mail. Mail appears in the inbox chapter', async ({page, pageManager}) => {
    test.slow();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newMail.CreateNewMail(BaseTest.userForLogin.login, mailSubject, mailBody);
    await pageManager.newMail.SendMail();
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState('hidden');
    await pageManager.sideSecondaryMailMenu.OpenMailFolder(pageManager.sideSecondaryMailMenu.MailFolders.Inbox);
    await page.reload();
    await pageManager.mailsList.OpenMail(mailSubject);
    await expect(pageManager.mailDetails.Elements.LetterSubject.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('Junk mail. Mail appears in the junk chapter', async ({page, pageManager, apiManager}) => {
    test.slow();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await apiManager.mailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, user1.login, mailBody);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder(pageManager.sideSecondaryMailMenu.MailFolders.Sent);
    await pageManager.mailsList.OpenMail(mailSubject);
    await pageManager.mailDetails.MarkAsSpam();
    await pageManager.mailDetails.Elements.ActionWithMailNotification.waitFor();
    const elementHandle = await page.$(pageManager.mailDetails.Elements.ActionWithMailNotification._selector);
    await elementHandle?.waitForElementState('hidden');
    await pageManager.sideSecondaryMailMenu.OpenMailFolder(pageManager.sideSecondaryMailMenu.MailFolders.Junk);
    await page.reload();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('Send mail. Mail appears in the sent chapter.', async ({pageManager, apiManager}) => {
    test.slow();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await apiManager.mailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, user1.login, mailBody);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder(pageManager.sideSecondaryMailMenu.MailFolders.Sent);
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('Draft mail. Mail appears in the draft chapter.', async ({page, pageManager}) => {
    test.slow();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newMail.CreateNewMail(user1.login, mailSubject, mailBody);
    await pageManager.newMail.SaveMail();
    await pageManager.newMail.CloseNewMail();
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState('hidden');
    await pageManager.sideSecondaryMailMenu.OpenMailFolder(pageManager.sideSecondaryMailMenu.MailFolders.Drafts);
    await pageManager.mailsList.OpenMail(mailSubject);
    await expect(pageManager.mailDetails.Elements.LetterSubject.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('Trash mail. Mail appears in the trash chapter', async ({pageManager, apiManager}) => {
    test.slow();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await apiManager.mailsAPI.SaveDraftRequest(mailSubject, BaseTest.userForLogin.login, user1.login, mailBody);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder(pageManager.sideSecondaryMailMenu.MailFolders.Drafts);
    await pageManager.mailsList.OpenMail(mailSubject);
    await pageManager.mailDetails.DeleteDraft();
    await pageManager.sideSecondaryMailMenu.OpenMailFolder(pageManager.sideSecondaryMailMenu.MailFolders.Trash);
    await pageManager.mailsList.OpenMail(mailSubject);
    await expect(pageManager.mailDetails.Elements.LetterSubject.locator(`"${mailSubject}"`)).toBeVisible();
  });
});
