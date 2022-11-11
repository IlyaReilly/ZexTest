import {BasePage} from '../../Pages/BasePage';

export class ContactsList extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('_react=[path*="itemId"]'),
    ContactContextMenu: this.page.locator('[data-testid*="dropdown-popper-list"]'),
  };

  Elements = {
    Count: this.Containers.MainContainer.locator('[data-testid*="BreadcrumbCount"]'),
    Contact: this.Containers.MainContainer.locator('_react=[ItemComponent][item]'),
    ContactTag: this.Containers.MainContainer.locator('[data-testid="TagIcon"]'),
  };

  ContactContextMenuOptions = {
    Delete: this.Containers.ContactContextMenu.locator('"Delete"'),
    SendEmail: this.Containers.ContactContextMenu.locator('"Send e-mail"'),
    Move: this.Containers.ContactContextMenu.locator('"Move"'),
    DeletePermanently: this.Containers.ContactContextMenu.locator('"Delete Permanently"'),
    Tags: this.Containers.ContactContextMenu.locator('"Tags"'),
    TagMenu: {
      NewTag: this.Containers.ContactContextMenu.locator('"New Tag"'),
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
    await this.Containers.MainContainer.locator(`"${userMail}"`).click({button: 'right'});
    if (tags) {
      tags.hover();
    }
    await option.click();
  };
}

