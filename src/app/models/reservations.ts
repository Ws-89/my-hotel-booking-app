import { Availability } from "./availability";
import { Reservation } from "./reservation";

export class Reservations {
    items:Reservation[] = [];

    get totalPrice(): number {
        let totalPrice = 0;
        this.items.forEach(item => {
            totalPrice += item.price;
        })

        return totalPrice;
    }

}