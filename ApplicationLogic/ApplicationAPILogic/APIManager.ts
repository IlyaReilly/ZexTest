import { CalendarAPI } from './CalendarAPI';
import {MailsAPI} from './MailsAPI';

export class APIManager {

    async getMailsAPI(page){
        return await new MailsAPI(page);
    }

    async getCalendarAPI(page){
        return await new CalendarAPI(page);
    }
}