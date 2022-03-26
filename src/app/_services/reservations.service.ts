import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Availability } from 'src/app/models/availability';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Reservation } from '../models/reservation';
import { AvailabilityRequest } from '../models/availabilityRequest';
import { UserAuthService } from './user-auth.service';
import { ReservationCart } from '../models/reservation-cart';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private reservations = new Array<Availability>();
  private reservationRequest = new BehaviorSubject<AvailabilityRequest>(null);
  public reservationRequestWithDate = this.reservationRequest.asObservable();
  
  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) { }

  private baseUrl = "http://localhost:8085/availabilityCart"
  
  addReservationItem(availability: Availability): void {
    
    if(this.userAuthService.isLoggedIn()){
      this.reservations.push(availability)
    } 
    else {
      console.log("niezalogowany")
    }
  }

  addReservationItemCart(availability: Availability): Observable<any>{
    return this.httpClient.post(this.baseUrl, availability)
  }

  getReservationCart(): Observable<ReservationCart>{
    return this.httpClient.get<ReservationCart>(this.baseUrl);
  }

  addReservaionRequestDate(availabilityRequest: AvailabilityRequest){
    this.reservationRequest.next(availabilityRequest);
  }


  removeItemFromReservationCart(id : string): Observable<any>{
    return this.httpClient.delete(this.baseUrl + `/${id}`);
  }

  removeReservation(reservationId: number): void{
    this.reservations = this.reservations.filter(item => item.room_id != reservationId);
  }

  getReservations(): Availability[]{
    return this.reservations;
  }

  proceedReservations(reservation: Reservation): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/makeAReservation`, reservation);
  }

  handleError(handleError: any): Observable<never> {
    return throwError ('Method not implemented')
  }
}
