
import { AddressInterface } from "./interface/address.interface";
import { RoomInterface } from "./interface/room.interface";

export class Reservation {
    reservationId: number;
    partySize: number;
    numberOfRooms: number;
    room: RoomInterface;
    email: string;
    endDate: Date;
    startDate: Date;
    price: number;
    guestName: string;
    guestLastName: string;
    requestMessage: string;
    guestAddress: AddressInterface;
}