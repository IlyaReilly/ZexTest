import {BasePage} from '../../Pages/BasePage';

export class SearchStatisticsHeader extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('.ftkkYz'),
    // MainContainer: this.page.locator('.jPslbd'),
  };

  Buttons = {
    ClearSearch: this.Containers.MainContainer.locator('"CLEAR SEARCH"'),
  };

  Elements = {
    SearchSnippets: this.Containers.MainContainer.locator('.ddxlFk'),
    // SearchSnippets: this.Containers.MainContainer.locator('.cNXlLm'),
  };
}
