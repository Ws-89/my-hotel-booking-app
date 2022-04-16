
import { AvailabilityInterface } from "./interface/availability.interface";

export class ReservationArrangement {
    partySize: number;
    numberOfRooms: number;
    reservations: AvailabilityInterface[] = [];
    email: string;
    confirmed: boolean;
    price: number;
}
