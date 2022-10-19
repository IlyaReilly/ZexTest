import {BaseAPI} from '../BaseAPI';

export class CreateMailsAPI extends BaseAPI {
  constructor(page) {
    super(page);
  };

  async SendMsgRequest(subject, from, to, mailBody) {
    let id = '';
    const response = await this.page.request.post(`${this.soapServiceUrl}${this.sendMsgRequest}`, {
      data: this.FormingMsgRequestBody(this.sendMsgRequest, subject, from, to, mailBody),
    });

    const body = await this.GetResponseBody(response);
    if (body.Body.SendMsgResponse.m) {
      id = body.Body.SendMsgResponse.m[0].id;
    }
    return id;
  };

  async SaveDraftRequest(subject, from, to, body) {
    await this.page.request.post(`${this.soapServiceUrl}${this.saveDraftRequest}`, {
      data: this.FormingMsgRequestBody(this.saveDraftRequest, subject, from, to, body),
    });
  };

  FormingMsgRequestBody(requestType, subject, from, to, body) {
    return {
      Body: {
        [requestType]: {
          _jsns: 'urn:zimbraMail',
          m: {
            attach: {mp: []},
            su: {_content: subject},
            e: [
              {t: 'f', a: from, d: ''},
              {t: 't', a: to},
            ],
            mp: [
              {
                ct: 'multipart/alternative',
                mp: [
                  {ct: 'text/html', body: true, content: {_content: `<p>${body}</p>`}},
                  {ct: 'text/plain', content: {_content: body}},
                ],
              },
            ],
          },
        },
      },
      Header: {
        context: {
          _jsns: 'urn:zimbra',
          notify: {seq: 5},
          session: {id: '11056', _content: '11056'},
          account: {by: 'name', _content: from},
          userAgent: {
            name: 'CarbonioWebClient - Chrome 103.0.0.0 (Windows)',
            version: '22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS',
          },
        },
      },
    };
  };
}
