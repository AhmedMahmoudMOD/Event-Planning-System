import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../models/userLogin.model';
import { UserRegister } from '../models/userRegister.model';
import { UserAuthResponse } from '../models/userAuthRespones.model';
import { ConfirmEmail } from '../models/confirmemail.model';
import { jwtTokenRes } from '../models/jwtTokenRes.model';
import { Router } from '@angular/router';
import { ResetPass } from '../models/resetPass.model';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
  // Add other fields if needed
}


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
  
  extractUserID(){
    const token = localStorage.getItem('token') as string;
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  }

  checkOwnership(eventId:number,userId:number){
    return this.http.get<boolean>(this.baseUrl + `Event/check/${eventId}/${userId}`);
  }


  logout(){
    this.isLoggedIn = false; 
    localStorage.removeItem('token');
  }

  forgotPassword(email:string){
    return this.http.post(this.baseUrl + `auth/forgotpassword?email=${email}`,{},{observe:'response'});
  }

  resetPassword(model:ResetPass){
    return this.http.post(this.baseUrl + 'auth/resetpassword',model);
  }

  LoggedIn(){
    if(localStorage.getItem('token') != null){
      return true;
    }
    return false;
  }


}