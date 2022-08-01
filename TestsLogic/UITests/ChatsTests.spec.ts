import { expect, Page } from '@playwright/test';
import { test, pageManager, playwrightProjectsData, apiManager } from './BaseTest';

test.describe('Chats tests', async () => {

  let page: Page;
  let dateTimePrefix;
  let spaceTitle;
  let spaceTopic;
  let runtimeAppoinmentId = '';

  // Components
  let headerMenu;
  let sideMenu;
  let sideSecondaryCalendarMenu;
  let newChatsItem;
  let calendar;
  let calendarAPI;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/');
    calendarAPI = await apiManager.getCalendarAPI(page);
    headerMenu = await pageManager.getHeaderMenuComponent(page);
    sideMenu = await pageManager.getSideMenuComponent(page);
    newChatsItem = await pageManager.getNewChatsItemComponent(page);
    calendar = await pageManager.getCalendarComponent(page);
    sideSecondaryCalendarMenu = await pageManager.getSideSecondaryCalendarMenuComponent(page);
  });

  test.beforeEach(async () => {
    await page.reload();
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    spaceTitle = dateTimePrefix + ' Autotest Space Title';
    spaceTopic = dateTimePrefix + ' Autotest Space Topic';
  });

  test.afterEach(async({login}) => {
    await calendarAPI.ItemActionRequest(calendarAPI.ActionRequestTypes.delete, runtimeAppoinmentId, login);
    var id = await calendarAPI.CalendarSearchQuery(spaceTitle, login);
    await calendarAPI.ItemActionRequest(calendarAPI.ActionRequestTypes.delete, id, login);
  });
  
  test.afterAll(async () => {
    await page.close();
  });

  test('Create space. Space should appear in spaces list.', async ({}) => {
    await sideMenu.OpenMenuTab(sideMenu.SideMenuTabs.Chats);
    await headerMenu.OpenNewItemMenuSection(headerMenu.NewItemMenu.CreateSpace);
    await newChatsItem.CreateSpace(spaceTitle, );
  });
});