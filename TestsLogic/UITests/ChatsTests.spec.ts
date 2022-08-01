import { expect, Page } from '@playwright/test';
import { test, pageManager, playwrightProjectsData, apiManager } from './BaseTest';

test.describe('Chats tests', async () => {

  let page: Page;
  let dateTimePrefix;
  let appointmentTitle;
  let appointmentBody;
  let runtimeAppoinmentId = '';

  // Components
  let headerMenu;
  let sideMenu;
  let sideSecondaryCalendarMenu;
  let newAppointment;
  let calendar;
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

  test.afterEach(async({login}) => {
    await calendarAPI.ItemActionRequest(calendarAPI.ActionRequestTypes.delete, runtimeAppoinmentId, login);
    var id = await calendarAPI.CalendarSearchQuery(appointmentTitle, login);
    await calendarAPI.ItemActionRequest(calendarAPI.ActionRequestTypes.delete, id, login);
  });
  
  test.afterAll(async () => {
    await page.close();
  });

  test('Open Calendars tab. All calendars tabs display.', async ({}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Chats);
    await headerMenu.OpenNewItemMenuSection(headerMenu.NewItemMenu.CreateSpace);
  });
});