import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../shared/services/account.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule,FormsModule,CardModule,ButtonModule,ToastModule,ReactiveFormsModule,InputTextModule,FloatLabelModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
  providers:[MessageService]
})
export class ForgotPasswordComponent {
  fogrotPasswordForm : FormGroup = new FormGroup({
    email : new FormControl ('',[Validators.required,Validators.email])
  });

  emailControl = this.fogrotPasswordForm.controls['email'];

  constructor(private accountService:AccountService,private router:Router,private messageService:MessageService) { 
    // document.body.style.background = 'linear-gradient(to right, #f0f2f0, #000c40)';
  }

  submitEmail(){
      if(this.emailControl.valid){
        this.accountService.forgotPassword(this.emailControl.value).subscribe((res)=>{
          console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Email Sent' });
          setTimeout(() => { 
            this.router.navigate(['/']);
          }, 6000);
        },(error)=>{
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email Not Sent' });
        });
    }
  }
}
