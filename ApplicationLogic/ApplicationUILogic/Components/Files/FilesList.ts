import {BasePage} from '../../Pages/BasePage';

export class FilesList extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('.fUgMxt'),
    ListContainer: this.page.locator('.bbLqaW'),
  };

  Elements = {
    File: this.Containers.ListContainer.locator('.lnXHNY'),
    FileIcon: this.Containers.ListContainer.locator('[data-testid*="file"]'),
    Header: this.Containers.MainContainer.locator('.debCVK'),
    FileName: this.Containers.ListContainer.locator('.hiooLB'),
    FlagIcon: this.Containers.ListContainer.locator('[data-testid*="Flag"]'),
    DefinedByNameFile: (unicFileName) => this.page.locator('div.lnXHNY', {hasText: `${unicFileName}`}),
  };

  SelectionModeElements = {
    CheckMark: this.Containers.ListContainer.locator('[data-testid*="Checkmark"]'),
    UncheckMark: this.Containers.ListContainer.locator('[data-testid*="unCheckedAvatar"]'),
    SelectAllButton: this.Containers.MainContainer.locator('"SELECT ALL"'),
    DeselectAllButton: this.Containers.MainContainer.locator('"DESELECT ALL"'),
  };

  async OpenFileDetails(unicFileName) {
    await this.Elements.DefinedByNameFile(unicFileName).click();
  };
}
