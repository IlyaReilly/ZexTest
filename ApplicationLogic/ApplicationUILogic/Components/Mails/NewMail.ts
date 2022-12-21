import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class NewMail extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator(InheritedFields.NewItemBoardLocator),
    BeforeYouLeaveContainer: this.page.locator('[data-testid="modal"]'),
    DropdownContainer: this.page.locator(InheritedFields.DropdownListLocator),
  };

  bodyIframe = this.page.frameLocator(InheritedFields.NewItemBodyIframeLocator);

  BoardProperties = {
    NormalSize: this.Containers.MainContainer.locator('_react=[expanded=false]'),
    ExpandedSize: this.Containers.MainContainer.locator('_react=[expanded=true]'),
  };

  Buttons = {
    Send: this.Containers.MainContainer.locator('"Send"'),
    Save: this.Containers.MainContainer.locator('"Save"'),
    CloseCross: this.Containers.MainContainer.locator('[data-testid*="CloseOutline"]'),
    DeleteDraft: this.Containers.BeforeYouLeaveContainer.locator('"Delete Draft"'),
    ExpandBoard: this.Containers.MainContainer.locator('button:has([data-testid*="Expand"])'),
    ReduceBoard: this.Containers.MainContainer.locator('button:has([data-testid="icon: CollapseOutline"])'),
    Cc: this.Containers.MainContainer.locator('_react=[label="Cc"]'),
    Bcc: this.Containers.MainContainer.locator('_react=[label="Bcc"]'),
    MoreOptions: this.Containers.MainContainer.locator('button:has([data-testid$="MoreVertical"])'),
    CloseTab: this.Containers.MainContainer.locator('[data-testid$="Close"]'),
  };

  TextBox = {
    To: this.Containers.MainContainer.locator('[name="To"]'),
    Cc: this.Containers.MainContainer.locator('[name="Cc"]'),
    Bcc: this.Containers.MainContainer.locator('[name="Bcc"]'),
    Subject: this.Containers.MainContainer.locator('[name="Subject"]'),
    Body: this.bodyIframe.locator(InheritedFields.NewItemBodyLocator),
  };

  Elements = {
    EditorToolbar: this.Containers.MainContainer.locator('.tox-editor-header'),
    MarkAsImportantIcon: this.Containers.MainContainer.locator('[data-testid$="ArrowUpward"]'),
    RequestReadReceiptIcon: this.Containers.MainContainer.locator('[data-testid$="CheckmarkSquare"]'),
    BoardTab: this.Containers.MainContainer.locator('_react=[icon^="MailMod"][id^="board"]'),
  };

  Dropdowns = {
    Contacts: {
      Item: this.Containers.DropdownContainer.locator('[value="[object Object]"]'),
    },
    MoreOptions: {
      DisableRichTextEditor: this.Containers.DropdownContainer.locator('"Disable rich text editor"'),
      EnableRichTextEditor: this.Containers.DropdownContainer.locator('"Enable rich text editor"'),
      MarkAsImportant: this.Containers.DropdownContainer.locator('"Mark as important"'),
      MarkAsNotImportant: this.Containers.DropdownContainer.locator('"Mark as not important"'),
      RequestReadReceipt: this.Containers.DropdownContainer.locator('"Request read receipt"'),
      RemoveReadReceiptRequest: this.Containers.DropdownContainer.locator('"Remove read receipt request"'),
    },
  };

  SelectNewMailOption = {
    DisableRichTextEditor: async () => await this.SelectOption(this.Dropdowns.MoreOptions.DisableRichTextEditor),
    EnableRichTextEditor: async () => await this.SelectOption(this.Dropdowns.MoreOptions.EnableRichTextEditor),
    MarkAsImportant: async () => await this.SelectOption(this.Dropdowns.MoreOptions.MarkAsImportant),
    MarkAsNotImportant: async () => await this.SelectOption(this.Dropdowns.MoreOptions.MarkAsNotImportant),
    RequestReadReceipt: async () => await this.SelectOption(this.Dropdowns.MoreOptions.RequestReadReceipt),
    RemoveReadReceiptRequest: async () => await this.SelectOption(this.Dropdowns.MoreOptions.RemoveReadReceiptRequest),
    Cc: async () => await this.SelectOption(this.Buttons.Cc),
    Bcc: async () => await this.SelectOption(this.Buttons.Bcc),
  };

  async CreateNewMail(to, subject, body) {
    await this.TextBox.To.click();
    await this.TextBox.To.fill(to);
    await this.TextBox.Subject.click();
    await this.TextBox.Subject.fill(subject);
    await this.Containers.MainContainer.locator(`"${subject}"`).waitFor();
    await this.TextBox.Body.click();
    await this.TextBox.Body.fill(body);
  };

  async SendMail() {
    await this.Buttons.Send.click();
  };

  async SaveMail() {
    await this.Buttons.Save.click();
  };

  async CloseNewMail() {
    await this.Buttons.CloseCross.click();
  };

  async SelectOption(option) {
    await this.TextBox.Subject.waitFor();
    if (await option.isHidden()) {
      await this.Buttons.MoreOptions.click();
    };
    await option.click();
  };
}
