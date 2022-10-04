import {Page} from '@playwright/test';
import {ModalWindowBase} from '../../ModalWindows/ModalWindowBase';

export class AddNewMembersModal extends ModalWindowBase {
  constructor(page: Page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator('.jCXemQ'),
    MembersDropdownContainer: this.page.locator('.jfvBPE'),
  };

  Fields = {
    AddMemberField: this.Containers.MainContainer.locator('[name="Add members"]'),
  };

  Buttons = {
    CloseButton: this.Containers.MainContainer.locator('[data-testid*="Close"]'),
    SaveButton: this.Containers.MainContainer.locator('"Save"'),
  };

  Participans = {
    Member: this.Containers.MembersDropdownContainer.locator('.eAqjez'),
  };

  async AddNewMember(member) {
    await this.Fields.AddMemberField.fill(member);
    await this.Participans.Member.locator('nth=-1').click();
    await this.Buttons.SaveButton.click();
  };
}
