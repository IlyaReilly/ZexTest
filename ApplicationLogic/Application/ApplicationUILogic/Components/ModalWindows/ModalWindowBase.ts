import {BaseApplicationPage} from '../../Pages/BaseApplicationPage';

export class ModalWindowBase extends BaseApplicationPage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator(this.InheritedFields.ModalWindowLocator),
    DropdownContainer: this.page.locator(this.InheritedFields.DropdownLocator),
  };
};
