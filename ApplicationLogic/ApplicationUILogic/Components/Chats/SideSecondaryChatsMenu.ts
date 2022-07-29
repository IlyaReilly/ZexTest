import {BasePage, InheritedFields} from '../../Pages/BasePage';

export class SideSecondaryChatsMenu extends BasePage {
    Containers = {
        MainContainer: this.page.locator('.cpSZnV'),
    };

    Buttons = {
        CreateVirtualRoom: this.Containers.MainContainer.locator('"CREATE VIRTUAL ROOM"'),
        PersonalVirtualRoom: this.Containers.MainContainer.locator('"PERSONAL VIRTUAL ROOM"'),
        CopyLink: this.Containers.MainContainer.locator('"COPY LINK"'),
    };

    Tabs = {
        Chats: this.Containers.MainContainer.locator('"Chats"'),
        Spaces: this.Containers.MainContainer.locator('"Spaces"'),
        VirtualRooms: this.Containers.MainContainer.locator('"Virtual Rooms"'),
    }

    Textboxes = {
        FilterChatsList: this.Containers.MainContainer.locator('[name="Filter chats list"]')
    }

    constructor(page){
        super(page);
    }
}