import {test} from '../../BaseTest';
import {expect} from '@playwright/test';

// Only architecture for admin tests
test.describe('Admin. Dashboard tests.', async () => {
  test.afterEach(async ({adminPage}) => {
    await adminPage.close();
  });

  test('ATC201. Open Dashboard Tab. Dashboard path should be visible', async ({adminPageManager}) => {
    await adminPageManager.adminSideMenu.OpenMenuTab(adminPageManager.adminSideMenu.SideMenuTabs.Dashboard);
    await expect(adminPageManager.adminHeaderMenu.Containers.PathContainer).toHaveText('Home');
  });

  test('ATC204. Open notifications using the "GO TO NOTIFICATION" button. Notifications tab should be visible', async ({adminPageManager}) => {
    await adminPageManager.adminSideMenu.OpenMenuTab(adminPageManager.adminSideMenu.SideMenuTabs.Dashboard);
    await adminPageManager.dashboard.Buttons.GoToNotification.click();
    await expect(adminPageManager.notifications.Fields.NotificationList).toBeVisible();
  });

  test('ATC205. Open servers list using the "GO TO MAILSTORES SERVERS LIST" button. Servers List tab should be visible', async ({adminPageManager}) => {
    await adminPageManager.adminSideMenu.OpenMenuTab(adminPageManager.adminSideMenu.SideMenuTabs.Dashboard);
    await adminPageManager.dashboard.Buttons.GoToMailstoresServersList.click();
    await expect(adminPageManager.serversList.Fields.ServersList.first()).toBeVisible();
  });
});
