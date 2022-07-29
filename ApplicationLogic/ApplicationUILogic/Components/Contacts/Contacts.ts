import { BasePage, InheritedFields  } from "../../Pages/BasePage";

export class Contacts extends BasePage {
    Containers = {
        MainContainer: this.page.locator('.cPoMlt'),
        // ContactsContainer: this.page.locator('.bXqaIg'),
        ContactsContainer: this.page.locator('.knclQe'),
    };



    constructor(page) {
        super(page);
    };   
}