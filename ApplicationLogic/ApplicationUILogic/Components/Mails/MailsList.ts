import {BasePage} from '../../Pages/BasePage';

export class MailsList extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MailsListContainer: this.page.locator('[data-testid="list-wrapper"]'),
    MailContextMenuContainer: this.page.locator('[data-popper-placement="bottom-start"]'),
  };

  Elements = {
    Letter: this.Containers.MailsListContainer.locator('.jWpoDH'),
    UnreadMessageIcon: this.Containers.MailsListContainer.locator('.AyVvp'),
  };

  async OpenMail(mailSubject) {
    await this.Elements.Letter.locator(`"${mailSubject}"`).first().click();
  };

  async OpenMailContextOption(mailSubject, option) {
    await this.Elements.Letter.locator(`"${mailSubject}"`).click({button: 'right'});
    await option.click();
  };

  MailContextMenuOptions = {
    MarkAsUnread: this.Containers.MailContextMenuContainer.locator('"Mark as unread"'),
    MarkAsRead: this.Containers.MailContextMenuContainer.locator('"Mark as read"'),
    AddFlag: this.Containers.MailContextMenuContainer.locator('"Add flag"'),
    RemoveFlag: this.Containers.MailContextMenuContainer.locator('"Remove flag"'),
    Tags: this.Containers.MailContextMenuContainer.locator('"Tags"'),
    MarkAsSpam: this.Containers.MailContextMenuContainer.locator('"Mark as spam"'),
    Print: this.Containers.MailContextMenuContainer.locator('"Print"'),
    ShowOriginal: this.Containers.MailContextMenuContainer.locator('"Show original"'),
    Reply: this.Containers.MailContextMenuContainer.locator('"Reply"'),
    ReplyAll: this.Containers.MailContextMenuContainer.locator('"Reply all"'),
    Forward: this.Containers.MailContextMenuContainer.locator('"Forward"'),
    EditAsNew: this.Containers.MailContextMenuContainer.locator('"Edit as new"'),
    Send: this.Containers.MailContextMenuContainer.locator('"Send"'),
    Redirect: this.Containers.MailContextMenuContainer.locator('"Redirect"'),
  };

  SelectMailContextMenuOption = {
    MarkAsUnread: async (mailSubject) => await this.OpenMailContextOption(mailSubject, this.MailContextMenuOptions.MarkAsUnread),
    MarkAsRead: async (mailSubject) => await this.OpenMailContextOption(mailSubject, this.MailContextMenuOptions.MarkAsRead),
    AddFlag: async (mailSubject) => await this.OpenMailContextOption(mailSubject, this.MailContextMenuOptions.AddFlag),
    RemoveFlag: async (mailSubject) => await this.OpenMailContextOption(mailSubject, this.MailContextMenuOptions.RemoveFlag),
    Tags: async (mailSubject) => await this.OpenMailContextOption(mailSubject, this.MailContextMenuOptions.Tags),
    MarkAsSpam: async (mailSubject) => await this.OpenMailContextOption(mailSubject, this.MailContextMenuOptions.MarkAsSpam),
    Reply: async (mailSubject) => await this.OpenMailContextOption(mailSubject, this.MailContextMenuOptions.Reply),
    ReplyAll: async (mailSubject) => await this.OpenMailContextOption(mailSubject, this.MailContextMenuOptions.ReplyAll),
    Forward: async (mailSubject) => await this.OpenMailContextOption(mailSubject, this.MailContextMenuOptions.Forward),
    EditAsNew: async (mailSubject) => await this.OpenMailContextOption(mailSubject, this.MailContextMenuOptions.EditAsNew),
    Send: async (mailSubject) => await this.OpenMailContextOption(mailSubject, this.MailContextMenuOptions.Send),
    Redirect: async (mailSubject) => await this.OpenMailContextOption(mailSubject, this.MailContextMenuOptions.Redirect),
  };
}
