import { Grade } from "../enum/grade-type.enum";
import { RoomType } from "../enum/room-type.enum";

export class Availability {
    availability_id: number;
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