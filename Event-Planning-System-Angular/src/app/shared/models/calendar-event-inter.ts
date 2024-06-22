import { CalendarEvent } from 'angular-calendar';
import { Eventstype } from '../enums/eventstype';

export interface MyCalendarEvent extends CalendarEvent {
  id: number;
  description: string;
  location: string;
  attendanceNumber: number;
  googleMapsLocation: string;
  budget: number;
  eventType: Eventstype;
  emails: { email: string }[];
  eventImages: string[];
}
