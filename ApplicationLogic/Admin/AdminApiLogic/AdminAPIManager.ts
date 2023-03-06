import {Page} from '@playwright/test';
import {ResetAPI} from './ResetAPI';

export class AdminAPIManager {
  page: Page;
  resetAPI;

  constructor(page) {
    this.page = page;
    this.resetAPI = new ResetAPI(page);
  };
};
