import {BasePage} from '../../../BasePage';
import {InheritedFields} from '../Pages/BaseApplicationPage';

export class HeaderMenu extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('[class*="Background"] >> [class*="Container"]'),
    DropdownList: this.page.locator(InheritedFields.DropdownListLocator),
  };

  Buttons = {
    UserMenu: this.Containers.MainContainer.locator('[data-testid*="PersonOutline"]'),
    NewItemMenu: this.Containers.MainContainer.locator('button[class*="SecondaryAction"]'),
    NewItem: this.Containers.MainContainer.locator('[class*="MultiButton"]'),
    Search: this.Containers.MainContainer.locator('[name="Search in mails"]'),
  };

  UserMenu = {
    Feedback: this.Containers.DropdownList.locator('"Feedback"'),
    UpdateView: this.Containers.DropdownList.locator('"Update view"'),
    Documentation: this.Containers.DropdownList.locator('"Documentation"'),
    Logout: this.Containers.DropdownList.locator('"Logout"'),
  };

  NewItemMenu = {
    NewEmail: this.Containers.DropdownList.locator('"New E-mail"'),
    NewAppointment: this.Containers.DropdownList.locator('"New appointment"'),
    NewContact: this.Containers.DropdownList.locator('"New contact"'),
    Upload: this.Containers.DropdownList.locator('"Upload"'),
    NewFolder: this.Containers.DropdownList.locator(`:nth-match(:text('New Folder'), 1)`),
    NewDocument: this.Containers.DropdownList.locator('"New Document"'),
    NewSpreadsheet: this.Containers.DropdownList.locator('"New Spreadsheet"'),
    NewPresentation: this.Containers.DropdownList.locator('"New Presentation"'),
    CreateChat: this.Containers.DropdownList.locator('"Create Chat"'),
    CreateGroup: this.Containers.DropdownList.locator('"Create Group"'),
    CreateSpace: this.Containers.DropdownList.locator('"Create Space"'),
    OpenDocumentOdt: this.Containers.DropdownList.locator('"OpenDocument (.odt)"'),
    OpenDocumentOds: this.Containers.DropdownList.locator('"OpenDocument (.ods)"'),
    OpenDocumentOdp: this.Containers.DropdownList.locator('"OpenDocument (.odp)"'),
    MicrosoftWordDocx: this.Containers.DropdownList.locator('"Microsoft Word (.docx)"'),
    MicrosoftExcelXlsx: this.Containers.DropdownList.locator('"Microsoft Excel (.xlsx)"'),
    MicrosoftPointPptx: this.Containers.DropdownList.locator('"Microsoft PowerPoint (.pptx)"'),
  };

  Logos = {
    MainLogo: this.Containers.MainContainer.locator('[class*="Background"] >> _react=l'),
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
    await this.Containers.DropdownList.waitFor({state: 'visible'});
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
    OpenDocumentOdt: async () => await this.OpenNewItemMenu(this.NewItemMenu.NewDocument, this.NewItemMenu.OpenDocumentOdt),
    MicrosoftWordDocx: async () => await this.OpenNewItemMenu(this.NewItemMenu.NewDocument, this.NewItemMenu.MicrosoftWordDocx),
    OpenDocumentOds: async () => await this.OpenNewItemMenu(this.NewItemMenu.NewSpreadsheet, this.NewItemMenu.OpenDocumentOds),
    MicrosoftExcelXlsx: async () => await this.OpenNewItemMenu(this.NewItemMenu.NewSpreadsheet, this.NewItemMenu.MicrosoftExcelXlsx),
    OpenDocumentOdp: async () => await this.OpenNewItemMenu(this.NewItemMenu.NewPresentation, this.NewItemMenu.OpenDocumentOdp),
    MicrosoftPowerPointPptx: async () => await this.OpenNewItemMenu(this.NewItemMenu.NewPresentation, this.NewItemMenu.MicrosoftPointPptx),
    CreateNewChat: async () => await this.OpenNewItemMenu(this.NewItemMenu.CreateChat),
    CreateNewGroup: async () => await this.OpenNewItemMenu(this.NewItemMenu.CreateGroup),
    CreateNewSpace: async () => await this.OpenNewItemMenu(this.NewItemMenu.CreateSpace),
  };
}
