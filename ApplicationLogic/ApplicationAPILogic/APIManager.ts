import {MailsAPI} from './MailsAPI';

export class APIManager {

    async getMailsAPI(page){
        return await new MailsAPI(page);
    }
}