import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';

test.describe('New address book tests', async () => {
  let dateTimePrefix;
  let addressBookName;

  test.beforeAll(async ({apiManager}) => {
    const allAddressBookFolders = await apiManager.сontactsAPI.GetAddressBookFolders(BaseTest.userForLogin.login);
    const allCustomFolders = allAddressBookFolders.filter((folder) => folder.deletable);
    await Promise.all(allCustomFolders.map(async (folder) => {
      return await apiManager.сontactsAPI.DeleteAddressBookFolderRequest(folder.id, BaseTest.userForLogin.login);
    }));
  });

  test.beforeEach(async () => {
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    addressBookName = dateTimePrefix + ' Address book';
  });

  test.afterEach(async ({page, apiManager}) => {
    const AddressBookFolderId = await apiManager.сontactsAPI.GetAddressBookFolderIdByName(BaseTest.userForLogin.login, addressBookName);
    await apiManager.сontactsAPI.DeleteAddressBookFolderRequest(AddressBookFolderId, BaseTest.userForLogin.login);
    await page.close();
  });

  test('Create new Address book. Address book should be present in the secondary menu list', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.sideSecondaryContactsMenu.OpenContactsContextMenuOption.NewAddressBook();
    await pageManager.newAddressBookModal.CreateNewAddressBook(addressBookName);
    await pageManager.sideSecondaryContactsMenu.ExpandContactsFolder();
    await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`"${addressBookName}"`), 'New address book should be visible on Contacts folder').toBeVisible();
  });

  // test('Move Address book. ', async ({pageManager}) => {// add move, check it in Calendar.ts
  //   await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
  //   await pageManager.sideSecondaryContactsMenu.OpenContactsContextMenuOption.NewAddressBook();
  //   await pageManager.newAddressBookModal.CreateNewAddressBook(addressBookName);
  //   //await pageManager.sideSecondaryContactsMenu.OpenContactsContextMenuOption.Move();
  //   await pageManager.sideSecondaryContactsMenu.ExpandContactsFolder();
  //   await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`"${addressBookName}"`), 'New address book should be visible on Contacts folder').toBeVisible();
  // });
});

