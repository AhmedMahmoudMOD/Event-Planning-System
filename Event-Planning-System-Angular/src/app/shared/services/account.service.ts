import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../models/userLogin.model';
import { UserRegister } from '../models/userRegister.model';
import { UserAuthResponse } from '../models/userAuthRespones.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'http://localhost:5006/api/';
  isLoggedIn : boolean = false;

  constructor(private http:HttpClient) { 

  }

  register(user:UserRegister){
    return this.http.post<UserAuthResponse>(this.baseUrl + 'Rigster',user);
  }

  logout(){
    this.isLoggedIn = false;
  }


}
