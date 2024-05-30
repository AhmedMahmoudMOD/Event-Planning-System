import { CommonModule } from '@angular/common';
import { Component , OnInit } from '@angular/core';
import { Event, EventType } from "../../shared/models/eventsListRes.model";
import { EventService } from "../../shared/services/event.service";
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api';
import { RouterLink, RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { EventListService } from '../../shared/services/event-list.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule,TableModule, RouterModule, RouterLink, PaginatorModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit{
  eventList: Event[]  = [];
  constructor(private eventListService: EventListService) {}

  ngOnInit(): void { 
    this.eventListService.getAll(1).subscribe({next: d=>{
      this.eventList = d;
    }});
  }

  getEventTypeLabel(type: EventType): string {
        return EventType[type]; // Convert enum value to string
    }
}
