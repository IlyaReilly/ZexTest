import {BasePage} from '../../Pages/BasePage';

export class SearchResultsList extends BasePage {
  constructor(page) {
    super(page);
  };

  Containers = {
    MainContainerMail: this.page.locator('.ereURg'),
    MainContainerContacts: this.page.locator('.dLDkZK'),
    MainContainerFiles: this.page.locator('.gcSrJU'),
    MainContainerAppointments: this.page.locator('.ereURg'),
  };

  Elements = {
    SearchResultMail: this.Containers.MainContainerMail.locator('.fbCbGB'),
    SearchResultContacts: this.Containers.MainContainerContacts.locator('.vEXXw'),
    SearchResultFiles: this.Containers.MainContainerFiles.locator('.cNpbyA'),
    SearchResultAppointments: this.Containers.MainContainerAppointments.locator('.hPLMBr'),
    AdvancedFilters: this.Containers.MainContainerMail.locator('"Advanced Filters"'),
  };
}
