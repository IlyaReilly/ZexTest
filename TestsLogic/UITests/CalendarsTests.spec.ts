import { expect, Page } from '@playwright/test';
import { test, pageManager, playwrightProjectsData, apiManager } from './BaseTest';
import {InheritedFields} from '../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

test.describe('Calendars tests', async () => {

  let page: Page;
  let dateTimePrefix;
  let appointmentTitle;
  let appointmentBody;

  // Components
  let headerMenu;
  let sideMenu;
  let sideSecondaryCalendarMenu;
  let newAppointment;
  let calendar;
  let user = playwrightProjectsData.users.test2.login;
  let calendarAPI;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/');
    calendarAPI = await apiManager.getCalendarAPI(page);
    headerMenu = await pageManager.getHeaderMenuComponent(page);
    sideMenu = await pageManager.getSideMenuComponent(page);
    newAppointment = await pageManager.getNewAppointmentComponent(page);
    calendar = await pageManager.getCalendarComponent(page);
    sideSecondaryCalendarMenu = await pageManager.getSideSecondaryCalendarMenuComponent(page);
  });

  test.beforeEach(async () => {
    await page.reload();
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    appointmentTitle = dateTimePrefix + ' Autotest Appointment Title';
    appointmentBody = dateTimePrefix + ' Autotest Appointment Body';
  });

  test.afterEach(async() => {
    var id = await calendarAPI.CalendarSearchQuery(appointmentTitle, user);
    await calendarAPI.ItemActionRequest(calendarAPI.ActionRequestTypes.delete, id, user);
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
    await elementHandle?.waitForElementState("hidden");
    await expect(calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).toHaveCount(1);
  });

  test('Move appointment to trash. Appoinrment is presented in trash calendar.', async ({}) => {
    await calendarAPI.CreateAppointmentRequest(
      appointmentTitle, user, "3", appointmentBody);
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Calendar);
    await calendar.MoveAppointmentToTrash(appointmentTitle);
    await expect(calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).toHaveCount(1);
  });
});