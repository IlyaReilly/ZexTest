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

export const ColorChangeList = [
  {
    "ColorSet": "'cyan'",
    "ColorCheck": "_react=[customColor = '#2196d3']",
  },
  {
    "ColorSet": "'green'",
    "ColorCheck": "_react=[customColor = '#639030']",
  },
  {
    "ColorSet": "'black'",
    "ColorCheck": "_react=[customColor = '#000000']",
  },
  {
    "ColorSet": "'purple'",
    "ColorCheck": "_react=[customColor = '#1a75a7']",
  },
  {
    "ColorSet": "'red'",
    "ColorCheck": "_react=[customColor = '#d74942']",
  },
  {
    "ColorSet": "'yellow'",
    "ColorCheck": "_react=[customColor = '#ffc107']",
  },
  {
    "ColorSet": "'pink'",
    "ColorCheck": "_react=[customColor = '#edaeab']",
  },
  {
    "ColorSet": "'gray'",
    "ColorCheck": "_react=[customColor = '#828282']",
  },
  {
    "ColorSet": "'blue'",
    "ColorCheck": "_react=[customColor = '#2b73d2']",
  },
  {
    "ColorSet": "'orange'",
    "ColorCheck": "_react=[customColor = '#ba8b00']",
  },
];
