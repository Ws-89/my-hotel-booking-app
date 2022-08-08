import { Reservation } from "../reservation";
import { AddressInterface } from "./address.interface";

export interface Guest {
    guestId: number;
    firstName: string;
    lastName: string;
    email: string;
    reservations: Reservation[];
    address: AddressInterface;
    phoneNumber: number;
}