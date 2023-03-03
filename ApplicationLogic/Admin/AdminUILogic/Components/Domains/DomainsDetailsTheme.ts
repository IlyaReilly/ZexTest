import {BaseAdminPage} from '../../Pages/BaseAdminPage';

export class DomainsDetailsTheme extends BaseAdminPage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator(this.InheritedFields.DetailViewContainerLocator),
    DropdownContainer: this.page.locator(this.InheritedFields.DropdownContainerLocator),
  };

  Buttons = {
    Save: this.Containers.MainContainer.locator('"SAVE"'),
  };

  Dropdowns = {
    DarkMode: this.Containers.MainContainer.locator('[class^="Dropdown"]:has-text("Dark Mode")'),
  };

  DarkModeOptions = {
    Enabled: this.Containers.DropdownContainer.locator('"Enabled"'),
    Disabled: this.Containers.DropdownContainer.locator('"Disabled"'),
  };

  SetDarkModeOption = {
    Enabled: async () => await this.SetAppearance(this.DarkModeOptions.Enabled),
    Disabled: async () => await this.SetAppearance(this.DarkModeOptions.Disabled),
  };

  async SetAppearance(option) {
    await this.Dropdowns.DarkMode.click();
    await option.click();
    if (await this.Buttons.Save.isVisible()) {
      await this.Buttons.Save.click();
    };
  };
};
