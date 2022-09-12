import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class SideSecondaryContactsMenu extends BasePage {
  Containers = {
    MainContainer: this.page.locator(InheritedFields.SideSecondaryDefaultBarLocator),
    ContextMenuContainer: this.page.locator('[data-testid="dropdown-popper-list"]'),
    CreateNewFolderPopupContainer: this.page.locator('.lgcnRq'),
  };

  Buttons = {
    OpenHideAddressBookFolders: this.Containers.MainContainer.locator(InheritedFields.SpreadHidenFolders),
  };

  Options = {
    Contacts: this.Containers.MainContainer.locator('"Contacts"'),
    EmailedContacts: this.Containers.MainContainer.locator('"Emailed Contacts"'),
    Trash: this.Containers.MainContainer.locator('"Trash"'),
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
    await this.Options.Contacts.click({button: 'right'});
  }

  OpenContactsContextMenuOption = {
    NewAddressBook: async () => {
      await this.ClickContextMenuOption(this.ContextMenu.NewAddressBook);
    },
    Move: async () => {
      await this.ClickContextMenuOption(this.ContextMenu.Move);
    },
    ShareAddressBook: async () => {
      await this.ClickContextMenuOption(this.ContextMenu.ShareAddressBook);
    },
    EmptyAddressBook: async () => {
      await this.ClickContextMenuOption(this.ContextMenu.EmptyAddressBook);
    },
    EditAddressBook: async () => {
      await this.ClickContextMenuOption(this.ContextMenu.EditAddressBook);
    },
    DeleteAddressBook: async () => {
      await this.ClickContextMenuOption(this.ContextMenu.DeleteAddressBook);
    },
  };

  async ClickContextMenuOption(element) {
    await this.OpenContextMenuForContacts();
    await element.click();
  }

  async ExpandContactsFolder() {
    await this.Buttons.OpenHideAddressBookFolders.first().click();
  }

  constructor(page) {
    super(page);
  }

  async OpenContactsFolder(folder) {
    await folder.click();
  }
}
