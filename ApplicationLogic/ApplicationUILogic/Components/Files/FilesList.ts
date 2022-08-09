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
    File: this.Containers.MainContainer.locator('.iLcLUN'),
    Header: this.Containers.MainContainer.locator('.debCVK'),
  };
}
