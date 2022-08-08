import { HotelInterface } from "./hotelInterface.interface";

export interface AvailabilityResponse {
    city: string;
    numberOfRooms: number;
    partySize: number;
    startDate: Date;
    endDate: Date;
    data : { availableHotels?: HotelInterface[], availableHotel?: HotelInterface };
}