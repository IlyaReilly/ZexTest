import {BasePage} from '../../Pages/BasePage';

export class FileDetails extends BasePage {
  constructor(page) {
    super(page);
  }

  Containers = {
    MainContainer: this.page.locator('.jbyjRV'),
    HeaderContainer: this.page.locator('.gjtssk'),
    FileOptionsContainer: this.page.locator('.izBNKP'),
  };

  Elements = {
    FileName: this.Containers.HeaderContainer.locator('.hiooLB'),
  };

  Buttons = {
    CloseDetails: this.Containers.HeaderContainer.locator('.bOlfsx'),
    Download: this.Containers.HeaderContainer.locator('g[data-name="download"]'),
  };
}
