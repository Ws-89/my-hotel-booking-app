import { Availability } from "./availability";

export class Reservations {
    items:Availability[] = [];

    get totalPrice(): number {
        let totalPrice = 0;
        this.items.forEach(item => {
            totalPrice += item.price;
        })

        return totalPrice;
    }

}