import { expect, Page } from '@playwright/test';
import { test, pageManager, playwrightProjectsData, apiManager } from './BaseTest';
import {InheritedFields} from '../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

test.describe('Contacts tests', async () => {
  let page: Page;
  let dateTimePrefix;
  let mailSubject;
  let mailBody;
  let firstName;
  let lastName;
  let email;
  let newMail;
  let mailsAPI;

  // Components
  let headerMenu;
  let sideMenu;
  let sideSecondaryContactsMenu;
  let newContact;
  let contacts;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/');
    mailsAPI = await apiManager.getMailsAPI(page);
    headerMenu = await pageManager.getHeaderMenuComponent(page);
    sideMenu = await pageManager.getSideMenuComponent(page);
    newMail = await pageManager.getNewMailComponent(page);
    newContact = await pageManager.getNewContactComponent(page);
    sideSecondaryContactsMenu = await pageManager.getSideSecondaryContactsMenuComponent(page);
    contacts = await pageManager.getContactsComponent(page);
  });

  test.beforeEach(async () => {
    await page.reload();
    // firstName = randomName() + 'First Name';
    // lastName = randomName() + 'Last Name';
    // email = randomName() + '@test.com';
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    firstName = dateTimePrefix + 'FName'
    email = dateTimePrefix + '@test.com';
    mailSubject = dateTimePrefix + ' Autotest Mail Subject';
    mailBody = dateTimePrefix + ' Autotest Mail Body';
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Open contacts tab. Contacts folder options should be visible', async ({}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Contacts);
    await expect(sideSecondaryContactsMenu.Options.Contacts, 'Contacts tab should be presented').toBeVisible();
    await expect(sideSecondaryContactsMenu.Options.EmailedContacts, 'Emailed contacts tab should be presented').toBeVisible();
    await expect(sideSecondaryContactsMenu.Options.Trash, 'Trash tab should be presented').toBeVisible();
  });

  test('Add new contact. New contact appears in contacts chapter', async ({}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Contacts);
    await headerMenu.Buttons.NewItem.click();
    await newContact.CreateNewContact(firstName, lastName, email);
    await expect(contacts.Containers.ContactsContainer.locator(`"${email}"`)).toBeVisible();
  });

  test('Emailed contact. New email reciever appears in emailed contact chapter', async ({login}) => {
    await mailsAPI.SendMsgRequest(mailSubject, login, email, mailBody);
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Contacts);
    await sideSecondaryContactsMenu.OpenContactsFolder(sideSecondaryContactsMenu.Options.EmailedContacts);
    await expect(contacts.Containers.ContactsContainer.locator(`"${email}"`)).toBeVisible();
  });

});