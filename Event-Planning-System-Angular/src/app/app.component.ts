import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { EventCalenderComponent } from './events/event-calender/event-calender.component';
import { CustomCalendarModule } from './events/event-calender/calendar.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CustomCalendarModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Event-Planning-System-Angular';
}
