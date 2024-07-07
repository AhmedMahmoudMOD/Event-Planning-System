import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddEvent } from '../models/addEvent';
import { environment } from '../../../environments/environment.development';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Event, EventListRes } from '../models/eventsListRes.model';
import { calenderEvent } from '../models/calenderEvent';
import { NumericContainer } from '@syncfusion/ej2-angular-grids';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private httpclient: HttpClient) {}
  addEvent(event: AddEvent): Observable<AddEvent> {
    return this.httpclient.post<AddEvent>(
      `${environment.apiUrl}/api/Event`,
      event
    );
  }
  deleteEvent(id: number): Observable<any> {
    return this.httpclient.delete<any>(`${environment.apiUrl}/api/Event/${id}`);
  }
  getEvents(
    pageNumber: Number,
    pageSize: Number,
    searchTerm: string
  ): Observable<EventListRes> {
    return this.httpclient.get<EventListRes>(
      `${environment.apiUrl}/api/Event/page?pageNumber=${pageNumber}&pageSize${pageSize}&searchTerm=${searchTerm}`
    );
  }
  //   addAttendance(eventId: number, emails: string[]){
  //     const url = `${environment.apiUrl}/api/Event/Attendance/${eventId}`;
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const body = emails.map(email => ({ email })); // Transform the array of emails to the required format
  //   return this.httpclient.post<string>(url, body);
  // }

  addAttendance(eventId: number, emails: string[]): Observable<any> {
    let body = emails.map((email) => ({ email }));
    return this.httpclient.post<any>(
      `${environment.apiUrl}/api/Event/Attendance/${eventId}`,
      body
    );
  }

  getEventById(id: number): Observable<Event> {
    return this.httpclient.get<Event>(`${environment.apiUrl}/api/Event/${id}`);
  }
  editEvent(eventId: number, event: Event): Observable<Event> {
    return this.httpclient.put<Event>(
      `${environment.apiUrl}/api/Event/${eventId}`,
      event
    );
  }

  getEventsByUser(id: number): Observable<calenderEvent[]> {
    return this.httpclient.get<calenderEvent[]>(
      environment.apiUrl + '/api/Event/user/' + id
    );
  }
  uploadEmailsSheet(eventId:number,attendanceSheet : File): Observable<any> {
    const formData = new FormData();
    formData.append('attendanceSheet', attendanceSheet , attendanceSheet .name);

    return this.httpclient.post(environment.apiUrl + `/api/Event/Attendance/upload/${eventId}`,
       formData, {headers: new HttpHeaders({ 'Accept': 'application/json'})
    });
  }
}
