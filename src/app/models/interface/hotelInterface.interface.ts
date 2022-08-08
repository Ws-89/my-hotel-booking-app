import { Grade } from "src/app/enum/grade-type.enum";
import { AddressInterface } from "./address.interface";
import { ContactInterface } from "./contact.interface";
import { RoomInterface } from "./room.interface";

export interface HotelInterface {
    hotelId: number;
    name: string;
    address: AddressInterface
    grade: Grade;
    rooms: Array<RoomInterface>;
    image: string;
    contact: ContactInterface;
    enabled: boolean;
}