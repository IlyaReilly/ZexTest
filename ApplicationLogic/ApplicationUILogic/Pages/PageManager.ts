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
import {ShareCalendarModal} from '../Components/Calendars/Modals/ShareCalendarModal';
import {DeleteCalendarModal} from '../Components/Calendars/Modals/DeleteCalendarModal';
import {NewCalendarModal} from '../Components/Calendars/Modals/NewCalendarModal';
import {RevokeShareCalendarModal} from '../Components/Calendars/Modals/RevokeShareCalendarModal';
import {EditCalendarPropertyModal} from '../Components/Calendars/Modals/EditCalendarPropertyModal';
import {CalendarAccessShareModal} from '../Components/Calendars/Modals/CalendarAccessShareModal';
import {NewContact} from '../Components/Contacts/NewContact';
import {ContactsList} from '../Components/Contacts/ContactsList';
import {SideSecondaryChatsMenu} from '../Components/Chats/SideSecondaryChatsMenu';
import {NewChatsModal} from '../Components/Chats/Modals/NewChatsModal';
import {SideSecondaryFilesMenu} from '../Components/Files/SideSecondaryFilesMenu';
import {FilesList} from '../Components/Files/FilesList';
import {FileDetails} from '../Components/Files/FileDetails';
import {MailDetails} from '../Components/Mails/MailDetails';
import {SearchResultDetails} from '../Components/Search/SearchResultDetails';
import {SearchResultsList} from '../Components/Search/SearchResultsList';
import {SearchStatisticsHeader} from '../Components/Search/SearchStatisticsHeader';
import {ChatsInfo} from '../Components/Chats/ChatsInfo';
import {Chats} from '../Components/Chats/Chats';
import {ShareFolderModal} from '../Components/Mails/Modals/ShareFolderModal';
import {EditFolderModal} from '../Components/Mails/Modals/EditFolderModal';
import {CreateNewItemModal} from '../Components/Files/Modals/CreateNewItemModal';
import {NewAddressBookModal} from '../Components/Contacts/Modals/NewAddressBookModal';
import {MoveAddressBookModal} from '../Components/Contacts/Modals/MoveAddressBookModal';
import {ShareAddressBookModal} from '../Components/Contacts/Modals/ShareAddressBookModal';
import {MoveFolderModal} from '../Components/Mails/Modals/MoveFolderModal';
import {WipeFolderModal} from '../Components/Mails/Modals/WipeFolderModal';
import {DeleteFolderModal} from '../Components/Mails/Modals/DeleteFolderModal';
import {PrintPage} from './MailPages/PrintPage';
import {ShowOriginalPage} from './MailPages/ShowOriginalPage';
import {EditAddressBookModal} from '../Components/Contacts/Modals/EditAddressBookModal';
import {ChatField} from '../Components/Chats/ChatField';
import {AddNewMembersModal} from '../Components/Chats/Modals/AddNewMembersModal';
import {DeleteAddressBookModal} from '../Components/Contacts/Modals/DeleteAddressBookModal';
import {MoveMailToFolderModal} from '../Components/Mails/Modals/MoveMailToFolderModal';
import {SpaceInfo} from '../Components/Chats/SpaceInfo';
import {NewChannelModal} from '../Components/Chats/Modals/NewChannelModal';
import {NewSpaceModal} from '../Components/Chats/Modals/NewSpaceModal';


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
  sideSecondaryChatsMenu;
  sideSecondaryFilesMenu;
  filesList;
  fileDetails;
  chatsInfo;
  chats;
  chatField;
  spaceInfo;

  // #region Calendars Modal
  newCalendarModal;
  calendarAccessShareModal;
  editCalendarPropertyModal;
  revokeShareCalendarModal;
  shareCalendarModal;
  deleteCalendarModal;
  // #endregion

  // #region Contacts Modal
  newAddressBookModal;
  moveAddressBookModal;
  shareAddressBookModal;
  editAddressBookModal;
  deleteAddressBookModal;
  // #endregion

  // #region Files Modal
  createNewItemModal;
  // #endregion

  // #region Mails Modal
  shareFolderModal;
  editFolderModal;
  moveFolderModal;
  wipeFolderModal;
  deleteFolderModal;
  moveMailToFolderModal;
  // #endregion

  // #region Mail Pages
  printPage;
  showOriginalPage;
  // #endregion


  // #region Chats Modal
  newChatsModal;
  addNewMembersModal;
  newChannelModal;
  newSpaceModal;
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
    this.sideSecondaryChatsMenu = new SideSecondaryChatsMenu(page);
    this.sideSecondaryFilesMenu = new SideSecondaryFilesMenu(page);
    this.filesList = new FilesList(page);
    this.fileDetails = new FileDetails(page);
    this.chatsInfo = new ChatsInfo(page);
    this.chats = new Chats(page);
    this.chatField = new ChatField(page);
    this.spaceInfo = new SpaceInfo(page);

    // #region Calendars Modal
    this.shareCalendarModal = new ShareCalendarModal(page);
    this.calendarAccessShareModal = new CalendarAccessShareModal(page);
    this.editCalendarPropertyModal = new EditCalendarPropertyModal(page);
    this.revokeShareCalendarModal = new RevokeShareCalendarModal(page);
    this.newCalendarModal = new NewCalendarModal(page);
    this.deleteCalendarModal = new DeleteCalendarModal(page);
    // #endregion

    // #region Contacts Modal
    this.newAddressBookModal = new NewAddressBookModal(page);
    this.moveAddressBookModal = new MoveAddressBookModal(page);
    this.shareAddressBookModal = new ShareAddressBookModal(page);
    this.editAddressBookModal = new EditAddressBookModal(page);
    this.deleteAddressBookModal = new DeleteAddressBookModal(page);
    // #endregion

    // #region Files Modal
    this.createNewItemModal = new CreateNewItemModal(page);
    // #endregion

    // #region Mails Modal
    this.shareFolderModal = new ShareFolderModal(page);
    this.editFolderModal = new EditFolderModal(page);
    this.moveFolderModal = new MoveFolderModal(page);
    this.wipeFolderModal = new WipeFolderModal(page);
    this.deleteFolderModal = new DeleteFolderModal(page);
    this.moveMailToFolderModal = new MoveMailToFolderModal(page);
    // #endregion

    // #region Mail Pages
    this.printPage = new PrintPage(page);
    this.showOriginalPage = new ShowOriginalPage(page);
    // #endregion

    // #region Chats Modal
    this.newChatsModal = new NewChatsModal(page);
    this.addNewMembersModal = new AddNewMembersModal(page);
    this.newChannelModal = new NewChannelModal(page);
    this.newSpaceModal = new NewSpaceModal(page);
    // #endregion
  };
}
