import {HomePage} from './HomePage';
import {LoginPage} from './LoginPage';
import { CheckableResultsPage } from './CheckableResultsPage';
import { MainMenu } from '../Components/MainMenu';
import { DAPPage } from './DAPPage';
import { TwitterPage } from './TwitterPage';

export class PageManager {

    async getLoginPage(page){
        return await new LoginPage(page);
    }

    async getHomePage(page){
        return await new HomePage(page);
    }

    async getMainMenuComponent(page){
        return await new MainMenu(page);
    }

    async getCheckableResultsPage(page){
        return await new CheckableResultsPage(page);
    }
    
    async getDAPPage(page){
        return await new DAPPage(page);
    }

    async getTwitterPage(page){
        return await new TwitterPage(page);
    }
}