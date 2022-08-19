import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class SideSecondaryMailMenu extends BasePage {
  Containers = {
    MainContainer: this.page.locator(InheritedFields.SideSecondaryDefaultBarLocator),
  };

  Buttons = {
    OpenHideMailFolders: this.Containers.MainContainer.locator(':nth-match(.cLLOPN, 1)'),
  };

  MailFolders = {
    Inbox: this.Containers.MainContainer.locator('"Inbox"'),
    Junk: this.Containers.MainContainer.locator('"Junk"'),
    Sent: this.Containers.MainContainer.locator('"Sent"'),
    Drafts: this.Containers.MainContainer.locator('"Drafts"'),
    Trash: this.Containers.MainContainer.locator('"Trash"'),
  };

  constructor(page) {
    super(page);
  }

  async OpenMailFolder(folder) {
    if (!(await this.page.isVisible(`${InheritedFields.SideSecondaryDefaultBarLocator} >> text=Inbox`))) {
      await this.Buttons.OpenHideMailFolders.click();
    }

    await folder.click();
  }
}
