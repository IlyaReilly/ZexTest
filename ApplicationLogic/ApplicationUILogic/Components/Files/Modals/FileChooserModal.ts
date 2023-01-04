import {InheritedFields} from '../../../Pages/BasePage';
import {ModalWindowBase} from '../../ModalWindows/ModalWindowBase';


export class FileChooserModal extends ModalWindowBase {
  constructor(page) {
    super(page);
  };

  Folders = {
    Home: this.Containers.MainContainer.locator('"Home"'),
  };

  Elements = {
    File: this.Containers.MainContainer.locator(InheritedFields.ListFileReactLocator),
  };

  Buttons = {
    Select: this.Containers.MainContainer.locator('"Select"'),
  };
};
