import {BasePage} from '../../Pages/BasePage';

export class SearchStatisticsHeader extends BasePage {
  Containers = {
    MainContainer: this.page.locator('.jPslbd'),
  };

  Buttons = {
    ClearSearch: this.Containers.MainContainer.locator('"CLEAR SEARCH"'),
  };

  Elements = {
    SearchSnippets: this.Containers.MainContainer.locator('.cNXlLm'),
  };

  constructor(page) {
    super(page);
  }
}
