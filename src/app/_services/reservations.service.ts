import { Injectable } from '@angular/core';
import { Availability } from 'src/app/models/availability';
import { ReservationItem } from 'src/app/models/reservationItem';
import { Reservations } from 'src/app/models/reservations';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private reservations:Reservations = new Reservations();
  
  addReservationItem(availability: Availability): void {
    this.reservations.items.push(new ReservationItem(availability))
  }

  removeReservation(reservationId: string): void{
    this.reservations.items = 
    this.reservations.items.filter(item => item.id != reservationId);
  }

  getReservations(): Reservations{
    return this.reservations;
  }
}
