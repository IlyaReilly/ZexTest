import {test, BaseTest} from '../../BaseTest';
import {expect} from '@playwright/test';
import {PageManager} from '../../../ApplicationLogic/Application/ApplicationUILogic/Pages/PageManager';
import FilePath from '../../../TestData/Files/FilePath.json';

test.describe('Admin. Domains Global tests.', async () => {
  let text;

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

  test('ATC304. Global: Add browser tab title for end-user. New title should be visible on web browser tab', async ({adminPageManager, page, pageManager}) => {
    await SetGlobalTheme({adminPageManager}, adminPageManager.domainsGlobalTheme.Textboxes.Title);
    await page.reload();
    await pageManager.headerMenu.Logos.MainLogo.waitFor();
    expect(await page.title(), 'New title should be visible on web browser tab').toBe(text);
    await page.close();
  });

  test('ATC305. Global: Add copyright information text for end-user. New text should be visible at the bottom of login form', async ({adminPageManager, browser}) => {
    await SetGlobalTheme({adminPageManager}, adminPageManager.domainsGlobalTheme.Textboxes.CopyrightsInformation);
    const pageManager = await OpenEndUserLoginPage({browser});
    await expect(pageManager.loginPage.Containers.FormContainer.locator(`"${text}"`), 'New logo should be visible').toBeVisible();
    await pageManager.page.close();
  });

  test('ATC306. Global: Add light mode logo for end-user Login Page. New logo should be visible', async ({adminPageManager, browser}) => {
    await SetGlobalTheme({adminPageManager}, adminPageManager.domainsGlobalTheme.Textboxes.LightLoginLogo, FilePath.AdminLogo);
    const pageManager = await OpenEndUserLoginPage({browser});
    await expect(pageManager.loginPage.Containers.FormContainer.locator(`[src="${FilePath.AdminLogo}"]`), 'New logo should be visible').toBeVisible();
    await pageManager.page.close();
  });

  test('ATC307. Global: Add light mode logo for end-user WebApp. New logo should be visible', async ({adminPageManager, page, pageManager}) => {
    await SetGlobalTheme({adminPageManager}, adminPageManager.domainsGlobalTheme.Textboxes.LightWebAppLogo, FilePath.AdminLogo);
    await page.reload();
    await expect(pageManager.headerMenu.Containers.MainContainer.locator(`[src="${FilePath.AdminLogo}"]`), 'New logo should be visible').toBeVisible();
    await page.close();
  });

  test('ATC308. Global: Add dark mode logo for end-user Login Page. New logo should be visible', async ({adminPageManager, browser}) => {
    await SetGlobalThemeAndEnableDomainDarkMode({adminPageManager}, adminPageManager.domainsGlobalTheme.Textboxes.DarkLoginLogo, FilePath.AdminLogo);
    const pageManager = await OpenEndUserLoginPage({browser});
    await expect(pageManager.loginPage.Containers.FormContainer.locator(`[src="${FilePath.AdminLogo}"]`), 'New logo should be visible').toBeVisible();
    await pageManager.page.close();
  });

  test('ATC309. Global: Add dark mode logo for end-user WebApp. New logo should be visible', async ({adminPageManager, page, pageManager}) => {
    await SetGlobalThemeAndEnableDomainDarkMode({adminPageManager}, adminPageManager.domainsGlobalTheme.Textboxes.DarkWebAppLogo, FilePath.AdminLogo);
    await page.reload();
    await expect(pageManager.headerMenu.Containers.MainContainer.locator(`[src="${FilePath.AdminLogo}"]`), 'New logo should be visible').toBeVisible();
    await page.close();
  });

  test('ATC310. Global: Add light mode background for end-user Login Page. New background should be visible', async ({adminPageManager, browser}) => {
    await SetGlobalTheme({adminPageManager}, adminPageManager.domainsGlobalTheme.Textboxes.LightLoginBackground, FilePath.AdminBackground);
    const pageManager = await OpenEndUserLoginPage({browser});
    expect(await pageManager.loginPage.GetBackgroundImagePath(), 'New background should be visible').toBe(FilePath.AdminBackground);
    await pageManager.page.close();
  });

  test('ATC311. Global: Add dark mode background for end-user Login Page. New background should be visible', async ({adminPageManager, browser}) => {
    await SetGlobalThemeAndEnableDomainDarkMode({adminPageManager}, adminPageManager.domainsGlobalTheme.Textboxes.DarkLoginBackground, FilePath.AdminBackground);
    const pageManager = await OpenEndUserLoginPage({browser});
    expect(await pageManager.loginPage.GetBackgroundImagePath(), 'New background should be visible').toBe(FilePath.AdminBackground);
    await pageManager.page.close();
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

  async function OpenEndUserLoginPage({browser}) {
    const page = await browser.newPage();
    await page.goto('/');
    return new PageManager(page);
  };

  async function SetGlobalThemeAndEnableDomainDarkMode({adminPageManager}, textbox, value = text) {
    await SetGlobalTheme({adminPageManager}, textbox, value);
    await SetDomainDarkMode({adminPageManager}, adminPageManager.domainsDetailsTheme.SetDarkModeOption.Enabled);
  };
});
