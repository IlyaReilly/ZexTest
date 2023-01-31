import {BaseAdminPage} from '../../Pages/BaseAdminPage';

export class Dashboard extends BaseAdminPage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('_react=[path="/dashboard"]'),
  };

  Buttons = {
    GoToNotification: this.Containers.MainContainer.locator('"GO TO NOTIFICATION"'),
    GoToMailstoresServersList: this.Containers.MainContainer.locator('"GO TO MAILSTORES SERVERS LIST"'),
  };
}
