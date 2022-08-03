import {BaseAPI} from './BaseAPI';

export class CalendarAPI extends BaseAPI {
  constructor(page) {
    super(page);
  }

  async CreateAppointmentRequest(title : string, user : string, attendees : string, body : string) {
    const currentdate = new Date();
    const currentDatePlus10sec = new Date(Date.now() + 10000);
    const currentdateISO = this.ParseDateToISO(currentdate);
    const currentDatePlus10secISO = this.ParseDateToISO(currentDatePlus10sec);
    const currentdateUSFull = this.ParseDateToUSFull(currentdate);
    const currentdateUSTime = this.ParseDateToUSTime(currentdate);
    const response = await this.page.request.post(`${this.soapServiceUrl}${this.createAppointmentRequest}`, {
      data: {
        "Body": {"CreateAppointmentRequest": {"echo": "1", "comp": "0", "m": {"attach": {"mp": [], "aid": null}, "e": [{"a": attendees, "p": attendees, "t": "t"}, {"a": user, "t": "f"}], "inv": {"comp": [{"alarm": [{"action": "DISPLAY", "trigger": {"rel": {"m": "5", "related": "START", "neg": "1"}}}], "at": [{"a": attendees, "d": attendees, "role": "REQ", "ptst": "NE", "rsvp": "1"}], "allDay": "0", "fb": "B", "loc": null, "name": title, "or": {"a": user, "sentBy": null}, "recur": null, "status": "CONF", "s": {"d": currentdateISO}, "e": {"d": currentDatePlus10secISO}, "class": "PUB", "draft": false}]}, "l": "10", "mp": {"ct": "multipart/alternative", "mp": [{"ct": "text/html", "content": `<html><body id='htmlmode'>-:::_::_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_::_:_::-<h3>undefined have invited you to a new meeting!</h3><p>Subject: ${title}</p><p>Organizer: undefined ${user}</p><p>Location: null</p><p>Time: ${currentdateUSFull} - ${currentdateUSTime}</p><p>Invitees: ${attendees}</p><br/>-:::_::_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_::_:_::-<p>${body}</p>`}, {"ct": "text/plain", "content": `-:::_::_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_::_:_::-\n  ${user} have invited you to a new meeting!\n\nSubject: ${title} \nOrganizer: \"undefined ${user}\n\nTime: ${currentdateUSFull} - ${currentdateUSTime}\n \nInvitees: ${attendees} \n\n\n-:::_::_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_::_:_::-\n${body}`}]}, "su": title}, "_jsns": "urn:zimbraMail"}}, "Header": {"context": {"_jsns": "urn:zimbra", "notify": {"seq": 23}, "session": {"id": "11151", "_content": "11151"}, "account": {"by": "name", "_content": user}, "userAgent": {"name": "CarbonioWebClient - Chrome 103.0.0.0 (Windows)", "version": "22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS"}}},
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
        "Body": {"SearchRequest": {"_jsns": "urn:zimbraMail", "limit": "500", "calExpandInstEnd": 1660078800000, "calExpandInstStart": 1658869200000, "offset": 0, "sortBy": "none", "types": "appointment", "query": {"_content": `${query} ( inid:\"10\")`}}}, "Header": {"context": {"_jsns": "urn:zimbra", "notify": {"seq": 45}, "session": {"id": "11151", "_content": "11151"}, "account": {"by": "name", "_content": user}, "userAgent": {"name": "CarbonioWebClient - Chrome 103.0.0.0 (Windows)", "version": "22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS"}}},
      },
    });
    const body = JSON.parse((await response.body()).toString());
    if (body.Body.SearchResponse.appt) {
      id = body.Body.SearchResponse.appt[0].invId;
    }
    return id;
  }

  async GetAllAppointments(user: string) {
    const id = new Array(100);
    const response = await this.page.request.post(`${this.soapServiceUrl}${this.searchRequest}`, {
      data: {
        "Body": {"SearchRequest": {"_jsns": "urn:zimbraMail", "limit": "500", "calExpandInstEnd": 1660157953936, "calExpandInstStart": 1658861953936, "offset": 0, "sortBy": "none", "types": "appointment", "query": {"_content": "inid:\"3\""}}}, "Header": {"context": {"_jsns": "urn:zimbra", "session": {"id": "14020", "_content": "14020"}, "account": {"by": "name", "_content": user}, "userAgent": {"name": "CarbonioWebClient - Chrome 103.0.0.0 (Windows)", "version": "22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS"}}},
      },
    });
    const body = JSON.parse((await response.body()).toString());
    if (body.Body.SearchResponse.appt) {
      body.Body.SearchResponse.appt.forEach((appointment) => {
        id.push(appointment.invId);
      });
    }
    return id;
  }

  async CancelAppointmentRequest(id: string, user: string) {
    await this.page.request.post(`${this.soapServiceUrl}${this.searchRequest}`, {
      data: {
        "Body": {"CancelAppointmentRequest": {"_jsns": "urn:zimbraMail", "id": id, "comp": "0", "m": {"e": [{"a": "2", "p": "2", "t": "t"}], "su": "Cancelled: 2", "mp": {"ct": "multipart/alternative", "mp": [{"ct": "text/plain", "content": "The following meeting has been cancelled:\n\n"}]}}}}, "Header": {"context": {"_jsns": "urn:zimbra", "notify": {"seq": 2}, "session": {"id": "13904", "_content": "13904"}, "account": {"by": "name", "_content": user}, "userAgent": {"name": "CarbonioWebClient - Chrome 103.0.0.0 (Windows)", "version": "22.6.1_ZEXTRAS_202206 agent 20220621-1442 FOSS"}}},
      },
    });
  }

  ParseDateToISO(date) {
    return (date.toISOString()).split('-').join('').split(':').join('').replace(/\.\d+Z/, 'Z');
  }

  ParseDateToUSFull(date) {
    return (date.toLocaleString('en-US', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', hour12: true, minute: 'numeric'}).replace(`${date.toLocaleString('en-US', {year: 'numeric'})},`, date.toLocaleString('en-US', {year: 'numeric'})));
  }

  ParseDateToUSTime(date) {
    return (date.toLocaleString('en-US', {hour: 'numeric', hour12: true, minute: 'numeric'}));
  }
}
