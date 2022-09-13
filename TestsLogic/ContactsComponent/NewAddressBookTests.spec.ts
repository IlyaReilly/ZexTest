import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';

test.describe('New address book tests', async () => {
  let dateTimePrefix;
  let addressBookName;
  let addressBookId;

  test.beforeEach(async ({apiManager}) => {
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    addressBookName = dateTimePrefix + ' Address book';
    addressBookId = await apiManager.addressBookAPI.CreateAddressBook(addressBookName, BaseTest.userForLogin.login);
  });

  test.afterEach(async ({page, apiManager}) => {
    await apiManager.addressBookAPI.DeleteAddressBookPermanentlyById(addressBookId, BaseTest.userForLogin.login);
    await page.close();
  });

  // Test skipped due to problems with folder deletion afterhook.
  // It can not be implemented with UI folder creation. Impossible to get folder's id for deletion
  test.skip('Create new address book. New address book should be visible in Contacts folder.', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.sideSecondaryContactsMenu.OpenNewAddressBookContextMenuOption();
    await pageManager.newAddressBookModal.CreateNewAddressBook(addressBookName);
    await pageManager.sideSecondaryContactsMenu.ExpandContactsFolder();
    await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`"${addressBookName}"`), 'New address book should be visible in Contacts folder').toBeVisible();
  });

  test('Create new Address book with API. New address book should be visible in Contacts folder.', async ({pageManager}) => {
    await OpenContactsAndExpandContactsAddressBook({pageManager});
    await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`"${addressBookName}"`), 'New address book should be visible in Contacts folder').toBeVisible();
  });

  test('Move Address book to Root. New Address book should be visible on Root.', async ({pageManager}) => {
    test.slow();
    await OpenContactsAndExpandContactsAddressBook({pageManager});
    await pageManager.sideSecondaryContactsMenu.OpenAddressBookContextMenu.MoveAddressBookModal(addressBookName);
    await pageManager.moveAddressBookModal.DropDowns.Root.click();
    await pageManager.moveAddressBookModal.Buttons.Move.click();
    await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`"${addressBookName}"`), 'New Address book should be visible on Root').toBeVisible();
  });

  test('Share Address book. Share icon should be near folder name.', async ({page, pageManager}) => {
    test.slow();
    await OpenContactsAndExpandContactsAddressBook({pageManager});
    await pageManager.sideSecondaryContactsMenu.OpenAddressBookContextMenu.ShareAddressBookModal(addressBookName);
    await pageManager.shareAddressBookModal.ShareAddressBook(BaseTest.secondUser.login);
    await page.reload();
    await pageManager.sideSecondaryContactsMenu.ExpandContactsFolder();
    await expect(pageManager.sideSecondaryContactsMenu.Icons.SharedIcon.first(), 'Share icon should be near folder name').toBeVisible();
  });

  async function OpenContactsAndExpandContactsAddressBook({pageManager}) {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.sideSecondaryContactsMenu.ExpandContactsFolder();
  }
});

