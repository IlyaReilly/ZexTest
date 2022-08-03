import {Page} from '@playwright/test';

// eslint-disable-next-line no-unused-vars
type ActionRequestTypes = {
    delete: 'delete';
  };

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
