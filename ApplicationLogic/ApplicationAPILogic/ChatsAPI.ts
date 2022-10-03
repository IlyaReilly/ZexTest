import {BaseAPI} from './BaseAPI';

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

  async DeleteConversation(id) {
    await this.page.request.post(`${this.restServiceUrl}${this.deleteConversationRequest}`, {
      data: {"conversation_id": id},
    });
  };

  async DeleteGroup(id) {
    await this.page.request.post(`${this.restServiceUrl}${this.leaveConversationRequest}`, {
      data: {"conversation_id": id},
    });
  };

  async CreateConversations(title, topic, userId) {
    const response = await this.page.request.post(`${this.restServiceUrl}${this.createSpaceRequest}`, {
      data: {"name": title, "invited_user_ids": [userId], "topic": topic},
    });

    const body = await this.GetResponseBody(response);
    return body.id;
  };

  async KickOffUser(id, membersId) {
    await this.page.request.post(`${this.restServiceUrl}${this.kickFromConversationRequest}`, {
      data: {"conversation_id": id, "kicked_user_ids": membersId},
    });
  };

  async CreateGroup(topic, userId) {
    const response = await this.page.request.post(`${this.restServiceUrl}${this.createGroupRequest}`, {
      data: {"invited_user_ids": userId, "topic": topic},
    });
    const body = await this.GetResponseBody(response);
    return body;
  };

  async GetUsers() {
    const response = await this.page.request.post(`${this.restServiceUrl}${this.getConversationsRequest}`, {
      data: {},
    });
    const body = await this.GetResponseBody(response);
    const arr: any = [];
    for (let i = 0; i <= body.conversations.length; i++) {
      arr.push(body.conversations[0].members[i].user_id);
    };
    return arr;
  };
}
