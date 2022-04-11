import { Availability } from "./availability";
import { AvailabilityInterface } from "./interface/availability.interface";

export class ReservationArrangement {
    partySize: number;
    numberOfRooms: number;
    reservations: Availability[] = [];
    email: string;
    confirmed: boolean;
    price: number;
}
