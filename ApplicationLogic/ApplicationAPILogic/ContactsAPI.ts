import {BaseAPI} from './BaseAPI';

export class ContactsAPI extends BaseAPI {
  constructor(page) {
    super(page);
  }

  async ContactsSearchQuery(query: string, user: string) {
    let id = '';
    const response = await this.page.request.post(`${this.soapServiceUrl}${this.searchRequest}`, {
      data: {
        "Body": {"SearchRequest": {"limit": 100, "query": query, "offset": 0, "sortBy": "nameAsc", "types": "contact", "_jsns": "urn:zimbraMail"}}, "Header": {"context": {"_jsns": "urn:zimbra", "session": {"id": "1198", "_content": "1198"}, "account": {"by": "name", "_content": user}, "userAgent": {"name": "CarbonioWebClient - Chrome 103.0.0.0 (Windows)", "version": "22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS"}}},
      },
    });
    const body = JSON.parse((await response.body()).toString());
    if (body.Body.SearchResponse.cn) {
      id = body.Body.SearchResponse.cn[0].id;
    }
    return id;
  }

  async CreateContact(userFirstName: string, userMail: string) {
    let contactsId = '';
    const response = await this.page.request.post(`${this.soapServiceUrl}${this.createContactRequest}`, {
      data: {
        "Body": {"CreateContactRequest": {"_jsns": "urn:zimbraMail", "cn": {"m": [], "l": "7", "a": [{"n": "nameSuffix", "_content": ""}, {"n": "namePrefix", "_content": ""}, {"n": "firstName", "_content": userFirstName}, {"n": "lastName", "_content": ""}, {"n": "middleName", "_content": ""}, {"n": "image", "_content": ""}, {"n": "jobTitle", "_content": ""}, {"n": "department", "_content": ""}, {"n": "company", "_content": ""}, {"n": "notes", "_content": ""}, {"n": "email", "_content": userMail}]}}}, "Header": {"context": {"_jsns": "urn:zimbra", "notify": {"seq": 3}, "session": {"id": "1662", "_content": "1662"}, "account": {"by": "name", "_content": userMail}, "userAgent": {"name": "CarbonioWebClient - Chrome 103.0.0.0 (Windows)", "version": "22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS"}}},
      },
    });
    const body = JSON.parse((await response.body()).toString());

    if (body.Body.CreateContactResponse.cn) {
      contactsId = body.Body.CreateContactResponse.cn[0].id;
    }
    return contactsId;
  }

  async GetContacts(user) {
    let contacts = '';
    const response = await this.page.request.post(`${this.soapServiceUrl}${this.searchRequest}`, {
      data: {
        Body: {
          SearchRequest: {
            _jsns: 'urn:zimbraMail',
            limit: '500',
            offset: 0,
            sortBy: 'nameAsc',
            types: 'contact',
            query: {_content: 'inid:"7"'},
          },
        },
        Header: {
          context: {
            _jsns: 'urn:zimbra',
            notify: {seq: 1},
            session: {id: '1292', _content: '1292'},
            account: {by: 'name', _content: user},
            userAgent: {
              name: 'CarbonioWebClient - Chrome 104.0.0.0 (Windows)',
              version: '22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS',
            },
          },
        },
      },
    });
    const body = JSON.parse((await response.body()).toString());

    if (body.Body.SearchResponse.cn) {
      contacts = body.Body.SearchResponse.cn;
    }
    return contacts;
  }

  async GetEmailedContacts(user) {
    let emailedContacts = '';
    const response = await this.page.request.post(`${this.soapServiceUrl}${this.searchRequest}`, {
      data: {
        Body: {
          SearchRequest: {
            _jsns: 'urn:zimbraMail',
            limit: '500',
            offset: 0,
            sortBy: 'nameAsc',
            types: 'contact',
            query: {_content: 'inid:"13"'},
          },
        },
        Header: {
          context: {
            _jsns: 'urn:zimbra',
            notify: {seq: 1},
            session: {id: '1250', _content: '1250'},
            account: {by: 'name', _content: user},
            userAgent: {
              name: 'CarbonioWebClient - Chrome 104.0.0.0 (Windows)',
              version: '22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS',
            },
          },
        },
      },
    });
    const body = JSON.parse((await response.body()).toString());
    if (body.Body.SearchResponse.cn) {
      emailedContacts = body.Body.SearchResponse.cn;
    }
    return emailedContacts;
  }

  async GetTrashContacts(user) {
    let trashContacts = '';
    const response = await this.page.request.post(`${this.soapServiceUrl}${this.searchRequest}`, {
      data: {
        Body: {
          SearchRequest: {
            _jsns: 'urn:zimbraMail',
            limit: '500',
            offset: 0,
            sortBy: 'nameAsc',
            types: 'contact',
            query: {_content: 'inid:"3"'},
          },
        },
        Header: {
          context: {
            _jsns: 'urn:zimbra',
            session: {id: '1277', _content: '1277'},
            account: {by: 'name', _content: user},
            userAgent: {
              name: 'CarbonioWebClient - Chrome 104.0.0.0 (Windows)',
              version: '22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS',
            },
          },
        },
      },
    });
    const body = JSON.parse((await response.body()).toString());
    if (body.Body.SearchResponse.cn) {
      trashContacts = body.Body.SearchResponse.cn;
    }
    return trashContacts;
  }

  async DeleteContactsById(id, user) {
    await this.page.request.post(`${this.soapServiceUrl}${this.contactActionRequest}`, {
      data: {
        Body: {ContactActionRequest: {_jsns: 'urn:zimbraMail', action: {id: id, op: 'move', l: '3'}}},
        Header: {
          context: {
            _jsns: 'urn:zimbra',
            session: {id: '1266', _content: '1266'},
            account: {by: 'name', _content: user},
            userAgent: {
              name: 'CarbonioWebClient - Chrome 104.0.0.0 (Windows)',
              version: '22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS',
            },
          },
        },
      },
    });
  }

  async DeleteContactsPermanentlyById(id, user) {
    await this.page.request.post(`${this.soapServiceUrl}${this.contactActionRequest}`, {
      data: {
        Body: {ContactActionRequest: {_jsns: 'urn:zimbraMail', action: {id: id, op: 'delete'}}},
        Header: {
          context: {
            _jsns: 'urn:zimbra',
            session: {id: '1288', _content: '1288'},
            account: {by: 'name', _content: user},
            userAgent: {
              name: 'CarbonioWebClient - Chrome 104.0.0.0 (Windows)',
              version: '22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS',
            },
          },
        },
      },
    });
  }

  async GetAddressBookFolders(user: string) {
    const response = await this.page.request.post(`${this.soapServiceUrl}${this.getFolderRequest}`, {
      headers: {['content-type']: 'application/soap+xml'},
      data: `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
        <soap:Header><context xmlns="urn:zimbra"><account by="name">${user}</account><format type="js"/></context></soap:Header>
        <soap:Body><BatchRequest xmlns="urn:zimbra" onerror="stop"><GetFolderRequest xmlns="urn:zimbraMail" visible="1"></GetFolderRequest></BatchRequest></soap:Body>
        </soap:Envelope>`,
    });

    const body = JSON.parse((await response.body()).toString());
    return body.Body.BatchResponse.GetFolderResponse[0].folder[0].folder;
  }

  

  async GetAddressBookFolderIdByName(user: string, folderName: string) {// CHECK LATER!!!
    const foldersList = await this.GetAddressBookFolders(user);
    let folder = foldersList.find((x) => x.name == folderName);
    if(!folder){
      await foldersList.forEach(async element => {
        if(element.folder){
          let tempFolder = await element.folder.find((x) => x.name == folderName);
          if(tempFolder) {folder = tempFolder;};
        }
      });
    }
    return folder.id;
  }

  async DeleteAddressBookFolderRequest(id: string, user: string) {
    await this.page.request.post(`${this.soapServiceUrl}${this.searchRequest}`, {
      data: {
        "Body": {"FolderActionRequest": {"action": {"id": id, "op": "delete", "f": ""}, "_jsns": "urn:zimbraMail"}}, 
        "Header": {"context": {"_jsns": "urn:zimbra", "session": {"id": "13415", "_content": "13415"}, "account": {"by": "name", "_content": user}, "userAgent": {"name": "CarbonioWebClient - Chrome 104.0.0.0 (Windows)", "version": "22.7.2_ZEXTRAS_202207 agent 20220726-0959 FOSS"}}},
      },
    });
  }
}
