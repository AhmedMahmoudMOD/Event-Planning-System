import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollerModule } from 'primeng/scroller';
import { TagModule } from 'primeng/tag';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { SafePipe } from './safe.pipe';
import { Subscription } from 'rxjs';
import { EventdetailsService } from '../../shared/services/events/eventdetails.service';
import { eventTypeMapping } from '../../shared/enums/eventstype';




@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [FormsModule, GalleriaModule, SafePipe, ImageModule, ChipModule, CardModule, CheckboxModule, ButtonModule, TabViewModule, SelectButtonModule, RouterLink, ScrollPanelModule, ScrollerModule, TabViewModule, ButtonModule, TagModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})



export class EventDetailsComponent implements OnInit, OnDestroy, AfterViewInit {

  // declration of variables
  checked: boolean = false;
  seeMoreLink = document.getElementById("seeMoreLink") as HTMLAnchorElement;
  text = document.getElementById("text") as HTMLPreElement;
  idsubscripe: Subscription = new Subscription();
  eventsubscription: Subscription = new Subscription();
  id: any | number;
  eventDetails: Event | any = {};
  defaultImage = '../../../assets/images/software-developer-6521720_640.jpg';
  mapsURL: string | null = null;
  // constructors
  constructor(private ActivatedRoute: ActivatedRoute,
    private eventDetailsServices: EventdetailsService,
    private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    const backgroundStyle = `linear-gradient(rgba(0, 0, 0, 0), rgba(250, 250, 250, 1)), url('${this.eventDetails.eventImages[0]}')`;
    const background_size = 'cover';
    const background_position = 'center';
    const elements = this.el.nativeElement.querySelectorAll('.blur-bg-card');

    elements.forEach((element: any) => {
      this.renderer.setStyle(element, 'background', backgroundStyle);
      this.renderer.setStyle(element, 'background-size', background_size);
      this.renderer.setStyle(element, 'background-position', background_position);
    });
  }



  ngOnInit(): void {
    this.idsubscripe = this.ActivatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });

    this.eventsubscription = this.eventDetailsServices.getEventById(this.id).subscribe((res) => {
      this.eventDetails = res;
      if (this.eventDetails.eventImages.length === 0) {
        this.eventDetails.eventImages.push(this.defaultImage);
      }
      this.mapsURL = this.eventDetails.googleMapsLocation ? this.eventDetails.googleMapsLocation : null;
      console.log(this.eventDetails);
    });

    console.log(this.id);
  }

  //destroy
  ngOnDestroy(): void {
    this.idsubscripe.unsubscribe();
    this.eventsubscription.unsubscribe();
  }
  //end of constructors

  reset() {
  }

  stateOptions: any[] = [{ label: 'About', value: 'About' }, { label: 'Discussion', value: 'Discussion' }];

  value: string = 'off';


  //carsol related code





  getSeverity(status: string): any {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
  }


  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  //end of carsol related code




  //iFrame related code
  positionMap = {
    street: "Brookline",
    num: "123",
    city: "NewYork"
  };

  //end of iFrame related code

  log(): any {
    console.log(this.mapsURL);
  }

  getEventTypeString(eventTypeInt: number): string | undefined {
    return eventTypeMapping[eventTypeInt];
  }
  //end of class
}
