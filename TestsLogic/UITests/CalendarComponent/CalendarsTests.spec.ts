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

  test.beforeEach(async ({apiManager}) => {
    BaseTest.setFeatureSuite.calendars();
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    appointmentTitle = dateTimePrefix + ' Autotest Appointment Title';
    appointmentBody = dateTimePrefix + ' Autotest Appointment Body';
    appointmentTag = dateTimePrefix + ' Autotest Appointment Tag';
    await apiManager.calendarAPI.DeleteAppointmentsAndCalendarsViaAPI({apiManager});
  });

  test.afterEach(async ({page, apiManager}) => {
    await apiManager.calendarAPI.DeleteAppointmentsAndCalendarsViaAPI({apiManager});
    await page.close();
  });

  test('TC301. Open Calendars tab. All calendars tabs display. @smoke', async ({pageManager}) => {
    BaseTest.setSuite.smoke();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await expect(pageManager.sideSecondaryCalendarMenu.Tabs.AllCalendars, 'All calendars tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryCalendarMenu.Tabs.Calendar, 'Calendar tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryCalendarMenu.Tabs.Trash, 'Trash tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryCalendarMenu.Tabs.Tags, 'Tags tab should be presented').toBeVisible();
    await expect(pageManager.sideSecondaryCalendarMenu.Tabs.SharedCalendars, 'Shared Calendars tab should be presented').toBeVisible();
  });

  test('TC302. Create new appointment. New appointment is presented in calendar. @smoke', async ({page, pageManager}) => {
    BaseTest.setSuite.smoke();
    BaseTest.doubleTimeout();
    await CreateAppointmentAndSelectOnlyCalendar({pageManager, page});
    await expect(pageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).toHaveCount(1);
  });

  test('TC305. Create new private appointment. Appointment has Lock icon.', async ({page, pageManager}) => {
    BaseTest.doubleTimeout();
    await CreateAppointmentAndSelectOnlyCalendar({pageManager, page}, true);
    await expect(pageManager.calendar.Selectors.PrivateAppLockIconSelector).toBeVisible();
  });

  test('TC320. Delete appointment to trash. Appointment is presented in trash calendar.', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await CreateAppointmentViaApiAndSelectOnlyCalendar({pageManager, apiManager});
    await pageManager.calendar.DeleteAppointmentToTrash(appointmentTitle);
    await AppointmentInTheTrashValidation({pageManager});
  });

  test('TC321. Move appointment to trash. Appointment is presented in trash calendar.', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await CreateAppointmentViaApiAndSelectOnlyCalendar({pageManager, apiManager});
    await pageManager.calendar.OpenAppointmentOtherActions(appointmentTitle);
    await pageManager.calendar.AppointmentPopup.OtherActionsMove.click();
    await pageManager.moveAppointmentModal.Elements.Trash.click();
    await pageManager.moveAppointmentModal.Buttons.Move.click();
    await AppointmentInTheTrashValidation({pageManager});
  });

  test('TC322. Delete permanently. Appointment is not presented in trash calendar.', async ({pageManager, apiManager, page}) => {
    BaseTest.doubleTimeout();
    runtimeAppoinmentId = await CreateAppointmentViaApiAndSelectOnlyCalendar({pageManager, apiManager});
    await apiManager.deleteCalendarAPI.CancelAppointmentRequest(runtimeAppoinmentId, BaseTest.userForLogin.login);
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyTrash();
    await pageManager.calendar.DeleteAppointmentPermanently(appointmentTitle);
    await page.reload(); // temporary step due to a bug on Firefox UI
    await expect(pageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).toHaveCount(0);
  });

  // Isn't finished due to bug
  test.skip('TC323. Move appointment to the new Calendar. Appointment in new Calendar.', async ({pageManager, apiManager}) => {
    const newCalendarName = dateTimePrefix + 'NewCalendar';
    BaseTest.doubleTimeout();
    await CreateAppointmentViaApiAndSelectOnlyCalendar({pageManager, apiManager});
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

  test('TC1001. Create tag in appointment. Tag icon should be visible in appointment.', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    test.fail(true, '138 When we create tag in appointment, window take error');
    await CreateAppointmentViaApiAndSelectOnlyCalendar({pageManager, apiManager});
    await pageManager.calendar.OpenModalForCreateTag(appointmentTitle);
    await pageManager.newTagModal.CreateTag(appointmentTag);
    await pageManager.sideSecondaryCalendarMenu.OpenTagChevron();
    await expect(pageManager.calendar.Selectors.TagIconSelector).toBeVisible();
  });

  test('TC324. Move appointment to another date via drag&drop. Appointment should be present in another day.', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await CreateAppointmentViaApiAndSelectOnlyCalendar({pageManager, apiManager});
    await pageManager.calendar.DragAndDropAppointmentOnAnotherDay(appointmentTitle);
    await pageManager.editAfterMoveAppointmentModal.Buttons.SendEdit.click();
    await pageManager.calendar.Elements.DayButton.click();
    await expect(pageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).not.toBeVisible();
  });

  test('TC325. Create new appointment with location. Location should be demonstrated in appointment info.', async ({page, pageManager}) => {
    const location = dateTimePrefix + ' Location';
    await CreateAppointmentAndSelectOnlyCalendar({pageManager, page}, false, location);
    await pageManager.calendar.OpenAppointmentInfoPopup(appointmentTitle);
    await expect(pageManager.calendar.Containers.AppointmentPopupContainer.locator(`'${location}'`), 'Location should be demonstrated in appointment info.').toBeVisible();
  });

  test('TC327. Create Appointment with repeat option "Every day". Appointment repeats every day in calendar.', async ({pageManager}) => {
    BaseTest.doubleTimeout();
    await OpenCalendarTabAndClickNewItemButton({pageManager});
    await pageManager.newAppointment.SetStartTime('12:00 PM');
    const dateWithTimeIntervalInAppointment = await pageManager.newAppointment.Elements.DateWithTimeInervalInHeader.innerText();
    const startDateTimeInAppointment = new Date(dateWithTimeIntervalInAppointment.split(' -')[0]);
    const countOfRepeatsInCurrentWeekExpected = countOfDaysInWeek - startDateTimeInAppointment.getDay();
    await pageManager.newAppointment.SendAppointment(appointmentTitle, appointmentBody, undefined, undefined, undefined, undefined, pageManager.newAppointment.RepeatOptions.EveryDay);
    await SelectOnlyCalendarAndWeekView({pageManager});
    await expect(pageManager.calendar.Elements.AppointmentWithTitle(appointmentTitle)).toHaveCount(countOfRepeatsInCurrentWeekExpected);
    await pageManager.calendar.Elements.NextDateArrow.click();
    await expect(pageManager.calendar.Elements.AppointmentWithTitle(appointmentTitle)).toHaveCount(countOfDaysInWeek);
  });

  test('TC329. Click the "New Appointment" button in header menu. The "New Appointment" modal window opens and contains current date and current one hour interval in header.', async ({pageManager}) => {
    await OpenCalendarTabAndClickNewItemButton({pageManager});
    const dateWithTimeIntervalInAppointment = await pageManager.newAppointment.Elements.DateWithTimeInervalInHeader.innerText();
    const dateTimeInAppointment = new Date(dateWithTimeIntervalInAppointment.split(' -')[0]);
    const currentDateTime = new Date();
    const timeDifferenceInMinutes = Math.floor((currentDateTime.getTime() - dateTimeInAppointment.getTime()) / 60000);
    if ( timeDifferenceInMinutes === 1 || timeDifferenceInMinutes === 2) {
      currentDateTime.setMinutes(currentDateTime.getMinutes() - timeDifferenceInMinutes);
    };
    await expect(pageManager.newAppointment.Elements.DateWithTimeInervalInHeader).toHaveText(formatDateToStringWithOneHourInterval(currentDateTime), {useInnerText: true});
  });

  test('TC330. Create Appointment with repeat option "Every week". Appointment repeats one time every week in calendar.', async ({pageManager}) => {
    BaseTest.doubleTimeout();
    await OpenCalendarTabAndClickNewItemButton({pageManager});
    await pageManager.newAppointment.SendAppointment(appointmentTitle, appointmentBody, undefined, undefined, undefined, '12:00 PM', pageManager.newAppointment.RepeatOptions.EveryWeek);
    await SelectOnlyCalendarAndWeekView({pageManager});
    await expect(pageManager.calendar.Elements.AppointmentWithTitle(appointmentTitle)).toHaveCount(1);
    await pageManager.calendar.Elements.NextDateArrow.click();
    await expect(pageManager.calendar.Elements.AppointmentWithTitle(appointmentTitle)).toHaveCount(1);
  });

  test('TC333. Create appointment with setting start date via datepicker. Start date in appointment popup matches with date that was selected in datepicker.', async ({pageManager}) => {
    const dayOfMonth = 15;
    const startTime = '12:15 PM';
    const endTime = '1:15 PM';
    await OpenCalendarTabAndClickNewItemButton({pageManager});
    await pageManager.newAppointment.Buttons.StartDatePicker.click();
    await pageManager.newAppointment.DatePickerElements.NextMonth.click();
    const monthAndYear = await pageManager.newAppointment.DatePickerElements.MonthAndYear.textContent();
    const [month, year] = monthAndYear.split(' ');
    const DateWithTimeInervalExpected = new Date(`${dayOfMonth} ${monthAndYear}`).toLocaleDateString('en', {weekday: 'long'}) + ', ' + `${month} ${dayOfMonth}, ${year} ${startTime} - ${endTime}`;
    await pageManager.newAppointment.SelectDayOfMonth(dayOfMonth);
    await pageManager.newAppointment.SelectTime(startTime);
    await SendAppointmentViaUIAndSelectOnlyCalendar({pageManager}, appointmentTitle, appointmentBody);
    await pageManager.calendar.SelectCalendarView(calendarView.Month);
    await pageManager.calendar.Elements.NextDateArrow.click();
    await pageManager.calendar.OpenAppointmentInfoPopup(appointmentTitle);
    await expect(pageManager.calendar.AppointmentPopup.DateWithTimeInerval).toContainText(DateWithTimeInervalExpected);
  });

  test('TC334. Create appointment via click on time slot in calendar in "WEEK" view. Appointment is displayed in calendar.', async ({pageManager}) => {
    const numberOfMondayNoonTimeSlotInWeekView = 72;
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await SelectOnlyCalendarAndWeekView({pageManager});
    await pageManager.calendar.Elements.NextDateArrow.click();
    await pageManager.calendar.Elements.TimeSlot.nth(numberOfMondayNoonTimeSlotInWeekView).click({force: true});
    await SendAppointmentViaUIAndSelectOnlyCalendar({pageManager}, appointmentTitle, appointmentBody);
    await expect(pageManager.calendar.Elements.AppointmentWithTitle(appointmentTitle)).toBeVisible();
  });

  test('TC335. Create appointment with "All day" checkbox selected. "All day" string is presented in date in appointment popup.', async ({pageManager}) => {
    await OpenCalendarTabAndClickNewItemButton({pageManager});
    await pageManager.newAppointment.CheckBoxes.AllDay.click();
    await SendAppointmentViaUIAndSelectOnlyCalendar({pageManager}, appointmentTitle, appointmentBody);
    await pageManager.calendar.SelectCalendarView(calendarView.Week);
    await pageManager.calendar.OpenAppointmentInfoPopup(appointmentTitle);
    await expect(await pageManager.calendar.AppointmentPopup.DateWithTimeInerval).toContainText('All day');
  });

  test('TC336. Create appointment with "All day" checkbox selected. Appointment is displayed in "all day" cell in calendar in "WEEK" view.', async ({pageManager}) => {
    await OpenCalendarTabAndClickNewItemButton({pageManager});
    await pageManager.newAppointment.CheckBoxes.AllDay.click();
    await SendAppointmentViaUIAndSelectOnlyCalendar({pageManager}, appointmentTitle, appointmentBody);
    await pageManager.calendar.SelectCalendarView(calendarView.Week);
    await expect(pageManager.calendar.Elements.AllDayAppointment.locator(`"${appointmentTitle}"`)).toBeVisible();
  });

  test('TC337. Create appointment via click on "all day" cell in calendar in "WEEK" view. Appointment modal window opens with "All day" checkbox selected.', async ({pageManager}) => {
    const numberOfMondayAllDayCellInMonthView = 1;
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await SelectOnlyCalendarAndWeekView({pageManager});
    await pageManager.calendar.Elements.NextDateArrow.click();
    await pageManager.calendar.Elements.AllDayCell.nth(numberOfMondayAllDayCellInMonthView).click({force: true});
    await expect(pageManager.newAppointment.CheckBoxes.AllDayCheckboxIcon).toHaveAttribute('data-testid', 'icon: CheckmarkSquare');
  });

  function formatDateToStringWithOneHourInterval(date: Date): string {
    // example of function return: Tuesday, 03 January, 2023 09:12 - 10:12
    const datePlus1Hour = new Date(date).setHours(date.getHours() + 1);
    const dateStringWithoutTime = new Intl.DateTimeFormat("en-GB", {weekday: 'long', day: '2-digit', month: 'long'}).format(date) + ', ' + new Intl.DateTimeFormat("en-GB", {year: 'numeric'}).format(date);
    const timeOneHourIntervalString = new Intl.DateTimeFormat("en-GB", {timeStyle: 'short'}).format(date) + ' - ' + new Intl.DateTimeFormat("en-GB", {timeStyle: 'short'}).format(datePlus1Hour);
    return dateStringWithoutTime + ' ' + timeOneHourIntervalString;
  };

  async function OpenCalendarTabAndClickNewItemButton({pageManager}) {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await pageManager.headerMenu.Buttons.NewItem.click();
  };

  async function CreateAppointmentAndSelectOnlyCalendar({pageManager, page}, privateApp?, location?) {
    await OpenCalendarTabAndClickNewItemButton({pageManager});
    await pageManager.newAppointment.SendAppointment(appointmentTitle, appointmentBody, undefined, privateApp, location);
    await pageManager.calendar.Elements.ActionWithAppointmentNotification.waitFor();
    const elementHandle = await page.$(pageManager.calendar.Elements.ActionWithAppointmentNotification._selector);
    await elementHandle?.waitForElementState('hidden');
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyCalendar();
  };

  async function AppointmentInTheTrashValidation({pageManager}) {
    await expect(pageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).not.toBeVisible();
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyTrash();
    await pageManager.calendar.SelectCalendarView(calendarView.Week);
    await expect(pageManager.calendar.Elements.Appointment.locator(`"${appointmentTitle}"`)).toHaveCount(1);
  };

  async function CreateAppointmentViaApiAndSelectOnlyCalendar({pageManager, apiManager}) {
    const runtimeAppoinmentId = await apiManager.createCalendarAPI.CreateAppointmentRequest(appointmentTitle, BaseTest.userForLogin.login, '3', appointmentBody);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyCalendar();
    return runtimeAppoinmentId;
  };

  async function SelectOnlyCalendarAndWeekView({pageManager}) {
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyCalendar();
    await pageManager.calendar.SelectCalendarView(calendarView.Week);
  };

  async function SendAppointmentViaUIAndSelectOnlyCalendar({pageManager}, appointmentTitle: string, appointmentBody: string) {
    await await pageManager.newAppointment.SendAppointment(appointmentTitle, appointmentBody);
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyCalendar();
  }
});
