import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Availability } from 'src/app/models/availability';
import { Reservations } from 'src/app/models/reservations';
import { Observable, throwError } from 'rxjs';
import { Reservation } from '../models/reservation';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private reservations:Reservations = new Reservations();

  constructor(private httpClient: HttpClient) { }

  private baseUrl = "http://localhost:8085/reservations"
  
  addReservationItem(availability: Availability): void {
    let reservationItem = this.reservations.items.find(item => item.room_id === availability.room_id)
    if(reservationItem){
      return;
    }
    this.reservations.items.push(availability)
  }

  removeReservation(reservationId: number): void{
    this.reservations.items = this.reservations.items.filter(item => item.room_id != reservationId);
  }

  getReservations(): Reservations{
    return this.reservations;
  }

  proceedReservations(reservation: Reservation): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/makeAReservation`, reservation)
    .pipe(
      catchError(this.handleError)
    )
  }

  handleError(handleError: any): Observable<never> {
    return throwError ('Method not implemented')
  }
}
