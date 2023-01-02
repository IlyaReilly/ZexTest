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
  };

  Icons = {
    SharedIcon: this.Containers.MainContainer.locator('[data-testid*="ArrowCircleRight"]'),
  };

  Elements = {
    Item: this.Containers.MainContainer.locator('[class*="Text__Comp"]'),
  };

  ContextMenu = {
    NewAddressBook: this.Containers.ContextMenuContainer.locator('"New address Book"'),
    MoveAddressBook: this.Containers.ContextMenuContainer.locator('"Move"'),
    ShareAddressBook: this.Containers.ContextMenuContainer.locator('"Share address book"'),
    EmptyAddressBook: this.Containers.ContextMenuContainer.locator('"Empty address book"'),
    EditAddressBook: this.Containers.ContextMenuContainer.locator('"Edit address book"'),
    DeleteAddressBook: this.Containers.ContextMenuContainer.locator('"Delete address book"'),
  };

  async SelectOption(addressBookName, option) {
    await this.Containers.MainContainer.locator(`"${addressBookName}"`).click({button: 'right'});
    await option.click();
  };

  SelectAddressBookOption = {
    Move: async (addressBookName) => await this.SelectOption(addressBookName, this.ContextMenu.MoveAddressBook),
    Share: async (addressBookName) => await this.SelectOption(addressBookName, this.ContextMenu.ShareAddressBook),
    Empty: async (addressBookName) => await this.SelectOption(addressBookName, this.ContextMenu.EmptyAddressBook),
    Edit: async (addressBookName) => await this.SelectOption(addressBookName, this.ContextMenu.EditAddressBook),
    Delete: async (addressBookName) => await this.SelectOption(addressBookName, this.ContextMenu.DeleteAddressBook),
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
}
