export interface Event {
    name: string;
    description: string;
    location: string;
    attendanceNumber: number;
    googleMapsLocation: string;
    budget: number;
    eventType: number;
    eventDate: string;
  }
  
export  interface EventListRes {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasPrevious: boolean;
    hasNext: boolean;
    events: Event[];
  }
  