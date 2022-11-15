import {BasePage} from '../../Pages/BasePage';
import {expect} from '@playwright/test';

export class FileDetails extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('.cfQFxI'),
    HeaderContainer: this.page.locator('[data-testid="DisplayerHeader"]'),
    FileOptionsContainer: this.page.locator('[data-testid="displayer-actions-header"]'),
    PopupContainer: this.page.locator('.kSniyH'),
    InformationContainer: this.page.locator('.eoKvNK'),
    TabsBarContainer: this.page.locator('.gnmCZc'),
    TabDetailsContainer: this.page.locator('[data-testid="node-details"]'),
    TabSharingContainer: this.page.locator('[data-testid="node-sharing-collaborators"]'),
    TabVersioningContainer: this.page.locator('.eiltIC'),
    DropDownPopperListContainer: this.page.locator('[data-testid="dropdown-popper-list"]'),
  };

  Elements = {
    FileName: this.Containers.HeaderContainer.locator('.fWfafH'),
    FilePreview: this.page.locator('.ckbqRX'),
    FileSize: this.Containers.InformationContainer.locator('.fWfafH'),
    Description: this.Containers.InformationContainer.locator('.bjWHPb'),
    DescriptionText: this.Containers.InformationContainer.locator('.hWkqlJ'),
    FileDescription: this.Containers.InformationContainer.locator('.dERcjk'),
  };

  CreateEntityPopup = {
    EntityInput: this.Containers.PopupContainer.locator('.IUNTF'),
    ClosePopupButton: this.Containers.PopupContainer.locator('.cvcXyJ'),
    CreateButton: this.Containers.PopupContainer.locator('"CREATE"'),
    DeleteButton: this.Containers.PopupContainer.locator('button:has-text("Delete permanently")'),
  };

  Buttons = {
    CloseDetails: this.Containers.HeaderContainer.locator('[data-testid*="Close"]'),
    Download: this.Containers.HeaderContainer.locator('g[data-name="download"]'),
    EditDescriptionButton: this.Containers.InformationContainer.locator('[data-testid*="Edit2Outline"]'),
    SaveEditsButton: this.Containers.InformationContainer.locator('[data-testid*="SaveOutline"]'),
    Share: this.Containers.TabSharingContainer.locator('"Share"'),
    ShareWrapper: this.Containers.TabSharingContainer.locator('.jBRgq'),
  };

  FileOptions = {
    Download: this.Containers.FileOptionsContainer.locator('[data-testid*="Download"]'),
    MaximizeOutline: this.Containers.FileOptionsContainer.locator('[data-testid*="MaximizeOutline"]'),
    SendViaMail: this.Containers.FileOptionsContainer.locator('[data-testid*="EmailOutline"]'),
    Edit: this.Containers.FileOptionsContainer.locator('[data-testid*="Edit2Outline"]'),
    MoreOptions: this.Containers.FileOptionsContainer.locator('[data-testid*="MoreVertical"]'),
    Flag: this.Containers.DropDownPopperListContainer.locator('"Flag"'),
    UnFlag: this.Containers.DropDownPopperListContainer.locator('"Unflag"'),
    MoveToTrash: this.Containers.DropDownPopperListContainer.locator('"Delete"'),
    DeletePermanentlyButton: this.Containers.FileOptionsContainer.locator('[data-testid*="DeletePermanentlyOutline"]'),
    RestoreButton: this.Containers.FileOptionsContainer.locator('[data-testid*="RestoreOutline"]'),
    Rename: this.Containers.DropDownPopperListContainer.locator('"Rename"'),
  };

  Tabs = {
    Sharing: this.Containers.TabsBarContainer.locator('"Sharing"'),
    Versioning: this.Containers.TabsBarContainer.locator('"Versioning"'),
    Details: this.Containers.TabsBarContainer.locator('"Details"'),
  };

  InputFields = {
    AddNewPeopleField: this.Containers.TabSharingContainer.locator('[data-testid="add-sharing-chip-input"]'),
  };

  AddNewPeopleDropDown = {
    Item: (userMail) => this.Containers.DropDownPopperListContainer.locator(`"${userMail}"`),
  };

  ShareFile = {
    TypeIntoAddNewPeopleField: async (person: string) => await this.InputFields.AddNewPeopleField.type(person),
    ClickOnItem: async (userMail) => await this.AddNewPeopleDropDown.Item(userMail).click(),
  };

  ClickDropdownOption = {
    MoveToTrash: async () => await this.OpenDropdown(this.Containers.DropDownPopperListContainer.locator('"Delete"')),
    Flag: async () => await this.OpenDropdown(this.Containers.DropDownPopperListContainer.locator('"Flag"')),
    UnFlag: async () => await this.OpenDropdown(this.Containers.DropDownPopperListContainer.locator('"Unflag"')),
    Rename: async () => await this.OpenDropdown(this.FileOptions.Rename),
  };

  async DownloadFile() {
    const [download] = await Promise.all([this.page.waitForEvent('download'), this.FileOptions.Download.click()]);
    const suggestedFileName = download.suggestedFilename();
    const downloadedfilePath = './download/' + suggestedFileName;
    await download.saveAs(downloadedfilePath);
    return downloadedfilePath;
  };

  async CreateNewEntity(entityName) {
    entityName = entityName + Date.now();
    await this.CreateEntityPopup.EntityInput.click();
    await this.CreateEntityPopup.EntityInput.fill(entityName);
    await this.CreateEntityPopup.CreateButton.click();
  };

  async OpenDropdown(option) {
    await this.FileOptions.MoreOptions.click();
    await option.click();
  };

  async WriteDescription(text) {
    await this.Buttons.EditDescriptionButton.locator('nth=-1').waitFor();
    await this.Buttons.EditDescriptionButton.locator('nth=-1').click();
    await this.Elements.FileDescription.type(text);
    await this.Buttons.SaveEditsButton.click();
  };

  async SharingFile(userMail) {
    await this.Tabs.Sharing.click();
    await this.InputFields.AddNewPeopleField.click();
    await this.ShareFile.TypeIntoAddNewPeopleField(userMail);
    await this.ShareFile.ClickOnItem(userMail);
    await expect(this.Buttons.ShareWrapper).toHaveAttribute('tabindex', '0');
    await this.Buttons.Share.click();
  };
}
