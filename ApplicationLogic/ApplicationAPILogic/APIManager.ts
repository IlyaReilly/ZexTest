import {Page} from '@playwright/test';
import {CalendarAPI} from './CalendarAPI';
import {MailsAPI} from './MailsAPI';
import {ChatsAPI} from './ChatsAPI';
import {FilesAPI} from './FilesAPI';
import {ContactsAPI} from './ContactsAPI';
import {UsersAPI} from './UsersAPI';
import {FoldersAPI} from './FoldersAPI';
import {AddressBookAPI} from './AddressBooksAPI';

export class APIManager {
  page: Page;
  mailsAPI;
  calendarAPI;
  chatsAPI;
  filesAPI;
  сontactsAPI;
  usersAPI;
  foldersAPI;
  addressBookAPI;

  constructor(page) {
    this.page = page;
    this.mailsAPI = new MailsAPI(this.page);
    this.calendarAPI = new CalendarAPI(this.page);
    this.chatsAPI = new ChatsAPI(this.page);
    this.filesAPI = new FilesAPI(this.page);
    this.сontactsAPI = new ContactsAPI(this.page);
    this.usersAPI = new UsersAPI(this.page);
    this.foldersAPI = new FoldersAPI(this.page);
    this.addressBookAPI = new AddressBookAPI(this.page);
  };
}
