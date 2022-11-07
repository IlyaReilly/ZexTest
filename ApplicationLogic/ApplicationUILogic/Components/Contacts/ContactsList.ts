import {BasePage} from '../../Pages/BasePage';

export class ContactsList extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    ContactsListContainer: this.page.locator('.gXjrJH'),
    ContactsLisntToScrollCotainer: this.page.locator('.iyNrSn'),
    ContactDetailsContainer: this.page.locator('.eskUBc'),
    ContactsListContextMenu: this.page.locator('[data-testid*="dropdown-popper-list"]'),
  };

  ContactContextMenuOptions = {
    Delete: this.Containers.ContactsListContextMenu.locator('"Delete"'),
    Move: this.Containers.ContactsListContextMenu.locator('"Move"'),
    DeletePermanently: this.Containers.ContactsListContextMenu.locator('"Delete Permanently"'),
  };

  SelectContactContextMenuOption = {
    Delete: async (userMail) => await this.OpenContextMenuAndSelectOption(userMail, this.ContactContextMenuOptions.Delete),
    Move: async (userMail) => await this.OpenContextMenuAndSelectOption(userMail, this.ContactContextMenuOptions.Move),
    DeletePermanently: async (userMail) => await this.OpenContextMenuAndSelectOption(userMail, this.ContactContextMenuOptions.DeletePermanently),
  };

  async OpenContextMenuAndSelectOption(userMail, option) {
    await this.Containers.ContactsListContainer.locator(`"${userMail}"`).click({button: 'right'});
    await option.click();
  };
}

