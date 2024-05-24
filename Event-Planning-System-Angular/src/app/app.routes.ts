import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EmailconfirmComponent } from './auth/emailconfirm/emailconfirm.component';


export const routes: Routes = [
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register' , component: RegisterComponent},
    { path: 'auth/confirmemail', component: EmailconfirmComponent }
];
