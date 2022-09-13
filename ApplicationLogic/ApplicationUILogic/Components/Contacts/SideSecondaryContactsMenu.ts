import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class SideSecondaryContactsMenu extends BasePage {
  Containers = {
    MainContainer: this.page.locator(InheritedFields.SideSecondaryDefaultBarLocator),
    ContextMenuContainer: this.page.locator('[data-testid="dropdown-popper-list"]'),
  };

  Buttons = {
    ExpandAddressBookFolders: this.Containers.MainContainer.locator(InheritedFields.SpreadHidenFolders),
  };

  ContactAddressBooks = {
    Contacts: this.Containers.MainContainer.locator('"Contacts"'),
    EmailedContacts: this.Containers.MainContainer.locator('"Emailed Contacts"'),
    Trash: this.Containers.MainContainer.locator('"Trash"'),
    SubAddressBook: this.Containers.MainContainer.locator('.kWgjwg'),
  };
 
  Icons = {
    SharedIcon: this.Containers.MainContainer.locator('.gZYmKk'),
  };

  ContextMenu = {
    NewAddressBook: this.Containers.ContextMenuContainer.locator('"New address Book"'),
    Move: this.Containers.ContextMenuContainer.locator('"Move"'),
    ShareAddressBook: this.Containers.ContextMenuContainer.locator('"Share address book"'),
    EmptyAddressBook: this.Containers.ContextMenuContainer.locator('"Empty address book"'),
    EditAddressBook: this.Containers.ContextMenuContainer.locator('"Edit address book"'),
    DeleteAddressBook: this.Containers.ContextMenuContainer.locator('"Delete address book"'),
  };

  async OpenContextMenuForContacts() {
    await this.ContactAddressBooks.Contacts.click({button: 'right'});
  }

  async ClickContextMenuOption(element) {
    await this.OpenContextMenuForContacts();
    await element.click();
  }

  async OpenNewAddressBookContextMenuOption() {
      await this.ClickContextMenuOption(this.ContextMenu.NewAddressBook);
  }
  
  async OpenMoveAddressBookModal(addressBookName) {
    await this.ContactAddressBooks.SubAddressBook.locator(`"${addressBookName}"`).click({button: 'right'});
    await this.ContextMenu.Move.click();
  }

  async OpenShareAddressBookModal(addressBookName){
    await this.ContactAddressBooks.SubAddressBook.locator(`"${addressBookName}"`).click({button: 'right'});
    await this.ContextMenu.ShareAddressBook.click();
  }

  async ExpandContactsFolder() {
    await this.Buttons.ExpandAddressBookFolders.first().click();
  }

  constructor(page) {
    super(page);
  }
}
