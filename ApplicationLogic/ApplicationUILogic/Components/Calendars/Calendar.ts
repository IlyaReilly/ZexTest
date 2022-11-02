import {BasePage} from '../../Pages/BasePage';

export class Calendar extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('.kXEGgY'),
    AppointmentPopupContainer: this.page.locator('[data-testid="popper"]'),
    OtherActionsContainer: this.page.locator('[data-testid="dropdown-popper-list"]'),
    PopupContainer: this.page.locator('.hpDDMC'),
    ReminderPopupContainer: this.page.locator('.fKWHjI .loeZsV'),
    CalendarView: this.page.locator('.ipjITR'),
  };

  Selectors = {
    PrivateAppLockIconSelector: this.page.locator('[data-testid*="Lock"]'),
    NeedActionsIconSelector: this.page.locator('[data-testid*="CalendarWarning"]'),
  };

  Elements = {
    Appointment: this.Containers.MainContainer.locator('.fSWXaB'),
    CurrentDate: this.Containers.MainContainer.locator('.hOgGwK .jAbdqn'),
    Cell: this.Containers.MainContainer.locator('.rbc-day-bg'),
    Column: this.Containers.MainContainer.locator('.rbc-time-column'),
    ActiveViewButton: this.Containers.MainContainer.locator('.jFGWhz'),
    NextDateArrow: this.Containers.MainContainer.locator('[data-testid*="ChevronRight"]'),
    TodayButton: this.Containers.MainContainer.locator('button:has-text("today")'),
  };

  AppointmentPopup = {
    EditButton: this.Containers.AppointmentPopupContainer.locator('"Edit"'),
    OtherActionsDropdown: this.Containers.AppointmentPopupContainer.locator('"Other actions"'),
    OtherActionsDelete: this.Containers.OtherActionsContainer.locator('"Delete"'),
    OtherActionsDeletePermanently: this.Containers.OtherActionsContainer.locator('"Delete permanently"'),
    OtherActionsOpenInDisplayer: this.Containers.OtherActionsContainer.locator('"Open in Displayer"'),
    OtherActionsTags: this.Containers.OtherActionsContainer.locator('"Tags"'),
  };

  ReminderPopup = {
    DismissButton: this.Containers.ReminderPopupContainer.locator('"DISMISS"'),
    SetNewTime: this.Containers.ReminderPopupContainer.locator('.bOlfsx'),
  };

  DeletePopups = {
    EditMessageButton: this.Containers.PopupContainer.locator('"Edit Message"'),
    SendCancellationButton: this.Containers.PopupContainer.locator('"Send Cancellation"'),
    DeletePermanentlyButton: this.Containers.PopupContainer.locator('"Delete permanently"'),
  };

  async GetAppointmentWithTitle(title) {
    return await this.page.locator(this.Elements.Appointment._selector, {hasText: title});
  };

  async CloseReminderPopup() {
    if (await this.Containers.ReminderPopupContainer.isVisible() === true) {
      await this.ReminderPopup.DismissButton.click();
    };
  };

  async SelectCalendarView(calendarViewTitle) {
    await this.Containers.CalendarView.locator(`"${calendarViewTitle}"`).click();
  };

  async OpenAppointmentInfoPopup(appointmentTitle) {
    await this.Elements.Appointment.locator(`"${appointmentTitle}"`).waitFor();
    await this.Elements.Appointment.locator(`"${appointmentTitle}"`).click();
  };

  async MoveAppointmentToTrash(appointmentTitle) {
    await this.OpenAppointmentInfoPopup(appointmentTitle);
    await this.AppointmentPopup.OtherActionsDropdown.click();
    await this.AppointmentPopup.OtherActionsDelete.click();
    await this.DeletePopups.SendCancellationButton.click();
  };

  async DeleteAppointmentPermanently(appointmentTitle) {
    await this.OpenAppointmentInfoPopup(appointmentTitle);
    await this.AppointmentPopup.OtherActionsDropdown.click();
    await this.AppointmentPopup.OtherActionsDeletePermanently.click();
    await this.DeletePopups.DeletePermanentlyButton.click();
  };

  async CalculateCurrentDate() {
    const today = new Date();
    const weekDay = today.toLocaleString('en-US', {weekday: "long"}).toUpperCase();
    const monthAndDate = String(today).slice(4, 10).toUpperCase();
    const weekDayMonthDate = weekDay + ' ' + monthAndDate;
    return weekDayMonthDate;
  };
}
