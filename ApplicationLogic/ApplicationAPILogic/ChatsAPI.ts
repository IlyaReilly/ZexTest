import {BaseAPI} from './BaseAPI';

export class ChatsAPI extends BaseAPI {
  constructor(page) {
    super(page);
  }

  async GetConversations() {
    let conversations = '';
    const response = await this.page.request.post(`${this.restServiceUrl}${this.getConversationsRequest}`, {
      data: {},
    });
    const body = JSON.parse((await response.body()).toString());
    if (body.conversations) {
      conversations = body.conversations;
    }
    return conversations;
  }

  async DeleteConversation(id) {
    await this.page.request.post(`${this.restServiceUrl}${this.deleteConversationRequest}`, {
      data: {"conversation_id": id},
    });
  }

  async CreateConversations(title, topic, userId) {
    const response = await this.page.request.post(`${this.restServiceUrl}${this.createSpaceRequest}`, {
      data: {"name": title, "invited_user_ids": [userId], "topic": topic},
    });
    const body = JSON.parse((await response.body()).toString());
    return body.id;
  }
}
