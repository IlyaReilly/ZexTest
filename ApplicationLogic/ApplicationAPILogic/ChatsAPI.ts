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

  async KickOffUser(id) {
    await this.page.request.post(`${this.restServiceUrl}${this.kickFromConversationRequest}`, {
      data: {"conversation_id": id, "kicked_user_ids": ["a4388571-2b60-400f-affe-7248f0599aa8", "0d78db1e-daaa-4d41-b38c-49eb48ea5ecc"]},
    });
  };

  async CreateGroup(topic) {
    const response = await this.page.request.post(`${this.restServiceUrl}${this.createGroupRequest}`, {
      data: {"invited_user_ids": ["a4388571-2b60-400f-affe-7248f0599aa8", "0d78db1e-daaa-4d41-b38c-49eb48ea5ecc"], "topic": topic},
    });
    const body = await this.GetResponseBody(response);
    return body;
  };

  async GetUsersIds() {
    let userId = '';
    const response = await this.page.request.post(`${this.restServiceUrl}${this.getUserDetailsRequest}`, {
      data: {},
    });

    const body = await this.GetResponseBody(response);
    if (body.results) {
      userId = body.results;
      return userId;
    };
  };
}
