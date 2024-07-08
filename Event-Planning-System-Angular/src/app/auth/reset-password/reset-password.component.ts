import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { passwordMatchValidator } from '../../shared/validators/passwordmatch.validator';
import { AccountService } from '../../shared/services/account.service';
import { ResetPass } from '../../shared/models/resetPass.model';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ResetPassSuccessComponent } from '../reset-pass-success/reset-pass-success.component';
import { ModalService } from '../../shared/services/modal.service';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule,ButtonModule,InputTextModule,CardModule,ToastModule,FloatLabelModule,ResetPassSuccessComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
  providers:[MessageService]
})
export class ResetPasswordComponent {
  resetPasswordForm : FormGroup = new FormGroup({
    newPassword : new FormControl ('',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]),
    confirmPassword : new FormControl ('',[Validators.required])
  }, {validators: passwordMatchValidator}); 

  error : boolean = false;
  errorMessage : string = '';

  passwordControl = this.resetPasswordForm.controls['newPassword'];
  confirmPasswordControl = this.resetPasswordForm.controls['confirmPassword'];

  constructor(private messageService:MessageService,private AccoutnService:AccountService,private router:Router,private ActivatedRoue:ActivatedRoute,private modalService:ModalService) { 
    // document.body.style.background = 'linear-gradient(to right, #f0f2f0, #000c40)';
  }

  resetPassword(){
    if(this.resetPasswordForm.valid){
      let NewPassword = this.passwordControl.value;
      let ConfirmPassword = this.confirmPasswordControl.value;
      let Email = this.ActivatedRoue.snapshot.queryParams['email'];
      let Token = this.ActivatedRoue.snapshot.queryParams['token'];
      let model : ResetPass = {Email,NewPassword,ConfirmPassword,Token};
      console.log(model);
      this.AccoutnService.resetPassword(model).subscribe((res)=>{
        this.error = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password Reset Successful' });
       this.modalService.resetPassSuccessModalVisible = true;
      },(error)=>{
        this.error = true;
        console.log(error);
        this.errorMessage = error.error.value;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Password Reset Failed' });
      });
    }
  }
  

}