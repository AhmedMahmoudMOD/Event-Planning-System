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
import { NavbarComponent } from './navbar/navbar.component';

import { ProfileComponent } from './profile/profile.component';

import { EventCalenderComponent } from './events/event-calender/event-calender.component';
import { AddtoDoListComponent } from './addto-do-list/addto-do-list.component';
import { canLoginGuard } from './shared/guards/can-login.guard';
import { logGuardGuard } from './shared/guards/log-guard.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { HomeComponent } from './home/home.component';
import { UsersEventsComponent } from './events/users-events/users-events.component';
import { PrivateLoginGuard } from './shared/guards/private-login.guard';




export const routes: Routes = [

    { path: 'auth/login', component: LoginComponent, canActivate: [logGuardGuard] },
    { path: 'auth/register', component: RegisterComponent, canActivate: [logGuardGuard] },
    { path: 'addevent', component: AddEventComponent, canActivate: [canLoginGuard] },


    { path: 'auth/confirmemail', component: EmailconfirmComponent , canActivate:[logGuardGuard] },
    { path: 'auth/forgotpassword', component: ForgotPasswordComponent , canActivate:[logGuardGuard] },
    { path: 'events', component:EventCalenderComponent , canActivate:[canLoginGuard] },
    { path: 'eventslist', component:EventListComponent , canActivate:[canLoginGuard] },
    { path: 'Events/usersEvents', component: UsersEventsComponent   },
    { path: 'sidebar', component: SidebarComponent },
    //event details
    { path: 'planner/eventdetails/:id', component: EventDetailsComponent, canActivate: [PrivateLoginGuard] },
    { path: 'schedule/:id', component: EventsScheduleComponent },
    { path: 'addto-do-list', component: AddtoDoListComponent },
    //end of event details
    { path: 'planner/events', component: EventCalenderComponent, canActivate: [canLoginGuard] },

    { path: 'auth/resetpassword', component: ResetPasswordComponent, canActivate: [logGuardGuard] },

    { path: 'auth/validateemail', component: EmailConfirmCheckComponent, canActivate: [logGuardGuard] },
    { path: 'event/addEmails', component: AddEmailsComponent, canActivate: [canLoginGuard] },

    { path: 'profile/:id', component: ProfileComponent, canActivate: [canLoginGuard] },
    { path: 'update-profile/:id', component: ProfileUpdateComponent },

    { path: 'home', component: HomeComponent },

    { path: 'edit-event', component: EditEventComponent },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
];
