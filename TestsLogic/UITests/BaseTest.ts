import {test as base} from '@playwright/test';
import {PageManager} from '../../ApplicationLogic/ApplicationUILogic/Pages/PageManager';
import {APIManager} from '../../ApplicationLogic/ApplicationAPILogic/APIManager';
import {userPool} from '../../TestData/UserPool';
import {promises as fs} from 'fs';
import {ApiLoginMethod} from '../../ApplicationLogic/ApplicationAPILogic/BaseAPI';

export const test = base.extend<{pageManager: PageManager, apiManager: APIManager}>({
  page: async ({browser}, use, workerInfo) => {
    let multiplier;
    switch (workerInfo.project.name) {
    case 'chromium': multiplier = 0; break;
    case 'firefox': multiplier = 10; break;
    case 'webkit': multiplier = 20; break;
    default: multiplier = 0;
    }
    BaseTest.userForLogin = BaseTest.GetUserFromPool(workerInfo.workerIndex, multiplier);
    BaseTest.secondUser = BaseTest.GetUserFromPool(workerInfo.workerIndex + 1, multiplier);
    const storagesPath = await BaseTest.ApiLogin(BaseTest.userForLogin, 'userForLoginStorageState');
    const page = await browser.newPage({storageState: storagesPath, strictSelectors: false});
    await page.goto('/');
    await use(page);
  },

  pageManager: async ({page}, use) => {
    const pageManager = new PageManager(page);
    await use(pageManager);
  },

  apiManager: async ({page}, use) => {
    const apiManager = new APIManager(page);
    await use(apiManager);
  },
});

export class BaseTest {
  static playwrightProjectsData = JSON.parse(JSON.stringify(require('../../TestData/PlaywrightProjectsData.json')));
  static dateTimePrefix = () => new Date().getDate().toString() + new Date().getTime().toString();
  static baseUrl = BaseTest.playwrightProjectsData.baseURL.QA;
  static userForLogin;
  static secondUser;

  static GetUserFromPool(index, multiplier) {
    const lastDigit2Str = String(index).slice(-1);
    return userPool[Number(parseInt(lastDigit2Str) + multiplier)];
  };

  static async ApiLogin(user, nameOfUserForStorageStateFile) {
    const storagesPath = `../../TestData/StorageStates/${nameOfUserForStorageStateFile}.json`;
    const userStoragesPath = `TestData/StorageStates/${user.login}.json`;
    const authTokens = await ApiLoginMethod(user.login, user.password);
    const domain = BaseTest.baseUrl.replace('https://', '').replace('/', '');
    const storageStatejson = JSON.parse(JSON.stringify(require(storagesPath)));
    storageStatejson.cookies[0].domain = domain;
    storageStatejson.cookies[1].domain = domain;
    storageStatejson.cookies[2].domain = domain;
    storageStatejson.origins[0].origin = BaseTest.baseUrl;
    storageStatejson.cookies[1].value = authTokens[0];
    storageStatejson.cookies[2].value = authTokens[1];
    const jsonData = JSON.stringify(storageStatejson);
    await fs.writeFile(`./${userStoragesPath}`, jsonData, 'utf8');
    return `./${userStoragesPath}`;
  };

  static async ApiRelogin(browser) {
    const secondStoragesPath = await BaseTest.ApiLogin(this.secondUser, 'secondUserStorageState');
    const secondPage = await browser.newPage({storageState: secondStoragesPath, strictSelectors: false});
    await secondPage.goto('/');
    return new PageManager(secondPage);
  };

  static async waitForLoaderSpinnerHidden(page) {
    try {
      await page.waitForSelector('[data-testid="spinner"]', {state: 'hidden'});
    } catch (e) {
      throw e;
    };
  };
}
