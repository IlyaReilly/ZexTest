import {expect} from '@playwright/test';
import {test, BaseTest} from '../BaseTest';

test.describe('New calendar tests', async () => {
  let dateTimePrefix;
  let calendarName;

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
  });

  test.afterEach(async ({page, apiManager}) => {
    const calendarFolderId = await apiManager.calendarAPI.GetCalendarFolderIdByName(BaseTest.userForLogin.login, calendarName);
    await apiManager.deleteCalendarAPI.DeleteCalendarFolderRequest(calendarFolderId, BaseTest.userForLogin.login);
    await page.close();
  });

  test('Create new Calendar. New calendar should be present in the secondary menu list', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await pageManager.sideSecondaryCalendarMenu.OpenCalendarContextMenuOption.NewCalendar();
    await pageManager.newCalendarModal.TextBoxes.CalendarName.fill(calendarName);
    await pageManager.newCalendarModal.Buttons.Create.click();
    await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`"${calendarName}"`), 'New custom calendar should be visible on the side secondary menu').toBeVisible();
  });
});

