import {expect} from '@playwright/test';
import fs from "fs";
import path from "path";
import {test, BaseTest} from '../UITests/BaseTest';

test.describe('Search tests', async () => {
  // Components
  let uniquePrefix;
  let mailSubject;
  let mailBody;
  let subjectWithFile;
  let unicFileName;

  test.beforeEach(async () => {
    uniquePrefix = BaseTest.dateTimePrefix();
    mailSubject = uniquePrefix + 'Autotest Mail Subject';
    mailBody = uniquePrefix + 'Autotest Mail Body';
    subjectWithFile = uniquePrefix + 'File in this mail';
    unicFileName = uniquePrefix + 'Zextras File';
  });

  test.afterEach(async ({page}) => {
    await page.close();
  });

  async function OpenSearchTabAndOpenAdvancedFilters({pageManager}) {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Search);
    await pageManager.searchResultsList.Elements.AdvancedFilters.click();
  }

  test('Search sent email', async ({pageManager, apiManager}) => {
    try {
      await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.userForLogin.login, mailBody);
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
    };
  });

  test('Search contact', async ({apiManager, pageManager}) => {
    const contactName = uniquePrefix + ' First Contact Name';
    try {
      await apiManager.createContactsAPI.CreateContact(contactName, BaseTest.userForLogin.login);
      await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Contacts);
      await pageManager.headerMenu.MakeSearch(uniquePrefix);
      await expect(pageManager.searchResultsList.Elements.SearchResultContacts.locator(`"${contactName}"`)).toBeVisible();
    } catch (e) {
      throw e;
    } finally {
      const id = await apiManager.contactsAPI.ContactsSearchQuery(contactName, BaseTest.userForLogin.login);
      await apiManager.deleteContactsAPI.DeleteContactsPermanentlyById(id, BaseTest.userForLogin.login);
    }
  });

  test('Search appointment while calendar is active', async ({apiManager, pageManager}) => {
    const appointmentName = uniquePrefix + ' AppointmentName Name';
    try {
      await apiManager.createCalendarAPI.CreateAppointmentRequest(appointmentName, BaseTest.userForLogin.login, 2, 'appointmentName body');
      await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
      await pageManager.sideSecondaryCalendarMenu.CalendarSelecting.Select();
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
      await apiManager.createFilesAPI.UploadFileViaAPI(fileNameFull);
      await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Files);
      await pageManager.headerMenu.MakeSearch(fileName);
      await expect(pageManager.searchResultsList.Elements.SearchResultFiles.locator(`"${fileName}"`)).toBeVisible();
    } catch (e) {
      throw e;
    } finally {
      fs.unlinkSync(filePathDest);
      const id = await apiManager.filesAPI.FilesSearchQuery(fileName);
      await apiManager.deleteFilesAPI.DeleteFilePermanentlyById(id);
    }
  });

  test('TC705. Search by “Attachment” option found mail with attachment. The sent email should be found by attachments', async ({apiManager, pageManager}) => {
    BaseTest.doubleTimeout();
    const nodeId = await apiManager.createFilesAPI.CreateDocumentForUpload(unicFileName);
    const uploadId = await apiManager.filesAPI.UploadTo(nodeId);
    const draftId = await apiManager.createMailsAPI.SaveDraftWithFileRequest(subjectWithFile, BaseTest.userForLogin.login, BaseTest.userForLogin.login, mailBody, uploadId);
    await apiManager.createMailsAPI.SendMsgRequestWithFile(subjectWithFile, BaseTest.userForLogin.login, BaseTest.userForLogin.login, mailBody, draftId);
    await OpenSearchTabAndOpenAdvancedFilters({pageManager});
    await pageManager.advancedFiltersModal.AdvancedFiltersOptions.EnableAttachment();
    await pageManager.advancedFiltersModal.Buttons.Search.click();
    await expect(pageManager.searchResultsList.Elements.SearchResultMail.locator(`"${subjectWithFile}"`).first()).toBeVisible();
  });

  test('TC706. Search by “Unread” option found mail. The sent email should be found by unread', async ({apiManager, pageManager}) => {
    BaseTest.doubleTimeout();
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.userForLogin.login, mailBody);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await OpenSearchTabAndOpenAdvancedFilters({pageManager});
    await pageManager.advancedFiltersModal.AdvancedFiltersOptions.EnableUnread();
    await pageManager.advancedFiltersModal.Buttons.Search.click();
    await expect(pageManager.searchResultsList.Elements.SearchResultMail.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  test('TC707. Search by “Flagged” option found mail. The sent email should be found by flagged', async ({apiManager, pageManager}) => {
    BaseTest.doubleTimeout();
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.userForLogin.login, mailBody);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await pageManager.mailsList.SelectMailContextMenuOption.AddFlag(mailSubject);
    await OpenSearchTabAndOpenAdvancedFilters({pageManager});
    await pageManager.advancedFiltersModal.AdvancedFiltersOptions.EnableFlagged();
    await pageManager.advancedFiltersModal.Buttons.Search.click();
    await expect(pageManager.searchResultsList.Elements.SearchResultMail.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  test('TC708. Search by “Keywords” option found mail. The sent email should be found by Keywords', async ({apiManager, pageManager}) => {
    BaseTest.doubleTimeout();
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.userForLogin.login, mailBody);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await OpenSearchTabAndOpenAdvancedFilters({pageManager});
    await pageManager.advancedFiltersModal.FillAdvancedFiltersFields.KeywordsField(mailBody);
    await expect(pageManager.searchResultsList.Elements.SearchResultMail.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  test('TC709. Search by “Subject” option found mail. The sent email should be found by Subject', async ({apiManager, pageManager}) => {
    BaseTest.doubleTimeout();
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.userForLogin.login, mailBody);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await OpenSearchTabAndOpenAdvancedFilters({pageManager});
    await pageManager.advancedFiltersModal.FillAdvancedFiltersFields.SubjectField(mailBody);
    await expect(pageManager.searchResultsList.Elements.SearchResultMail.locator(`"${mailSubject}"`).first()).toBeVisible();
  });
});
