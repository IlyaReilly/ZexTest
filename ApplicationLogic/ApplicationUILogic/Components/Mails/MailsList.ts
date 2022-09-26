import {BasePage} from '../../Pages/BasePage';

export class MailsList extends BasePage {
  Containers = {
    MailsListContainer: this.page.locator('.kEvhgn'),
    MailContextMenuContainer: this.page.locator('[data-popper-placement="bottom-start"]'),
  };

  Elements = {
    Letter: this.Containers.MailsListContainer.locator('.qPmzW '),
    UnreadMessageIcon: this.Containers.MailsListContainer.locator('.AyVvp'),
    FlagIcon: this.Containers.MailsListContainer.locator('[data-testid="FlagIcon"]'),
  };

  constructor(page) {
    super(page);
  };

  async OpenMail(mailSubject) {
    await this.Elements.Letter.locator(`"${mailSubject}"`).first().click();
  };

  async OpenMailContextMenu(mailSubject, option) {
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
    MarkAsUnread: async (mailSubject) => await this.OpenMailContextMenu(mailSubject, this.MailContextMenuOptions.MarkAsUnread),
    MarkAsRead: async (mailSubject) => await this.OpenMailContextMenu(mailSubject, this.MailContextMenuOptions.MarkAsRead),
    AddFlag: async (mailSubject) => await this.OpenMailContextMenu(mailSubject, this.MailContextMenuOptions.AddFlag),
    RemoveFlag: async (mailSubject) => await this.OpenMailContextMenu(mailSubject, this.MailContextMenuOptions.RemoveFlag),
    Tags: async (mailSubject) => await this.OpenMailContextMenu(mailSubject, this.MailContextMenuOptions.Tags),
    MarkAsSpam: async (mailSubject) => await this.OpenMailContextMenu(mailSubject, this.MailContextMenuOptions.MarkAsSpam),
    Print: async (mailSubject) => await this.OpenMailContextMenu(mailSubject, this.MailContextMenuOptions.Print),
    ShowOriginal: async (mailSubject) => await this.OpenMailContextMenu(mailSubject, this.MailContextMenuOptions.ShowOriginal),
    Reply: async (mailSubject) => await this.OpenMailContextMenu(mailSubject, this.MailContextMenuOptions.Reply),
    ReplyAll: async (mailSubject) => await this.OpenMailContextMenu(mailSubject, this.MailContextMenuOptions.ReplyAll),
    Forward: async (mailSubject) => await this.OpenMailContextMenu(mailSubject, this.MailContextMenuOptions.Forward),
    EditAsNew: async (mailSubject) => await this.OpenMailContextMenu(mailSubject, this.MailContextMenuOptions.EditAsNew),
    Send: async (mailSubject) => await this.OpenMailContextMenu(mailSubject, this.MailContextMenuOptions.Send),
    Redirect: async (mailSubject) => await this.OpenMailContextMenu(mailSubject, this.MailContextMenuOptions.Redirect),
  };

  async OpenPrintPage(mailSubject) {
    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup'),
      await this.SelectMailContextMenuOption.Print(mailSubject),
    ]);
    await newPage.waitForLoadState();
    const mailTitle = await newPage.locator('b').last().textContent();
    return mailTitle;
  };

  async ShowOriginal(mailSubject) {
    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup'),
      await this.SelectMailContextMenuOption.ShowOriginal(mailSubject),
    ]);
    await newPage.waitForLoadState();
    const originalContent = await newPage.locator('pre').textContent();
    return originalContent;
  };
}
