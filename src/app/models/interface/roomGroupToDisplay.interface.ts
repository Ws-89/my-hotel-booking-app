import { AvailabilityInterface } from "./availability.interface";
import { AvailableRoomInterface } from "./availableRoom.interface";

export interface RoomGroupToDisplayInterface {
    group_id: number;
    rooms: Array<AvailabilityInterface>
    quantity: number;
}