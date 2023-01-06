import {BaseAPI} from '../BaseAPI';

export class DeleteChatsAPI extends BaseAPI {
  constructor(page) {
    super(page);
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

  async KickOffUser(id, membersId) {
    await this.page.request.post(`${this.restServiceUrl}${this.kickFromConversationRequest}`, {
      data: {"conversation_id": id, "kicked_user_ids": membersId},
    });
  };
}
