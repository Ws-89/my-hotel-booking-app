import { Grade } from "../enum/grade-type.enum";
import { RoomType } from "../enum/room-type.enum";

export interface Reservation {
    hotel_id: number;
    hotel_name: string;
    city: string;
    grade: Grade;
    image: string;
    room_id : number;
    roomType: RoomType;
    from_date: Date;
    to_date: Date;
    price: number;
}
