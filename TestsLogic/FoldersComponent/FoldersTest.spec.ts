import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';

test.describe('Folders tests', async () => {
  let folderName;
  let mailSubject;
  let mailBody;
  let folderId;
  let newFolderName;

  test.beforeEach(async ({apiManager}) => {
    folderName = BaseTest.dateTimePrefix() + ' Folder';
    newFolderName = BaseTest.dateTimePrefix() + ' new Folder',
    mailSubject = BaseTest.dateTimePrefix() + ' Autotest Mail Subject';
    mailBody = BaseTest.dateTimePrefix() + ' Autotest Mail Body';
    folderId = await apiManager.foldersAPI.CreateFolder(folderName, BaseTest.userForLogin.login);
  });

  test.afterEach(async ({page, apiManager}) => {
    await apiManager.foldersAPI.DeleteFolderPermanentlyById(folderId, BaseTest.userForLogin.login);
    await page.close();
  });

  // Test skipped due to problems with folder deletion afterhook.
  // It can not be implemented with UI folder creation. Impossible to get folder's id for deletion
  test.skip('Create new folder', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await pageManager.sideSecondaryMailMenu.OpenMailFolderOptions(pageManager.sideSecondaryMailMenu.MailFolders.Sent);
    await pageManager.sideSecondaryMailMenu.MailfolderOption.NewFolder();
    await pageManager.sideSecondaryMailMenu.CreateNewFolder(folderName);
    await pageManager.sideSecondaryMailMenu.ExpandFolders();
    await expect(pageManager.sideSecondaryMailMenu.Containers.MainContainer.locator(`"${folderName}"`), "Created folder should be visible").toBeVisible();
  });

  test('Create new folder with API', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await pageManager.sideSecondaryMailMenu.SpreadMails();
    await pageManager.sideSecondaryMailMenu.OpenMailFolders.Inbox();
    await pageManager.sideSecondaryMailMenu.ExpandFolders();
    await expect(pageManager.sideSecondaryMailMenu.Containers.MainContainer.locator(`"${folderName}"`).first(), "Created folder should be visible").toBeVisible();
  });

  test('Move mail to a new folder', async ({pageManager, apiManager}) => {
    test.slow();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await apiManager.mailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await pageManager.sideSecondaryMailMenu.SpreadMails();
    await pageManager.sideSecondaryMailMenu.OpenMailFolders.Sent();
    await pageManager.mailsList.OpenMail(mailSubject);
    await pageManager.mailDetails.EditMail.SpreadOptions.click();
    await pageManager.mailDetails.MailOptions.Move.click();
    await pageManager.mailDetails.MoveMailToFolder(folderName);
    await pageManager.sideSecondaryMailMenu.ExpandFolders();
    await pageManager.sideSecondaryMailMenu.OpenFirstSubFolder(folderName);
    await pageManager.sideSecondaryMailMenu.ExpandFolders();
    await pageManager.sideSecondaryMailMenu.OpenFirstSubFolder(folderName);
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`), "The mail placed in created folder should be visible").toBeVisible();
  });

  test('Share a new folder', async ({page, pageManager}) => {
    test.slow();
    await OpenSentMailSubFolderContextMenu({pageManager});
    await pageManager.sideSecondaryMailMenu.MailfolderOption.ShareFolder();
    await pageManager.shareFolderModal.ShareFolder(BaseTest.secondUser.login);
    await expect(pageManager.mailDetails.Elements.ActionWithMailNotification.locator('"Folder shared"'), '"Folder shared" action notification appears in right bottom corner').toBeVisible();
    await page.reload();
    await expect(pageManager.sideSecondaryMailMenu.Icons.SharedIcon, 'Share icon should be near folder name').toBeVisible();
  });

  test('Edit a new folder', async ({pageManager}) => {
    await OpenSentMailSubFolderContextMenu({pageManager});
    await pageManager.sideSecondaryMailMenu.MailfolderOption.Edit();
    await pageManager.editFolderModal.EditFolder(newFolderName);
    await expect(pageManager.sideSecondaryMailMenu.Containers.MainContainer.locator(`"${newFolderName}"`), "New folder name should be visible").toBeVisible();
  });

  test('Move a new folder to another folder', async ({pageManager}) => {
    test.slow();
    await OpenSentMailSubFolderContextMenu({pageManager});
    await pageManager.sideSecondaryMailMenu.MailfolderOption.Move();
    await pageManager.moveFolderModal.MoveNewFolderToInbox();
    await pageManager.sideSecondaryMailMenu.ExpandFolders();
    await expect(pageManager.sideSecondaryMailMenu.Containers.MainContainer.locator(`"${folderName}"`).first(), "Removed folder should be visible").toBeVisible();
  });

  test('Folder is wiped', async ({pageManager, apiManager}) => {
    test.slow();
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    const mailId = await apiManager.mailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await apiManager.mailsAPI.MoveMailToFolder(mailId, BaseTest.userForLogin.login, folderId);
    await pageManager.sideSecondaryMailMenu.SpreadMails();
    await pageManager.sideSecondaryMailMenu.ExpandFolders();
    await pageManager.sideSecondaryMailMenu.OpenFirstSubFolder(folderName);
    await pageManager.sideSecondaryMailMenu.OpenMailFolderOptions(pageManager.sideSecondaryMailMenu.MailFolders.SubFolder.locator(`"${folderName}"`));
    await pageManager.sideSecondaryMailMenu.MailfolderOption.WipeFolder();
    await pageManager.wipeFolderModal.WipeNewFolder();
    await expect(pageManager.mailsList.Elements.Letter, 'Mails list should be empty').toHaveCount(0);
  });

  test('Folder is deleted', async ({pageManager, apiManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await pageManager.sideSecondaryMailMenu.SpreadMails();
    await pageManager.sideSecondaryMailMenu.OpenMailFolders.Inbox();
    await pageManager.sideSecondaryMailMenu.ExpandFolders();
    await pageManager.sideSecondaryMailMenu.OpenMailFolderOptions(pageManager.sideSecondaryMailMenu.MailFolders.SubFolder.locator(`"${folderName}"`));
    await pageManager.sideSecondaryMailMenu.MailfolderOption.DeleteFolder();
    await expect(pageManager.sideSecondaryMailMenu.Containers.MainContainer.locator(`"${folderName}"`), "Created folder should be visible").not.toBeVisible();
  });


  async function OpenSentMailSubFolderContextMenu({pageManager}) {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await pageManager.sideSecondaryMailMenu.SpreadMails();
    await pageManager.sideSecondaryMailMenu.OpenMailFolders.Inbox();
    await pageManager.sideSecondaryMailMenu.ExpandFolders();
    await pageManager.sideSecondaryMailMenu.OpenMailFolderOptions(pageManager.sideSecondaryMailMenu.MailFolders.SubFolder.locator(`"${folderName}"`));
  }
});
