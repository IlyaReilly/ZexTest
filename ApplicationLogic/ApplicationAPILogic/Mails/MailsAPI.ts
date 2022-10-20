import {BaseAPI} from '../BaseAPI';

export class MailsAPI extends BaseAPI {
  constructor(page) {
    super(page);
  };

  async MailSearchQuery(query: string, user: string) {
    let id = '';
    const response = await this.page.request.post(`${this.soapServiceUrl}${this.searchRequest}`, {
      data: {
        Body: {
          SearchRequest: {
            fullConversation: 1,
            limit: 100,
            query: query,
            offset: 0,
            sortBy: 'dateDesc',
            types: 'conversation',
            _jsns: 'urn:zimbraMail',
          },
        },
        Header: {
          context: {
            _jsns: 'urn:zimbra',
            notify: {seq: 10},
            session: {id: '1797', _content: '1797'},
            account: {by: 'name', _content: user},
            userAgent: {
              name: 'CarbonioWebClient - Chrome 103.0.0.0 (Windows)',
              version: '22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS',
            },
          },
        },
      },
    });

    const body = await this.GetResponseBody(response);
    if (body.Body.SearchResponse.c) {
      id = body.Body.SearchResponse.c[0].id;
    }
    return id;
  };

  async MoveMailToFolder(mailId, user, folderId) {
    await this.page.request.post(`${this.soapServiceUrl}${this.msgActionRequest}`, {
      data: {
        Body: {MsgActionRequest: {_jsns: 'urn:zimbraMail', action: {id: mailId, op: 'move', l: folderId}}},
        Header: {
          context: {
            _jsns: 'urn:zimbra',
            notify: {seq: 2},
            session: {id: '163', _content: '163'},
            account: {by: 'name', _content: user},
            userAgent: {
              name: 'CarbonioWebClient - Chrome 105.0.0.0 (Windows)',
              version: '22.7.2_ZEXTRAS_202207 agent 20220726-0959 FOSS',
            },
          },
        },
      },
    });
  };
}
