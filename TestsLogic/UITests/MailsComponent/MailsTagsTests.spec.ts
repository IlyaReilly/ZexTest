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
    await pageManager.sideSecondaryMailMenu.OpenFolderContextMenu(pageManager.sideSecondaryMailMenu.MailFolders.Tags);
    await pageManager.sideSecondaryMailMenu.SelectMailFolderOption.CreateTag();
    await pageManager.newTagModal.CreateTag(tagName);
    await pageManager.sideSecondaryMailMenu.ExpandMailFolders.Tags();
    await expect(pageManager.sideSecondaryMailMenu.Elements.Item.locator(`"${tagName}"`)).toBeVisible();
  });

  test('TC1006. Delete tag in side mail menu. Tag should not be in Tags tab.', async ({pageManager}) => {
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Inbox();
    await pageManager.sideSecondaryMailMenu.ExpandMailFolders.Tags();
    await pageManager.sideSecondaryMailMenu.OpenFolderContextMenu(pageManager.sideSecondaryMailMenu.Elements.Item.locator(`"${tagName}"`));
    await pageManager.sideSecondaryMailMenu.SelectMailFolderOption.DeleteTag();
    await pageManager.deleteCalendarModal.Buttons.Delete.click();
    await expect(pageManager.sideSecondaryCalendarMenu.Elements.Item.locator(`"${tagName}"`)).not.toBeVisible();
  });

  test('TC1007. Rename tag in side mail menu. Tag should be renamed.', async ({pageManager}) => {
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Inbox();
    await pageManager.sideSecondaryMailMenu.ExpandMailFolders.Tags();
    await pageManager.sideSecondaryMailMenu.OpenFolderContextMenu(pageManager.sideSecondaryMailMenu.Elements.Item.locator(`"${tagName}"`));
    await pageManager.sideSecondaryMailMenu.SelectMailFolderOption.EditTag();
    await pageManager.editTagModal.EditNameTag(newTagName);
    await expect(pageManager.sideSecondaryCalendarMenu.Elements.Item.locator(`"${newTagName}"`)).toBeVisible();
  });
});
