import {test as base} from '@playwright/test';
import {PageManager} from '../../ApplicationLogic/ApplicationUILogic/Pages/PageManager';
import {APIManager} from '../../ApplicationLogic/ApplicationAPILogic/APIManager';
import {UserPool} from '../../TestData/UserPool';

// Declare your options to type-check your configuration.
export type MyCredentials = {
  login: string;
  password: string;
};

const userPool = new UserPool();
export const playwrightProjectsData = JSON.parse(JSON.stringify(require('../../TestData/PlaywrightProjectsData.json')));
export const pageManager = new PageManager();
export const apiManager = new APIManager();
export const dateTimePrefix = () => new Date().getDate().toString() + new Date().getTime().toString();

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

export function GetUserFromPool() {
  userPool.userPool.forEach((user, i) => {
    if (!user.usedFlag) {
      userPool[i].usedFlag = true;
      return user;
    }
  });
}

export function DisposeUserInPool(user) {
  userPool.userPool.forEach((poolUser, i) => {
    if (poolUser == user) {
      userPool[i].usedFlag = false;
    }
  });
}
