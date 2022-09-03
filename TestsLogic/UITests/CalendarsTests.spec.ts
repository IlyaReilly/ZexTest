import {expect} from '@playwright/test';
import {test, BaseTest} from './BaseTest';
import {InheritedFields} from '../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

test.describe('Calendars tests', async () => {
  let dateTimePrefix;
  let appointmentTitle;
  let appointmentBody;
  let runtimeAppoinmentId = '';
  let calendarViewTitle;

  test.beforeEach(async () => {
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    appointmentTitle = dateTimePrefix + ' Autotest Appointment Title';
    appointmentBody = dateTimePrefix + ' Autotest Appointment Body';
  });

  test.afterEach(async ({page, apiManager}) => {
    await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, runtimeAppoinmentId, BaseTest.userForLogin.login);
    const id = await apiManager.calendarAPI.CalendarSearchQuery(appointmentTitle, BaseTest.userForLogin.login);
    await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    await page.close();
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
    calendarViewTitle = 'WEEK';
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newAppointment.SendAppointment(appointmentTitle, appointmentBody);
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState('hidden');
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyCalendar();
    await pageManager.calendar.SelectCalendarView(calendarViewTitle);
    await expect(pageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).toHaveCount(1);
  });

  test('Move appointment to trash. Appoinrment is presented in trash calendar.', async ({pageManager, apiManager, page}) => {
    calendarViewTitle = 'WEEK';
    runtimeAppoinmentId = await apiManager.calendarAPI.CreateAppointmentRequest(appointmentTitle, BaseTest.userForLogin.login, '3', appointmentBody);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyCalendar();
    await page.reload();
    await pageManager.calendar.SelectCalendarView(calendarViewTitle);
    await pageManager.calendar.MoveAppointmentToTrash(appointmentTitle);
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyTrash();
    await pageManager.calendar.SelectCalendarView(calendarViewTitle);
    await expect(pageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).toHaveCount(1);
  });

  test('Delete permanently. Appoinrment is not presented in trash calendar.', async ({pageManager, apiManager, page}) => {
    calendarViewTitle = 'WEEK';
    runtimeAppoinmentId = await apiManager.calendarAPI.CreateAppointmentRequest(appointmentTitle, BaseTest.userForLogin.login, '3', appointmentBody);
    await apiManager.calendarAPI.CancelAppointmentRequest(runtimeAppoinmentId, BaseTest.userForLogin.login);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyTrash();
    await pageManager.calendar.SelectCalendarView(calendarViewTitle);
    await pageManager.calendar.DeleteAppointmentPermanently(appointmentTitle);
    await page.reload(); // temporary step due to a bug on UI
    await expect(pageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).toHaveCount(0);
  });

  test('Calendar view: WORK WEEK is a default view', async ({pageManager, page}) => {
    calendarViewTitle = 'WORK WEEK';
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await page.reload();
    await expect(await pageManager.calendar.GetElementColor(calendarViewTitle)).toBe('rgb(213, 227, 246)');
  });

  test('day', async ({pageManager}) => {
    cusrrent 
    await expect(await pageManager.calendar.GetCurrentDay()).toBe('rgb(213, 227, 246)');
  });
});
