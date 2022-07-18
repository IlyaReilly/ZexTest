import { test as base } from '@playwright/test';
import {PageManager} from '../../ApplicationLogic/ApplicationUILogic/Pages/PageManager'

// Declare your options to type-check your configuration.
export type MyCredentials = {
  login: string;
  password: string;
  loginWelcomMessage: string;
};

export const playwrightProjectsData = JSON.parse(JSON.stringify(require('../../TestData/PlaywrightProjectsData.json')));

export const pageManager = new PageManager();

export const test = base.extend<MyCredentials>({
  // Define an option and provide a default value.
  // We can later override it in the config.
  login: ['Login', { option: true }],
  password: ['Password', { option: true }],
  loginWelcomMessage: ['LoginWelcomMessage', { option: true }],

    page: async ({ page }, use) => {
        await page.goto('/');
        await use(page);
    }
  });
