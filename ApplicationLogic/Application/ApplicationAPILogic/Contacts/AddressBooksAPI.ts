import {BaseAPI} from "../BaseAPI";

export class AddressBookAPI extends BaseAPI {
  constructor(page) {
    super(page);
  };

  async CreateAddressBook(folderName: string, userMail: string) {
    let folderId = "";
    const response = await this.page.request.post(
      `${this.soapServiceUrl}${this.createFolderRequest}`,
      {
        data: {
          Body: {
            CreateFolderRequest: {
              _jsns: "urn:zimbraMail",
              folder: {view: "contact", l: "7", name: folderName},
            },
          },
          Header: {
            context: {
              _jsns: "urn:zimbra",
              notify: {seq: 1},
              session: {id: "124", _content: "124"},
              account: {by: "name", _content: userMail},
              userAgent: {
                name: "CarbonioWebClient - Chrome 104.0.0.0 (Windows)",
                version: "22.7.2_ZEXTRAS_202207 agent 20220726-0959 FOSS",
              },
            },
          },
        },
      },
    );
    const body = await this.GetResponseBody(response);

    if (body.Body.CreateFolderResponse.folder) {
      folderId = body.Body.CreateFolderResponse.folder[0].id;
    }
    return folderId;
  };

  async GetAddressBookIdByName(user: string, addressBookName: string) {
    const addressBooksList = await super.GetFolders(user, 'contact');
    let addressBookId;
    const addressBook = function findAddressBook(addressBooksList) {
      addressBooksList.forEach((addressBookElement) => {
        if (addressBookElement.name == addressBookName) {
          addressBookId = addressBookElement.id;
        }
        if (!addressBookId && addressBookElement.folder) {
          findAddressBook(addressBookElement.folder);
        }
        if (!addressBookId && !addressBookElement.folder) {
          addressBookId = null;
        }
      });
      return addressBookId;
    };
    return addressBook(addressBooksList);
  };

  async DeleteAddressBookById(id, user) {
    await this.page.request.post(`${this.soapServiceUrl}${this.folderActionRequest}`, {
      data: {
        Body: {
          FolderActionRequest: {
            action: {id: id, op: "move", l: "3"},
            _jsns: "urn:zimbraMail",
          },
        },
        Header: {
          context: {
            _jsns: "urn:zimbra",
            notify: {seq: 2},
            session: {id: "13024", _content: "13024"},
            account: {by: "name", _content: user},
            userAgent: {
              name: "CarbonioWebClient - Chrome 104.0.0.0 (Windows)",
              version: "22.7.2_ZEXTRAS_202207 agent 20220726-0959 FOSS",
            },
          },
        },
      },
    });
  };

  async DeleteAddressBookPermanentlyById(id, user) {
    await this.page.request.post(`${this.soapServiceUrl}${this.folderActionRequest}`, {
      data: {
        Body: {
          FolderActionRequest: {
            action: {id: id, op: "delete", l: "3"},
            _jsns: "urn:zimbraMail",
          },
        },
        Header: {
          context: {
            _jsns: "urn:zimbra",
            session: {id: "119", _content: "119"},
            account: {by: "name", _content: user},
            userAgent: {
              name: "CarbonioWebClient - Chrome 104.0.0.0 (Windows)",
              version: "22.7.2_ZEXTRAS_202207 agent 20220726-0959 FOSS",
            },
          },
        },
      },
    });
  }
};