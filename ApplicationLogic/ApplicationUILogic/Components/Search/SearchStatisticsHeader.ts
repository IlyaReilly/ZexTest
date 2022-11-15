import {BasePage} from '../../Pages/BasePage';

export class SearchStatisticsHeader extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('_react=ci'),
  };

  Buttons = {
    ClearSearch: this.Containers.MainContainer.locator('"CLEAR SEARCH"'),
  };

  Elements = {
    SearchSnippet: this.Containers.MainContainer.locator('_react=[key]'),
  };
}
