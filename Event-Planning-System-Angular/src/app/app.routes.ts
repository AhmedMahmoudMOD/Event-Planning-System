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

import { AddEmailsComponent } from './add-emails/add-emails.component';

import { SidebarComponent } from './sidebar/sidebar.component';

import { EventDetailsComponent } from './events/event-details/event-details.component';

import { EditEventComponent } from './edit-event/edit-event.component';
import { EventsScheduleComponent } from './events/events-schedule/events-schedule.component';
<<<<<<< HEAD
import { NavbarComponent } from './navbar/navbar.component';
=======
import { ProfileComponent } from './profile/profile.component';
>>>>>>> profile



export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
    { path: 'addevent', component: AddEventComponent },
    { path: 'auth/confirmemail', component: EmailconfirmComponent },
    { path: 'auth/forgotpassword', component: ForgotPasswordComponent },
    { path: 'events', component: EventListComponent },
    { path: 'sidebar', component: SidebarComponent },
    //event details
    { path: 'planner/eventdetails/:id', component: EventDetailsComponent },
    { path: 'schedule/:id', component: EventsScheduleComponent },

    //end of event details

<<<<<<< HEAD
    { path: 'navbar', component: NavbarComponent},

    { path: 'auth/resetpassword', component: ResetPasswordComponent },
=======
    {path: 'auth/resetpassword', component: ResetPasswordComponent},
>>>>>>> profile

    { path: 'auth/validateemail', component: EmailConfirmCheckComponent },
    { path: 'event/addEmails', component: AddEmailsComponent },

    {path: 'profile/:id', component: ProfileComponent},

    { path: 'edit-event', component: EditEventComponent },

    { path: 'auth/validateemail', component: EmailConfirmCheckComponent },
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' }
];
