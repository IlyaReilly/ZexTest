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
    SelectColor: this.Containers.MainContainer.locator('"Select Color"'),
  };

  async EditNameTag(newTagName) {
    await this.Textboxes.TagName.fill(newTagName);
    await this.Buttons.Edit.click();
  };

  async ChooseColor(color) {
    await this.DropdownOptions.SelectColor.click();
    if (`${color.ColorSet}` == "'black'") {
      await this.Containers.DropDownContainer.locator("'cyan'").click();
      await this.DropdownOptions.SelectColor.click();
      await this.Containers.DropDownContainer.locator(color).click();
    } else {
      await this.Containers.DropDownContainer.locator(color).click();
    };
    await this.Buttons.Edit.click();
  };
}
