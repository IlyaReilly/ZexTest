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

  test.beforeEach(async ({apiManager, secondPageManager}) => {
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    appointmentTitle = dateTimePrefix + ' Autotest Appointment Title';
    appointmentBody = dateTimePrefix + ' Autotest Appointment Body';
    await apiManager.calendarAPI.CreateAppointmentRequest(appointmentTitle, BaseTest.userForLogin.login, BaseTest.secondUser.login, appointmentBody);
    await secondPageManager.sideMenu.OpenMenuTab(secondPageManager.sideMenu.SideMenuTabs.Mail);
    await secondPageManager.sideSecondaryMailMenu.OpenMailFolder(secondPageManager.sideSecondaryMailMenu.MailFolders.Inbox);
  });

  test.afterEach(async ({page}) => {
    await page.close();
  });

  test('Create new appointment. Attendee receives invitation.', async ({secondPageManager}) => {
    test.slow();
    await expect(secondPageManager.mailsList.Elements.Letter.locator(`"${appointmentTitle}"`), 'User receives invitation mail with appointment title in subject').toBeVisible();
  });

  test('Create new appointment. Attendee receives invitation with options Yes, Maybe, No, Propose New Time.', async ({secondPageManager}) => {
    test.slow();
    await secondPageManager.mailsList.OpenMail(appointmentTitle);
    await expect(secondPageManager.mailDetails.AppointmentInvitationOptions.Yes, 'Appointments invitation message has option Yes').toBeVisible();
    await expect(secondPageManager.mailDetails.AppointmentInvitationOptions.No, 'Appointments invitation message has option No').toBeVisible();
    await expect(secondPageManager.mailDetails.AppointmentInvitationOptions.Maybe, 'Appointments invitation message has option Maybe').toBeVisible();
    await expect(secondPageManager.mailDetails.AppointmentInvitationOptions.ProposeNewTime, 'Appointments invitation message has option Propose new time').toBeVisible();
  });

  test('Create new appointment. Attendee receives invitation with Participants.', async ({secondPageManager}) => {
    test.slow();
    await secondPageManager.mailsList.OpenMail(appointmentTitle);
    await expect(secondPageManager.mailDetails.AppointmentParticipantsSection.locator(`"${BaseTest.userForLogin.login}"`), `Appointment has ${BaseTest.userForLogin.login} in participants`).toBeVisible();
    await expect(secondPageManager.mailDetails.AppointmentParticipantsSection.locator(`"${BaseTest.secondUser.login}"`), `Appointment has ${BaseTest.secondUser.password} in participants`).toBeVisible();
  });

  test.skip('Create new appointment. Attendee receives invitation with Participants count.', async ({secondPageManager}) => {
    test.fail();
    const participantsCount = '2 Participants';
    await secondPageManager.mailsList.OpenMail(appointmentTitle);
    await expect(secondPageManager.mailDetails.AppointmentParticipantsSection.locator(`"${participantsCount}"`), `Appointment has "${participantsCount}" count`).toBeVisible();
  });
});
