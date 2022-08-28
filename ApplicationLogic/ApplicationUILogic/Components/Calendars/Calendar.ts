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

  Elements = {
    Appointment: this.Containers.MainContainer.locator('.cpLtAp'),
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
    DismissButton: this.Containers.ReminderPopupContainer.locator('"DISMISS"'), // .ejIaaY .cGzJpD
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

  async CloseReminderPopup() {
    if (await this.Containers.ReminderPopupContainer.isVisible() === true) {
      await this.ReminderPopup.DismissButton.click();
    }
  }

  async SelectCalendarView(calendarViewTitle) {
    this.Containers.CalendarView.locator(`"${calendarViewTitle}"`).click();
  }

  async OpenAppointmentInfoPopup(appointmentTitle) {
    const appointmentLocator = this.Elements.Appointment.locator(`"${appointmentTitle}"`);
    const appointmentElement = await this.page.waitForSelector(appointmentLocator._selector, {state: 'attached'});
    await appointmentElement.evaluate((el) => el.style.display = 'inline');
    await appointmentElement.evaluate((el) => el.style.visibility = 'visible');
    await appointmentElement.evaluate((el) => el.click());
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
}
