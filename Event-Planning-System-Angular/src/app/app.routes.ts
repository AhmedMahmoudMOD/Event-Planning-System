import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EmailconfirmComponent } from './auth/emailconfirm/emailconfirm.component';


export const routes: Routes = [
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register' , component: RegisterComponent},
    {path:'addevent',component:AddEventComponent},
    { path: 'auth/confirmemail', component: EmailconfirmComponent }
];
