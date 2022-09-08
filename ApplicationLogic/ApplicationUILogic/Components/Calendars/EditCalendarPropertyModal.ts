import {ModalWindowBase} from '../ModalWindows/ModalWindowBase';


export class EditCalendarPropertyModal extends ModalWindowBase {
  constructor(page) {
    super(page);
  }

  SharingThisFolderButtonsText = {
    Edit: "EDIT",
    Revoke: "REVOKE",
    Resend: "RESEND",
  };

  Locators = {
    SharingThisFolderRow: '.iIEGPL',
  };

  Buttons = {
    Ok: this.Containers.MainContainer.locator('"OK"'),
    AddShare: this.Containers.MainContainer.locator('"ADD SHARE"'),
  };

  SharingThisFolderActions = {
    Edit: async (user) => {
      const btn = await this.GetSharingThisFolderActionsButton(user, this.SharingThisFolderButtonsText.Edit);
      await btn.click();
    },
    Revoke: async (user) => {
      const btn = await this.GetSharingThisFolderActionsButton(user, this.SharingThisFolderButtonsText.Revoke);
      await btn.click();
    },
    Resend: async (user) => {
      const btn = await this.GetSharingThisFolderActionsButton(user, this.SharingThisFolderButtonsText.Resend);
      await btn.click();
    },
  };

  async GetSharingThisFolderActionsButton(user, button) {
    return await this.Containers.MainContainer.
      locator(`${this.Locators.SharingThisFolderRow}`, {hasText: `${user}`}).
      locator(`"${button}"`);
  }
}
