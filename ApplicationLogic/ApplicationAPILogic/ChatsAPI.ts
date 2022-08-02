import {BaseAPI} from './BaseAPI';

export class ChatsAPI extends BaseAPI {
  constructor(page) {
    super(page);
  }

  async GetConversations() {
    let conversations = '';
    const response = await this.page.request.post(`${this.apiServiceUrl}${this.getConversationsRequest}`, {
      data: {},
    });
    const body = JSON.parse((await response.body()).toString());
    if (body.conversations) {
      conversations = body.conversations;
    }
    return conversations;
  }

  async DeleteConversation(id) {
    await this.page.request.post(`${this.apiServiceUrl}${this.deleteConversationRequest}`, {
      data: {"conversation_id": id},
    });
  }
}
