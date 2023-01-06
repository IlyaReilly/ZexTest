import {BasePage} from '../../../../BasePage';
import {InheritedFields} from '../../Pages/BaseApplicationPage';

export class ModalWindowBase extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainer: this.page.locator(InheritedFields.ModalWindowLocator),
    DropDownContainer: this.page.locator(InheritedFields.DropdownListLocator),
  };
}
