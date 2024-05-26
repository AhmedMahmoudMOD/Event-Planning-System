import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../models/userLogin.model';
import { UserRegister } from '../models/userRegister.model';
import { UserAuthResponse } from '../models/userAuthRespones.model';
import { ConfirmEmail } from '../models/confirmemail.model';
import { jwtTokenRes } from '../models/jwtTokenRes.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'http://localhost:5006/api/';
  isLoggedIn : boolean = false;

  constructor(private http:HttpClient,private router : Router) { 

  }

  register(user:UserRegister){
    const formData = new FormData();
    formData.append('FName',user.FName);
    formData.append('LName',user.LName);
    formData.append('Email',user.Email);
    formData.append('Password',user.Password);
    formData.append('ConfirmPassword',user.ConfirmPassword);
    formData.append('PhoneNumber',user.PhoneNumber);
    formData.append('DateOfBirth',user.DateOfBirth);
    formData.append('PostalCode',user.PostalCode);
    formData.append('Street',user.Street);
    formData.append('City',user.City);
    formData.append('Region',user.Region);
    formData.append('Image',user.Image);
    return this.http.post<UserAuthResponse>(this.baseUrl + 'Rigster',formData,{
    });
  }


  confirmEmail(model:ConfirmEmail){
    return this.http.post(this.baseUrl + 'auth/emailconfirm',model);
  }

  login(user:UserLogin){
    return this.http.post<jwtTokenRes>(this.baseUrl + 'login/login',user,{observe:'response'});
  }


  logout(){
    this.isLoggedIn = false;
  }


}
