import { Grade } from "src/app/enum/grade-type.enum";
import { AvailableRoomInterface } from "./availableRoom.interface";

export interface HotelInterface {
    hotelId: number;
    hotelName: string;
    city: string;
    grade: Grade;
    rooms: Array<AvailableRoomInterface>;
    image: string;
    street: string;
    state: string;
    country: string;
    zipcode: string;
    phoneNumber: string;
    email: string;
    
}