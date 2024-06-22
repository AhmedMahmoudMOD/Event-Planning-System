import { Eventstype } from "../enums/eventstype";

export interface calenderEvent {
    id: number;
    name: string;
    description: string;
    location: string;
    attendanceNumber: number;
    googleMapsLocation: string;
    budget: number;
    eventType: Eventstype;
    eventDate: string; 
    endDate: string; 
    emails: { email: string }[];
    eventImages: string[];
  }
  