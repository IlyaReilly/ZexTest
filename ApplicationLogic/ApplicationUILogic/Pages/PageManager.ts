import {LoginPage} from './LoginPage';
import { HeaderMenu } from '../Components/HeaderMenu';
import { NewMail } from '../Components/Mails/NewMail';
import { SideMenu } from '../Components/SideMenu';
import { SideSecondaryMailMenu } from '../Components/Mails/SideSecondaryMailMenu';
import { MailsList } from '../Components/Mails/MailsList';

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

    async getSideMenuComponent(page){
        return await new SideMenu(page);
    }

    async getSideSecondaryMailMenuComponent(page){
        return await new SideSecondaryMailMenu(page);
    }

    async getMailsListComponent(page){
        return await new MailsList(page);
    }
}