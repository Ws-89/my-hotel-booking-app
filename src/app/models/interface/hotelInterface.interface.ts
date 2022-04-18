import { Grade } from "src/app/enum/grade-type.enum";
import { AvailabilityInterface } from "./availability.interface";

export interface HotelInterface {
    hotelId: number;
    hotelName: string;
    city: string;
    grade: Grade;
    rooms: Array<Partial<AvailabilityInterface>>;
    image: string;
    street: string;
    state: string;
    country: string;
    zipCode: string;
    phoneNumber: string;
    email: string;
    
}