import {expect, Page} from '@playwright/test';
import {test, BaseTest} from './BaseTest';
import {InheritedFields} from '../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

test.describe('Mails tests', async () => {
  let page: Page;
  let loginPage;
  let mailSubject;
  let mailBody;
  let user1;
  let userForLogin;
  const runtimeAppoinmentId = '';

  // Components
  let headerMenu;
  let sideMenu;
  let sideSecondaryMailMenu;
  let newMail;
  let mailsList;
  let mailDetails;
  let mailsAPI;

  // Functions
  async function MakeDraft() {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await headerMenu.Buttons.NewItem.click();
    await newMail.CreateNewMail(user1.login, mailSubject, mailBody);
    await newMail.SaveMail();
    await newMail.CloseNewMail();
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState('hidden');
  }

  test.beforeAll(async ({browser}, workerInfo) => {
    page = await browser.newPage();
    await page.goto('/');
    mailsAPI = await BaseTest.apiManager.getMailsAPI(page);
    headerMenu = await BaseTest.pageManager.getHeaderMenuComponent(page);
    sideMenu = await BaseTest.pageManager.getSideMenuComponent(page);
    newMail = await BaseTest.pageManager.getNewMailComponent(page);
    sideSecondaryMailMenu = await BaseTest.pageManager.getSideSecondaryMailMenuComponent(page);
    mailsList = await BaseTest.pageManager.getMailsListComponent(page);
    mailDetails = await BaseTest.pageManager.getMailDetailsComponent(page);
    userForLogin = BaseTest.GetUserFromPool(workerInfo.workerIndex);
    user1 = BaseTest.GetUserFromPool(workerInfo.workerIndex);
    // Login
    loginPage = await BaseTest.pageManager.getLoginPage(page);
    await loginPage.Login(userForLogin.login, userForLogin.password);
  });

  test.beforeEach(async () => {
    await page.reload();
    mailSubject = BaseTest.dateTimePrefix() + ' Autotest Mail Subject';
    mailBody = BaseTest.dateTimePrefix() + ' Autotest Mail Body';
  });

  test.afterEach(async ({}) => {
    await mailsAPI.ItemActionRequest(mailsAPI.ActionRequestTypes.delete, runtimeAppoinmentId, userForLogin.login);
    const id = await mailsAPI.MailSearchQuery(mailSubject, userForLogin.login);
    await mailsAPI.ItemActionRequest(mailsAPI.ActionRequestTypes.delete, id, userForLogin.login);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Open Mail tab. User login is presented in the secondary side bar.', async ({}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await expect(sideSecondaryMailMenu.Containers.MainContainer.locator(`"${userForLogin.login}"`)).toBeVisible();
  });

  test('Inbox mail. Mail appears in the inbox chapter', async ({}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await headerMenu.Buttons.NewItem.click();
    await newMail.CreateNewMail(userForLogin.login, mailSubject, mailBody);
    await newMail.SendMail();
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState('hidden');
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Inbox);
    await page.reload({timeout: 3000});
    await mailsList.OpenMail(mailSubject);
    await expect(mailDetails.Elements.LetterSubject.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('Junk mail. Mail appears in the junk chapter', async ({}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await mailsAPI.SendMsgRequest(mailSubject, userForLogin.login, user1.login, mailBody);
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Sent);
    await mailsList.OpenMail(mailSubject);
    await mailDetails.MarkAsSpam();
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Junk);
    await expect(mailsList.Elements.Letter.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('Send mail. Mail appears in the sent chapter.', async ({}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await mailsAPI.SendMsgRequest(mailSubject, userForLogin.login, user1.login, mailBody);
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Sent);
    await expect(mailsList.Elements.Letter.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('Draft mail. Mail appears in the draft chapter.', async ({}) => {
    await MakeDraft();
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Drafts);
    await mailsList.OpenMail(mailSubject);
    await expect(mailDetails.Elements.LetterSubject.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('Trash mail. Mail appears in the trash chapter', async ({}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await mailsAPI.SaveDraftRequest(mailSubject, userForLogin.login, user1.login, mailBody);
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Drafts);
    await mailsList.OpenMail(mailSubject);
    await mailDetails.DeleteDraft();
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Trash);
    await mailsList.OpenMail(mailSubject);
    await expect(mailDetails.Elements.LetterSubject.locator(`"${mailSubject}"`)).toBeVisible();
  });
});
