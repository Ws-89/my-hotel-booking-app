import { Grade } from "src/app/enum/grade-type.enum";
import { RoomType } from "src/app/enum/room-type.enum";

export interface AvailableRoomInterface {
    hotel_id: number;
    hotel_name: string;
    city: string;
    grade: Grade;
    room_id: number;
    roomType: RoomType;
    from_date: Date;
    to_date: Date;
    price: number;
}