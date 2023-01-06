import {expect, Page} from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly pageLocator: string;

  constructor(page : Page, pageLocator: string = '') {
    this.page = page;
    this.pageLocator = pageLocator;
    if (!!pageLocator) {
      expect(this.page.isVisible(this.pageLocator)).toBeTruthy;
    }
  };
}
