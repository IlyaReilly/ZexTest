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
import {ShareCalendarModal} from '../Components/Calendars/ShareCalendarModal';
import {NewCalendarModal} from '../Components/Calendars/NewCalendarModal';
import {RevokeShareCalendarModal} from '../Components/Calendars/RevokeShareCalendarModal';
import {EditCalendarPropertyModal} from '../Components/Calendars/EditCalendarPropertyModal';
import {CalendarAccessShareModal} from '../Components/Calendars/CalendarAccessShareModal';
import {NewContact} from '../Components/Contacts/NewContact';
import {ContactsList} from '../Components/Contacts/ContactsList';
import {SideSecondaryChatsMenu} from '../Components/Chats/SideSecondaryChatsMenu';
import {NewChatsItem} from '../Components/Chats/NewChatsItem';
import {SideSecondaryFilesMenu} from '../Components/Files/SideSecondaryFilesMenu';
import {FilesList} from '../Components/Files/FilesList';
import {FileDetails} from '../Components/Files/FileDetails';
import {MailDetails} from '../Components/Mails/MailDetails';
import {SearchResultDetails} from '../Components/Search/SearchResultDetails';
import {SearchResultsList} from '../Components/Search/SearchResultsList';
import {SearchStatisticsHeader} from '../Components/Search/SearchStatisticsHeader';
import {ChatsInfo} from '../Components/Chats/ChatsInfo';
import {Chats} from '../Components/Chats/Chats';
import {ShareFolderModal} from '../Components/Mails/ShareFolderModal';
import {EditFolderModal} from '../Components/Mails/EditFolderModal';
import {MoveFolderModal} from '../Components/Mails/MoveFolderModal';
import {WipeFolderModal} from '../Components/Mails/WipeFolderModal';


export class PageManager {
  page: Page;
  loginPage;
  searchResultDetails;
  searchResultsList;
  searchStatisticsHeader;
  newContact;
  contactsList;
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
  chatsInfo;
  chats;
  editCalendarPropertyModal;
  revokeShareCalendarModal;
  newCalendarModal;

  // #region Modal windows
  shareCalendarModal;
  calendarAccessShareModal;
  shareFolderModal;
  editFolderModal;
  moveFolderModal;
  wipeFolderModal;
  // #endregion

  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.searchResultDetails = new SearchResultDetails(page);
    this.searchResultsList = new SearchResultsList(page);
    this.searchStatisticsHeader = new SearchStatisticsHeader(page);
    this.newContact = new NewContact(page);
    this.contactsList = new ContactsList(page);
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
    this.chatsInfo = new ChatsInfo(page);
    this.chats = new Chats(page);

    // #region Modal windows
    this.shareCalendarModal = new ShareCalendarModal(page);
    this.calendarAccessShareModal = new CalendarAccessShareModal(page);
    this.editCalendarPropertyModal = new EditCalendarPropertyModal(page);
    this.revokeShareCalendarModal = new RevokeShareCalendarModal(page);
    this.newCalendarModal = new NewCalendarModal(page);
    this.shareFolderModal = new ShareFolderModal(page);
    this.editFolderModal = new EditFolderModal(page);
    this.moveFolderModal = new MoveFolderModal(page);
    this.wipeFolderModal = new WipeFolderModal(page);
    // #endregion
  }
}
