import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventSchedule } from '../../models/EventSchedule';


@Injectable({
  providedIn: 'root'
})
export class EventdetailsService {
  baseUrl = 'http://localhost:5006/api/';

  constructor(private http: HttpClient) { }

  getEventById(id: number) {
    return this.http.get<Event>(this.baseUrl + `Event/${id}`);
  }

  removeEventById(id: number) {
    return this.http.delete(this.baseUrl + `Event?id=${id}`);
  }


  getEventScheduleById(id: number) {
    return this.http.get<EventSchedule[]>(this.baseUrl + `EventSchedule/${id}`);
  }

  AddeventSchedule(id: number, eventSchedule: any) {
    return this.http.post<EventSchedule[]>(this.baseUrl + `EventSchedule/Add/${id}`, eventSchedule);
  }

  DeleteEventSchedule(id: number, eventSchedule: any) {
    return this.http.patch<EventSchedule[]>(this.baseUrl + `EventSchedule/delete/${id}`, eventSchedule);
  }
}
