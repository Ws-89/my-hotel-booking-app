import { RoomInterface } from "./interface/room.interface";

export class ReservationRequest {
    partySize: number;
    numberOfRooms: number;
    room: RoomInterface;
    email: string;
    endDate: Date;
    startDate: Date;
    currency: string;
}