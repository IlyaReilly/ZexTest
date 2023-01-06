import {test} from '../../BaseTest';

// Only architecture for admin tests
test.describe('Admin. Dashboard tests.', async () => {
  test.skip('Dashboard tests.', async ({adminPage, adminPageManager}) => {
    await adminPageManager.adminHeaderMenu.Dropdowns.Create.click();
  });
});
