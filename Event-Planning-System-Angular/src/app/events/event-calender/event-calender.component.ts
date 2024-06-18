import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../../shared/services/event.service';
import { AccountService } from '../../shared/services/account.service';
import { calenderEvent } from '../../shared/models/calenderEvent';
import { MyCalendarEvent } from '../../shared/models/calendar-event-inter';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule, CalendarUtils } from 'angular-calendar';

@Component({
  selector: 'app-event-calender',
  standalone: true,
  imports: [FormsModule, CommonModule, CalendarModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [CalendarUtils], // Provide CalendarUtils if needed
  templateUrl: './event-calender.component.html',
  styleUrls: ['./event-calender.component.css'],
})
export class EventCalenderComponent implements OnInit,OnDestroy{
  viewDate: Date = new Date();
  events: MyCalendarEvent[] = [];
  filteredEvents: MyCalendarEvent[] = [];
  searchKeyword: string = '';
  selectedGroup: string = 'all';
  selectedType: string = 'all';
  eventDate: string = '';
  eventTypes: string[] = ['all', 'Wedding', 'Birthday', 'Corporate', 'Social','Other'];
  id: number = 0;
  idSunbscription: Subscription|null = null;

  constructor(private eventService: EventService, private accountService:AccountService) { }
  
  ngOnInit(): void {
    this.fetchEvents();
  }
  ngOnDestroy(): void {
    this.idSunbscription?.unsubscribe();
  }

  fetchEvents(): void {
    this.id = 1//Number.parseInt(this.accountService.extractUserID());
    this.idSunbscription= this.eventService.getEventsByUser(this.id).subscribe((events: calenderEvent[]) => {
      this.events = events.map(event => ({
        id: event.id,
        start: new Date(event.eventDate),
        end: new Date(event.endDate),
        title: event.name,
        color: {
          primary: '#ad2121', // Default color, you can set based on eventType
          secondary: '#FAE3E3'
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
      }));
      this.filteredEvents = this.events;
    });
  }

  goToPreviousMonth(): void {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() - 1));
  }
  
  goToNextMonth(): void {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() + 1));
  }

  filterEvents(): void {
    this.filteredEvents = this.events.filter(event => {
      const matchesDate = this.eventDate ? new Date(event.start).toDateString() === new Date(this.eventDate).toDateString() : true;
      const matchesKeyword = event.title.toLowerCase().includes(this.searchKeyword.toLowerCase());
      // const matchesGroup = this.selectedGroup === 'all' || event.title.toLowerCase().includes(this.selectedGroup.toLowerCase());
      const matchesType = this.selectedType === 'all' || event.title.toLowerCase().includes(this.selectedType.toLowerCase());
      return matchesDate && matchesKeyword  && matchesType;
    });
  }
}