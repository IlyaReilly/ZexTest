import {BaseAPI} from '../BaseAPI';
import {BaseTest} from '../../../../TestsLogic/BaseTest';

export class TagsAPI extends BaseAPI {
  constructor(page) {
    super(page);
  };

  async GetTags() {
    const response = await this.page.request.post(`${this.soapServiceUrl}${this.getInfoRequest}`, {
      data: {"Body": {"GetInfoRequest": {"_jsns": "urn:zimbraAccount", "rights": "sendAs,sendAsDistList,viewFreeBusy,sendOnBehalfOf,sendOnBehalfOfDistList"}}, "Header": {"context": {"_jsns": "urn:zimbra", "session": {}, "userAgent": {"name": "CarbonioWebClient - Chrome 104.0.5112.20 (Windows)"}}}},
    });
    const body = await this.GetResponseBody(response);
    if (body.Header.context.refresh.tags) {
      const tagObjects = body.Header.context.refresh.tags.tag;
      const tagId = await Promise.all(tagObjects.map(async (conversation) => {
        return conversation.id;
      }));
      return tagId;
    };
    return [];
  };

  async DeleteAllTagsViaAPI({apiManager}) {
    const ids = await this.GetTags();
    await apiManager.deleteTagsAPI.DeleteTagRequest(ids.join(','), BaseTest.userForLogin.login);
  };
}
