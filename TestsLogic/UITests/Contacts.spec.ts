import {expect, Page} from '@playwright/test';
import {test, BaseTest} from './BaseTest';

test.describe('Contacts tests', async () => {
  let page: Page;
  let loginPage;
  let mailSubject;
  let mailBody;
  let firstName;
  let lastName;
  let email;
  let mailsAPI;
  let userForLogin;

  // Components
  let headerMenu;
  let sideMenu;
  let sideSecondaryContactsMenu;
  let newContact;
  let contacts;

  test.beforeAll(async ({browser}, workerInfo) => {
    page = await browser.newPage();
    await page.goto('/');
    userForLogin = BaseTest.GetUserFromPool(workerInfo.workerIndex);
    mailsAPI = await BaseTest.apiManager.getMailsAPI(page);
    headerMenu = await BaseTest.pageManager.getHeaderMenuComponent(page);
    sideMenu = await BaseTest.pageManager.getSideMenuComponent(page);
    newContact = await BaseTest.pageManager.getNewContactComponent(page);
    sideSecondaryContactsMenu = await BaseTest.pageManager.getSideSecondaryContactsMenuComponent(page);
    contacts = await BaseTest.pageManager.getContactsComponent(page);
    // Login
    loginPage = await BaseTest.pageManager.getLoginPage(page);
    await loginPage.Login(userForLogin.login, userForLogin.password);
  });

  test.beforeEach(async () => {
    await page.reload();
    firstName = BaseTest.dateTimePrefix() + 'FName';
    lastName = BaseTest.dateTimePrefix() + 'LName';
    email = BaseTest.dateTimePrefix() + '@test.com';
    mailSubject = BaseTest.dateTimePrefix() + ' Autotest Mail Subject';
    mailBody = BaseTest.dateTimePrefix() + ' Autotest Mail Body';
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

  test('Emailed contact. New email reciever appears in emailed contact chapter', async ({}) => {
    await mailsAPI.SendMsgRequest(mailSubject, userForLogin.login, email, mailBody);
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Contacts);
    await sideSecondaryContactsMenu.OpenContactsFolder(sideSecondaryContactsMenu.Options.EmailedContacts);
    await expect(contacts.Containers.ContactsContainer.locator(`"${email}"`)).toBeVisible();
  });

  test('Delete contact. Contact appears in trash chapter', async ({}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Contacts);
    await headerMenu.Buttons.NewItem.click();
    await newContact.CreateNewContact(firstName, lastName, email);
    await contacts.Containers.ContactsContainer.locator(`"${email}"`).click();
    await contacts.DeleteContact();
    await page.reload({timeout: 3000});
    await sideSecondaryContactsMenu.OpenContactsFolder(sideSecondaryContactsMenu.Options.Trash);
    await expect(contacts.Containers.ContactsContainer.locator(`"${email}"`)).toBeVisible();
  });
});
