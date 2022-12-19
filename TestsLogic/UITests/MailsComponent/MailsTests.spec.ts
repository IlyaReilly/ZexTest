import {expect} from '@playwright/test';
import {test, BaseTest} from '../../UITests/BaseTest';
import {InheritedFields} from '../../../ApplicationLogic/ApplicationUILogic/Pages/BasePage';

test.describe('Mails tests', async () => {
  let mailSubject;
  let mailBody;
  const cc = 'c';
  const bcc = 'b';

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

  test('TC201. Open Mail tab. User`s login should be visible in the secondary sidebar', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await expect(pageManager.sideSecondaryMailMenu.Containers.MainContainer.locator(`"${BaseTest.userForLogin.login}"`)).toBeVisible();
  });
  // Contacts Dropdown does not appear
  test.skip('TC202. Send mail. Mail should be visible in the Sent folder list', async ({pageManager}) => {
    BaseTest.doubleTimeout();
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newMail.CreateNewMail(BaseTest.userForLogin.login, mailSubject, mailBody);
    await pageManager.newMail.SendMail();
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`)).toBeVisible();
  });
  // 137 'Unexpected Inbox folder opening'
  test.skip('TC203. Mark mail as spam. Mail should be visible in the Junk folder list', async ({page, pageManager, apiManager}) => {
    await SendAndOpenMail({apiManager, pageManager});
    await pageManager.mailDetails.SelectMailOption.MarkAsSpam();
    await pageManager.mailDetails.Elements.ActionWithMailNotification.waitFor();
    const elementHandle = await page.$(pageManager.mailDetails.Elements.ActionWithMailNotification._selector);
    await elementHandle?.waitForElementState('hidden');
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Junk();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('TC204. Get mail. Mail should be visible in the Inbox folder list', async ({apiManager, pageManager}) => {
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, [BaseTest.userForLogin.login], mailBody);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Inbox();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`)).toBeVisible();
  });
  // This test will not work because doesn't work SAVE button
  test.skip('TC205. Save mail draft. Mail should be visible in the Drafts folder list', async ({page, pageManager}) => {
    BaseTest.doubleTimeout();
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newMail.CreateNewMail(BaseTest.secondUser.login, mailSubject, mailBody);
    await pageManager.newMail.SaveMail();
    await pageManager.newMail.CloseNewMail();
    const elementHandle = await page.$(InheritedFields.NewItemBoardLocator);
    await elementHandle?.waitForElementState('hidden');
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Drafts();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('TC206. Move mail to trash. Mail should be visible in the Trash folder list', async ({pageManager, apiManager}) => {
    await SendAndOpenMail({pageManager, apiManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent);
    await pageManager.mailDetails.SelectMailOption.Delete();
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Trash();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('TC213. Delete mail permanently. Mail should not be visible in the Trash folder list', async ({pageManager, apiManager}) => {
    const id = await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, [BaseTest.userForLogin.login], mailBody);
    await apiManager.deleteMailsAPI.MoveToTrash(id);
    await OpenMailFolderAndOpenMail({pageManager}, mailSubject, pageManager.sideSecondaryMailMenu.OpenMailFolder.Trash);
    await pageManager.mailDetails.SelectMailOption.DeletePermanently();
    await pageManager.deleteMailModal.DeletePermanently();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`)).not.toBeVisible();
  });

  test('TC214. Hide New Email board. New Email board should not be visible', async ({page, pageManager}) => {
    await OpenNewEmailBoardAndHideBoard({pageManager});
    await expect(page.locator(InheritedFields.NewItemBoardLocator)).not.toBeVisible();
  });

  test('TC215. Expand New Email board. New Email board should be visible', async ({page, pageManager}) => {
    await OpenNewEmailBoardAndHideBoard({pageManager});
    await pageManager.sideMenu.Buttons.OpenBoard.click();
    await expect(page.locator(InheritedFields.NewItemBoardLocator)).toBeVisible();
  });

  test('TC216. Enlarge New Email board. New Email board should be enlarged', async ({pageManager}) => {
    await OpenNewEmailBoardAndExpandBoard({pageManager});
    await expect(pageManager.newMail.BoardProperties.ExpandedSize).toBeVisible();
  });

  test('TC217. Reduce New Email board. New Email board should be reduced', async ({pageManager}) => {
    await OpenNewEmailBoardAndExpandBoard({pageManager});
    await pageManager.newMail.Buttons.ReduceBoard.click();
    await expect(pageManager.newMail.BoardProperties.NormalSize).toBeVisible();
  });

  test('TC218. Disable rich text editor in New Email board. Editor toolbar should not be visible', async ({pageManager}) => {
    await OpenNewEmailBoardAndSelectOption({pageManager}, pageManager.newMail.SelectNewMailOption.DisableRichTextEditor);
    await expect(pageManager.newMail.Elements.EditorToolbar).not.toBeVisible();
  });

  test('TC219. Enable rich text editor in New Email board. Editor toolbar should be visible', async ({pageManager}) => {
    await OpenNewEmailBoardAndSelectOption({pageManager}, pageManager.newMail.SelectNewMailOption.DisableRichTextEditor);
    await pageManager.newMail.SelectNewMailOption.EnableRichTextEditor();
    await expect(pageManager.newMail.Elements.EditorToolbar).toBeVisible();
  });

  test('TC220. Mark mail in New Email board as important. "Mark as important" icon should be visible', async ({pageManager}) => {
    await OpenNewEmailBoardAndSelectOption({pageManager}, pageManager.newMail.SelectNewMailOption.MarkAsImportant);
    await expect(pageManager.newMail.Elements.MarkAsImportantIcon).toBeVisible();
  });

  test('TC221. Mark mail in New Email board as not important. "Mark as important" icon should not be visible', async ({pageManager}) => {
    await OpenNewEmailBoardAndSelectOption({pageManager}, pageManager.newMail.SelectNewMailOption.MarkAsImportant);
    await pageManager.newMail.SelectNewMailOption.MarkAsNotImportant();
    await expect(pageManager.newMail.Elements.MarkAsImportantIcon).not.toBeVisible();
  });

  test('TC222. Request read receipt in New Email board. "Request read receipt" icon should be visible', async ({pageManager}) => {
    await OpenNewEmailBoardAndSelectOption({pageManager}, pageManager.newMail.SelectNewMailOption.RequestReadReceipt);
    await expect(pageManager.newMail.Elements.RequestReadReceiptIcon).toBeVisible();
  });

  test('TC223. Remove read receipt request in New Email board. "Request read receipt" icon should not be visible', async ({pageManager}) => {
    await OpenNewEmailBoardAndSelectOption({pageManager}, pageManager.newMail.SelectNewMailOption.RequestReadReceipt);
    await pageManager.newMail.SelectNewMailOption.RemoveReadReceiptRequest();
    await expect(pageManager.newMail.Elements.RequestReadReceiptIcon).not.toBeVisible();
  });
  // Contacts Dropdown does not appear
  test.skip('TC224. Open recieved mail with read receipt request. "Read receipt required" modal title should be visible', async ({pageManager}) => {
    await SendAndOpenMailWithSelectedOption({pageManager}, pageManager.newMail.SelectNewMailOption.RequestReadReceipt);
    await expect(pageManager.readReceiptRequiredModal.Elements.Title).toBeVisible();
  });
  // Contacts Dropdown does not appear
  test.skip("TC225. Notify sender when mail with read receipt request has been read. Read receipt should be visible in sender's Inbox list", async ({pageManager}) => {
    await SendMailWithSelectedOption({pageManager}, pageManager.newMail.SelectNewMailOption.RequestReadReceipt);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Inbox();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"Read-Receipt: ${mailSubject}"`)).toBeVisible();
  });

  test("TC226. Select Edit option in draft. Recipient's login, drafted mail body and subject should be visible", async ({pageManager, apiManager}) => {
    const mailBody = await OpenMailAndSelectOption({apiManager, pageManager}, pageManager.mailDetails.SelectMailOption.Edit, pageManager.sideSecondaryMailMenu.OpenMailFolder.Drafts);
    await expect(pageManager.mailDetails.Editor.Elements.ContactBubble.locator(`"${BaseTest.userForLogin.login.replace('@' + BaseTest.domain, '')}"`)).toBeVisible();
    await expect(pageManager.mailDetails.Editor.Textboxes.Subject).toHaveValue(`${mailSubject}`);
    await expect(pageManager.mailDetails.Editor.Textboxes.Body).toContainText(mailBody);
  });

  test("TC227. Select Reply option in mail. Sender's login, keyword “RE”, received mail body should be visible", async ({pageManager, apiManager}) => {
    const mailBody = await OpenMailAndSelectOption({apiManager, pageManager}, pageManager.mailDetails.SelectMailOption.Reply);
    await expect(pageManager.mailDetails.Editor.Elements.ContactBubble.locator(`"${BaseTest.userForLogin.login.replace('@' + BaseTest.domain, '')}"`)).toBeVisible();
    await expect(pageManager.mailDetails.Editor.Textboxes.Subject).toHaveValue(`RE: ${mailSubject}`);
    await expect(pageManager.mailDetails.Editor.Textboxes.Body).toContainText(mailBody);
  });

  test("TC228. Select Forward option in mail. Keyword “FWD”, received mail body should be visible", async ({pageManager, apiManager}) => {
    const mailBody = await OpenMailAndSelectOption({apiManager, pageManager}, pageManager.mailDetails.SelectMailOption.Forward);
    await expect(pageManager.mailDetails.Editor.Textboxes.Subject).toHaveValue(`FWD: ${mailSubject}`);
    await expect(pageManager.mailDetails.Editor.Textboxes.Body).toContainText(mailBody);
  });

  test("TC229. Select Show board option in Editor. New Email board should be visible", async ({pageManager, apiManager, page}) => {
    await OpenMailAndSelectOption({apiManager, pageManager}, pageManager.mailDetails.SelectMailOption.Reply);
    await pageManager.mailDetails.Editor.Buttons.ShowBoard.click();
    await expect(page.locator(InheritedFields.NewItemBoardLocator)).toBeVisible();
  });

  test('TC230. Open New Email board twice. Tab count should be 2', async ({pageManager}) => {
    await OpenNewEmailBoardTwice({pageManager});
    await expect(pageManager.newMail.Elements.BoardTab).toHaveCount(2);
  });

  test('TC231. Close first of the two New Email boards. Tab count should be 1', async ({pageManager}) => {
    await OpenNewEmailBoardTwice({pageManager});
    await pageManager.newMail.Buttons.CloseTab.first().click();
    await expect(pageManager.newMail.Elements.BoardTab).toHaveCount(1);
  });

  test('TC232. Open sent mail. Correct subject should be visible', async ({apiManager, pageManager}) => {
    await SendAndOpenMail({apiManager, pageManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent);
    await expect(pageManager.mailDetails.Elements.Header.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('TC233. Open sent mail. Correct body should be visible', async ({apiManager, pageManager}) => {
    await SendAndOpenMail({apiManager, pageManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent);
    await expect(pageManager.mailDetails.Elements.Body).toHaveText(mailBody);
  });

  test('TC234. Open received mail. Correct subject should be visible', async ({apiManager, pageManager}) => {
    await SendAndOpenMail({apiManager, pageManager});
    await expect(pageManager.mailDetails.Elements.Header.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('TC235. Open received mail. Correct body should be visible', async ({apiManager, pageManager}) => {
    await SendAndOpenMail({apiManager, pageManager});
    await expect(pageManager.mailDetails.Elements.Body).toHaveText(mailBody);
  });

  test('TC236. Send mail to multiple recipients. All recipient logins should be visible in theemail details', async ({apiManager, pageManager}) => {
    await SendAndOpenMail({apiManager, pageManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent, [BaseTest.secondUser.login, BaseTest.thirdUser.login]);
    await expect(pageManager.mailDetails.Elements.Recipient.locator(`"${BaseTest.secondUser.login.replace('@' + BaseTest.domain, '').replace(/^\w/, (first) => first.toUpperCase())}"`)).toBeVisible();
    await expect(pageManager.mailDetails.Elements.Recipient.locator(`"${BaseTest.thirdUser.login.replace('@' + BaseTest.domain, '').replace(/^\w/, (first) => first.toUpperCase())}"`)).toBeVisible();
  });

  test('TC237. Get mail sent to multiple recipients. All recipient logins should be visible in the mail details', async ({apiManager, pageManager}) => {
    await SendAndOpenMail({apiManager, pageManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent, [BaseTest.secondUser.login, BaseTest.thirdUser.login]);
    await expect(pageManager.mailDetails.Elements.Recipient.locator(`"${BaseTest.secondUser.login.replace('@' + BaseTest.domain, '').replace(/^\w/, (first) => first.toUpperCase())}"`)).toBeVisible();
    await expect(pageManager.mailDetails.Elements.Recipient.locator(`"${BaseTest.thirdUser.login.replace('@' + BaseTest.domain, '').replace(/^\w/, (first) => first.toUpperCase())}"`)).toBeVisible();
  });

  test("TC238. Reply to mail. Reply mail should be visible in the Sent folder", async ({pageManager, apiManager}) => {
    test.fail(true, '137. Unexpected Inbox folder opening');
    await ReplyToMailAndOpenFolder({apiManager, pageManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent);
    await expect(pageManager.mailsList.Elements.Letter.locator(`"RE: ${mailSubject}"`)).toBeVisible();
  });

  test("TC239. Get a reply mail. Reply mail should be visible in the Inbox folder", async ({pageManager, apiManager}) => {
    test.fail(true, 'Reply mail subject is displayed correctly only after page reload');
    await ReplyToMailAndOpenFolder({apiManager, pageManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Inbox);
    await expect(pageManager.mailsList.Elements.Letter.locator(`"RE: ${mailSubject}"`)).toBeVisible();
  });
  // 137 'Unexpected Inbox folder opening'
  test.skip("TC240. Open the sent reply mail. Quote should be visible in mail details", async ({pageManager, apiManager}) => {
    const mailQuote = await ReplyAndOpenMail({apiManager, pageManager}, `RE: ${mailSubject}`, pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent);
    await expect(pageManager.mailDetails.Elements.Body).toHaveText(mailQuote);
  });
  // 'Reply mail subject is displayed correctly only after page reload'
  test.skip("TC241. Open the received reply mail. Quote should be visible in mail details", async ({pageManager, apiManager}) => {
    const mailQuote = await ReplyAndOpenMail({apiManager, pageManager}, `RE: ${mailSubject}`);
    await expect(pageManager.mailDetails.Elements.Body).toHaveText(mailQuote);
  });

  test('TC242. Select CC option in New Email board. CC textbox should be visible', async ({pageManager}) => {
    await OpenNewEmailBoardAndSelectOption({pageManager}, pageManager.newMail.SelectNewMailOption.Cc);
    await expect(pageManager.newMail.TextBox.Cc).toBeVisible();
  });

  test('TC243. Select BCC option in New Email board. BCC textbox should be visible', async ({pageManager}) => {
    await OpenNewEmailBoardAndSelectOption({pageManager}, pageManager.newMail.SelectNewMailOption.Bcc);
    await expect(pageManager.newMail.TextBox.Bcc).toBeVisible();
  });

  test('TC244. Deselect CC option in New Email board. CC textbox should not be visible', async ({pageManager}) => {
    await OpenNewEmailBoardAndSelectOption({pageManager}, pageManager.newMail.SelectNewMailOption.Cc);
    await pageManager.newMail.SelectNewMailOption.Cc();
    await expect(pageManager.newMail.TextBox.Cc).not.toBeVisible();
  });

  test('TC245. Deselect BCC option in New Email board. BCC textbox should not be visible', async ({pageManager}) => {
    await OpenNewEmailBoardAndSelectOption({pageManager}, pageManager.newMail.SelectNewMailOption.Bcc);
    await pageManager.newMail.SelectNewMailOption.Bcc();
    await expect(pageManager.newMail.TextBox.Bcc).not.toBeVisible();
  });
  // Contacts Dropdown does not appear
  test.skip('TC246. Send an mail to a CC recipient. CC recipient login should be visible in mail details', async ({pageManager}) => {
    await SendAndOpenMailWithSelectedOption({pageManager}, pageManager.newMail.SelectNewMailOption.Cc, pageManager.newMail.TextBox.Cc, pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent);
    await expect(pageManager.mailDetails.Elements.CcRecipient.locator(`"${BaseTest.secondUser.login.replace('@' + BaseTest.domain, '').replace(/^\w/, (first) => first.toUpperCase())}"`)).toBeVisible();
  });
  // Contacts Dropdown does not appear
  test.skip('TC247. Send an mail to a BCC recipient. BCC recipient login should be visible in mail details', async ({pageManager}) => {
    await SendAndOpenMailWithSelectedOption({pageManager}, pageManager.newMail.SelectNewMailOption.Bcc, pageManager.newMail.TextBox.Bcc, pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent);
    await pageManager.mailDetails.Elements.MailPreview.nth(1).click();
    await expect(pageManager.mailDetails.Elements.BccRecipient.locator(`"${BaseTest.secondUser.login.replace('@' + BaseTest.domain, '').replace(/^\w/, (first) => first.toUpperCase())}"`)).toBeVisible();
  });

  test('TC248. Receive the mail as a CC recipient. Email should be visible in Inbox list', async ({pageManager, apiManager}) => {
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, [BaseTest.secondUser.login, BaseTest.userForLogin.login], mailBody, cc);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Inbox();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('TC249. Receive the mail as a BCC recipient. Email should be visible in Inbox list', async ({pageManager, apiManager}) => {
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, [BaseTest.secondUser.login, BaseTest.userForLogin.login], mailBody, bcc);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Inbox();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`)).toBeVisible();
  });

  test('TC250. Receive the mail with CC as main recipient. CC recipient login should be visible in mail details', async ({pageManager, apiManager}) => {
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, [BaseTest.userForLogin.login, BaseTest.secondUser.login], mailBody, cc);
    await OpenMailFolderAndOpenMail({pageManager}, mailSubject);
    await expect(pageManager.mailDetails.Elements.CcRecipient.locator(`"${BaseTest.secondUser.login.replace('@' + BaseTest.domain, '').replace(/^\w/, (first) => first.toUpperCase())}"`)).toBeVisible();
  });

  test('TC251. Receive the mail with BCC as main recipient. BCC recipient login should not be visible in mail details', async ({pageManager, apiManager}) => {
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, [BaseTest.userForLogin.login, BaseTest.secondUser.login], mailBody, bcc);
    await OpenMailFolderAndOpenMail({pageManager}, mailSubject);
    await expect(pageManager.mailDetails.Elements.BccRecipient.locator(`"${BaseTest.secondUser.login.replace('@' + BaseTest.domain, '').replace(/^\w/, (first) => first.toUpperCase())}"`)).not.toBeVisible();
  });

  async function SendAndOpenMail({apiManager, pageManager}, folder?, to = [BaseTest.userForLogin.login]) {
    if (folder !== pageManager.sideSecondaryMailMenu.OpenMailFolder.Drafts) {
      await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, to, mailBody);
    } else {
      await apiManager.createMailsAPI.SaveDraftRequest(mailSubject, BaseTest.userForLogin.login, to, mailBody);
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

  async function SendMailWithSelectedOption({pageManager}, option, textbox?) {
    await OpenNewEmailBoardAndSelectOption({pageManager}, option);
    await pageManager.newMail.CreateNewMail(BaseTest.userForLogin.login, mailSubject, mailBody);
    if (textbox) {
      await textbox.fill(BaseTest.secondUser.login);
    };
    await pageManager.newMail.Dropdowns.Contacts.Item.click();
    await pageManager.newMail.SendMail();
  };

  async function SendAndOpenMailWithSelectedOption({pageManager}, option, textbox?, folder?) {
    await SendMailWithSelectedOption({pageManager}, option, textbox);
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
