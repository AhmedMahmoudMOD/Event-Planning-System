import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Event, EventType } from '../../shared/models/eventsListRes.model';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../shared/services/account.service';
import { UsersEventsService } from '../../shared/services/users-events.service';
import { TagModule } from 'primeng/tag';
import { event } from 'jquery';




@Component({
  selector: 'app-users-events',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, PaginatorModule, FormsModule,PaginatorModule,TagModule],
  templateUrl: './users-events.component.html',
  styleUrl: './users-events.component.css'
})
export class UsersEventsComponent implements OnInit{

  title = 'UsersEvents';
  usersEventsList: Event[] = [];
  filteredEventList: Event[] = [];
  paginatedEventList: Event[] = [];
  searchQuery: string = '';
  first: number  = 0;
  rows: number = 5;

  constructor(private usersEventsService: UsersEventsService, private route: ActivatedRoute,private accountService:AccountService) {}

  ngOnInit(): void {
    this.getAllUsersEvents();
    document.body.classList.add('event-list-body') // Add class to body
  }

  getAllUsersEvents() {
    const userId = + this.accountService.extractUserID();
    this.usersEventsService.getAllUsersEvents(userId).subscribe({
      next: d => {
        this.usersEventsList = d;
        this.filteredEventList = d; 
        this.paginateEvents();
      }
    });
   
  }

  ngOnDestroy(): void {
    document.body.classList.remove('event-list-body'); // Remove class from body
  }

  getEventTypeLabel(type: EventType): string {
    return EventType[type]; // Convert enum value to string
  }

  // Event Search
  onSearch() {
    const query = this.searchQuery.toLowerCase();
    this.filteredEventList = this.usersEventsList.filter(event =>
      event.name.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query)
    );
    this.paginateEvents();
  }
  onEventListUpdated(){
    this.ngOnInit();
  }

  onPageChange($event: PaginatorState) {
    this.first = $event.first?.valueOf() || 0;
    this.rows = $event.rows?.valueOf() || 5;
    this.paginateEvents();

    }

    paginateEvents() {
      console.log(this.first, this.rows);
      
      this.paginatedEventList = this.filteredEventList.slice(this.first, this.first + this.rows);
    }

    getStatus(event: Event): string | undefined {
      const currentDate = new Date();
      const eventDate = new Date(event.eventDate);
      const endDate = new Date(event.endDate);
  
      if (eventDate > currentDate) {
        return 'Upcoming'; // Event is upcoming
      } else if (currentDate >= eventDate && currentDate <= endDate) {
        return 'Ongoing'; // Event is ongoing
      } else if (currentDate > endDate) {
        return 'Finished'; // Event is finished
      } else {
        return undefined;
      }
    }

    getSeverity(event: Event){
      const currentDate = new Date();
      const eventDate = new Date(event.eventDate);
      const endDate = new Date(event.endDate);
  
      if (eventDate > currentDate) {
        return 'info'; // Event is upcoming
      } else if (currentDate >= eventDate && currentDate <= endDate) {
        return 'success'; // Event is ongoing
      } else if (currentDate > endDate) {
        return 'danger'; // Event is finished
      } else {
        return undefined;
      }
    }



    
}
