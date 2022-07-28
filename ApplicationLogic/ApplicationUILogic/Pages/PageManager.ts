import {LoginPage} from './LoginPage';
import { HeaderMenu } from '../Components/HeaderMenu';
import { NewMail } from '../Components/Mails/NewMail';
import { NewAppointment } from '../Components/Calendars/NewAppointment';
import { SideMenu } from '../Components/SideMenu';
import { SideSecondaryMailMenu } from '../Components/Mails/SideSecondaryMailMenu';
import { SideSecondaryCalendarMenu } from '../Components/Calendars/SideSecondaryCalendarMenu';
import { SideSecondaryContactsMenu } from '../Components/Contacts/SideSecondaryContactsMenu';
import { MailsList } from '../Components/Mails/MailsList';
import { Calendar } from '../Components/Calendars/Calendar';
import { NewContact } from '../Components/Contacts/NewContact';
import { Contacts } from '../Components/Contacts/Contacts';

export class PageManager {

    async getLoginPage(page){
        return await new LoginPage(page);
    }

    async getHeaderMenuComponent(page){
        return await new HeaderMenu(page);
    }

    async getNewMailComponent(page){
        return await new NewMail(page);
    }

    async getNewAppointmentComponent(page){
        return await new NewAppointment(page);
    }

    async getNewContactComponent(page) {
        return await new NewContact(page);
    }

    async getContactsComponent(page) {
        return await new Contacts(page);
    }

    async getSideMenuComponent(page){
        return await new SideMenu(page);
    }

    async getSideSecondaryMailMenuComponent(page){
        return await new SideSecondaryMailMenu(page);
    }

    async getSideSecondaryCalendarMenuComponent(page){
        return await new SideSecondaryCalendarMenu(page);
    }

    async getSideSecondaryContactsMenuComponent(page){
        return await new SideSecondaryContactsMenu (page);
    }

    async getMailsListComponent(page){
        return await new MailsList(page);
    }

    async getCalendarComponent(page){
        return await new Calendar(page);
    }
}