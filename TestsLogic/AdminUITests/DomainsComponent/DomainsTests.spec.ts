import {test, BaseTest} from '../../BaseTest';
import {expect} from '@playwright/test';

test.describe('Admin. Domains tests.', async () => {
  test.beforeEach(async ({adminPageManager}) => {
    BaseTest.setAdminSuite.domains();
    await adminPageManager.adminSideMenu.OpenMenuTab(adminPageManager.adminSideMenu.SideMenuTabs.Domains);
  });

  test.afterEach(async ({adminPageManager, adminPage}) => {
    if (await adminPage.locator(adminPageManager.baseAdminPage.InheritedFields.ResetButton).isVisible()) {
      await adminPage.locator(adminPageManager.baseAdminPage.InheritedFields.ResetButton).click();
      await adminPageManager.resetModal.Buttons.Yes.click();
    };
    await adminPage.close();
  });

  test('ATC301. Open Domains Tab. All lists should be visible. @smoke', async ({adminPageManager}) => {
    BaseTest.setSuite.smoke();
    await expect(adminPageManager.domainsSideMenu.Elements.Sections.Global).toBeVisible();
    await expect(adminPageManager.domainsSideMenu.Elements.Sections.Domains).toBeVisible();
    await expect(adminPageManager.domainsSideMenu.Elements.Sections.Details).toBeVisible();
    await expect(adminPageManager.domainsSideMenu.Elements.Sections.Manage).toBeVisible();
  });

  test('ATC302. Enable a domain dark mode. Dark mode should be visible', async ({adminPageManager, page}) => {
    await SetDomainDarkMode({adminPageManager, page}, adminPageManager.domainsDetailsTheme.SetDarkModeOption.Enabled);
    await expect(page.locator('[data-darkreader-mode]')).toBeVisible();
    await page.close();
  });

  test('ATC303. Disable a domain dark mode. Dark mode should not be visible', async ({adminPageManager, page}) => {
    await SetDomainDarkMode({adminPageManager, page}, adminPageManager.domainsDetailsTheme.SetDarkModeOption.Disabled);
    await expect(page.locator('[data-darkreader-mode]')).not.toBeVisible();
    await page.close();
  });

  test('ATC311. Click on Show Domains Button. Domains list dropdown should be visible', async ({adminPageManager}) => {
    await adminPageManager.domainsSideMenu.Elements.Domains.Buttons.ShowDomains.click();
    await expect(adminPageManager.domainsSideMenu.Elements.Domains.DomainInDropdown).toBeVisible();
  });

  async function SetDomainDarkMode({adminPageManager, page}, setDarkModeOption) {
    await adminPageManager.domainsSideMenu.SelectDomain(BaseTest.domain);
    await adminPageManager.domainsSideMenu.Elements.Details.Theme.click();
    await setDarkModeOption();
    await page.reload();
  };
});
