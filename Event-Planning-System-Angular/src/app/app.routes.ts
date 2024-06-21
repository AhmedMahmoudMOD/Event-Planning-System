import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EmailconfirmComponent } from './auth/emailconfirm/emailconfirm.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EmailConfirmCheckComponent } from './auth/email-confirm-check/email-confirm-check.component';

import { AddEmailsComponent } from './add-emails/add-emails.component';

import { SidebarComponent } from './sidebar/sidebar.component';

import { EventDetailsComponent } from './events/event-details/event-details.component';

import { EditEventComponent } from './edit-event/edit-event.component';



export const routes: Routes = [
    { path: 'auth/login', component: LoginComponent , title: 'Login'},
    { path: 'auth/register' , component: RegisterComponent, title: 'Register'},
    {path:'addevent',component:AddEventComponent,title:'Add Event'},
    { path: 'auth/confirmemail', component: EmailconfirmComponent },
    {path: 'events', component: EventListComponent,title:'Events'},
    {path:'sidebar',component:SidebarComponent},
    {path: 'planner/eventdetails/:id', component : EventDetailsComponent, title: 'Event Details'},
    { path: 'auth/validateemail', component: EmailConfirmCheckComponent },
    { path: 'event/addEmails', component: AddEmailsComponent },
    {path: 'edit-event', component: EditEventComponent, title: 'Edit Event'},
    { path: 'auth/validateemail', component: EmailConfirmCheckComponent },
    { path: '', redirectTo: '/addevent', pathMatch: 'full' }
];
