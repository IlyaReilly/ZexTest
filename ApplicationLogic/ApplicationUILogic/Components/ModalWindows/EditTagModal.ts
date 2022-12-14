import {ModalWindowBase} from './ModalWindowBase';

export class EditTagModal extends ModalWindowBase {
  constructor(page) {
    super(page);
  };

  Buttons = {
    Edit: this.Containers.MainContainer.locator('button [class*="Text__Comp"]'),
  };

  Textboxes = {
    TagName: this.Containers.MainContainer.locator('[name="Tag name"]'),
  };

  DropdownOptions = {
    OpenCloseDropdown: this.Containers.MainContainer.locator('[class*="Dropdown"]'),
    YellowColor: this.Containers.DropDownContainer.locator('"yellow"'),
  };

  async EditNameTag(newTagName) {
    await this.Textboxes.TagName.fill(newTagName);
    await this.Buttons.Edit.click();
  };

  async ChooseColor(color) {
    await this.DropdownOptions.OpenCloseDropdown.click();
    await color.click();
    await this.Buttons.Edit.click();
  };

  TagColors = {
    YellowColor: async () => await this.ChooseColor(this.DropdownOptions.YellowColor),
  };
}
