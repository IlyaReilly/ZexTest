import {LoginPage} from './LoginPage';
import {HeaderMenu} from '../Components/HeaderMenu';
import {NewMail} from '../Components/Mails/NewMail';
import {NewAppointment} from '../Components/Calendars/NewAppointment';
import {SideMenu} from '../Components/SideMenu';
import {SideSecondaryMailMenu} from '../Components/Mails/SideSecondaryMailMenu';
import {SideSecondaryCalendarMenu} from '../Components/Calendars/SideSecondaryCalendarMenu';
import {MailsList} from '../Components/Mails/MailsList';
import {Calendar} from '../Components/Calendars/Calendar';

export class PageManager {
  async getLoginPage(page) {
    return await new LoginPage(page);
  }

  async getHeaderMenuComponent(page) {
    return await new HeaderMenu(page);
  }

  async getNewMailComponent(page) {
    return await new NewMail(page);
  }

  async getNewAppointmentComponent(page) {
    return await new NewAppointment(page);
  }


  async getSideMenuComponent(page) {
    return await new SideMenu(page);
  }

  async getSideSecondaryMailMenuComponent(page) {
    return await new SideSecondaryMailMenu(page);
  }

  async getSideSecondaryCalendarMenuComponent(page) {
    return await new SideSecondaryCalendarMenu(page);
  }

  async getMailsListComponent(page) {
    return await new MailsList(page);
  }

  async getCalendarComponent(page) {
    return await new Calendar(page);
  }
}
