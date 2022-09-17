import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';

test.describe('New address book tests', async () => {
  let dateTimePrefix;
  let addressBookName;
  let addressBookId;

  test.beforeEach(async ({apiManager}) => {
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    addressBookName = dateTimePrefix + ' Address book';
  });

  test.afterEach(async ({page, apiManager}) => {
    addressBookId = await apiManager.addressBookAPI.GetAddressBookIdByName(BaseTest.userForLogin.login, addressBookName);
    await apiManager.addressBookAPI.DeleteAddressBookPermanentlyById(addressBookId, BaseTest.userForLogin.login);
    await page.close();
  });

  test('Create new address book. New address book should be visible in Contacts folder.', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.sideSecondaryContactsMenu.OpenNewAddressBookContextMenuOption();
    await pageManager.newAddressBookModal.CreateNewAddressBook(addressBookName);
    await pageManager.sideSecondaryContactsMenu.ExpandContactsFolder();
    await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`"${addressBookName}"`), 'New address book should be visible in Contacts folder').toBeVisible();
  });

  test('Move Address book to Root. New Address book should be visible on Root.', async ({pageManager}) => {
    test.slow();
    await CreateNewAddressBook({pageManager});
    await OpenContactsAndExpandContactsAddressBook({pageManager});
    await pageManager.sideSecondaryContactsMenu.OpenAddressBookContextMenu.MoveAddressBookModal(addressBookName);
    await pageManager.moveAddressBookModal.DropDowns.Root.click();
    await pageManager.moveAddressBookModal.Buttons.Move.click();
    await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`"${addressBookName}"`), 'New Address book should be visible on Root').toBeVisible();
  });

  test('Share Address book. Share icon should be near folder name.', async ({page, pageManager}) => {
    test.slow();
    await CreateNewAddressBook({pageManager});
    await OpenContactsAndExpandContactsAddressBook({pageManager});
    await pageManager.sideSecondaryContactsMenu.OpenAddressBookContextMenu.ShareAddressBookModal(addressBookName);
    await pageManager.shareAddressBookModal.ShareAddressBook(BaseTest.secondUser.login);
    await page.reload();
    await pageManager.sideSecondaryContactsMenu.ExpandContactsFolder();
    await expect(pageManager.sideSecondaryContactsMenu.Icons.SharedIcon.first(), 'Share icon should be near folder name').toBeVisible();
  });

  async function CreateNewAddressBook({pageManager}) {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.sideSecondaryContactsMenu.OpenNewAddressBookContextMenuOption();
    await pageManager.newAddressBookModal.CreateNewAddressBook(addressBookName);
  };

  async function OpenContactsAndExpandContactsAddressBook({pageManager}) {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.sideSecondaryContactsMenu.ExpandContactsFolder();
  }
});

