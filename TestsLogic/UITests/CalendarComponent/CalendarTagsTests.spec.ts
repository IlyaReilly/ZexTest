import {expect} from '@playwright/test';
import {test, BaseTest} from '../../UITests/BaseTest';
import Colors from '../../../TestData/IconColorList.json';

test.describe('Calendars tests', async () => {
  let tagName;
  const newTagName = 'New zextras tag';

  test.beforeAll(async ({apiManager}) => {
    const allAppionmentsIds = await apiManager.calendarAPI.GetAllAppointments(BaseTest.userForLogin.login);
    await Promise.all(allAppionmentsIds.map(async (id) => {
      return await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    }));
  });

  test.beforeEach(async ({pageManager, apiManager}) => {
    tagName = BaseTest.dateTimePrefix() + ' Autotest Tag';
    await DeleteAllTagsViaAPI({apiManager});
    await apiManager.createTagsAPI.CreateTagRequest(tagName, BaseTest.userForLogin.login);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
  });

  test.afterEach(async ({page, apiManager}) => {
    await DeleteAllTagsViaAPI({apiManager});
    await page.close();
  });

  async function DeleteAllTagsViaAPI({apiManager}) {
    const ids = await apiManager.tagsAPI.GetTags();
    await apiManager.deleteTagsAPI.DeleteTagRequest(ids.join(','), BaseTest.userForLogin.login);
  };

  test('TC1002. Create tag in side calendar menu. Tag should be in Tags tab.', async ({pageManager}) => {
    await pageManager.gotoTagModal.OpenTagContextMenu.CreateTagModal();
    await pageManager.newTagModal.CreateTag(tagName);
    await pageManager.gotoTagModal.ExpandTagsFolder();
    await expect(pageManager.sideSecondaryCalendarMenu.Elements.Item.locator(`"${tagName}"`)).toBeVisible();
  });

  test('TC1003. Delete tag in side calendar menu. Tag should not be in Tags tab.', async ({pageManager}) => {
    await pageManager.gotoTagModal.ExpandTagsFolder();
    await pageManager.gotoTagModal.OpenTagContextMenu.DeleteTagModal(tagName);
    await pageManager.deleteCalendarModal.Buttons.Delete.click();
    await expect(pageManager.sideSecondaryCalendarMenu.Elements.Item.locator(`"${tagName}"`)).not.toBeVisible();
  });

  test('TC1004. Rename tag in side calendar menu. Tag should be renamed.', async ({pageManager}) => {
    await pageManager.gotoTagModal.ExpandTagsFolder();
    await pageManager.gotoTagModal.OpenTagContextMenu.EditTagModal(tagName);
    await pageManager.editTagModal.EditNameTag(newTagName);
    await expect(pageManager.sideSecondaryCalendarMenu.Elements.Item.locator(`"${newTagName}"`)).toBeVisible();
  });

  for (const color of Colors) {
    test('TC1011. Change color in tag in side calendar menu. Tag should be change color' + `${color.ColorSet}`, async ({pageManager, page}) => {
      await pageManager.gotoTagModal.ExpandTagsFolder();
      await pageManager.gotoTagModal.OpenTagContextMenu.EditTagModal(tagName);
      await pageManager.editTagModal.ChooseColor(`${color.ColorSet}`);
      await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`${color.ColorCheck}[icon = "Tag"]`)).toBeVisible();
    });
  }
});
