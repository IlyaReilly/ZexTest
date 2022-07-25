import { expect, Request } from '@playwright/test';

export class BaseAPI {
    readonly accessToken;
    readonly request: Request;
    readonly pageLocator: string;

    constructor(request : Request, pageLocator: string = '') {
        this.request = request;
      }

      async GetAccessCookies() {
        var storageState = JSON.parse(JSON.stringify(require('../../storageState.json')));
        var cookies = 'UI=iris; ' 
        + storageState.cookies[1].name + "=" + storageState.cookies[1].value + '; ' 
        + storageState.cookies[2].name + "=" + storageState.cookies[2].value + ';';
        return cookies;
    }

    // async GetAccessToken() {
    //     if(!!accessToken){
    //         var Request = await this.page.request.newContext();
    //         accessToken = await this.page.post('zx/auth/v2/login', {
    //         data: {
    //                 body: '{"auth_method":"password","user":"test0@testautomation.local","password":"assext0"}',
    //             }
    //             });
    //     }
    //     return accessToken;
    // }
}