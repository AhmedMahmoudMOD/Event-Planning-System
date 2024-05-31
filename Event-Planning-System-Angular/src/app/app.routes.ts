import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EmailconfirmComponent } from './auth/emailconfirm/emailconfirm.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EmailConfirmCheckComponent } from './auth/email-confirm-check/email-confirm-check.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ResetPassSuccessComponent } from './auth/reset-pass-success/reset-pass-success.component';


export const routes: Routes = [
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register' , component: RegisterComponent},
    {path:'addevent',component:AddEventComponent},
    { path: 'auth/confirmemail', component: EmailconfirmComponent },
    {path: 'auth/forgotpassword', component: ForgotPasswordComponent},
    {path: 'events', component: EventListComponent},

    {path: 'auth/resetpassword', component: ResetPasswordComponent},
    {path: 'auth/resetpassword/success', component: ResetPassSuccessComponent},

    
    { path: 'auth/validateemail', component: EmailConfirmCheckComponent },

    { path: '', redirectTo: '/addevent', pathMatch: 'full' }
];
