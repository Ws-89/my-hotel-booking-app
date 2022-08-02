import { RoomType } from "src/app/enum/room-type.enum";

export interface RoomInterface {
    roomId: number;
    description: string;
    roomType: RoomType;
}