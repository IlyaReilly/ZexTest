import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';

test.describe('Delete Calendar', async () => {
  let dateTimePrefix;
  let calendarName;
  let calendarNewName;

  test.beforeAll(async ({apiManager}) => {
    const allCalendarFolders = await apiManager.calendarAPI.GetCalendarFolders(BaseTest.userForLogin.login);
    const allCustomFolders = allCalendarFolders.filter((folder) => folder.deletable);
    await Promise.all(allCustomFolders.map(async (folder) => {
      return await apiManager.deleteCalendarAPI.DeleteCalendarFolderRequest(folder.id, BaseTest.userForLogin.login);
    }));
  });

  test.beforeEach(async () => {
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    calendarName = dateTimePrefix + ' Calendar';
    calendarNewName = 'New' + calendarName;
  });

  test.afterEach(async ({page, apiManager}) => {
    try {
      const calendarFolderId = await apiManager.calendarAPI.GetCalendarFolderIdByName(BaseTest.userForLogin.login, calendarName);
      await apiManager.deleteCalendarAPI.DeleteCalendarFolderRequest(calendarFolderId, BaseTest.userForLogin.login);
    } catch {
      const calendarFolderId = await apiManager.calendarAPI.GetCalendarFolderIdByName(BaseTest.userForLogin.login, calendarNewName);
      await apiManager.deleteCalendarAPI.DeleteCalendarFolderRequest(calendarFolderId, BaseTest.userForLogin.login);
    };
    await page.close();
    // TODO API method for clean up calendar from the trash
  });

  test('Delete calendar. Calendar should be moved to Trash', async ({page, pageManager, apiManager}) => {
    await apiManager.createCalendarAPI.CreateCalendarRequest(calendarName, BaseTest.userForLogin.login);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await pageManager.sideSecondaryCalendarMenu.OpenCalendarContextMenuOption.DeleteCalendar(calendarName);
    await pageManager.deleteCalendarModal.Buttons.Delete.click();
    await pageManager.sideSecondaryCalendarMenu.OpenTrashChevron();
    await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`:text("${calendarName}"):below(:text("Trash"))`),
      `Calendar ${calendarName} should be moved to trash`).toBeVisible();
  });
});
