import { BaseAPI } from './BaseAPI'; 

export class MailsAPI extends BaseAPI {

    constructor(page){
        super(page);
    }

    async MailSearchQuery(query: string, user: string) {
        var id = '';
        var response = await this.page.request.post(`${this.soapServiceUrl}${this.searchRequest}`, {
            data: {
              Body:{"SearchRequest":{"fullConversation":1,"limit":100,
              "query":query,"offset":0,"sortBy":"dateDesc","types":"conversation",
              "_jsns":"urn:zimbraMail"}},
              "Header":{"context":{"_jsns":"urn:zimbra","notify":{"seq":10},
              "session":{"id":"1797","_content":"1797"},
              "account":{"by":"name","_content":user},
              "userAgent":{"name":"CarbonioWebClient - Chrome 103.0.0.0 (Windows)",
              "version":"22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS"}}}
            }
          })
          var body = JSON.parse((await response.body()).toString());
        if(body.Body.SearchResponse.c){
          id = body.Body.SearchResponse.c[0].id;
        }
          return id;
    }

    async MoveToTrashById(id: string) {
        await this.page.request.post(`${this.soapServiceUrl}${this.convActionRequest}`, {
            data: {
              Body:{"ConvActionRequest":{"_jsns":"urn:zimbraMail",
              "action":{"id":id,"op":"trash"}}},
              "Header":{"context":{"_jsns":"urn:zimbra","notify":{"seq":4},
              "session":{"id":"1971","_content":"1971"},
              "account":{"by":"name","_content":"test0@testautomation.local"},
              "userAgent":{"name":"CarbonioWebClient - Chrome 103.0.0.0 (Windows)",
              "version":"22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS"}}}
            }
          })
    }

    async SendMsgRequest(subject, from, to, body) {
        await this.page.request.post(`${this.soapServiceUrl}${this.sendMsgRequest}`, {
                data:  this.FormingMsgRequestBody(this.sendMsgRequest, subject, from, to, body),
          })
    }

    async SaveDraftRequest(subject, from, to, body) {
        await this.page.request.post(`${this.soapServiceUrl}${this.saveDraftRequest}`, {
                data:  this.FormingMsgRequestBody(this.saveDraftRequest, subject, from, to, body),
          })
    }

    FormingMsgRequestBody(requestType, subject, from, to, body){
        return {
              Body:{[requestType]:{"_jsns":"urn:zimbraMail","m":
              {"attach":{"mp":[]},"su":{"_content":subject},
              "e":[{"t":"f","a":from,"d":""},
              {"t":"t","a":to}],
              "mp":[{"ct":"multipart/alternative",
              "mp":[{"ct":"text/html","body":true,
              "content":{"_content":`<p>${body}</p>`}},
              {"ct":"text/plain","content":{"_content":body}}]}]}}},
              "Header":{"context":{"_jsns":"urn:zimbra","notify":{"seq":5},
              "session":{"id":"11056","_content":"11056"},
              "account":{"by":"name","_content":from},
              "userAgent":{"name":"CarbonioWebClient - Chrome 103.0.0.0 (Windows)",
              "version":"22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS"}}}
            }
    }

}