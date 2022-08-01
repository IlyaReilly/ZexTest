import {BaseAPI} from './BaseAPI';

export class CalendarAPI extends BaseAPI {
  constructor(page) {
    super(page);
  }

  async CreateAppointmentRequest(title : string, user : string, attendees : string, body : string) {
    const response = await this.page.request.post(`${this.soapServiceUrl}${this.createAppointmentRequest}`, {
      data: {
        'Body': {'CreateAppointmentRequest': {'echo': '1', 'comp': '0', 'm': {'attach': {'mp': [], 'aid': null}, 'e': [{'a': attendees, 'p': attendees, 't': 't'}, {'a': user, 't': 'f'}], 'inv': {'comp': [{'alarm': [{'action': 'DISPLAY', 'trigger': {'rel': {'m': '5', 'related': 'START', 'neg': '1'}}}], 'at': [{'a': attendees, 'd': attendees, 'role': 'REQ', 'ptst': 'NE', 'rsvp': '1'}], 'allDay': '0', 'fb': 'B', 'loc': null, 'name': title, 'or': {'a': user, 'sentBy': null}, 'recur': null, 'status': 'CONF', 's': {'d': '20220727T121137Z'}, 'e': {'d': '20220727T121141Z'}, 'class': 'PUB', 'draft': false}]}, 'l': '10', 'mp': {'ct': 'multipart/alternative', 'mp': [{'ct': 'text/html', 'content': `<html><body id='htmlmode'>-:::_::_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_::_:_::-<h3>undefined have invited you to a new meeting!</h3><p>Subject: ${title}</p><p>Organizer: undefined ${user}</p><p>Location: null</p><p>Time: Wednesday, July 27, 2022 3:11 PM - 3:11 PM</p><p>Invitees: ${attendees}</p><br/>-:::_::_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_::_:_::-<p>${body}</p>`}, {'ct': 'text/plain', 'content': `-:::_::_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_::_:_::-\n  ${user} have invited you to a new meeting!\n\nSubject: ${title} \nOrganizer: \"undefined ${user}\n\nTime: Wednesday, July 27, 2022 3:11 PM - 3:11 PM\n \nInvitees: ${attendees} \n\n\n-:::_::_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_::_:_::-\n${body}`}]}, 'su': title}, '_jsns': 'urn:zimbraMail'}}, 'Header': {'context': {'_jsns': 'urn:zimbra', 'notify': {'seq': 23}, 'session': {'id': '11151', '_content': '11151'}, 'account': {'by': 'name', '_content': user}, 'userAgent': {'name': 'CarbonioWebClient - Chrome 103.0.0.0 (Windows)', 'version': '22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS'}}},
      },
    });
    const responceBody = JSON.parse((await response.body()).toString());
    const id = responceBody.Body.CreateAppointmentResponse.echo[0].m[0].id;
    return id;
  }

  async CalendarSearchQuery(query: string, user: string) {
    let id = '';
    const response = await this.page.request.post(`${this.soapServiceUrl}${this.searchRequest}`, {
      data: {
        'Body': {'SearchRequest': {'_jsns': 'urn:zimbraMail', 'limit': '500', 'calExpandInstEnd': 1660078800000, 'calExpandInstStart': 1658869200000, 'offset': 0, 'sortBy': 'none', 'types': 'appointment', 'query': {'_content': `${query} ( inid:\"10\")`}}}, 'Header': {'context': {'_jsns': 'urn:zimbra', 'notify': {'seq': 45}, 'session': {'id': '11151', '_content': '11151'}, 'account': {'by': 'name', '_content': user}, 'userAgent': {'name': 'CarbonioWebClient - Chrome 103.0.0.0 (Windows)', 'version': '22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS'}}},
      },
    });
    const body = JSON.parse((await response.body()).toString());
    if (body.Body.SearchResponse.appt) {
      id = body.Body.SearchResponse.appt[0].invId;
    }
    return id;
  }
}
