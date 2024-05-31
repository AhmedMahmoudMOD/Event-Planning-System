import { Eventstype } from "../enums/eventstype";
import { eventTypes } from "./eventTypes";

export interface Event {
    name:string;
    description:string | null;
    location:string | null;
    attendanceNumber:string | null;
    googleMapsLocation : string | null;
    budget : number | null;
    eventType : Eventstype;
    eventDate : string;
    emails : string[] | null;
    eventImages: string[] | null;
}
