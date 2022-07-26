import { expect, Page } from '@playwright/test';
import { test, pageManager, playwrightProjectsData, apiManager} from './BaseTest';
import {InheritedFields} from '../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

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
  let mailsList;
  let mailsAPI;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/');
    mailsAPI = await apiManager.getMailsAPI(page);
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

  test('Send mail. Mail appears in the sent chapter.', async ({}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await headerMenu.Buttons.NewItem.click();
    await newMail.CreateNewMail(playwrightProjectsData.users.test1.login, mailSubject, mailBody);
    await newMail.SendMail();
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState("hidden");
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Sent);
    await expect(mailsList.Elements.Mail.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('Draft mail. Mail appears in the draft chapter.', async ({}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await headerMenu.Buttons.NewItem.click();
    await newMail.CreateNewMail(playwrightProjectsData.users.test1.login, mailSubject, mailBody);
    await newMail.SaveMail();
    await newMail.CloseNewMail();
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState("hidden");
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Drafts);
    await newMail.OpenDraftMail();
    await expect(mailsList.Elements.LetterSubject.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('Trash mail. Mail appears in the trash chapter', async ({}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await mailsAPI.SaveDraftRequest(mailSubject, playwrightProjectsData.users.test0.login, playwrightProjectsData.users.test1.login, mailBody);
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Drafts);
    await newMail.OpenDraftMail();
    await newMail.DeleteDraft();
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Trash);
    await newMail.OpenTrashMail();
    await expect(mailsList.Elements.LetterSubject.locator(`"${mailSubject}"`)).toBeVisible();
    
  });

});