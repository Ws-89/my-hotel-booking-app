import { AvailableHotelInterface } from "./availableHotelInterface.interface";

export interface ReservationStateInterface {
    partySize: number;
    numberOfRooms: number;
    email: string;
    price: number;
    hotels: AvailableHotelInterface[];
    from_date: Date;
    to_date: Date;
}