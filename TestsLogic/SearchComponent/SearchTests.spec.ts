import {expect} from '@playwright/test';
import fs from "fs";
import path from "path";
import {test, BaseTest} from '../UITests/BaseTest';

test.describe('Search tests', async () => {
  // Components
  let uniquePrefix;

  test.beforeEach(async () => {
    uniquePrefix = BaseTest.dateTimePrefix();
  });

  test.afterEach(async ({page}) => {
    await page.close();
  });

  test('Search sent email', async ({pageManager, apiManager}) => {
    const mailSubject = uniquePrefix + ' Autotest Mail Subject';
    const mailBody = uniquePrefix + ' Autotest Mail Body';
    try {
      await apiManager.mailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.userForLogin.login, mailBody);
      await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
      await pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`).waitFor();
      await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Search);
      await pageManager.headerMenu.MakeSearch(uniquePrefix);
      await expect(pageManager.searchResultsList.Elements.SearchResultMail.locator(`"${mailSubject}"`)).toBeVisible();
      await expect(pageManager.searchStatisticsHeader.Elements.SearchSnippets.locator(`"${uniquePrefix}"`)).toBeVisible();
    } catch (e) {
      throw e;
    } finally {
      const id = await apiManager.mailsAPI.MailSearchQuery(mailSubject, BaseTest.userForLogin.login);
      await apiManager.mailsAPI.ItemActionRequest(apiManager.mailsAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    }
  });

  test('Search contact', async ({apiManager, pageManager}) => {
    const contactName = uniquePrefix + ' First Contact Name';
    try {
      await apiManager.contactsAPI.CreateContact(contactName, BaseTest.userForLogin.login);
      await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
      await pageManager.headerMenu.MakeSearch(uniquePrefix);
      await expect(pageManager.searchResultsList.Elements.SearchResultContacts.locator(`"${contactName}"`)).toBeVisible();
    } catch (e) {
      throw e;
    } finally {
      const id = await apiManager.contactsAPI.ContactsSearchQuery(contactName, BaseTest.userForLogin.login);
      await apiManager.contactsAPI.DeleteContactsPermanentlyById(id, BaseTest.userForLogin.login);
    }
  });

  // Unstable test due to bug
  test('Search appointment', async ({apiManager, pageManager}) => {
    test.slow();
    const appointmentName = uniquePrefix + ' AppointmentName Name';
    try {
      await apiManager.calendarAPI.CreateAppointmentRequest(appointmentName, BaseTest.userForLogin.login, 2, 'appointmentName body');
      await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
      await pageManager.headerMenu.MakeSearch(uniquePrefix);
      await expect(pageManager.searchResultsList.Elements.SearchResultAppointments.locator(`"${appointmentName}"`)).toBeVisible();
    } catch (e) {
      throw e;
    } finally {
      const id = await apiManager.calendarAPI.CalendarSearchQuery(appointmentName, BaseTest.userForLogin.login);
      await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    }
  });

  test('Search file', async ({apiManager, pageManager}) => {
    const templateFileName = 'fileForSearch.png';
    const fileName = uniquePrefix + 'fileForSearch';
    const fileNameFull = fileName + '.png';
    const filePathSrc = path.resolve("./TestData/Files/", templateFileName);
    const filePathDest = path.resolve("./TestData/Files/", fileNameFull);
    fs.copyFileSync(filePathSrc, filePathDest);
    try {
      await apiManager.filesAPI.UploadFileViaAPI(fileNameFull);
      await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
      await pageManager.headerMenu.MakeSearch(fileName);
      await expect(pageManager.searchResultsList.Elements.SearchResultFiles.locator(`"${fileName}"`)).toBeVisible();
    } catch (e) {
      throw e;
    } finally {
      fs.unlinkSync(filePathDest);
      const id = await apiManager.filesAPI.FilesSearchQuery(fileName);
      await apiManager.filesAPI.DeleteFilePermanentlyById(id);
    }
  });
});
