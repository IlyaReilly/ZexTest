import {expect, Page} from '@playwright/test';

export const InheritedFields = {
  SideSecondaryDefaultBarLocator: '.fvPkpI',
  NewItemDefaultContainerLocator: '.dIJQFo',
  // NewItemDefaultContainerLocator: '.gOhlMI',
  NewItemBodyIframeLocator: '.tox-edit-area__iframe',
  NewItemBodyLocator: '.mce-content-body',
  ModalWindowLocator: '[data-testid="modal"]',
  SpreadHidenFolders: '[data-testid*="ChevronDown"]',
  // SpreadHidenFolders: '.css-1fx8m19:has([data-testid="ExpandMoreIcon"])',
  // SpreadHidenFolders: '.cLLOPN:has([data-testid*="ChevronDown"])',
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
  }
}
