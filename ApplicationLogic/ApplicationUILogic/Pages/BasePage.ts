import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

export const InheritedFields = {
  SideSecondaryDefaultBarLocator: '.fvPkpI',
  NewItemDefaultContainerLocator: '.gOhlMI',
  NewItemBodyIframeLocator: '.tox-edit-area__iframe',
  NewItemBodyLocator: '.mce-content-body'
}

export class BasePage {
    readonly page: Page;
    readonly pageLocator: string;

    constructor(page : Page, pageLocator: string = '') {
        this.page = page;
        this.pageLocator = pageLocator;
        if(!!pageLocator)
        expect(this.page.isVisible(this.pageLocator)).toBeTruthy;
      }
    }
