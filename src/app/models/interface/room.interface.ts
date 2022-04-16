import { RoomType } from "src/app/enum/room-type.enum";

export interface RoomInterface {
    room_id: number;
    number: number;
    roomType: RoomType;
}