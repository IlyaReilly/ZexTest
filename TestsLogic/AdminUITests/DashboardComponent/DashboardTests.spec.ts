import {test} from '../../BaseTest';

// Only architecture for admin tests
test.describe('Admin. Dashboard tests.', async () => {
  test.skip('Dashboard tests.', async ({adminPage}) => {
    await adminPage.click('"CREATE"');
  });
});
