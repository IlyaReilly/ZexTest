import {test} from '../../BaseTest';
import {expect} from '@playwright/test';

test.describe('Admin. Dashboard tests.', async () => {
  test.beforeEach(async ({adminPageManager}) => {
    await adminPageManager.adminSideMenu.OpenMenuTab(adminPageManager.adminSideMenu.SideMenuTabs.Dashboard);
  });

  test.afterEach(async ({adminPage}) => {
    await adminPage.close();
  });

  test('ATC201. Open Dashboard Tab. All fields should be visible', async ({adminPageManager}) => {
    await expect(adminPageManager.dashboard.Fields.WelcomeMessage).toBeVisible();
    await expect(adminPageManager.dashboard.Fields.QuickAccess).toBeVisible();
    await expect(adminPageManager.dashboard.Fields.YourNotifications).toBeVisible();
    await expect(adminPageManager.dashboard.Fields.ServersList).toBeVisible();
  });

  test('ATC202. Open Accounts list via Quick Access. Account list path should be visible', async ({adminPageManager}) => {
    await adminPageManager.dashboard.Buttons.OpenAccounts.click();
    await expect(adminPageManager.adminHeaderMenu.Containers.PathContainer).toHaveText('Home/Domains/Accounts');
  });

  test('ATC203. Open Mailing list via Quick Access. Mailing list path should be visible', async ({adminPageManager}) => {
    await adminPageManager.dashboard.Buttons.OpenMailingList.click();
    await expect(adminPageManager.adminHeaderMenu.Containers.PathContainer).toHaveText('Home/Domains/Mailing List');
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
