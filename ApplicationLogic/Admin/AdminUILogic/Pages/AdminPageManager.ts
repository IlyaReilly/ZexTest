import {Page} from '@playwright/test';

export class AdminPageManager {
  page: Page;

  constructor(page) {
    this.page = page;
  };
}
