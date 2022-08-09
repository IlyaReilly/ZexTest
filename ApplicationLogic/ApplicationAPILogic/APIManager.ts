import {CalendarAPI} from './CalendarAPI';
import {MailsAPI} from './MailsAPI';
import {ChatsAPI} from './ChatsAPI';
import {FilesAPI} from './FilesAPI';

export class APIManager {
  async getMailsAPI(page) {
    return await new MailsAPI(page);
  }

  async getCalendarAPI(page) {
    return await new CalendarAPI(page);
  }

  async getChatsAPI(page) {
    return await new ChatsAPI(page);
  }

  async getFilesAPI(page) {
    return await new FilesAPI(page);
  }
}
