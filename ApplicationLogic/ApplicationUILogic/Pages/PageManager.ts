import {Page} from '@playwright/test';
import {LoginPage} from './LoginPage';
import {HeaderMenu} from '../Components/HeaderMenu';
import {NewMail} from '../Components/Mails/NewMail';
import {NewAppointment} from '../Components/Calendars/NewAppointment';
import {SideMenu} from '../Components/SideMenu';
import {SideSecondaryMailMenu} from '../Components/Mails/SideSecondaryMailMenu';
import {SideSecondaryCalendarMenu} from '../Components/Calendars/SideSecondaryCalendarMenu';
import {SideSecondaryContactsMenu} from '../Components/Contacts/SideSecondaryContactsMenu';
import {MailsList} from '../Components/Mails/MailsList';
import {Calendar} from '../Components/Calendars/Calendar';
import {NewContact} from '../Components/Contacts/NewContact';
import {Contacts} from '../Components/Contacts/Contacts';
import {SideSecondaryChatsMenu} from '../Components/Chats/SideSecondaryChatsMenu';
import {NewChatsItem} from '../Components/Chats/NewChatsItem';
import {SideSecondaryFilesMenu} from '../Components/Files/SideSecondaryFilesMenu';
import {FilesList} from '../Components/Files/FilesList';
import {FileDetails} from '../Components/Files/FileDetails';
import {MailDetails} from '../Components/Mails/MailDetails';
import {SearchResultDetails} from '../Components/Search/SearchResultDetails';
import {SearchResultsList} from '../Components/Search/SearchResultsList';
import {SearchStatisticsHeader} from '../Components/Search/SearchStatisticsHeader';

export class PageManager {
  page: Page;
  loginPage;
  searchResultDetails;
  searchResultsList;
  searchStatisticsHeader;
  newContact;
  contacts;
  sideSecondaryContactsMenu;
  headerMenu;
  sideMenu;
  newMail;
  sideSecondaryMailMenu;
  mailsList;
  mailDetails;
  newAppointment;
  sideSecondaryCalendarMenu;
  calendar;
  newChatsItem;
  sideSecondaryChatsMenu;
  sideSecondaryFilesMenu;
  filesList;
  fileDetails;

  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.searchResultDetails = new SearchResultDetails(page);
    this.searchResultsList = new SearchResultsList(page);
    this.searchStatisticsHeader = new SearchStatisticsHeader(page);
    this.newContact = new NewContact(page);
    this.contacts = new Contacts(page);
    this.sideSecondaryContactsMenu = new SideSecondaryContactsMenu(page);
    this.headerMenu = new HeaderMenu(page);
    this.sideMenu = new SideMenu(page);
    this.newMail = new NewMail(page);
    this.sideSecondaryMailMenu = new SideSecondaryMailMenu(page);
    this.mailsList = new MailsList(page);
    this.mailDetails = new MailDetails(page);
    this.newAppointment = new NewAppointment(page);
    this.sideSecondaryCalendarMenu = new SideSecondaryCalendarMenu(page);
    this.calendar = new Calendar(page);
    this.newChatsItem = new NewChatsItem(page);
    this.sideSecondaryChatsMenu = new SideSecondaryChatsMenu(page);
    this.sideSecondaryFilesMenu = new SideSecondaryFilesMenu(page);
    this.filesList = new FilesList(page);
    this.fileDetails = new FileDetails(page);
  }

  // #region Pages
  async getLoginPage(page) {
    return await new LoginPage(page);
  }
  // #endregion

  // #region Search
  async getSearchResultDetailsComponent(page) {
    return await new SearchResultDetails(page);
  }

  async getSearchResultsListComponent(page) {
    return await new SearchResultsList(page);
  }

  async getSearchStatisticsHeaderComponent(page) {
    return await new SearchStatisticsHeader(page);
  }
  // #endregion

  // #region Сontacts
  async getNewContactComponent(page) {
    return await new NewContact(page);
  }

  async getContactsComponent(page) {
    return await new Contacts(page);
  }

  async getSideSecondaryContactsMenuComponent(page) {
    return await new SideSecondaryContactsMenu(page);
  }

  // #endregion

  // #region Main Components
  async getHeaderMenuComponent(page) {
    return await new HeaderMenu(page);
  }

  async getSideMenuComponent(page) {
    return await new SideMenu(page);
  }
  // #endregion

  // #region Mail Components
  async getNewMailComponent(page) {
    return await new NewMail(page);
  }

  async getSideSecondaryMailMenuComponent(page) {
    return await new SideSecondaryMailMenu(page);
  }

  async getMailsListComponent(page) {
    return await new MailsList(page);
  }

  async getMailDetailsComponent(page) {
    return await new MailDetails(page);
  }
  // #endregion

  // #region Calendar Components
  async getNewAppointmentComponent(page) {
    return await new NewAppointment(page);
  }

  async getSideSecondaryCalendarMenuComponent(page) {
    return await new SideSecondaryCalendarMenu(page);
  }

  async getCalendarComponent(page) {
    return await new Calendar(page);
  }
  // #endregion

  // #region Chats Components
  async getNewChatsItemComponent(page) {
    return await new NewChatsItem(page);
  }

  async getSideSecondaryChatsMenuComponent(page) {
    return await new SideSecondaryChatsMenu(page);
  }
  // #endregion

  // #region Files Components
  async getSideSecondaryFilesMenuComponent(page) {
    return await new SideSecondaryFilesMenu(page);
  }

  async getFilesList(page) {
    return await new FilesList(page);
  }

  async getFileDetails(page) {
    return await new FileDetails(page);
  }
  // #endregion
}
