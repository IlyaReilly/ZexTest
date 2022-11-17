import {expect} from '@playwright/test';
import {test, BaseTest} from '../../UITests/BaseTest';

test.describe('Edit Calendars Properties', async () => {
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
  });

  async function CreateCalendarAndOpenEditProperties({pageManager, apiManager}) {
    await apiManager.createCalendarAPI.CreateCalendarRequest(calendarName, BaseTest.userForLogin.login);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await pageManager.sideSecondaryCalendarMenu.OpenCalendarContextMenuOption.EditCalendarProperties(calendarName);
  };

  test('TC315. Edit calendar color. Change to red and validate rgb colors.', async ({pageManager, apiManager}) => {
    const rgbCalendarColor = 'rgb(239, 83, 80)';
    await CreateCalendarAndOpenEditProperties({pageManager, apiManager});
    await pageManager.editCalendarPropertyModal.SelectCalendarColor('red');
    await pageManager.editCalendarPropertyModal.Buttons.Ok.click();
    const elementColor = await pageManager.sideSecondaryCalendarMenu.GetCalendarColorByName(calendarName);
    await expect(elementColor, 'Calendar color should be changed to red').toEqual(rgbCalendarColor);
  });

  test('TC317. Edit calendar name. New name should be applyed', async ({pageManager, apiManager}) => {
    await CreateCalendarAndOpenEditProperties({pageManager, apiManager});
    await pageManager.editCalendarPropertyModal.ChangeCalendarName(calendarNewName);
    await pageManager.editCalendarPropertyModal.Buttons.Ok.click();
    await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`"${calendarNewName}"`),
      `Calendar should change name to ${calendarNewName}`).toBeVisible();
  });
});
