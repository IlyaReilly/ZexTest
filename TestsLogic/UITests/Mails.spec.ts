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

  test('Send mail. Mail appears in the sent chapter.', async ({request}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Mail);
    await headerMenu.Buttons.NewItem.click();
    await newMail.SendMail(playwrightProjectsData.users.test1.login, mailSubject, mailBody);
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState("hidden");
    await sideSecondaryMailMenu.OpenMailFolder(sideSecondaryMailMenu.MailFolders.Sent);
    await expect(mailsList.Elements.Mail.locator(`"${mailSubject}"`)).toBeVisible();
  });
});