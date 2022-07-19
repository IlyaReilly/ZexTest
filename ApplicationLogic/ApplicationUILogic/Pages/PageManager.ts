import {LoginPage} from './LoginPage';
import { HeaderMenu } from '../Components/HeaderMenu';

export class PageManager {

    async getLoginPage(page){
        return await new LoginPage(page);
    }

    async getHeaderMenuComponent(page){
        return await new HeaderMenu(page);
    }
}