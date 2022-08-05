import {test as base} from '@playwright/test';
import {PageManager} from '../../ApplicationLogic/ApplicationUILogic/Pages/PageManager';
import {APIManager} from '../../ApplicationLogic/ApplicationAPILogic/APIManager';
import {userPool} from '../../TestData/UserPool';

// Declare your options to type-check your configuration.
export type MyCredentials = {
  login: string;
  password: string;
};

export const test = base.extend<MyCredentials>({
  // Define an option and provide a default value.
  // We can later override it in the config.
  login: ['Login', {option: true}],
  password: ['Password', {option: true}],

  page: async ({page}, use) => {
    await page.goto('/');
    await use(page);
  },
});

export class BaseTest {
  static playwrightProjectsData = JSON.parse(JSON.stringify(require('../../TestData/PlaywrightProjectsData.json')));
  static pageManager = new PageManager();
  static apiManager = new APIManager();
  static dateTimePrefix = () => new Date().getDate().toString() + new Date().getTime().toString();

  static GetUserFromPool(index) {
    const lastDigit2Str = String(index).slice(-1);
    return userPool[Number(lastDigit2Str)];
  }
}
