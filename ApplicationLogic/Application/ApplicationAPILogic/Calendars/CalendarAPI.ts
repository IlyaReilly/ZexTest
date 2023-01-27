import {BaseAPI} from '../BaseAPI';
import {BaseTest} from '../../../../TestsLogic/BaseTest';

export class CalendarAPI extends BaseAPI {
  constructor(page) {
    super(page);
  };

  async GetAllAppointments(user: string) {
    const response = await this.page.request.post(`${this.soapServiceUrl}${this.searchRequest}`, {
      data: {Body: {SearchRequest: {"query": {"_content": 'inid:"3" OR inid:"10"'}, "_jsns": 'urn:zimbraMail', "types": "appointment"}}, Header: {context: {_jsns: 'urn:zimbra', account: {by: 'name', _content: user}}}},
    });
    const body = await this.GetResponseBody(response);
    if (body.Body.SearchResponse.appt) {
      return (body.Body.SearchResponse.appt).map((appt) => appt.id);
    };
    return [];
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

  async DeleteAppointmentsViaAPI({apiManager}) {
    await Promise.all((await this.GetAllAppointments(BaseTest.userForLogin.login)).map(async (id) => await this.ItemActionRequest(apiManager.calendarAPI.ActionRequestTypes.delete, id, BaseTest.userForLogin.login)));
  };

  async DeleteCalendarsViaAPI({apiManager}) {
    await Promise.all(((await this.GetCalendarFolders(BaseTest.userForLogin.login)).filter((folder) => folder.deletable)).map(async (folder) => await apiManager.deleteCalendarAPI.DeleteCalendarFolderRequest(folder.id, BaseTest.userForLogin.login)));
    await apiManager.deleteCalendarAPI.EmptyTrashRequest(BaseTest.userForLogin.login);
  };

  async DeleteAppointmentsAndCalendarsViaAPI({apiManager}) {
    await this.DeleteAppointmentsViaAPI({apiManager});
    await this.DeleteCalendarsViaAPI({apiManager});
  };
};
