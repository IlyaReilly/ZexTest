import {expect} from '@playwright/test';
import {test, BaseTest} from './BaseTest';

test.describe('Search tests', async () => {
  // Components
  let uniquePrefix;
  let userForLogin;

  test.beforeEach(async ({}, workerInfo) => {
    uniquePrefix = BaseTest.dateTimePrefix();
    userForLogin = BaseTest.GetUserFromPool(workerInfo.workerIndex);
  });

  test.afterEach(async ({page, apiManager}) => {
    // await page.close();
  });

  test('Search sent email', async ({pageManager, apiManager}) => {
    const mailSubject = uniquePrefix + ' Autotest Mail Subject';
    const mailBody = uniquePrefix + ' Autotest Mail Body';

    try {
      await apiManager.mailsAPI.SendMsgRequest(mailSubject, userForLogin.login, userForLogin.login, mailBody);
      await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
      await pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`).waitFor();
      await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Search);
      await pageManager.headerMenu.MakeSearch(uniquePrefix);
      await expect(pageManager.searchResultsList.Elements.SearchResultMail.locator(`"${mailSubject}"`)).toBeVisible();
      await expect(pageManager.searchStatisticsHeader.Elements.SearchSnippets.locator(`"${uniquePrefix}"`)).toBeVisible();
    } catch (e) {
      throw e;
    } finally {
      const id = await apiManager.mailsAPI.MailSearchQuery(mailSubject, userForLogin.login);
      await apiManager.mailsAPI.ItemActionRequest(apiManager.mailsAPI.ActionRequestTypes.delete, id, userForLogin.login);
    }
  });

  test('Search contact', async ({apiManager, pageManager}) => {
    const contactName = uniquePrefix + ' First Contact Name';

    try {
      await apiManager.сontactsAPI.CreateContact(contactName, userForLogin.login);
      await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
      await pageManager.headerMenu.MakeSearch(uniquePrefix);
      await expect(pageManager.searchResultsList.Elements.SearchResultContacts.locator(`"${contactName}"`)).toBeVisible();
    } catch (e) {
      throw e;
    } finally {
      const id = await apiManager.сontactsAPI.ContactsSearchQuery(contactName, userForLogin.login);
      await apiManager.сontactsAPI.DeleteContactsPermanentlyById(id, userForLogin.login);
    }
  });
});
