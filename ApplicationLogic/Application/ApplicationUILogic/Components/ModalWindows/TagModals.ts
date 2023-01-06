import {BasePage} from '../../../../BasePage';
import {InheritedFields} from '../../Pages/BaseApplicationPage';

export class TagModals extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator(InheritedFields.SideSecondaryBarLocator),
    TagContextMenuContainer: this.page.locator(InheritedFields.DropdownListLocator),
  };

  Elements = {
    Item: this.Containers.MainContainer.locator('[class*="Text__Comp"]'),
    Tags: this.Containers.MainContainer.locator('"Tags"'),
  };

  Buttons = {
    ExpandTags: this.Containers.MainContainer.locator('[data-testid*="ChevronDown"]:near(:text("Tags"))'),
  };

  Dropdowns = {
    OpenCloseDropdown: this.Containers.MainContainer.locator('[class*="Dropdown"]'),
  };

  TagContextMenu = {
    CreateTag: this.Containers.TagContextMenuContainer.locator('"Create Tag"'),
    DeleteTag: this.Containers.TagContextMenuContainer.locator('"Delete Tag"'),
    EditTag: this.Containers.TagContextMenuContainer.locator('"Edit Tag"'),
  };

  async ExpandTagsFolder() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.Buttons.ExpandTags.locator('nth=1').waitFor();
    await this.Buttons.ExpandTags.first().click();
  };

  async ExpandTagsFolderinMails() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.Buttons.ExpandTags.locator('nth=0').waitFor();
    await this.Buttons.ExpandTags.first().click();
  };

  OpenTagContextMenu = {
    CreateTagModal: async () => {
      await this.Elements.Tags.click({button: 'right'});
      await this.TagContextMenu.CreateTag.click();
    },
    DeleteTagModal: async (tagName) => {
      await this.Elements.Item.locator(`"${tagName}"`).click({button: 'right'});
      await this.TagContextMenu.DeleteTag.click();
    },
    EditTagModal: async (tagName) => {
      await this.Elements.Item.locator(`"${tagName}"`).click({button: 'right'});
      await this.TagContextMenu.EditTag.click();
    },
  };
}
