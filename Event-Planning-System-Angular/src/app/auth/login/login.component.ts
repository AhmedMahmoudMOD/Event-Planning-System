import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';
import { UserLogin } from '../../shared/models/userLogin.model';
import { AccountService } from '../../shared/services/account.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule,InputTextModule,ButtonModule,FloatLabelModule,CardModule,ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[MessageService]
})
export class LoginComponent {
  loginForm : FormGroup = new FormGroup({
    email : new FormControl ('',[Validators.required,Validators.email]),
    password : new FormControl ('',[Validators.required])
  });

  error : boolean = false;
  
  

  emailControl = this.loginForm.controls['email'];
  passwordControl = this.loginForm.controls['password'];

  constructor(private accountService:AccountService,private router:Router,private messageService:MessageService) { 
    document.body.style.background = 'linear-gradient(to right, #f0f2f0, #000c40)';

  }

  login(){
    let user : UserLogin = {email:'',password:''};
    user.email = this.emailControl.value;
    user.password = this.passwordControl.value;
    this.accountService.login(user).subscribe((res)=>{
      console.log(res);
      let token = res.body?.token as string;
      localStorage.setItem('token',token);
      this.accountService.isLoggedIn = true;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Successful' });
      console.log(jwtDecode.jwtDecode(token));
      // this.router.navigate(['/']);
    },(error)=>{
      if(error.status == 401){
        this.error = true;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login Failed' });
      } else{
        console.log(error);
      }

    })
  }
}

