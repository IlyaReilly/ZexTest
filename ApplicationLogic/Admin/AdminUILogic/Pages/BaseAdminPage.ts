import {BasePage} from "../../../BasePage";

export class BaseAdminPage extends BasePage {
  constructor(page) {
    super(page);
  };

  InheritedFields = {
    DropdownContainerLocator: '[data-testid="dropdown-popper-list"]',
    DetailViewContainerLocator: '[class*="DetailViewContainer"]',
    ResetButton: '"RESET"',
    ModalWindowLocator: '[data-testid="modal"]',
    NotificationLocator: '[data-testid="snackbar"]',
  };

  async WaitForNotificationHiding() {
    await this.page.locator(this.InheritedFields.NotificationLocator).waitFor();
    const elementHandle = await this.page.$(this.InheritedFields.NotificationLocator);
    await elementHandle?.waitForElementState('hidden');
  };
};
