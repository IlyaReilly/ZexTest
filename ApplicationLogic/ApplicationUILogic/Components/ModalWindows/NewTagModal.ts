import {ModalWindowBase} from './ModalWindowBase';

export class NewTagModal extends ModalWindowBase {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('[class*="ModalComponents__ModalContent"]'),
  };

  Buttons = {
    Create: this.Containers.MainContainer.locator('"Create"'),
  };

  Textboxes = {
    TagName: this.Containers.MainContainer.locator('[name="Tag name"]'),
  };

  async CreateTag(tagName) {
    await this.Textboxes.TagName.fill(tagName);
    await this.Buttons.Create.click();
  }
}
