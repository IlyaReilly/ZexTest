import {Page} from '@playwright/test';
import {AdminHeaderMenu} from '../Components/AdminHeaderMenu';
import {AdminSideMenu} from '../Components/AdminSideMenu';
import {Dashboard} from '../Components/Dashboard/Dashboard';
import {Notifications} from '../Components/Notifications/Notifications';
import {ServersList} from '../Components/Mailstores/ServersList';

export class AdminPageManager {
  page: Page;
  adminHeaderMenu;
  adminSideMenu;
  dashboard;
  notifications;
  serversList;

  constructor(page) {
    this.page = page;
    this.adminHeaderMenu = new AdminHeaderMenu(page);
    this.adminSideMenu = new AdminSideMenu(page);
    this.dashboard = new Dashboard(page);
    this.notifications = new Notifications(page);
    this.serversList = new ServersList(page);
  };
}
