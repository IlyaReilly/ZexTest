import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class FilesList extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator(InheritedFields.ListContainerLocator),
    DropdownContainer: this.page.locator(InheritedFields.DropdownListLocator),
    EmptyListContainer: this.page.locator('[data-testid="emptyFolder"]'),
  };

  Elements = {
    File: this.Containers.MainContainer.locator(InheritedFields.ListFileReactLocator),
    FileIcon: this.Containers.MainContainer.locator('[data-testid*="file"]'),
    Header: this.Containers.MainContainer.locator('[data-testid="list-header"]'),
    FileName: this.Containers.MainContainer.locator(`${InheritedFields.ListFileReactLocator} >> [class^="Text__Comp"][color="text"]`),
    FileSize: this.Containers.MainContainer.locator(`${InheritedFields.ListFileReactLocator} >> [class^=Padding__Comp] [class*=NodeListItem]`),
    FlagIcon: this.Containers.MainContainer.locator('[data-testid="icon: Flag"]'),
    DefinedByNameFile: (unicFileName) => this.page.locator(InheritedFields.ListFileReactLocator, {hasText: `${unicFileName}`}),
    SelectOrder: this.Containers.MainContainer.locator('button:has(>[data-testid$="ListOutline"])'),
    CleanCompletedUploads: this.page.locator('button:has-text("Clean completed uploads")'),
  };

  SelectOrderDropdown = {
    AscendingOrder: this.Containers.DropdownContainer.locator('"Ascending Order"'),
    DescendingOrder: this.Containers.DropdownContainer.locator('"Descending Order"'),
    Name: this.Containers.DropdownContainer.locator('"Name"'),
    LastUpdate: this.Containers.DropdownContainer.locator('"Last Update"'),
    Size: this.Containers.DropdownContainer.locator('"Size"'),
  };

  SelectionModeElements = {
    CheckMark: this.Containers.MainContainer.locator('[data-testid*="Checkmark"]'),
    UncheckMark: this.Containers.MainContainer.locator('[data-testid*="unCheckedAvatar"]'),
    SelectAllButton: this.Containers.MainContainer.locator('"Select all"'),
    DeselectAllButton: this.Containers.MainContainer.locator('"Deselect all"'),
  };

  SelectListOrder = {
    NameAscending: async () => await this.SelectOrder(this.SelectOrderDropdown.Name, this.SelectOrderDropdown.AscendingOrder),
    LastUpdateAscending: async () => await this.SelectOrder(this.SelectOrderDropdown.LastUpdate, this.SelectOrderDropdown.AscendingOrder),
    SizeAscending: async () => await this.SelectOrder(this.SelectOrderDropdown.Size, this.SelectOrderDropdown.AscendingOrder),
    NameDescending: async () => await this.SelectOrder(this.SelectOrderDropdown.Name, this.SelectOrderDropdown.DescendingOrder),
    LastUpdateDescending: async () => await this.SelectOrder(this.SelectOrderDropdown.LastUpdate, this.SelectOrderDropdown.DescendingOrder),
    SizeDescending: async () => await this.SelectOrder(this.SelectOrderDropdown.Size, this.SelectOrderDropdown.DescendingOrder),
  };

  async SelectOrder(by, order) {
    await this.Elements.SelectOrder.click();
    if (await order.isVisible()) {
      await order.click();
    }
    await by.click();
    await this.Elements.SelectOrder.click();
  };

  async OpenFileDetails(unicFileName) {
    await this.Elements.DefinedByNameFile(unicFileName).click();
  };
}
