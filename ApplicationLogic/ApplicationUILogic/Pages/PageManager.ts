import {LoginPage} from './LoginPage';
import {HeaderMenu} from '../Components/HeaderMenu';
import {NewMail} from '../Components/Mails/NewMail';
import {NewAppointment} from '../Components/Calendars/NewAppointment';
import {SideMenu} from '../Components/SideMenu';
import {SideSecondaryMailMenu} from '../Components/Mails/SideSecondaryMailMenu';
import {SideSecondaryCalendarMenu} from '../Components/Calendars/SideSecondaryCalendarMenu';
import {MailsList} from '../Components/Mails/MailsList';
import {Calendar} from '../Components/Calendars/Calendar';
import { SideSecondaryChatsMenu } from '../Components/Chats/SideSecondaryChatsMenu';
import { NewChatsItem } from '../Components/Chats/NewChatsItem';

export class PageManager {
    //#region Pages
    async getLoginPage(page){
        return await new LoginPage(page);
    }
    //#endregion

    //#region Main Components
  async getHeaderMenuComponent(page) {
    return await new HeaderMenu(page);
  }

    async getSideMenuComponent(page){
        return await new SideMenu(page);
    }
    //#endregion

    //#region Mail Components
  async getNewMailComponent(page) {
    return await new NewMail(page);
  }

    async getSideSecondaryMailMenuComponent(page){
        return await new SideSecondaryMailMenu(page);
  }

    async getMailsListComponent(page){
        return await new MailsList(page);
  }
    //#endregion

    //#region Calendar Components
    async getNewAppointmentComponent(page){
        return await new NewAppointment(page);
  }

  async getSideSecondaryCalendarMenuComponent(page) {
    return await new SideSecondaryCalendarMenu(page);
  }

  async getCalendarComponent(page) {
    return await new Calendar(page);
  }
    //#endregion

    //#region Calendar Components
    async getNewChatsItemComponent(page){
        return await new NewChatsItem(page);
    }

    async getSideSecondaryChatsMenuComponent(page){
        return await new SideSecondaryChatsMenu(page);
    }
    //#endregion
}
