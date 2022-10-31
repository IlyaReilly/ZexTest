import {BasePage} from '../../Pages/BasePage';

export class FilesList extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('.bQHovx'),
    ListContainer: this.page.locator('.jKfOVd'),
  };

  Elements = {
    File: this.Containers.ListContainer.locator('.ijUfjh'),
    FileIcon: this.Containers.ListContainer.locator('[data-testid*="file"]'),
    Header: this.Containers.MainContainer.locator('[data-testid="list-header"]'),
    FileName: this.Containers.ListContainer.locator('.fWfafH'),
    FlagIcon: this.Containers.ListContainer.locator('[data-testid="icon: Flag"]'),
    DefinedByNameFile: (unicFileName) => this.page.locator('div.ijUfjh', {hasText: `${unicFileName}`}),
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
