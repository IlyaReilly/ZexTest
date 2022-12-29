import {expect} from '@playwright/test';
import {test, BaseTest} from '../BaseTest';

test.describe('Search tests', async () => {
  let uniquePrefix;
  let mailSubject;
  let mailBody;
  let mailSize;

  test.beforeEach(async ({apiManager}) => {
    uniquePrefix = BaseTest.dateTimePrefix();
    mailSubject = uniquePrefix + ' Autotest Mail Subject';
    mailBody = uniquePrefix + ' Autotest Mail Body';
    mailSize = '1';
    await DeleteMailViaApi({apiManager});
  });

  test.afterEach(async ({page, apiManager}) => {
    await DeleteMailViaApi({apiManager});
    await page.close();
  });

  async function DeleteMailViaApi({apiManager}) {
    const id = await apiManager.mailsAPI.MailSearchQuery(mailSubject, BaseTest.userForLogin.login);
    await apiManager.mailsAPI.ItemActionRequest(apiManager.mailsAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
  };

  async function OpenSearchTabAndOpenAdvancedFilters({pageManager}) {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Search);
    await pageManager.searchResultsList.Buttons.AdvancedFilters.click();
  };

  async function CreateMessageAndOpenFiltersInSearch({pageManager, apiManager}) {
    await CreateMessageAndOpenInbox({pageManager, apiManager});
    await OpenSearchTabAndOpenAdvancedFilters({pageManager});
  };

  async function CreateMessageAndOpenInbox({pageManager, apiManager}) {
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, mailBody, BaseTest.userForLogin.login, [BaseTest.userForLogin.login]);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Inbox();
  };

  async function CreateMailFlaggedMailAndOpenAdvancedOptionsInSearch({pageManager, apiManager}) {
    await CreateMessageAndOpenInbox({pageManager, apiManager});
    await pageManager.mailsList.SelectMailContextMenuOption.AddFlag(mailSubject);
    await OpenSearchTabAndOpenAdvancedFilters({pageManager});
  };

  async function SendMailBySelectedMethodAndOpenFiltersInSearch({pageManager, apiManager, page}, option) {
    await CreateMessageAndOpenInbox({pageManager, apiManager});
    await pageManager.mailsList.OpenMail(mailSubject);
    await option();
    if (option === pageManager.mailDetails.SelectMailOption.Forward) {
      await pageManager.mailDetails.Editor.Textboxes.To.click();
      await pageManager.mailDetails.Editor.Textboxes.To.fill(BaseTest.userForLogin.login);
      await pageManager.mailDetails.Editor.Textboxes.Body.click();
    };
    await pageManager.mailDetails.Editor.Buttons.Send.click();
    await pageManager.mailDetails.Elements.ActionWithMailNotification.waitFor();
    const elementHandle = await page.$(pageManager.mailDetails.Elements.ActionWithMailNotification._selector);
    await elementHandle?.waitForElementState('hidden');
    await OpenSearchTabAndOpenAdvancedFilters({pageManager});
  };

  test('TC701. Search sent email', async ({pageManager, apiManager}) => {
    await CreateMessageAndOpenInbox({pageManager, apiManager});
    await pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`).waitFor();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Search);
    await pageManager.headerMenu.MakeSearch(uniquePrefix);
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`)).toBeVisible();
    await expect(pageManager.searchStatisticsHeader.Elements.SearchSnippet.locator(`"${uniquePrefix}"`)).toBeVisible();
  });

  test('TC706. Search by “Unread” option found mail. The sent email should be found by unread', async ({apiManager, pageManager}) => {
    await CreateMessageAndOpenFiltersInSearch({pageManager, apiManager});
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
    await CreateMessageAndOpenFiltersInSearch({pageManager, apiManager});
    await pageManager.advancedFiltersModal.FillAdvancedFiltersFields.KeywordsField(mailBody);
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  test('TC709. Search by “Subject” option found mail. The sent email should be found by Subject', async ({apiManager, pageManager}) => {
    await CreateMessageAndOpenFiltersInSearch({pageManager, apiManager});
    await pageManager.advancedFiltersModal.FillAdvancedFiltersFields.SubjectField(mailBody);
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  test('TC710. Search by "Received From" option found mail. The sent email should be found by "Received From"', async ({apiManager, pageManager}) => {
    await CreateMessageAndOpenFiltersInSearch({pageManager, apiManager});
    await pageManager.advancedFiltersModal.FillAdvancedFiltersFields.ReceivedFromAddressField(BaseTest.userForLogin.login);
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  test('TC711. Search by “Sent To” option found mail. The sent email should be found by "Sent To"', async ({apiManager, pageManager}) => {
    await CreateMessageAndOpenFiltersInSearch({pageManager, apiManager});
    await pageManager.advancedFiltersModal.FillAdvancedFiltersFields.SentToAddressField(BaseTest.userForLogin.login);
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  test('TC712. Search by “Size smaller then” option found mail. The sent email should be found by "Size smaller then"', async ({apiManager, pageManager}) => {
    await CreateMessageAndOpenFiltersInSearch({pageManager, apiManager});
    await pageManager.advancedFiltersModal.FillAdvancedFiltersFields. SizeSmallerThanField(mailSize);
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  test('TC704. Search by "unread" in Search status found mail. The email should be found in Search Tab', async ({apiManager, pageManager}) => {
    await CreateMessageAndOpenFiltersInSearch({pageManager, apiManager});
    await pageManager.advancedFiltersModal.StatusMailItems.UnreadOption();
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  test('TC714. Search by "read" in Search status found mail. The email should be found in Search Tab', async ({apiManager, pageManager}) => {
    await CreateMessageAndOpenInbox({pageManager, apiManager});
    await pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`).click();
    await OpenSearchTabAndOpenAdvancedFilters({pageManager});
    await pageManager.advancedFiltersModal.StatusMailItems.ReadOption();
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  test('TC715. Search by "flagged" in Search status found mail. The email should be found in Search Tab', async ({apiManager, pageManager}) => {
    await CreateMailFlaggedMailAndOpenAdvancedOptionsInSearch({pageManager, apiManager});
    await pageManager.advancedFiltersModal.StatusMailItems.FlaggedOption();
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  test('TC716. Search by "not flagged" in Search status found mail. Flagged email should not be found in Search Tab', async ({apiManager, pageManager}) => {
    await CreateMailFlaggedMailAndOpenAdvancedOptionsInSearch({pageManager, apiManager});
    await pageManager.advancedFiltersModal.StatusMailItems.NotFlaggedOption();
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).not.toBeVisible();
  });

  test('TC717. Search by "sent by me" in Search status found mail. The email should be found in Search Tab', async ({apiManager, pageManager}) => {
    await CreateMessageAndOpenFiltersInSearch({pageManager, apiManager});
    await pageManager.advancedFiltersModal.StatusMailItems.SentByMeOption();
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).not.toBeVisible();
  });

  test('TC718. Search by "answered by me" in Search status found mail. The email should be found in Search Tab', async ({apiManager, pageManager, page}) => {
    await SendMailBySelectedMethodAndOpenFiltersInSearch({pageManager, apiManager, page}, pageManager.mailDetails.SelectMailOption.Reply);
    await pageManager.advancedFiltersModal.StatusMailItems.AnsweredByMeOption();
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  test('TC719. Search by "not answered by me" in Search status found mail. The email should not be found in Search Tab', async ({apiManager, pageManager, page}) => {
    test.fail(true, '143, Not Answered By Me option does not working');
    await SendMailBySelectedMethodAndOpenFiltersInSearch({pageManager, apiManager, page}, pageManager.mailDetails.SelectMailOption.Reply);
    await pageManager.advancedFiltersModal.StatusMailItems.NotAnsweredByMeOption();
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"RE: ${mailSubject}"`).first()).not.toBeVisible();
  });

  test('TC720. Search by "forwarded" in Search status found mail. The email should be found in Search Tab', async ({apiManager, pageManager, page}) => {
    await SendMailBySelectedMethodAndOpenFiltersInSearch({pageManager, apiManager, page}, pageManager.mailDetails.SelectMailOption.Forward);
    await pageManager.advancedFiltersModal.StatusMailItems.ForwardedOption();
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"${mailSubject}"`).first()).toBeVisible();
  });

  test('TC721. Search by "not forwarded" in Search status found mail. The email should not be found in Search Tab', async ({apiManager, pageManager, page}) => {
    test.fail(true, '144, Not Forwarded option does not working');
    await SendMailBySelectedMethodAndOpenFiltersInSearch({pageManager, apiManager, page}, pageManager.mailDetails.SelectMailOption.Forward);
    await pageManager.advancedFiltersModal.StatusMailItems.NotForwardedOption();
    await page.waitForLoadState();
    await expect(pageManager.searchResultsList.Elements.SearchResult.locator(`"FWD: ${mailSubject}"`).first()).not.toBeVisible();
  });
});
