import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';

test.describe('Calendars tests', async () => {
  let dateTimePrefix;
  let appointmentTitle;
  let appointmentBody;

  test.beforeAll(async ({page, apiManager}) => {
    const allAppionmentsIds = await apiManager.calendarAPI.GetAllAppointments(BaseTest.userForLogin.login);
    await Promise.all(allAppionmentsIds.map(async (id) => {
      return await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    }));
  });

  test.beforeEach(async () => {
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    appointmentTitle = dateTimePrefix + ' Autotest Appointment Title';
    appointmentBody = dateTimePrefix + ' Autotest Appointment Body';
  });

  test.afterEach(async ({page, apiManager}) => {
    const id = await apiManager.calendarAPI.CalendarSearchQuery(appointmentTitle, BaseTest.userForLogin.login);
    await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    await page.close();
  });

  test('Share Calendar. Calendar access share window has ICS OUTLOOK VIEW urls.', async ({page, pageManager, apiManager}) => {
    await apiManager.calendarAPI.CreateAppointmentRequest(appointmentTitle, BaseTest.userForLogin.login, '3', appointmentBody);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await pageManager.sideSecondaryCalendarMenu.ShareCalendar();
    await pageManager.shareCalendarModal.TextBoxes.Recipients.type(BaseTest.userForLogin.login);
    await pageManager.shareCalendarModal.TextBoxes.Recipients.press('Enter');
    await pageManager.shareCalendarModal.Buttons.ShareCalendar.click();
    await expect(pageManager.calendarAccessShareModal.Buttons.IcsUrl, 'Calendar access share window should contain ICS URL button').toBeVisible();
    await expect(pageManager.calendarAccessShareModal.Buttons.OutlookUrl, 'Calendar access share window should contain OUTLOOK URL button').toBeVisible();
    await expect(pageManager.calendarAccessShareModal.Buttons.ViewUrl, 'Calendar access share window should contain VIEW URL button').toBeVisible();
  });
});
