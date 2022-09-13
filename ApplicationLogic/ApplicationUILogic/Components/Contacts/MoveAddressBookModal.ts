import {ModalWindowBase} from '../ModalWindows/ModalWindowBase';

export class MoveAddressBookModal extends ModalWindowBase {
    constructor(page){
        super(page);
    }

    Buttons = {
        Create: this.Containers.MainContainer.locator('"MOVE"'),
    };

    TextBoxes = {
        FilterAddressBook: this.Containers.MainContainer.locator('[placeholder="Filter address book"]'),
    };
    
    DropDowns = {
        Root: this.Containers.MainContainer.locator('"Root"'),
        Contacts: this.Containers.MainContainer.locator('"Contacts"'),
        EmailedContacts: this.Containers.MainContainer.locator('"Emailed Contacts"'),
        Trash: this.Containers.MainContainer.locator('"Trash"'),
    }
}