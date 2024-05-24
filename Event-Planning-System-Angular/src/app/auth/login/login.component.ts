import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserLogin } from '../../shared/models/userLogin.model';
import { AccountService } from '../../shared/services/account.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule,InputTextModule,ButtonModule,FloatLabelModule,CardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm : FormGroup = new FormGroup({
    email : new FormControl ('',[Validators.required,Validators.email]),
    password : new FormControl ('',[Validators.required])
  })

  emailControl = this.loginForm.controls['email'];
  passwordControl = this.loginForm.controls['password'];

  constructor(private accountService:AccountService){
    document.body.style.background = 'linear-gradient(to right, #f0f2f0, #000c40)';

  }

  login(){
    let user : UserLogin = {email:'',password:''};
    user.email = this.emailControl.value;
    user.password = this.passwordControl.value;
    // this.accountService.login(user);
  }


}
