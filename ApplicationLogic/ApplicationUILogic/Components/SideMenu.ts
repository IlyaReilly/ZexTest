import {BasePage} from '../Pages/BasePage';

export class SideMenu extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('.rJmuL'),
    // MainContainer: this.page.locator('.cJqpvE'),
  };

  Buttons = {
  };

  SideMenuTabs = {
    Mail: this.Containers.MainContainer.locator('[data-testid*="MailModOutline"]'),
    // Mail: this.Containers.MainContainer.locator('div > [data-testid*="MailModOutline"]'),
    Calendar: this.Containers.MainContainer.locator('[data-testid*="CalendarModOutline"]'),
    // Calendar: this.Containers.MainContainer.locator('div > [data-testid*="CalendarModOutline"]'),
    Contacts: this.Containers.MainContainer.locator('[data-testid*="ContactsModOutline"]'),
    // Contacts: this.Containers.MainContainer.locator('div > [data-testid*="ContactsModOutline"]'),
    Chats: this.Containers.MainContainer.locator('[data-testid*="TeamOutline"]'),
    // Chats: this.Containers.MainContainer.locator('[data-testid*="TeamOutline"]'),
    Files: this.Containers.MainContainer.locator('[data-testid*="DriveOutline"]'),
    // Files: this.Containers.MainContainer.locator('div > [data-testid*="DriveOutline"]'),
    Search: this.Containers.MainContainer.locator('[data-testid*="SearchModOutline"]'),
    // Search: this.Containers.MainContainer.locator('div > [data-testid*="SearchModOutline"]'),
    Settings: this.Containers.MainContainer.locator('[data-testid*="SettingsModOutline"]'),
    // Settings: this.Containers.MainContainer.locator('div > [data-testid*="SettingsModOutline"]'),
  };

  async OpenMenuTab(tab) {
    await tab.click();
  };
}
