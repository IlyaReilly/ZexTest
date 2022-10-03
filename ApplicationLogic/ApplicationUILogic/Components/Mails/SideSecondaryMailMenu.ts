import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class SideSecondaryMailMenu extends BasePage {
  Containers = {
    MainContainer: this.page.locator(InheritedFields.SideSecondaryDefaultBarLocator),
    MailOptionsContainer: this.page.locator('[data-testid="dropdown-popper-list"]'),
    CreateNewFolderPopupContainer: this.page.locator('.lgcnRq'),
  };

  Buttons = {
    OpenHideMailFolders: this.Containers.MainContainer.locator('.css-s0ezgd'),
    // OpenHideMailFolders: this.Containers.MainContainer.locator('.fjrKpL .cLLOPN'),
    ExpandFolder: this.Containers.MainContainer.locator(InheritedFields.SpreadHidenFolders),
  };

  Icons = {
    SharedIcon: this.Containers.MainContainer.locator('[data-testid*="Shared"]'),
  };

  MailFolders = {
    Inbox: this.Containers.MainContainer.locator('"Inbox"'),
    Junk: this.Containers.MainContainer.locator('"Junk"'),
    Sent: this.Containers.MainContainer.locator('"Sent"'),
    Drafts: this.Containers.MainContainer.locator('"Drafts"'),
    Trash: this.Containers.MainContainer.locator('"Trash"'),
    SubFolder: this.Containers.MainContainer.locator('.fAVahr'),
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

  async SpreadMails() {
    if (!(await this.page.isVisible(`${InheritedFields.SideSecondaryDefaultBarLocator} >> text=Inbox`))) {
      await this.Buttons.OpenHideMailFolders.first().click();
    }
  }

  OpenMailFolders = {
    Inbox: async () => await this.MailFolders.Inbox.click(),
    Junk: async () => await this.MailFolders.Junk.click(),
    Sent: async () => await this.MailFolders.Sent.click(),
    Drafts: async () => await this.MailFolders.Drafts.click(),
    Trash: async () => await this.MailFolders.Trash.click(),
  };

  async OpenMailFolderOptions(folder) {
    if (!(await this.page.isVisible(`${InheritedFields.SideSecondaryDefaultBarLocator} >> text=Inbox`))) {
      await this.Buttons.OpenHideMailFolders.first().click();
    }
    await folder.first().click({button: "right"});
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

  async ExpandFolders() {
    await this.Buttons.ExpandFolder.first().click();
  }

  async OpenFirstSubFolder(folderName) {
    await this.MailFolders.SubFolder.locator(`"${folderName}"`).first().click();
  }
}
