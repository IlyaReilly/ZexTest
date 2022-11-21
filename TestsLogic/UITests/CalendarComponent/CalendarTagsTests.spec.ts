import {expect} from '@playwright/test';
import {test, BaseTest} from '../../UITests/BaseTest';

test.describe('Calendars tests', async () => {
  let dateTimePrefix;
  let tagName;
  const newTagName = 'New zextras tag';

  test.beforeAll(async ({apiManager}) => {
    const allAppionmentsIds = await apiManager.calendarAPI.GetAllAppointments(BaseTest.userForLogin.login);
    await Promise.all(allAppionmentsIds.map(async (id) => {
      return await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    }));
  });

  test.beforeEach(async ({pageManager, apiManager}) => {
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    tagName = dateTimePrefix + ' Autotest Tag';
    try {
      await DeleteAllTagsViaAPI({apiManager});
    } catch (e) {
      e;
    } finally {
      await apiManager.createTagsAPI.CreateTagRequest(tagName, BaseTest.userForLogin.login);
      await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    };
  });

  test.afterEach(async ({page, apiManager}) => {
    try {
      await DeleteAllTagsViaAPI({apiManager});
    } catch (e) {
      e;
    } finally {
      await page.close();
    };
  });

  async function DeleteAllTagsViaAPI({apiManager}) {
    const id = await apiManager.tagsAPI.GetTags();
    const idsString = id.join(',');
    await apiManager.deleteTagsAPI.DeleteTagRequest(idsString, BaseTest.userForLogin.login);
  }

  test('TC1002. Create tag in side calendar menu. Tag should be in Tags tab.', async ({pageManager}) => {
    await pageManager.sideSecondaryCalendarMenu.OpenTagContextMenuOption.CreateTagButton();
    await pageManager.newTagModal.CreateTag(tagName);
    await pageManager.sideSecondaryCalendarMenu.OpenTagChevron();
    await expect(pageManager.sideSecondaryCalendarMenu.Elements.Item.locator(`"${tagName}"`)).toBeVisible();
  });

  test('TC1003. Delete tag in side calendar menu. Tag should not be in Tags tab.', async ({pageManager}) => {
    await pageManager.sideSecondaryCalendarMenu.OpenTagChevron();
    await pageManager.sideSecondaryCalendarMenu.OpenTagContextMenuOption.DeleteTagButton(tagName);
    await pageManager.deleteCalendarModal.Buttons.Delete.click();
    await expect(pageManager.sideSecondaryCalendarMenu.Elements.Item.locator(`"${tagName}"`)).not.toBeVisible();
  });

  test('TC1004. Rename tag in side calendar menu. Tag should be renamed.', async ({pageManager}) => {
    await pageManager.sideSecondaryCalendarMenu.OpenTagChevron();
    await pageManager.sideSecondaryCalendarMenu.OpenTagContextMenuOption.EditTagButton(tagName);
    await pageManager.editTagModal.EditNameTag(newTagName);
    await expect(pageManager.sideSecondaryCalendarMenu.Elements.Item.locator(`"${newTagName}"`)).toBeVisible();
  });
});
