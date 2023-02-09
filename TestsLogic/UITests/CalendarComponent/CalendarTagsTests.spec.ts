import {expect} from '@playwright/test';
import {test, BaseTest} from '../../BaseTest';
import Colors from '../../../TestData/IconColorList.json';

test.describe('Tags tests', async () => {
  let tagName;
  const newTagName = 'New zextras tag';

  test.beforeEach(async ({pageManager, apiManager}) => {
    BaseTest.setFeatureSuite.calendars();
    tagName = BaseTest.dateTimePrefix() + ' Autotest Tag';
    await apiManager.tagsAPI.DeleteTagsViaAPI({apiManager});
    await apiManager.createTagsAPI.CreateTagRequest(tagName, BaseTest.userForLogin.login);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
  });

  test.afterEach(async ({page, apiManager}) => {
    await apiManager.tagsAPI.DeleteTagsViaAPI({apiManager});
    await page.close();
  });

  test('TC1002. Create tag in side calendar menu. Tag should be in Tags tab. @criticalPath', async ({pageManager}) => {
    await BaseTest.setSuite.criticalPath();
    await pageManager.tagModals.OpenTagContextMenu.CreateTagModal();
    await pageManager.newTagModal.CreateTag(tagName);
    await pageManager.tagModals.ExpandTagsFolder();
    await expect(pageManager.sideSecondaryCalendarMenu.Elements.Item.locator(`"${tagName}"`)).toBeVisible();
  });

  test('TC1003. Delete tag in side calendar menu. Tag should not be in Tags tab.', async ({pageManager}) => {
    await pageManager.tagModals.ExpandTagsFolder();
    await pageManager.tagModals.OpenTagContextMenu.DeleteTagModal(tagName);
    await pageManager.deleteCalendarModal.Buttons.Delete.click();
    await expect(pageManager.sideSecondaryCalendarMenu.Elements.Item.locator(`"${tagName}"`)).not.toBeVisible();
  });

  test('TC1004. Rename tag in side calendar menu. Tag should be renamed.', async ({pageManager}) => {
    await pageManager.tagModals.ExpandTagsFolder();
    await pageManager.tagModals.OpenTagContextMenu.EditTagModal(tagName);
    await pageManager.editTagModal.EditNameTag(newTagName);
    await expect(pageManager.sideSecondaryCalendarMenu.Elements.Item.locator(`"${newTagName}"`)).toBeVisible();
  });

  for (const color of Colors) {
    test(`TC1011. Change tag color in side calendar menu. Tag color should change to ${color.ColorSet}`, async ({pageManager}) => {
      await pageManager.tagModals.ExpandTagsFolder();
      await pageManager.editTagModal.ChooseColor({pageManager}, color.ColorSet, tagName);
      await expect(pageManager.sideSecondaryCalendarMenu.Containers.MainContainer.locator(`${color.ColorCheck}[icon = "Tag"]`)).toBeVisible();
    });
  };
});
