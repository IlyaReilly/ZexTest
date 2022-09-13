import {BasePage} from '../../Pages/BasePage';

export class FileDetails extends BasePage {
  constructor(page) {
    super(page);
  }

  Containers = {
    MainContainer: this.page.locator('.jbyjRV'),
    HeaderContainer: this.page.locator('.gjtssk'),
    FileOptionsContainer: this.page.locator('.gBuoCY'),
    FileOptionsDropdownContainer: this.page.locator('.izBNKP'),
    PopupContainer: this.page.locator('.loeZsV'),
  };

  Elements = {
    FileName: this.Containers.HeaderContainer.locator('.hiooLB'),
    FilePreview: this.page.locator('.kpwBSH'),
  };

  CreateEntityPopup = {
    EntityInput: this.Containers.PopupContainer.locator('.IUNTF'),
    ClosePopupButton: this.Containers.PopupContainer.locator('.cvcXyJ'),
    CreateButton: this.Containers.PopupContainer.locator('"CREATE"'),
    DeleteButton: this.Containers.PopupContainer.locator('"DELETE PERMANENTLY"'),
  };

  Buttons = {
    CloseDetails: this.Containers.HeaderContainer.locator('.bOlfsx'),
    Download: this.Containers.HeaderContainer.locator('g[data-name="download"]'),

  };

  FileOptions = {
    Download: this.Containers.FileOptionsContainer.locator('[data-testid="icon: Download"]'),
    MaximizeOutline: this.Containers.FileOptionsContainer.locator('[data-testid="icon: MaximizeOutline"]'),
    MoreOptions: this.Containers.FileOptionsContainer.locator('[data-testid="icon: MoreVertical"]'),
    Flag: this.Containers.FileOptionsDropdownContainer.locator('"Flag"'),
    UnFlag: this.Containers.FileOptionsDropdownContainer.locator('"Unflag"'),
    Dropdown: this.Containers.FileOptionsContainer.locator('.JzynG'),
    MoveToTrash: this.Containers.FileOptionsDropdownContainer.locator('"Move to Trash"'),
    DeletePermanentlyButton: this.Containers.FileOptionsContainer.locator('[data-testid*="DeletePermanentlyOutline"]'),
    RestoreButton: this.Containers.FileOptionsContainer.locator('[data-testid*="RestoreOutline"]'),
    Rename: this.Containers.FileOptionsDropdownContainer.locator('"Rename"'),
  };

  async DownloadFile() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.FileOptions.Download.click(),
    ]);
    const suggestedFileName = download.suggestedFilename();
    const downloadedfilePath = './download/' + suggestedFileName;
    await download.saveAs(downloadedfilePath);
    return downloadedfilePath;
  }

  async CreateNewEntity(entityName) {
    entityName = entityName + Date.now();
    await this.CreateEntityPopup.EntityInput.click();
    await this.CreateEntityPopup.EntityInput.fill(entityName);
    await this.CreateEntityPopup.CreateButton.click();
  }

  async OpenDropdown(option) {
    await this.FileOptions.Dropdown.click();
    await option.click();
  }

  ClickDropdownOption = {
    MoveToTrash: async () => await this.OpenDropdown(this.Containers.FileOptionsDropdownContainer.locator('"Move to Trash"')),
    Flag: async () => await this.OpenDropdown(this.Containers.FileOptionsDropdownContainer.locator('"Flag"')),
    UnFlag: async () => await this.OpenDropdown(this.Containers.FileOptionsDropdownContainer.locator('"Unflag"')),
    Rename: async () => await this.OpenDropdown(this.FileOptions.Rename),
}
}

