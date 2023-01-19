import {expect} from '@playwright/test';
import {test, BaseTest} from '../../BaseTest';

test.describe('Calendars tests', async () => {
  const countOfDaysInWeek = 7;
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

  test.beforeEach(async ({pageManager, apiManager}) => {
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    appointmentTitle = dateTimePrefix + ' Autotest Appointment Title';
    appointmentBody = dateTimePrefix + ' Autotest Appointment Body';
    appointmentTag = dateTimePrefix + ' Autotest Appointment Tag';
    await apiManager.calendarAPI.DeleteAppointmentsAndCalendarsViaAPI({apiManager});
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
  });

  test.afterEach(async ({page, apiManager}) => {
    await apiManager.calendarAPI.DeleteAppointmentsAndCalendarsViaAPI({apiManager});
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
    const elementHandle = await page.$(pageManager.baseApplicationPage.InheritedFields.NewItemBoardLocator);
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
    const elementHandle = await page.$(pageManager.baseApplicationPage.InheritedFields.NewItemBoardLocator);
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
    const elementHandle = await page.$(pageManager.baseApplicationPage.InheritedFields.NewItemBoardLocator);
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

  test('TC1001. Create tag in appointment. Tag icon should be visible in appointment.', async ({pageManager, apiManager, page}) => {
    BaseTest.doubleTimeout();
    test.fail(true, '138 When we create tag in appointment, window take error');
    await CreateAppointmentAndSelectOnlyCalendar({pageManager, apiManager, page});
    await pageManager.calendar.OpenModalForCreateTag(appointmentTitle);
    await pageManager.newTagModal.CreateTag(appointmentTag);
    await pageManager.sideSecondaryCalendarMenu.OpenTagChevron();
    await expect(pageManager.calendar.Selectors.TagIconSelector).toBeVisible();
  });

  test('TC324. Move appointment to another date via drag&drop. Appointment should be present in another day.', async ({pageManager, apiManager, page}) => {
    await CreateAppointmentAndSelectOnlyCalendar({pageManager, apiManager, page});
    await pageManager.calendar.DragAndDropAppointmentOnAnotherDay(appointmentTitle);
    await pageManager.editAfterMoveAppointmentModal.Buttons.SendEdit.click();
    await pageManager.calendar.Elements.DayButton.click();
    await expect(pageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).not.toBeVisible();
  });

  test('TC329. Click the "New Appointment" button in header menu. The "New Appointment" modal window opens and contains current date and current one hour interval in header.', async ({pageManager}) => {
    await pageManager.headerMenu.Buttons.NewItem.click();
    const dateWithTimeIntervalInAppointment = await pageManager.newAppointment.Elements.DateWithTimeInervalInHeader.innerText();
    const dateTimeInAppointment = new Date(dateWithTimeIntervalInAppointment.split(' -')[0]);
    const currentDateTime = new Date();
    const timeDifferenceInMinutes = Math.floor((currentDateTime.getTime() - dateTimeInAppointment.getTime()) / 60000);
    if ( timeDifferenceInMinutes === 1 || timeDifferenceInMinutes === 2) {
      currentDateTime.setMinutes(currentDateTime.getMinutes() - timeDifferenceInMinutes);
    }
    await expect(pageManager.newAppointment.Elements.DateWithTimeInervalInHeader).toHaveText(formatDateToStringWithOneHourInterval(currentDateTime), {useInnerText: true});
  });

  test('TC327. Create Appointment with repeat option "Every day". Appointment repeats every day in calendar.', async ({pageManager}) => {
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newAppointment.SetStartTime('12:00 PM');
    const dateWithTimeIntervalInAppointment = await pageManager.newAppointment.Elements.DateWithTimeInervalInHeader.innerText();
    const startDateTimeInAppointment = new Date(dateWithTimeIntervalInAppointment.split(' -')[0]);
    const countOfRepeatsInCurrentWeekExpected = countOfDaysInWeek - startDateTimeInAppointment.getDay();
    await pageManager.newAppointment.SendAppointment(appointmentTitle, appointmentBody, undefined, undefined, undefined, undefined, pageManager.newAppointment.RepeatOptions.EveryDay);
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyCalendar();
    await pageManager.calendar.SelectCalendarView(calendarView.Week);
    await expect(pageManager.calendar.Elements.AppointmentWithTitle(appointmentTitle)).toHaveCount(countOfRepeatsInCurrentWeekExpected);
    await pageManager.calendar.Elements.NextDateArrow.click();
    await expect(pageManager.calendar.Elements.AppointmentWithTitle(appointmentTitle)).toHaveCount(countOfDaysInWeek);
    await pageManager.calendar.SelectCalendarView(calendarView.Month);
    await pageManager.calendar.Elements.NextDateArrow.click();
    const countOfCellsInMonthView = await pageManager.calendar.Elements.Cell.count();
    await expect(pageManager.calendar.Elements.AppointmentWithTitle(appointmentTitle)).toHaveCount(countOfCellsInMonthView);
  });

  function formatDateToStringWithOneHourInterval(date: Date): string {
    // example of function return: Tuesday, 03 January, 2023 09:12 - 10:12
    const datePlus1Hour = new Date(date).setHours(date.getHours() + 1);
    const dateStringWithoutTime = new Intl.DateTimeFormat("en-GB", {weekday: 'long', day: '2-digit', month: 'long'}).format(date) + ', ' + new Intl.DateTimeFormat("en-GB", {year: 'numeric'}).format(date);
    const timeOneHourIntervalString = new Intl.DateTimeFormat("en-GB", {timeStyle: 'short'}).format(date) + ' - ' + new Intl.DateTimeFormat("en-GB", {timeStyle: 'short'}).format(datePlus1Hour);
    return dateStringWithoutTime + ' ' + timeOneHourIntervalString;
  }

  async function AppointmentInTheTrashValidation({pageManager}) {
    await expect(pageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).not.toBeVisible();
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyTrash();
    await pageManager.calendar.SelectCalendarView(calendarView.Week);
    await expect(pageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).toHaveCount(1);
  };

  async function CreateAppointmentAndSelectOnlyCalendar({pageManager, apiManager, page}) {
    await apiManager.createCalendarAPI.CreateAppointmentRequest(appointmentTitle, BaseTest.userForLogin.login, '3', appointmentBody);
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyCalendar();
  };
});
