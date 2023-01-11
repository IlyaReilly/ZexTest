import {expect} from '@playwright/test';
import {test, BaseTest} from '../../BaseTest';

test.describe('Calendars tests. Receiving invitation.', async () => {
  let dateTimePrefix;
  let appointmentTitle;
  let appointmentBody;

  test.beforeEach(async ({apiManager, secondPageManager}) => {
    BaseTest.doubleTimeout();
    dateTimePrefix = new Date().getDate().toString() + new Date().getTime().toString();
    appointmentTitle = dateTimePrefix + ' Autotest Appointment Title';
    appointmentBody = dateTimePrefix + ' Autotest Appointment Body';
    await apiManager.calendarAPI.DeleteAppointmentsAndCalendarsViaAPI({apiManager});
    await apiManager.createCalendarAPI.CreateAppointmentRequest(appointmentTitle, BaseTest.userForLogin.login, BaseTest.secondUser.login, appointmentBody);
    await secondPageManager.sideMenu.OpenMenuTab(secondPageManager.sideMenu.SideMenuTabs.Mail);
    await secondPageManager.sideSecondaryMailMenu.OpenMailFolder.Inbox();
  });

  test.afterEach(async ({apiManager, page}) => {
    await apiManager.calendarAPI.DeleteAppointmentsAndCalendarsViaAPI({apiManager});
    await page.close();
  });

  test('TC1101. Create new appointment. Attendee receives invitation.', async ({secondPageManager}) => {
    BaseTest.doubleTimeout();
    await expect(secondPageManager.mailsList.Elements.Letter.locator(`"${appointmentTitle}"`), 'User receives invitation mail with appointment title in subject').toBeVisible();
  });

  test('TC1102. Create new appointment. Attendee receives invitation with options Yes, Maybe, No, Propose New Time.', async ({secondPageManager}) => {
    BaseTest.doubleTimeout();
    await secondPageManager.mailsList.OpenMail(appointmentTitle);
    await expect(secondPageManager.mailDetails.AppointmentInvitationOptions.Yes, 'Appointments invitation message has option Yes').toBeVisible();
    await expect(secondPageManager.mailDetails.AppointmentInvitationOptions.No, 'Appointments invitation message has option No').toBeVisible();
    await expect(secondPageManager.mailDetails.AppointmentInvitationOptions.Maybe, 'Appointments invitation message has option Maybe').toBeVisible();
    await expect(secondPageManager.mailDetails.AppointmentInvitationOptions.ProposeNewTime, 'Appointments invitation message has option Propose new time').toBeVisible();
  });

  test('TC1103. Create new appointment. Attendee receives invitation with Participants.', async ({secondPageManager}) => {
    BaseTest.doubleTimeout();
    await secondPageManager.mailsList.OpenMail(appointmentTitle);
    await expect(secondPageManager.mailDetails.AppointmentParticipantsSection.locator(`"${BaseTest.userForLogin.login}"`), `Appointment has ${BaseTest.userForLogin.login} in participants`).toBeVisible();
    await expect(secondPageManager.mailDetails.AppointmentParticipantsSection.locator(`"${BaseTest.secondUser.login}"`), `Appointment has ${BaseTest.secondUser.password} in participants`).toBeVisible();
  });

  test('TC1104. Create new appointment. Attendee receives invitation with Participants count.', async ({secondPageManager}) => {
    test.fail();
    const participantsCount = '2 Participants';
    await secondPageManager.mailsList.OpenMail(appointmentTitle);
    await expect(secondPageManager.mailDetails.AppointmentParticipantsSection.locator(`"${participantsCount}"`), `Appointment has "${participantsCount}" count`).toBeVisible();
  });
});
