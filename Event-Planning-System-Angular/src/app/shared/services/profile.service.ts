import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  private baseUrl:string = "http://localhost:5006/api/Profile/";

  // get profile by user id
  getProfile(userId: number) {
    return this.http.get(this.baseUrl + userId);
  }

}
