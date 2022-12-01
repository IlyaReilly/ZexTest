import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class SideSecondaryMailMenu extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator(InheritedFields.SideSecondaryBarLocator),
    MailOptionsContainer: this.page.locator(InheritedFields.DropdownListLocator),
    CreateNewFolderPopupContainer: this.page.locator('[data-testid="modal"]'),
    ContextMenuContainer: this.page.locator(InheritedFields.DropdownListLocator),
  };

  Buttons = {
    ExpandFolder: this.Containers.MainContainer.locator(InheritedFields.ExpandFoldersLocator),
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
    Tags: this.Containers.MainContainer.locator('"Tags"'),
    SubFolder: this.Containers.MainContainer.locator('_react=[item.depth=2] >> nth=0'),
  };

  MailFolderOptions = {
    NewFolder: this.Containers.MailOptionsContainer.locator('"New Folder"'),
    Move: this.Containers.MailOptionsContainer.locator('"Move"'),
    WipeFolder: this.Containers.MailOptionsContainer.locator('"Wipe Folder"'),
    Edit: this.Containers.MailOptionsContainer.locator('"Edit"'),
    Delete: this.Containers.MailOptionsContainer.locator('"Delete"'),
    ShareFolder: this.Containers.MailOptionsContainer.locator('"Share folder"'),
    CreateTag: this.Containers.ContextMenuContainer.locator('"Create Tag"'),
    DeleteTag: this.Containers.ContextMenuContainer.locator('"Delete Tag"'),
    EditTag: this.Containers.ContextMenuContainer.locator('"Edit Tag"'),
  };

  CreateNewFolderPopup = {
    FolderName: this.Containers.CreateNewFolderPopupContainer.locator('[placeholder="Enter Folder Name"]'),
    FilterFolders: this.Containers.CreateNewFolderPopupContainer.locator('[placeholder="Enter Folder Name"]'),
    CancelButton: this.Containers.CreateNewFolderPopupContainer.locator('"Cancel"'),
    CreateButton: this.Containers.CreateNewFolderPopupContainer.locator('"Create"'),
  };

  Elements = {
    Item: this.Containers.MainContainer.locator('[class*="Text__Comp"]'),
  };

  async OpenFolder(folder) {
    if (await this.page.isHidden(`${InheritedFields.SideSecondaryBarLocator} >> text=Inbox`)) {
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
    CreateTag: async () => await this.MailFolderOptions.CreateTag.click(),
    DeleteTag: async () => await this.MailFolderOptions.DeleteTag.click(),
    EditTag: async () => await this.MailFolderOptions.EditTag.click(),
  };

  async CreateNewFolder(folderName) {
    await this.CreateNewFolderPopup.FolderName.fill(folderName);
    await this.CreateNewFolderPopup.CreateButton.click();
  };

  async ExpandFolders(folder) {
    if (folder === 'Tags') {
      await this.page.click(`[data-testid*="ChevronDown"]:near(:text("${folder}"))`);
    } else if (await this.page.isHidden(`${InheritedFields.SideSecondaryBarLocator} >> text=Inbox`)) {
      await this.Buttons.ExpandFolder.first().click();
    };
    if (folder === 'Inbox') {
      await this.Buttons.ExpandFolder.locator('nth=1').click();
    } else if (folder !== 'Tags') {
      await this.page.click(`${InheritedFields.ExpandFoldersLocator}:near(:text("${folder}"))`);
    };
  };

  ExpandMailFolders = {
    Inbox: async () => await this.ExpandFolders('Inbox'),
    Junk: async () => await this.ExpandFolders('Junk'),
    Sent: async () => await this.ExpandFolders('Sent'),
    Drafts: async () => await this.ExpandFolders('Drafts'),
    Trash: async () => await this.ExpandFolders('Trash'),
    Tags: async () => await this.ExpandFolders('Tags'),
  };

  async OpenSubFolder(folderName) {
    await this.MailFolders.SubFolder.locator(`"${folderName}"`).click();
  };
}
