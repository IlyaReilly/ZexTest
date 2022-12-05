import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class Calendar extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator(InheritedFields.WorkspaceContainerLocator),
    AppointmentPopupContainer: this.page.locator('[data-testid="popper"]'),
    OtherActionsContainer: this.page.locator(InheritedFields.DropdownListLocator),
    ModalContainer: this.page.locator(InheritedFields.ModalWindowLocator),
    CalendarView: this.page.locator('div:has([class^="custom-toolbar"])'),
  };

  Selectors = {
    PrivateAppLockIconSelector: this.page.locator('[data-testid*="Lock"]'),
    NeedActionsIconSelector: this.page.locator('[data-testid*="CalendarWarning"]'),
    TagIconSelector: this.page.locator('[data-testid="TagIcon"]'),
  };

  Elements = {
    Appointment: this.Containers.MainContainer.locator('[class="rbc-event"]'),
    CurrentDate: this.Containers.MainContainer.locator('[class^="Text__Comp"] >> nth=1'),
    Cell: this.Containers.MainContainer.locator('.rbc-day-bg'),
    Column: this.Containers.MainContainer.locator('.rbc-time-column'),
    ActiveViewButton: this.Containers.MainContainer.locator('_react=[backgroundColor="highlight"] >> nth=0'),
    NextDateArrow: this.Containers.MainContainer.locator('[data-testid*="ChevronRight"]'),
    TodayButton: this.Containers.MainContainer.locator('button:has-text("today")'),
    DayButton: this.Containers.MainContainer.locator('"Day"'),
    NextDay: this.Containers.MainContainer.locator('xpath=//div[contains(@class, "custom-event-wrapper")]/../../../following-sibling::div[1]'),
    PreviousDay: this.Containers.MainContainer.locator('xpath=//div[contains(@class, "custom-event-wrapper")]/../../../preceding-sibling::div[1]'),
  };

  AppointmentPopup = {
    EditButton: this.Containers.AppointmentPopupContainer.locator('"Edit"'),
    OtherActionsDropdown: this.Containers.AppointmentPopupContainer.locator('"Other actions"'),
    OtherActionsDelete: this.Containers.OtherActionsContainer.locator('"Delete"'),
    OtherActionsDeletePermanently: this.Containers.OtherActionsContainer.locator('"Delete permanently"'),
    OtherActionsOpenInDisplayer: this.Containers.OtherActionsContainer.locator('"Open in Displayer"'),
    OtherActionsMove: this.Containers.OtherActionsContainer.locator('"Move"'),
    OtherActionsTags: this.Containers.OtherActionsContainer.locator('"Tags"'),
    NewTagButton: this.Containers.OtherActionsContainer.locator('"New Tag"'),
  };

  ReminderPopup = {
    Dismiss: this.Containers.ModalContainer.locator('"DISMISS"'),
    SetNewTime: this.Containers.ModalContainer.locator('_react=[icon="ClockOutline"]'),
  };

  DeletePopups = {
    EditMessageButton: this.Containers.ModalContainer.locator('"Edit Message"'),
    SendCancellationButton: this.Containers.ModalContainer.locator('"Send Cancellation"'),
    DeletePermanentlyButton: this.Containers.ModalContainer.locator('"Delete permanently"'),
  };

  async DragAndDropAppointment(appointmentTitle) {
    if (await this.page.isVisible(this.Elements.NextDay._selector)) {
      await this.Elements.Appointment.locator(`"${appointmentTitle}"`).dragTo(this.Elements.NextDay);
    } else {
      await this.Elements.Appointment.locator(`"${appointmentTitle}"`).dragTo(this.Elements.PreviousDay);
    };
  };

  async GetAppointmentWithTitle(title) {
    return await this.page.locator(this.Elements.Appointment._selector, {hasText: title});
  };

  async CloseReminderPopup() {
    if (await this.Containers.ModalContainer.isVisible() === true) {
      await this.ReminderPopup.Dismiss.click();
    };
  };

  async SelectCalendarView(calendarViewTitle) {
    await this.Containers.CalendarView.locator(`"${calendarViewTitle}"`).click();
  };

  async OpenAppointmentInfoPopup(appointmentTitle) {
    await this.Elements.Appointment.locator(`"${appointmentTitle}"`).waitFor();
    await this.Elements.Appointment.locator(`"${appointmentTitle}"`).click();
  };

  async OpenAppointmentOtherActions(appointmentTitle) {
    await this.OpenAppointmentInfoPopup(appointmentTitle);
    await this.AppointmentPopup.OtherActionsDropdown.click();
  };

  async DeleteAppointmentToTrash(appointmentTitle) {
    await this.OpenAppointmentOtherActions(appointmentTitle);
    await this.AppointmentPopup.OtherActionsDelete.click();
    await this.DeletePopups.SendCancellationButton.click();
  };

  async DeleteAppointmentPermanently(appointmentTitle) {
    await this.OpenAppointmentInfoPopup(appointmentTitle);
    await this.AppointmentPopup.OtherActionsDropdown.click();
    await this.AppointmentPopup.OtherActionsDeletePermanently.click();
    await this.DeletePopups.DeletePermanentlyButton.click();
  };

  async OpenModalForCreateTag(appointmentTitle) {
    await this.OpenAppointmentOtherActions(appointmentTitle);
    await this.AppointmentPopup.OtherActionsTags.hover();
    await this.AppointmentPopup.NewTagButton.click();
  };

  async CalculateCurrentDate() {
    const today = new Date();
    const weekDay = today.toLocaleString('en-US', {weekday: "long"}).toUpperCase();
    const monthAndDate = String(today).slice(4, 10).toUpperCase();
    const weekDayMonthDate = weekDay + ' ' + monthAndDate;
    return weekDayMonthDate;
  };
}
