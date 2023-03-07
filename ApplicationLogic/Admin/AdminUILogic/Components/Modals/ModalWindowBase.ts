import {BaseAdminPage} from '../../Pages/BaseAdminPage';

export class ModalWindowBase extends BaseAdminPage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator(this.InheritedFields.ModalWindowLocator),
    DropdownContainer: this.page.locator(this.InheritedFields.DropdownContainerLocator),
  };
};
