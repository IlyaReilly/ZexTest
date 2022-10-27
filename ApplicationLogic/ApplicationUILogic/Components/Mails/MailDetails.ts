import {BasePage} from '../../Pages/BasePage';

export class MailDetails extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MailDetailsContainer: this.page.locator('[data-testid="third-panel"]'),
    MailOptionsContainer: this.page.locator('[data-testid="dropdown-popper-list"]'),
  };

  Elements = {
    LetterSubject: this.Containers.MailDetailsContainer.locator('[data-testid="PreviewPanelHeader"]'),
    FlagIcon: this.Containers.MailDetailsContainer.locator('[data-testid="FlagIcon"]'),
    ActionWithMailNotification: this.page.locator('.bPRaOr'),
  };

  EditMail = {
    DeleteMail: this.Containers.MailDetailsContainer.locator('[data-testid*="Trash2Outline"]'),
    SpreadOptions: this.Containers.MailDetailsContainer.locator('[data-testid*="MoreVertical"]'),
  };

  MailOptions = {
    Move: this.Containers.MailOptionsContainer.locator('"Move"'),
    Tags: this.Containers.MailOptionsContainer.locator('"Tags"'),
    Print: this.Containers.MailOptionsContainer.locator('"Print"'),
    AddFlag: this.Containers.MailOptionsContainer.locator('"Add flag"'),
    Redirect: this.Containers.MailOptionsContainer.locator('"Redirect"'),
    EditAsNew: this.Containers.MailOptionsContainer.locator('"Edit as new"'),
    MarkAsSpam: this.Containers.MailOptionsContainer.locator('"Mark as spam"'),
    ShowOriginal: this.Containers.MailOptionsContainer.locator('"Show original"'),
  };

  AppointmentInvitationOptions = {
    Yes: this.Containers.MailDetailsContainer.locator('"Yes"'),
    Maybe: this.Containers.MailDetailsContainer.locator('"maybe"'),
    No: this.Containers.MailDetailsContainer.locator('"No"'),
    ProposeNewTime: this.Containers.MailDetailsContainer.locator('"PROPOSE NEW TIME"'),
  };

  AppointmentParticipantsSection = this.Containers.MailDetailsContainer.locator('.fixDFx');

  async DeleteDraft() {
    await this.EditMail.DeleteMail.click();
  };

  async MarkAsSpam() {
    await this.EditMail.SpreadOptions.click();
    await this.MailOptions.MarkAsSpam.click();
  };
}
