import { Page } from '@playwright/test';

export class BaseAPI {
    readonly page: Page;
    readonly soapServiceUrl = 'service/soap/';

    // Endpoints
    readonly searchRequest = 'SearchRequest';
    readonly convActionRequest = 'ConvActionRequest';
    readonly saveDraftRequest = 'SaveDraftRequest';
    readonly sendMsgRequest = 'SendMsgRequest';

    constructor(page : Page) {
        this.page = page;
      }

      async GetAccessCookies() {
        var storageState = JSON.parse(JSON.stringify(require('../../storageState.json')));
        var cookies = 'UI=iris; ' 
        + storageState.cookies[1].name + "=" + storageState.cookies[1].value + '; ' 
        + storageState.cookies[2].name + "=" + storageState.cookies[2].value + ';';
        return cookies;
    }
}