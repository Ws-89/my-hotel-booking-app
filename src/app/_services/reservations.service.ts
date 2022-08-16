import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { UserAuthService } from './user-auth.service';
import { AvailabilityRequestInterface } from '../models/interface/availabilityRequest.interface';
import { environment } from 'src/environments/environment';
import { ReservationArrangement } from '../models/reservationArrangement';
import { Reservation } from '../models/reservation';



@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  );
  private baseUrl = environment.baseUrl
  private reservationUrl = "reservations"

  private reservationRequest = new Subject<AvailabilityRequestInterface>();
  public reservationRequestWithDate = this.reservationRequest.asObservable();
  
  constructor(private httpClient: HttpClient) { }

  
  proceedReservation(reservationRequest: Reservation) {
    return this.httpClient.post
    (`${this.baseUrl}/${this.reservationUrl}/place-a-booking`, reservationRequest, { headers: this.requestHeader })
  }

  proceedReservationForLoggedInUser(reservationRequest: Reservation) {
    return this.httpClient.post
    (`${this.baseUrl}/${this.reservationUrl}/place-a-booking-logged-in`, reservationRequest).toPromise();
  }

  handleError(handleError: any): Observable<never> {
    return throwError ('Method not implemented')
  }
}
