import { Eventstype } from "../enums/eventstype";
import { eventTypes } from "./eventTypes";

export interface Event {
    name: string;
    description: string | null;
    location: string | null;
    attendanceNumber: string | null;
    googleMapsLocation: string | null;
    budget: number | null;
    eventType: Eventstype;
    eventDate: string;
    emails: Email[] | null;
    eventImages: string[] | null;
    endDate: string;
    isDeleted: boolean;

}

export interface Email {
    email: string;
}
