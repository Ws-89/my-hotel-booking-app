import { RoomType } from "src/app/enum/room-type.enum";

export interface RoomGroupInterface {
    roomGroupId: number;
    rooms: Number[];
    description: string;
    roomType: RoomType;
    quantityOfRooms: number;
}