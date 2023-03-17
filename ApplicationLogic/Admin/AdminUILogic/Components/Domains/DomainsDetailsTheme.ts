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
    Save: this.Containers.MainContainer.locator('"Save"'),
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
    if (option === this.DarkModeOptions.Disabled) {
      await this.DarkModeOptions.Enabled.click();
      await this.Buttons.Save.click();
      await this.Dropdowns.DarkMode.click();
    };
    await option.click();
    await this.Buttons.Save.click();
    await this.WaitForNotificationHiding();
  };
};