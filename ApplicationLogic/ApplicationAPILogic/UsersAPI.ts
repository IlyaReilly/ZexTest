import {BaseAPI} from './BaseAPI';

export class UsersAPI extends BaseAPI {
  constructor(page) {
    super(page);
  }

  async GetUserId(userMail) {
    let userId = '';
    const response = await this.page.request.post(`${this.restServiceUrl}${this.getUserDetailsRequest}`, {
      data: {'emails': [userMail]},
    });
    const body = JSON.parse((await response.body()).toString());
    if (body.results[userMail].status == 'ok') {
      userId = body.results[userMail].user_details.id;
    }
    return userId;
  }
}
