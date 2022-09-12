import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';

test.describe('Calendars tests', async () => {
  let dateTimePrefix;
  let appointmentTitle;
  const calendarView = {
    Day: "DAY",
    Week: "WEEK",
    WorkWeek: "WORK WEEK",
    Month: "MONTH",
  };

  test.beforeAll(async ({page, apiManager}) => {
    const allAppionmentsIds = await apiManager.calendarAPI.GetAllAppointments(BaseTest.userForLogin.login);
    await Promise.all(allAppionmentsIds.map(async (id) => {
      return await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    }));
  });

  test.beforeEach(async ({pageManager}) => {
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    appointmentTitle = dateTimePrefix + ' Autotest Appointment Title';
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
  });

  test.afterEach(async ({page, apiManager}) => {
    await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, runtimeAppoinmentId, BaseTest.userForLogin.login);
    const id = await apiManager.calendarAPI.CalendarSearchQuery(appointmentTitle, BaseTest.userForLogin.login);
    await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    await page.close();
  });

  test('Calendar view: "Work week" is a default view', async ({pageManager}) => {
    await expect(await pageManager.calendar.Elements.ActiveViewButton, '"Work Week" button should be preselected by default').toBeVisible();
  });

  test('Calendar view: Current Date is selected on the Calendar', async ({pageManager}) => {
    await pageManager.calendar.SelectCalendarView(calendarView.Day);
    const currentMonthAndDateOnUI = await pageManager.calendar.Elements.CurrentDate.innerText().valueOf();
    const currentMonthAndDate = await pageManager.calendar.CalculateCurrentDate();
    await expect(currentMonthAndDateOnUI).toBe(currentMonthAndDate);
  });

  test('Calendar view: Day', async ({pageManager}) => {
    await pageManager.calendar.SelectCalendarView(calendarView.Day);
    await expect(pageManager.calendar.Elements.Cell, 'Calendar have to contain 1 Cell').toHaveCount(1);
    await expect(pageManager.calendar.Elements.Column, 'Calendar have to consist of 2 Columns').toHaveCount(2);
  });

  test('Calendar view: Week', async ({pageManager}) => {
    await pageManager.calendar.SelectCalendarView(calendarView.Week);
    await expect(pageManager.calendar.Elements.Cell, 'Calendar have to contain 7 Cell').toHaveCount(7);
    await expect(pageManager.calendar.Elements.Column, 'Calendar have to consist of 8 Columns').toHaveCount(8);
  });

  test('Calendar view: Work Week', async ({pageManager, page}) => {
    await pageManager.calendar.SelectCalendarView(calendarView.WorkWeek);
    await BaseTest.waitForLoaderSpinnerHidden(page);
    await expect(pageManager.calendar.Elements.Cell, 'Calendar have to contain 5 Cell').toHaveCount(5);
    await expect(pageManager.calendar.Elements.Column, 'Calendar have to consist of 6 Columns').toHaveCount(6);
  });

  test('Calendar view: Month', async ({pageManager}) => {
    await pageManager.calendar.SelectCalendarView(calendarView.Month);
    await expect(pageManager.calendar.Elements.Cell, 'Calendar have to contain 35 Cell').toHaveCount(35);
  });

  test('Calendar view: Current Day Schedule is displayed by "TODAY" button clicking', async ({pageManager}) => {
    const currentMonthAndDate = await pageManager.calendar.CalculateCurrentDate();
    await pageManager.calendar.SelectCalendarView(calendarView.Day);
    await pageManager.calendar.Elements.NextDateArrow.click({clickCount: 3});
    await pageManager.calendar.Elements.TodayButton.click();
    const currentMonthAndDateOnUI = await pageManager.calendar.Elements.CurrentDate.innerText().valueOf();
    await expect(currentMonthAndDateOnUI, 'Calendar Date must match the current date').toBe(currentMonthAndDate);
  });
});