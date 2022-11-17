import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class FilesList extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator(InheritedFields.ListContainerLocator),
  };

  Elements = {
    File: this.Containers.MainContainer.locator(InheritedFields.ListFileReactLocator),
    FileIcon: this.Containers.MainContainer.locator('[data-testid*="file"]'),
    Header: this.Containers.MainContainer.locator('[data-testid="list-header"]'),
    FileName: this.Containers.MainContainer.locator(`${InheritedFields.ListFileReactLocator} >> [color="text"]`),
    FlagIcon: this.Containers.MainContainer.locator('[data-testid="icon: Flag"]'),
    DefinedByNameFile: (unicFileName) => this.page.locator(InheritedFields.ListFileReactLocator, {hasText: `${unicFileName}`}),
  };

  SelectionModeElements = {
    CheckMark: this.Containers.MainContainer.locator('[data-testid*="Checkmark"]'),
    UncheckMark: this.Containers.MainContainer.locator('[data-testid*="unCheckedAvatar"]'),
    SelectAllButton: this.Containers.MainContainer.locator('"Select all"'),
    DeselectAllButton: this.Containers.MainContainer.locator('"Deselect all"'),
  };

  async OpenFileDetails(unicFileName) {
    await this.Elements.DefinedByNameFile(unicFileName).click();
  };
}
