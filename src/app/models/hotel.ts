import { RouterModule } from "@angular/router";
import { Grade } from "../enum/grade-type.enum";
import { AddressInterface } from "./interface/address.interface";
import { ContactInterface } from "./interface/contact.interface";
import { RoomInterface } from "./interface/room.interface";

export class Hotel {
    hotelId: number;
    name: string;
    address: AddressInterface
    grade: Grade;
    rooms: Array<RoomInterface>;
    image: string;
    contact: ContactInterface;
    enabled: boolean;

    constructor(
        hotelId?: number,
        name?: string,
        address?: AddressInterface,
        grade?: Grade,
        rooms?: Array<RoomInterface>,
        image?: string,
        contact?: ContactInterface,
        enabled?: boolean
    ){
        this.hotelId = hotelId,
        this.name = name,
        this.address = address,
        this.grade = grade,
        this.rooms = rooms,
        this.image = image;
        this.contact = contact;
        this.enabled = enabled;
    }
}