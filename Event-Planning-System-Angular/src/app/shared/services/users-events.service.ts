import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/eventsListRes.model';

@Injectable({
  providedIn: 'root'
})
export class UsersEventsService {

  constructor(private http:HttpClient) { }

  private baseUrl:string = "http://localhost:5006/api/Event/UsersEvents/";

  // get all events by except user events
  getAllUsersEvents(userId: number) {
    return this.http.get<Event[]>(this.baseUrl + userId);
  }
}
