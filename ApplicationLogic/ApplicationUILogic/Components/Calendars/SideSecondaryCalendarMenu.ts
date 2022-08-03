import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class SideSecondaryCalendarMenu extends BasePage {
  readonly sideSecondaryDefaultBarLocator = InheritedFields.SideSecondaryDefaultBarLocator;

  Containers = {
    MainContainer: this.page.locator(this.sideSecondaryDefaultBarLocator),
  };

  Tabs = {
    AllCalendars: this.Containers.MainContainer.locator('"All calendars"'),
    Calendar: this.Containers.MainContainer.locator('"Calendar"'),
    Trash: this.Containers.MainContainer.locator('"Trash"'),
    Tags: this.Containers.MainContainer.locator('"Tags"'),
    SharedCalendars: this.Containers.MainContainer.locator('"Shared Calendars"'),
  };

  Icons = {
    CalendarUnchecked: this.Containers.MainContainer.locator('[data-name="calendar"] >> nth=0'),
    TrashUnchecked: this.Containers.MainContainer.locator('[data-testid*="Trash2Outline"]'),
  };

  Locators = {
    CalendarUnchecked: '[data-name="calendar"]',
    TrashUnchecked: '[data-name="trash-2"]',
  };

  constructor(page) {
    super(page);
  }


  TrashSelecting = {
    Select: async () => {
      await this.Tabs.Trash.waitFor();
      if (await this.Icons.TrashUnchecked.isVisible()) {
        await this.Tabs.Trash.click();
      }
    },
    Unselect: async () => {
      await this.Tabs.Trash.waitFor();
      if (!(await this.Icons.TrashUnchecked.isVisible())) {
        await this.Tabs.Trash.click();
      }
    },
  };

  CalendarSelecting = {
    Select: async () => {
      await this.Tabs.Calendar.waitFor();
      if (await this.Icons.CalendarUnchecked.isVisible()) {
        await this.Tabs.Calendar.click();
      }
    },
    Unselect: async () => {
      await this.Tabs.Calendar.waitFor();
      if (!(await this.Icons.CalendarUnchecked.isVisible())) {
        await this.Tabs.Calendar.click();
      }
    },
  };

  async SelectOnlyTrash() {
    await this.CalendarSelecting.Unselect();
    await this.TrashSelecting.Select();
  }

  async SelectOnlyCalendar() {
    await this.TrashSelecting.Unselect();
    await this.CalendarSelecting.Select();
  }

  async OpenAllCalendars() {
    await this.Tabs.AllCalendars.click();
  }

  async OpenCalendar() {
    await this.Tabs.Calendar.click();
  }

  async OpenTags() {
    await this.Tabs.Tags.click();
  }

  async OpenSharedCalendars() {
    await this.Tabs.SharedCalendars.click();
  }
}
