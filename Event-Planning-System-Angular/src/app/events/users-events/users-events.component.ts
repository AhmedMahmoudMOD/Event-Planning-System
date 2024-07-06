import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Event, EventType } from '../../shared/models/eventsListRes.model';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../shared/services/account.service';
import { UsersEventsService } from '../../shared/services/users-events.service';


@Component({
  selector: 'app-users-events',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, PaginatorModule, FormsModule],
  templateUrl: './users-events.component.html',
  styleUrl: './users-events.component.css'
})
export class UsersEventsComponent implements OnInit{
  title = 'UsersEvents';
  usersEventsList: Event[] = [];
  filteredEventList: Event[] = [];
  searchQuery: string = '';

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
        this.filteredEventList = d; // Initialize filtered list
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
  }
  onEventListUpdated(){
    this.ngOnInit();
  }

    // heck the data
    // checkdate() {
    //   const currentDate = new Date();
    //   const eventDate = new Date(this.usersEventsList.endDate);
    //   return eventDate >= currentDate;
    // }
}