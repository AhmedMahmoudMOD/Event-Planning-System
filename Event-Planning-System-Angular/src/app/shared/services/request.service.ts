import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Req } from '../../events/event-reqs/req.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  baseUrl = 'http://localhost:5006/api/';

  constructor(private http:HttpClient) { }

  
  getPendingReqs(id: number) {
    return this.http.get<Req[]>(this.baseUrl + `UsersRequests/${id}`);
  }

  getAcceptedReqs(id: number) {
    return this.http.get<Req[]>(this.baseUrl + `UsersRequests/${id}?status=1`);
  
}

getRejectedReqs(id: number) {
  return this.http.get<Req[]>(this.baseUrl + `UsersRequests/${id}?status=2`);
  }

  acceptReq(userId:string,eventId:string){
    return this.http.put(this.baseUrl + 'UsersRequests',{userId:userId,eventId:eventId,requestStatus:1});
  }

  rejectReq(userId:string,eventId:string){
    return this.http.put(this.baseUrl + 'UsersRequests',{userId:userId,eventId:eventId,requestStatus:2});
  }
}