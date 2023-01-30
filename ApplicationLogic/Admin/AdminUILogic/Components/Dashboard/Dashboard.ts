import {BaseAdminPage} from '../../Pages/BaseAdminPage';

export class Dashboard extends BaseAdminPage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('_react=[key="dashboard"]'),
  };

  Fields = {
    WelcomeMessage: this.Containers.MainContainer.locator('_react=[userName="Carbonio Admin"]'),
    QuickAccess: this.Containers.MainContainer.locator('_react=[quickAccessItems]'),
    YourNotifications: this.Containers.MainContainer.locator('_react=[goToMailNotificationt]'),
    ServersList: this.Containers.MainContainer.locator('_react=[goToMailStoreServerList]'),
  };

  Buttons = {
    OpenAccounts: this.Fields.QuickAccess.locator('[class*="ActionContainer"]:has-text("Accounts") >> "Open"'),
    OpenMailingList: this.Fields.QuickAccess.locator('[class*="ActionContainer"]:has-text("Mailing List") >> "Open"'),
  };
};
