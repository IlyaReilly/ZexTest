import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';

test.describe('Sharing calendar tests', async () => {
  let dateTimePrefix;
  let appointmentTitle;
  let appointmentBody;

  test.beforeAll(async ({page, apiManager}) => {
    const allAppionmentsIds = await apiManager.calendarAPI.GetAllAppointments(BaseTest.userForLogin.login);
    await Promise.all(allAppionmentsIds.map(async (id) => {
      return await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    }));
  });

  test.beforeEach(async ({apiManager}) => {
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    appointmentTitle = dateTimePrefix + ' Autotest Appointment Title';
    appointmentBody = dateTimePrefix + ' Autotest Appointment Body';
    await apiManager.calendarAPI.RevokeSharingOfCalendar(BaseTest.userForLogin.login);
  });

  test.afterEach(async ({page, apiManager}) => {
    const id = await apiManager.calendarAPI.CalendarSearchQuery(appointmentTitle, BaseTest.userForLogin.login);
    await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    await apiManager.calendarAPI.RevokeSharingOfCalendar(BaseTest.userForLogin.login);
    await page.close();
  });

  test('Share Calendar. Calendar access share window has ICS OUTLOOK VIEW urls.', async ({page, pageManager, apiManager}) => {
    await apiManager.calendarAPI.CreateAppointmentRequest(appointmentTitle, BaseTest.userForLogin.login, '3', appointmentBody);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await pageManager.sideSecondaryCalendarMenu.OpenCalendarContextMenuOption.ShareCalendar();
    await pageManager.shareCalendarModal.TextBoxes.Recipients.type(BaseTest.secondUser.login);
    await pageManager.shareCalendarModal.TextBoxes.Recipients.press('Enter');
    const elementHandle = await page.$(pageManager.shareCalendarModal.Buttons.ShareButton._selector);
    await elementHandle?.waitForElementState('enabled');
    await pageManager.shareCalendarModal.Buttons.ShareButton.click();
    await expect(pageManager.calendarAccessShareModal.Buttons.IcsUrl, 'Calendar access share window should contain ICS URL button').toBeVisible();
    await expect(pageManager.calendarAccessShareModal.Buttons.OutlookUrl, 'Calendar access share window should contain OUTLOOK URL button').toBeVisible();
    await expect(pageManager.calendarAccessShareModal.Buttons.ViewUrl, 'Calendar access share window should contain VIEW URL button').toBeVisible();
  });

  test('Share Calendar. Check shared icon and notification.', async ({page, pageManager, apiManager}) => {
    await apiManager.calendarAPI.CreateAppointmentRequest(appointmentTitle, BaseTest.userForLogin.login, '3', appointmentBody);
    await apiManager.calendarAPI.ShareCalendar(BaseTest.userForLogin.login, BaseTest.secondUser.login);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await expect(pageManager.sideSecondaryCalendarMenu.Icons.SharedIcon, 'Shared icon should be presented opposite calendar when it is shared').toBeVisible();
    await page.hover(pageManager.sideSecondaryCalendarMenu.Icons.SharedIcon._selector);
    await expect(pageManager.sideSecondaryCalendarMenu.Hints.SharedHint, 'Shared icon should display hint with the number of people for sharing').toBeVisible();
  });

  test('Revoke sharing. Sharing icon should disapear.', async ({page, pageManager, apiManager}) => {
    const regexp = /@.+/gi;
    await apiManager.calendarAPI.CreateAppointmentRequest(appointmentTitle, BaseTest.userForLogin.login, '3', appointmentBody);
    await apiManager.calendarAPI.ShareCalendar(BaseTest.userForLogin.login, BaseTest.secondUser.login);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await expect(pageManager.sideSecondaryCalendarMenu.Icons.SharedIcon, 'Shared icon should be presented opposite calendar when it is shared').toBeVisible();
    await pageManager.sideSecondaryCalendarMenu.OpenCalendarContextMenuOption.EditCalendarProperties();
    const shredWithUserName = BaseTest.secondUser.login.replace(regexp, '');
    await pageManager.editCalendarPropertyModal.SharingThisFolderActions.Revoke(shredWithUserName);
    await pageManager.revokeShareCalendarModal.Buttons.Revoke.click();
    await pageManager.editCalendarPropertyModal.Buttons.Ok.click();
    await expect(pageManager.sideSecondaryCalendarMenu.Icons.SharedIcon, 'Shared icon should be not presented after revoke of sharing').toHaveCount(0);
  });
});

