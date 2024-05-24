import { HttpClient } from "@angular/common/http";
import { AddEvent } from "../models/addEvent";
import { environment } from "../../../environments/environment.development";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class EventService  {
    constructor(
      private httpclient : HttpClient
    ) {}
    addEvent(event: AddEvent): Observable<AddEvent> {
      return this.httpclient.post<AddEvent>(`${environment.apiUrl}/api/Event`, event);
    }
    deleteEvent(id: number): Observable<any> {
      return this.httpclient.delete<any>(`${environment.apiUrl}/api/Event/${id}`);
    }
}