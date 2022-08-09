import {Page, request} from '@playwright/test';

// eslint-disable-next-line no-unused-vars
type ActionRequestTypes = {
    delete: 'delete';
  };

export async function ApiLoginMethod(login: string, password: string) {
  const playwrightProjectsData = JSON.parse(JSON.stringify(require('../../TestData/PlaywrightProjectsData.json')));
  const authTokens: string[] = [];
  const apiContext = await request.newContext({baseURL: playwrightProjectsData.baseURL.QA});
  const response = await apiContext.post('/zx/auth/v2/login', {
    data: {
      "auth_method": "password", "user": login, "password": password,
    },
  });
  const headersArray = await response.headersArray();
  const rx = /(ZX_AUTH_TOKEN|ZM_AUTH_TOKEN)=[^;]*/g;
  let token;
  headersArray.forEach((header) => {
    if (header.name == 'set-cookie') {
      token = header.value.match(rx)[0];
      authTokens.push(token.replace('ZX_AUTH_TOKEN=', '').replace('ZM_AUTH_TOKEN=', ''));
    }
  });
  return authTokens;
}

export class BaseAPI {
  readonly page: Page;
  readonly soapServiceUrl = 'service/soap/';
  readonly restServiceUrl = 'zx/team/v20/';

  // Endpoints
  readonly searchRequest = 'SearchRequest';
  readonly itemActionRequest = 'ItemActionRequest';
  // Mails
  readonly convActionRequest = 'ConvActionRequest';
  readonly saveDraftRequest = 'SaveDraftRequest';
  readonly sendMsgRequest = 'SendMsgRequest';
  // Calendar
  readonly createAppointmentRequest = 'CreateAppointmentRequest';
  readonly cancelAppointmentRequest = 'CancelAppointmentRequest';
  // Chats
  readonly getConversationsRequest = 'getConversations';
  readonly deleteConversationRequest = 'deleteConversation';

  readonly ActionRequestTypes = {
    delete: 'delete',
  };

  constructor(page : Page) {
    this.page = page;
  }

  async ItemActionRequest(action: string, id: string, user: string) {
    await this.page.request.post(`${this.soapServiceUrl}${this.itemActionRequest}`, {
      data: {
        "Body": {"ItemActionRequest": {"_jsns": "urn:zimbraMail", "action": {"op": action, "id": id}}}, "Header": {"context": {"_jsns": "urn:zimbra", "notify": {"seq": 42}, "session": {"id": "11151", "_content": "11151"}, "account": {"by": "name", "_content": user}, "userAgent": {"name": "CarbonioWebClient - Chrome 103.0.0.0 (Windows)", "version": "22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS"}}},
      },
    });
  }
}
