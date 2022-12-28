import {expect, Page} from '@playwright/test';

export const InheritedFields = {
  SideSecondaryBarLocator: '[class*="SidebarContainer"]',
  WorkspaceContainerLocator: '[class*="BoardsRouterContainer"]',
  ListContainerLocator: '[class*="List"][class*="Container"]',
  ListItemReactLocator: '_react=[key][item]',
  ListFileReactLocator: '_react=[id]',
  NewItemBoardLocator: '[class*="BoardContainer"] >> [class*="Board"] >> nth=0',
  NewItemBodyIframeLocator: '.tox-edit-area__iframe',
  NewItemBodyLocator: '.mce-content-body',
  ModalWindowLocator: '[data-testid="modal"]',
  ExpandFoldersLocator: '[data-testid="ExpandMoreIcon"]',
  DropdownListLocator: '[data-testid="dropdown-popper-list"]',
  ChatInfoContainerLocator: '[class*="InfoPanelContainer"]',
  ChatMembersContainerLocator: '[class*="ParticipantsListWidget"]',
};

export class BasePage {
  readonly page: Page;
  readonly pageLocator: string;

  constructor(page : Page, pageLocator: string = '') {
    this.page = page;
    this.pageLocator = pageLocator;
    if (!!pageLocator) {
      expect(this.page.isVisible(this.pageLocator)).toBeTruthy;
    }
  };
}

