import {Locator} from '@playwright/test';
import {BaseTest} from '../../../../../TestsLogic/BaseTest';
import {BaseApplicationPage} from '../../Pages/BaseApplicationPage';

export class NewAppointment extends BaseApplicationPage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator(this.InheritedFields.NewItemBoardLocator),
    AttendeesDropdown: this.page.locator(this.InheritedFields.DropdownListLocator),
  };

  DropdownContainer = this.Containers.MainContainer.locator(this.InheritedFields.DropdownListLocator);

  bodyIframe = this.page.frameLocator(this.InheritedFields.NewItemBodyIframeLocator);

  Buttons = {
    Send: this.Containers.MainContainer.locator('"Send"'),
    Save: this.Containers.MainContainer.locator('"Save"'),
    StartDatePicker: this.Containers.MainContainer.locator('[data-testid="start-picker"]'),
    EndDatePicker: this.Containers.MainContainer.locator('[data-testid="end-picker"]'),
  };

  Dropdowns = {
    Item: this.page.locator('[value="[object Object]"]'),
    Repeat: this.Containers.MainContainer.locator('[class^="Dropdown"]').locator('"Repeat"'),
  };

  RepeatOptions = {
    None: this.DropdownContainer.locator('"None"'),
    EveryDay: this.DropdownContainer.locator('"Every day"'),
    EveryWeek: this.DropdownContainer.locator('"Every Week"'),
    EveryMonth: this.DropdownContainer.locator('"Every Month"'),
    EveryYear: this.DropdownContainer.locator('"Every Year"'),
    Custom: this.DropdownContainer.locator('"Custom"'),
  };

  TextBox = {
    EventTitle: this.Containers.MainContainer.locator('[name="Event title"]'),
    Location: this.Containers.MainContainer.locator('[name="Location"]'),
    Attendees: this.Containers.MainContainer.locator('[name="Attendees"]'),
    Body: this.bodyIframe.locator(this.InheritedFields.NewItemBodyLocator),
  };

  Elements = {
    DateWithTimeInervalInHeader: this.Containers.MainContainer.locator('[class^="Text__Comp"]').locator('text=/\\d{4}\\s\\d{2}:\\d{2}\\s-\\s*\\d{2}:\\d{2}/'),
    TimeZoneInHeader: this.Containers.MainContainer.locator('[class^="Text__Comp"]').locator('text=/GMT\\s\\+\\d{2}:\\d{2}/'),
  };

  CheckBoxes = {
    Private: this.Containers.MainContainer.locator('"Private"'),
  };

  DatePickerElements = {
    TimeListItem: this.Containers.MainContainer.locator('[class*=time-list-item]'),
  };

  async SendAppointment(title, body, attendees = BaseTest.secondUser.login, privateApp = false, location = '') {
    await this.TextBox.EventTitle.fill(title);
    await this.TextBox.Attendees.click();
    await this.TextBox.Attendees.fill(attendees);
    if (privateApp) {
      await this.CheckBoxes.Private.click();
    }
    if (location) {
      await this.TextBox.Location.fill(location);
    }
    await this.TextBox.Body.type(body);
    await this.Buttons.Send.click();
  };

  async SelectRepeatOption(option: Locator) {
    await this.Dropdowns.Repeat.click();
    await option.click();
  };

  SelectInRepeatField = {
    None: async () => this.SelectRepeatOption(this.RepeatOptions.None),
    EveryDay: async () => this.SelectRepeatOption(this.RepeatOptions.EveryDay),
    EveryWeek: async () => this.SelectRepeatOption(this.RepeatOptions.EveryWeek),
    EveryMonth: async () => this.SelectRepeatOption(this.RepeatOptions.EveryMonth),
    EveryYear: async () => this.SelectRepeatOption(this.RepeatOptions.EveryYear),
    Custom: async () => this.SelectRepeatOption(this.RepeatOptions.Custom),
  };

  async SelectTime(time: string) {
    this.DatePickerElements.TimeListItem.locator(`"${time}"`).click();
  }

  async SetStartTime(startTime: string) {
    await this.Buttons.StartDatePicker.click();
    await this.SelectTime(startTime);
  }
}
