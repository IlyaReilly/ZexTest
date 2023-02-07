import {expect} from '@playwright/test';
import {test, BaseTest} from '../../BaseTest';


test.describe('Calendars tests. Appointment in attendee calendar.', async () => {
  let dateTimePrefix;
  let appointmentTitle;
  let appointmentBody;

  test.beforeEach(async ({apiManager, secondPageManager}) => {
    BaseTest.setFeatureSuite.calendars();
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    appointmentTitle = dateTimePrefix + ' Autotest Appointment Title';
    appointmentBody = dateTimePrefix + ' Autotest Appointment Body';
    await apiManager.calendarAPI.DeleteAppointmentsViaAPI({apiManager});
    await apiManager.createCalendarAPI.CreateAppointmentRequest(appointmentTitle, BaseTest.userForLogin.login, BaseTest.secondUser.login, appointmentBody);
    await secondPageManager.sideMenu.OpenMenuTab(secondPageManager.sideMenu.SideMenuTabs.Calendar);
  });

  test.afterEach(async ({apiManager, page}) => {
    await apiManager.calendarAPI.DeleteAppointmentsViaAPI({apiManager});
    await page.close();
  });

  test('TC303. Create new appointment. Attendee see appointment in own calendar. @cricitalPath', async ({secondPageManager}) => {
    BaseTest.setSuite.criticalPath();
    BaseTest.doubleTimeout();
    await expect(secondPageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).toHaveCount(1);
  });

  test('TC316. Create new appointment. Attendee see appointment with need action icon. @cricitalPath', async ({secondPageManager}) => {
    BaseTest.setSuite.criticalPath();
    BaseTest.doubleTimeout();
    await secondPageManager.page.waitForLoadState();
    await expect(secondPageManager.calendar.Selectors.NeedActionsIconSelector.locator('nth=0')).toBeVisible();
  });
});
