import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollerModule } from 'primeng/scroller';
import { TagModule } from 'primeng/tag';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { SafePipe } from './safe.pipe';
import { Subscription, timer } from 'rxjs';
import { EventdetailsService } from '../../shared/services/events/eventdetails.service';
import { eventTypeMapping } from '../../shared/enums/eventstype';
import { AddEmailsComponent } from '../../add-emails/add-emails.component';
import Swal from 'sweetalert2';
import { EditEventComponent } from '../../edit-event/edit-event.component';
import { ToDoListService } from '../../shared/services/to-do-list.service';
import { DataViewModule } from 'primeng/dataview';
import { EventsScheduleComponent } from '../events-schedule/events-schedule.component';
import { ToDoList } from '../../shared/models/toDoList';
import {Table, TableLazyLoadEvent, TableModule} from 'primeng/table';

import { AddtoDoListComponent } from '../../addto-do-list/addto-do-list.component';
import { EdittoDoListComponent } from '../../editto-do-list/editto-do-list.component';

import { FileSelectEvent, FileSendEvent, FileUploadEvent, FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { EventImage } from '../../shared/models/eventImage.model';
import { AccountService } from '../../shared/services/account.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { EventReqsComponent } from '../event-reqs/event-reqs.component';




@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [FormsModule, GalleriaModule, SafePipe, ImageModule, ChipModule, CardModule, CheckboxModule, ButtonModule, TabViewModule, SelectButtonModule, RouterLink, ScrollPanelModule, ScrollerModule, TabViewModule, ButtonModule, TagModule, AddEmailsComponent,EditEventComponent,DataViewModule,EventsScheduleComponent,TableModule,AddtoDoListComponent,EdittoDoListComponent,FileUploadModule,ProgressSpinnerModule,EventReqsComponent],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})

export class EventDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
// loadToDoList($event: TableLazyLoadEvent) {
// throw new Error('Method not implemented.');
// }

  // declration of variables
  checked: boolean = false;
  seeMoreLink = document.getElementById("seeMoreLink") as HTMLAnchorElement;
  text = document.getElementById("text") as HTMLPreElement;
  idsubscripe: Subscription = new Subscription();
  eventsubscription: Subscription = new Subscription();
  id: any | number;
  userId:number|any;
  isOwner:boolean = false;
  isCanceled: boolean = false;
  loading: boolean = false;
  eventDetails: Event | any = {};
  defaultImage = '../../../assets/images/software-developer-6521720_640.jpg';
  mapsURL: string | null = null;
  // map?: google.maps.Map;
  activeLink: string = 'about';
  toDoLists: ToDoList[] = [];
toDoList: any;
selectionMode: any;
displayEditModal: boolean = false;
todoTitle:string = '';
  // constructors
  constructor(private ActivatedRoute: ActivatedRoute,
    private eventDetailsServices: EventdetailsService,
    private el: ElementRef, private renderer: Renderer2,

    private router: Router,
    private toDoListService: ToDoListService,public accountService:AccountService
  ) { }

  ngAfterViewInit() {
   // console.log(this.eventDetails);
    // this.initMap();
  }


  //oninit
  ngOnInit(): void {
    this.idsubscripe = this.ActivatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    //get event details
    this.getEventDetails();
    this.userId = this.accountService.extractUserID();
    console.log(this.userId, this.id);

    this.accountService.checkOwnership(this.id,this.userId).subscribe(check=>{
      console.log(check);
      this.isOwner = check;
    });
    this.userId = this.accountService.extractUserID();
    console.log(this.userId, this.id);

    this.accountService.checkOwnership(this.id,this.userId).subscribe(check=>{
      console.log(check);
      this.isOwner = check;
    });
  }


  ngOnDestroy(): void {
    this.idsubscripe.unsubscribe();
    this.eventsubscription.unsubscribe();
  }



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
        this.isCanceled = this.eventDetails.isCanceled;
        this.isCanceled = this.eventDetails.isCanceled;
        //console.log(this.eventDetails);
        if (this.eventDetails.eventImages.length === 0) {
          this.eventDetails.eventImages.push(this.defaultImage);
        }
        this.mapsURL = this.eventDetails.googleMapsLocation ? this.eventDetails.googleMapsLocation : null;
        this.renderBackgroungImage();
      },
      error: (error) => {
        // Handle error case
        //console.error('Error fetching event details:', error);
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
    const eventDate = new Date(this.eventDetails.endDate);
    return eventDate >= currentDate;
  }

  checkEndDate() {
    const currentDate = new Date();
    const endDate = new Date(this.eventDetails.endDate);
    //console.log(currentDate, endDate);
    return currentDate > endDate;
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
    if(link === 'todolist' && this.id !== undefined){
      this.getAllToDoList();
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
    //console.log(this.mapsURL);
  }

  getEventTypeString(eventTypeInt: number): string | undefined {
    return eventTypeMapping[eventTypeInt];
  }
  

  ///////////////////////////to do list////////////////////////
  getAllToDoList() {
    this.toDoListService.getToDoList(this.id).subscribe({
      next: (res:ToDoList[]) => {
        this.toDoLists = res;
        console.log(this.toDoLists);

      },
      error: (error) => {
        console.error('Error fetching to-do list:', error);
      }
    }
    );
    
  }
  // loadToDoLists(event: any) {
  //   this.toDoList = event;
  //   this.toDoListService.getToDoList(this.id).subscribe({
  //     next: (res:ToDoList[]) => {
  //       this.toDoLists = res;
  //       console.log(this.toDoLists);
  //     },
  //     error: (error) => {
  //       console.error('Error fetching to-do list:', error);
  //     }
  //   });
  // }
  // openToDo(title: string) {
  //   this.router.navigate(['/addto-do-list', this.id, title]);
  // }
  deleteToDoList(eventId: number, name: string) {
    Swal.fire({
      title: 'Are you sure you want to delete this to-do list?',
      text: `This action cannot be undone. The list named "${name}" will be permanently removed.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6', // Customize confirm button color (optional)
      cancelButtonColor: '#d33',     // Customize cancel button color (optional)
      confirmButtonText: 'Yes, delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.toDoListService.deleteToDoList(eventId, name)
          .subscribe({
            next: (res) => {
              Swal.fire('Deleted!', 'The to-do list has been successfully deleted.', 'success');
              this.getAllToDoList();
            },
            error: (error) => {
              console.error('Error deleting to-do list:', error);
              Swal.fire('Error!', 'An error occurred while deleting the to-do list.', 'error');
            }
          });
      }
    });
  }
  //change status of to do list
  onCheckboxChange(title: string,status:boolean): void {
    this.toDoListService.updateToDoListStatus(this.id, title, status)
      .subscribe({
        next: (res) => {
          if(res){
            swal('Great Job!', 'To-do list accomplished successfully.', 'success',{timer: 3000});
          }
          else{
            swal('pending!', 'To-do list is pending now.', 'success',{timer: 3000});
          }
        },
        error: (error) => {
          console.error('Error updating to-do list status:', error);
        }
      });
  }
  openEditModal(eventId: number ,title: string) {
    this.todoTitle = title;
    this.displayEditModal = true;
  }
  
  hideEditModal() {
    this.displayEditModal = false;
    this.todoTitle = '';
  }

  getEventDuration(): string {
    const startDate = new Date(this.eventDetails.eventDate);
    const endDate = new Date(this.eventDetails.endDate);
    const options : any = { year: 'numeric', month: 'long', day: 'numeric' };
    return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
  }

  selectImage(event: FileSelectEvent): void {
    let EventImage: EventImage = {
      image: event.files[0],
      id:this.id
    }
  }

  onUpload(event: FileUploadHandlerEvent): void {
    let EventImage: EventImage = {
      image: event.files[0],
      id:this.id
    }

    this.loading = true;

    this.eventDetailsServices.UploadEventImage(EventImage).subscribe({
      next: (res) => {
        console.log(res);
        this.loading = false;
        this.getEventDetails();
      },
      error: (error) => {
        console.log(error);
      }
    });
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
