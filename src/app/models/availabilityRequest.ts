export class AvailabilityRequest {
    city: string;
    roomAmmount: number;
    partySize: number;
    from_date: Date;
    to_date: Date;

    public constructor(init?: Partial<AvailabilityRequest>) {
        Object.assign(this, init);
    }
}