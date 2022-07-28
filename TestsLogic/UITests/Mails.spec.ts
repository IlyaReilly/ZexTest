import { expect, Page } from '@playwright/test';
import { test, pageManager, playwrightProjectsData, apiManager} from './BaseTest';
import {InheritedFields} from '../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

test.describe('Mails tests', async () => {

  let page: Page;
  let dateTimePrefix;
  let mailSubject;
  let mailBody;
  let user2;
  let runtimeAppoinmentId = '';

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
    await newMail.CreateNewMail(user2, mailSubject, mailBody);
    await newMail.SendMail();
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState("hidden");
  }

  async function MakeDraft ()  {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await headerMenu.Buttons.NewItem.click();
    await newMail.CreateNewMail(user2, mailSubject, mailBody);
    await newMail.SaveMail();
    await newMail.CloseNewMail();
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState("hidden");
  }

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/');
    mailsAPI = await apiManager.getMailsAPI(page);
    user2 = playwrightProjectsData.users.test1.login;
    headerMenu = await pageManager.getHeaderMenuComponent(page);
    sideMenu = await pageManager.getSideMenuComponent(page);
    newMail = await pageManager.getNewMailComponent(page);
    sideSecondaryMailMenu = await pageManager.getSideSecondaryMailMenuComponent(page);
    mailsList = await pageManager.getMailsListComponent(page);
  });

  test.beforeEach(async () => {
    await page.reload();
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    mailSubject = dateTimePrefix + ' Autotest Mail Subject';
    mailBody = dateTimePrefix + ' Autotest Mail Body';
  });
  
  test.afterEach(async({login}) => {
    await mailsAPI.ItemActionRequest(mailsAPI.ActionRequestTypes.delete, runtimeAppoinmentId, login);
    var id = await mailsAPI.MailSearchQuery(mailSubject, login);
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
    await newMail.RefreshPage();
    await newMail.OpenInboxMail();
    await expect(mailsList.Elements.LetterSubject.locator(`"${mailSubject}"`)).toBeVisible();    
  })

  test('Junk mail. Mail appears in the junk chapter', async({login}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await mailsAPI.SendMsgRequest(mailSubject, login, user2, mailBody);
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Inbox);
    await newMail.RefreshPage();
    await newMail.OpenInboxMail();
    await newMail.MarkAsSpam();
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Junk);
    await newMail.OpenJunkMail();
    await expect(mailsList.Elements.NotificationBlock.locator(':has-text("You’ve marked this e-mail as Spam")')).toBeVisible(); 
  })

  test('Send mail. Mail appears in the sent chapter.', async ({login}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await mailsAPI.SendMsgRequest(mailSubject, login, user2, mailBody);
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Sent);
    await expect(mailsList.Elements.Mail.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('Draft mail. Mail appears in the draft chapter.', async ({}) => {
    await MakeDraft();
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Drafts);
    await newMail.OpenDraftMail();
    await expect(mailsList.Elements.LetterSubject.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('Trash mail. Mail appears in the trash chapter', async ({login}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await mailsAPI.SaveDraftRequest(mailSubject, login, user2, mailBody);
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Drafts);
    await newMail.OpenDraftMail();
    await newMail.DeleteDraft();
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Trash);
    await newMail.OpenTrashMail();
    await expect(mailsList.Elements.LetterSubject.locator(`"${mailSubject}"`)).toBeVisible();
    
  });
});