import { ReservationItem } from "./reservationItem";

export class Reservations {
    items:ReservationItem[] = [];

    get totalPrice(): number {
        let totalPrice = 0;
        this.items.forEach(item => {
            totalPrice += item.price;
        })

        return totalPrice;
    }

}