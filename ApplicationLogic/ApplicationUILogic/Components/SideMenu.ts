import {BasePage} from '../Pages/BasePage';

export class SideMenu extends BasePage {
  Containers = {
    MainContainer: this.page.locator('.rJmuL'),
    // MainContainer: this.page.locator('.cJqpvE'),
  };

  Buttons = {
  };

  SideMenuTabs = {
    Mail: this.Containers.MainContainer.locator('[data-testid*="MailModOutline"]'),
    Calendar: this.Containers.MainContainer.locator('[data-testid*="CalendarModOutline"]'),
    Contacts: this.Containers.MainContainer.locator('[data-testid*="ContactsModOutline"]'),
    Chats: this.Containers.MainContainer.locator('[data-testid*="TeamOutline"]'),
    Files: this.Containers.MainContainer.locator('[data-testid*="DriveOutline"]'),
    Search: this.Containers.MainContainer.locator('[data-testid*="SearchModOutline"]'),
    Settings: this.Containers.MainContainer.locator('[data-testid*="SettingsModOutline"]'),
  };

  constructor(page) {
    super(page);
  }

  async OpenMenuTab(tab) {
    await tab.click();
  }
}
