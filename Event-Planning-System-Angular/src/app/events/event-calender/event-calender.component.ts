import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../../shared/services/event.service';
import { AccountService } from '../../shared/services/account.service';
import { calenderEvent } from '../../shared/models/calenderEvent';
import { MyCalendarEvent } from '../../shared/models/calendar-event-inter';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarEvent, CalendarModule, CalendarUtils } from 'angular-calendar';
import { EVENT_COLORS } from '../../shared/models/event-color'; // Import the color scheme
import { eventTypeMapping } from '../../shared/enums/eventstype';
import { Router } from '@angular/router';
import { AddEventComponent } from '../../add-event/add-event.component';

@Component({
  selector: 'app-event-calender',
  standalone: true,
  imports: [FormsModule, CommonModule, CalendarModule,AddEventComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [CalendarUtils], // Provide CalendarUtils if needed
  templateUrl: './event-calender.component.html',
  styleUrls: ['./event-calender.component.css'],
})
export class EventCalenderComponent implements OnInit, OnDestroy {
  viewDate: Date = new Date();
  events: MyCalendarEvent[] = [];
  filteredEvents: MyCalendarEvent[] = [];
  searchKeyword: string = '';
  selectedType: string = 'all';
  startDate: Date | undefined;
  endDate: Date | undefined;
  eventTypes: string[] = ['all', 'Wedding', 'Birthday', 'Corporate', 'Social', 'Other'];
  id: number = 0;
  idSubscription: Subscription | null = null;

  constructor(private eventService: EventService, private accountService: AccountService,private router:Router) { }

  ngOnInit(): void {
    this.fetchEvents();
  }

  ngOnDestroy(): void {
    this.idSubscription?.unsubscribe();
  }

  fetchEvents(): void {
    this.id = Number.parseInt(this.accountService.extractUserID());
    this.idSubscription = this.eventService.getEventsByUser(this.id).subscribe((events: calenderEvent[]) => {
      console.log(events);

      this.events = events.map(event => {
        const isPast = new Date(event.endDate) < new Date();
        const color = EVENT_COLORS[eventTypeMapping[parseInt(event.eventType)]] || EVENT_COLORS['Other'];
        return {
          id: event.id,
          start: new Date(event.eventDate),
          end: new Date(event.endDate),
          title: event.name,
          color: {
            primary:  color.primary,
            secondary: color.secondary
          },
          draggable: false,
          resizable: {
            beforeStart: false,
            afterEnd: false
          },
          allDay: false,
          description: event.description,
          location: event.location,
          attendanceNumber: event.attendanceNumber,
          googleMapsLocation: event.googleMapsLocation,
          budget: event.budget,
          eventType: event.eventType,
          emails: event.emails,
          eventImages: event.eventImages
        };
      });
      this.filteredEvents = this.events;
    });
  }

  lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = (num >> 8 & 0x00FF) + amt,
      B = (num & 0x0000FF) + amt;
    return "#" + (
      0x1000000 +
      (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1);
  }

  goToPreviousMonth(): void {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() - 1));
  }

  goToNextMonth(): void {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() + 1));
  }

  filterEvents(): void {
    this.filteredEvents = this.events.filter(event => {
      const matchesKeyword = event.title.toLowerCase().includes(this.searchKeyword.toLowerCase());
      const matchesType = this.selectedType === 'all' || eventTypeMapping[parseInt(event.eventType)] === this.selectedType;

      // Filter by date range
      const matchesDateRange = (!this.startDate || (event.start && new Date(event.start).getDate() >= new Date(this.startDate).getDate()))
                            &&(!this.endDate || (event.end && new Date(event.end).getDate() <= new Date(this.endDate).getDate()))
                            &&(!this.startDate || (event.start && new Date(event.start).getMonth() == new Date(this.startDate).getMonth()))
                            &&(!this.endDate || (event.end && new Date(event.end).getMonth() == new Date(this.endDate).getMonth()));

      return matchesKeyword && matchesType && matchesDateRange;
    });
  }
  eventDetails(event:CalendarEvent):void{
    console.log("Clicked"+ event.id);
    this.router.navigate(['/planner/eventdetails/',event.id]);
  }
}
