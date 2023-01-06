import {test} from '../BaseTest';
import {expect} from '@playwright/test';

test.describe('Admin. Help Center.', async () => {
  // Should be validated on he test agent. Could be differences in this URL. f.e.
  // https://docs.zextras.com/carbonio-ce/html/management.html
  const helpCenterURL = 'https://docs.zextras.com/carbonio/html/administration.html';

  test(`Open help center. Open URL ${helpCenterURL}`, async ({adminPage, adminPageManager}) => {
    const [newPage] = await Promise.all([
      adminPage.waitForEvent('popup'),
      adminPageManager.adminHeaderMenu.Links.HelpCenter.click(),
    ]);
    await newPage.waitForLoadState();
    await expect(newPage.url()).toEqual(helpCenterURL);
  });
});
