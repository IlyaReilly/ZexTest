import {Page} from '@playwright/test';
import {AdminHeaderMenu} from '../Components/AdminHeaderMenu';
import {AdminSideMenu} from '../Components/AdminSideMenu';
import {Dashboard} from '../Components//Dashboard/Dashboard';

export class AdminPageManager {
  page: Page;
  adminHeaderMenu;
  adminSideMenu;
  dashboard;

  constructor(page) {
    this.page = page;
    this.adminHeaderMenu = new AdminHeaderMenu(page);
    this.adminSideMenu = new AdminSideMenu(page);
    this.dashboard = new Dashboard(page);
  };
}
