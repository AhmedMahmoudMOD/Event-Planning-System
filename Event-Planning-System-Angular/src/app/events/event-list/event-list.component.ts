import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Event, EventType } from '../../shared/models/eventsListRes.model';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { EventListService } from '../../shared/services/event-list.service';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, PaginatorModule, FormsModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  eventList: Event[] = [];
  filteredEventList: Event[] = [];
  searchQuery: string = '';

  constructor(private eventListService: EventListService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.eventListService.getAll(1).subscribe({
      next: d => {
        this.eventList = d;
        this.filteredEventList = d; // Initialize filtered list
      }
    });
    document.body.classList.add('event-list-body') // Add class to body
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
  }
}
