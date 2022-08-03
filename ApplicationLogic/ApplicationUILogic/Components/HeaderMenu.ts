import {BasePage} from '../Pages/BasePage';

export class HeaderMenu extends BasePage {
  Containers = {
    MainContainer: this.page.locator('.colVne'),
    UserMenuContainer: this.page.locator('.ktmHhm'),
    NewItemMenuContainer: this.page.locator('.izBNKP'),
  };

  Buttons = {
    UserMenu: this.Containers.MainContainer.locator('.fxUdvh'),
    NewItemMenu: this.Containers.MainContainer.locator('.byOcMA'),
    NewItem: this.Containers.MainContainer.locator('.ejIaaY'),
  };

  UserMenu = {
    Feedback: this.Containers.UserMenuContainer.locator('"Feedback"'),
    UpdateView: this.Containers.UserMenuContainer.locator('"Update view"'),
    Documentation: this.Containers.UserMenuContainer.locator('"Documentation"'),
    Logout: this.Containers.UserMenuContainer.locator('"Logout"'),
  };

  NewItemMenu = {
    NewEmail: this.Containers.NewItemMenuContainer.locator('"New E-mail"'),
    NewAppointment: this.Containers.NewItemMenuContainer.locator('"New appointment"'),
    NewContact: this.Containers.NewItemMenuContainer.locator('"New contact"'),
    Upload: this.Containers.NewItemMenuContainer.locator('"Upload"'),
    NewFolder: this.Containers.NewItemMenuContainer.locator('"New Folder"'),
    NewDocument: this.Containers.NewItemMenuContainer.locator('"New Document"'),
    NewSpreadsheet: this.Containers.NewItemMenuContainer.locator('"New Spreadsheet"'),
    NewPresentation: this.Containers.NewItemMenuContainer.locator('"New Presentation"'),
    CreateChat: this.Containers.NewItemMenuContainer.locator('"Create Chat"'),
    CreateGroup: this.Containers.NewItemMenuContainer.locator('"Create Group"'),
    CreateSpace: this.Containers.NewItemMenuContainer.locator('"Create Space"'),
  };

  Logos = {
    MainLogo: this.Containers.MainContainer.locator('.heVtQH'),
  };

  constructor(page) {
    super(page);
  }

  async OpenUserMenuSection(section) {
    await this.Buttons.UserMenu.click();
    await section.click();
  }

  async OpenNewItemMenuSection(item) {
    await this.Buttons.NewItemMenu.click();
    await item.click();
  }

  async UploadNewFile(filePath) {
    await this.Buttons.NewItemMenu.click();
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.NewItemMenu.Upload.click(),
    ]);
    await fileChooser.setFiles(filePath);
  }
}
