import {ModalWindowBase} from './ModalWindowBase';

export class EditTagModal extends ModalWindowBase {
  constructor(page) {
    super(page);
  };

  Buttons = {
    Edit: this.Containers.MainContainer.locator('"Edit"'),
  };

  Textboxes = {
    TagName: this.Containers.MainContainer.locator('[name="Tag name"]'),
  };

  Dropdowns = {
    OpenCloseDropdown: this.Containers.MainContainer.locator('[class*="Dropdown"]'),
    YellowColor: this.page.locator('"yellow"'),
  };

  async EditNameTag(newTagName) {
    await this.Textboxes.TagName.fill(newTagName);
    await this.Buttons.Edit.click();
  };
}
