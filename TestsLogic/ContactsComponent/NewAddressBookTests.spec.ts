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
  test.skip('Create new address book', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.sideSecondaryContactsMenu.OpenNewAddressBookContextMenuOption();
    await pageManager.newAddressBookModal.CreateNewAddressBook(addressBookName);
    await pageManager.sideSecondaryContactsMenu.ExpandContactsFolder();
    await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`"${addressBookName}"`), 'New address book should be visible in Contacts folder').toBeVisible();
  });

  test('Create new Address book with API.', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.sideSecondaryContactsMenu.ExpandContactsFolder();
    await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`"${addressBookName}"`), 'New address book should be visible in Contacts folder').toBeVisible();
  });

  test('Move Address book to Root.', async ({pageManager}) => {
    test.slow();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.sideSecondaryContactsMenu.ExpandContactsFolder();
    await pageManager.sideSecondaryContactsMenu.OpenMoveAddressBookModal(addressBookName);
    await pageManager.moveAddressBookModal.DropDowns.Root.click();
    await pageManager.moveAddressBookModal.Buttons.Move.click();
    await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`"${addressBookName}"`), 'New Address book should be visible on Root').toBeVisible();
  });

  test('Share Address book.', async ({page, pageManager}) => {
    test.slow();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.sideSecondaryContactsMenu.ExpandContactsFolder();
    await pageManager.sideSecondaryContactsMenu.OpenShareAddressBookModal(addressBookName);
    await pageManager.shareAddressBookModal.ShareAddressBook(BaseTest.secondUser.login);
    await page.reload();
    await pageManager.sideSecondaryContactsMenu.ExpandContactsFolder();
    await expect(pageManager.sideSecondaryContactsMenu.Icons.SharedIcon.first(), 'Share icon should be near folder name').toBeVisible();
  });
});

