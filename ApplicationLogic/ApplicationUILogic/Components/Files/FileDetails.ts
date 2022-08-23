import {BasePage} from '../../Pages/BasePage';

export class FileDetails extends BasePage {
  constructor(page) {
    super(page);
  }

  Containers = {
    MainContainer: this.page.locator('.jbyjRV'),
    HeaderContainer: this.page.locator('.gjtssk'),
    FileOptionsContainer: this.page.locator('.izBNKP'),
    PopupContainer: this.page.locator('.loeZsV'),
  };

  Elements = {
    FileName: this.Containers.HeaderContainer.locator('.hiooLB'),
    FilePreview: this.page.locator('.hpDEtg'),
  };

  CreateEntityPopup = {
    EntityInput: this.Containers.PopupContainer.locator('.IUNTF'),
    ClosePopupButton: this.Containers.PopupContainer.locator('.cvcXyJ'),
    CreateButton: this.Containers.PopupContainer.locator('"CREATE"'),
  };

  Buttons = {
    CloseDetails: this.Containers.HeaderContainer.locator('.bOlfsx'),
    Download: this.Containers.HeaderContainer.locator('g[data-name="download"]'),

  };

  FileOptions = {
    Download: this.Containers.FileOptionsContainer.locator('[data-testid="icon: Download"]'),
    MaximizeOutline: this.Containers.FileOptionsContainer.locator('[data-testid="icon: MaximizeOutline"]'),
    MoreOptions: this.Containers.FileOptionsContainer.locator('[data-testid="icon: MoreVertical"]'),
    Flag: this.Containers.FileOptionsContainer.locator('"Flag"'),
    UnFlag: this.Containers.FileOptionsContainer.locator('"Unflag"'),
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

  // WORK ON IT!!!!

  async CreateNewEntity(entityName) {
    await this.CreateEntityPopup.EntityInput.click();
    await this.CreateEntityPopup.EntityInput.fill(entityName);
    await this.CreateEntityPopup.CreateButton.click();
  }
}

