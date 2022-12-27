import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class SideSecondaryContactsMenu extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator(InheritedFields.SideSecondaryBarLocator),
    ContextMenuContainer: this.page.locator(InheritedFields.DropdownListLocator),
  };

  Buttons = {
    ExpandAddressBooks: this.Containers.MainContainer.locator('[data-testid*="ChevronDown"]'),
  };

  ContactAddressBooks = {
    Contacts: this.Containers.MainContainer.locator('"Contacts"'),
    EmailedContacts: this.Containers.MainContainer.locator('"Emailed Contacts"'),
    Trash: this.Containers.MainContainer.locator('"Trash"'),
    Tags: this.Containers.MainContainer.locator('"Tags"'),
  };

  Icons = {
    SharedIcon: this.Containers.MainContainer.locator('[data-testid*="ArrowCircleRight"]'),
  };

  Elements = {
    Item: this.Containers.MainContainer.locator('[class*="Text__Comp"]'),
  };

  ContextMenu = {
    NewAddressBook: this.Containers.ContextMenuContainer.locator('"New address Book"'),
    Move: this.Containers.ContextMenuContainer.locator('"Move"'),
    ShareAddressBook: this.Containers.ContextMenuContainer.locator('"Share address book"'),
    EmptyAddressBook: this.Containers.ContextMenuContainer.locator('"Empty address book"'),
    EditAddressBook: this.Containers.ContextMenuContainer.locator('"Edit address book"'),
    DeleteAddressBook: this.Containers.ContextMenuContainer.locator('"Delete address book"'),
    CreateTag: this.Containers.ContextMenuContainer.locator('"Create Tag"'),
    DeleteTag: this.Containers.ContextMenuContainer.locator('"Delete Tag"'),
    EditTag: this.Containers.ContextMenuContainer.locator('"Edit Tag"'),
  };

  OpenAddressBookContextMenu = {
    MoveAddressBookModal: async (addressBookName) => {
      await this.Containers.MainContainer.locator(`"${addressBookName}"`).click({button: 'right'});
      await this.ContextMenu.Move.click();
    },
    ShareAddressBookModal: async (addressBookName) => {
      await this.Containers.MainContainer.locator(`"${addressBookName}"`).click({button: 'right'});
      await this.ContextMenu.ShareAddressBook.click();
    },
    EmptyAddressBookModal: async (addressBookName) => {
      await this.Containers.MainContainer.locator(`"${addressBookName}"`).click({button: 'right'});
      await this.ContextMenu.EmptyAddressBook.click();
    },
    EditAddressBookModal: async (addressBookName) => {
      await this.Containers.MainContainer.locator(`"${addressBookName}"`).click({button: 'right'});
      await this.ContextMenu.EditAddressBook.click();
    },
    DeleteAddressBookModal: async (addressBookName) => {
      await this.Containers.MainContainer.locator(`"${addressBookName}"`).click({button: 'right'});
      await this.ContextMenu.DeleteAddressBook.click();
    },
    CreateTagModal: async () => {
      await this.ContactAddressBooks.Tags.click({button: 'right'});
      await this.ContextMenu.CreateTag.click();
    },
    DeleteTagModal: async (tagName) => {
      await this.Elements.Item.locator(`"${tagName}"`).click({button: 'right'});
      await this.ContextMenu.DeleteTag.click();
    },
    EditTagModal: async (tagName) => {
      await this.Elements.Item.locator(`"${tagName}"`).click({button: 'right'});
      await this.ContextMenu.EditTag.click();
    },
  };

  async OpenContextMenuForContacts() {
    await this.ContactAddressBooks.Contacts.click({button: 'right'});
  };

  async ClickContextMenuOption(element) {
    await this.OpenContextMenuForContacts();
    await element.click();
  };

  async OpenNewAddressBookContextMenuOption() {
    await this.ClickContextMenuOption(this.ContextMenu.NewAddressBook);
  };

  async ExpandContactsFolder() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.Buttons.ExpandAddressBooks.locator('nth=1').waitFor();
    await this.Buttons.ExpandAddressBooks.locator('nth=0').click();
  };

  async ExpandTagsFolder() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.Buttons.ExpandAddressBooks.locator('nth=1').waitFor();
    await this.Buttons.ExpandAddressBooks.last().click();
  };
}
