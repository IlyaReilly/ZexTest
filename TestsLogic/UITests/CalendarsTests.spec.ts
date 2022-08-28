import {expect} from '@playwright/test';
import {test, BaseTest} from './BaseTest';
import {InheritedFields} from '../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

test.describe('Calendars tests', async () => {
  let dateTimePrefix;
  let appointmentTitle;
  let appointmentBody;
  let runtimeAppoinmentId = '';
  let userForLogin;
  let calendarViewTitle;

  test.beforeEach(async ({}, workerInfo) => {
    userForLogin = BaseTest.GetUserFromPool(workerInfo.workerIndex);
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    appointmentTitle = dateTimePrefix + ' Autotest Appointment Title';
    appointmentBody = dateTimePrefix + ' Autotest Appointment Body';
    calendarViewTitle = 'WEEK';
  });

  test.afterEach(async ({apiManager}) => {
    await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, runtimeAppoinmentId, userForLogin.login);
    const id = await apiManager.calendarAPI.CalendarSearchQuery(appointmentTitle, userForLogin.login);
    await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, userForLogin.login);
  });

  test('Open Calendars tab. All calendars tabs display.', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await expect(pageManager.sideSecondaryCalendarMenu.Tabs.AllCalendars, 'All calendars tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryCalendarMenu.Tabs.Calendar, 'Calendar tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryCalendarMenu.Tabs.Trash, 'Trash tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryCalendarMenu.Tabs.Tags, 'Tags tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryCalendarMenu.Tabs.SharedCalendars, 'Shared Calendars tab should be presented').toBeVisible();
  });

  test('Create new appointment. New appoinrment is presented in calendar.', async ({page, pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newAppointment.SendAppointment(appointmentTitle, appointmentBody);
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState('hidden');
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyCalendar();
    await pageManager.calendar.SelectCalendarView(calendarViewTitle);
    await expect(pageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).toHaveCount(1);
  });

  test('Move appointment to trash. Appoinrment is presented in trash calendar.', async ({pageManager, apiManager}) => {
    runtimeAppoinmentId = await apiManager.calendarAPI.CreateAppointmentRequest(appointmentTitle, userForLogin.login, '3', appointmentBody);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyCalendar();
    await pageManager.calendar.SelectCalendarView(calendarViewTitle);
    await pageManager.calendar.MoveAppointmentToTrash(appointmentTitle);
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyTrash();
    await pageManager.calendar.SelectCalendarView(calendarViewTitle);
    await expect(pageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).toHaveCount(1);
  });

  test('Delete permanently. Appoinrment is not presented in trash calendar.', async ({pageManager, apiManager, page}) => {
    runtimeAppoinmentId = await apiManager.calendarAPI.CreateAppointmentRequest(appointmentTitle, userForLogin.login, '3', appointmentBody);
    await apiManager.calendarAPI.CancelAppointmentRequest(runtimeAppoinmentId, userForLogin.login);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyTrash();
    await pageManager.calendar.SelectCalendarView(calendarViewTitle);
    await pageManager.calendar.DeleteAppointmentPermanently(appointmentTitle);
    await page.reload(); // temporary step due to a bug on UI
    await expect(pageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).toHaveCount(0);
  });
});
