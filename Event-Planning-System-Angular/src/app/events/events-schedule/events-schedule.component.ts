import { Component, Input, OnDestroy, OnInit, ViewChild, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule, PagerModule } from '@syncfusion/ej2-angular-grids';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { EventSettingsModel, TimeScaleModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService, View, ScheduleModule, TimelineMonthService, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { extend, Ajax } from '@syncfusion/ej2-base';
import { Subscription } from 'rxjs';
import { DataManager, ODataV4Adaptor, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { EventdetailsService } from '../../shared/services/events/eventdetails.service';
import { EventSchedule } from '../../shared/models/EventSchedule';
import { CustomODataV4Adaptor } from './custom-adaptor';
import Swal from 'sweetalert2';
// import { CustomUrlAdaptor } from './customUrl-adaptor';



@Component({
  selector: 'app-events-schedule',
  standalone: true,
  imports: [GridModule, PagerModule, CommonModule, RouterOutlet, ScheduleModule],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, TimelineMonthService],
  templateUrl: './events-schedule.component.html',
  styleUrl: './events-schedule.component.css'
})
export class EventsScheduleComponent implements OnInit, OnDestroy {


  public showWeekend: boolean = false;
  @Input() public readonly: boolean = false;
  minValidation: (args: { [key: string]: string }) => boolean = (args: { [key: string]: string }) => {
    return args['value'].length >= 5;
  };
  public timeScale: TimeScaleModel = { enable: true, interval: 60, slotCount: 3 };

  public weekFirstDay: number = 6;
  public timezone: string = 'Africa/Cairo';
  public selectedDate: Date = new Date(2024, 4, 16);
  public currentView: View = 'Week';
  idsubscripe: Subscription = new Subscription();
  id: any | number;
  private dataManager: DataManager = new DataManager();
  public eventScheduledata: EventSchedule[] = [];
  public temp = false;
  @ViewChild("scheduleObj") scheduleObj?: ScheduleComponent;
  public event?: Event;
  public eventobj: any;
  public allowedDays: number[] = [];



  /////////configering eventsetting/////////////////////
  public fields: any = {
    id: { name: 'id' },
    subject: { name: 'subject', validation: { required: true } },
    location: { name: 'location' },
    isAllDay: { name: 'isAllDay' },
    startTime: { name: 'startTime', validation: { required: true } },
    endTime: { name: 'endTime', validation: { required: true } },
    description: { name: 'description', validation: { required: true, minLength: [this.minValidation, 'Need atleast 5 letters to be entered'] } }
  }
  public eventSettings: EventSettingsModel = {
    dataSource: this.eventScheduledata,
    fields: this.fields,
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true
  };

  //////////////////constructors/////////////////////
  constructor(private ActivatedRoute: ActivatedRoute, private eventservice: EventdetailsService) { }

  ngOnDestroy(): void {
    this.idsubscripe.unsubscribe();
  }

  ngOnInit(): void {
    this.idsubscripe = this.ActivatedRoute.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.idsubscripe = this.eventservice.getEventById(this.id).subscribe({
      next: data => {
        this.event = data;
        this.eventobj = JSON.parse(JSON.stringify(this.event));
        this.selectedDate = new Date(this.eventobj.eventDate);
      }
    });

    this.GettingAllData(this.id);

  }

  /////////////////////end of constructors/////////////////////

  //////////////////////////services functions ////////////////////////




  //getting all the data from the server
  GettingAllData(id: number) {

    // const ajax = new Ajax(
    //   `http://localhost:5006/api/EventSchedule/${id}`,
    //   "GET"
    // );
    // ajax.send();
    // ajax.onSuccess = (data: string) => {
    //   this.eventSettings = {
    //     dataSource: JSON.parse(data),
    //     fields: this.fields
    //   };
    //   console.log(JSON.parse(data));
    // }

    this.idsubscripe = this.eventservice.getEventScheduleById(id).subscribe({
      next: data => {
        this.eventScheduledata = data.map(event => ({
          ...event,
          startTime: new Date(event.startTime),
          endTime: new Date(event.endTime)
        }));
        this.eventSettings = {
          dataSource: this.eventScheduledata,
          fields: this.fields,
          allowAdding: true,
          allowEditing: true,
          allowDeleting: true

        };
        console.log(this.eventScheduledata);
      }
    })
  }

  CreateNewEvent(args: any) {
    // this.temp = true;
    // const ajax = new Ajax(
    //   `http://localhost:5006/api/EventSchedule/Add/${this.id}`,
    //   'POST',
    //   false
    // );
    // ajax.data = JSON.stringify(args.data);
    // ajax.send();
    // ajax.onSuccess = (data: any) => {
    //   this.eventSettings = {
    //     dataSource: JSON.parse(data),
    //     fields: this.fields
    //   };
    //   console.log("success");
    // };

    this.idsubscripe = this.eventservice.AddeventSchedule(this.id, args.data[0]).subscribe({
      next: data => {
        this.eventScheduledata = data.map(event => ({
          ...event,
          startTime: new Date(event.startTime),
          endTime: new Date(event.endTime)
        }));
        this.eventSettings = {
          dataSource: this.eventScheduledata,
          fields: this.fields
        };
      }
    })

  }
  DeleteEvent(args: any) {
    this.idsubscripe = this.eventservice.DeleteEventSchedule(this.id, args.data[0]).subscribe({
      next: data => {
        this.eventScheduledata = data.map(event => ({
          ...event,
          startTime: new Date(event.startTime),
          endTime: new Date(event.endTime)
        }));
        this.eventSettings = {
          dataSource: this.eventScheduledata,
          fields: this.fields
        };
      }
    })
  }

  UpdateEvent(args: any) {
    this.idsubscripe = this.eventservice.UpdateEventSchedule(this.id, args.data).subscribe({
      next: data => {
        this.eventScheduledata = data.map(event => ({
          ...event,
          startTime: new Date(event.startTime),
          endTime: new Date(event.endTime)
        }));
        this.eventSettings = {
          dataSource: this.eventScheduledata,
          fields: this.fields
        };
        console.log(this.eventScheduledata);
      }
    });
  }

  onBinding(args: any): void { }

  onBegin(args: any) {


    if (args.requestType === 'eventCreate') {
      const startDate = new Date(this.eventobj.eventDate);
      const endDate = new Date(this.eventobj.endDate);

      const eventStart = args.data.StartTime || args.data[0].startTime;
      const eventEnd = args.data.EndTime || args.data[0].endTime;

      if (eventStart < startDate || eventEnd > endDate) {
        args.cancel = true;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Events can only be added or edited between${this.formatDate(startDate)} and ${this.formatDate(endDate)}`
        });
        return;
      }
    }

    if (args.requestType === 'eventCreate') {
      console.log(args.data);
      this.CreateNewEvent(args);
    }
    else if (args.requestType === 'eventChange') {
      console.log(args.data);
      this.scheduleObj?.closeEditor();
      this.UpdateEvent(args);
    }
    else if (args.requestType === 'eventRemove') {
      console.log(args.data[0]);
      this.DeleteEvent(args);
    }
  }

  /////////////////////data source//////////////////////////
  public data: object[] = [{
    id: 1,
    eventName: 'Meeting',
    location: 'Paris',
    startTime: new Date(2024, 4, 16, 10, 0),
    endTime: new Date(2024, 4, 16, 12, 39),
    isAllDay: false,
    description: "Meeting with the team"
  },
  {
    id: 2,
    eventName: 'Meeting',
    location: 'cairo',
    startTime: new Date(2024, 5, 16, 13, 0),
    endTime: new Date(2024, 5, 16, 14, 39),
    isAllDay: false,
    description: "Meeting with the team"
  }];

  //////////////////////////////configuration//////////////////////////


  //scroll to the current time
  onCreated(eventData: any): void {
    let currTime: Date = new Date();
    let hours: string = currTime.getHours() < 10 ? '0' + currTime.getHours().toString() : currTime.getHours().toString();
    let minutes: string = currTime.getMinutes().toString();
    let time: string = hours + ':' + minutes;
    this.scheduleObj?.scrollTo(time);
  }


  //////////fiels /////////////////////


  ////////////////form date//////////////////////
  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
