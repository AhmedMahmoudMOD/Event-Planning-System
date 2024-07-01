import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../models/profile';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  private baseUrl:string = "http://localhost:5006/api/Profile/";

  // get profile by user id
  getProfile(userId: number) {
    return this.http.get<Profile>(this.baseUrl + userId);
  }

  // update profile
  // request url example http://localhost:5006/api/Profile/id
  updateProfile(userId: number ,profile: Profile) {
    return this.http.put<Profile>(this.baseUrl + userId, profile);
  }



}
