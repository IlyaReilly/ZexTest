import {BaseAdminPage} from '../../Pages/BaseAdminPage';

export class ModalWindowBase extends BaseAdminPage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator(this.InheritedFields.ModalWindowLocator),
    DropDownContainer: this.page.locator(this.InheritedFields.DropdownContainerLocator),
  };
};
