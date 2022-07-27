import { expect, Page } from '@playwright/test';
import { test, pageManager, playwrightProjectsData,  } from './BaseTest';
import {InheritedFields} from '../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';
import {GetAccessToken} from '../../ApplicationLogic/ApplicationAPILogic/BaseAPI';

test.describe('Mails tests', async () => {

  let page: Page;
  let dateTimePrefix;
  let mailSubject;
  let mailBody;

  // Components
  let headerMenu;
  let sideMenu;
  let sideSecondaryMailMenu;
  let newMail;
  let mailsList

  // Functions
  async function SendLetter() {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await headerMenu.Buttons.NewItem.click();
    await newMail.CreateNewMail(playwrightProjectsData.users.test1.login, mailSubject, mailBody);
    await newMail.SendMail();
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState("hidden");
  }

  async function MakeDraft ()  {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await headerMenu.Buttons.NewItem.click();
    await newMail.CreateNewMail(playwrightProjectsData.users.test1.login, mailSubject, mailBody);
    await newMail.SaveMail();
    await newMail.CloseNewMail();
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState("hidden");
  }

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/');
    headerMenu = await pageManager.getHeaderMenuComponent(page);
    sideMenu = await pageManager.getSideMenuComponent(page);
    newMail = await pageManager.getNewMailComponent(page);
    sideSecondaryMailMenu = await pageManager.getSideSecondaryMailMenuComponent(page);
    mailsList = await pageManager.getMailsListComponent(page);
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    mailSubject = dateTimePrefix + ' Autotest Mail Subject';
    mailBody = dateTimePrefix + ' Autotest Mail Body';
  });

  test.beforeEach(async () => {
    await page.reload();
  });
  
  test.afterAll(async () => {
    await page.close();
  });

  test('Open Mail tab. User login is presented in the secondary side bar.', async ({}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await expect(sideSecondaryMailMenu.Containers.MainContainer.locator(`"${playwrightProjectsData.users.test0.login}"`)).toBeVisible();
  });

  test('Inbox mail. Mail appears in the inbox chapter', async ({}) => {
    await SendLetter();
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Inbox);
    await newMail.RefreshPage();
    await newMail.OpenInboxMail();
    await expect(mailsList.Elements.LetterSubject.locator(`"${mailSubject}"`)).toBeVisible();    
  })

  test('Junk mail. Mail appears in the junk chapter', async({}) => {
    await SendLetter();
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Inbox);
    await newMail.RefreshPage();
    await newMail.OpenInboxMail();
    await newMail.MarkAsSpam();
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Junk);
    await newMail.OpenJunkMail();
    await expect(mailsList.Elements.NotificationBlock.locator(':has-text("You’ve marked this e-mail as Spam")')).toBeVisible(); 
  })

  test('Send mail. Mail appears in the sent chapter.', async ({}) => {
    await SendLetter();
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Sent);
    await expect(mailsList.Elements.Mail.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('Draft mail. Mail appears in the draft chapter.', async ({}) => {
    await MakeDraft();
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Drafts);
    await newMail.OpenDraftMail();
    await expect(mailsList.Elements.LetterSubject.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('Trash mail. Mail appears in the trash chapter', async ({}) => {
    await MakeDraft();
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Drafts);
    await newMail.OpenDraftMail();
    await newMail.DeleteDraft();
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Trash);
    await newMail.OpenTrashMail();
    await expect(mailsList.Elements.LetterSubject.locator(`"${mailSubject}"`)).toBeVisible();
    
  });
});