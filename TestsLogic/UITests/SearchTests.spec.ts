import {expect} from '@playwright/test';
import fs from "fs";
import path from "path";
import {test, BaseTest} from './BaseTest';

test.describe('Search tests', async () => {
  // Components
  let uniquePrefix;
  let userForLogin;

  test.beforeEach(async ({}, workerInfo) => {
    uniquePrefix = BaseTest.dateTimePrefix();
    userForLogin = BaseTest.GetUserFromPool(workerInfo.workerIndex);
  });

  test.afterEach(async ({page}) => {
  });

  test('Search sent email', async ({pageManager, apiManager}) => {
    const mailSubject = uniquePrefix + ' Autotest Mail Subject';
    const mailBody = uniquePrefix + ' Autotest Mail Body';

    try {
      await apiManager.mailsAPI.SendMsgRequest(mailSubject, userForLogin.login, userForLogin.login, mailBody);
      await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
      await pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`).waitFor();
      await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Search);
      await pageManager.headerMenu.MakeSearch(uniquePrefix);
      await expect(pageManager.searchResultsList.Elements.SearchResultMail.locator(`"${mailSubject}"`)).toBeVisible();
      await expect(pageManager.searchStatisticsHeader.Elements.SearchSnippets.locator(`"${uniquePrefix}"`)).toBeVisible();
    } catch (e) {
      throw e;
    } finally {
      const id = await apiManager.mailsAPI.MailSearchQuery(mailSubject, userForLogin.login);
      await apiManager.mailsAPI.ItemActionRequest(apiManager.mailsAPI.ActionRequestTypes.delete, id, userForLogin.login);
    }
  });

  test('Search contact', async ({apiManager, pageManager}) => {
    const contactName = uniquePrefix + ' First Contact Name';

    try {
      await apiManager.сontactsAPI.CreateContact(contactName, userForLogin.login);
      await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
      await pageManager.headerMenu.MakeSearch(uniquePrefix);
      await expect(pageManager.searchResultsList.Elements.SearchResultContacts.locator(`"${contactName}"`)).toBeVisible();
    } catch (e) {
      throw e;
    } finally {
      const id = await apiManager.сontactsAPI.ContactsSearchQuery(contactName, userForLogin.login);
      await apiManager.сontactsAPI.DeleteContactsPermanentlyById(id, userForLogin.login);
    }
  });

  // Unstable test due to bug
  test.skip('Search appointment', async ({apiManager, pageManager}) => {
    const appointmentName = uniquePrefix + ' AppointmentName Name';

    try {
      await apiManager.calendarAPI.CreateAppointmentRequest(appointmentName, userForLogin.login, 2, 'appointmentName body');
      await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
      await pageManager.headerMenu.MakeSearch(uniquePrefix);
      await expect(pageManager.searchResultsList.Elements.SearchResultAppointments.locator(`"${appointmentName}"`)).toBeVisible();
    } catch (e) {
      throw e;
    } finally {
      const id = await apiManager.calendarAPI.CalendarSearchQuery(appointmentName, userForLogin.login);
      await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, userForLogin.login);
    }
  });

  test('Search file', async ({apiManager, pageManager}) => {
    const templateFileName = 'fileForSearch.png';
    const fileName = uniquePrefix + 'fileForSearch';
    const fileNameFull = fileName + '.png';
    const filePathSrc = path.resolve("./TestData/", templateFileName);
    const filePathDest = path.resolve("./TestData/", fileNameFull);
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
