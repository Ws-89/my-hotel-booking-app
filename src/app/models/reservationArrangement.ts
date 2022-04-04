import { Availability } from "./availability";

export class ReservationArrangement {
    partySize: number;
    numberOfRooms: number;
    reservations: Availability[] = [];
    email: string;
    confirmed: boolean;
    price: number;
}
