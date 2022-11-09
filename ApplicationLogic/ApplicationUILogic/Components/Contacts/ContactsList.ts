import {BasePage} from '../../Pages/BasePage';

export class ContactsList extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    ContactsListContainer: this.page.locator('_react=[path*="itemId"]'),
    ContactsListContextMenu: this.page.locator('[data-testid*="dropdown-popper-list"]'),
  };

  ContactList = {
    ContactCount: this.Containers.ContactsListContainer.locator('[data-testid*="BreadcrumbCount"]'),
    ContactListItem: this.Containers.ContactsListContainer.locator('_react=[ItemComponent][item]'),
    ContactTag: this.Containers.ContactsListContainer.locator('[data-testid="TagIcon"]'),
  };

  ContactContextMenuOptions = {
    Delete: this.Containers.ContactsListContextMenu.locator('"Delete"'),
    SendEmail: this.Containers.ContactsListContextMenu.locator('"Send e-mail"'),
    Move: this.Containers.ContactsListContextMenu.locator('"Move"'),
    DeletePermanently: this.Containers.ContactsListContextMenu.locator('"Delete Permanently"'),
    Tags: this.Containers.ContactsListContextMenu.locator('"Tags"'),
    TagMenu: {
      NewTag: this.Containers.ContactsListContextMenu.locator('"New Tag"'),
    },
  };

  SelectContactContextMenuOption = {
    Delete: async (userMail) => await this.OpenContextMenuAndSelectOption(userMail, this.ContactContextMenuOptions.Delete),
    SendEmail: async (userMail) => await this.OpenContextMenuAndSelectOption(userMail, this.ContactContextMenuOptions.SendEmail),
    Move: async (userMail) => await this.OpenContextMenuAndSelectOption(userMail, this.ContactContextMenuOptions.Move),
    DeletePermanently: async (userMail) => await this.OpenContextMenuAndSelectOption(userMail, this.ContactContextMenuOptions.DeletePermanently),
    NewTag: async (userMail) => await this.OpenContextMenuAndSelectOption(userMail, this.ContactContextMenuOptions.TagMenu.NewTag, this.ContactContextMenuOptions.Tags),
  };

  async OpenContextMenuAndSelectOption(userMail, option, tags?) {
    await this.Containers.ContactsListContainer.locator(`"${userMail}"`).click({button: 'right'});
    if (tags) {
      tags.hover();
    }
    await option.click();
  };
}

