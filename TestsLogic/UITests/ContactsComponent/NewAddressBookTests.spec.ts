import {expect} from '@playwright/test';
import {test, BaseTest} from '../../UITests/BaseTest';
import {ColorChangeList} from '../../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

test.describe('New address book tests', async () => {
  let dateTimePrefix;
  let addressBookName;
  let addressBookId;
  let newAddressBookName;
  let firstName;

  test.beforeEach(async () => {
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    addressBookName = dateTimePrefix + ' Address book';
    newAddressBookName = dateTimePrefix + ' New Address book';
    firstName = dateTimePrefix + ' Contact';
  });

  test.afterEach(async ({page, apiManager}) => {
    addressBookId = await apiManager.addressBookAPI.GetAddressBookIdByName(BaseTest.userForLogin.login, addressBookName);
    if (!addressBookId) {
      addressBookId = await apiManager.addressBookAPI.GetAddressBookIdByName(BaseTest.userForLogin.login, newAddressBookName);
    } else if (!addressBookId) {
      test.skip();
    }
    await apiManager.addressBookAPI.DeleteAddressBookPermanentlyById(addressBookId, BaseTest.userForLogin.login);
    await page.close();
  });

  async function CreateNewAddressBook({pageManager}) {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.sideSecondaryContactsMenu.OpenNewAddressBookContextMenuOption();
    await pageManager.newAddressBookModal.CreateNewAddressBook(addressBookName);
    await pageManager.sideSecondaryContactsMenu.ExpandContactsFolder();
  };

  test('TC901. Create new address book. New address book should be visible in Contacts folder.', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.sideSecondaryContactsMenu.OpenNewAddressBookContextMenuOption();
    await pageManager.newAddressBookModal.CreateNewAddressBook(addressBookName);
    await expect(pageManager.sideSecondaryContactsMenu.Buttons.ExpandAddressBooks).toHaveCount(2);
    await pageManager.sideSecondaryContactsMenu.ExpandContactsFolder();
    await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`"${addressBookName}"`), 'New address book should be visible in Contacts folder').toBeVisible();
  });

  test('TC902. Move Address book to Root. New Address book should be visible on Root.', async ({pageManager}) => {
    BaseTest.doubleTimeout();
    await CreateNewAddressBook({pageManager});
    await pageManager.sideSecondaryContactsMenu.OpenAddressBookContextMenu.MoveAddressBookModal(addressBookName);
    await pageManager.moveAddressBookModal.DropDowns.Root.click();
    await pageManager.moveAddressBookModal.Buttons.Move.click();
    await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`"${addressBookName}"`).first(), 'New Address book should be visible on Root').toBeVisible();
  });

  test('TC903. Share Address book. Share icon should be near folder name.', async ({pageManager}) => {
    test.fail();
    await CreateNewAddressBook({pageManager});
    await pageManager.sideSecondaryContactsMenu.OpenAddressBookContextMenu.ShareAddressBookModal(addressBookName);
    await expect(pageManager.sideSecondaryContactsMenu.Buttons.ExpandAddressBooks).toHaveCount(2);
    await pageManager.shareAddressBookModal.Share(BaseTest.secondUser.login);
    await expect(pageManager.sideSecondaryContactsMenu.Icons.SharedIcon, 'Share icon should be near folder name').toBeVisible();
  });

  test('TC904. Edit Address book. Created address book is emptied.', async ({pageManager, apiManager}) => {
    await apiManager.createContactsAPI.CreateContact(firstName, BaseTest.userForLogin.login);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.sideSecondaryContactsMenu.OpenAddressBookContextMenu.EmptyAddressBookModal("Contacts");
    await pageManager.editAddressBookModal.Buttons.Empty.click();
    await expect(pageManager.sideSecondaryContactsMenu.Containers.MainContainer.locator(`${firstName}`)).not.toBeVisible();
  });

  test('TC905. Edit Address book. New Address book name should be visible.', async ({pageManager}) => {
    await CreateNewAddressBook({pageManager});
    await pageManager.sideSecondaryContactsMenu.OpenAddressBookContextMenu.EditAddressBookModal(addressBookName);
    await pageManager.editAddressBookModal.TextBoxes.AddressBookName.fill(newAddressBookName);
    await pageManager.editAddressBookModal.Buttons.Edit.click();
    await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`"${newAddressBookName}"`), 'New Address book name should be visible').toBeVisible();
  });

  test('TC906. Delete Address book. New address book name is deleted', async ({page, pageManager}) => {
    await CreateNewAddressBook({pageManager});
    await pageManager.sideSecondaryContactsMenu.OpenAddressBookContextMenu.DeleteAddressBookModal(addressBookName);
    await pageManager.deleteAddressBookModal.Buttons.Delete.click();
    await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`"${addressBookName}"`), 'Created new address book should not be visible').not.toBeVisible();
  });

  test('TC907. Edit Address book. Adress book should be visible in new destination folder', async ({pageManager}) => {
    await CreateNewAddressBook({pageManager});
    await pageManager.sideSecondaryContactsMenu.OpenAddressBookContextMenu.EditAddressBookModal(addressBookName);
    await pageManager.editAddressBookModal.DropDown.DestinationFolderList.click();
    await pageManager.moveAddressBookModal.DropDowns.Root.click();
    await pageManager.editAddressBookModal.Buttons.Edit.click();
    await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`"${addressBookName}"`).first(), 'New Address book should be visible on Root').toBeVisible();
  });

  for (const color of ColorChangeList) {
    test('TC908. Edit Address book. New adress book icon color should be visible' + `${color.ColorSet}`, async ({pageManager}) => {
      await CreateNewAddressBook({pageManager});
      await pageManager.sideSecondaryContactsMenu.OpenAddressBookContextMenu.EditAddressBookModal(addressBookName);
      await pageManager.editAddressBookModal.DropDown.ColorList.click();
      await pageManager.editAddressBookModal.Containers.DropDownContainer.locator(`${color.ColorSet}`).click();
      await pageManager.editAddressBookModal.Buttons.Edit.click();
      await expect(pageManager.sideSecondaryContactsMenu.Containers.MainContainer.locator(`${color.ColorCheck}`).first(), 'New adress book icon color should be visible').toBeVisible();
    });
  };
});
