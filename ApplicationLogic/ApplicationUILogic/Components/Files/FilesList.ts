import {BasePage} from '../../Pages/BasePage';

export class FilesList extends BasePage {
  constructor(page) {
    super(page);
  }

  Containers = {
    MainContainer: this.page.locator('.fUgMxt'),
    ListContainer: this.page.locator('.bbLqaW'),
  };

  Elements = {
    File: this.Containers.ListContainer.locator('.lnXHNY'),
    Header: this.Containers.MainContainer.locator('.debCVK'),
    FileName: this.Containers.ListContainer.locator('.hiooLB'),
  };

  async OpenFileDetails(unicFileName) {
    await this.page.locator('div.lnXHNY', {hasText: `${unicFileName}`}).click();
  }
}
