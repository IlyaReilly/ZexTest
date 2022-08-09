import {expect, Page} from '@playwright/test';
import {test, BaseTest} from './BaseTest';
import {InheritedFields} from '../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

test.describe('Calendars tests', async () => {
  let page: Page;
  let dateTimePrefix;
  let appointmentTitle;
  let appointmentBody;
  let runtimeAppoinmentId = '';
  let userForLogin;
  let storagesPath;

  // Components
  let headerMenu;
  let sideMenu;
  let sideSecondaryCalendarMenu;
  let newAppointment;
  let calendar;
  let calendarAPI;

  test.beforeAll(async ({browser}, workerInfo) => {
    userForLogin = BaseTest.GetUserFromPool(workerInfo.workerIndex);
    storagesPath = await BaseTest.ApiLogin(userForLogin);
    page = await browser.newPage({storageState: storagesPath});
    await page.goto('/');
    calendarAPI = await BaseTest.apiManager.getCalendarAPI(page);
    headerMenu = await BaseTest.pageManager.getHeaderMenuComponent(page);
    sideMenu = await BaseTest.pageManager.getSideMenuComponent(page);
    newAppointment = await BaseTest.pageManager.getNewAppointmentComponent(page);
    calendar = await BaseTest.pageManager.getCalendarComponent(page);
    sideSecondaryCalendarMenu = await BaseTest.pageManager.getSideSecondaryCalendarMenuComponent(page);
  });

  test.beforeEach(async () => {
    await page.goto('/');
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    appointmentTitle = dateTimePrefix + ' Autotest Appointment Title';
    appointmentBody = dateTimePrefix + ' Autotest Appointment Body';
  });

  test.afterEach(async ({}) => {
    await calendarAPI.ItemActionRequest(calendarAPI.ActionRequestTypes.delete, runtimeAppoinmentId, userForLogin.login);
    const id = await calendarAPI.CalendarSearchQuery(appointmentTitle, userForLogin.login);
    await calendarAPI.ItemActionRequest(calendarAPI.ActionRequestTypes.delete, id, userForLogin.login);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Open Calendars tab. All calendars tabs display.', async ({}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Calendar);
    await expect(sideSecondaryCalendarMenu.Tabs.AllCalendars, 'All calendars tab should be presented').toBeVisible();
    await expect(sideSecondaryCalendarMenu.Tabs.Calendar, 'Calendar tab should be presented').toBeVisible();
    await expect(sideSecondaryCalendarMenu.Tabs.Trash, 'Trash tab should be presented').toBeVisible();
    await expect(sideSecondaryCalendarMenu.Tabs.Tags, 'Tags tab should be presented').toBeVisible();
    await expect(sideSecondaryCalendarMenu.Tabs.SharedCalendars, 'Shared Calendars tab should be presented').toBeVisible();
  });

  test('Create new appointment. New appoinrment is presented in calendar.', async ({}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Calendar);
    await headerMenu.Buttons.NewItem.click();
    await newAppointment.SendAppointment(appointmentTitle, appointmentBody);
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState('hidden');
    await sideSecondaryCalendarMenu.SelectOnlyCalendar();
    await expect(calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).toHaveCount(1);
  });

  test('Move appointment to trash. Appoinrment is presented in trash calendar.', async ({}) => {
    runtimeAppoinmentId = await calendarAPI.CreateAppointmentRequest(appointmentTitle, userForLogin.login, '3', appointmentBody);
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Calendar);
    await sideSecondaryCalendarMenu.SelectOnlyCalendar();
    await calendar.MoveAppointmentToTrash(appointmentTitle);
    await sideSecondaryCalendarMenu.SelectOnlyTrash();
    await expect(calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).toHaveCount(1);
  });

  test('Delete permanently. Appoinrment is not presented in trash calendar.', async ({}) => {
    runtimeAppoinmentId = await calendarAPI.CreateAppointmentRequest(appointmentTitle, userForLogin.login, '3', appointmentBody);
    await calendarAPI.CancelAppointmentRequest(runtimeAppoinmentId, userForLogin.login);
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Calendar);
    await sideSecondaryCalendarMenu.SelectOnlyTrash();
    await calendar.DeleteAppointmentPermanently(appointmentTitle);
    await expect(calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).toHaveCount(0);
  });
});
