import {expect} from '@playwright/test';
import {test, BaseTest} from '../BaseTest';

test.describe('Search tests', async () => {
  let uniquePrefix;
  let contactName;

  test.beforeEach(async ({apiManager}) => {
    uniquePrefix = BaseTest.dateTimePrefix();
    contactName = uniquePrefix + ' First Contact Name';
    await DeleteAllContactsViaAPI({apiManager});
  });

  test.afterEach(async ({page, apiManager}) => {
    await DeleteAllContactsViaAPI({apiManager});
    await page.close();
  });

  async function DeleteAllContactsViaAPI({apiManager}) {
    const id = await apiManager.contactsAPI.ContactsSearchQuery(contactName, BaseTest.userForLogin.login);
    await apiManager.deleteContactsAPI.DeleteContactsPermanentlyById(id, BaseTest.userForLogin.login);
  };

  test('TC702. Search contact', async ({apiManager, pageManager}) => {
    await apiManager.createContactsAPI.CreateContact(contactName, BaseTest.userForLogin.login);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.headerMenu.MakeSearch(uniquePrefix);
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${contactName}"`)).toBeVisible();
  });
});
