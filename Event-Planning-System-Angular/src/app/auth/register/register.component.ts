import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountService } from '../../shared/services/account.service';
import { UserRegister } from '../../shared/models/userRegister.model';
import { passwordMatchValidator } from '../../shared/validators/passwordmatch.validator';
import { UserAuthResponse } from '../../shared/models/userAuthRespones.model';
import { Router } from '@angular/router';
import {format, set} from 'date-fns';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, InputTextModule, ButtonModule, FloatLabelModule, CardModule, CalendarModule, FileUploadModule,ToastModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers:[MessageService]
})
export class RegisterComponent {
  registerForm : FormGroup = new FormGroup({
    firstName : new FormControl ('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
    lastName : new FormControl ('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
    email : new FormControl ('',[Validators.required,Validators.email]),
    // Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character'))
    password : new FormControl ('',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]),
    // Passwords must match
    confirmPassword : new FormControl ('',[Validators.required]),
    dob : new FormControl ('',[Validators.required]),
    // phone number must be an egyption phone number
    phoneNumber : new FormControl ('',[Validators.required,Validators.pattern('^(01)[0125][0-9]{8}$')]),
    image : new FormControl (null,[]),
    postalCode : new FormControl ('',[Validators.pattern('^[0-9]{5}$')]),
    street : new FormControl ('',[Validators.minLength(3),Validators.maxLength(50)]),
    city : new FormControl ('',[Validators.minLength(3),Validators.maxLength(50)]),
    region : new FormControl ('',[])
  }
   ,{validators:passwordMatchValidator}
)

  firstNameControl = this.registerForm.controls['firstName'];
  lastNameControl = this.registerForm.controls['lastName'];
  emailControl = this.registerForm.controls['email'];
  passwordControl = this.registerForm.controls['password'];
  confirmPasswordControl = this.registerForm.controls['confirmPassword'];
  dobControl = this.registerForm.controls['dob'];
  phoneNumberControl = this.registerForm.controls['phoneNumber'];
  imageControl = this.registerForm.controls['image'];
  postalCodeControl = this.registerForm.controls['postalCode'];
  streetControl = this.registerForm.controls['street'];
  cityControl = this.registerForm.controls['city'];
  regionControl = this.registerForm.controls['region'];

  eighteenYearsAgo  : Date = new Date(new Date().setFullYear(new Date().getFullYear()-18));

  constructor(private accountService:AccountService,private router:Router,private messageService:MessageService) { 
    // document.body.style.background = 'linear-gradient(to right, #f0f2f0, #000c40)';
  }

  selectImage(event:FileSelectEvent){
    this.registerForm.patchValue({image: event.currentFiles[0]});
  }

  reg(){
    console.log(this.dobControl.value);
    if(this.registerForm.valid){
      let formattedDate = format(this.dobControl.value,'yyyy-MM-dd');
      let user : UserRegister = {
        FName: this.firstNameControl.value,
        LName: this.lastNameControl.value,
        Email: this.emailControl.value,
        Password: this.passwordControl.value,
        ConfirmPassword: this.confirmPasswordControl.value,
        PhoneNumber: this.phoneNumberControl.value,
        DateOfBirth: formattedDate,
        Image: this.imageControl.value,
        PostalCode: this.postalCodeControl.value,
        Street: this.streetControl.value,
        City: this.cityControl.value,
        Region: this.regionControl.value
      }
      console.log(user);
      this.accountService.register(user).subscribe((res:UserAuthResponse)=>{
        console.log(res);
        if(res.succeeded){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sign Up is Successful' });
          setTimeout(() => { 
            this.router.navigate(['auth/confirmemail']);
          }, 3000);
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This Email has already been signed up before' });
        }
      },(error)=>{
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This Email has already been signed up before' });
      })
    }

    
  }


}
