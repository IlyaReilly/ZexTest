import {BaseAPI} from '../BaseAPI';

export class CreateMailsAPI extends BaseAPI {
  constructor(page) {
    super(page);
  };

  MsgType = {
    Reply: 'r',
    Forward: 'w',
  };

  async SendMsgRequest(subject, mailBody, from, toArray, ccArray?, bccArray?, origId?, msgType?) {
    let id = '';
    const response = await this.FormingMsgRequest(this.sendMsgRequest, subject, mailBody, from, toArray, ccArray, bccArray, origId, msgType);
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

  async SaveDraftRequest(subject, draftBody, from, toArray, ccArray?, bccArray?) {
    let id = '';
    const response = await this.FormingMsgRequest(this.saveDraftRequest, subject, draftBody, from, toArray, ccArray, bccArray);
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

  async FormingMsgRequest(requestType, subject, body, from, toArray, ccArray = [], bccArray = [], origId?, msgType?) {
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
                ...toArray.map((to) => to = {t: 't', a: to}),
                ...ccArray.map((cc) => cc = {t: 'c', a: cc}),
                ...bccArray.map((bcc) => bcc = {t: 'b', a: bcc}),
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
              origid: origId,
              rt: msgType,
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
