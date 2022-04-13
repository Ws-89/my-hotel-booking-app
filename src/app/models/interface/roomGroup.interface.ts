import { RoomType } from "src/app/enum/room-type.enum";
import { RoomInterface } from "./room.interface";

export interface RoomGroupInterface {
    room_group_id: number;
    rooms: RoomInterface[];
    description: string;
    roomType: RoomType;
    quantity_of_rooms: number;
}