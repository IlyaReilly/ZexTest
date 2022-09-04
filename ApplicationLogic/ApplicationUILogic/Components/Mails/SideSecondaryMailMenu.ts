import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class SideSecondaryMailMenu extends BasePage {
  Containers = {
    MainContainer: this.page.locator(InheritedFields.SideSecondaryDefaultBarLocator),
    MailOptionsContainer: this.page.locator('[data-testid="dropdown-popper-list"]'),
    CreateNewFolderPopupContainer: this.page.locator('.lgcnRq '),
  };

  Buttons = {
    OpenHideMailFolders: this.Containers.MainContainer.locator('.fjrKpL .cLLOPN'),
    OpenHideSentFolders: this.Containers.MainContainer.locator('.cLLOPN:has([data-testid*="icon: ChevronDown"])'),
  };

  MailFolders = {
    Inbox: this.Containers.MainContainer.locator('"Inbox"'),
    Junk: this.Containers.MainContainer.locator('"Junk"'),
    Sent: this.Containers.MainContainer.locator('"Sent"'),
    Drafts: this.Containers.MainContainer.locator('"Drafts"'),
    Trash: this.Containers.MainContainer.locator('"Trash"'),
  };

  MailFolderOptions = {
    NewFolder: this.Containers.MailOptionsContainer.locator('"New Folder"'),
    Move: this.Containers.MailOptionsContainer.locator('"Move"'),
    WipeFolder: this.Containers.MailOptionsContainer.locator('"Wipe Folder"'),
    Edit: this.Containers.MailOptionsContainer.locator('"Edit"'),
    Delete: this.Containers.MailOptionsContainer.locator('"Delete"'),
    ShareFolder: this.Containers.MailOptionsContainer.locator('"Share folder"'),
  };

  CreateNewFolderPopup = {
    FolderName: this.Containers.CreateNewFolderPopupContainer.locator('[placeholder="Enter Folder Name"]'),
    FilterFolders: this.Containers.CreateNewFolderPopupContainer.locator('[placeholder="Enter Folder Name"]'),
    CancelButton: this.Containers.CreateNewFolderPopupContainer.locator('"CANCEL"'),
    CreateAndMoveButton: this.Containers.CreateNewFolderPopupContainer.locator('"CREATE AND MOVE"'),
  };

  constructor(page) {
    super(page);
  }

  async OpenMailFolder(folder) {
    if (!(await this.page.isVisible(`${InheritedFields.SideSecondaryDefaultBarLocator} >> text=Inbox`))) {
      await this.Buttons.OpenHideMailFolders.first().click();
    }
    await folder.click();
  }

  async OpenMailFolderOptions(folder) {
    if (!(await this.page.isVisible(`${InheritedFields.SideSecondaryDefaultBarLocator} >> text=Inbox`))) {
      await this.Buttons.OpenHideMailFolders.first().click();
    }
    await folder.click({button: "right"});
  }

  MailfolderOption = {
    NewFolder: async () => await this.MailFolderOptions.NewFolder.click(),
    Move: async () => await this.MailFolderOptions.Move.click(),
    WipeFolder: async () => await this.MailFolderOptions.WipeFolder.click(),
    Edit: async () => await this.MailFolderOptions.Edit.click(),
    Delete: async () => await this.MailFolderOptions.Delete.click(),
    ShareFolder: async () => await this.MailFolderOptions.ShareFolder.click(),
  };

  async CreateNewFolder(folderName) {
    await this.CreateNewFolderPopup.FolderName.fill(folderName);
    await this.CreateNewFolderPopup.CreateAndMoveButton.click();
  }

  // OpenHidenFoldersList = {
  //   Sent: async () => await this.Buttons.OpenHideSentFolders.click(),
  // };

  async OpenHidenSentFolders() {
    // await this.Buttons.OpenHideSentFolders.waitFor();
    await this.Buttons.OpenHideSentFolders.click();
  }
}
