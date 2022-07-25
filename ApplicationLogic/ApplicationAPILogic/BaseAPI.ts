import { expect, Request } from '@playwright/test';

export class BaseAPI {
    readonly accessToken;
    readonly request: Request;
    readonly pageLocator: string;

    constructor(request : Request) {
        this.request = request;
      }

      async GetAccessCookies() {
        var storageState = JSON.parse(JSON.stringify(require('../../storageState.json')));
        var cookies = 'UI=iris; ' 
        + storageState.cookies[1].name + "=" + storageState.cookies[1].value + '; ' 
        + storageState.cookies[2].name + "=" + storageState.cookies[2].value + ';';
        return cookies;
    }

    async SetAccessCookies() {
        this.request.headers()
    }
}