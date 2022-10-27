import {BasePage} from '../Pages/BasePage';

export class HeaderMenu extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('.ebKkLJ'),
    UserMenuContainer: this.page.locator('[data-popper-placement="bottom-end"]'),
    NewItemMenuDropdownList: this.page.locator('[data-testid="dropdown-popper-list"]'),
  };

  Buttons = {
    UserMenu: this.Containers.MainContainer.locator('.ctJWzG'),
    NewItemMenu: this.Containers.MainContainer.locator('.htoWdb'),
    NewItem: this.Containers.MainContainer.locator('.fUVWwl'),
    Search: this.Containers.MainContainer.locator('[name="Search in mails"]'),
  };

  UserMenu = {
    Feedback: this.Containers.UserMenuContainer.locator('"Feedback"'),
    UpdateView: this.Containers.UserMenuContainer.locator('"Update view"'),
    Documentation: this.Containers.UserMenuContainer.locator('"Documentation"'),
    Logout: this.Containers.UserMenuContainer.locator('"Logout"'),
  };

  NewItemMenu = {
    NewEmail: this.Containers.NewItemMenuDropdownList.locator('"New E-mail"'),
    NewAppointment: this.Containers.NewItemMenuDropdownList.locator('"New appointment"'),
    NewContact: this.Containers.NewItemMenuDropdownList.locator('"New contact"'),
    Upload: this.Containers.NewItemMenuDropdownList.locator('"Upload"'),
    NewFolder: this.Containers.NewItemMenuDropdownList.locator(`:nth-match(:text('New Folder'), 1)`),
    NewDocument: this.Containers.NewItemMenuDropdownList.locator('"New Document"'),
    NewSpreadsheet: this.Containers.NewItemMenuDropdownList.locator('"New Spreadsheet"'),
    NewPresentation: this.Containers.NewItemMenuDropdownList.locator('"New Presentation"'),
    CreateChat: this.Containers.NewItemMenuDropdownList.locator('"Create Chat"'),
    CreateGroup: this.Containers.NewItemMenuDropdownList.locator('"Create Group"'),
    CreateSpace: this.Containers.NewItemMenuDropdownList.locator('"Create Space"'),
    OpenDocumentOdt: this.Containers.NewItemMenuDropdownList.locator('"OpenDocument (.odt)"'),
    OpenDocumentOds: this.Containers.NewItemMenuDropdownList.locator('"OpenDocument (.ods)"'),
    OpenDocumentOdp: this.Containers.NewItemMenuDropdownList.locator('"OpenDocument (.odp)"'),
  };

  Logos = {
    MainLogo: this.Containers.MainContainer.locator('.jqLXEC'),

  };

  TextBoxes = {
    Search: this.Containers.MainContainer.locator('[name*="Search in"]'),
  };

  async OpenUserMenuSection(section) {
    await this.Buttons.UserMenu.click();
    await section.click();
  };

  async UploadNewFile(filePath) {
    await this.Buttons.NewItemMenu.click();
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.NewItemMenu.Upload.click(),
    ]);
    await fileChooser.setFiles(filePath);
  };

  async MakeSearch(query) {
    await this.TextBoxes.Search.fill(query);
    await this.page.keyboard.press('Enter');
  };

  async OpenNewItemMenu(option, item?) {
    await this.Buttons.NewItemMenu.click();
    await this.Containers.NewItemMenuDropdownList.waitFor({state: 'visible'});
    await option.waitFor();
    await option.hover();
    if (item) {
      return await item.click();
    };
    await option.click();
  };

  SelectOptionInNewItemMenu = {
    NewEmail: async () => await this.OpenNewItemMenu(this.NewItemMenu.NewEmail),
    NewAppointment: async () => await this.OpenNewItemMenu(this.NewItemMenu.NewAppointment),
    NewContact: async () => await this.OpenNewItemMenu(this.NewItemMenu.NewContact),
    Upload: async () => await this.OpenNewItemMenu(this.NewItemMenu.Upload),
    NewFolder: async () => await this.OpenNewItemMenu(this.NewItemMenu.NewFolder),
    NewDocument: async () => await this.OpenNewItemMenu(this.NewItemMenu.NewDocument, this.NewItemMenu.OpenDocumentOdt),
    NewSpreadsheet: async () => await this.OpenNewItemMenu(this.NewItemMenu.NewSpreadsheet, this.NewItemMenu.OpenDocumentOds),
    NewPresentation: async () => await this.OpenNewItemMenu(this.NewItemMenu.NewPresentation, this.NewItemMenu.OpenDocumentOdp),
    CreateNewChat: async () => await this.OpenNewItemMenu(this.NewItemMenu.CreateChat),
    CreateNewGroup: async () => await this.OpenNewItemMenu(this.NewItemMenu.CreateGroup),
    CreateNewSpace: async () => await this.OpenNewItemMenu(this.NewItemMenu.CreateSpace),
  };
}
