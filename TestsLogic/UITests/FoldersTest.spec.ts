import {expect} from '@playwright/test';
import {test, BaseTest} from './BaseTest';

test.describe('Folders tests', async () => {
  let folderName;
  let mailSubject;
  let mailBody;
  let folderId;

  test.beforeEach(async ({apiManager}) => {
    folderName = BaseTest.dateTimePrefix() + ' Folder';
    mailSubject = BaseTest.dateTimePrefix() + ' Autotest Mail Subject';
    mailBody = BaseTest.dateTimePrefix() + ' Autotest Mail Body';
    folderId = await apiManager.foldersAPI.CreateFolder(folderName, BaseTest.userForLogin.login);
  });

  test.afterEach(async ({page, apiManager}) => {
    await apiManager.foldersAPI.DeleteFolderPermanentlyById(folderId, BaseTest.userForLogin.login);
    await page.close();
  });

  test.skip('Create new folder', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await pageManager.sideSecondaryMailMenu.OpenMailFolderOptions(pageManager.sideSecondaryMailMenu.MailFolders.Sent);
    await pageManager.sideSecondaryMailMenu.MailfolderOption.NewFolder();
    await pageManager.sideSecondaryMailMenu.CreateNewFolder(folderName);
    await pageManager.sideSecondaryMailMenu.OpenHidenSentFolders();
    await expect(pageManager.sideSecondaryMailMenu.Containers.MainContainer.locator(`"${folderName}"`)).toBeVisible();
  });

  test('Create new folder with API', async ({pageManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder(pageManager.sideSecondaryMailMenu.MailFolders.Sent);
    await pageManager.sideSecondaryMailMenu.OpenHidenSentFolders();
    await expect(pageManager.sideSecondaryMailMenu.Containers.MainContainer.locator(`"${folderName}"`)).toBeVisible();
  });

  test('Move mail to a new folder', async ({pageManager, apiManager}) => {
    await pageManager.sideMenu.OpenMenuTab(pageManager.sideMenu.SideMenuTabs.Mail);
    await apiManager.mailsAPI.SendMsgRequest(mailSubject, BaseTest.userForLogin.login, BaseTest.secondUser.login, mailBody);
    await pageManager.sideSecondaryMailMenu.OpenMailFolder(pageManager.sideSecondaryMailMenu.MailFolders.Sent);
    await pageManager.mailsList.OpenMail(mailSubject);
    await pageManager.mailDetails.EditMail.SpreadOptions.click();
    await pageManager.mailDetails.MailOptions.Move.click();
    await pageManager.mailDetails.MoveMailToFolder(folderName);
    await pageManager.sideSecondaryMailMenu.OpenHidenSentFolders();
    await pageManager.sideSecondaryMailMenu.OpenSubFolder(folderName);
    await expect(pageManager.mailsList.Elements.Letter.locator(`"${mailSubject}"`)).toBeVisible();
  });
});
