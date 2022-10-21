import {BaseAPI} from '../BaseAPI';

export class CreateContactsAPI extends BaseAPI {
  constructor(page) {
    super(page);
  };

  async CreateContact(userFirstName: string, userMail: string) {
    let contactsId = '';
    const response = await this.page.request.post(`${this.soapServiceUrl}${this.createContactRequest}`, {
      data: {
        "Body": {"CreateContactRequest": {"_jsns": "urn:zimbraMail", "cn": {"m": [], "l": "7", "a": [{"n": "nameSuffix", "_content": ""}, {"n": "namePrefix", "_content": ""}, {"n": "firstName", "_content": userFirstName}, {"n": "lastName", "_content": ""}, {"n": "middleName", "_content": ""}, {"n": "image", "_content": ""}, {"n": "jobTitle", "_content": ""}, {"n": "department", "_content": ""}, {"n": "company", "_content": ""}, {"n": "notes", "_content": ""}, {"n": "email", "_content": userMail}]}}}, "Header": {"context": {"_jsns": "urn:zimbra", "notify": {"seq": 3}, "session": {"id": "1662", "_content": "1662"}, "account": {"by": "name", "_content": userMail}, "userAgent": {"name": "CarbonioWebClient - Chrome 103.0.0.0 (Windows)", "version": "22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS"}}},
      },
    });
    const body = await this.GetResponseBody(response);

    if (body.Body.CreateContactResponse.cn) {
      contactsId = body.Body.CreateContactResponse.cn[0].id;
    }
    return contactsId;
  };
}
