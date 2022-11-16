import {expect} from '@playwright/test';
import {test, BaseTest} from '../../UITests/BaseTest';
import {InheritedFields} from '../../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

test.describe('Contacts tests', async () => {
  let mailSubject;
  let mailBody;
  let firstName;
  let newFirstName;
  let lastName;
  let email;
  let tagName;

  test.beforeEach(async ({pageManager}) => {
    firstName = BaseTest.dateTimePrefix();
    newFirstName = BaseTest.dateTimePrefix() + 'New';
    lastName = BaseTest.dateTimePrefix() + 'LName';
    email = BaseTest.dateTimePrefix() + '@test.com';
    mailSubject = BaseTest.dateTimePrefix() + ' Autotest Mail Subject';
    mailBody = BaseTest.dateTimePrefix() + ' Autotest Mail Body';
    tagName = BaseTest.dateTimePrefix() + 'Tag';
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
    await expect(pageManager.contactsList.Containers.MainContainer.locator(`"${email}"`), 'The e-mail address of a new contact is visible in Contacts list').toBeVisible();
  });

  test('TC603. Emailed contact. New email reciever appears in emailed Contacts folder', async ({pageManager, apiManager}) => {
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, email, mailBody);
    await pageManager.sideSecondaryContactsMenu.ContactAddressBooks.EmailedContacts.click();
    await expect(pageManager.contactsList.Containers.MainContainer.locator(`"${email}"`), 'The e-mail address of a new contact is visible in Emailed contacts list').toBeVisible();
  });

  test('TC604. Delete contact. Contact appears in Trash folder', async ({page, pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await apiManager.createContactsAPI.CreateContact(firstName, BaseTest.userForLogin.login);
    await pageManager.contactsList.SelectContactContextMenuOption.Delete(BaseTest.userForLogin.login);
    await page.reload();
    await pageManager.sideSecondaryContactsMenu.ContactAddressBooks.Trash.click();
    await expect(pageManager.contactsList.Containers.MainContainer.locator(`"${firstName}"`), 'The first name of a new contact is visible in Trash contacts list').toBeVisible();
  });

  test('TC605. Delete contact permanently. Contact disappears from Trash folder', async ({pageManager, apiManager}) => {
    const contactId = await apiManager.createContactsAPI.CreateContact(firstName, BaseTest.userForLogin.login);
    await apiManager.deleteContactsAPI.DeleteContactsById(contactId, BaseTest.userForLogin.login);
    await pageManager.sideSecondaryContactsMenu.ContactAddressBooks.Trash.click();
    await pageManager.contactsList.SelectContactContextMenuOption.DeletePermanently(BaseTest.userForLogin.login);
    await pageManager.deleteContactPermanentlyModal.Buttons.DeletePermanently.click();
    await expect(pageManager.contactsList.Containers.MainContainer.locator(`"${firstName}"`), 'The first name of a new contact is not visible in Trash contacts list').not.toBeVisible();
  });

  test('TC606. Edit contact data. Edited contact data is visible in Contacts folder', async ({pageManager, apiManager}) => {
    await apiManager.createContactsAPI.CreateContact(firstName, BaseTest.userForLogin.login);
    await pageManager.contactsList.Containers.MainContainer.locator(`"${BaseTest.userForLogin.login}"`).first().click();
    await pageManager.contactDetails.ContactOptions.Edit.click();
    await pageManager.contactDetails.EditContactView.FirstName.fill(newFirstName);
    await pageManager.contactDetails.EditContactView.Save.click();
    await expect(pageManager.contactsList.Containers.MainContainer.locator(`"${newFirstName}"`), 'The edited last name of contact is visible in Contacts list').toBeVisible();
  });

  test('TC607. Sent email to contact. New E-mail board is visible', async ({pageManager, apiManager}) => {
    await apiManager.createContactsAPI.CreateContact(firstName, BaseTest.userForLogin.login);
    await pageManager.contactsList.SelectContactContextMenuOption.SendEmail(BaseTest.userForLogin.login);
    await expect(pageManager.newMail.Containers.MainContainer.locator(`//*[starts-with(text(),"${firstName}")]`), `New E-mail board with Contact's first name is visible`).toBeVisible();
  });

  test('TC608. Check the contact count is correct. The count matches Contact list length', async ({page, pageManager, apiManager}) => {
    const contactId = await EditContactListAndCheckCount({page, pageManager, apiManager});
    await EditContactListAndCheckCount({page, pageManager, apiManager}, contactId);
  });

  test('TC609. Move contact. Contact appears in Emailed contacts folder', async ({pageManager, apiManager}) => {
    await apiManager.createContactsAPI.CreateContact(firstName, BaseTest.userForLogin.login);
    await pageManager.contactsList.SelectContactContextMenuOption.Move(BaseTest.userForLogin.login);
    await pageManager.moveAddressBookModal.DropDowns.EmailedContacts.click();
    await pageManager.moveAddressBookModal.Buttons.Move.click();
    await pageManager.sideSecondaryContactsMenu.ContactAddressBooks.EmailedContacts.click();
    await expect(pageManager.contactsList.Elements.Contact.locator(`"${firstName}"`), 'Contact appears in Emailed contacts folder').toBeVisible();
  });

  test('TC610. Add tag to contact. Tag icon is visible in Contact list item', async ({page, pageManager, apiManager}) => {
    await apiManager.createContactsAPI.CreateContact(firstName, BaseTest.userForLogin.login);
    await pageManager.contactsList.SelectContactContextMenuOption.NewTag(BaseTest.userForLogin.login);
    await pageManager.newTagModal.CreateTag(tagName);
    await expect(pageManager.contactsList.Elements.ContactTag, 'Tag icon is visible in Contact list item').toBeVisible();
  });

  async function EditContactListAndCheckCount({page, pageManager, apiManager}, contactId?) {
    if (contactId) {
      await apiManager.deleteContactsAPI.DeleteContactsById(contactId, BaseTest.userForLogin.login);
    } else {
      contactId = await apiManager.createContactsAPI.CreateContact(firstName, BaseTest.userForLogin.login);
    }
    await page.reload();
    const count = async () => +await pageManager.contactsList.Elements.Count.innerText();
    await expect(pageManager.contactsList.Elements.Contact, 'The count matches Contact list length').toHaveCount(await count());
    return contactId;
  };
});
