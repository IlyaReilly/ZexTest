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
    Trash: this.Containers.MainContainer.locator('"Trash"'),
    Filters: this.Containers.MainContainer.locator('"Filters"'),
    Uploads: this.Containers.MainContainer.locator('"Uploads"'),
  };

  Buttons = {
  };

  async OpenSecondaryMenuTab(tab) {
    await tab.click();
  }
}
