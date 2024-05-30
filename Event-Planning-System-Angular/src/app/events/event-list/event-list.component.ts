import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Event, EventType } from '../../shared/models/eventsListRes.model';
import { EventService } from '../../shared/services/event.service';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api';
import { RouterLink, RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { EventListService } from '../../shared/services/event-list.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule


@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, TableModule, RouterModule, RouterLink, PaginatorModule, FormsModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  eventList: Event[] = [];
  filteredEventList: Event[] = [];
  searchQuery: string = '';

  constructor(private eventListService: EventListService) {}

  ngOnInit(): void {
    this.eventListService.getAll(1).subscribe({
      next: d => {
        this.eventList = d;
        this.filteredEventList = d; // Initialize filtered list
      }
    });
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
  }
}
