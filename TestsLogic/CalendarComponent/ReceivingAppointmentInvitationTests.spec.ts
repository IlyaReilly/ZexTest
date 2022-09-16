import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';

test.describe('Calendars tests. Receiving invitation.', async () => {
  let dateTimePrefix;
  let appointmentTitle;
  let appointmentBody;

  test.beforeAll(async ({apiManager}) => {
    const allAppionmentsIds = await apiManager.calendarAPI.GetAllAppointments(BaseTest.userForLogin.login);
    await Promise.all(allAppionmentsIds.map(async (id) => {
      return await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    }));
  });

  test.beforeEach(async ({pageManager, apiManager}) => {
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    appointmentTitle = dateTimePrefix + ' Autotest Appointment Title';
    appointmentBody = dateTimePrefix + ' Autotest Appointment Body';
    await apiManager.calendarAPI.CreateAppointmentRequest(appointmentTitle, BaseTest.userForLogin.login, BaseTest.secondUser.login, appointmentBody);
    await pageManager.loginPage.Relogin(BaseTest.secondUser.login, BaseTest.secondUser.password);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder(pageManager.sideSecondaryMailMenu.MailFolders.Inbox);
  });

  test.afterEach(async ({page, apiManager, pageManager}) => {
    await pageManager.loginPage.Relogin(BaseTest.userForLogin.login, BaseTest.userForLogin.password);
    const id = await apiManager.calendarAPI.CalendarSearchQuery(appointmentTitle, BaseTest.userForLogin.login);
    await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    await page.close();
  });

  test('Create new appointment. Attendee receives invitation.', async ({pageManager, apiManager}) => {
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${appointmentTitle}"`), 'User receives invitation mail with appointment title in subject').toBeVisible();
  });

  test('Create new appointment. Attendee receives invitation with options Yes, Maybe, No, Propose New Time.', async ({pageManager, apiManager}) => {
    await pageManager.mailsList.OpenMail(appointmentTitle);
    await expect(pageManager.mailDetails.AppointmentInvitationOptions.Yes, 'Appointments invitation message has option Yes').toBeVisible();
    await expect(pageManager.mailDetails.AppointmentInvitationOptions.No, 'Appointments invitation message has option No').toBeVisible();
    await expect(pageManager.mailDetails.AppointmentInvitationOptions.Maybe, 'Appointments invitation message has option Maybe').toBeVisible();
    await expect(pageManager.mailDetails.AppointmentInvitationOptions.ProposeNewTime, 'Appointments invitation message has option Propose new time').toBeVisible();
  });

  test('Create new appointment. Attendee receives invitation with Participants.', async ({pageManager, apiManager}) => {
    await pageManager.mailsList.OpenMail(appointmentTitle);
    await expect(pageManager.mailDetails.AppointmentParticipantsSection.locator(`"${BaseTest.userForLogin.login}"`), `Appointment has ${BaseTest.userForLogin.login} in participants`).toBeVisible();
    await expect(pageManager.mailDetails.AppointmentParticipantsSection.locator(`"${BaseTest.secondUser.login}"`), `Appointment has ${BaseTest.secondUser.password} in participants`).toBeVisible();
  });

  test('Create new appointment. Attendee receives invitation with Participants count.', async ({pageManager, apiManager}) => {
    test.fail();
    const participantsCount = '2 Participants';
    await pageManager.mailsList.OpenMail(appointmentTitle);
    await expect(pageManager.mailDetails.AppointmentParticipantsSection.locator(`"${participantsCount}"`), `Appointment has "${participantsCount}" count`).toBeVisible();
  });
});
