import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class Calendar extends BasePage {
    Containers = {
        MainContainer: this.page.locator('.cPoMlt'),
    };
    Elements = {
        Appointment: this.Containers.MainContainer.locator('.jNpaYv'),
    };
 
    constructor(page){
        super(page);
    }
}