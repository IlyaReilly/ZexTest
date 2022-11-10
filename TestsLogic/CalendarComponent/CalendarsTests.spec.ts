import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';
import {InheritedFields} from '../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

test.describe('Calendars tests', async () => {
  let dateTimePrefix;
  let appointmentTitle;
  let appointmentBody;
  let runtimeAppoinmentId = '';
  const calendarView = {
    Day: "Day",
    Week: "Week",
    WorkWeek: "Work week",
    Month: "Month",
  };

  test.beforeAll(async ({apiManager}) => {
    const allAppionmentsIds = await apiManager.calendarAPI.GetAllAppointments(BaseTest.userForLogin.login);
    await Promise.all(allAppionmentsIds.map(async (id) => {
      return await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    }));
  });

  test.beforeEach(async ({pageManager}) => {
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    appointmentTitle = dateTimePrefix + ' Autotest Appointment Title';
    appointmentBody = dateTimePrefix + ' Autotest Appointment Body';
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
  });

  test.afterEach(async ({page, apiManager}) => {
    await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, runtimeAppoinmentId, BaseTest.userForLogin.login);
    const id = await apiManager.calendarAPI.CalendarSearchQuery(appointmentTitle, BaseTest.userForLogin.login);
    await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    await page.close();
  });

  test('TC301. Open Calendars tab. All calendars tabs display.', async ({pageManager}) => {
    await expect(pageManager.sideSecondaryCalendarMenu.Tabs.AllCalendars, 'All calendars tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryCalendarMenu.Tabs.Calendar, 'Calendar tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryCalendarMenu.Tabs.Trash, 'Trash tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryCalendarMenu.Tabs.Tags, 'Tags tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryCalendarMenu.Tabs.SharedCalendars, 'Shared Calendars tab should be presented').toBeVisible();
  });

  test('TC302. Create new appointment. New appoinrment is presented in calendar.', async ({page, pageManager}) => {
    BaseTest.doubleTimeout();
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newAppointment.SendAppointment(appointmentTitle, appointmentBody);
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState('hidden');
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyCalendar();
    await pageManager.calendar.SelectCalendarView(calendarView.Day);
    await pageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`).waitFor();
    await expect(pageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).toHaveCount(1);
  });

  test('TC305. Create new private appointment. Appointment has Lock icon.', async ({page, pageManager}) => {
    BaseTest.doubleTimeout();
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newAppointment.SendAppointment(appointmentTitle, appointmentBody, undefined, true);
    const elementHandle = await page.$(InheritedFields.NewItemDefaultContainerLocator);
    await elementHandle?.waitForElementState('hidden');
    await page.waitForLoadState('domcontentloaded');
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyCalendar();
    await pageManager.calendar.SelectCalendarView(calendarView.WorkWeek);
    await expect(pageManager.calendar.Selectors.PrivateAppLockIconSelector).toBeVisible();
  });

  test('TC320. Delete appointment to trash. Appoinrment is presented in trash calendar.', async ({pageManager, apiManager, page}) => {
    BaseTest.doubleTimeout();
    await CreateAppointmentAndSelectOnlyCalendar({pageManager, apiManager, page});
    await pageManager.calendar.SelectCalendarView(calendarView.WorkWeek);
    await pageManager.calendar.DeleteAppointmentToTrash(appointmentTitle);
    await AppointmentInTheTrashValidation({pageManager});
  });

  test('TC321. Move appointment to trash. Appoinrment is presented in trash calendar.', async ({pageManager, apiManager, page}) => {
    BaseTest.doubleTimeout();
    await CreateAppointmentAndSelectOnlyCalendar({pageManager, apiManager, page});
    await pageManager.calendar.SelectCalendarView(calendarView.WorkWeek);
    await pageManager.calendar.OpenAppointmentOtherActions(appointmentTitle);
    await pageManager.calendar.AppointmentPopup.OtherActionsMove.click();
    await pageManager.moveAppointmentModal.Elements.Trash.click();
    await pageManager.moveAppointmentModal.Buttons.Move.click();
    await AppointmentInTheTrashValidation({pageManager});
  });

  // Isn't finished due to bug
  test.skip('TC323. Move appointment to the new Calendar. Appoinrment in new Calendar.', async ({pageManager, apiManager, page}) => {
    const newCalendarName = dateTimePrefix + 'NewCalendar';
    BaseTest.doubleTimeout();
    await CreateAppointmentAndSelectOnlyCalendar({pageManager, apiManager, page});
    await pageManager.calendar.SelectCalendarView(calendarView.WorkWeek);
    await pageManager.calendar.OpenAppointmentOtherActions(appointmentTitle);
    await pageManager.calendar.AppointmentPopup.OtherActionsMove.click();
    await pageManager.moveAppointmentModal.Buttons.NewCalendar.click();
    await pageManager.newCalendarModal.TextBoxes.CalendarName.fill(newCalendarName);
    // Next step doesn't work for now due to problem with Create button.
    // Now instead create we have Empty button.
    await pageManager.newCalendarModal.Buttons.Create.click();
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyCalendarWithName(newCalendarName);
    await pageManager.calendar.SelectCalendarView(calendarView.Week);
    await expect(pageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).toHaveCount(1);
  });

  test('TC322. Delete permanently. Appoinrment is not presented in trash calendar.', async ({pageManager, apiManager, page}) => {
    BaseTest.doubleTimeout();
    runtimeAppoinmentId = await apiManager.createCalendarAPI.CreateAppointmentRequest(appointmentTitle, BaseTest.userForLogin.login, '3', appointmentBody);
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyCalendar();
    await apiManager.deleteCalendarAPI.CancelAppointmentRequest(runtimeAppoinmentId, BaseTest.userForLogin.login);
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyTrash();
    await pageManager.calendar.SelectCalendarView(calendarView.WorkWeek);
    await pageManager.calendar.DeleteAppointmentPermanently(appointmentTitle);
    await page.reload(); // temporary step due to a bug on Firefox UI
    await expect(pageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).toHaveCount(0);
  });

  async function AppointmentInTheTrashValidation({pageManager}) {
    await expect(pageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).not.toBeVisible();
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyTrash();
    await pageManager.calendar.SelectCalendarView(calendarView.Week);
    await expect(pageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).toHaveCount(1);
  };

  async function CreateAppointmentAndSelectOnlyCalendar({pageManager, apiManager, page}) {
    await apiManager.createCalendarAPI.CreateAppointmentRequest(appointmentTitle, BaseTest.userForLogin.login, '3', appointmentBody);
    await page.waitForLoadState('domcontentloaded');
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyCalendar();
  };
});
