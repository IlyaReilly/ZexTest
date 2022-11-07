import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';
import {InheritedFields} from '../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

test.describe('Contacts tests', async () => {
  let mailSubject;
  let mailBody;
  let firstName;
  let newFirstName;
  let lastName;
  let email;

  test.beforeEach(async ({pageManager}) => {
    firstName = BaseTest.dateTimePrefix();
    newFirstName = BaseTest.dateTimePrefix() + 'New';
    lastName = BaseTest.dateTimePrefix() + 'LName';
    email = BaseTest.dateTimePrefix() + '@test.com';
    mailSubject = BaseTest.dateTimePrefix() + ' Autotest Mail Subject';
    mailBody = BaseTest.dateTimePrefix() + ' Autotest Mail Body';
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
  });

  test.afterEach(async ({page, apiManager}) => {
    const id = await apiManager.contactsAPI.ContactsSearchQuery(firstName, BaseTest.userForLogin.login);
    await apiManager.deleteContactsAPI.DeleteContactsPermanentlyById(id, BaseTest.userForLogin.login);
    await page.close();
  });

  test('TC601. Open contacts tab. Contacts folder options should be visible', async ({pageManager}) => {
    await expect(pageManager.sideSecondaryContactsMenu.ContactAddressBooks.Contacts, 'Contacts tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryContactsMenu.ContactAddressBooks.EmailedContacts, 'Emailed contacts tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryContactsMenu.ContactAddressBooks.Trash, 'Trash tab should be presented').toBeVisible();
  });

  test('TC602. Add new contact. New contact appears in Contacts folder', async ({page, pageManager}) => {
    BaseTest.doubleTimeout();
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newContact.CreateNewContact(firstName, lastName, email);
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState('hidden');
    await expect(pageManager.contactsList.Containers.ContactsListContainer.locator(`"${email}"`), 'The e-mail address of a new contact is visible in Contacts list').toBeVisible();
  });

  test('TC603. Emailed contact. New email reciever appears in emailed Contacts folder', async ({pageManager, apiManager}) => {
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, email, mailBody);
    await pageManager.sideSecondaryContactsMenu.ContactAddressBooks.EmailedContacts.click();
    await expect(pageManager.contactsList.Containers.ContactsListContainer.locator(`"${email}"`), 'The e-mail address of a new contact is visible in Emailed contacts list').toBeVisible();
  });

  test('TC604. Delete contact. Contact appears in Trash folder', async ({page, pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await apiManager.createContactsAPI.CreateContact(firstName, BaseTest.userForLogin.login);
    await pageManager.contactsList.SelectContactContextMenuOption.Delete(BaseTest.userForLogin.login);
    await page.reload();
    await pageManager.sideSecondaryContactsMenu.ContactAddressBooks.Trash.click();
    await expect(pageManager.contactsList.Containers.ContactsListContainer.locator(`"${firstName}"`), 'The first name of a new contact is visible in Trash contacts list').toBeVisible();
  });

  test('TC605. Delete contact permanently. Contact disappears from Trash folder', async ({pageManager, apiManager}) => {
    const contactId = await apiManager.createContactsAPI.CreateContact(firstName, BaseTest.userForLogin.login);
    await apiManager.deleteContactsAPI.DeleteContactsById(contactId, BaseTest.userForLogin.login);
    await pageManager.sideSecondaryContactsMenu.ContactAddressBooks.Trash.click();
    await pageManager.contactsList.SelectContactContextMenuOption.DeletePermanently(BaseTest.userForLogin.login);
    await pageManager.deleteContactPermanentlyModal.Buttons.DeletePermanently.click();
    await expect(pageManager.contactsList.Containers.ContactsListContainer.locator(`"${firstName}"`), 'The first name of a new contact is not visible in Trash contacts list').not.toBeVisible();
  });

  test('TC606. Edit contact data. Edited contact data is visible in Contacts folder', async ({pageManager, apiManager}) => {
    await apiManager.createContactsAPI.CreateContact(firstName, BaseTest.userForLogin.login);
    await pageManager.contactsList.Containers.ContactsListContainer.locator(`"${BaseTest.userForLogin.login}"`).first().click();
    await pageManager.contactDetails.ContactOptions.Edit.click();
    await pageManager.contactDetails.EditContactView.FirstName.fill(newFirstName);
    await pageManager.contactDetails.EditContactView.Save.click();
    await expect(pageManager.contactsList.Containers.ContactsListContainer.locator(`"${newFirstName}"`), 'The edited last name of contact is visible in Contacts list').toBeVisible();
  });
});

