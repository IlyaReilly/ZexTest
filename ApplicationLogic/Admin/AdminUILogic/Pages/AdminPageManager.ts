import {Page} from '@playwright/test';
import {AdminHeaderMenu} from '../Components/AdminHeaderMenu';
import {AdminSideMenu} from '../Components/AdminSideMenu';

export class AdminPageManager {
  page: Page;
  adminHeaderMenu;
  adminSideMenu;

  constructor(page) {
    this.page = page;
    this.adminHeaderMenu = new AdminHeaderMenu(page);
    this.adminSideMenu = new AdminSideMenu(page);
  };
}
