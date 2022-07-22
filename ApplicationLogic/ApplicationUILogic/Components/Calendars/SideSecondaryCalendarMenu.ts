import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class SideSecondaryCalendarMenu extends BasePage {
    Containers = {
        MainContainer: this.page.locator(InheritedFields.SideSecondaryDefaultBarLocator),
    };

    Tabs = {
        AllCalendars: this.Containers.MainContainer.locator('"All calendars"'),
        Calendar: this.Containers.MainContainer.locator('"Calendar"'),
        Trash: this.Containers.MainContainer.locator('"Trash"'),
        Tags: this.Containers.MainContainer.locator('"Tags"'),
        SharedCalendars: this.Containers.MainContainer.locator('"Shared Calendars"'),
    };

    constructor(page){
        super(page);
    }

    async OpenAllCalendars(){
        await this.Tabs.AllCalendars.click();
    }

    async OpenCalendar(){
        await this.Tabs.Calendar.click();
    }

    async OpenTrash(){
        await this.Tabs.Trash.click();
    }

    async OpenTags(){
        await this.Tabs.Tags.click();
    }

    async OpenSharedCalendars(){
        await this.Tabs.SharedCalendars.click();
    }
}