export enum Eventstype {
Wedding = "Wedding",
Birthday = "Birthday",
Corporate = "Corporate", 
Social = "Social",
Other  = "Other",
}

export const eventTypeMapping: { [key: number]: Eventstype } = {
    0: Eventstype.Wedding,
    1: Eventstype.Birthday,
    2: Eventstype.Corporate,
    3: Eventstype.Social,
    4: Eventstype.Other,
};
