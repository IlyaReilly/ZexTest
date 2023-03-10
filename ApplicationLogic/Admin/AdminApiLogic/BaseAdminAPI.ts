import {Page, request, expect} from '@playwright/test';
import {BaseTest} from '../../../TestsLogic/BaseTest';

export async function AdminApiLoginMethod(login: string, password: string) {
  const apiContext = await request.newContext({baseURL: BaseTest.baseAdminUrl});
  const response = await apiContext.post('/service/admin/soap/AuthRequest', {
    data: {"Body": {"AuthRequest": {"_jsns": "urn:zimbraAdmin", "csrfTokenSecured": "1", "persistAuthTokenCookie": "1", "account": {"by": "name", "_content": login}, "password": {"_content": password}}},
    },
  });
  expect(response.ok(), 'API login request doesn`t bring success response').toBeTruthy();
  const body = await JSON.parse((await response.body()).toString());

  return body.Body.AuthResponse.authToken[0]._content;
};

export class BaseAdminAPI {
  readonly page: Page;
  readonly baseAdminUrl = BaseTest.baseAdminUrl;
  readonly soapServiceUrl = '/service/admin/soap/';
  // endpoints
  readonly ModifyConfigRequest = 'ModifyConfigRequest';
  readonly ModifyDomainRequest = 'ModifyDomainRequest';

  readonly domainIds = {
    demoZextrasIo: '7e0b3eed-e632-467a-a940-179c4ef73de9',
  };

  constructor(page: Page) {
    this.page = page;
  };
};
