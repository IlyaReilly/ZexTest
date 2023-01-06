import {test as base, Page} from '@playwright/test';
import {PageManager} from '../ApplicationLogic/Application/ApplicationUILogic/Pages/PageManager';
import {APIManager} from '../ApplicationLogic/Application/ApplicationAPILogic/APIManager';
import {userPool, User} from '../TestData/UserPool';
import {promises as fs} from 'fs';
import {ApiLoginMethod} from '../ApplicationLogic/Application/ApplicationAPILogic/BaseAPI';
import {AdminApiLoginMethod} from '../ApplicationLogic/Admin/AdminApiLogic/BaseAdminAPI';

export type TestOptions = {
  domain: string;
};

export const test = base.extend<TestOptions & {pageManager: PageManager, secondPageManager: PageManager, apiManager: APIManager, adminPage: Page}>({
  domain: ['', {option: true}],

  page: async ({browser, domain, baseURL}, use, workerInfo) => {
    let multiplier;
    switch (workerInfo.project.name) {
    case 'chromium': multiplier = 0; break;
    case 'firefox': multiplier = 10; break;
    case 'webkit': multiplier = 20; break;
    default: multiplier = 0;
    }

    BaseTest.userForLogin = BaseTest.GetUserFromPool(workerInfo.workerIndex, multiplier, domain);
    BaseTest.secondUser = BaseTest.GetUserFromPool(workerInfo.workerIndex + 1, multiplier, domain);
    BaseTest.thirdUser = BaseTest.GetUserFromPool(workerInfo.workerIndex + 2, multiplier, domain);
    BaseTest.fourthUser = BaseTest.GetUserFromPool(workerInfo.workerIndex + 3, multiplier, domain);
    BaseTest.baseUrl = baseURL;
    BaseTest.domain = domain;
    const storagesPath = await BaseTest.ApiLogin(BaseTest.userForLogin, 'userForLoginStorageState');
    const page = await browser.newPage({storageState: storagesPath, strictSelectors: false});
    await page.goto('/');
    await use(page);
  },

  adminPage: async ({browser, baseURL, domain}, use) => {
    BaseTest.baseUrl = baseURL;
    BaseTest.baseAdminUrl = baseURL?.slice(0, -1) + ":" + BaseTest.playwrightProjectsData.baseURL.adminPort;
    const user = new User(BaseTest.playwrightProjectsData.adminUsers.zextras.login + '@' + domain,
      BaseTest.playwrightProjectsData.adminUsers.zextras.password);
    const storagesPath = await BaseTest.AdminApiLogin(user, 'adminUserForLoginStorageState');
    const page = await browser.newPage({storageState: storagesPath, strictSelectors: false});
    await page.goto(BaseTest.baseAdminUrl + "/" + BaseTest.playwrightProjectsData.baseURL.adminEndpoint);
    const adminPage = page;
    await use(adminPage);
  },

  pageManager: async ({page}, use) => {
    const pageManager = new PageManager(page);
    await use(pageManager);
  },

  secondPageManager: async ({browser}, use) => {
    const secondPageManager = await BaseTest.ApiReloginToSecondUser(browser);
    await use(secondPageManager);
  },

  apiManager: async ({page}, use) => {
    const apiManager = new APIManager(page);
    await use(apiManager);
  },
});

export class BaseTest {
  static playwrightProjectsData = JSON.parse(JSON.stringify(require('../TestData/PlaywrightProjectsData.json')));
  static dateTimePrefix = () => new Date().getDate().toString() + new Date().getTime().toString();
  static baseUrl;
  static baseAdminUrl;
  static domain;
  static userForLogin;
  static secondUser;
  static thirdUser;
  static fourthUser;

  static GetUserFromPool(index, multiplier, domain) {
    const lastDigit2Str = String(index).slice(-1);
    const user = userPool[Number(parseInt(lastDigit2Str) + multiplier)];
    return new User(user.login + '@' + domain, user.password);
  };

  static async ApiLogin(user, nameOfUserForStorageStateFile) {
    const storagesPath = `../TestData/StorageStates/${nameOfUserForStorageStateFile}.json`;
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

  static async AdminApiLogin(user, nameOfUserForStorageStateFile) {
    const storagesPath = `../TestData/StorageStates/${nameOfUserForStorageStateFile}.json`;
    const userStoragesPath = `TestData/StorageStates/${user.login}.json`;
    const authToken = await AdminApiLoginMethod(user.login, user.password);
    const domain = BaseTest.baseUrl.replace('https://', '').replace('/', '');
    const storageStatejson = JSON.parse(JSON.stringify(require(storagesPath)));
    storageStatejson.cookies[0].domain = domain;
    storageStatejson.cookies[1].domain = domain;
    storageStatejson.cookies[2].domain = domain;
    storageStatejson.cookies[3].domain = domain;
    storageStatejson.origins[0].origin = BaseTest.baseAdminUrl;
    storageStatejson.cookies[1].value = authToken;
    const jsonData = JSON.stringify(storageStatejson);
    await fs.writeFile(`./${userStoragesPath}`, jsonData, 'utf8');
    return `./${userStoragesPath}`;
  };

  static async ApiReloginToSecondUser(browser) {
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

  static async doubleTimeout() {
    await test.setTimeout(80000);
  };
}
