import {BasePage} from '../../../../BasePage';
import {InheritedFields} from '../../Pages/BaseApplicationPage';

export class SearchResultsList extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator(InheritedFields.WorkspaceContainerLocator),
    ListContainer: this.page.locator(InheritedFields.ListContainerLocator),
  };

  Buttons = {
    AdvancedFilters: this.Containers.MainContainer.locator('"Advanced Filters"'),
  };

  Elements = {
    SearchResult: this.Containers.ListContainer.locator(InheritedFields.ListItemReactLocator),
    FileSearchResult: this.Containers.ListContainer.locator(InheritedFields.ListFileReactLocator),
  };
}
