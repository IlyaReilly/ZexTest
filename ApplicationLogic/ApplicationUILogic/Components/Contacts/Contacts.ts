import { BasePage, InheritedFields  } from "../../Pages/BasePage";

export class Contacts extends BasePage {
    Containers = {
        Main: this.page.locator('.cPoMlt'),
        Contacts: this.page.locator('.bXqaIg'),
    };

    constructor(page) {
        super(page);
    };   
}