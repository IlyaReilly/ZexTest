import {BasePage} from '../../Pages/BasePage';

export class FilesList extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('.lcolry'),
    // MainContainer: this.page.locator('.fUgMxt'),
    ListContainer: this.page.locator('.jhFkis'),
    // not a unique locator
    // ListContainer: this.page.locator('.bbLqaW'),
  };

  Elements = {
    File: this.Containers.ListContainer.locator('.iLcLUN'),
    FileIcon: this.Containers.ListContainer.locator('[data-testid*="file"]'),
    Header: this.Containers.MainContainer.locator('[data-testid="list-header"]'),
    FileName: this.Containers.ListContainer.locator('.jwMliq'),
    // FileName: this.Containers.ListContainer.locator('.hiooLB'),
    FlagIcon: this.Containers.ListContainer.locator('[data-testid="icon: Flag"]'),
    // without "icon" doesn't find element
    DefinedByNameFile: (unicFileName) => this.page.locator('div.iLcLUN', {hasText: `${unicFileName}`}),
  };

  SelectionModeElements = {
    CheckMark: this.Containers.ListContainer.locator('[data-testid*="Checkmark"]'),
    UncheckMark: this.Containers.ListContainer.locator('[data-testid*="unCheckedAvatar"]'),
    SelectAllButton: this.Containers.MainContainer.locator('"Select all"'),
    DeselectAllButton: this.Containers.MainContainer.locator('"Deselect all"'),
  };

  async OpenFileDetails(unicFileName) {
    await this.Elements.DefinedByNameFile(unicFileName).click();
  };
}
