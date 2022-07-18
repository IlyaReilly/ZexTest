import {BasePage} from '../Pages/BasePage';

export class MainMenu extends BasePage {
    Buttons = {
        Menu: this.page.locator(':nth-match(:text("Menu"), 1)'),
    };

    MenuSections = {
        CheckableChapter: this.page.locator('"Checkable"'),
        MyCheckableResults: this.page.locator(':nth-match(:text("My Checkable results"), 1)'),
        WhatIsCheckable: this.page.locator('"What is Checkable?"'),
        DigitalActionPlan: this.page.locator('"Digital Action Plan"'),
        Logout: this.page.locator('"Logout"'),
    };

    constructor(page){
        super(page);
    }
    
    async OpenMenuSection(section){
        await this.Buttons.Menu.click();
        if(section == this.MenuSections.MyCheckableResults 
            || section == this.MenuSections.WhatIsCheckable
            || section == this.MenuSections.DigitalActionPlan)
        {
            await this.MenuSections.CheckableChapter.click();
        }
        await section.click();
    }
}