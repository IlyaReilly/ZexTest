import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';

test.describe('Edit Calendars Properties', async () => {
  let dateTimePrefix;
  let calendarName;

  test.beforeAll(async ({apiManager}) => {
    const allCalendarFolders = await apiManager.calendarAPI.GetCalendarFolders(BaseTest.userForLogin.login);
    const allCustomFolders = allCalendarFolders.filter((folder) => folder.deletable);
    await Promise.all(allCustomFolders.map(async (folder) => {
      return await apiManager.calendarAPI.DeleteCalendarFolderRequest(folder.id, BaseTest.userForLogin.login);
    }));
  });

  test.beforeEach(async () => {
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    calendarName = dateTimePrefix + ' Calendar';
  });

  test.afterEach(async ({page, apiManager}) => {
    const calendarFolderId = await apiManager.calendarAPI.GetCalendarFolderIdByName(BaseTest.userForLogin.login, calendarName);
    await apiManager.calendarAPI.DeleteCalendarFolderRequest(calendarFolderId, BaseTest.userForLogin.login);
    await page.close();
  });

  test('Edit calendar color. Change to red and validate rgb colors.', async ({pageManager, apiManager}) => {
    const rgbCalendarColor = 'rgb(239, 83, 80)';
    await apiManager.calendarAPI.CreateCalendarRequest(calendarName, BaseTest.userForLogin.login);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await pageManager.sideSecondaryCalendarMenu.OpenCalendarContextMenuOption.EditCalendarProperties(calendarName);
    await pageManager.editCalendarPropertyModal.SelectCalendarColor('red');
    await pageManager.editCalendarPropertyModal.Buttons.Ok.click();
    const elementColor = await pageManager.sideSecondaryCalendarMenu.GetCalendarColorByName(calendarName);
    await expect(elementColor, 'Calendar color should be changed to red').toEqual(rgbCalendarColor);
  });

  test('Edit calendar name. New name should be applyed', async ({pageManager, apiManager}) => {
    const calendarNewName = 'New' + calendarName;
    await apiManager.calendarAPI.CreateCalendarRequest(calendarName, BaseTest.userForLogin.login);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await pageManager.sideSecondaryCalendarMenu.OpenCalendarContextMenuOption.EditCalendarProperties(calendarName);
    await pageManager.editCalendarPropertyModal.ChangeCalendarName(calendarNewName);
    await pageManager.editCalendarPropertyModal.Buttons.Ok.click();
    await expect(pageManager.sideSecondaryCalendarMenu.MainContainer.locator(`"${calendarNewName}"`),
      `Calendar should change name to ${calendarNewName}`).toBeVisible();
  });
});

