/* eslint eqeqeq: "off", curly: "error" */

import type {PlaywrightTestConfig} from '@playwright/test';
import {devices} from '@playwright/test';
import {MyCredentials, BaseTest} from './TestsLogic/UITests/BaseTest';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig<MyCredentials> = {
  testDir: './TestsLogic',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10000,
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 3 : 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  // Use global setup for single login
  // globalSetup: require.resolve('./global-setup'),
  use: {
    // viewport: { height: 816, width: 1536 },
    extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
    },
    // Allpy storageState
    // storageState: './storageState.json',
    headless: false,
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'https://digitalboost.business.govt.nz/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    ignoreHTTPSErrors: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'ttrotestuser_digitalboost_chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: {height: 816, width: 1536},
        // We can change enviroments via running special project
        baseURL: BaseTest.playwrightProjectsData.baseURL.QA,
        // Ability to add variables to tests
        // login: BaseTest.playwrightProjectsData.users.test0.login,
        // password: BaseTest.playwrightProjectsData.users.test0.password,
        // storageState: playwrightProjectsData.storageState,
      },
    },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPad Pro 11'],
    //     baseURL: playwrightProjectsData.baseURL.UAT,
    //     login: playwrightProjectsData.users.bobTesting01.login,
    //     password: playwrightProjectsData.users.bobTesting01.password,
    //     loginWelcomMessage: playwrightProjectsData.users.bobTesting01.loginWelcomMessage,
    //     storageState: playwrightProjectsData.storageState,
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 11'],
    //     baseURL: playwrightProjectsData.baseURL.UAT,
    //     login: playwrightProjectsData.users.bobTesting01.login,
    //     password: playwrightProjectsData.users.bobTesting01.password,
    //     loginWelcomMessage: playwrightProjectsData.users.bobTesting01.loginWelcomMessage,
    //     storageState: playwrightProjectsData.storageState,
    //   },
    // },
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Galaxy S9+'],
    //     baseURL: playwrightProjectsData.baseURL.UAT,
    //     login: playwrightProjectsData.users.bobTesting01.login,
    //     password: playwrightProjectsData.users.bobTesting01.password,
    //     loginWelcomMessage: playwrightProjectsData.users.bobTesting01.loginWelcomMessage,
    //     storageState: playwrightProjectsData.storageState,
    //   },
    // },
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     login: playwrightProjectsData.users.test0.login,
    //     password: playwrightProjectsData.users.test0.password,
    //     storageState: playwrightProjectsData.storageState,
    //   },
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     baseURL: playwrightProjectsData.baseURL.UAT,
    //     login: playwrightProjectsData.users.bobTesting01.login,
    //     password: playwrightProjectsData.users.bobTesting01.password,
    //     loginWelcomMessage: playwrightProjectsData.users.bobTesting01.loginWelcomMessage,
    //     storageState: playwrightProjectsData.storageState,
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
