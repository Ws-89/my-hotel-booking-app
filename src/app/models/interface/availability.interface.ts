import { Grade } from "src/app/enum/grade-type.enum";
import { RoomType } from "src/app/enum/room-type.enum";


export interface AvailabilityInterface {
    availability_id: number;
    hotel_id: number;
    hotel_name: string;
    city: string;
    grade: Grade;
    room_id: number;
    description: string;
    roomType: RoomType;
    room_group_id: number;
    from_date: Date;
    to_date: Date;
    price: number;
    image: string;
}