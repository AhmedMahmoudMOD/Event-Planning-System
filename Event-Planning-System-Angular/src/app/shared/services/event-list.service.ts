import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/eventsListRes.model';

@Injectable({
  providedIn: 'root'
})
export class EventListService {

  constructor(private http:HttpClient) { }

  private baseUrl:string = "http://localhost:5006/api/Event/user/";

  // get all events by user id
  getAll(userId: number) {
    return this.http.get<Event[]>(this.baseUrl + userId);
  }
}
