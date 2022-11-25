import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class SideSecondaryCalendarMenu extends BasePage {
  constructor(page) {
    super(page);
  };

  readonly SideSecondaryBarLocator = InheritedFields.SideSecondaryBarLocator;

  Containers = {
    MainContainer: this.page.locator(this.SideSecondaryBarLocator),
    ContextMenuContainer: this.page.locator(InheritedFields.DropdownListLocator),
  };

  ContextMenu = {
    NewCalendar: this.Containers.ContextMenuContainer.locator('"New calendar"'),
    MoveToRoot: this.Containers.ContextMenuContainer.locator('"Move to root"'),
    EditCalendarProperties: this.Containers.ContextMenuContainer.locator('"Edit calendar properties"'),
    DeleteCalendar: this.Containers.ContextMenuContainer.locator('"Delete calendar"'),
    ShareCalendar: this.Containers.ContextMenuContainer.locator('"Share Calendar"'),
    CalendarAccessShare: this.Containers.ContextMenuContainer.locator('"Calendar’s access share"'),
    CreateTag: this.Containers.ContextMenuContainer.locator('"Create Tag"'),
    DeleteTag: this.Containers.ContextMenuContainer.locator('"Delete Tag"'),
    EditTag: this.Containers.ContextMenuContainer.locator('"Edit Tag"'),
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
    CalendarChecked: this.Containers.MainContainer.locator('[data-testid*="Calendar2"] >> nth=0'),
    TrashUnchecked: this.Containers.MainContainer.locator('[data-testid*="Trash2Outline"]'),
    SharedIcon: this.Containers.MainContainer.locator('[data-testid*="ArrowCircleRight"]'),
  };

  Hints = {
    SharedHint: this.page.locator('"Shared with 1 people"'),
  };

  Locators = {
    CalendarUnchecked: '[data-name="calendar"]',
    CalendarChecked: '[data-testid*="Calendar2"]',
    TrashUnchecked: '[data-name="trash-2"]',
  };

  Elements = {
    TrashChevronDown: this.Containers.MainContainer.locator(`[data-testid*="ChevronDown"]:near(:text("Trash"))`),
    TrashChevronUp: this.Containers.MainContainer.locator(`[data-testid*="ChevronUp"]:near(:text("Trash"))`),
    TagChevronDown: this.Containers.MainContainer.locator(`[data-testid*="ChevronDown"]:near(:text("Tags"))`),
    TagChevronUp: this.Containers.MainContainer.locator(`[data-testid*="ChevronUp"]:near(:text("Tags"))`),
    Item: this.Containers.MainContainer.locator('[class*="Text__Comp"]'),
  };

  async OpenTrashChevron() {
    await this.Elements.TrashChevronDown.click();
  };

  async OpenTagChevron() {
    await this.Elements.TagChevronDown.locator('nth=1').waitFor();
    await this.Elements.TagChevronDown.first().click();
  };

  async GetCalendarColorByName(name: string) {
    const calendarIconElement = await this.page.waitForSelector(`text=${name} >> xpath=preceding-sibling::* >> svg`);
    const color = await calendarIconElement.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('color');
    });
    return color;
  };

  async OpenContextMenuForCalendar(name = '') {
    let calendar;
    if (name) {
      calendar = await this.Containers.MainContainer.locator(`"${name}"`);
    } else {
      calendar = await this.Tabs.Calendar;
    }
    await calendar.click({button: 'right'});
  };

  async OpenContextMenuForTags(name) {
    let tag;
    if (name) {
      tag = await this.Containers.MainContainer.locator(`"${name}"`);
    } else {
      tag = await this.Tabs.Tags;
    }
    await tag.click({button: 'right'});
  };

  OpenCalendarContextMenuOption = {
    ShareCalendar: async (name = '') => {
      await this.ClickContextMenuOption(this.ContextMenu.ShareCalendar, name);
    },
    NewCalendar: async (name = '') => {
      await this.ClickContextMenuOption(this.ContextMenu.NewCalendar, name);
    },
    MoveToRoot: async (name = '') => {
      await this.ClickContextMenuOption(this.ContextMenu.MoveToRoot, name);
    },
    EditCalendarProperties: async (name = '') => {
      await this.ClickContextMenuOption(this.ContextMenu.EditCalendarProperties, name);
    },
    DeleteCalendar: async (name = '') => {
      await this.ClickContextMenuOption(this.ContextMenu.DeleteCalendar, name);
    },
    CalendarAccessShare: async (name = '') => {
      await this.ClickContextMenuOption(this.ContextMenu.CalendarAccessShare, name);
    },
  };

  OpenTagContextMenuOption = {
    CreateTagButton: async (name = '') => {
      await this.ClickContextMenuOptionForTags(this.ContextMenu.CreateTag, name);
    },

    DeleteTagButton: async (name = '') => {
      await this.ClickContextMenuOptionForTags(this.ContextMenu.DeleteTag, name);
    },

    EditTagButton: async (name = '') => {
      await this.ClickContextMenuOptionForTags(this.ContextMenu.EditTag, name);
    },
  };

  async ClickContextMenuOption(element, name = '') {
    await this.OpenContextMenuForCalendar(name);
    await element.click();
  };

  async ClickContextMenuOptionForTags(element, name = '') {
    await this.OpenContextMenuForTags(name);
    await element.click();
  };

  async ShareCalendar() {
    await this.OpenContextMenuForCalendar();
    await this.ContextMenu.ShareCalendar.click();
  };

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

  async SelectOnlyCalendarWithName(calendarName) {
    await this.CalendarSelecting.Unselect();
    await this.TrashSelecting.Unselect();
    await this.page.locator(`${this.Locators.CalendarUnchecked}:near(:text("${calendarName}"))`).click();
  };

  async UnselectAllCalendars() {
    await this.Tabs.Calendar.waitFor();
    while (await this.Icons.CalendarChecked.isVisible()) {
      await this.Icons.CalendarChecked.click();
    }
  };

  async SelectOnlyTrash() {
    await this.CalendarSelecting.Unselect();
    await this.TrashSelecting.Select();
  };

  async SelectOnlyCalendar() {
    await this.TrashSelecting.Unselect();
    await this.CalendarSelecting.Select();
  };

  async OpenAllCalendars() {
    await this.Tabs.AllCalendars.click();
  };

  async OpenCalendar() {
    await this.Tabs.Calendar.click();
  };

  async OpenTags() {
    await this.Tabs.Tags.click();
  }

  async OpenSharedCalendars() {
    await this.Tabs.SharedCalendars.click();
  };
}
