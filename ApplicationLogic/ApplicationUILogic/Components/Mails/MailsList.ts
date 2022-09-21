import {BasePage} from '../../Pages/BasePage';

export class MailsList extends BasePage {
  Containers = {
    MailsListContainer: this.page.locator('.kEvhgn'),
    MailContextMenuContainer: this.page.locator('[data-popper-placement="bottom-start"]'),
  };

  Elements = {
    Letter: this.Containers.MailsListContainer.locator('.qPmzW '),
    UnreadMessageIcon: this.Containers.MailsListContainer.locator('.gtNLsC .AyVvp'),
    FlagIcon: this.Containers.MailsListContainer.locator('[data-testid="FlagIcon"]'),
  };

  constructor(page) {
    super(page);
  }

  async OpenMail(mailSubject) {
    await this.Elements.Letter.locator(`"${mailSubject}"`).first().click();
  }

  async OpenMailContextMenu(mailSubject) {
    await this.Elements.Letter.locator(`"${mailSubject}"`).click({button: 'right'});
  }

  SelectMailContextMenuOption = {
    MarkAsUnread: async () => await this.Containers.MailContextMenuContainer.locator('"Mark as unread"').click(),
    MarkAsRead: async () => await this.Containers.MailContextMenuContainer.locator('"Mark as read"').click(),
    AddFlag: async () => await this.Containers.MailContextMenuContainer.locator('"Add flag"').click(),
    RemoveFlag: async () => await this.Containers.MailContextMenuContainer.locator('"Remove flag"').click(),
    Tags: async () => await this.Containers.MailContextMenuContainer.locator('"Tags"').click(),
    MarkAsSpam: async () => await this.Containers.MailContextMenuContainer.locator('"Mark as spam"').click(),
    Print: async () => await this.Containers.MailContextMenuContainer.locator('"Print"').click(),
    ShowOriginal: async () => await this.Containers.MailContextMenuContainer.locator('"Show original"').click(),
    Reply: async () => await this.Containers.MailContextMenuContainer.locator('"Reply"').click(),
    ReplyAll: async () => await this.Containers.MailContextMenuContainer.locator('"Reply all"').click(),
    Forward: async () => await this.Containers.MailContextMenuContainer.locator('"Forward"').click(),
    EditAsNew: async () => await this.Containers.MailContextMenuContainer.locator('"Edit as new"').click(),
    Send: async () => await this.Containers.MailContextMenuContainer.locator('"Send"').click(),
    Redirect: async () => await this.Containers.MailContextMenuContainer.locator('"Redirect"').click(),
  };
}
