import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventSchedule } from '../../models/EventSchedule';
import { EventImage } from '../../models/eventImage.model';


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

  UpdateEventSchedule(id: number, eventSchedule: any) {
    return this.http.put<EventSchedule[]>(this.baseUrl + `EventSchedule/update/${id}`, eventSchedule);
  }

  UploadEventImage(eventImage:EventImage){
    const formData = new FormData();
    formData.append('image', eventImage.image);
    formData.append('id', eventImage.id.toString());
    return this.http.post(this.baseUrl + `Event/addImage`, formData);
  }
}


