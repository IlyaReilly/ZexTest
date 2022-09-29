import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';

test.describe('Calendars tests. Appointment in attendee calendar.', async () => {
  let dateTimePrefix;
  let appointmentTitle;
  let appointmentBody;


  test.beforeAll(async ({apiManager}) => {
    const allAppionmentsIds = await apiManager.calendarAPI.GetAllAppointments(BaseTest.userForLogin.login);
    await Promise.all(allAppionmentsIds.map(async (id) => {
      return await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    }));
  });

  test.beforeEach(async ({apiManager}) => {
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    appointmentTitle = dateTimePrefix + ' Autotest Appointment Title';
    appointmentBody = dateTimePrefix + ' Autotest Appointment Body';
    await apiManager.calendarAPI.CreateAppointmentRequest(appointmentTitle, BaseTest.userForLogin.login, BaseTest.secondUser.login, appointmentBody);
  });

  test.afterEach(async ({page}) => {
    await page.close();
  });

  test('Create new appointment. Attendee see appointment in own calendar.', async ({browser}) => {
    test.slow();
    const secondPageManager = await BaseTest.ApiRelogin(browser);
    await secondPageManager.sideMenu.OpenMenuTab(secondPageManager.sideMenu.SideMenuTabs.Calendar);
    await expect(secondPageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).toHaveCount(1);
  });

  test('Create new appointment. Attendee see appointment with need action icon.', async ({browser}) => {
    test.slow();
    const secondPageManager = await BaseTest.ApiRelogin(browser);
    await secondPageManager.sideMenu.OpenMenuTab(secondPageManager.sideMenu.SideMenuTabs.Calendar);
    const appointmentElement = await secondPageManager.calendar.GetAppointmentWithTitle(appointmentTitle);
    await expect(appointmentElement.locator(secondPageManager.calendar.Selectors.NeedActionsIconSelector)).toHaveCount(1);
  });
});
