import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomCalendarModule } from './events/event-calender/calendar.module';
import { NavbarService } from './shared/services/navbar.service';
import { NavigationEnd, Router, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CustomCalendarModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Event-Planning-System-Angular';

  constructor(private router: Router, public navbarService: NavbarService) { }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Add all routes where the navbar should be hidden
        const noNavbarRoutes = ['/auth/login', '/auth/register', '/auth/forgotpassword', '/auth/resetpassword', '/auth/confirmemail', '/auth/validateemail'];
        this.navbarService.showNavbar = !noNavbarRoutes.includes(event.urlAfterRedirects);
      });
  }
}
