import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

export const sideSecondaryDefaultBarLocator = '.fvPkpI';

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
