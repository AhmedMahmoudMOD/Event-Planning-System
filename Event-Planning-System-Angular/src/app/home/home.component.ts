import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { EventImage } from '../shared/models/eventImage.model';
import { EventListService } from '../shared/services/event-list.service';
import { AccountService } from '../shared/services/account.service';
import { Event, EventType } from '../shared/models/eventsListRes.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CarouselModule, ButtonModule, TagModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    eventImages: EventImage[] = [];
    eventList: Event[] = [];
    responsiveOptions: any[] | undefined;

    constructor(
        private eventlistImage: EventListService, 
        private accountService: AccountService, 
        private eventListService: EventListService,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit() {
      const userId = +this.accountService.extractUserID();
      this.eventListService.getAll(userId).subscribe({
        next: d => {
          this.eventList = d;
        }
      });

      this.responsiveOptions = [
          {
              breakpoint: '1199px',
              numVisible: 1,
              numScroll: 1
          },
          {
              breakpoint: '991px',
              numVisible: 2,
              numScroll: 1
          },
          {
              breakpoint: '767px',
              numVisible: 1,
              numScroll: 1
          }
      ];
    }

    getEventTypeLabel(type: EventType): string {
        return EventType[type];
    }

    getSeverity(eventType: EventType): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
        switch (eventType) {
            case EventType.Wedding:
                return 'success';
            case EventType.Birthday:
                return 'warning';
            case EventType.Corporate:
                return 'info';
            case EventType.Social:
                return 'danger';
            case EventType.Other:
            default:
                return undefined;
        }
    }

    getEventImageUrl(eventImage: EventImage | null): SafeUrl {
      if (eventImage && eventImage.image) {
          return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(eventImage.image));
      } else {
          return 'assets/images/software-developer-6521720_640.jpg'; // Path to your default image
      }
  }
}