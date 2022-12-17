import {expect} from '@playwright/test';
import {test, BaseTest} from '../../UITests/BaseTest';
import {InheritedFields} from '../../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

test.describe('Mails tests', async () => {
  let mailSubject;
  let mailBody;

  test.beforeEach(async ({pageManager}) => {
    mailSubject = BaseTest.dateTimePrefix() + ' Autotest Mail Subject';
    mailBody = BaseTest.dateTimePrefix() + ' Autotest Mail Body';
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
  });

  test.afterEach(async ({page, apiManager}) => {
    const id = await apiManager.mailsAPI.MailSearchQuery(mailSubject, BaseTest.userForLogin.login);
    await apiManager.mailsAPI.ItemActionRequest(apiManager.mailsAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login);
    await page.close();
  });

  test('TC201. Open Mail tab. User login is presented in the secondary side bar', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await expect(pageManager.sideSecondaryMailMenu.Containers.MainContainer.locator(`"${BaseTest.userForLogin.login}"`), 'User`s login is visible').toBeVisible();
  });
  // Contacts Dropdown does not appear
  test.skip('TC202. Send mail. Mail appears in the Sent folder', async ({pageManager}) => {
    BaseTest.doubleTimeout();
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newMail.CreateNewMail(BaseTest.userForLogin.login, mailSubject, mailBody);
    await pageManager.newMail.SendMail();
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`), 'New mail subject is visible in Sent folder mails list').toBeVisible();
  });
  // 137 'Unexpected Inbox folder opening'
  test.skip('TC203. Mark mail as spam. Mail appears in the Junk folder', async ({page, pageManager, apiManager}) => {
    await SendAndOpenMail({apiManager, pageManager});
    await pageManager.mailDetails.SelectMailOption.MarkAsSpam();
    await pageManager.mailDetails.Elements.ActionWithMailNotification.waitFor();
    const elementHandle = await page.$(pageManager.mailDetails.Elements.ActionWithMailNotification._selector);
    await elementHandle?.waitForElementState('hidden');
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Junk();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`), 'New mail subject is visible in Junk folder mails list').toBeVisible();
  });

  test('TC204. Get mail. Mail appears in the Inbox folder', async ({apiManager, pageManager}) => {
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.userForLogin.login, mailBody);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Inbox();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`), 'New mail subject is visible in Inbox folder mails list').toBeVisible();
  });
  // This test will not work because doesn't work SAVE button
  test.skip('TC205. Save mail draft. Mail appears in the Drafts folder.', async ({page, pageManager}) => {
    BaseTest.doubleTimeout();
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newMail.CreateNewMail(BaseTest.secondUser.login, mailSubject, mailBody);
    await pageManager.newMail.SaveMail();
    await pageManager.newMail.CloseNewMail();
    const elementHandle = await page.$(InheritedFields.NewItemBoardLocator);
    await elementHandle?.waitForElementState('hidden');
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Drafts();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`), 'New mail subject is visible in Draft folder mails list').toBeVisible();
  });

  test('TC206. Move mail to trash. Mail appears in the Trash folder', async ({pageManager, apiManager}) => {
    await apiManager.createMailsAPI.SaveDraftRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await OpenMailFolderAndOpenMail({pageManager}, mailSubject, pageManager.sideSecondaryMailMenu.OpenMailFolder.Drafts);
    await pageManager.mailDetails.SelectMailOption.Delete();
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Trash();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`), 'New mail subject is visible in Trash folder mails list').toBeVisible();
  });

  test('TC213. Delete mail permanently. Mail disappears from the Trash folder', async ({pageManager, apiManager}) => {
    const id = await apiManager.createMailsAPI.SaveDraftRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await apiManager.deleteMailsAPI.MoveToTrash(id);
    await OpenMailFolderAndOpenMail({pageManager}, mailSubject, pageManager.sideSecondaryMailMenu.OpenMailFolder.Trash);
    await pageManager.mailDetails.SelectMailOption.DeletePermanently();
    await pageManager.deleteMailModal.DeletePermanently();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`), 'New mail subject should not be visible in Trash folder mails list').not.toBeVisible();
  });

  test('TC214. Hide New E-mail board. “New Email” board should be not visible', async ({page, pageManager}) => {
    await OpenNewEmailBoardAndHideBoard({pageManager});
    await expect(page.locator(InheritedFields.NewItemBoardLocator), 'Board should be not visible').not.toBeVisible();
  });

  test('TC215. Expand New E-mail board. “New Email” board should be visible', async ({page, pageManager}) => {
    await OpenNewEmailBoardAndHideBoard({pageManager});
    await pageManager.sideMenu.Buttons.OpenBoard.click();
    await expect(page.locator(InheritedFields.NewItemBoardLocator), 'Board should be visible').toBeVisible();
  });

  test('TC216. Enlarge New E-mail board. “New Email” board should be enlarged', async ({pageManager}) => {
    await OpenNewEmailBoardAndExpandBoard({pageManager});
    await expect(pageManager.newMail.BoardProperties.ExpandedSize, 'Board should be enlarged').toBeVisible();
  });

  test('TC217. Reduce New E-mail board. “New Email” board should be reduced', async ({pageManager}) => {
    await OpenNewEmailBoardAndExpandBoard({pageManager});
    await pageManager.newMail.Buttons.ReduceBoard.click();
    await expect(pageManager.newMail.BoardProperties.NormalSize, 'Board should be reduced').toBeVisible();
  });

  test('TC218. Disable rich text editor in New E-mail. Editor toolbar should be not visible', async ({pageManager}) => {
    await OpenNewEmailBoardAndSelectOption({pageManager}, pageManager.newMail.SelectNewMailOption.DisableRichTextEditor);
    await expect(pageManager.newMail.Elements.EditorToolbar, 'Editor toolbar should be not visible').not.toBeVisible();
  });

  test('TC219. Enable rich text editor in New E-mail. Editor toolbar should be visible', async ({pageManager}) => {
    await OpenNewEmailBoardAndSelectOption({pageManager}, pageManager.newMail.SelectNewMailOption.DisableRichTextEditor);
    await pageManager.newMail.SelectNewMailOption.EnableRichTextEditor();
    await expect(pageManager.newMail.Elements.EditorToolbar, 'Editor toolbar should be visible').toBeVisible();
  });

  test('TC220. Mark mail in New E-mail as important. "Mark as important" icon should be visible', async ({pageManager}) => {
    await OpenNewEmailBoardAndSelectOption({pageManager}, pageManager.newMail.SelectNewMailOption.MarkAsImportant);
    await expect(pageManager.newMail.Elements.MarkAsImportantIcon, '"Mark as important" icon should be visible').toBeVisible();
  });

  test('TC221. Mark mail in New E-mail as not important. "Mark as important" icon should be not visible', async ({pageManager}) => {
    await OpenNewEmailBoardAndSelectOption({pageManager}, pageManager.newMail.SelectNewMailOption.MarkAsImportant);
    await pageManager.newMail.SelectNewMailOption.MarkAsNotImportant();
    await expect(pageManager.newMail.Elements.MarkAsImportantIcon, '"Mark as important" icon should be not visible').not.toBeVisible();
  });

  test('TC222. Request read receipt in New E-mail. "Request read receipt" icon should be visible', async ({pageManager}) => {
    await OpenNewEmailBoardAndSelectOption({pageManager}, pageManager.newMail.SelectNewMailOption.RequestReadReceipt);
    await expect(pageManager.newMail.Elements.RequestReadReceiptIcon, '"Request read receipt" icon should be visible').toBeVisible();
  });

  test('TC223. Remove read receipt request in New E-mail. "Request read receipt" icon should be not visible', async ({pageManager}) => {
    await OpenNewEmailBoardAndSelectOption({pageManager}, pageManager.newMail.SelectNewMailOption.RequestReadReceipt);
    await pageManager.newMail.SelectNewMailOption.RemoveReadReceiptRequest();
    await expect(pageManager.newMail.Elements.RequestReadReceiptIcon, '"Request read receipt" icon should be not visible').not.toBeVisible();
  });
  // Contacts Dropdown does not appear
  test.skip('TC224. Open recieved email with read receipt request. "Read receipt required" modal title should be visible', async ({pageManager}) => {
    await SendAndOpenMailWithSelectedOption({pageManager}, pageManager.newMail.SelectNewMailOption.RequestReadReceipt);
    await expect(pageManager.readReceiptRequiredModal.Elements.Title, '"Read receipt required" modal title should be visible').toBeVisible();
  });
  // Contacts Dropdown does not appear
  test.skip("TC225. Notify sender when email with read receipt request has been read. Read receipt should be visible in sender's Inbox list", async ({pageManager}) => {
    await SendMailWithSelectedOption({pageManager}, pageManager.newMail.SelectNewMailOption.RequestReadReceipt);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Inbox();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"Read-Receipt: ${mailSubject}"`), "Read receipt should be visible in sender's Inbox list").toBeVisible();
  });

  test("TC226. Select Edit option in draft. Recipient's login, drafted e-mail body and subject should be visible", async ({pageManager, apiManager}) => {
    const mailBody = await OpenMailAndSelectOption({apiManager, pageManager}, pageManager.mailDetails.SelectMailOption.Edit, pageManager.sideSecondaryMailMenu.OpenMailFolder.Drafts);
    await expect(pageManager.mailDetails.Editor.Elements.ContactBubble.locator(`"${BaseTest.secondUser.login.replace('@' + BaseTest.domain, '')}"`), "Recipient's login should be visible").toBeVisible();
    await expect(pageManager.mailDetails.Editor.Textboxes.Subject, 'Drafted e-mail subject should be visible').toHaveValue(`${mailSubject}`);
    await expect(pageManager.mailDetails.Editor.Textboxes.Body, 'Drafted e-mail body should be visible').toContainText(mailBody);
  });

  test("TC227. Select Reply option in email. Sender's login, keyword “RE”, received e-mail body should be visible", async ({pageManager, apiManager}) => {
    const mailBody = await OpenMailAndSelectOption({apiManager, pageManager}, pageManager.mailDetails.SelectMailOption.Reply);
    await expect(pageManager.mailDetails.Editor.Elements.ContactBubble.locator(`"${BaseTest.userForLogin.login.replace('@' + BaseTest.domain, '')}"`), "Sender's login should be visible").toBeVisible();
    await expect(pageManager.mailDetails.Editor.Textboxes.Subject, "The letter subject should start with the keyword “RE”").toHaveValue(`RE: ${mailSubject}`);
    await expect(pageManager.mailDetails.Editor.Textboxes.Body, 'Received e-mail body should be visible').toContainText(mailBody);
  });

  test("TC228. Select Forward option in email. Keyword “FWD”, received e-mail body should be visible", async ({pageManager, apiManager}) => {
    const mailBody = await OpenMailAndSelectOption({apiManager, pageManager}, pageManager.mailDetails.SelectMailOption.Forward);
    await expect(pageManager.mailDetails.Editor.Textboxes.Subject, "The letter subject should start with the keyword “FWD”").toHaveValue(`FWD: ${mailSubject}`);
    await expect(pageManager.mailDetails.Editor.Textboxes.Body, 'Received e-mail body should be visible').toContainText(mailBody);
  });

  test("TC229. Select Show board option in Editor. New E-mail board should be visible", async ({pageManager, apiManager, page}) => {
    await OpenMailAndSelectOption({apiManager, pageManager}, pageManager.mailDetails.SelectMailOption.Reply);
    await pageManager.mailDetails.Editor.Buttons.ShowBoard.click();
    await expect(page.locator(InheritedFields.NewItemBoardLocator), 'New E-mail board should be visible').toBeVisible();
  });

  test('TC230. Open New E-mail board twice. Tab count should be 2', async ({pageManager}) => {
    await OpenNewEmailBoardTwice({pageManager});
    await expect(pageManager.newMail.Elements.BoardTab, 'Tab count should be 2').toHaveCount(2);
  });

  test('TC231. Close first of the two New E-mail boards. Tab count should be 1', async ({pageManager}) => {
    await OpenNewEmailBoardTwice({pageManager});
    await pageManager.newMail.Buttons.CloseTab.first().click();
    await expect(pageManager.newMail.Elements.BoardTab, 'Tab count should be 1').toHaveCount(1);
  });

  test('TC232. Open sent email. Correct subject and body should be visible', async ({apiManager, pageManager}) => {
    await SendAndOpenMail({apiManager, pageManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent);
    await expect(pageManager.mailDetails.Elements.Header.locator(`"${mailSubject}"`), 'Correct email subject is visible').toBeVisible();
  });

  test('TC233. Open sent email. Correct body should be visible', async ({apiManager, pageManager}) => {
    await SendAndOpenMail({apiManager, pageManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent);
    await expect(pageManager.mailDetails.Elements.Body, 'Correct email subject is visible').toHaveText(mailBody);
  });

  test('TC234. Open received email. Correct subject should be visible', async ({apiManager, pageManager}) => {
    await SendAndOpenMail({apiManager, pageManager});
    await expect(pageManager.mailDetails.Elements.Header.locator(`"${mailSubject}"`), 'Correct email subject is visible').toBeVisible();
  });

  test('TC235. Open received email. Correct body should be visible', async ({apiManager, pageManager}) => {
    await SendAndOpenMail({apiManager, pageManager});
    await expect(pageManager.mailDetails.Elements.Body, 'Correct email subject is visible').toHaveText(mailBody);
  });

  test('TC236. Send email to multiple recipients. All recipient logins should be visible in the email details', async ({apiManager, pageManager}) => {
    await SendAndOpenMail({apiManager, pageManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent, BaseTest.secondUser.login);
    await expect(pageManager.mailDetails.Elements.Recipient.locator('"Me"'), 'First recipient login should be visible').toBeVisible();
    await expect(pageManager.mailDetails.Elements.Recipient.locator(`"${BaseTest.secondUser.login.replace('@' + BaseTest.domain, '').replace(/^\w/, (first) => first.toUpperCase())}"`), 'Second recipient login should be visible').toBeVisible();
  });

  test('TC237. Get email sent to multiple recipients. All recipient logins should be visible in the email details', async ({apiManager, pageManager}) => {
    await SendAndOpenMail({apiManager, pageManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Inbox, BaseTest.secondUser.login);
    await expect(pageManager.mailDetails.Elements.Recipient.locator('"Me"'), 'First recipient login should be visible').toBeVisible();
    await expect(pageManager.mailDetails.Elements.Recipient.locator(`"${BaseTest.secondUser.login.replace('@' + BaseTest.domain, '').replace(/^\w/, (first) => first.toUpperCase())}"`), 'Second recipient login should be visible').toBeVisible();
  });

  test("TC238. Reply to email. Reply email should be visible in the Sent folder", async ({pageManager, apiManager}) => {
    test.fail(true, '137. Unexpected Inbox folder opening');
    await ReplyToMailAndOpenFolder({apiManager, pageManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent);
    await expect(pageManager.mailsList.Elements.Letter.locator(`"RE: ${mailSubject}"`), 'Reply email should be visible in the Sent folder').toBeVisible();
  });

  test("TC239. Get a reply email. Reply email should be visible in the Inbox folder", async ({pageManager, apiManager}) => {
    test.fail(true, 'Reply mail subject is displayed correctly only after page reload');
    await ReplyToMailAndOpenFolder({apiManager, pageManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Inbox);
    await expect(pageManager.mailsList.Elements.Letter.locator(`"RE: ${mailSubject}"`), 'Reply email should be visible in the Inbox folder').toBeVisible();
  });
  // 137 'Unexpected Inbox folder opening'
  test.skip("TC240. Open the sent reply email. Quote should be visible in email details", async ({pageManager, apiManager}) => {
    const mailQuote = await ReplyAndOpenMail({apiManager, pageManager}, `RE: ${mailSubject}`, pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent);
    await expect(pageManager.mailDetails.Elements.Body, 'Quote should be visible in email details').toHaveText(mailQuote);
  });
  // 'Reply mail subject is displayed correctly only after page reload'
  test.skip("TC241. Open the received reply email. Quote should be visible in email details", async ({pageManager, apiManager}) => {
    const mailQuote = await ReplyAndOpenMail({apiManager, pageManager}, `RE: ${mailSubject}`);
    await expect(pageManager.mailDetails.Elements.Body, 'Quote should be visible in email details').toHaveText(mailQuote);
  });

  test('TC242. Select CC option in New E-mail. CC textbox should be visible', async ({pageManager}) => {
    await OpenNewEmailBoardAndSelectOption({pageManager}, pageManager.newMail.SelectNewMailOption.Cc);
    await expect(pageManager.newMail.TextBox.Cc).toBeVisible();
  });

  test('TC243. Select BCC option in New E-mail. BCC textbox should be visible', async ({pageManager}) => {
    await OpenNewEmailBoardAndSelectOption({pageManager}, pageManager.newMail.SelectNewMailOption.Bcc);
    await expect(pageManager.newMail.TextBox.Bcc).toBeVisible();
  });

  test('TC244. Deselect CC option in New E-mail. CC textbox should be not visible', async ({pageManager}) => {
    await OpenNewEmailBoardAndSelectOption({pageManager}, pageManager.newMail.SelectNewMailOption.Cc);
    await pageManager.newMail.SelectNewMailOption.Cc();
    await expect(pageManager.newMail.TextBox.Cc).not.toBeVisible();
  });

  test('TC245. Deselect BCC option in New E-mail. BCC textbox should be not visible', async ({pageManager}) => {
    await OpenNewEmailBoardAndSelectOption({pageManager}, pageManager.newMail.SelectNewMailOption.Bcc);
    await pageManager.newMail.SelectNewMailOption.Bcc();
    await expect(pageManager.newMail.TextBox.Bcc).not.toBeVisible();
  });
  // Contacts Dropdown does not appear
  test.skip('TC246. Send an mail to a CC recipient. CC recipient login should be visible in email details', async ({pageManager}) => {
    await SendAndOpenMailWithSelectedOption({pageManager}, pageManager.newMail.SelectNewMailOption.Cc, pageManager.newMail.TextBox.Cc, pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent);
    await expect(pageManager.mailDetails.Elements.CcRecipient.locator(`"${BaseTest.secondUser.login.replace('@' + BaseTest.domain, '').replace(/^\w/, (first) => first.toUpperCase())}"`)).toBeVisible();
  });
  // Contacts Dropdown does not appear
  test.skip('TC247. Send an mail to a BCC recipient. BCC recipient login should be visible in email details', async ({pageManager}) => {
    await SendAndOpenMailWithSelectedOption({pageManager}, pageManager.newMail.SelectNewMailOption.Bcc, pageManager.newMail.TextBox.Bcc, pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent);
    await pageManager.mailDetails.Elements.MailPreview.nth(1).click();
    await expect(pageManager.mailDetails.Elements.BccRecipient.locator(`"${BaseTest.secondUser.login.replace('@' + BaseTest.domain, '').replace(/^\w/, (first) => first.toUpperCase())}"`)).toBeVisible();
  });

  test('TC248. Receive the mail as a CC recipient. Email should be visible in Inbox list', async ({pageManager, apiManager}) => {
    await apiManager.createMailsAPI.SendMsgWithCcRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody, BaseTest.userForLogin.login);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Inbox();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('TC249. Receive the mail as a BCC recipient. Email should be visible in Inbox list', async ({pageManager, apiManager}) => {
    await apiManager.createMailsAPI.SendMsgWithBccRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody, BaseTest.userForLogin.login);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Inbox();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('TC250. Receive the mail with CC as main recipient. CC recipient login should be visible in email details', async ({pageManager, apiManager}) => {
    await apiManager.createMailsAPI.SendMsgWithCcRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.userForLogin.login, mailBody, BaseTest.secondUser.login);
    await OpenMailFolderAndOpenMail({pageManager}, mailSubject);
    await expect(pageManager.mailDetails.Elements.CcRecipient.locator(`"${BaseTest.secondUser.login.replace('@' + BaseTest.domain, '').replace(/^\w/, (first) => first.toUpperCase())}"`)).toBeVisible();
  });

  test('TC251. Receive the mail with BCC as main recipient. BCC recipient login should be not visible in email details', async ({pageManager, apiManager}) => {
    await apiManager.createMailsAPI.SendMsgWithBccRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.userForLogin.login, mailBody, BaseTest.secondUser.login);
    await OpenMailFolderAndOpenMail({pageManager}, mailSubject);
    await expect(pageManager.mailDetails.Elements.BccRecipient.locator(`"${BaseTest.secondUser.login.replace('@' + BaseTest.domain, '').replace(/^\w/, (first) => first.toUpperCase())}"`)).not.toBeVisible();
  });

  async function SendAndOpenMail({apiManager, pageManager}, folder?, secondRecipient?) {
    if (folder !== pageManager.sideSecondaryMailMenu.OpenMailFolder.Drafts) {
      await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.userForLogin.login, mailBody, secondRecipient);
    } else {
      await apiManager.createMailsAPI.SaveDraftRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    };
    await OpenMailFolderAndOpenMail({pageManager}, mailSubject, folder);
  };

  async function OpenMailFolderAndOpenMail({pageManager}, mail, openFolder = pageManager.sideSecondaryMailMenu.OpenMailFolder.Inbox) {
    await openFolder();
    await pageManager.mailsList.OpenMail(mail);
  };

  async function OpenNewEmailBoardAndHideBoard({pageManager}) {
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.sideMenu.Buttons.HideBoard.click();
  };

  async function OpenNewEmailBoardAndExpandBoard({pageManager}) {
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newMail.Buttons.ExpandBoard.click();
  };

  async function OpenNewEmailBoardAndSelectOption({pageManager}, option) {
    await pageManager.headerMenu.Buttons.NewItem.click();
    await option();
  };

  async function SendMailWithSelectedOption({pageManager}, option, textbox?, mainRecipient = BaseTest.userForLogin.login) {
    await OpenNewEmailBoardAndSelectOption({pageManager}, option);
    await pageManager.newMail.CreateNewMail(mainRecipient, mailSubject, mailBody);
    if (textbox) {
      if (mainRecipient !== BaseTest.userForLogin.login) {
        await textbox.fill(BaseTest.userForLogin.login);
      } else {
        await textbox.fill(BaseTest.secondUser.login);
      };
      await pageManager.newMail.Dropdowns.Contacts.Item.click();
    };
    await pageManager.newMail.SendMail();
  };

  async function SendAndOpenMailWithSelectedOption({pageManager}, option, textbox?, folder?, mainRecipient?) {
    await SendMailWithSelectedOption({pageManager}, option, textbox, mainRecipient);
    await OpenMailFolderAndOpenMail({pageManager}, mailSubject, folder);
  };

  async function OpenMailAndSelectOption({apiManager, pageManager}, option, folder?) {
    await SendAndOpenMail({apiManager, pageManager}, folder);
    const mailBody = await pageManager.mailDetails.Elements.Body.innerText();
    await option();
    return mailBody;
  };

  async function OpenNewEmailBoardTwice({pageManager}) {
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.headerMenu.Buttons.NewItem.click();
  };

  async function ReplyToMailAndOpenFolder({apiManager, pageManager}, openFolder) {
    await OpenMailAndSelectOption({apiManager, pageManager}, pageManager.mailDetails.SelectMailOption.Reply);
    await pageManager.mailDetails.Editor.Buttons.Send.click();
    await openFolder();
  };

  async function ReplyAndOpenMail({apiManager, pageManager}, mail, folder?) {
    await OpenMailAndSelectOption({apiManager, pageManager}, pageManager.mailDetails.SelectMailOption.Reply);
    const mailQuote = await pageManager.mailDetails.Editor.Textboxes.Body.innerText();
    await pageManager.mailDetails.Editor.Buttons.Send.click();
    await OpenMailFolderAndOpenMail({pageManager}, mail, folder);
    return mailQuote;
  };
});
