import {BasePage} from '../../Pages/BasePage';

export class FilesList extends BasePage {
  constructor(page) {
    super(page);
  }

  Containers = {
    MainContainer: this.page.locator('.fUgMxt'),
    ListContainer: this.page.locator('.bbLqaW'),
    DetailsContainer: this.page.locator('.kdRfXz'),
    DetailsHeaderContainer: this.page.locator('.gjtssk'),
    DetailsSubMenuContainer: this.page.locator('.gBuoCY'),
  };

  Elements = {
    File: this.Containers.MainContainer.locator('.iLcLUN'),
    Header: this.Containers.MainContainer.locator('.debCVK'),
    FileName: this.Containers.DetailsHeaderContainer.locator('.hiooLB'),
    Preview: this.Containers.DetailsContainer.locator('.hpDEtg'),
  };

  Buttons = {
    CloseDetails: this.Containers.DetailsHeaderContainer.locator('.hiooLB'),
    DownloadFile: this.Containers.DetailsSubMenuContainer.locator('g[data-name="download"]'),
  };
}
