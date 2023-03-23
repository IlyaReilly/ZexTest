import {test, BaseTest} from '../../BaseTest';
import {expect} from '@playwright/test';
import {PageManager} from '../../../ApplicationLogic/Application/ApplicationUILogic/Pages/PageManager';
import FilePath from '../../../TestData/Files/FilePath.json';

test.describe('Admin. Domains Details tests.', async () => {
  let text;

  test.beforeEach(async ({adminPageManager, adminApiManager}) => {
    BaseTest.setAdminSuite.domains();
    text = BaseTest.dateTimePrefix() + ' Autotest Text';
    await adminApiManager.resetAPI.ResetDomainTheme();
    await adminPageManager.adminSideMenu.OpenMenuTab(adminPageManager.adminSideMenu.SideMenuTabs.Domains);
  });

  test.afterEach(async ({adminApiManager, adminPage}) => {
    await adminApiManager.resetAPI.ResetDomainTheme();
    await adminPage.close();
  });

  test('ATC302. Details: Enable a domain dark mode. Dark mode should be visible. @serial', async ({adminPageManager, page}) => {
    await SelectDomainAndOpenThemeTab({adminPageManager});
    await adminPageManager.domainsDetailsTheme.SetDarkModeOption.Enabled();
    await page.reload();
    await expect(page.locator('[data-darkreader-mode]'), 'Dark mode should be visible').toBeVisible();
    await page.close();
  });

  test('ATC303. Details: Disable a domain dark mode. Dark mode should not be visible. @serial', async ({adminPageManager, page}) => {
    await SelectDomainAndOpenThemeTab({adminPageManager});
    await adminPageManager.domainsDetailsTheme.SetDarkModeOption.Disabled();
    await page.reload();
    await expect(page.locator('[data-darkreader-mode]'), 'Dark mode should not be visible').not.toBeVisible();
    await page.close();
  });

  test('ATC313. Details: Add browser tab title for end-user. New title should be visible on web browser tab. @serial', async ({adminPageManager, page, pageManager}) => {
    await SetDomainTheme({adminPageManager}, adminPageManager.domainsDetailsTheme.Textboxes.Title);
    await page.reload();
    await pageManager.headerMenu.Logos.MainLogo.waitFor();
    expect(await page.title(), 'New title should be visible on web browser tab').toBe(text);
    await page.close();
  });

  test('ATC314. Details: Add copyright information text for end-user. New text should be visible at the bottom of login form. @serial', async ({adminPageManager, browser}) => {
    await SetDomainTheme({adminPageManager}, adminPageManager.domainsDetailsTheme.Textboxes.CopyrightsInformation);
    const pageManager = await OpenEndUserLoginPage({browser});
    await expect(pageManager.loginPage.Containers.FormContainer.locator(`"${text}"`), 'New logo should be visible').toBeVisible();
    await pageManager.page.close();
  });

  test('ATC315. Details: Add light mode logo for end-user Login Page. New logo should be visible. @serial', async ({adminPageManager, browser}) => {
    await SetDomainTheme({adminPageManager}, adminPageManager.domainsDetailsTheme.Textboxes.LightLoginLogo, FilePath.AdminLogo);
    const pageManager = await OpenEndUserLoginPage({browser});
    await expect(pageManager.loginPage.Containers.FormContainer.locator(`[src="${FilePath.AdminLogo}"]`), 'New logo should be visible').toBeVisible();
    await pageManager.page.close();
  });

  test('ATC316. Details: Add light mode logo for end-user WebApp. New logo should be visible. @serial', async ({adminPageManager, page, pageManager}) => {
    await SetDomainTheme({adminPageManager}, adminPageManager.domainsDetailsTheme.Textboxes.LightWebAppLogo, FilePath.AdminLogo);
    await page.reload();
    await expect(pageManager.headerMenu.Containers.MainContainer.locator(`[src="${FilePath.AdminLogo}"]`), 'New logo should be visible').toBeVisible();
    await page.close();
  });

  test('ATC317. Details: Add dark mode logo for end-user Login Page. New logo should be visible. @serial', async ({adminPageManager, browser}) => {
    await SetDomainTheme({adminPageManager}, adminPageManager.domainsDetailsTheme.Textboxes.DarkLoginLogo, FilePath.AdminLogo);
    const pageManager = await OpenEndUserLoginPage({browser});
    await expect(pageManager.loginPage.Containers.FormContainer.locator(`[src="${FilePath.AdminLogo}"]`), 'New logo should be visible').toBeVisible();
    await pageManager.page.close();
  });

  test('ATC318. Details: Add dark mode logo for end-user WebApp. New logo should be visible. @serial', async ({adminPageManager, page, pageManager}) => {
    await SetDomainTheme({adminPageManager}, adminPageManager.domainsDetailsTheme.Textboxes.DarkWebAppLogo, FilePath.AdminLogo);
    await page.reload();
    await expect(pageManager.headerMenu.Containers.MainContainer.locator(`[src="${FilePath.AdminLogo}"]`), 'New logo should be visible').toBeVisible();
    await page.close();
  });

  test('ATC319. Details: Add light mode background for end-user Login Page. New background should be visible. @serial', async ({adminPageManager, browser}) => {
    await SetDomainTheme({adminPageManager}, adminPageManager.domainsDetailsTheme.Textboxes.LightLoginBackground, FilePath.AdminBackground);
    const pageManager = await OpenEndUserLoginPage({browser});
    expect(await pageManager.loginPage.GetBackgroundImagePath(), 'New background should be visible').toBe(FilePath.AdminBackground);
    await pageManager.page.close();
  });

  test('ATC320. Details: Add dark mode background for end-user Login Page. New background should be visible. @serial', async ({adminPageManager, browser}) => {
    await SetDomainTheme({adminPageManager}, adminPageManager.domainsDetailsTheme.Textboxes.DarkLoginBackground, FilePath.AdminBackground);
    const pageManager = await OpenEndUserLoginPage({browser});
    expect(await pageManager.loginPage.GetBackgroundImagePath(), 'New background should be visible').toBe(FilePath.AdminBackground);
    await pageManager.page.close();
  });

  async function SelectDomainAndOpenThemeTab({adminPageManager}) {
    await adminPageManager.domainsSideMenu.SelectDomain(BaseTest.domain);
    await adminPageManager.domainsSideMenu.List.Details.Theme.click();
  };

  async function SetDomainTheme({adminPageManager}, textbox, value = text) {
    await SelectDomainAndOpenThemeTab({adminPageManager});
    await adminPageManager.domainsSideMenu.List.Details.Theme.click();
    await adminPageManager.domainsDetailsTheme.Tabs.EndUser.click();
    await textbox.fill(value);
    if (textbox === adminPageManager.domainsDetailsTheme.Textboxes.DarkWebAppLogo ||
        textbox === adminPageManager.domainsDetailsTheme.Textboxes.DarkLoginLogo ||
        textbox === adminPageManager.domainsDetailsTheme.Textboxes.DarkLoginBackground) {
      await adminPageManager.domainsDetailsTheme.SetDarkModeOption.Enabled();
    } else {
      await adminPageManager.domainsDetailsTheme.Buttons.Save.click();
      await adminPageManager.baseAdminPage.WaitForNotificationHiding();
    };
  };

  async function OpenEndUserLoginPage({browser}) {
    const page = await browser.newPage();
    await page.goto('/');
    return new PageManager(page);
  };
});
