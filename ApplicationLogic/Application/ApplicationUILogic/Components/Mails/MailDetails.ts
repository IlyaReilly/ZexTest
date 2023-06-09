import {BaseApplicationPage} from '../../Pages/BaseApplicationPage';

export class MailDetails extends BaseApplicationPage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('[data-testid="third-panel"]'),
    OptionsContainer: this.page.locator(this.InheritedFields.DropdownLocator),
  };

  MailBodyIframe = this.Containers.MainContainer.frameLocator('iframe[title]');

  Elements = {
    Header: this.Containers.MainContainer.locator('[data-testid="PreviewPanelHeader"]'),
    MailPreview: this.Containers.MainContainer.locator('[data-testid^="MailPreview"]'),
    Recipient: this.Containers.MainContainer.locator('_react=[label="To: "] >> [class*="contact-names"]'),
    CcRecipient: this.Containers.MainContainer.locator('_react=[label="Cc: "] >> [class*="contact-names"]'),
    BccRecipient: this.Containers.MainContainer.locator('_react=[label="Bcc: "] >> [class*="contact-names"]'),
    Body: this.MailBodyIframe.locator('body'),
    FlagIcon: this.Containers.MainContainer.locator('[data-testid="FlagIcon"]'),
    ActionWithMailNotification: this.page.locator(this.InheritedFields.NotificationLocator),
    UndoButton: this.page.locator(this.InheritedFields.NotificationLocator).locator('"Undo"'),
    AttachmentFile: this.Containers.MainContainer.locator('_react=[att]'),
  };

  MailOptions = {
    Edit: this.Containers.MainContainer.locator('[data-testid$="Edit2Outline"]'),
    Reply: this.Containers.MainContainer.locator('[data-testid$="UndoOutline"]'),
    Forward: this.Containers.MainContainer.locator('[data-testid$="Forward"]'),
    Delete: this.Containers.MainContainer.locator('[data-testid*="Trash2Outline"]'),
    MoreOptionsMenu: this.Containers.MainContainer.locator('[data-testid*="MoreVertical"]'),
  };

  MoreOptionsMenu = {
    Move: this.Containers.OptionsContainer.locator('"Move"'),
    Tags: this.Containers.OptionsContainer.locator('"Tags"'),
    Print: this.Containers.OptionsContainer.locator('"Print"'),
    AddFlag: this.Containers.OptionsContainer.locator('"Add flag"'),
    Redirect: this.Containers.OptionsContainer.locator('"Redirect"'),
    EditAsNew: this.Containers.OptionsContainer.locator('"Edit as new"'),
    MarkAsSpam: this.Containers.OptionsContainer.locator('"Mark as spam"'),
    ShowOriginal: this.Containers.OptionsContainer.locator('"Show original"'),
    DeletePermanently: this.Containers.OptionsContainer.locator('"Delete Permanently"'),
  };

  AppointmentInvitationOptions = {
    Yes: this.Containers.MainContainer.locator('"Yes"'),
    Maybe: this.Containers.MainContainer.locator('"maybe"'),
    No: this.Containers.MainContainer.locator('"No"'),
    ProposeNewTime: this.Containers.MainContainer.locator('"PROPOSE NEW TIME"'),
  };

  AppointmentParticipantsSection = this.Containers.MainContainer.locator('.yOEdM');

  async SelectOption(option) {
    if (await option.isHidden()) {
      await this.MailOptions.MoreOptionsMenu.click();
    };
    await option.click();
  };

  SelectMailOption = {
    Edit: async () => await this.SelectOption(this.MailOptions.Edit),
    Reply: async () => await this.SelectOption(this.MailOptions.Reply),
    Forward: async () => await this.SelectOption(this.MailOptions.Forward),
    Delete: async () => await this.SelectOption(this.MailOptions.Delete),
    Move: async () => await this.SelectOption(this.MoreOptionsMenu.Move),
    Tags: async () => await this.SelectOption(this.MoreOptionsMenu.Tags),
    Print: async () => await this.SelectOption(this.MoreOptionsMenu.Print),
    AddFlag: async () => await this.SelectOption(this.MoreOptionsMenu.AddFlag),
    Redirect: async () => await this.SelectOption(this.MoreOptionsMenu.Redirect),
    EditAsNew: async () => await this.SelectOption(this.MoreOptionsMenu.EditAsNew),
    MarkAsSpam: async () => await this.SelectOption(this.MoreOptionsMenu.MarkAsSpam),
    ShowOriginal: async () => await this.SelectOption(this.MoreOptionsMenu.ShowOriginal),
    DeletePermanently: async () => await this.SelectOption(this.MoreOptionsMenu.DeletePermanently),
  };
}
