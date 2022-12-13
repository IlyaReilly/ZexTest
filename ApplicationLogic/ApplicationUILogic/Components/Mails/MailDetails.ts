import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class MailDetails extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('[data-testid="third-panel"]'),
    OptionsContainer: this.page.locator(InheritedFields.DropdownListLocator),
  };

  MailBodyIframe = this.Containers.MainContainer.frameLocator('iframe[title]');
  EditorBodyIframe = this.Containers.MainContainer.frameLocator(InheritedFields.NewItemBodyIframeLocator);

  Elements = {
    Header: this.Containers.MainContainer.locator('[data-testid="PreviewPanelHeader"]'),
    Recipient: this.Containers.MainContainer.locator('[class*="contact-names"]'),
    Body: this.MailBodyIframe.locator('body'),
    FlagIcon: this.Containers.MainContainer.locator('[data-testid="FlagIcon"]'),
    ActionWithMailNotification: this.page.locator('[data-testid="snackbar"]'),
    AttachmentFile: this.Containers.MainContainer.locator('_react=[att]'),
  };

  Editor = {
    Elements: {
      ContactBubble: this.Containers.MainContainer.locator('[class*="ChipContainer"]'),
    },
    Buttons: {
      ShowBoard: this.Containers.MainContainer.locator('[data-testid$="DiagonalArrowLeftDownOutline"]'),
      Send: this.Containers.MainContainer.locator('"Send"'),
    },
    Textboxes: {
      To: this.Containers.MainContainer.locator('[name="To"]'),
      Subject: this.Containers.MainContainer.locator('[name="Subject"]'),
      Body: this.EditorBodyIframe.locator(InheritedFields.NewItemBodyLocator),
    },
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
    if (!(option in this.MailOptions)) {
      await this.MailOptions.MoreOptionsMenu.click();
    }
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
