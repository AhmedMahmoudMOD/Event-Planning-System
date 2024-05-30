import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EventdetailsService {
  baseUrl = 'http://localhost:5006/api/';

  constructor(private http:HttpClient) { }

  getEventById(id:number){
    return this.http.get<Event>(this.baseUrl + `Event?id=${id}`);
  }


    
    

}
