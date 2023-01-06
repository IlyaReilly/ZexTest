import {BaseAdminPage} from '../Pages/BaseAdminPage';

export class AdminHeaderMenu extends BaseAdminPage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('_react=nr'),
  };

  Dropdowns = {
    Create: this.Containers.MainContainer.locator('"CREATE"'),
    CreateItems: {
      NewDomain: this.page.locator('"Create New Domain"'),
      NewCOS: this.page.locator('"Create New COS"'),
    },
  };

  Links = {
    HelpCenter: this.Containers.MainContainer.locator('"Help Center"'),
  };
}
