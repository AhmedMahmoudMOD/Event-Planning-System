import { CommonModule } from '@angular/common';
import { Component , OnInit } from '@angular/core';
import { Event , EventListRes } from "../../shared/models/eventsListRes.model";
import { EventService } from "../../shared/services/event.service";
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api';


@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule,TableModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent{
  eventList: Event[]  = [];
  total : number = 0;
  loading : boolean = false;

  constructor(private eventService: EventService) {}

  loadEvents(event:TableLazyLoadEvent) {
    this.loading = true;
    console.log(event);
    let pageNum = event.first! / event.rows! + 1;
    // Example: Accessing a specific filter value
    this.eventService.getEvents(pageNum,event.rows??3,"").subscribe((res: EventListRes) => {
      console.log(res);
      this.loading = false;
      this.eventList = res.events;
      this.total = res.totalCount;
    });
  }

}
