import {expect} from '@playwright/test';
import {test, BaseTest} from '../UITests/BaseTest';

test.describe('Folders tests', async () => {
  let folderName;
  let mailSubject;
  let mailBody;
  let folderId;
  let newFolderName;
  let subFolderName;

  test.beforeEach(async ({pageManager, apiManager}) => {
    folderName = BaseTest.dateTimePrefix() + ' Folder';
    subFolderName = BaseTest.dateTimePrefix() + ' sub Folder';
    newFolderName = BaseTest.dateTimePrefix() + ' new Folder',
    mailSubject = BaseTest.dateTimePrefix() + ' Autotest Mail Subject';
    mailBody = BaseTest.dateTimePrefix() + ' Autotest Mail Body';
    folderId = await apiManager.createFoldersAPI.CreateFolder(folderName, BaseTest.userForLogin.login);
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
  });

  test.afterEach(async ({page, apiManager}) => {
    await apiManager.deleteFoldersAPI.DeleteFolderPermanentlyById(folderId, BaseTest.userForLogin.login);
    await page.close();
  });

  // Test skipped due to problems with folder deletion afterhook.
  // It can not be implemented with UI folder creation. Impossible to get folder's id for deletion
  test.skip('Create new folder', async ({pageManager}) => {
    await pageManager.sideSecondaryMailMenu.OpenMailFolderOptions(pageManager.sideSecondaryMailMenu.MailFolders.Sent);
    await pageManager.sideSecondaryMailMenu.MailfolderOption.NewFolder();
    await pageManager.sideSecondaryMailMenu.CreateNewFolder(folderName);
    await pageManager.sideSecondaryMailMenu.ExpandFolders();
    await expect(pageManager.sideSecondaryMailMenu.Containers.MainContainer.locator(`"${folderName}"`), "Created folder should be visible").toBeVisible();
  });

  test('TC801. Create new folder with API', async ({pageManager}) => {
    await pageManager.sideSecondaryMailMenu.ExpandMailFolders.Sent();
    await expect(pageManager.sideSecondaryMailMenu.Containers.MainContainer.locator(`"${folderName}"`).first(), "Created folder should be visible").toBeVisible();
  });

  test('TC802. Move mail to a new folder', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder.Sent();
    await pageManager.mailsList.OpenMail(mailSubject);
    await pageManager.mailDetails.SelectMailOption.Move();
    await pageManager.moveMailToFolderModal.MoveMailToFolder(folderName);
    await pageManager.sideSecondaryMailMenu.ExpandMailFolders.Sent();
    await pageManager.sideSecondaryMailMenu.OpenSubFolder(folderName);
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`), "The mail placed in created folder should be visible").toBeVisible();
  });

  test('TC803. Share a new folder', async ({page, pageManager}) => {
    await OpenSentSubFolderContextMenu({pageManager});
    await pageManager.sideSecondaryMailMenu.SelectMailFolderOption.ShareFolder();
    await pageManager.shareFolderModal.Share(BaseTest.secondUser.login);
    await expect(pageManager.mailDetails.Elements.ActionWithMailNotification.locator('"Folder shared"'), '"Folder shared" action notification appears in right bottom corner').toBeVisible();
    await page.reload();
    await expect(pageManager.sideSecondaryMailMenu.Icons.SharedIcon, 'Share icon should be near folder name').toBeVisible();
  });

  test('TC804. Edit a new folder', async ({pageManager}) => {
    await OpenSentSubFolderContextMenu({pageManager});
    await pageManager.sideSecondaryMailMenu.SelectMailFolderOption.Edit();
    await pageManager.editFolderModal.EditFolder(newFolderName);
    await expect(pageManager.sideSecondaryMailMenu.Containers.MainContainer.locator(`"${newFolderName}"`), "New folder name should be visible").toBeVisible();
  });

  test('TC805. Move a new folder to another folder', async ({page, pageManager}) => {
    BaseTest.doubleTimeout();
    await OpenSentSubFolderContextMenu({pageManager});
    await pageManager.sideSecondaryMailMenu.SelectMailFolderOption.Move();
    await pageManager.moveFolderModal.MoveNewFolderToInbox();
    await pageManager.sideSecondaryMailMenu.ExpandMailFolders.Inbox();
    await expect(pageManager.sideSecondaryMailMenu.Containers.MainContainer.locator(`"${folderName}"`).first(), "Moved folder should be visible").toBeVisible();
  });

  test('TC806. Folder is wiped', async ({pageManager, apiManager}) => {
    BaseTest.doubleTimeout();
    const mailId = await apiManager.createMailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await apiManager.mailsAPI.MoveMailToFolder(mailId, BaseTest.userForLogin.login, folderId);
    await OpenSentSubFolderContextMenu({pageManager});
    await pageManager.mailsList.Elements.Letter.waitFor();
    await pageManager.sideSecondaryMailMenu.SelectMailFolderOption.WipeFolder();
    await pageManager.wipeFolderModal.WipeNewFolder();
    await pageManager.sideSecondaryMailMenu.OpenSubFolder(folderName);
    await expect(pageManager.mailsList.Elements.Letter, 'Mails list should be empty').toHaveCount(0);
  });

  test('TC807. Folder is deleted', async ({pageManager}) => {
    await OpenSentSubFolderContextMenu({pageManager});
    await pageManager.sideSecondaryMailMenu.SelectMailFolderOption.Delete();
    await pageManager.deleteFolderModal.DeleteFolder();
    await expect(pageManager.sideSecondaryMailMenu.Containers.MainContainer.locator(`"${folderName}"`), "Created folder should not be visible").not.toBeVisible();
  });

  test('TC808. Create subfolder', async ({pageManager}) => {
    await OpenSentSubFolderContextMenu({pageManager});
    await pageManager.sideSecondaryMailMenu.SelectMailFolderOption.NewFolder();
    await pageManager.sideSecondaryMailMenu.CreateNewFolder(subFolderName);
    await pageManager.sideSecondaryMailMenu.ExpandFolders(folderName);
    await expect(pageManager.sideSecondaryMailMenu.Containers.MainContainer.locator(`"${subFolderName}"`), "New folder name should be visible").toBeVisible();
  });

  async function OpenSentSubFolderContextMenu({pageManager}) {
    await pageManager.sideSecondaryMailMenu.ExpandMailFolders.Sent();
    await pageManager.sideSecondaryMailMenu.OpenFolderContextMenu(pageManager.sideSecondaryMailMenu.MailFolders.SubFolder.locator(`"${folderName}"`));
  };
});
