import {BaseAdminPage} from '../../Pages/BaseAdminPage';

export class DomainsGlobalTheme extends BaseAdminPage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator(this.InheritedFields.DetailViewContainerLocator),
    DropdownContainer: this.page.locator(this.InheritedFields.DropdownContainerLocator),
  };

  Tabs = {
    EndUser: this.Containers.MainContainer.locator('_react=[key="end_user"]'),
    AdminPanel: this.Containers.MainContainer.locator('_react=[key="admin_panel"]'),
  };

  Textboxes = {
    Title: this.Containers.MainContainer.locator('[name="carbonioWebUiTitle"]'),
    CopyrightsInformation: this.Containers.MainContainer.locator('[name="carbonioWebUiDescription"]'),
    LightLoginLogo: this.Containers.MainContainer.locator('[name="carbonioWebUiLoginLogo"]'),
    LightWebAppLogo: this.Containers.MainContainer.locator('[name="carbonioWebUiAppLogo"]'),
    DarkLoginLogo: this.Containers.MainContainer.locator('[name="carbonioWebUiDarkLoginLogo"]'),
    DarkWebAppLogo: this.Containers.MainContainer.locator('[name="carbonioWebUiDarkAppLogo"]'),
    LightLoginBackground: this.Containers.MainContainer.locator('[name="carbonioWebUiLoginBackground"]'),
    DarkLoginBackground: this.Containers.MainContainer.locator('[name="carbonioWebUiDarkLoginBackground"]'),
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
