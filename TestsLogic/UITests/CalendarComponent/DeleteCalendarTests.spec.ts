import {expect} from '@playwright/test';
import {test, BaseTest} from '../../UITests/BaseTest';

test.describe('Delete Calendar', async () => {
  let dateTimePrefix;
  let calendarName;
  let calendarId;

  test.beforeAll(async ({apiManager}) => {
    const allCalendarFolders = await apiManager.calendarAPI.GetCalendarFolders(BaseTest.userForLogin.login);
    const allCustomFolders = allCalendarFolders.filter((folder) => folder.deletable);
    await Promise.all(allCustomFolders.map(async (folder) => {
      return await apiManager.deleteCalendarAPI.DeleteCalendarFolderRequest(folder.id, BaseTest.userForLogin.login);
    }));
  });

  test.beforeEach(async ({apiManager, pageManager, page}) => {
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    calendarName = dateTimePrefix + ' Calendar';
    await apiManager.deleteCalendarAPI.EmptyTrashRequest(BaseTest.userForLogin.login);
    calendarId = await apiManager.createCalendarAPI.CreateCalendarRequest(calendarName, BaseTest.userForLogin.login);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await page.waitForLoadState('domcontentloaded');
  });

  test.afterEach(async ({page, apiManager}) => {
    await apiManager.deleteCalendarAPI.EmptyTrashRequest(BaseTest.userForLogin.login);
    await page.close();
  });

  test('TC318. Delete calendar. Calendar should be moved to Trash', async ({page, pageManager, apiManager}) => {
    await pageManager.sideSecondaryCalendarMenu.OpenCalendarContextMenuOption.DeleteCalendar(calendarName);
    await pageManager.deleteCalendarModal.Buttons.Delete.click();
    await pageManager.sideSecondaryCalendarMenu.OpenTrashChevron();
    await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`:text("${calendarName}"):below(:text("Trash"))`),
      `Calendar ${calendarName} should be moved to trash`).toBeVisible();
  });

  test('TC319. Delete calendar permanently. Calendar should be disappear from Trash', async ({pageManager, apiManager}) => {
    await apiManager.deleteCalendarAPI.MoveToTrashCalendarFolderRequest(calendarId, BaseTest.userForLogin.login);
    await pageManager.sideSecondaryCalendarMenu.OpenTrashChevron();
    await pageManager.sideSecondaryCalendarMenu.OpenCalendarContextMenuOption.DeleteCalendar(calendarName);
    await pageManager.deleteCalendarModal.Buttons.Delete.click();
    await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`"${calendarName}"`),
      `Calendar ${calendarName} should be delete permanently`).toHaveCount(0);
  });
});
