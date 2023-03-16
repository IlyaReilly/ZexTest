import {test, BaseTest} from '../../BaseTest';
import {expect} from '@playwright/test';

test.describe('Admin. Domains Details tests.', async () => {
  test.beforeEach(async ({adminPageManager, adminApiManager}) => {
    BaseTest.setAdminSuite.domains();
    await adminApiManager.resetAPI.ResetDomainTheme();
    await adminPageManager.adminSideMenu.OpenMenuTab(adminPageManager.adminSideMenu.SideMenuTabs.Domains);
  });

  test.afterEach(async ({adminApiManager, adminPage}) => {
    await adminApiManager.resetAPI.ResetDomainTheme();
    await adminPage.close();
  });

  test('ATC302. Enable a domain dark mode. Dark mode should be visible', async ({adminPageManager, page}) => {
    await SetDomainDarkMode({adminPageManager}, adminPageManager.domainsDetailsTheme.SetDarkModeOption.Enabled);
    await page.reload();
    await expect(page.locator('[data-darkreader-mode]'), 'Dark mode should be visible').toBeVisible();
    await page.close();
  });

  test('ATC303. Disable a domain dark mode. Dark mode should not be visible', async ({adminPageManager, page}) => {
    await SetDomainDarkMode({adminPageManager}, adminPageManager.domainsDetailsTheme.SetDarkModeOption.Disabled);
    await page.reload();
    await expect(page.locator('[data-darkreader-mode]'), 'Dark mode should not be visible').not.toBeVisible();
    await page.close();
  });

  async function SetDomainDarkMode({adminPageManager}, setDarkModeOption) {
    await adminPageManager.domainsSideMenu.SelectDomain(BaseTest.domain);
    await adminPageManager.domainsSideMenu.List.Details.Theme.click();
    await setDarkModeOption();
  };
});
