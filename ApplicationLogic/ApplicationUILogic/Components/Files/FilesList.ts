import {BasePage} from '../../Pages/BasePage';

export class FilesList extends BasePage {
  constructor(page) {
    super(page);
  
  }

  Containers = {
    MainContainer: this.page.locator('.fUgMxt'),
    ListContainer: this.page.locator('.bbLqaW'),
    
  };
 
  Elements = {
    File: this.Containers.ListContainer.locator('.lnXHNY'),
    Header: this.Containers.MainContainer.locator('.debCVK'),
    FileName: this.Containers.ListContainer.locator('.hiooLB'),
    FlagIcon: this.Containers.ListContainer.locator('[data-testid*="Flag"]'),
    
  };

  async OpenFileDetails(unicFileName) {
    await this.page.locator('div.lnXHNY', {hasText: `${unicFileName}`}).click();
  };
  
  async OpenNeededUrl(urlName) { 
    const playwrightProjectsData = JSON.parse(JSON.stringify(require('../../../../TestData/PlaywrightProjectsData.json')));
    const urls = [
      {name: 'trashElements', url: playwrightProjectsData.urlParts.trashElements,},
      {name: 'filtersFlagged', url: playwrightProjectsData.urlParts.filtersFlagged},
      {name: 'trashSharedElements', url: playwrightProjectsData.urlParts.trashSharedElements},
      {name: 'filtersSharedByMe', url: playwrightProjectsData.urlParts.filtersSharedByMe},
      {name: 'uploads', url: playwrightProjectsData.urlParts.uploads},
      {name: 'sharedWithMe', url: playwrightProjectsData.urlParts.sharedWithMe},
      {name: 'home', url: playwrightProjectsData.urlParts.home}
      ]
    const neededUrl = urls.find(i => i.name === urlName)
    await this.page.goto(`${neededUrl?.url}`)
  }
}
