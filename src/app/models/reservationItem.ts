import { ThisReceiver } from "@angular/compiler";
import { Availability } from "./availability";
import { v4 as uuidv4 } from 'uuid'

export class ReservationItem {

    constructor(availability: Availability){
        this.id;
        this.availability = availability;
        this.price;
    }

    availability: Availability;

    get price(): number{
        return this.availability.price;
    }

    get id(): string{
        return uuidv4();
    }
}