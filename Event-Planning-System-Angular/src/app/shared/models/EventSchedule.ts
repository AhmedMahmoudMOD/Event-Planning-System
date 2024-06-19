export interface EventSchedule {
    id: number;
    subject: string;
    startTime: Date;
    endTime: Date;
    isAllDay: boolean;
    startTimezone: string;
    endTimezone: string;
    recurrenceRule: string;
    recurrenceID: number;
    recurrenceException: string;
}