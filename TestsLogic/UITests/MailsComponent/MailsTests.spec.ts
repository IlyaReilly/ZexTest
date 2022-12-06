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

  test('TC201. Open Mail tab. User login is presented in the secondary side bar.', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await expect(pageManager.sideSecondaryMailMenu.Containers.MainContainer.locator(`"${BaseTest.userForLogin.login}"`), 'User`s login is visible').toBeVisible();
  });
  // Contacts Dropdown does not appear
  test.skip('TC202. Send mail. Mail appears in the Sent folder.', async ({pageManager}) => {
    BaseTest.doubleTimeout();
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newMail.CreateNewMail(BaseTest.userForLogin.login, mailSubject, mailBody);
    await pageManager.newMail.SendMail();
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`), 'New mail subject is visible in Sent folder mails list').toBeVisible();
  });
  // 137 'Unexpected Sent folder opening'
  test.skip('TC203. Mark mail as spam. Mail appears in the Junk folder', async ({page, pageManager, apiManager}) => {
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await OpenMailFolderAndOpenMail({pageManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent, mailSubject);
    await pageManager.mailDetails.SelectMailOption.MarkAsSpam();
    await pageManager.mailDetails.Elements.ActionWithMailNotification.waitFor();
    const elementHandle = await page.$(pageManager.mailDetails.Elements.ActionWithMailNotification._selector);
    await elementHandle?.waitForElementState('hidden');
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Junk();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`), 'New mail subject is visible in Junk folder mails list').toBeVisible();
  });
  // Received mail unexpectedly appears in Junk folder
  test.skip('TC204. Get mail. Mail appears in the Inbox folder', async ({apiManager, pageManager}) => {
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.userForLogin.login, mailBody);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Inbox();
    await pageManager.mailsList.OpenMail(mailSubject);
    await expect(pageManager.mailDetails.Elements.LetterSubject.locator(`"${mailSubject}"`), 'New mail subject is visible in Inbox folder mails list').toBeVisible();
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
    await OpenMailFolderAndOpenMail({pageManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Drafts, mailSubject);
    await expect(pageManager.mailDetails.Elements.LetterSubject.locator(`"${mailSubject}"`), 'New mail subject is visible in Draft folder mails list').toBeVisible();
  });
  // Contacts Dropdown does not appear
  test.skip('TC206. Move mail to trash. Mail appears in the Trash folder', async ({pageManager, apiManager}) => {
    await apiManager.createMailsAPI.SaveDraftRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await OpenMailFolderAndOpenMail({pageManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Drafts, mailSubject);
    await pageManager.mailDetails.SelectMailOption.Delete();
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Trash();
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`), 'New mail subject is visible in Trash folder mails list').toBeVisible();
  });

  test('TC213. Delete mail permanently. Mail disappears from the Trash folder', async ({pageManager, apiManager}) => {
    const id = await apiManager.createMailsAPI.SaveDraftRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await apiManager.deleteMailsAPI.MoveToTrash(id);
    await OpenMailFolderAndOpenMail({pageManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Trash, mailSubject);
    await pageManager.mailDetails.SelectMailOption.DeletePermanently();
    await pageManager.deleteMailModal.DeletePermanently();
    await expect(pageManager.mailDetails.Elements.LetterSubject.locator(`"${mailSubject}"`), 'New mail subject should not be visible in Trash folder mails list').not.toBeVisible();
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

  test('TC220. Mark mail in New E-ail as important. "Mark as important" icon should be visible', async ({pageManager}) => {
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
    await SendAndOpenMailWithReadReceiptRequest({pageManager});
    await expect(pageManager.readReceiptRequiredModal.Elements.Title, '"Read receipt required" modal title should be visible').toBeVisible();
  });
  // Contacts Dropdown does not appear
  test.skip("TC225. Notify sender when email with read receipt request has been read. Read receipt should be visible in sender's Inbox list", async ({pageManager}) => {
    await SendMailWithReadReceiptRequest({pageManager});
    await OpenMailFolderAndOpenMail({pageManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Inbox, mailSubject);
    await expect(pageManager.mailsList.Elements.Letter.locator(`"Read-Receipt: ${mailSubject}"`), "Read receipt should be visible in sender's Inbox list").toBeVisible();
  });

  async function OpenMailFolderAndOpenMail({pageManager}, openFolder, mail) {
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

  async function SendMailWithReadReceiptRequest({pageManager}) {
    await pageManager.headerMenu.Buttons.NewItem.click();
    await pageManager.newMail.CreateNewMail(BaseTest.userForLogin.login, mailSubject, mailBody);
    await pageManager.newMail.SelectNewMailOption.RequestReadReceipt();
    await pageManager.newMail.SendMail();
  };

  async function SendAndOpenMailWithReadReceiptRequest({pageManager}) {
    await SendMailWithReadReceiptRequest({pageManager});
    await OpenMailFolderAndOpenMail({pageManager}, pageManager.sideSecondaryMailMenu.OpenMailFolder.Inbox, mailSubject);
  };
});
