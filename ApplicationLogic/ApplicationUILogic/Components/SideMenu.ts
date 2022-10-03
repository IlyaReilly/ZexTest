import {BasePage} from '../Pages/BasePage';

export class SideMenu extends BasePage {
  Containers = {
    MainContainer: this.page.locator('.rJmuL'),
  };

  Buttons = {
  };

  SideMenuTabs = {
    Mail: this.Containers.MainContainer.locator('div > [data-testid*="MailModOutline"]'),
    Calendar: this.Containers.MainContainer.locator('div > [data-testid*="CalendarModOutline"]'),
    Contacts: this.Containers.MainContainer.locator('div > [data-testid*="ContactsModOutline"]'),
    Chats: this.Containers.MainContainer.locator('[data-testid*="TeamOutline"]'),
    Files: this.Containers.MainContainer.locator('div > [data-testid*="DriveOutline"]'),
    Search: this.Containers.MainContainer.locator('div > [data-testid*="SearchModOutline"]'),
    Settings: this.Containers.MainContainer.locator('div > [data-testid*="SettingsModOutline"]'),
  };

  constructor(page) {
    super(page);
  }

  async OpenMenuTab(tab) {
    await tab.click();
  }
}
