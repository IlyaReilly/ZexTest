import {expect} from '@playwright/test';
import {test, BaseTest} from '../../BaseTest';

test.describe('Search tests', async () => {
  let uniquePrefix;
  let contactName;

  test.beforeEach(async ({apiManager}) => {
    uniquePrefix = BaseTest.dateTimePrefix();
    contactName = uniquePrefix + ' First Contact Name';
    await apiManager.contactsAPI.DeleteAllContactsViaAPI({apiManager});
  });

  test.afterEach(async ({page, apiManager}) => {
    await apiManager.contactsAPI.DeleteAllContactsViaAPI({apiManager});
    await page.close();
  });

  test('TC702. Search contact', async ({apiManager, pageManager}) => {
    await apiManager.createContactsAPI.CreateContact(contactName, BaseTest.userForLogin.login);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
    await pageManager.headerMenu.MakeSearch(uniquePrefix);
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${contactName}"`)).toBeVisible();
  });
});
