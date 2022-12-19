import {BaseAPI} from '../BaseAPI';

export class CreateMailsAPI extends BaseAPI {
  constructor(page) {
    super(page);
  };

  async SendMsgRequest(subject, from, to, mailBody, toType?) {
    let id = '';
    const response = await this.FormingMsgRequest(this.sendMsgRequest, subject, from, to, mailBody, toType);
    const body = await this.GetResponseBody(response);
    if (body.Body.SendMsgResponse.m) {
      id = body.Body.SendMsgResponse.m[0].id;
    }
    return id;
  };

  async SendMsgRequestWithFile(subject, from, to, msgBody, fileId) {
    let id = '';
    const response = await this.page.request.post(`${this.soapServiceUrl}${this.sendMsgRequest}`, {
      data: this.FormingMsgRequestBodyWithFile(subject, from, to, msgBody, fileId),
    });

    const body = await this.GetResponseBody(response);
    if (body.Body.SendMsgResponse.m) {
      id = body.Body.SendMsgResponse.m[0].id;
    }
    return id;
  };

  async SaveDraftRequest(subject, from, to, draftBody) {
    let id = '';
    const response = await this.FormingMsgRequest(this.saveDraftRequest, subject, from, to, draftBody);
    const body = await this.GetResponseBody(response);
    if (body.Body.SaveDraftResponse.m) {
      id = body.Body.SaveDraftResponse.m[0].id;
    }
    return id;
  };

  async SaveDraftWithFileRequest(subject, from, to, draftBody, fileId) {
    let id = '';
    const response = await this.page.request.post(`${this.soapServiceUrl}${this.saveDraftRequest}`, {
      data: this.FormingMsgRequestBodyWithFileForDraft(this.saveDraftRequest, subject, from, to, draftBody, fileId),
    });
    const body = await this.GetResponseBody(response);
    if (body.Body.SaveDraftResponse.m) {
      id = body.Body.SaveDraftResponse.m[0].id;
    }
    return id;
  };

  async FormingMsgRequest(requestType, subject, from, to, body, toType = 't') {
    const request = await this.page.request.post(`${this.soapServiceUrl}${requestType}`, {
      data: {
        Body: {
          [requestType]: {
            _jsns: 'urn:zimbraMail',
            m: {
              attach: {mp: []},
              su: {_content: subject},
              e: [
                {t: 'f', a: from, d: ''},
                {t: 't', a: to[0], d: ''},
                ...to.slice(1).map((to) => to = {t: toType, a: to}),
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
      },
    });
    return request;
  };

  FormingMsgRequestBodyWithFileForDraft(requestType, subject, from, to, body, filedId) {
    return {
      Body: {
        [requestType]: {
          _jsns: 'urn:zimbraMail',
          m: {
            attach: {"mp": [], "aid": filedId},
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
          session: {id: '11400', _content: '11400'},
          account: {by: 'name', _content: from},
          userAgent: {
            name: 'CarbonioWebClient - Chrome 103.0.0.0 (Windows)',
            version: '22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS',
          },
        },
      },
    };
  };

  FormingMsgRequestBodyWithFile(subject, from, to, body, fileId) {
    return {
      Body: {
        "SendMsgRequest": {
          _jsns: 'urn:zimbraMail',
          m: {
            attach: {mp: [{"part": "2", "mid": fileId}]},
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
          notify: {seq: 6},
          session: {id: '11463', _content: '11463'},
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
