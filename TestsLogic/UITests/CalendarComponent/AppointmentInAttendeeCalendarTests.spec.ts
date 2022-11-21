import {expect} from '@playwright/test';
import {test, BaseTest} from '../../UITests/BaseTest';


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

  test.beforeEach(async ({apiManager, secondPageManager}) => {
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    appointmentTitle = dateTimePrefix + ' Autotest Appointment Title';
    appointmentBody = dateTimePrefix + ' Autotest Appointment Body';
    await apiManager.createCalendarAPI.CreateAppointmentRequest(appointmentTitle, BaseTest.userForLogin.login, BaseTest.secondUser.login, appointmentBody);
    await secondPageManager.sideMenu.OpenMenuTab(secondPageManager.sideMenu.SideMenuTabs.Calendar);
  });

  test.afterEach(async ({page}) => {
    await page.close();
  });

  test('TC303. Create new appointment. Attendee see appointment in own calendar.', async ({secondPageManager}) => {
    BaseTest.doubleTimeout();
    await expect(secondPageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).toHaveCount(1);
  });

  test('TC316. Create new appointment. Attendee see appointment with need action icon.', async ({secondPageManager}) => {
    BaseTest.doubleTimeout();
    await secondPageManager.page.waitForLoadState();
    await expect(secondPageManager.calendar.Selectors.NeedActionsIconSelector.locator('nth=0')).toBeVisible();
  });
});