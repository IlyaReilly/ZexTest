import {BasePage} from '../../Pages/BasePage';

export class FileDetails extends BasePage {
  constructor(page) {
    super(page);
  }

  Containers = {
    MainContainer: this.page.locator('.jbyjRV'),
    HeaderContainer: this.page.locator('.gjtssk'),
  };

  Elements = {
    FileName: this.Containers.HeaderContainer.locator('.hiooLB'),
    FilePreview: this.page.locator('.hpDEtg'),

  };

  Buttons = {
    CloseDetails: this.Containers.HeaderContainer.locator('.bOlfsx'),
    Download: this.Containers.HeaderContainer.locator('g[data-name="download"]'),

  };

  FileOptions = {
    Download: this.Containers.MainContainer.locator('[data-testid="icon: Download"]'),
    MaximizeOutline: this.Containers.MainContainer.locator('[data-testid="icon: MaximizeOutline"]'),
    MoreOptions: this.Containers.MainContainer.locator('[data-testid="icon: MoreVertical"]'),
    Flag: this.Containers.MainContainer.locator('"Flag"'),
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
}
