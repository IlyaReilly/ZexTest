import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';
import {InheritedFields} from '../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

test.describe('Contacts tests', async () => {
  let mailSubject;
  let mailBody;
  let firstName;
  let lastName;
  let email;

  test.beforeEach(async () => {
    firstName = BaseTest.dateTimePrefix();
    lastName = BaseTest.dateTimePrefix() + 'LName';
    email = BaseTest.dateTimePrefix() + '@test.com';
    mailSubject = BaseTest.dateTimePrefix() + ' Autotest Mail Subject';
    mailBody = BaseTest.dateTimePrefix() + ' Autotest Mail Body';
  });

  test.afterEach(async ({page, apiManager}) => {
    const id = await apiManager.contactsAPI.ContactsSearchQuery(firstName, BaseTest.userForLogin.login);
    await apiManager.deleteContactsAPI.DeleteContactsPermanentlyById(id, BaseTest.userForLogin.login);
    await page.close();
  });

  test('Open contacts tab. Contacts folder options should be visible', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await expect(pageManager.sideSecondaryContactsMenu.ContactAddressBooks.Contacts, 'Contacts tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryContactsMenu.ContactAddressBooks.EmailedContacts, 'Emailed contacts tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryContactsMenu.ContactAddressBooks.Trash, 'Trash tab should be presented').toBeVisible();
  });

  test('Add new contact. New contact appears in contacts chapter', async ({page, pageManager}) => {
    BaseTest.doubleTimeout();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newContact.CreateNewContact(firstName, lastName, email);
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState('hidden');
    await expect(pageManager.contactsList.Containers.ContactsListContainer.locator(`"${email}"`), 'The e-mail address of a new contact is visible in Contacts list').toBeVisible();
  });

  test('Emailed contact. New email reciever appears in emailed contact chapter', async ({page, pageManager, apiManager}) => {
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, email, mailBody);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.sideSecondaryContactsMenu.ContactAddressBooks.EmailedContacts.click();    
    await expect(pageManager.contactsList.Containers.ContactsListContainer.locator(`"${email}"`), 'The e-mail address of a new contact is visible in Emailed contacts list').toBeVisible();
  });

  test('Delete contact. Contact appears in trash chapter', async ({page, pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await apiManager.createContactsAPI.CreateContact(firstName, BaseTest.userForLogin.login);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.contactsList.Containers.ContactsListContainer.locator(`"${BaseTest.userForLogin.login}"`).first().click();
    await pageManager.contactsList.DeleteContact();
    await page.reload();
    await pageManager.sideSecondaryContactsMenu.ContactAddressBooks.Trash.click();    
    await expect(pageManager.contactsList.Containers.ContactsListContainer.locator(`"${firstName}"`), 'The first name of a new contact is visible in Trash contacts list').toBeVisible();
  });
});

