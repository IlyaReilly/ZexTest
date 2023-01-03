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
    Tag: this.Containers.MainContainer.locator('_react=[compProps.tag] >> nth=0 >> [class*="Container__ContainerEl"] >> nth=0'),
  };

  DropdownOptions = {
    Email: this.Containers.DropDownContainer.locator('"Email"'),
    Image: this.Containers.DropDownContainer.locator('"Image"'),
    Excel: this.Containers.DropDownContainer.locator('"Excel"'),
    HTML: this.Containers.DropDownContainer.locator('"HTML"'),
    PDF: this.Containers.DropDownContainer.locator('"PDF"'),
    Powerpoint: this.Containers.DropDownContainer.locator('"Powerpoint"'),
    TextDocument: this.Containers.DropDownContainer.locator('"Text Document"'),
    Video: this.Containers.DropDownContainer.locator('"Video"'),
    Word: this.Containers.DropDownContainer.locator('"Word"'),
    ZippedFile: this.Containers.DropDownContainer.locator('"Zipped File"'),
    Read: this.Containers.DropDownContainer.locator('"read"'),
    Unread: this.Containers.DropDownContainer.locator('"unread"'),
    Flagged: this.Containers.DropDownContainer.locator('"flagged"'),
    NotFlagged: this.Containers.DropDownContainer.locator('"not flagged"'),
    Draft: this.Containers.DropDownContainer.locator('"draft"'),
    SentByMe: this.Containers.DropDownContainer.locator('"sent by me"'),
    ReceivedByMe: this.Containers.DropDownContainer.locator('"received by me"'),
    AnsweredByMe: this.Containers.DropDownContainer.locator('"answered by me"'),
    NotAnsweredByMe: this.Containers.DropDownContainer.locator('"not answered by me"'),
    Forwarded: this.Containers.DropDownContainer.locator('"forwarded"'),
    NotForwarded: this.Containers.DropDownContainer.locator('"not forwarded"'),
    Invitations: this.Containers.DropDownContainer.locator('"invitations"'),
    FromMe: this.Containers.DropDownContainer.locator('"from me" >> nth=0'),
    ToMe: this.Containers.DropDownContainer.locator('"to me"'),
    ConversationsWithASingleMessage: this.Containers.DropDownContainer.locator('"conversations with a single message"'),
    TagItem: this.Containers.DropDownContainer.locator('[class*="Container__ContainerEl"]'),
  };

  Buttons = {
    Search: this.Containers.MainContainer.locator('"Search"'),
  };

  Elements = {
    Title: this.Containers.MainContainer.locator('"Advanced Filters"'),
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

  async SearchByFields(option, text, secondOption?, secondText?) {
    await option.fill(text);
    if (secondOption) {
      await secondOption.fill(secondText);
    };
    await this.Elements.Title.click();
    await this.Buttons.Search.click();
  };

  FillAdvancedFiltersFields = {
    KeywordsField: async (text) => await this.SearchByFields(this.Fields.Keywords, text),
    SubjectField: async (text) => await this.SearchByFields(this.Fields.Subject, text),
    ReceivedFromAddressField: async (text) => await this.SearchByFields(this.Fields.ReceivedFromAddress, text),
    SentToAddressField: async (text) => await this.SearchByFields(this.Fields.SentToAddress, text),
    SizeSmallerThanField: async (text) => await this.SearchByFields(this.Fields.SizeSmallerThan, text),
    SizeLargerThanField: async (text) => await this.SearchByFields(this.Fields.SizeLargerThan, text),
  };

  async ChooseTagInDropdown(tagName) {
    await this.Fields.Tag.click();
    await this.DropdownOptions.TagItem.locator(`"${tagName}"`);
    await this.Buttons.Search.click();
  };

  async ChooseOptionInStatusMailItem(mailItem) {
    await this.Fields.StatusOfEmailItem.click();
    await mailItem.click();
    await this.Buttons.Search.click();
  };

  StatusMailItems = {
    ReadOption: async () => await this.ChooseOptionInStatusMailItem(this.DropdownOptions.Read),
    UnreadOption: async () => await this.ChooseOptionInStatusMailItem(this.DropdownOptions.Unread),
    FlaggedOption: async () => await this.ChooseOptionInStatusMailItem(this.DropdownOptions.Flagged),
    NotFlaggedOption: async () => await this.ChooseOptionInStatusMailItem(this.DropdownOptions.NotFlagged),
    DraftOption: async () => await this.ChooseOptionInStatusMailItem(this.DropdownOptions.Draft),
    SentByMeOption: async () => await this.ChooseOptionInStatusMailItem(this.DropdownOptions.SentByMe),
    AnsweredByMeOption: async () => await this.ChooseOptionInStatusMailItem(this.DropdownOptions.AnsweredByMe),
    NotAnsweredByMeOption: async () => await this.ChooseOptionInStatusMailItem(this.DropdownOptions.NotAnsweredByMe),
    ForwardedOption: async () => await this.ChooseOptionInStatusMailItem(this.DropdownOptions.Forwarded),
    NotForwardedOption: async () => await this.ChooseOptionInStatusMailItem(this.DropdownOptions.NotForwarded),
    InvitationsOption: async () => await this.ChooseOptionInStatusMailItem(this.DropdownOptions.Invitations),
    FromMeOption: async () => await this.ChooseOptionInStatusMailItem(this.DropdownOptions.FromMe),
    ToMeOption: async () => await this.ChooseOptionInStatusMailItem(this.DropdownOptions.ToMe),
    ConversationsWithASingleMessageOption: async () => await this.ChooseOptionInStatusMailItem(this.DropdownOptions.ConversationsWithASingleMessage),
  };
}
