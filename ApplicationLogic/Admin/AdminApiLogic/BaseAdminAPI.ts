import {Page, request, expect} from '@playwright/test';
import {BaseTest} from '../../../TestsLogic/BaseTest';

export async function AdminApiLoginMethod(login: string, password: string) {
  const baseUrl = BaseTest.baseAdminUrl;
  const apiContext = await request.newContext({baseURL: baseUrl});
  const response = await apiContext.post('/service/admin/soap/AuthRequest', {
    data: {"Body": {"AuthRequest": {"_jsns": "urn:zimbraAdmin", "csrfTokenSecured": "1", "persistAuthTokenCookie": "1", "account": {"by": "name", "_content": login}, "password": {"_content": password}}},
    },
  });
  await expect(response.ok(), 'API login request doesn`t bring success response').toBeTruthy();
  const body = await JSON.parse((await response.body()).toString());

  return body.Body.AuthResponse.authToken[0]._content;
};

export class BaseAdminAPI {
  readonly page: Page;
  readonly soapServiceUrl = 'service/soap/';

  constructor(page : Page) {
    this.page = page;
  };
}
