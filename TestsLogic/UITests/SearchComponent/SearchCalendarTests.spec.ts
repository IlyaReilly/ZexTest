import {expect} from '@playwright/test';
import {test, BaseTest} from '../../BaseTest';

test.describe('Search tests', async () => {
  let uniquePrefix;
  let appointmentName;
  let tagName;

  test.beforeEach(async ({apiManager}) => {
    uniquePrefix = BaseTest.dateTimePrefix();
    appointmentName = uniquePrefix + ' AppointmentName Name';
    tagName = uniquePrefix + ' Autotest Tag';
    await DeleteAllTagsViaAPI({apiManager});
    await DeleteAllAppointmentsViaAPI({apiManager});
  });

  test.afterEach(async ({page, apiManager}) => {
    await DeleteAllAppointmentsViaAPI({apiManager});
    await DeleteAllTagsViaAPI({apiManager});
    await page.close();
  });

  async function DeleteAllAppointmentsViaAPI({apiManager}) {
    const allAppionmentsIds = await apiManager.calendarAPI.GetAllAppointments(BaseTest.userForLogin.login);
    await Promise.all(allAppionmentsIds.map(async (id) => {
      return await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    }));
  };

  async function DeleteAllTagsViaAPI({apiManager}) {
    const ids = await apiManager.tagsAPI.GetTags();
    await apiManager.deleteTagsAPI.DeleteTagRequest(ids.join(','), BaseTest.userForLogin.login);
  };

  async function OpenSearchTabAndOpenAdvancedFilters({pageManager}) {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Search);
    await pageManager.searchResultsList.Buttons.AdvancedFilters.click();
  };

  async function CreateAppointmentWithTag({pageManager, apiManager, page}) {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await apiManager.createCalendarAPI.CreateAppointmentRequest(appointmentName, BaseTest.userForLogin.login, 2, 'appointmentName body');
    await apiManager.createTagsAPI.CreateTagRequest(tagName, BaseTest.userForLogin.login);
    await page.waitForLoadState('domcontentloaded');
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyCalendar();
    await pageManager.calendar.ChooseTagForAppointment(appointmentName, tagName);
  };

  test('TC704. Search appointment while calendar is active', async ({apiManager, pageManager}) => {
    await apiManager.createCalendarAPI.CreateAppointmentRequest(appointmentName, BaseTest.userForLogin.login, 2, 'appointmentName body');
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await pageManager.sideSecondaryCalendarMenu.CalendarSelecting.Select();
    await pageManager.headerMenu.MakeSearch(uniquePrefix);
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${appointmentName}"`)).toBeVisible();
  });

  test('TC714. Search by tag found appointment. The appointment should be found by tag', async ({apiManager, pageManager, page}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await CreateAppointmentWithTag({pageManager, apiManager, page});
    await pageManager.headerMenu.MakeSearch(`tag:"${tagName}"`);
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${appointmentName}"`)).toBeVisible();
  });

  // 141 Bug with tag dropdown
  test.skip('TC713. Search by tag in advanced option found appointment. The appointment should be found by tag', async ({apiManager, pageManager, page}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await CreateAppointmentWithTag({pageManager, apiManager, page});
    await OpenSearchTabAndOpenAdvancedFilters({pageManager});
    await pageManager.advancedFiltersModal.ChooseTagInDropdown(tagName);
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${appointmentName}"`)).toBeVisible();
  });
});
