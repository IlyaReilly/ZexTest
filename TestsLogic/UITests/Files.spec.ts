import {expect, Page} from '@playwright/test';
import {test, pageManager, playwrightProjectsData, apiManager} from './BaseTest';

test.describe('Chats tests', async () => {
  let page: Page;

  // Components
  let headerMenu;
  let sideMenu;
  let sideSecondaryCalendarMenu;
  // let newFilesItem;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
    await page.goto('/');
    headerMenu = await pageManager.getHeaderMenuComponent(page);
    sideMenu = await pageManager.getSideMenuComponent(page);
    // newFilesItem = await pageManager.getNewChatsItemComponent(page);
    sideSecondaryCalendarMenu = await pageManager.getSideSecondaryFilesMenuComponent(page);
  });

  test.beforeEach(async () => {
    await page.reload();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Upload new File', async ({}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Files);
    await headerMenu.OpenNewItemMenuSection(headerMenu.NewItemMenu.Upload);
    const [fileChooser] = await Promise.all([
      // It is important to call waitForEvent before click to set up waiting.
      page.waitForEvent('filechooser'),
      // Opens the file chooser.
      // page.locator('div[role=button]').click(),
      headerMenu.OpenNewItemMenuSection(headerMenu.NewItemMenu.Upload),
    ]);
    await fileChooser.setFiles('C://Users/USER/Desktop/aacat.jpg');
  });
});