import {Page} from '@playwright/test';
import {ModalWindowBase} from '../../ModalWindows/ModalWindowBase';

export class NewSpaceModal extends ModalWindowBase {
  constructor(page: Page) {
    super(page);
  };

  Buttons = {
    Create: this.Containers.MainContainer.locator('"Create"'),
  };

  NewSpaceDialog = {
    TopicTextbox: this.Containers.MainContainer.locator('[name="Topic"]'),
    TitleTextbox: this.Containers.MainContainer.locator('[name="Title"]'),
    UserFilterTextbox: this.Containers.MainContainer.locator('[name="Start typing to pick an address"]'),
  };

  Elements = {
    UserInFilterList: this.Containers.MainContainer.locator('.fXXPYY'),
  };

  async CreateSpace(title: string, topic: string, user: string) {
    await this.NewSpaceDialog.TitleTextbox.fill(title);
    await this.NewSpaceDialog.TopicTextbox.fill(topic);
    await this.NewSpaceDialog.UserFilterTextbox.fill(user);
    await this.Buttons.Create.click();
  };
}
