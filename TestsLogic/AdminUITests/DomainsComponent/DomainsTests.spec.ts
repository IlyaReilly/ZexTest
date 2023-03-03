import {test, BaseTest} from '../../BaseTest';
import {expect} from '@playwright/test';

test.describe('Admin. Domains tests.', async () => {
  test.beforeEach(async ({adminPageManager}) => {
    BaseTest.setAdminSuite.domains();
    await adminPageManager.adminSideMenu.OpenMenuTab(adminPageManager.adminSideMenu.SideMenuTabs.Domains);
  });

  test.afterEach(async ({adminApiManager, adminPage}) => {
    await adminApiManager.resetAPI.ResetDomainTheme();
    await adminPage.close();
  });

  test('ATC301. Open Domains Tab. All lists should be visible. @smoke', async ({adminPageManager}) => {
    BaseTest.setSuite.smoke();
    await expect(adminPageManager.domainsSideMenu.List.Global.Header, 'Global list header should be visible').toBeVisible();
    await expect(adminPageManager.domainsSideMenu.Textboxes.TypeHereADomain, 'Domain textbox should be visible').toBeVisible();
    await expect(adminPageManager.domainsSideMenu.List.Details.Header, 'Details list header should be visible').toBeVisible();
    await expect(adminPageManager.domainsSideMenu.List.Manage.Header, 'Manage list header should be visible').toBeVisible();
  });

  test('ATC302. Enable a domain dark mode. Dark mode should be visible', async ({adminPageManager, page}) => {
    await SetDomainDarkMode({adminPageManager, page}, adminPageManager.domainsDetailsTheme.SetDarkModeOption.Enabled);
    await expect(page.locator('[data-darkreader-mode]'), 'Dark mode should be visible').toBeVisible();
    await page.close();
  });

  test('ATC303. Disable a domain dark mode. Dark mode should not be visible', async ({adminPageManager, page}) => {
    await SetDomainDarkMode({adminPageManager, page}, adminPageManager.domainsDetailsTheme.SetDarkModeOption.Disabled);
    await expect(page.locator('[data-darkreader-mode]'), 'Dark mode should not be visible').not.toBeVisible();
    await page.close();
  });

  test('ATC311. Click on Show Domains Button. Domains list dropdown should be visible', async ({adminPageManager}) => {
    await adminPageManager.domainsSideMenu.Buttons.ShowDomains.click();
    await expect(adminPageManager.domainsSideMenu.Elements.DomainInDropdown, 'Domains list dropdown should be visible').toBeVisible();
  });

  async function SetDomainDarkMode({adminPageManager, page}, setDarkModeOption) {
    await adminPageManager.domainsSideMenu.SelectDomain(BaseTest.domain);
    await adminPageManager.domainsSideMenu.List.Details.Theme.click();
    await setDarkModeOption();
    await page.reload();
  };
});
