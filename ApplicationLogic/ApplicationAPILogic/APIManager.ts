import {Page} from '@playwright/test';
import {CalendarAPI} from './CalendarAPI';
import {MailsAPI} from './MailsAPI';
import {ChatsAPI} from './ChatsAPI';
import {FilesAPI} from './FilesAPI';

export class APIManager {
  page: Page;
  mailsAPI;
  calendarAPI;
  chatsAPI;
  filesAPI;

  constructor(page) {
    this.page = page;
    this.mailsAPI = new MailsAPI(this.page);
    this.calendarAPI = new CalendarAPI(this.page);
    this.chatsAPI = new ChatsAPI(this.page);
    this.filesAPI = new FilesAPI(this.page);
  }
}
