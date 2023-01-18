import {expect} from '@playwright/test';
import {test, BaseTest} from '../../BaseTest';

test.describe('Contacts tests', async () => {
  let mailSubject;
  let mailBody;
  let firstName;
  let newFirstName;
  let lastName;
  let email;
  let tagName;

  test.beforeEach(async ({pageManager, apiManager}) => {
    firstName = BaseTest.dateTimePrefix();
    newFirstName = BaseTest.dateTimePrefix() + 'New';
    lastName = BaseTest.dateTimePrefix() + 'LName';
    email = BaseTest.dateTimePrefix() + '@test.com';
    mailSubject = BaseTest.dateTimePrefix() + ' Autotest Mail Subject';
    mailBody = BaseTest.dateTimePrefix() + ' Autotest Mail Body';
    tagName = BaseTest.dateTimePrefix() + 'Tag';
    await apiManager.contactsAPI.DeleteContactsViaAPI({apiManager});
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
  });

  test.afterEach(async ({page, apiManager}) => {
    await apiManager.contactsAPI.DeleteContactsViaAPI({apiManager});
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
    const elementHandle = await page.$(pageManager.baseApplicationPage.InheritedFields.NewItemBoardLocator);
    await elementHandle?.waitForElementState('hidden');
    await expect(pageManager.contactsList.Containers.MainContainer.locator(`"${email}"`), 'The e-mail address of a new contact is visible in Contacts list').toBeVisible();
  });

  test('TC603. Emailed contact. New email reciever appears in emailed Contacts folder', async ({pageManager, apiManager}) => {
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, mailBody, BaseTest.userForLogin.login, [email]);
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
    await DeleteContactAndOpenTrashFolder({apiManager, pageManager});
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
    await expect(pageManager.contactsList.Containers.ListContainer.locator(`"${newFirstName}"`), 'The edited last name of contact is visible in Contacts list').toBeVisible();
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
    await MoveContactAndOpenDestinationFolder({pageManager}, pageManager.contactsList.SelectContactContextMenuOption.Move);
    await expect(pageManager.contactsList.Elements.Contact.locator(`"${firstName}"`), 'Contact appears in Emailed contacts folder').toBeVisible();
  });

  test('TC610. Add tag to contact. Tag icon is visible in Contact list item', async ({page, pageManager, apiManager}) => {
    await apiManager.createContactsAPI.CreateContact(firstName, BaseTest.userForLogin.login);
    await pageManager.contactsList.SelectContactContextMenuOption.NewTag(BaseTest.userForLogin.login);
    await pageManager.newTagModal.CreateTag(tagName);
    await expect(pageManager.contactsList.Elements.ContactTag, 'Tag icon is visible in Contact list item').toBeVisible();
  });

  test('TC611. Restore contact from Trash. Contact appears in Emailed contacts folder', async ({pageManager, apiManager}) => {
    await DeleteContactAndOpenTrashFolder({apiManager, pageManager});
    await MoveContactAndOpenDestinationFolder({pageManager}, pageManager.contactsList.SelectContactContextMenuOption.Restore);
    await expect(pageManager.contactsList.Containers.MainContainer.locator(`"${firstName}"`), 'Contact appears in Emailed contacts folder').toBeVisible();
  });

  test('TC612. Click Plus Email button. Second Email input field appears', async ({pageManager}) => {
    await ClickPlusButton({pageManager}, pageManager.newContact.Buttons.PlusEmail);
    await expect(pageManager.newContact.Inputs.Email.nth(1), 'Second Email input field appears').toBeVisible();
  });

  test('TC613. Click Plus Phone Number button. Second Number input field appears ', async ({pageManager}) => {
    await ClickPlusButton({pageManager}, pageManager.newContact.Buttons.PlusPhone);
    await expect(pageManager.newContact.Inputs.PhoneNumber.nth(1), 'Second Phone Number input field appears').toBeVisible();
  });

  test('TC614. Click Plus Website button. Second Website input field appears ', async ({pageManager}) => {
    await ClickPlusButton({pageManager}, pageManager.newContact.Buttons.PlusWebsite);
    await expect(pageManager.newContact.Inputs.Website.nth(1), 'Second Website input field appears').toBeVisible();
  });

  test('TC615. Click Plus Address button. Second Address input field appears ', async ({pageManager}) => {
    await ClickPlusButton({pageManager}, pageManager.newContact.Buttons.PlusAddress);
    await expect(pageManager.newContact.Inputs.Address.nth(1), 'Second Address input field appears').toBeVisible();
  });

  test('TC616. Click Minus Email button. Second Email input field hides', async ({pageManager}) => {
    await ClickMinusButton({pageManager}, pageManager.newContact.Buttons.PlusEmail, pageManager.newContact.Buttons.MinusEmail);
    await expect(pageManager.newContact.Inputs.Email.nth(1), 'Second Email input field hides').not.toBeVisible();
  });

  test('TC617. Click Minus Phone Number button. Second Phone Number input field hides', async ({pageManager}) => {
    await ClickMinusButton({pageManager}, pageManager.newContact.Buttons.PlusPhone, pageManager.newContact.Buttons.MinusPhone);
    await expect(pageManager.newContact.Inputs.PhoneNumber.nth(1), 'Second Phone Number input field hides').not.toBeVisible();
  });

  test('TC618. Click Minus Website button. Second Website input field hides', async ({pageManager}) => {
    await ClickMinusButton({pageManager}, pageManager.newContact.Buttons.PlusWebsite, pageManager.newContact.Buttons.MinusWebsite);
    await expect(pageManager.newContact.Inputs.Website.nth(1), 'Second Website input field hides').not.toBeVisible();
  });

  test('TC619. Click Minus Address button. Second Address input field hides', async ({pageManager}) => {
    await ClickMinusButton({pageManager}, pageManager.newContact.Buttons.PlusAddress, pageManager.newContact.Buttons.MinusAddress);
    await expect(pageManager.newContact.Inputs.Address.nth(1), 'Second Address input field hides').not.toBeVisible();
  });

  test('TC620. Contact info view hides', async ({pageManager, apiManager}) => {
    await HideContactDetails({apiManager, pageManager});
    await expect(pageManager.contactDetails.Fields.FirstName, 'Contact Details field hides').not.toBeVisible();
  });

  test('TC621. Contact info view expands', async ({pageManager, apiManager}) => {
    await HideContactDetails({apiManager, pageManager});
    await pageManager.contactDetails.Buttons.DetailsChevronDown.click();
    await expect(pageManager.contactDetails.Fields.FirstName, 'Contact Details field appears').toBeVisible();
  });

  test('TC622. Click Minus on filled Email button. The field should be empty', async ({pageManager}) => {
    await ClickMinusToDelete({pageManager}, pageManager.newContact.Inputs.Email, pageManager.newContact.Buttons.MinusEmail);
    await expect(pageManager.newContact.Inputs.Email, 'The Email field should be empty').toBeEmpty();
  });

  test('TC623. Click Minus on filled Phone Number button. The field should be empty', async ({pageManager}) => {
    await ClickMinusToDelete({pageManager}, pageManager.newContact.Inputs.PhoneNumber, pageManager.newContact.Buttons.MinusPhone);
    await expect(pageManager.newContact.Inputs.PhoneNumber, 'The Phone Number field should be empty').toBeEmpty();
  });

  test('TC624. Click Minus on filled Website button. The field should be empty', async ({pageManager}) => {
    await ClickMinusToDelete({pageManager}, pageManager.newContact.Inputs.Website, pageManager.newContact.Buttons.MinusWebsite);
    await expect(pageManager.newContact.Inputs.Website, 'The Website field should be empty').toBeEmpty();
  });

  test('TC625. Click Minus on filled Address button. The field should be empty', async ({pageManager}) => {
    await ClickMinusToDelete({pageManager}, pageManager.newContact.Inputs.Address, pageManager.newContact.Buttons.MinusAddress);
    await expect(pageManager.newContact.Inputs.Address, 'The Address field should be empty').toBeEmpty();
  });

  async function DeleteContactAndOpenTrashFolder({apiManager, pageManager}) {
    const contactId = await apiManager.createContactsAPI.CreateContact(firstName, BaseTest.userForLogin.login);
    await apiManager.deleteContactsAPI.DeleteContactsById(contactId, BaseTest.userForLogin.login);
    await pageManager.sideSecondaryContactsMenu.ContactAddressBooks.Trash.click();
  };

  async function MoveContactAndOpenDestinationFolder({pageManager}, option) {
    await option(BaseTest.userForLogin.login);
    await pageManager.moveAddressBookModal.DropDowns.EmailedContacts.click();
    if (option === pageManager.contactsList.SelectContactContextMenuOption.Move) {
      await pageManager.moveAddressBookModal.Buttons.Move.click();
    } else {
      await pageManager.moveAddressBookModal.Buttons.Restore.click();
    }
    await pageManager.sideSecondaryContactsMenu.ContactAddressBooks.EmailedContacts.click();
  };

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

  async function ClickPlusButton({pageManager}, plusbtn) {
    await pageManager.headerMenu.Buttons.NewItem.click();
    await plusbtn.click();
  };

  async function ClickMinusButton({pageManager}, plusbtn, minusbtn) {
    await pageManager.headerMenu.Buttons.NewItem.click();
    await plusbtn.click();
    await minusbtn.click();
  };

  async function HideContactDetails({apiManager, pageManager}) {
    await apiManager.createContactsAPI.CreateContact(firstName, BaseTest.userForLogin.login);
    await pageManager.contactsList.Containers.MainContainer.locator(`"${BaseTest.userForLogin.login}"`).first().click();
    await pageManager.contactDetails.Buttons.DetailsChevronUp.click();
  };

  async function ClickMinusToDelete({pageManager}, field, minusbtn) {
    await pageManager.headerMenu.Buttons.NewItem.click();
    await field.fill(`${firstName}`);
    await minusbtn.click();
  };
});
