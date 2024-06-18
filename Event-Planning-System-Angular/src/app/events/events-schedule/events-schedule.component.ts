import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule, PagerModule } from '@syncfusion/ej2-angular-grids';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { EventSettingsModel, TimeScaleModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService, View, ScheduleModule, TimelineMonthService, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { extend } from '@syncfusion/ej2-base';


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
  public readonly: boolean = false;
  minValidation: (args: { [key: string]: string }) => boolean = (args: { [key: string]: string }) => {
    return args['value'].length >= 5;
  };
  public timeScale: TimeScaleModel = { enable: true, interval: 60, slotCount: 3 };
  public scheduleObj?: ScheduleComponent;
  public weekFirstDay: number = 6;
  public timezone: string = 'Africa/Cairo';
  public selectedDate: Date = new Date(2024, 6, 16);
  public currentView: View = 'Week';

  //////////////////constructors/////////////////////
  constructor(private ActivatedRoute: ActivatedRoute) { }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
  }
  /////////////////////end of constructors/////////////////////
  /////////////////////data source//////////////////////////
  public data: object[] = [{
    id: 1,
    eventName: 'Meeting',
    location: 'Paris',
    startTime: new Date(2024, 6, 16, 10, 0),
    endTime: new Date(2024, 6, 16, 12, 39),
    isAllDay: false,
    description: "Meeting with the team"
  },
  {
    id: 2,
    eventName: 'Meeting',
    location: 'cairo',
    startTime: new Date(2024, 6, 16, 13, 0),
    endTime: new Date(2024, 6, 16, 14, 39),
    isAllDay: false,
    description: "Meeting with the team"
  }];

  //////////////////////////////configuration//////////////////////////
  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    fields: {
      id: 'id',
      subject: { name: 'eventName', validation: { required: true } },
      location: { name: 'location' },
      isAllDay: { name: 'isAllDay' },
      startTime: { name: 'startTime', validation: { required: true } },
      endTime: { name: 'endTime', validation: { required: true } },
      description: { name: 'description', validation: { required: true, minLength: [this.minValidation, 'Need atleast 5 letters to be entered'] } }
    }
  };

  //scroll to the current time
  onCreated(eventData: any): void {
    let currTime: Date = new Date();
    let hours: string = currTime.getHours() < 10 ? '0' + currTime.getHours().toString() : currTime.getHours().toString();
    let minutes: string = currTime.getMinutes().toString();
    let time: string = hours + ':' + minutes;
    this.scheduleObj?.scrollTo(time);
  }

}
