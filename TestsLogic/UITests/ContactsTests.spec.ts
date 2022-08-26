import {expect} from '@playwright/test';
import {test, BaseTest} from './BaseTest';
import {InheritedFields} from '../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

test.describe('Contacts tests', async () => {
  let mailSubject;
  let mailBody;
  let firstName;
  let lastName;
  let email;
  let userForLogin;

  test.beforeEach(async ({}, workerInfo) => {
    userForLogin = BaseTest.GetUserFromPool(workerInfo.workerIndex);
    firstName = BaseTest.dateTimePrefix();
    lastName = BaseTest.dateTimePrefix() + 'LName';
    email = BaseTest.dateTimePrefix() + '@test.com';
    mailSubject = BaseTest.dateTimePrefix() + ' Autotest Mail Subject';
    mailBody = BaseTest.dateTimePrefix() + ' Autotest Mail Body';
  });

  test.afterEach(async ({page, apiManager}) => {
    const id = await apiManager.сontactsAPI.ContactsSearchQuery(firstName, userForLogin.login);
    await apiManager.сontactsAPI.DeleteContactsPermanentlyById(id, userForLogin.login);
    await page.close();
  });

  test('Open contacts tab. Contacts folder options should be visible', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await expect(pageManager.sideSecondaryContactsMenu.Options.Contacts, 'Contacts tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryContactsMenu.Options.EmailedContacts, 'Emailed contacts tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryContactsMenu.Options.Trash, 'Trash tab should be presented').toBeVisible();
  });

  test('Add new contact. New contact appears in contacts chapter', async ({page, pageManager}) => {
    test.slow();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newContact.CreateNewContact(firstName, lastName, email);
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState('hidden');
    await ScrollDownContactsList(page, pageManager);
    await expect(pageManager.contactsList.Containers.ContactsListContainer.locator(`"${email}"`)).toBeVisible();
  });

  test('Emailed contact. New email reciever appears in emailed contact chapter', async ({page, pageManager, apiManager}) => {
    await apiManager.mailsAPI.SendMsgRequest(mailSubject, userForLogin.login, email, mailBody);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.sideSecondaryContactsMenu.OpenContactsFolder(pageManager.sideSecondaryContactsMenu.Options.EmailedContacts);
    await ScrollDownContactsList(page, pageManager);
    await expect(pageManager.contactsList.Containers.ContactsListContainer.locator(`"${email}"`)).toBeVisible();
  });

  test('Delete contact. Contact appears in trash chapter', async ({page, pageManager, apiManager}) => {
    test.slow();
    await apiManager.сontactsAPI.CreateContact(firstName, userForLogin.login);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.contactsList.Containers.ContactsListContainer.locator(`"${userForLogin.login}"`).first().click();
    await pageManager.contactsList.DeleteContact();
    await page.reload();
    await pageManager.sideSecondaryContactsMenu.OpenContactsFolder(pageManager.sideSecondaryContactsMenu.Options.Trash);
    await ScrollDownContactsList(page, pageManager);
    await expect(pageManager.contactsList.Containers.ContactsListContainer.locator(`"${firstName}"`)).toBeVisible();
  });
});

async function ScrollDownContactsList(page, pageManager) {
  const listSelector = pageManager.contactsList.Containers.ContactsListToScrollContainer._selector;
  await pageManager.contactsList.Containers.ContactsListToScrollContainer.waitFor();
  await page.evaluate((locator) => document.querySelector(locator).scrollTo(0, document.body.scrollHeight), (listSelector));
}
