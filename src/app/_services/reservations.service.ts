import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { UserAuthService } from './user-auth.service';
import { ReservationArrangement } from '../models/reservationArrangement';
import { AvailabilityInterface } from '../models/interface/availability.interface';
import { AvailabilityRequestInterface } from '../models/interface/availabilityRequest.interface';


@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  );

  private reservations = new Array<AvailabilityInterface>();
  private reservationRequest = new Subject<AvailabilityRequestInterface>();
  public reservationRequestWithDate = this.reservationRequest.asObservable();
  
  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) { }

  private baseUrl = "http://localhost:8085/availabilityCart"
  private reservationUrl = "http://localhost:8085/reservations"
  
  addReservationItemCart(availability: AvailabilityInterface[]){
    return this.httpClient.post(this.baseUrl, availability).toPromise();
  }

  getReservationCart(): Observable<AvailabilityInterface[]>{
    return this.httpClient.get<AvailabilityInterface[]>(this.baseUrl);
  }

  addReservaionRequestDate(availabilityRequest: AvailabilityRequestInterface){
    this.reservationRequest.next(availabilityRequest);
  }

  removeItemFromReservationCart(id : string){
    return this.httpClient.delete(this.baseUrl + `/${id}`).toPromise();
  }

  proceedReservations(reservationArrangement: ReservationArrangement){
    return this.httpClient.post(`${this.reservationUrl}/makeAReservation`, reservationArrangement).toPromise();
  }

  proceedReservationsForNonLoggedInUser(reservationArrangement: ReservationArrangement) {
    return this.httpClient.post
    (`${this.reservationUrl}/makeAReservationForNonLoggedInUser`, reservationArrangement, { headers: this.requestHeader }).toPromise();
  }

  handleError(handleError: any): Observable<never> {
    return throwError ('Method not implemented')
  }
}
