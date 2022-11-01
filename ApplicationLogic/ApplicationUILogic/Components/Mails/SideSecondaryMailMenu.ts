import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class SideSecondaryMailMenu extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator(InheritedFields.SideSecondaryDefaultBarLocator),
    MailOptionsContainer: this.page.locator('[data-testid="dropdown-popper-list"]'),
    CreateNewFolderPopupContainer: this.page.locator('[data-testid="modal"]'),
  };

  Buttons = {
    ExpandFolder: this.Containers.MainContainer.locator(InheritedFields.ExpandHidenFolders),
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
    SubFolder: this.Containers.MainContainer.locator('.css-15u4h3'),
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
    CancelButton: this.Containers.CreateNewFolderPopupContainer.locator('"Cancel"'),
    CreateButton: this.Containers.CreateNewFolderPopupContainer.locator('"Create"'),
  };

  Elements = {
    Letter: this.Containers.MainContainer.locator('.jTMZGq'),
  };

  async OpenFolder(folder) {
    if (await this.page.isHidden(`${InheritedFields.SideSecondaryDefaultBarLocator} >> text=Inbox`)) {
      await this.Buttons.ExpandFolder.first().click();
    }
    await folder.click();
  };

  OpenMailFolder = {
    Inbox: async () => await this.OpenFolder(this.MailFolders.Inbox),
    Junk: async () => await this.OpenFolder(this.MailFolders.Junk),
    Sent: async () => await this.OpenFolder(this.MailFolders.Sent),
    Drafts: async () => await this.OpenFolder(this.MailFolders.Drafts),
    Trash: async () => await this.OpenFolder(this.MailFolders.Trash),
  };

  async OpenFolderContextMenu(folder) {
    await folder.first().click({button: "right"});
  };

  SelectMailFolderOption = {
    NewFolder: async () => await this.MailFolderOptions.NewFolder.click(),
    Move: async () => await this.MailFolderOptions.Move.click(),
    WipeFolder: async () => await this.MailFolderOptions.WipeFolder.click(),
    Edit: async () => await this.MailFolderOptions.Edit.click(),
    Delete: async () => await this.MailFolderOptions.Delete.click(),
    ShareFolder: async () => await this.MailFolderOptions.ShareFolder.click(),
  };

  async CreateNewFolder(folderName) {
    await this.CreateNewFolderPopup.FolderName.fill(folderName);
    await this.CreateNewFolderPopup.CreateButton.click();
  };

  async ExpandFolders(folder) {
    if (await this.page.isHidden(`${InheritedFields.SideSecondaryDefaultBarLocator} >> text=Inbox`)) {
      await this.Buttons.ExpandFolder.first().click();
    };
    if (folder === 'Inbox') {
      await this.Buttons.ExpandFolder.locator('nth=1').click();
    } else if (folder) {
      await this.page.click(`${InheritedFields.ExpandHidenFolders}:near(:text("${folder}"))`);
    };
  };

  ExpandMailFolders = {
    Inbox: async () => await this.ExpandFolders('Inbox'),
    Junk: async () => await this.ExpandFolders('Junk'),
    Sent: async () => await this.ExpandFolders('Sent'),
    Drafts: async () => await this.ExpandFolders('Drafts'),
    Trash: async () => await this.ExpandFolders('Trash'),
  };

  async OpenSubFolder(folderName) {
    await this.MailFolders.SubFolder.locator(`"${folderName}"`).click();
  };
}
