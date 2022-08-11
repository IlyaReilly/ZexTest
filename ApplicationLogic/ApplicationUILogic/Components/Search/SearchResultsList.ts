import {BasePage} from '../../Pages/BasePage';

export class SearchResultsList extends BasePage {
  Containers = {
    MainContainer: this.page.locator('.gnWgSu'),
  };

  Elements = {
    SearchResult: this.Containers.MainContainer.locator('.eVGFEb'),
  };

  constructor(page) {
    super(page);
  }
}
