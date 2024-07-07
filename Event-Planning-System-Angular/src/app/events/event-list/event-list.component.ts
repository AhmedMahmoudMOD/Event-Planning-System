import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Event, EventType } from '../../shared/models/eventsListRes.model';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { EventListService } from '../../shared/services/event-list.service';
import { FormsModule } from '@angular/forms';
import { AddEventComponent } from '../../add-event/add-event.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { AccountService } from '../../shared/services/account.service';


@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, PaginatorModule, FormsModule,AddEventComponent,SidebarComponent,PaginatorModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  title = 'Events';
  eventList: Event[] = [];
  filteredEventList: Event[] = [];
  paginatedEventList: Event[] = [];
  searchQuery: string = '';
  first: number  = 0;
  rows: number = 5;

  constructor(private eventListService: EventListService, private route: ActivatedRoute,private accountService:AccountService) {}

  ngOnInit(): void {
    this.getAllEvents();
    document.body.classList.add('event-list-body') // Add class to body
  }

  getAllEvents() {
    const id = + this.accountService.extractUserID();
    this.eventListService.getAll(id).subscribe({
      next: d => {
        this.eventList = d;
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
    this.filteredEventList = this.eventList.filter(event =>
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


}


