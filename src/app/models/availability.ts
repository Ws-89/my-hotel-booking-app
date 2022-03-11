import { Grade } from "../enum/grade-type.enum";
import { RoomType } from "../enum/room-type.enum";

export interface Availability {
    hotel_id: number;
    hotel_name: string;
    city: string;
    grade: Grade;
    room_id: number;
    roomType: RoomType;
    reservation_id: number;
    from_date: Date;
    to_date: Date;
    price: number;
}