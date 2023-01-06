import {Page} from '@playwright/test';
import {AdminHeaderMenu} from '../Components/AdminHeaderMenu';

export class AdminPageManager {
  page: Page;
  adminHeaderMenu;

  constructor(page) {
    this.page = page;
    this.adminHeaderMenu = new AdminHeaderMenu(page);
  };
}
