import { eventTypes } from "./eventTypes";

export interface Event {
    name: string;
    description: string;
    location: string;
    attendanceNumber: number;
    googleMapsLocation: string;
    budget: number;
    eventType: EventType;
    eventDate: string;
    endDate: string;
    id: number;
  }

export  interface EventListRes {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasPrevious: boolean;
    hasNext: boolean;
    events: Event[];
  }

  export enum EventType {
    Wedding,
    Birthday,
    Corporate,
    Social,
    Other,
}
