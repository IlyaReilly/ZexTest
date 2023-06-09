import {Locator} from '@playwright/test';
import {BaseTest} from '../../../../../TestsLogic/BaseTest';
import {BaseApplicationPage} from '../../Pages/BaseApplicationPage';

export class NewAppointment extends BaseApplicationPage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator(this.InheritedFields.NewItemBoardLocator),
    AttendeesDropdown: this.page.locator(this.InheritedFields.DropdownLocator),
  };

  DropdownContainer = this.Containers.MainContainer.locator(this.InheritedFields.DropdownLocator);
  DatePickerContainer = this.Containers.MainContainer.locator('[class="react-datepicker"]');

  bodyIframe = this.page.frameLocator(this.InheritedFields.NewItemBodyIframeLocator);
  row = this.Containers.MainContainer.locator('[class^="Text__Comp"]');

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
    DateWithTimeInervalInHeader: this.row.locator('text=/\\d{4}\\s\\d{2}:\\d{2}\\s-\\s*\\d{2}:\\d{2}/'),
  };

  CheckBoxes = {
    Private: this.Containers.MainContainer.locator('"Private"'),
    AllDay: this.Containers.MainContainer.locator('[data-testid="editor-allDay"]'),
    AllDayCheckboxIcon: this.Containers.MainContainer.locator('[data-testid="editor-allDay"]').locator('[data-testid$="Square"]'),
  };

  DatePickerElements = {
    TimeListItem: this.DatePickerContainer.locator('[class*=time-list-item]'),
    DayOfMonth: this.DatePickerContainer.locator('[class$=__week]>[class*=__day]'),
    NextMonth: this.DatePickerContainer.locator('[aria-label="Next Month"]'),
    PreviousMonth: this.DatePickerContainer.locator('[aria-label="Previous Month"]'),
    MonthAndYear: this.DatePickerContainer.locator('[class*="current-month"]'),
  };

  async SendAppointment(title: string, body: string, attendees = BaseTest.userForLogin.login, privateApp = false, location?: string, startTime?: string, repeatOption?: Locator) {
    await this.TextBox.EventTitle.scrollIntoViewIfNeeded();
    await this.TextBox.EventTitle.click();
    await this.TextBox.EventTitle.fill(title);
    await this.row.locator(`"${title}"`).waitFor();
    await this.TextBox.Attendees.fill(attendees);
    if (privateApp) {
      await this.CheckBoxes.Private.click();
    }
    if (location) {
      await this.TextBox.Location.fill(location);
      await this.row.locator(`"${location}"`).waitFor();
    }
    if (startTime) {
      await this.SetStartTime(startTime);
    }
    if (repeatOption) {
      await this.SelectRepeatOption(repeatOption);
    };
    await this.TextBox.Body.click();
    await this.TextBox.Body.fill(body);
    await this.Buttons.Send.click();
  };

  async SelectRepeatOption(option: Locator) {
    await this.Dropdowns.Repeat.click();
    await option.click();
  };

  async SelectTime(time: string) {
    await this.DatePickerElements.TimeListItem.locator(`"${time}"`).click();
  }

  async SetStartTime(startTime: string) {
    await this.Buttons.StartDatePicker.click();
    await this.SelectTime(startTime);
  }

  async SelectDayOfMonth(dayOfMonth: number) {
    await this.DatePickerElements.DayOfMonth.locator(`"${dayOfMonth}"`).click();
  }
}
