import { RoomType } from "./enum/room-type.enum";


// ng g class room
export class Room {
    room_id: number;
    number: number;
    roomType: RoomType;
}
