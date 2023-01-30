import {test} from '../../BaseTest';
import {expect} from '@playwright/test';

// Only architecture for admin tests
test.describe('Admin. Dashboard tests.', async () => {
  test.afterEach(async ({page}) => {
    await page.close();
  });

  test('ATC201. Open Dashboard Tab. Dashboard path should be visible', async ({adminPageManager}) => {
    await adminPageManager.adminSideMenu.OpenMenuTab(adminPageManager.adminSideMenu.SideMenuTabs.Dashboard);
    await expect(adminPageManager.adminHeaderMenu.Containers.PathContainer).toHaveText('Home');
  });
});
