import {BasePage} from '../Pages/BasePage';

export class SideMenu extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('.gBlzsy'),
    // MainContainer: this.page.locator('.bYZlYt'),
    // MainContainer: this.page.locator('.rJmuL'),
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

  async OpenMenuTab(tab) {
    await tab.click();
  };
}
