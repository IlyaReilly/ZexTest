import {BasePage} from '../../Pages/BasePage';

export class FilesList extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    // MainContainer: this.page.locator('.fUgMxt'),
    MainContainer: this.page.locator('.lcolry'),
    // ListContainer: this.page.locator('.bbLqaW'),
    ListContainer: this.page.locator('.jhFkis'),
  };

  Elements = {
    File: this.Containers.ListContainer.locator('[data-testid*="node-item-ea19d6fd"]'),
    FileIcon: this.Containers.ListContainer.locator('[data-testid*="file"]'),
    Header: this.Containers.MainContainer.locator('[data-testid="list-header"]'),
    // FileName: this.Containers.ListContainer.locator('.hiooLB'),
    FileName: this.Containers.ListContainer.locator('.jwMliq'),
    FlagIcon: this.Containers.ListContainer.locator('[data-testid*="Flag"]'),
    DefinedByNameFile: (unicFileName) => this.page.locator('div[data-testid*="node-item-ea19d6fd"]', {hasText: `${unicFileName}`}),
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
