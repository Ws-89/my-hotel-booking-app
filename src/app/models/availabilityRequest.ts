export class AvailabilityRequest {
    city: string;
    numberOfRooms: number;
    partySize: number;
    from_date: Date;
    to_date: Date;

    public constructor(init?: Partial<AvailabilityRequest>) {
        Object.assign(this, init);
    }
}