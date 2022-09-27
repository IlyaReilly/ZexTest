import {BasePage} from '../../Pages/BasePage';
import {expect} from '@playwright/test';

export class FileDetails extends BasePage {
  constructor(page) {
    super(page);
  }

  Containers = {
    MainContainer: this.page.locator('.jbyjRV'),
    HeaderContainer: this.page.locator('.gjtssk'),
    FileOptionsContainer: this.page.locator('.gBuoCY'),
    FileOptionsDropdownContainer: this.page.locator('.izBNKP'),
    PopupContainer: this.page.locator('.loeZsV'),
    InformationContainer: this.page.locator('.bQoEy'),
    TabsBarContainer: this.page.locator('.gFkfve'),
    TabDetailsContainer: this.page.locator('.iRIzkl'),
    TabSharingContainer: this.page.locator('.gFkfve+div+div'),
    TabVersioningContainer: this.page.locator('.imSYQj'),
    DropDownPopperListContainer: this.page.locator('[data-testid="dropdown-popper-list"]'),
  };

  Elements = {
    FileName: this.Containers.HeaderContainer.locator('.hiooLB'),
    FilePreview: this.page.locator('.kpwBSH'),
    Description: this.Containers.InformationContainer.locator('.IUNTF'),
    DescriptionText: this.Containers.InformationContainer.locator('.iRjUZP'),
  };

  CreateEntityPopup = {
    EntityInput: this.Containers.PopupContainer.locator('.IUNTF'),
    ClosePopupButton: this.Containers.PopupContainer.locator('.cvcXyJ'),
    CreateButton: this.Containers.PopupContainer.locator('"CREATE"'),
    DeleteButton: this.Containers.PopupContainer.locator('"DELETE PERMANENTLY"'),
  };

  Buttons = {
    CloseDetails: this.Containers.HeaderContainer.locator('.bOlfsx'),
    Download: this.Containers.HeaderContainer.locator('g[data-name="download"]'),
    EditDescriptionButton: this.Containers.InformationContainer.locator('[data-testid*="Edit2Outline"]'),
    SaveEditsButton: this.Containers.InformationContainer.locator('[data-testid*="SaveOutline"]'),
    Share: this.Containers.TabSharingContainer.locator('"SHARE"'),
    ShareWrapper: this.Containers.TabSharingContainer.locator('.ejIaaY'),
  };

  FileOptions = {
    Download: this.Containers.FileOptionsContainer.locator('[data-testid="icon: Download"]'),
    MaximizeOutline: this.Containers.FileOptionsContainer.locator('[data-testid="icon: MaximizeOutline"]'),
    MoreOptions: this.Containers.FileOptionsContainer.locator('[data-testid="icon: MoreVertical"]'),
    Flag: this.Containers.FileOptionsDropdownContainer.locator('"Flag"'),
    UnFlag: this.Containers.FileOptionsDropdownContainer.locator('"Unflag"'),
    Dropdown: this.Containers.FileOptionsContainer.locator('.JzynG'),
    MoveToTrash: this.Containers.FileOptionsDropdownContainer.locator('"Delete"'),
    DeletePermanentlyButton: this.Containers.FileOptionsContainer.locator('[data-testid*="DeletePermanentlyOutline"]'),
    RestoreButton: this.Containers.FileOptionsContainer.locator('[data-testid*="RestoreOutline"]'),
    Rename: this.Containers.FileOptionsDropdownContainer.locator('"Rename"'),
  };

  Tabs = {
    Sharing: this.Containers.TabsBarContainer.locator('"Sharing"'),
    Versioning: this.Containers.TabsBarContainer.locator('"Versioning"'),
    Details: this.Containers.TabsBarContainer.locator('"Details"'),
  };

  InputFields = {
    AddNewPeopleField: this.Containers.TabSharingContainer.locator('.khxphZ'),
  };

  AddNewPeopleDropDown = {
    Item: (userMail) => this.Containers.DropDownPopperListContainer.locator(`"${userMail}"`),
  };

  ShareFile = {
    TypeIntoAddNewPeopleField: async (person: string) => await this.InputFields.AddNewPeopleField.type(person),
    ClickOnItem: async (userMail) => await this.AddNewPeopleDropDown.Item(userMail).click(),
  };

  ClickDropdownOption = {
    MoveToTrash: async () => await this.OpenDropdown(this.Containers.FileOptionsDropdownContainer.locator('"Delete"')),
    Flag: async () => await this.OpenDropdown(this.Containers.FileOptionsDropdownContainer.locator('"Flag"')),
    UnFlag: async () => await this.OpenDropdown(this.Containers.FileOptionsDropdownContainer.locator('"Unflag"')),
    Rename: async () => await this.OpenDropdown(this.FileOptions.Rename),
  };

  async DownloadFile() {
    const [download] = await Promise.all([this.page.waitForEvent('download'), this.FileOptions.Download.click()]);
    const suggestedFileName = download.suggestedFilename();
    const downloadedfilePath = './download/' + suggestedFileName;
    await download.saveAs(downloadedfilePath);
    return downloadedfilePath;
  }

  async CreateNewEntity(entityName) {
    entityName = entityName + Date.now();
    await this.CreateEntityPopup.EntityInput.click();
    await this.CreateEntityPopup.EntityInput.fill(entityName);
    await this.CreateEntityPopup.CreateButton.click();
  }

  async OpenDropdown(option) {
    await this.FileOptions.Dropdown.click();
    await option.click();
  }

  async WriteDescription(text) {
    await this.Buttons.EditDescriptionButton.click();
    await this.Elements.Description.type(text);
    await this.Buttons.SaveEditsButton.click();
  }

  async SharingFile(userMail) {
    await this.Tabs.Sharing.click();
    await this.InputFields.AddNewPeopleField.click();
    await this.ShareFile.TypeIntoAddNewPeopleField(userMail);
    await this.ShareFile.ClickOnItem(userMail);
    await expect(this.Buttons.ShareWrapper).toHaveAttribute('tabindex', '0');
    await this.Buttons.Share.click();
  }
}
