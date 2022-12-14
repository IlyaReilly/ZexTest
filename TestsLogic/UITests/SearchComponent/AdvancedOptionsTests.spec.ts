import {expect} from '@playwright/test';
import {test, BaseTest} from '../BaseTest';

test.describe('Search tests', async () => {
  // Components
  let uniquePrefix;
  let mailSubject;
  let mailBody;
  let subjectWithFile;
  let unicFileName;
  let mailSize;
  let appointmentName;
  let tagName;

  test.beforeEach(async () => {
    uniquePrefix = BaseTest.dateTimePrefix();
    mailSubject = uniquePrefix + ' Autotest Mail Subject';
    mailBody = uniquePrefix + ' Autotest Mail Body';
    subjectWithFile = uniquePrefix + 'File in this mail';
    unicFileName = uniquePrefix + 'Zextras File';
    mailSize = '1';
    appointmentName = uniquePrefix + ' AppointmentName Name';
    tagName = uniquePrefix + ' Autotest Tag';
  });

  test.afterEach(async ({page}) => {
    await page.close();
  });

  async function OpenSearchTabAndOpenAdvancedFilters({pageManager}) {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Search);
    await pageManager.searchResultsList.Buttons.AdvancedFilters.click();
  };

  async function CreateMessageOpenMailOpenSearchANdOpenFilters({pageManager, apiManager}) {
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.userForLogin.login, mailBody);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await OpenSearchTabAndOpenAdvancedFilters({pageManager});
  };

  async function CreateAppointmentWithTag({pageManager, apiManager, page}) {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
    await apiManager.createCalendarAPI.CreateAppointmentRequest(appointmentName, BaseTest.userForLogin.login, 2, 'appointmentName body');
    await apiManager.createTagsAPI.CreateTagRequest(tagName, BaseTest.userForLogin.login);
    await page.waitForLoadState('domcontentloaded');
    await pageManager.sideSecondaryCalendarMenu.SelectOnlyCalendar();
    await pageManager.calendar.ChooseTagForAppointment(appointmentName, tagName);
  };

  async function CreateMessageAndOpenMailsTab({pageManager, apiManager}) {
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.userForLogin.login, mailBody);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
  };

  async function CreateMailFlaggedMailAndOpenAdvancedOptionsInSearch({pageManager, apiManager}) {
    await CreateMessageAndOpenMailsTab({pageManager, apiManager});
    await pageManager.mailsList.SelectMailContextMenuOption.AddFlag(mailSubject);
    await OpenSearchTabAndOpenAdvancedFilters({pageManager});
  };

  test('TC705. Search by “Attachment” option found mail with attachment. The sent email should be found by attachments', async ({apiManager, pageManager}) => {
    const nodeId = await apiManager.createFilesAPI.CreateDocumentForUpload(unicFileName);
    const uploadId = await apiManager.filesAPI.UploadTo(nodeId);
    const draftId = await apiManager.createMailsAPI.SaveDraftWithFileRequest(subjectWithFile, BaseTest.userForLogin.login, BaseTest.userForLogin.login, mailBody, uploadId);
    await apiManager.createMailsAPI.SendMsgRequestWithFile(subjectWithFile, BaseTest.userForLogin.login, BaseTest.userForLogin.login, mailBody, draftId);
    await OpenSearchTabAndOpenAdvancedFilters({pageManager});
    await pageManager.advancedFiltersModal.AdvancedFiltersOptions.EnableAttachment();
    await pageManager.advancedFiltersModal.Buttons.Search.click();
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${subjectWithFile}"`).first()).toBeVisible();
  });

  test('TC706. Search by “Unread” option found mail. The sent email should be found by unread', async ({apiManager, pageManager}) => {
    await CreateMessageOpenMailOpenSearchANdOpenFilters({pageManager, apiManager});
    await pageManager.advancedFiltersModal.AdvancedFiltersOptions.EnableUnread();
    await pageManager.advancedFiltersModal.Buttons.Search.click();
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  test('TC707. Search by “Flagged” option found mail. The sent email should be found by flagged', async ({apiManager, pageManager}) => {
    await CreateMailFlaggedMailAndOpenAdvancedOptionsInSearch({pageManager, apiManager});
    await pageManager.advancedFiltersModal.AdvancedFiltersOptions.EnableFlagged();
    await pageManager.advancedFiltersModal.Buttons.Search.click();
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  test('TC708. Search by “Keywords” option found mail. The sent email should be found by Keywords', async ({apiManager, pageManager}) => {
    await CreateMessageOpenMailOpenSearchANdOpenFilters({pageManager, apiManager});
    await pageManager.advancedFiltersModal.FillAdvancedFiltersFields.KeywordsField(mailBody);
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  test('TC709. Search by “Subject” option found mail. The sent email should be found by Subject', async ({apiManager, pageManager}) => {
    await CreateMessageOpenMailOpenSearchANdOpenFilters({pageManager, apiManager});
    await pageManager.advancedFiltersModal.FillAdvancedFiltersFields.SubjectField(mailBody);
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  test('TC710. Search by "Received From" option found mail. The sent email should be found by "Received From"', async ({apiManager, pageManager}) => {
    await CreateMessageOpenMailOpenSearchANdOpenFilters({pageManager, apiManager});
    await pageManager.advancedFiltersModal.FillAdvancedFiltersFields.ReceivedFromAddressField(BaseTest.userForLogin.login);
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  test('TC711. Search by “Sent To” option found mail. The sent email should be found by "Sent To"', async ({apiManager, pageManager}) => {
    await CreateMessageOpenMailOpenSearchANdOpenFilters({pageManager, apiManager});
    await pageManager.advancedFiltersModal.FillAdvancedFiltersFields.SentToAddressField(BaseTest.userForLogin.login);
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  test('TC712. Search by “Size smaller then” option found mail. The sent email should be found by "Size smaller then"', async ({apiManager, pageManager}) => {
    await CreateMessageOpenMailOpenSearchANdOpenFilters({pageManager, apiManager});
    await pageManager.advancedFiltersModal.FillAdvancedFiltersFields. SizeSmallerThanField(mailSize);
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  // 141 Bug with tag dropdown
  test.skip('TC713. Search by tag in advanced option found appointment. The appointment should be found by tag', async ({apiManager, pageManager, page}) => {
    try {
      await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Calendar);
      await CreateAppointmentWithTag({pageManager, apiManager, page});
      await OpenSearchTabAndOpenAdvancedFilters({pageManager});
      await pageManager.advancedFiltersModal.ChooseTagInDropdown(tagName);
      await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${appointmentName}"`)).toBeVisible();
    } catch (e) {
      throw e;
    } finally {
      const id = await apiManager.calendarAPI.CalendarSearchQuery(appointmentName, BaseTest.userForLogin.login);
      await apiManager.calendarAPI.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
      const ids = await apiManager.tagsAPI.GetTags();
      await apiManager.deleteTagsAPI.DeleteTagRequest(ids.join(','), BaseTest.userForLogin.login);
    }
  });

  test('TC7. Search by "unread" in Search status found mail. The email should be found in Search Tab', async ({apiManager, pageManager}) => {
    await CreateMessageOpenMailOpenSearchANdOpenFilters({pageManager, apiManager});
    await pageManager.advancedFiltersModal.StatusMailItems.UnreadOption();
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  test('TC7. Search by "read" in Search status found mail. The email should be found in Search Tab', async ({apiManager, pageManager}) => {
    await CreateMessageAndOpenMailsTab({pageManager, apiManager});
    await pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`).click();
    await OpenSearchTabAndOpenAdvancedFilters({pageManager});
    await pageManager.advancedFiltersModal.StatusMailItems.ReadOption();
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  test('TC7. Search by "flagged" in Search status found mail. The email should be found in Search Tab', async ({apiManager, pageManager}) => {
    await CreateMailFlaggedMailAndOpenAdvancedOptionsInSearch({pageManager, apiManager});
    await pageManager.advancedFiltersModal.StatusMailItems.FlaggedOption();
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  test('TC7. Search by "not flagged" in Search status found mail. Flagged email should not be found in Search Tab', async ({apiManager, pageManager}) => {
    await CreateMailFlaggedMailAndOpenAdvancedOptionsInSearch({pageManager, apiManager});
    await pageManager.advancedFiltersModal.StatusMailItems.NotFlaggedOption();
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).not.toBeVisible();
  });

  test('TC7. Search by "sent by me" in Search status found mail. The email should be found in Search Tab', async ({apiManager, pageManager}) => {
    await CreateMessageOpenMailOpenSearchANdOpenFilters({pageManager, apiManager});
    await pageManager.advancedFiltersModal.StatusMailItems.SentByMeOption();
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).not.toBeVisible();
  });
});
