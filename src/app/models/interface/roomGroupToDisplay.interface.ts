import { AvailabilityInterface } from "./availability.interface";

export interface RoomGroupToDisplayInterface {
    groupId: number;
    rooms: Array<AvailabilityInterface>
    quantity: number;
}