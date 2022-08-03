import {expect, Page} from '@playwright/test';
import {test, pageManager, playwrightProjectsData, apiManager, dateTimePrefix} from './BaseTest';
import {InheritedFields} from '../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

test.describe('Mails tests', async () => {
  let page: Page;
  let mailSubject;
  let mailBody;
  let user1;
  const runtimeAppoinmentId = '';

  // Components
  let headerMenu;
  let sideMenu;
  let sideSecondaryMailMenu;
  let newMail;
  let mailsList;
  let mailsAPI;

  // Functions
  async function SendLetter() {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await headerMenu.Buttons.NewItem.click();
    await newMail.CreateNewMail(user1, mailSubject, mailBody);
    await newMail.SendMail();
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState('hidden');
  }

  async function MakeDraft() {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await headerMenu.Buttons.NewItem.click();
    await newMail.CreateNewMail(user1, mailSubject, mailBody);
    await newMail.SaveMail();
    await newMail.CloseNewMail();
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState('hidden');
  }

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
    await page.goto('/');
    mailsAPI = await apiManager.getMailsAPI(page);
    user1 = playwrightProjectsData.users.test1.login;
    headerMenu = await pageManager.getHeaderMenuComponent(page);
    sideMenu = await pageManager.getSideMenuComponent(page);
    newMail = await pageManager.getNewMailComponent(page);
    sideSecondaryMailMenu = await pageManager.getSideSecondaryMailMenuComponent(page);
    mailsList = await pageManager.getMailsListComponent(page);
  });

  test.beforeEach(async () => {
    await page.reload();
    mailSubject = dateTimePrefix() + ' Autotest Mail Subject';
    mailBody = dateTimePrefix() + ' Autotest Mail Body';
  });

  test.afterEach(async ({login}) => {
    await mailsAPI.ItemActionRequest(mailsAPI.ActionRequestTypes.delete, runtimeAppoinmentId, login);
    const id = await mailsAPI.MailSearchQuery(mailSubject, login);
    await mailsAPI.ItemActionRequest(mailsAPI.ActionRequestTypes.delete, id, login);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Open Mail tab. User login is presented in the secondary side bar.', async ({login}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await expect(sideSecondaryMailMenu.Containers.MainContainer.locator(`"${login}"`)).toBeVisible();
  });

  test('Inbox mail. Mail appears in the inbox chapter', async ({}) => {
    await SendLetter();
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Inbox);
    await page.reload({timeout: 3000});
    await mailsList.OpenMail(mailSubject);
    await expect(mailsList.Elements.LetterSubject.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('Junk mail. Mail appears in the junk chapter', async ({login}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await mailsAPI.SendMsgRequest(mailSubject, login, user1, mailBody);
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Sent);
    await mailsList.OpenMail(mailSubject);
    await mailsList.MarkAsSpam();
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Junk);
    await mailsList.OpenMail(mailSubject);
    await expect(mailsList.Elements.LetterSubject.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('Send mail. Mail appears in the sent chapter.', async ({login}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await mailsAPI.SendMsgRequest(mailSubject, login, user1, mailBody);
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Sent);
    await expect(mailsList.Elements.Mail.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('Draft mail. Mail appears in the draft chapter.', async ({}) => {
    await MakeDraft();
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Drafts);
    await mailsList.OpenMail(mailSubject);
    await expect(mailsList.Elements.LetterSubject.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('Trash mail. Mail appears in the trash chapter', async ({login}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await mailsAPI.SaveDraftRequest(mailSubject, login, user1, mailBody);
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Drafts);
    await mailsList.OpenMail(mailSubject);
    await mailsList.DeleteDraft();
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Trash);
    await mailsList.OpenMail(mailSubject);
    await expect(mailsList.Elements.LetterSubject.locator(`"${mailSubject}"`)).toBeVisible();
  });
});
