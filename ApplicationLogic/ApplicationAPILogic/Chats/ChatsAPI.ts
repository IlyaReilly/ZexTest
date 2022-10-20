import {BaseAPI} from '../BaseAPI';

export class ChatsAPI extends BaseAPI {
  constructor(page) {
    super(page);
  };

  async GetConversations() {
    let conversations = '';
    const response = await this.page.request.post(`${this.restServiceUrl}${this.getConversationsRequest}`, {
      data: {},
    });

    const body = await this.GetResponseBody(response);
    if (body.conversations) {
      conversations = body.conversations;
    }
    return conversations;
  };

  async GetUsers() {
    const response = await this.page.request.post(`${this.restServiceUrl}${this.getConversationsRequest}`, {
      data: {},
    });
    const body = await this.GetResponseBody(response);
    if (body.conversations[0]) {
      const arr = body.conversations[0].members;
      const arr2 = await Promise.all(arr.map(async (conversation) => {
        return conversation.user_id;
      }));
      return arr2;
    };
  };
}
