import {BasePage} from "../../../BasePage";

export class BaseApplicationPage extends BasePage {
  constructor(page) {
    super(page);
  };

  InheritedFields = {
    SideSecondaryBarLocator: '[class*="SidebarContainer"]',
    WorkspaceContainerLocator: '[class*="BoardsRouterContainer"]',
    ListContainerLocator: '[class*="List"][class*="Container"]',
    ListItemReactLocator: '_react=[key][item]',
    ListFileReactLocator: '_react=[node]',
    NewItemBoardLocator: '[class*="BoardContainer"] >> [class*="Board"] >> nth=0',
    NewItemBodyIframeLocator: '.tox-edit-area__iframe',
    NewItemBodyLocator: '.mce-content-body',
    ModalWindowLocator: '[data-testid="modal"]',
    ExpandFoldersLocator: '[data-testid="ExpandMoreIcon"]',
    DropdownListLocator: '[data-testid="dropdown-popper-list"]',
    ChatInfoContainerLocator: '[class*="InfoPanelContainer"]',
    ChatMembersContainerLocator: '[class*="ParticipantsListWidget"]',
  };
}
