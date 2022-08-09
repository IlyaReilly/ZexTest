import {expect, Page} from '@playwright/test';
import {test, BaseTest} from './BaseTest';
import {InheritedFields} from '../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

test.describe('Contacts tests', async () => {
  let page: Page;
  let mailSubject;
  let mailBody;
  let firstName;
  let lastName;
  let email;
  let mailsAPI;
  let userForLogin;
  let storagesPath;

  // Components
  let headerMenu;
  let sideMenu;
  let sideSecondaryContactsMenu;
  let newContact;
  let contacts;

  test.beforeAll(async ({browser}, workerInfo) => {
    userForLogin = BaseTest.GetUserFromPool(workerInfo.workerIndex);
    storagesPath = await BaseTest.ApiLogin(userForLogin);
    page = await browser.newPage({storageState: storagesPath});
    await page.goto('/');
    mailsAPI = await BaseTest.apiManager.getMailsAPI(page);
    headerMenu = await BaseTest.pageManager.getHeaderMenuComponent(page);
    sideMenu = await BaseTest.pageManager.getSideMenuComponent(page);
    newContact = await BaseTest.pageManager.getNewContactComponent(page);
    sideSecondaryContactsMenu = await BaseTest.pageManager.getSideSecondaryContactsMenuComponent(page);
    contacts = await BaseTest.pageManager.getContactsComponent(page);
  });

  test.beforeEach(async () => {
    await page.goto('/');
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
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState('hidden');
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
