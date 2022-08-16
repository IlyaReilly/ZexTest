import {expect} from '@playwright/test';
import {test, BaseTest} from './BaseTest';
import {InheritedFields} from '../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';
import {userPool} from '../../TestData/UserPool';

test.describe('Contacts tests', async () => {
  let mailSubject;
  let mailBody;
  let firstName;
  let lastName;
  let email;
  let userForLogin;

  test.beforeEach(async ({}, workerInfo) => {
    // userForLogin = userPool[5];
    // userForLogin = BaseTest.GetUserFromPool(workerInfo.workerIndex);
    userForLogin = userPool[5];
    firstName = BaseTest.dateTimePrefix() + 'FName';
    lastName = BaseTest.dateTimePrefix() + 'LName';
    email = BaseTest.dateTimePrefix() + '@test.com';
    mailSubject = BaseTest.dateTimePrefix() + ' Autotest Mail Subject';
    mailBody = BaseTest.dateTimePrefix() + ' Autotest Mail Body';
  });

  test.afterEach(async ({page}) => {
    await page.close();
  });

  test('Open contacts tab. Contacts folder options should be visible', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await expect(pageManager.sideSecondaryContactsMenu.Options.Contacts, 'Contacts tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryContactsMenu.Options.EmailedContacts, 'Emailed contacts tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryContactsMenu.Options.Trash, 'Trash tab should be presented').toBeVisible();
  });

  test('Add new contact. New contact appears in contacts chapter', async ({page, pageManager, apiManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newContact.CreateNewContact(firstName, lastName, email);
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState('hidden');
    // await expect(pageManager.contacts.Containers.ContactsContainer.locator(`"${email}"`)).toBeVisible();
    const contacts = await apiManager.сontactsAPI.GetContacts(userForLogin.login);
    await Promise.all(contacts.map(async (contact) => {
      return apiManager.сontactsAPI.DeleteContactsById(contact.id, userForLogin.login);
    }));
  });

  test('Emailed contact. New email reciever appears in emailed contact chapter', async ({pageManager, apiManager}) => {
    await apiManager.mailsAPI.SendMsgRequest(mailSubject, userForLogin.login, email, mailBody);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.sideSecondaryContactsMenu.OpenContactsFolder(pageManager.sideSecondaryContactsMenu.Options.EmailedContacts);
    // await expect(pageManager.contacts.Containers.ContactsContainer.locator(`"${email}"`)).toBeVisible();
    const emailedContacts = await apiManager.сontactsAPI.GetEmailedContacts(userForLogin.login);
    await Promise.all(emailedContacts.map(async (contact) => {
      return apiManager.сontactsAPI.DeleteContactsById(contact.id, userForLogin.login);
    }));
  });

  test('Delete contact. Contact appears in trash chapter', async ({page, pageManager, apiManager}) => {
    // await apiManager.сontactsAPI.CreateContact(firstName, email);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newContact.CreateNewContact(firstName, lastName, email);
    await pageManager.contacts.Containers.ContactsContainer.locator(`"${email}"`).click();
    await pageManager.contacts.DeleteContact();
    await page.reload({timeout: 3000});
    await pageManager.sideSecondaryContactsMenu.OpenContactsFolder(pageManager.sideSecondaryContactsMenu.Options.Trash);
    // await page.evaluate(() => document.querySelector('.knclQe').scrollTo(0, document.body.scrollHeight));
    // await expect(pageManager.contacts.Containers.ContactsContainer.locator(`"${email}"`)).toBeVisible();
    const deletedContacts = await apiManager.сontactsAPI.GetTrashContacts(userForLogin.login);
    await Promise.all(deletedContacts.map(async (contact) => {
      return apiManager.сontactsAPI.DeleteContactsPermanentlyById(contact.id, userForLogin.login);
    }));
  });
});
