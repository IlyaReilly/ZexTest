import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class SideSecondaryFilesMenu extends BasePage {
  constructor(page) {
    super(page);
  }

  Containers = {
    MainContainer: this.page.locator(InheritedFields.SideSecondaryDefaultBarLocator),
  };

  Tabs = {
    Home: this.Containers.MainContainer.locator('"Home"'),
    SharedWithMe: this.Containers.MainContainer.locator('"Shared with me"'),
    Trash: this.Containers.MainContainer.locator('[data-testid*="ChevronDown"] >> nth=0'),
    Filters: this.Containers.MainContainer.locator('[data-testid*="ChevronDown"] >> nth=-1'),
    Uploads: this.Containers.MainContainer.locator('"Uploads"'),
    TrashElements: this.Containers.MainContainer.locator('"My elements"'),
    FiltersFlagged: this.Containers.MainContainer.locator('"Flagged"'),
    FiltersSharedByMe: this.Containers.MainContainer.locator('"Shared by me"'),
  };

  Buttons = {
  };

  async OpenSecondaryMenuTab(tab) {
    await tab.click();
  }
}


