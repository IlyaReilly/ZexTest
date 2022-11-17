import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class MailDetails extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MailDetailsContainer: this.page.locator('_react=[path$="Id"]'),
    MailOptionsContainer: this.page.locator(InheritedFields.DropdownListLocator),
  };

  Elements = {
    LetterSubject: this.Containers.MailDetailsContainer.locator('[data-testid="PreviewPanelHeader"]'),
    FlagIcon: this.Containers.MailDetailsContainer.locator('[data-testid="FlagIcon"]'),
    ActionWithMailNotification: this.page.locator('[data-testid="snackbar"]'),
    AttachmentFile: this.Containers.MailDetailsContainer.locator('_react=[att]'),
  };

  MailOptions = {
    Delete: this.Containers.MailDetailsContainer.locator('[data-testid*="Trash2Outline"]'),
    MoreOptionsMenu: this.Containers.MailDetailsContainer.locator('[data-testid*="MoreVertical"]'),
  };

  MoreOptionsMenu = {
    Move: this.Containers.MailOptionsContainer.locator('"Move"'),
    Tags: this.Containers.MailOptionsContainer.locator('"Tags"'),
    Print: this.Containers.MailOptionsContainer.locator('"Print"'),
    AddFlag: this.Containers.MailOptionsContainer.locator('"Add flag"'),
    Redirect: this.Containers.MailOptionsContainer.locator('"Redirect"'),
    EditAsNew: this.Containers.MailOptionsContainer.locator('"Edit as new"'),
    MarkAsSpam: this.Containers.MailOptionsContainer.locator('"Mark as spam"'),
    ShowOriginal: this.Containers.MailOptionsContainer.locator('"Show original"'),
    DeletePermanently: this.Containers.MailOptionsContainer.locator('"Delete Permanently"'),
  };

  AppointmentInvitationOptions = {
    Yes: this.Containers.MailDetailsContainer.locator('"Yes"'),
    Maybe: this.Containers.MailDetailsContainer.locator('"maybe"'),
    No: this.Containers.MailDetailsContainer.locator('"No"'),
    ProposeNewTime: this.Containers.MailDetailsContainer.locator('"PROPOSE NEW TIME"'),
  };

  AppointmentParticipantsSection = this.Containers.MailDetailsContainer.locator('.yOEdM');

  async SelectOption(option) {
    if (!(option in this.MailOptions)) {
      await this.MailOptions.MoreOptionsMenu.click();
    }
    await option.click();
  };

  SelectMailOption = {
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
