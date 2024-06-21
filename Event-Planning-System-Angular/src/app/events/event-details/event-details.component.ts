import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
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
import { AddEmailsComponent } from '../../add-emails/add-emails.component';
import Swal from 'sweetalert2';
import { EditEventComponent } from '../../edit-event/edit-event.component';




@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [FormsModule, GalleriaModule, SafePipe, ImageModule, ChipModule, CardModule, CheckboxModule, ButtonModule, TabViewModule, SelectButtonModule, RouterLink, ScrollPanelModule, ScrollerModule, TabViewModule, ButtonModule, TagModule, AddEmailsComponent,EditEventComponent],
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
  // map?: google.maps.Map;
  activeLink: string = 'about';
  // constructors
  constructor(private ActivatedRoute: ActivatedRoute,
    private eventDetailsServices: EventdetailsService,
    private el: ElementRef, private renderer: Renderer2,
    private router: Router) { }

  ngAfterViewInit() {
    console.log(this.eventDetails);
    // this.initMap();
  }


  //oninit
  ngOnInit(): void {
    this.idsubscripe = this.ActivatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    //get event details
    this.getEventDetails();
  }

  ngOnDestroy(): void {
    this.idsubscripe.unsubscribe();
    this.eventsubscription.unsubscribe();
  }
  //end of constructors


  renderBackgroungImage() {
    const backgroundStyle = `linear-gradient(rgba(0, 0, 0, 0), rgba(250, 250, 250, 1)), url('${this.eventDetails?.eventImages[0] ?? this.defaultImage}')`;
    const background_size = 'cover';
    const background_position = 'center';
    const elements = this.el.nativeElement.querySelectorAll('.blur-bg-card');

    elements.forEach((element: any) => {
      this.renderer.setStyle(element, 'background', backgroundStyle);
      this.renderer.setStyle(element, 'background-size', background_size);
      this.renderer.setStyle(element, 'background-position', background_position);
    });
  }

  stateOptions: any[] = [{ label: 'About', value: 'About' }, { label: 'Discussion', value: 'Discussion' }];

  value: string = 'off';


  //delete event
  deleteEvent() {
    Swal.fire({
      title: 'Are you sure You want to delete this?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.eventDetailsServices.removeEventById(this.id).subscribe((res) => {
          this.router.navigate(['/events']);
        });
      }
    });

  }

  //get event details
  getEventDetails() {
    this.eventsubscription = this.eventDetailsServices.getEventById(this.id).subscribe({
      next: (res) => {
        this.eventDetails = res;
        if (this.eventDetails.eventImages.length === 0) {
          this.eventDetails.eventImages.push(this.defaultImage);
        }
        this.mapsURL = this.eventDetails.googleMapsLocation ? this.eventDetails.googleMapsLocation : null;
        this.renderBackgroungImage();
      },
      error: (error) => {
        // Handle error case
        console.error('Error fetching event details:', error);
        if (error.status === 400) {
          this.router.navigate(['/events']);
        } else {
          // Handle other status codes or errors if needed
          this.router.navigate(['/error']);
        }
      },
    });
  }

  // heck the data
  checkdate() {
    const currentDate = new Date();
    const eventDate = new Date(this.eventDetails.eventDate);
    return eventDate >= currentDate;
  }

  /////////////////////////////////////////////////////////////
  ///////////////////carsol related code //////////////////////
  /////////////////////////////////////////////////////////////

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
setActiveLink(link: string): void {
    this.activeLink = link;
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


  ///////////////////////////google maps////////////////////////
  // initMap(): void {
  //   const coordinates = this.parseLocation("30.885255,31.543716");
  //   if (!coordinates) {
  //     console.error('Invalid location format');
  //     return;
  //   }

  //   const mapOptions: google.maps.MapOptions = {
  //     center: coordinates,
  //     zoom: 15
  //   };

  //   this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

  //   new google.maps.Marker({
  //     position: coordinates,
  //     map: this.map
  //   });
  // }

  // parseLocation(location: string): google.maps.LatLng | null {
  //   const [lat, lng] = location.split(',').map(Number);
  //   if (!isNaN(lat) && !isNaN(lng)) {
  //     return new google.maps.LatLng(lat, lng);
  //   }
  //   return null;
  // }
  //end of class
}
