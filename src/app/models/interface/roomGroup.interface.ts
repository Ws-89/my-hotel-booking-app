import { RoomType } from "src/app/enum/room-type.enum";

export interface RoomGroupInterface {
    room_group_id: number;
    rooms: Number[];
    description: string;
    roomType: RoomType;
    quantity_of_rooms: number;
}