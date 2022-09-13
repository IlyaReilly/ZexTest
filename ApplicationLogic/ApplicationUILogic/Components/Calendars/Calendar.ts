import {BasePage} from '../../Pages/BasePage';

export class Calendar extends BasePage {
  Containers = {
    MainContainer: this.page.locator('.cPoMlt'),
    AppointmentPopupContainer: this.page.locator('.gqODaH'),
    OtherActionsContainer: this.page.locator('.izBNKP'),
    PopupContainer: this.page.locator('.loeZsV'),
    ReminderPopupContainer: this.page.locator('.fKWHjI .loeZsV'),
    CalendarView: this.page.locator('.dIeVeP'),
  };

  Selectors = {
    PrivateAppLockIconSelector: '[data-testid*="Lock"]',
    NeedActionsIconSelector: '[data-testid*="CalendarWarning"]',
  };

  Elements = {
    Appointment: this.Containers.MainContainer.locator('.hIcxKG'),
    CurrentDate: this.Containers.MainContainer.locator('.iVBcdo .cGzJpD'),
    Cell: this.Containers.MainContainer.locator('.rbc-day-bg'),
    Column: this.Containers.MainContainer.locator('.rbc-time-column'),
    ActiveViewButton: this.Containers.MainContainer.locator('.iZsIAW'),
    NextDateArrow: this.Containers.MainContainer.locator('[data-testid*="ChevronRight"]'),
    TodayButton: this.Containers.MainContainer.locator('.iPEbcU'),
  };

  AppointmentPopup = {
    EditButton: this.Containers.AppointmentPopupContainer.locator('"EDIT"'),
    OtherActionsDropdown: this.Containers.AppointmentPopupContainer.locator('"OTHER ACTIONS"'),
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
    EditMessageButton: this.Containers.PopupContainer.locator('"EDIT MESSAGE"'),
    SendCancellationButton: this.Containers.PopupContainer.locator('"SEND CANCELLATION"'),
    DeletePermanentlyButton: this.Containers.PopupContainer.locator('"DELETE PERMANENTLY"'),
  };

  constructor(page) {
    super(page);
  }

  async GetAppointmentWithTitle(title) {
    return await this.page.locator(this.Elements.Appointment._selector, {hasText: title});
  }

  async CloseReminderPopup() {
    if (await this.Containers.ReminderPopupContainer.isVisible() === true) {
      await this.ReminderPopup.DismissButton.click();
    }
  }

  async SelectCalendarView(calendarViewTitle) {
    await this.Containers.CalendarView.locator(`"${calendarViewTitle}"`).click();
  }

  async OpenAppointmentInfoPopup(appointmentTitle) {
    const appointmentLocator = this.Elements.Appointment.locator(`"${appointmentTitle}"`);
    const appointmentElement = await this.page.waitForSelector(appointmentLocator._selector, {state: 'attached'});
    await appointmentElement.evaluate((el) => el.style.display = 'inline');
    await appointmentElement.evaluate((el) => el.style.visibility = 'visible');
    await this.CloseReminderPopup();
    await this.Elements.Appointment.locator(`"${appointmentTitle}"`).click();
  }

  async MoveAppointmentToTrash(appointmentTitle) {
    await this.OpenAppointmentInfoPopup(appointmentTitle);
    await this.AppointmentPopup.OtherActionsDropdown.click();
    await this.AppointmentPopup.OtherActionsDelete.click();
    await this.DeletePopups.SendCancellationButton.click();
  }

  async DeleteAppointmentPermanently(appointmentTitle) {
    await this.OpenAppointmentInfoPopup(appointmentTitle);
    await this.AppointmentPopup.OtherActionsDropdown.click();
    await this.AppointmentPopup.OtherActionsDeletePermanently.click();
    await this.DeletePopups.DeletePermanentlyButton.click();
  }

  async CalculateCurrentDate() {
    const today = new Date();
    const weekDay = today.toLocaleString('en-US', {weekday: "long"}).toUpperCase();
    const monthAndDate = String(today).slice(4, 10).toUpperCase();
    const weekDayMonthDate = weekDay + ' ' + monthAndDate;
    return weekDayMonthDate;
  }
}
