import {expect, Page} from '@playwright/test';

export const InheritedFields = {
  SideSecondaryDefaultBarLocator: '.jMnTrh',
  NewItemDefaultContainerLocator: '.eRiUtJ',
  NewItemBodyIframeLocator: '.tox-edit-area__iframe',
  NewItemBodyLocator: '.mce-content-body',
  ModalWindowLocator: '[data-testid="modal"]',
  ExpandHidenFolders: '[data-testid="ExpandMoreIcon"]',
};

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
