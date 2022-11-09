import {ModalWindowBase} from '../../ModalWindows/ModalWindowBase';


export class AdvancedFiltersModal extends ModalWindowBase {
  constructor(page) {
    super(page);
  };

  Togglers = {
    TogglerOn: this.Containers.MainContainer.locator('[data-testid*="ToggleRight"]'),
    TogglerOff: this.Containers.MainContainer.locator('[data-testid*="ToggleLeftOutline"]'),
  };

  Fields = {
    AttachmentType: this.Containers.MainContainer.locator('[name="Attachment type"]'),
    Keywords: this.Containers.MainContainer.locator('[name="Keywords"]'),
    ReceivedFromAddress: this.Containers.MainContainer.locator('[name="Received from (address)"]'),
    SizeSmallerThan: this.Containers.MainContainer.locator('[name="Size smaller than (MB)"]'),
    Subject: this.Containers.MainContainer.locator('[name="Subject"]'),
    SentToAddress: this.Containers.MainContainer.locator('[name="Sent to (address)"]'),
    StatusOfEmailItem: this.Containers.MainContainer.locator('[name="Status of e-mail item"]'),
    SizeLargerThan: this.Containers.MainContainer.locator('[name="Size larger than (MB)"]'),
    Tag: this.Containers.MainContainer.locator('[name="Tag"]'),
  };

  DropdownOptions = {
    Email: this.page.locator('"Email"'),
    Image: this.page.locator('"Image"'),
    Excel: this.page.locator('"Excel"'),
    HTML: this.page.locator('"HTML"'),
    PDF: this.page.locator('"PDF"'),
    Powerpoint: this.page.locator('"Powerpoint"'),
    TextDocument: this.page.locator('"Text Document"'),
    Video: this.page.locator('"Video"'),
    Word: this.page.locator('"Word"'),
    ZippedFile: this.page.locator('"Zipped File"'),
    Read: this.page.locator('"read"'),
    Unread: this.page.locator('"unread"'),
    Flagged: this.page.locator('"flagged"'),
    NotFlagged: this.page.locator('"not flagged"'),
    Draft: this.page.locator('"draft"'),
    SentByMe: this.page.locator('"sent by me"'),
    ReceivedByMe: this.page.locator('"received by me"'),
    AnsweredByMe: this.page.locator('"answered by me"'),
  };

  Buttons = {
    Search: this.Containers.MainContainer.locator('"Search"'),
  };

  async SelectingDesiredOptions(option, toggler) {
    if (toggler === this.Togglers.TogglerOn) {
      if (`${this.Togglers.TogglerOff}:near(:text("${option}"))`) {
        await this.page.click(`[data-testid*="ToggleLeftOutline"]:near(:text("${option}"))`);
      }
    } else if (toggler === this.Togglers.TogglerOn) {
      if (`${this.Togglers.TogglerOn}:near(:text("${option}"))`) {
        await this.page.click(`[data-testid*="ToggleRight"]:near(:text("${option}"))`);
      }
    }
  };

  AdvancedFiltersOptions = {
    EnableAttachment: async () => await this.SelectingDesiredOptions('Attachment', this.Togglers.TogglerOn),
    DisableAttachment: async () => await this.SelectingDesiredOptions('Attachment', this.Togglers.TogglerOff),
    EnableUnread: async () => await this.SelectingDesiredOptions('Unread', this.Togglers.TogglerOn),
    DisableUnread: async () => await this.SelectingDesiredOptions('Unread', this.Togglers.TogglerOff),
    EnableFlagged: async () => await this.SelectingDesiredOptions('Flagged', this.Togglers.TogglerOn),
    DisableFlagged: async () => await this.SelectingDesiredOptions('Flagged', this.Togglers.TogglerOff),
    EnableIncludesharedfolders: async () => await this.SelectingDesiredOptions('Include shared folders', this.Togglers.TogglerOn),
    DisableIncludesharedfolders: async () => await this.SelectingDesiredOptions('Include shared folders', this.Togglers.TogglerOff),
  };
}
