import { Grade } from "src/app/enum/grade-type.enum";
import { AvailableRoomInterface } from "./availableRoom.interface";

export interface AvailableHotelInterface {
    hotel_id: number;
    hotel_name: string;
    city: string;
    grade: Grade;
    rooms: Array<AvailableRoomInterface>;
}