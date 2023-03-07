import {BasePage} from "../../../BasePage";

export class BaseApplicationPage extends BasePage {
  constructor(page) {
    super(page);
  };

  InheritedFields = {
    SideSecondaryBarLocator: '[data-testid="SideSecondaryBarContainer"]',
    WorkspaceContainerLocator: '[class*="BoardsRouterContainer"]',
    ListContainerLocator: '[class*="List"][orientation="column"]',
    ListItemLocator: '[class*="List"]:has([class^="Avatar"])',
    DropdownLocator: '[data-testid="dropdown-popper-list"]',
    DropdownItemReactLocator: '_react=[key]',
    NewItemBoardLocator: '[class*="BoardContainer"] >> [class*="Board"] >> nth=0',
    NewItemBodyIframeLocator: '.tox-edit-area__iframe',
    NewItemBodyLocator: '.mce-content-body',
    ModalWindowLocator: '[data-testid="modal"]',
    ExpandFoldersLocator: '[data-testid="ExpandMoreIcon"]',
    ChatInfoContainerLocator: '[class*="InfoPanelContainer"]',
    ChatMembersContainerLocator: '[class*="ParticipantsListWidget"]',
    NotificationLocator: '[data-testid="snackbar"]',
  };
}
