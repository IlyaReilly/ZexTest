import {BasePage} from '../../Pages/BasePage';

export class MailDetails extends BasePage {
  Containers = {
    MailDetailsContainer: this.page.locator('[data-testid="third-panel"]'),
    // MailDetailsContainer: this.page.locator('.jbyjRV'),
    MailOptionsContainer: this.page.locator('[data-testid="dropdown-popper-list"]'),
    // MailOptionsContainer: this.page.locator('.izBNKP'),
  };

  Elements = {
    LetterSubject: this.Containers.MailDetailsContainer.locator('[data-testid="PreviewPanelHeader"]'),
    // LetterSubject: this.Containers.MailDetailsContainer.locator('.jalknq'),
    FlagIcon: this.Containers.MailDetailsContainer.locator('[data-testid="FlagIcon"]'),
    ActionWithMailNotification: this.page.locator('.jOvDlO'),
    // ActionWithMailNotification: this.page.locator('.ldHDuR'),
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
    Yes: this.Containers.MailDetailsContainer.locator('"YES"'),
    Maybe: this.Containers.MailDetailsContainer.locator('"MAYBE"'),
    No: this.Containers.MailDetailsContainer.locator('"NO"'),
    ProposeNewTime: this.Containers.MailDetailsContainer.locator('"PROPOSE NEW TIME"'),
  };

  AppointmentParticipantsSection = this.Containers.MailDetailsContainer.locator('.daaZGX');

  constructor(page) {
    super(page);
  };

  async DeleteDraft() {
    await this.EditMail.DeleteMail.click();
  };

  async MarkAsSpam() {
    await this.EditMail.SpreadOptions.click();
    await this.MailOptions.MarkAsSpam.click();
  };
}
