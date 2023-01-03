import {expect} from '@playwright/test';
import {test, BaseTest} from '../../UITests/BaseTest';
import {InheritedFields} from '../../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

test.describe('Calendars tests', async () => {
  let dateTimePrefix;
  let appointmentTitle;
  let appointmentBody;
  let runtimeAppoinmentId = '';
  let appointmentTag;
  const calendarView = {
    Day: "Day",
    Week: "Week",
    WorkWeek: "Work week",
    Month: "Month",
  };

  test.beforeAll(async ({apiManager}) => {
    await DeleteAllAppointmentsAndAllCalendarsViaAPI({apiManager});
  });

  test.beforeEach(async ({pageManager}) => {
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    appointmentTitle = dateTimePrefix + ' Autotest Appointment Title';
    appointmentBody = dateTimePrefix + ' Autotest Appointment Body';
    appointmentTag = dateTimePrefix + ' Autotest Appointment Tag';
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
  });

  test.afterEach(async ({page, apiManager}) => {
    await DeleteAllAppointmentsAndAllCalendarsViaAPI({apiManager});
    await page.close();
  });

  test('TC301. Open Calendars tab. All calendars tabs display.', async ({pageManager}) => {
    await expect(pageManager.sideSecondaryCalendarMenu.Tabs.AllCalendars, 'All calendars tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryCalendarMenu.Tabs.Calendar, 'Calendar tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryCalendarMenu.Tabs.Trash, 'Trash tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryCalendarMenu.Tabs.Tags, 'Tags tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryCalendarMenu.Tabs.SharedCalendars, 'Shared Calendars tab should be presented').toBeVisible();
  });

  test('TC302. Create new appointment. New appointment is presented in calendar.', async ({page, pageManager}) => {
    BaseTest.doubleTimeout();
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newAppointment.SendAppointment(appointmentTitle, appointmentBody);
    const elementHandle = await page.$(InheritedFields.NewItemBoardLocator);
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
    const elementHandle = await page.$(InheritedFields.NewItemBoardLocator);
    await elementHandle?.waitForElementState('hidden');
    await page.waitForLoadState('domcontentloaded');
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyCalendar();
    await pageManager.calendar.SelectCalendarView(calendarView.WorkWeek);
    await expect(pageManager.calendar.Selectors.PrivateAppLockIconSelector).toBeVisible();
  });

  test('TC325. Create new appointment with location. Location should be demonstrated in appointment info.', async ({page, pageManager}) => {
    const location = dateTimePrefix + 'Location';
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newAppointment.SendAppointment(appointmentTitle, appointmentBody, undefined, false, location);
    const elementHandle = await page.$(InheritedFields.NewItemBoardLocator);
    await elementHandle?.waitForElementState('hidden');
    await page.waitForLoadState('domcontentloaded');
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyCalendar();
    await pageManager.calendar.SelectCalendarView(calendarView.WorkWeek);
    await pageManager.calendar.OpenAppointmentInfoPopup(appointmentTitle);
    await expect(pageManager.calendar.Containers.AppointmentPopupContainer.locator(`'${location}'`), 'Location should be demonstrated in appointment info.').toBeVisible();
  });

  test('TC320. Delete appointment to trash. Appointment is presented in trash calendar.', async ({pageManager, apiManager, page}) => {
    BaseTest.doubleTimeout();
    await CreateAppointmentAndSelectOnlyCalendar({pageManager, apiManager, page});
    await pageManager.calendar.SelectCalendarView(calendarView.WorkWeek);
    await pageManager.calendar.DeleteAppointmentToTrash(appointmentTitle);
    await AppointmentInTheTrashValidation({pageManager});
  });

  test('TC321. Move appointment to trash. Appointment is presented in trash calendar.', async ({pageManager, apiManager, page}) => {
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
  test.skip('TC323. Move appointment to the new Calendar. Appointment in new Calendar.', async ({pageManager, apiManager, page}) => {
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

  test('TC322. Delete permanently. Appointment is not presented in trash calendar.', async ({pageManager, apiManager, page}) => {
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

  test('TS1001. Create tag in appointment. Tag icon should be visible in appointment.', async ({pageManager, apiManager, page}) => {
    BaseTest.doubleTimeout();
    test.fail(true, '138 When we create tag in appointment, window take error');
    await CreateAppointmentAndSelectOnlyCalendar({pageManager, apiManager, page});
    await pageManager.calendar.OpenModalForCreateTag(appointmentTitle);
    await pageManager.newTagModal.CreateTag(appointmentTag);
    await pageManager.sideSecondaryCalendarMenu.OpenTagChevron();
    await expect(pageManager.calendar.Selectors.TagIconSelector).toBeVisible();
  });

  test('TS324. Move appointment to another date via drag&drop. Appointment should be present in another day.', async ({pageManager, apiManager, page}) => {
    test.fail(true, '140 Appointment do not moved');
    await CreateAppointmentAndSelectOnlyCalendar({pageManager, apiManager, page});
    await pageManager.calendar.DragAndDropAppointmentOnAnotherDay(appointmentTitle);
    await pageManager.editAfterMoveAppointmentModal.Buttons.SendEdit.click();
    await pageManager.calendar.Elements.DayButton.click();
    await expect(pageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).not.toBeVisible();
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

  test('TC329. Click the "New Appointment" button in header menu. The "New Appointment" modal window opens and contains current date and current one hour interval in header.', async ({pageManager}) => {
    const currentDate = new Date();
    const currentDateWithOneHourIntervalString = formatDateToStringWithOneHourInterval(currentDate);
    await pageManager.headerMenu.Buttons.NewItem.click();
    await expect(pageManager.newAppointment.DateWithTimeInervalInHeader).toHaveText(currentDateWithOneHourIntervalString, {useInnerText: true});
  });

  test('TC330. The "New Appointment" modal window contains time zone in header that matches the user time zone.', async ({pageManager}) => {
    const currentDate = new Date();
    const timeZoneExpected = new Intl.DateTimeFormat('en-GB', {timeZoneName: "longOffset"}).format(currentDate).split(' ')[1].replace('GMT+', 'GMT +') + ' '+ new Intl.DateTimeFormat().resolvedOptions().timeZone;
    await pageManager.headerMenu.Buttons.NewItem.click();
    await expect(pageManager.newAppointment.TimeZoneInHeader).toHaveText(timeZoneExpected);
  });

  function formatDateToStringWithOneHourInterval(date: Date): string {
    // example of function return: Tuesday, 03 January, 2023 09:12 - 10:12
    const datePlus1Hour = new Date(date).setHours(date.getHours() + 1);
    const dateStringWithoutTime = new Intl.DateTimeFormat("en-GB", {weekday: 'long', day: '2-digit', month: 'long'}).format(date) + ', ' + new Intl.DateTimeFormat("en-GB", {year: 'numeric'}).format(date);
    const timeOneHourIntervalString = new Intl.DateTimeFormat("en-GB", {timeStyle: 'short'}).format(date) + ' - ' + new Intl.DateTimeFormat("en-GB", {timeStyle: 'short'}).format(datePlus1Hour);
    const dateAndTimeOneHourIntervalString = dateStringWithoutTime + ' ' + timeOneHourIntervalString;
    return dateAndTimeOneHourIntervalString;
  }

  async function DeleteAllAppointmentsAndAllCalendarsViaAPI({apiManager}) {
    await DeleteAllAppointmentsViaAPI({apiManager});
    await DeleteAllCalendarsViaAPI({apiManager});
  };

  async function DeleteAllAppointmentsViaAPI({apiManager}) {
    const allAppionmentsIds = await apiManager.calendarAPI.GetAllAppointments(BaseTest.userForLogin.login);
    await Promise.all(allAppionmentsIds.map(async (id) => {
      return await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    }));
  };

  async function DeleteAllCalendarsViaAPI({apiManager}) {
    const allCalendarFolders = await apiManager.calendarAPI.GetCalendarFolders(BaseTest.userForLogin.login);
    const allCustomFolders = allCalendarFolders.filter((folder) => folder.deletable);
    await Promise.all(allCustomFolders.map(async (folder) => {
      return await apiManager.deleteCalendarAPI.DeleteCalendarFolderRequest(folder.id, BaseTest.userForLogin.login);
    }));
  };
});
