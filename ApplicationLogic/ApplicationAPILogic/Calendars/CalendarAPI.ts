import {BaseAPI} from '../BaseAPI';

export class CalendarAPI extends BaseAPI {
  constructor(page) {
    super(page);
  };

  async GetAllAppointments(user: string) {
    const id = [];
    const startEndExpand = this.StartEndRangeCounterForSearch();
    const response = await this.page.request.post(`${this.soapServiceUrl}${this.searchRequest}`, {
      data: {
        "Body": {"SearchRequest": {"_jsns": "urn:zimbraMail", "limit": "500", "calExpandInstEnd": startEndExpand.endExpand, "calExpandInstStart": startEndExpand.startExpand, "offset": 0, "sortBy": "none", "types": "appointment", "query": {"_content": "inid:\"10\""}}}, "Header": {"context": {"_jsns": "urn:zimbra", "session": {"id": "14020", "_content": "14020"}, "account": {"by": "name", "_content": user}, "userAgent": {"name": "CarbonioWebClient - Chrome 103.0.0.0 (Windows)", "version": "22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS"}}},
      },
    });
    const body = await this.GetResponseBody(response);
    if (body.Body.SearchResponse.appt) {
      body.Body.SearchResponse.appt.forEach((appointment) => {
        id.push(appointment.invId);
      });
    }
    return id;
  };

  async GetCalendarFolders(user: string) {
    const response = await this.page.request.post(`${this.soapServiceUrl}${this.getFolderRequest}`, {
      headers: {['content-type']: 'application/soap+xml'},
      data: `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope"><soap:Header><context xmlns="urn:zimbra"><account by="name">${user}</account><format type="js"/></context></soap:Header><soap:Body><BatchRequest xmlns="urn:zimbra" onerror="stop"> <GetFolderRequest xmlns="urn:zimbraMail" visible="1"></GetFolderRequest></BatchRequest></soap:Body></soap:Envelope>`,
    });
    const body = await this.GetResponseBody(response);
    return body.Body.BatchResponse.GetFolderResponse[0].folder[0].folder;
  };

  async GetCalendarFolderIdByName(user: string, folderName: string) {
    const foldersList = await this.GetCalendarFolders(user);
    const folder = foldersList.find((x) => x.name == folderName);
    return folder.id;
  };

  async CalendarSearchQuery(query: string, user: string) {
    let id = '';
    const startEndExpand = this.StartEndRangeCounterForSearch();
    const response = await this.page.request.post(`${this.soapServiceUrl}${this.searchRequest}`, {
      data: {
        "Body": {"SearchRequest": {"_jsns": "urn:zimbraMail", "limit": "500", "calExpandInstEnd": startEndExpand.endExpand, "calExpandInstStart": startEndExpand.startExpand, "offset": 0, "sortBy": "none", "types": "appointment", "query": {"_content": `${query} ( inid:\"10\")`}}}, "Header": {"context": {"_jsns": "urn:zimbra", "notify": {"seq": 45}, "session": {"id": "11151", "_content": "11151"}, "account": {"by": "name", "_content": user}, "userAgent": {"name": "CarbonioWebClient - Chrome 103.0.0.0 (Windows)", "version": "22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS"}}},
      },
    });
    const body = await this.GetResponseBody(response);
    if (body.Body.SearchResponse.appt) {
      id = body.Body.SearchResponse.appt[0].invId;
    }
    return id;
  };

  StartEndRangeCounterForSearch() {
    const startYear = 2022;
    const currentYear = new Date().getFullYear();
    const oneYearInMillisecond = 31536000000;
    return {startExpand: 1639872000000 + oneYearInMillisecond*(currentYear - startYear), endExpand: 1671408000000 + oneYearInMillisecond*(currentYear - startYear)};
  };
}
