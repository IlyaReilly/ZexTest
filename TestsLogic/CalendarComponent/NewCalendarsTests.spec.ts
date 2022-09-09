import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';

test.describe('New calendar tests', async () => {
  let dateTimePrefix;
  let appointmentTitle;
  let appointmentBody;

  test.beforeAll(async ({apiManager}) => {
    const allAppionmentsIds = await apiManager.calendarAPI.GetAllAppointments(BaseTest.userForLogin.login);
    const allCall = await apiManager.calendarAPI.CalendarGetAllCustomFolders(BaseTest.userForLogin.login);
    await Promise.all(allAppionmentsIds.map(async (id) => {
      return await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    }));
  });

  test.beforeEach(async ({apiManager}) => {
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    appointmentTitle = dateTimePrefix + ' Autotest Appointment Title';
    appointmentBody = dateTimePrefix + ' Autotest Appointment Body';
    await apiManager.calendarAPI.RevokeSharingOfCalendar(BaseTest.userForLogin.login);
  });

  test.afterEach(async ({page, apiManager}) => {
    const id = await apiManager.calendarAPI.CalendarSearchQuery(appointmentTitle, BaseTest.userForLogin.login);
    await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    await apiManager.calendarAPI.RevokeSharingOfCalendar(BaseTest.userForLogin.login);
    await page.close();
  });

  // Doesn't have methods for clear test data. Particulary for search and receive and id of new calendar
  test.skip('Create new Calendar. New calendar should be present in the secondary menu list', async ({page, pageManager, apiManager}) => {
    await apiManager.calendarAPI.CreateAppointmentRequest(appointmentTitle, BaseTest.userForLogin.login, '3', appointmentBody);
    await apiManager.calendarAPI.ShareCalendar(BaseTest.userForLogin.login, BaseTest.secondUser.login);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await pageManager.sideSecondaryCalendarMenu.OpenCalendarContextMenuOption.NewCalendar();
    const calendarName = dateTimePrefix + ' Calendar';
    await pageManager.newCalendarModal.TextBoxes.CalendarName.fill(calendarName);
    await pageManager.newCalendarModal.Buttons.Create.click();
    await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`"${calendarName}"`), 'New custom calendar should be visible on the side secondary menu').toBeVisible();
  });
});

