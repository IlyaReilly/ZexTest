import {test as base} from '@playwright/test';
import {PageManager} from '../../ApplicationLogic/ApplicationUILogic/Pages/PageManager';
import {APIManager} from '../../ApplicationLogic/ApplicationAPILogic/APIManager';
import {userPool} from '../../TestData/UserPool';
import {promises as fs} from 'fs';
import {ApiLoginMethod} from '../../ApplicationLogic/ApplicationAPILogic/BaseAPI';

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

  static async ApiLogin(user) {
    const storagesPath = '../../TestData/StorageStates/storageState.json';
    const userStoragesPath = `TestData/StorageStates/${user.login}.json`;
    const authTokens = await ApiLoginMethod(user.login, user.password);
    const storageStatejson = JSON.parse(JSON.stringify(require(storagesPath)));
    storageStatejson.cookies[1].value = authTokens[0];
    storageStatejson.cookies[2].value = authTokens[1];
    const jsonData = JSON.stringify(storageStatejson);
    await fs.writeFile(`./${userStoragesPath}`, jsonData, 'utf8');
    return `./${userStoragesPath}`;
  }
}
