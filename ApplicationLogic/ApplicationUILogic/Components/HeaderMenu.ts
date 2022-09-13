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
    Search: this.Containers.MainContainer.locator('.ikNroI'),
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
    NewFolder: this.Containers.NewItemMenuContainer.locator(`:nth-match(:text('New Folder'), 1)`),
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

  TextBoxes = {
    Search: this.Containers.MainContainer.locator('.jgQFDI'),
  };

  constructor(page) {
    super(page);
  }

  async OpenUserMenuSection(section) {
    await this.Buttons.UserMenu.click();
    await section.click();
  }

  async UploadNewFile(filePath) {
    await this.Buttons.NewItemMenu.click();
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.NewItemMenu.Upload.click(),
    ]);
    await fileChooser.setFiles(filePath);
  }

  async MakeSearch(query) {
    await this.TextBoxes.Search.type(query);
    await this.TextBoxes.Search.locator(`"${query}"`).waitFor();
    await this.TextBoxes.Search.press('Enter');
  }

  async OpenNewItemMenu(option) {
    await this.Containers.MainContainer.locator('.byOcMA').click();
    await this.page.locator('[data-testid="dropdown-popper-list"]').waitFor({state: 'visible'});
    await option.waitFor();
    await option.hover();
    await option.click();
  }

  SelectItemInNewItemMenu = {
    NewEmail: async () => await this.OpenNewItemMenu(this.NewItemMenu.NewEmail),
    NewAppointment: async () => await this.OpenNewItemMenu(this.NewItemMenu.NewAppointment),
    NewContact: async () => await this.OpenNewItemMenu(this.NewItemMenu.NewContact),
    Upload: async () => await this.OpenNewItemMenu(this.NewItemMenu.Upload),
    NewFolder: async () => await this.OpenNewItemMenu(this.NewItemMenu.NewFolder),
    NewDocument: async () => await this.OpenNewItemMenu(this.NewItemMenu.NewDocument),
    NewSpreadsheet: async () => await this.OpenNewItemMenu(this.NewItemMenu.NewSpreadsheet),
    NewPresentation: async () => await this.OpenNewItemMenu(this.NewItemMenu.NewPresentation),
    CreateChat: async () => await this.OpenNewItemMenu(this.NewItemMenu.CreateChat),
    CreateGroup: async () => await this.OpenNewItemMenu(this.NewItemMenu.CreateGroup),
    CreateSpace: async () => await this.OpenNewItemMenu(this.NewItemMenu.CreateSpace),
  }
}
