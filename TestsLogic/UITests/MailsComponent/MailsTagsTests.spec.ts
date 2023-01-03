import {expect} from '@playwright/test';
import {test, BaseTest} from '../../UITests/BaseTest';

test.describe('Calendars tests', async () => {
  let tagName;
  const newTagName = 'New zextras tag';

  test.beforeEach(async ({pageManager, apiManager}) => {
    tagName = BaseTest.dateTimePrefix() + ' Autotest Tag';
    await DeleteAllTagsViaAPI({apiManager});
    await apiManager.createTagsAPI.CreateTagRequest(tagName, BaseTest.userForLogin.login);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
  });

  test.afterEach(async ({page, apiManager}) => {
    await DeleteAllTagsViaAPI({apiManager});
    await page.close();
  });

  async function DeleteAllTagsViaAPI({apiManager}) {
    const ids = await apiManager.tagsAPI.GetTags();
    await apiManager.deleteTagsAPI.DeleteTagRequest(ids.join(','), BaseTest.userForLogin.login);
  };

  test('TC1005. Create tag in side mail menu. Tag should be in Tags tab.', async ({pageManager}) => {
    await pageManager.tagModals.OpenTagContextMenu.CreateTagModal();
    await pageManager.newTagModal.CreateTag(tagName);
    await pageManager.tagModals.ExpandTagsFolder();
    await expect(pageManager.sideSecondaryMailMenu.Elements.Item.locator(`"${tagName}"`)).toBeVisible();
  });

  test('TC1006. Delete tag in side mail menu. Tag should not be in Tags tab.', async ({pageManager}) => {
    await pageManager.tagModals.Buttons.ExpandTags.click();
    await pageManager.tagModals.OpenTagContextMenu.DeleteTagModal(tagName);
    await pageManager.deleteMailModal.Buttons.Delete.click();
    await expect(pageManager.sideSecondaryMailMenu.Elements.Item.locator(`"${tagName}"`)).not.toBeVisible();
  });

  test('TC1007. Rename tag in side mail menu. Tag should be renamed.', async ({pageManager}) => {
    await pageManager.tagModals.Buttons.ExpandTags.click();
    await pageManager.tagModals.OpenTagContextMenu.EditTagModal(tagName);
    await pageManager.editTagModal.EditNameTag(newTagName);
    await expect(pageManager.sideSecondaryMailMenu.Elements.Item.locator(`"${newTagName}"`)).toBeVisible();
  });
});
