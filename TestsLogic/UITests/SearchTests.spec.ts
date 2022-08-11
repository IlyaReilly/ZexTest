import {expect} from '@playwright/test';
import {test, BaseTest} from './BaseTest';

test.describe('Search tests', async () => {
  let mailSubject;
  let mailBody;
  let userForLogin;

  // Components
  let uniquePrefix;

  test.beforeEach(async ({}, workerInfo) => {
    uniquePrefix = BaseTest.dateTimePrefix();
    mailSubject = uniquePrefix + ' Autotest Mail Subject';
    mailBody = uniquePrefix + ' Autotest Mail Body';
    userForLogin = BaseTest.GetUserFromPool(workerInfo.workerIndex);
  });

  test.afterEach(async ({page}) => {
    await page.close();
  });

  test('Search sent email', async ({pageManager, apiManager}) => {
    await apiManager.mailsAPI.SendMsgRequest(mailSubject, userForLogin.login, userForLogin.login, mailBody);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`).waitFor();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Search);
    await pageManager.headerMenu.MakeSearch(uniquePrefix);
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`)).toBeVisible();
    await expect(pageManager.searchStatisticsHeader.Elements.SearchSnippets.locator(`"${uniquePrefix}"`)).toBeVisible();
  });
});
