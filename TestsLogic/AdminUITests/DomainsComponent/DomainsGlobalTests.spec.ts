import {test, BaseTest} from '../../BaseTest';
import {expect} from '@playwright/test';
import {PageManager} from '../../../ApplicationLogic/Application/ApplicationUILogic/Pages/PageManager';

test.describe('Admin. Domains Global tests.', async () => {
  let text;
  const logoUrl = 'https://qa_public1.demo.zextras.io:6071/static/login/assets/04dbcb1abd77891a68c7ceefaf77b902.svg';

  test.beforeEach(async ({adminPageManager, adminApiManager}) => {
    BaseTest.setAdminSuite.domains();
    text = BaseTest.dateTimePrefix() + ' Autotest Text';
    await resetTheme({adminApiManager});
    await adminPageManager.adminSideMenu.OpenMenuTab(adminPageManager.adminSideMenu.SideMenuTabs.Domains);
  });

  test.afterEach(async ({adminApiManager, adminPage}) => {
    await resetTheme({adminApiManager});
    await adminPage.close();
  });

  async function resetTheme({adminApiManager}) {
    await adminApiManager.resetAPI.ResetGlobalTheme();
    await adminApiManager.resetAPI.ResetDomainTheme();
  };

  test('ATC304. Add browser tab title for end-user. New title should be visible on web browser tab', async ({adminPageManager, page, pageManager}) => {
    await SetGlobalTheme({adminPageManager}, adminPageManager.domainsGlobalTheme.Textboxes.Title);
    await page.reload();
    await pageManager.headerMenu.Logos.MainLogo.waitFor();
    expect(await page.title(), 'New title should be visible on web browser tab').toBe(text);
    await page.close();
  });

  test('ATC305. Add copyright information text for end-user. New text should be visible at the bottom of login form', async ({adminPageManager, browser}) => {
    await SetGlobalTheme({adminPageManager}, adminPageManager.domainsGlobalTheme.Textboxes.CopyrightsInformation);
    await OpenEndUserLoginPageAndExpect({browser}, `"${text}"`);
  });

  test('ATC306. Add light mode logo for end-user Login Page. New logo should be visible', async ({adminPageManager, browser}) => {
    await SetGlobalTheme({adminPageManager}, adminPageManager.domainsGlobalTheme.Textboxes.LightLoginLogo, logoUrl);
    await OpenEndUserLoginPageAndExpect({browser}, `[src="${logoUrl}"]`);
  });

  test('ATC307. Add light mode logo for end-user WebApp. New logo should be visible', async ({adminPageManager, page, pageManager}) => {
    await SetGlobalTheme({adminPageManager}, adminPageManager.domainsGlobalTheme.Textboxes.LightWebAppLogo, logoUrl);
    await page.reload();
    await expect(pageManager.headerMenu.Containers.MainContainer.locator(`[src="${logoUrl}"]`), 'New logo should be visible').toBeVisible();
    await page.close();
  });

  test('ATC308. Add dark mode logo for end-user Login Page. New logo should be visible', async ({adminPageManager, browser}) => {
    await SetGlobalThemeAndEnableDomainDarkMode({adminPageManager}, adminPageManager.domainsGlobalTheme.Textboxes.DarkLoginLogo, logoUrl);
    await OpenEndUserLoginPageAndExpect({browser}, `[src="${logoUrl}"]`);
  });

  test('ATC309. Add dark mode logo for end-user WebApp. New logo should be visible', async ({adminPageManager, page, pageManager}) => {
    await SetGlobalThemeAndEnableDomainDarkMode({adminPageManager}, adminPageManager.domainsGlobalTheme.Textboxes.DarkWebAppLogo, logoUrl);
    await page.reload();
    await expect(pageManager.headerMenu.Containers.MainContainer.locator(`[src="${logoUrl}"]`), 'New logo should be visible').toBeVisible();
    await page.close();
  });

  test('ATC311. Click on Show Domains Button. Domains list dropdown should be visible', async ({adminPageManager}) => {
    await adminPageManager.domainsSideMenu.Buttons.ShowDomains.click();
    await expect(adminPageManager.domainsSideMenu.Elements.DomainInDropdown, 'Domains list dropdown should be visible').toBeVisible();
  });

  async function SetDomainDarkMode({adminPageManager}, setDarkModeOption) {
    await adminPageManager.domainsSideMenu.SelectDomain(BaseTest.domain);
    await adminPageManager.domainsSideMenu.List.Details.Theme.click();
    await setDarkModeOption();
  };

  async function SetGlobalTheme({adminPageManager}, textbox, value = text) {
    await adminPageManager.domainsSideMenu.List.Global.Theme.click();
    await adminPageManager.domainsGlobalTheme.Tabs.EndUser.click();
    await textbox.fill(value);
    await adminPageManager.domainsGlobalTheme.Buttons.Save.click();
    await adminPageManager.baseAdminPage.WaitForNotificationHiding();
  };

  async function OpenEndUserLoginPageAndExpect({browser}, selector) {
    const page = await browser.newPage();
    await page.goto('/');
    const pageManager = new PageManager(page);
    await expect(pageManager.loginPage.Containers.MainContainer.locator(selector), 'New setting should be visible').toBeVisible();
    await page.close();
  };

  async function SetGlobalThemeAndEnableDomainDarkMode({adminPageManager}, textbox, value = text) {
    await SetGlobalTheme({adminPageManager}, textbox, value);
    await SetDomainDarkMode({adminPageManager}, adminPageManager.domainsDetailsTheme.SetDarkModeOption.Enabled);
  };
});
