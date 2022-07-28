import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class Calendar extends BasePage {
    Containers = {
        MainContainer: this.page.locator('.cPoMlt'),
        AppointmentPopupContainer: this.page.locator('.gqODaH'),
        OtherActionsContainer: this.page.locator('.izBNKP'),
    };

    Elements = {
        Appointment: this.Containers.MainContainer.locator('.jNpaYv'),
    };

    AppointmentPopup = {
        EditButton: this.Containers.AppointmentPopupContainer.locator('"EDIT"'),
        OtherActionsDropdown: this.Containers.AppointmentPopupContainer.locator('"OTHER ACTIONS"'),
        OtherActionsDelete: this.Containers.OtherActionsContainer.locator('"Delete"'),
        OtherActionsOpenInDisplayer: this.Containers.OtherActionsContainer.locator('"Open in Displayer"'),
        OtherActionsTags: this.Containers.OtherActionsContainer.locator('"Tags"'),
    };
 
    constructor(page){
        super(page);
    }

    async OpenAppointmentInfoPopup(appointmentTitle){
        await this.Elements.Appointment.locator(`"${appointmentTitle}"`).click();
    }

    async MoveAppointmentToTrash(appointmentTitle){
        await this.OpenAppointmentInfoPopup(appointmentTitle);
        await this.AppointmentPopup.OtherActionsDropdown.click();
        await this.AppointmentPopup.OtherActionsDelete.click();
    }
}